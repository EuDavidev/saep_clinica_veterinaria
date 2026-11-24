import banco from '../db.js';
import responder from '../responder.js';
import exigir from '../validacoes/exigir.js';
import validarPet from '../validacoes/validar-pet.js';
export default async function editarPet(req, res) {
  const p = validarPet(req.body);
  const [linhas] = await banco.execute('SELECT tutor_id FROM pets WHERE id=?', [req.id]);
  exigir(linhas.length > 0, 'Pet nao encontrado.', 404);
  // Mantem o tutor original para nao mudar o responsavel dos agendamentos.
  exigir(linhas[0].tutor_id === p.tutor_id,
    'A troca de tutor nao faz parte desta versao.');
  await banco.execute(`UPDATE pets SET nome=?,especie=?,raca=?,idade=?
    WHERE id=?`, [p.nome,p.especie,p.raca,p.idade,req.id]);
  responder(res, 200, { mensagem: 'Pet atualizado.' });
}
