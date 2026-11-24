import banco from '../db.js';
import responder from '../responder.js';
import exigir from '../validacoes/exigir.js';

export default async function excluirProduto(requisicao, resposta) {
  // Exclusão lógica: retira da listagem e mantém o histórico.
  const [resultado] = await banco.execute(
    'UPDATE produtos SET ativo=0 WHERE id=? AND ativo=1',
    [requisicao.produtoId]
  );

  exigir(resultado.affectedRows > 0, 'Produto não encontrado.');
  responder(resposta, 200, { mensagem: 'Produto excluído. Histórico preservado.' });
}