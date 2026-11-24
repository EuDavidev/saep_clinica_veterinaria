import banco from '../db.js';
import responder from '../responder.js';
import exigir from '../validacoes/exigir.js';
import validarInteiro from '../validacoes/validar-inteiro.js';
import validarData from '../validacoes/validar-data.js';

export default async function registrarMovimentacao(requisicao, resposta) {
  const dados = requisicao.body;
  const produtoId = validarInteiro(dados.produto_id, 1);
  const quantidade = validarInteiro(dados.quantidade, 1);
  const data = validarData(dados.data);
  exigir(dados.tipo === 'entrada' || dados.tipo === 'saida', 'Tipo inválido.');

  const conexao = await banco.getConnection();
  try {
    await conexao.beginTransaction();
    const [produtos] = await conexao.execute(
      'SELECT * FROM produtos WHERE id=? AND ativo=1 FOR UPDATE', [produtoId]
    );
    const produto = produtos[0];
    exigir(produto, 'Selecione um produto ativo.');

    let novoSaldo;
    if (dados.tipo === 'entrada') {
      novoSaldo = Number(produto.quantidade) + quantidade;
    } else {
      novoSaldo = Number(produto.quantidade) - quantidade;
    }

    exigir(novoSaldo >= 0, 'Saída maior que o estoque disponível.');
    exigir(novoSaldo <= 1000000000, 'Saldo acima do limite permitido.');

    await conexao.execute('UPDATE produtos SET quantidade=? WHERE id=?', [novoSaldo, produtoId]);
    await conexao.execute(`
      INSERT INTO movimentacoes (produto_id,usuario_id,tipo,quantidade,data)
      VALUES (?,?,?,?,?)`, [produtoId, requisicao.usuario.id, dados.tipo, quantidade, data]);
    await conexao.commit();

    const abaixoDoMinimo = dados.tipo === 'saida' && novoSaldo < produto.estoque_minimo;
    let mensagem = 'Movimentação salva. Saldo: ' + novoSaldo;
    if (abaixoDoMinimo) mensagem = 'ATENÇÃO: estoque abaixo do mínimo! Saldo: ' + novoSaldo;
    responder(resposta, 201, { mensagem: mensagem, alerta: abaixoDoMinimo });
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}