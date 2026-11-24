import banco from '../db.js';
import responder from '../responder.js';
import exigir from '../validacoes/exigir.js';
import validarTutor from '../validacoes/validar-tutor.js';
import { criptografarCpf, hashCpf } from '../criptografia.js';
export default async function editarTutor(req, res) {
  const t = validarTutor(req.body);
  const [linhas] = await banco.execute('SELECT id FROM tutores WHERE id=?', [req.id]);
  exigir(linhas.length > 0, 'Tutor nao encontrado.', 404);
  const novoCpf = req.body.cpf;
  if (novoCpf !== '' && novoCpf !== undefined) {
    await banco.execute(`UPDATE tutores SET nome=?,email=?,telefone=?,
      endereco=?,cpf_criptografado=?,cpf_hash=? WHERE id=?`,
    [t.nome,t.email,t.telefone,t.endereco,criptografarCpf(novoCpf),hashCpf(novoCpf),req.id]);
  } else {
    await banco.execute(`UPDATE tutores SET nome=?,email=?,telefone=?,
      endereco=? WHERE id=?`, [t.nome,t.email,t.telefone,t.endereco,req.id]);
  }
  responder(res, 200, { mensagem: 'Tutor atualizado.' });
}
