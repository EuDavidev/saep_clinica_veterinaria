import sessoes from '../sessoes.js';
import responder from '../responder.js';

export default function sair(requisicao, resposta) {
  const token = requisicao.headers.cookie?.match(/(?:^|;\s*)sessao=([a-f0-9]+)/)?.[1];
  sessoes.delete(token);
  resposta.setHeader('Set-Cookie', 'sessao=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
  responder(resposta, 200, { mensagem: 'Sessão encerrada.' });
}