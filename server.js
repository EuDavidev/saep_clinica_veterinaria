import http from 'node:http';
import rotas from './servidor/rotas.js';
import lerCorpo from './servidor/ler-corpo.js';
import abrirArquivo from './servidor/abrir-arquivos.js';
import responder from './servidor/responder.js';

async function atender(req, res) {
  try {
    const caminho = new URL(req.url, 'http://localhost:3000').pathname;
    if (caminho.startsWith('/api/')) {
      // O navegador envia JSON nas operacoes que alteram dados.
      if (['POST', 'PUT'].includes(req.method) &&
          !req.headers['content-type']?.startsWith('application/json')) {
        return responder(res, 415, { erro: 'Envie application/json.' });
      }
      req.body = await lerCorpo(req);
      await rotas(req, res);
    } else {
      await abrirArquivo(caminho, res);
    }
  } catch (erro) {
    let status = erro instanceof SyntaxError ? 400 : erro.status || 500;
    let mensagem = erro.message;
    if (erro.code === 'ER_DUP_ENTRY') {
      status = 409;
      mensagem = 'CPF ou e-mail ja cadastrado.';
    }
    if (erro.code === 'ER_NO_REFERENCED_ROW_2') {
      status = 400;
      mensagem = 'Tutor ou pet informado nao existe.';
    }
    if (status === 500) mensagem = 'Erro interno. Verifique a conexao e o banco.';
    responder(res, status, { erro: mensagem });
  }
}
http.createServer(atender).listen(3000, '127.0.0.1', () => {
  console.log('Abra http://localhost:3000/login');
});
