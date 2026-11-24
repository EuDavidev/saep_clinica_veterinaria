import sessoes from '../sessoes.js';
import responder from '../responder.js';
export default function sair(req, res) {
  const token = req.headers.cookie?.match(/(?:^|;\s*)sessao=([a-f0-9]{64})/)?.[1];
  sessoes.delete(token);
  res.setHeader('Set-Cookie',
    'sessao=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
  responder(res, 200, { mensagem: 'Sessao encerrada.' });
}
