import http from 'node:http';
import rotas from './servidor/rotas.js';
import lerCorpo from './servidor/ler-corpo.js';
import abrirArquivo from './servidor/abrir-arquivo.js';
import responder from './servidor/responder.js';

async function atender(requisicao, resposta) {
  try {
    const caminho = new URL(requisicao.url, 'http://localhost:3000').pathname;

    if (caminho.startsWith('/api/')) {
      requisicao.body = await lerCorpo(requisicao);
      await rotas(requisicao, resposta);
    } else {
      await abrirArquivo(caminho, resposta);
    }
  } catch (erro) {
    const status = erro instanceof SyntaxError ? 400 : (erro.status || 500);
    if (status === 500) console.error(erro);
    const mensagem = status === 500 ? 'Erro no servidor. Confira o terminal.' : erro.message;
    responder(resposta, status, { erro: mensagem });
  }
}

http.createServer(atender).listen(3000, '127.0.0.1', function () {
  console.log('Sistema disponível em http://localhost:3000/login');
});