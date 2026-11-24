import banco from '../db.js';
import responder from '../responder.js';
export default async function listarPets(req, res) {
  const busca = '%' + (new URL(req.url, 'http://localhost')
    .searchParams.get('busca') || '').trim() + '%';
  const [linhas] = await banco.execute(`SELECT p.*, t.nome AS tutor
    FROM pets p JOIN tutores t ON t.id=p.tutor_id
    WHERE p.nome LIKE ? OR t.nome LIKE ? ORDER BY p.nome,p.id`, [busca,busca]);
  responder(res, 200, linhas);
}
