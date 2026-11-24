import banco from '../db.js';
import responder from '../responder.js';
import ordenarProdutos from '../ordenar-produtos.js';

export default async function listarProdutos(requisicao, resposta) {
  const url = new URL(requisicao.url, 'http://localhost:3000');
  const busca = '%' + (url.searchParams.get('busca') || '') + '%';

  const [produtos] = await banco.execute(`
    SELECT * FROM produtos
    WHERE ativo=1 AND (
      nome LIKE ? OR marca LIKE ? OR categoria LIKE ? OR modelo LIKE ? OR conexao LIKE ?
    )`, [busca, busca, busca, busca, busca]);

  responder(resposta, 200, ordenarProdutos(produtos));
}