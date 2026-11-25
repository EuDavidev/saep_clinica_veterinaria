import { readFile, writeFile } from 'node:fs/promises';
import { gerarHash } from '../servidor/senhas.js';
import { criptografarCpf, hashCpf } from '../servidor/criptografia.js';

const destino = new URL('./saep_db.sql', import.meta.url);
let sql = await readFile(new URL('./estrutura.sql', import.meta.url), 'utf8');
sql += '\nSTART TRANSACTION;\n';
for (const [i, nome] of ['Ana Recepcao','Bruno Recepcao','Carla Gestao'].entries()) {
  const email = ['ana','bruno','carla'][i] + '@clinica.test';
  const hash = await gerarHash('Clinica@123');
  sql += `INSERT INTO usuarios (nome,email,senha_hash) VALUES ('${nome}','${email}','${hash}');\n`;
}
const tutores = [
  ['Tutor Exemplo A','tutor.a@example.test','(75) 90000-0001','Rua Exemplo A, 10','52998224725'],
  ['Tutor Exemplo B','tutor.b@example.test','(75) 90000-0002','Rua Exemplo B, 20','11144477735'],
  ['Tutor Exemplo C','tutor.c@example.test','(75) 90000-0003','Rua Exemplo C, 30','12345678909']
];
for (const [nome,email,telefone,endereco,cpf] of tutores) {
  const cifrado = criptografarCpf(cpf);
  const hash = hashCpf(cpf);
  sql += `INSERT INTO tutores (nome,email,telefone,endereco,cpf_criptografado,cpf_hash)
    VALUES ('${nome}','${email}','${telefone}','${endereco}','${cifrado}','${hash}');\n`;
}
sql += `
INSERT INTO pets (nome,especie,raca,idade,tutor_id) VALUES
  ('Luna','Canina','Sem raca definida',3,1),
  ('Milo','Felina','Sem raca definida',2,2),
  ('Mel','Canina','Poodle',5,3);
INSERT INTO agendamentos (pet_id,data_hora,procedimento,valor) VALUES
  (1,'2026-12-02 09:00:00','Consulta',120.00),
  (2,'2026-12-01 10:00:00','Vacinacao',90.00),
  (3,'2026-12-01 08:30:00','Retorno',0.00);
COMMIT;
SELECT 'usuarios' AS tabela, COUNT(*) AS total FROM usuarios
UNION ALL SELECT 'tutores', COUNT(*) FROM tutores
UNION ALL SELECT 'pets', COUNT(*) FROM pets
UNION ALL SELECT 'agendamentos', COUNT(*) FROM agendamentos;
`;
await writeFile(destino, sql, 'utf8');
console.log('Criado banco/saep_db.sql. Execute no Workbench em um banco novo.');
