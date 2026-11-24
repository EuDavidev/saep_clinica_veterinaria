import banco from '../db.js';
import responder from '../responder.js';
import validarTutor from '../validacoes/validar-tutor.js';
import { criptografarCpf, hashCpf } from '../criptografia.js';
export default async function cadastrarTutor(req, res) {
  const t = validarTutor(req.body);
  await banco.execute(`INSERT INTO tutores
    (nome,email,telefone,endereco,cpf_criptografado,cpf_hash)
    VALUES (?,?,?,?,?,?)`, [t.nome,t.email,t.telefone,t.endereco,
    criptografarCpf(req.body.cpf),hashCpf(req.body.cpf)]);
  responder(res, 201, { mensagem: 'Tutor cadastrado.' });
}
