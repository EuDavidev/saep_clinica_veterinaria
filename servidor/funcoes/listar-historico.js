import banco from '../db.js';
import responder from '../responder.js';

export default async function listarHistorico(requisicao, resposta) {
  const [historico] = await banco.execute(`
    SELECT m.*, p.nome AS produto, u.nome AS responsavel
    FROM movimentacoes m
    JOIN produtos p ON p.id=m.produto_id
    JOIN usuarios u ON u.id=m.usuario_id
    ORDER BY m.id DESC
  `);

  responder(resposta, 200, historico);
}