import banco from '../db.js';
import responder from '../responder.js';
import { mascararTutor } from '../criptografia.js';
export default async function listarTutores(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const busca = '%' + (url.searchParams.get('busca') || '').trim() + '%';
  const [linhas] = await banco.execute(`
    SELECT * FROM tutores WHERE nome LIKE ? OR email LIKE ?
    ORDER BY nome,id`, [busca, busca]);
  responder(res, 200, linhas.map(mascararTutor));
}
