import banco from '../db.js';
import responder from '../responder.js';
import { descriptografarCpf } from '../criptografia.js';
export default async function listarAgendamentos(req, res) {
  const [linhas] = await banco.execute(`SELECT a.*,
    p.nome AS pet_nome,p.especie,p.raca,p.idade,p.tutor_id,
    t.nome AS tutor_nome,t.email,t.telefone,t.endereco,t.cpf_criptografado
    FROM agendamentos a JOIN pets p ON p.id=a.pet_id
    JOIN tutores t ON t.id=p.tutor_id ORDER BY a.data_hora,a.id`);
  const dados = linhas.map(({ cpf_criptografado, ...item }) => ({
    ...item, cpf: '***.***.***-' + descriptografarCpf(cpf_criptografado).slice(-2)
  }));
  responder(res, 200, dados);
}
