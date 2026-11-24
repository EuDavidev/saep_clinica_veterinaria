import banco from '../db.js';
import responder from '../responder.js';
import validarProduto from '../validacoes/validar-produto.js';
import validarInteiro from '../validacoes/validar-inteiro.js';

export default async function cadastrarProduto(requisicao, resposta) {
  const produto = validarProduto(requisicao.body);
  const quantidade = validarInteiro(requisicao.body.quantidade);
  const conexao = await banco.getConnection();

  try {
    await conexao.beginTransaction();
    const [resultado] = await conexao.execute(`
      INSERT INTO produtos
      (nome,marca,categoria,modelo,conexao,voltagem,garantia_meses,preco,quantidade,estoque_minimo)
      VALUES (?,?,?,?,?,?,?,?,?,?)`, [
      produto.nome, produto.marca, produto.categoria, produto.modelo,
      produto.conexao || null, produto.voltagem || null, produto.garantia_meses,
      produto.preco, quantidade, produto.estoque_minimo
    ]);

    if (quantidade > 0) {
      await conexao.execute(`
        INSERT INTO movimentacoes (produto_id,usuario_id,tipo,quantidade,data)
        VALUES (?,?,'entrada',?,CURRENT_DATE)`,
        [resultado.insertId, requisicao.usuario.id, quantidade]);
    }

    await conexao.commit();
    responder(resposta, 201, { mensagem: 'Produto cadastrado.' });
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}