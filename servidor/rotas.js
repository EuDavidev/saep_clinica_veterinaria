import responder from './responder.js';
import obterUsuario from './obter-usuario.js';
import validarInteiro from './validacoes/validar-inteiro.js';
import entrar from './funcoes/entrar.js';
import sair from './funcoes/sair.js';
import listarProdutos from './funcoes/listar-produtos.js';
import cadastrarProduto from './funcoes/cadastrar-produto.js';
import editarProduto from './funcoes/editar-produto.js';
import excluirProduto from './funcoes/excluir-produto.js';
import listarHistorico from './funcoes/listar-historico.js';
import registrarMovimentacao from './funcoes/registrar-movimentacao.js';

export default async function rotas(requisicao, resposta) {
  const caminho = new URL(requisicao.url, 'http://localhost:3000').pathname;
  const metodo = requisicao.method;

  if (caminho === '/api/login' && metodo === 'POST') return entrar(requisicao, resposta);
  if (caminho === '/api/logout' && metodo === 'POST') return sair(requisicao, resposta);

  requisicao.usuario = obterUsuario(requisicao);
  if (!requisicao.usuario) return responder(resposta, 401, { erro: 'Entre com seu e-mail e senha.' });

  if (caminho === '/api/eu' && metodo === 'GET') return responder(resposta, 200, requisicao.usuario);
  if (caminho === '/api/produtos' && metodo === 'GET') return listarProdutos(requisicao, resposta);
  if (caminho === '/api/produtos' && metodo === 'POST') return cadastrarProduto(requisicao, resposta);
  if (caminho === '/api/movimentacoes' && metodo === 'GET') return listarHistorico(requisicao, resposta);
  if (caminho === '/api/movimentacoes' && metodo === 'POST') return registrarMovimentacao(requisicao, resposta);

  const produtoNaRota = caminho.match(/^\/api\/produtos\/(\d+)$/);
  if (produtoNaRota) {
    requisicao.produtoId = validarInteiro(produtoNaRota[1], 1);
    if (metodo === 'PUT') return editarProduto(requisicao, resposta);
    if (metodo === 'DELETE') return excluirProduto(requisicao, resposta);
  }

  responder(resposta, 404, { erro: 'Operação não encontrada.' });
}