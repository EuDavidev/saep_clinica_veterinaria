import banco from '../db.js';
import responder from '../responder.js';
import validarAgendamento from '../validacoes/validar-agendamento.js';
export default async function registrarAgendamento(req, res) {
  const a = validarAgendamento(req.body);
  await banco.execute(`INSERT INTO agendamentos
    (pet_id,data_hora,procedimento,valor) VALUES (?,?,?,?)`,
    [a.pet_id,a.data_hora,a.procedimento,a.valor]);
  responder(res, 201, { mensagem: 'Agendamento cadastrado.' });
}
