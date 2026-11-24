import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import banco from '../db.js';
import sessoes from '../sessoes.js';
import responder from '../responder.js';
import exigir from '../validacoes/exigir.js';

export default async function entrar(requisicao, resposta) {
  const dados = requisicao.body;
  exigir(typeof dados.email === 'string', 'Informe o e-mail.');
  exigir(typeof dados.senha === 'string' && dados.senha !== '', 'Informe a senha.');

  const [usuarios] = await banco.execute('SELECT * FROM usuarios WHERE email=?', [dados.email.trim()]);
  const usuario = usuarios[0];
  let senhaCorreta = false;

  if (usuario) {
    const [sal, hexadecimal] = usuario.senha_hash.split(':');
    if (sal && hexadecimal) {
      const salvo = Buffer.from(hexadecimal, 'hex');
      const calculado = scryptSync(dados.senha, sal, 64);
      senhaCorreta = salvo.length === calculado.length && timingSafeEqual(salvo, calculado);
    }
  }

  if (!senhaCorreta) {
    return responder(resposta, 401, { erro: 'E-mail ou senha incorretos.' });
  }

  for (const [token, sessao] of sessoes) {
    if (sessao.expira < Date.now()) sessoes.delete(token);
  }

  const token = randomBytes(32).toString('hex');
  sessoes.set(token, { id: usuario.id, nome: usuario.nome, expira: Date.now() + 10800000 });
  resposta.setHeader('Set-Cookie', 'sessao=' + token + '; HttpOnly; SameSite=Strict; Path=/; Max-Age=10800');
  responder(resposta, 200, { nome: usuario.nome });
}