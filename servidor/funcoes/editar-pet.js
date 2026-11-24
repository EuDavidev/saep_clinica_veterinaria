import banco from '../db.js';
import responder from '../responder.js';
import exigir from '../validacoes/exigir.js';
import validarProduto from '../validacoes/validar-produto.js';

export default async function editarProduto(requisicao, resposta) {
  const produto = validarProduto(requisicao.body);

  // A quantidade não é atualizada aqui. O saldo só muda pela tela Estoque.
  const [resultado] = await banco.execute(`
    UPDATE produtos SET
    nome=?,marca=?,categoria=?,modelo=?,conexao=?,voltagem=?,garantia_meses=?,preco=?,estoque_minimo=?
    WHERE id=? AND ativo=1`, [
    produto.nome, produto.marca, produto.categoria, produto.modelo,
    produto.conexao || null, produto.voltagem || null, produto.garantia_meses,
    produto.preco, produto.estoque_minimo, requisicao.produtoId
  ]);

  exigir(resultado.affectedRows > 0, 'Produto não encontrado.');
  responder(resposta, 200, { mensagem: 'Produto atualizado.' });
}