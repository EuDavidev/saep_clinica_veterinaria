import banco from '../db.js';
import responder from '../responder.js';
import exigir from '../validacoes/exigir.js';
import validarAgendamento from '../validacoes/validar-agendamento.js';
export default async function editarAgendamento(req, res) {
  const a = validarAgendamento(req.body);
  const [linhas] = await banco.execute('SELECT id FROM agendamentos WHERE id=?', [req.id]);
  exigir(linhas.length > 0, 'Agendamento nao encontrado.', 404);
  await banco.execute(`UPDATE agendamentos SET pet_id=?,data_hora=?,
    procedimento=?,valor=? WHERE id=?`,
    [a.pet_id,a.data_hora,a.procedimento,a.valor,req.id]);
  responder(res, 200, { mensagem: 'Agendamento atualizado.' });
}
