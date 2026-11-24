import { randomBytes } from 'node:crypto';
import banco from '../db.js';
import sessoes from '../sessoes.js';
import responder from '../responder.js';
import exigir from '../validacoes/exigir.js';
import { conferirSenha } from '../senhas.js';

export default async function entrar(req, res) {
  const { email, senha } = req.body;
  exigir(typeof email === 'string' && email.length <= 150 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), 'Informe um e-mail valido.');
  exigir(typeof senha === 'string' && senha.length > 0 && senha.length <= 200,
    'Informe a senha.');
  const [linhas] = await banco.execute(
    'SELECT id,nome,senha_hash FROM usuarios WHERE email=?', [email.trim()]);
  const usuario = linhas[0];
  if (!usuario || !await conferirSenha(senha, usuario.senha_hash)) {
    return responder(res, 401, { erro: 'E-mail ou senha incorretos.' });
  }
  for (const [token, sessao] of sessoes) {
    if (sessao.expira <= Date.now()) sessoes.delete(token);
  }
  const segundos = Number(process.env.SESSION_SECONDS || 10800);
  exigir(Number.isInteger(segundos) && segundos > 0, 'Tempo de sessao invalido.', 500);
  const token = randomBytes(32).toString('hex');
  sessoes.set(token, { id: usuario.id, nome: usuario.nome,
    expira: Date.now() + segundos * 1000 });
  res.setHeader('Set-Cookie', 'sessao=' + token +
    '; HttpOnly; SameSite=Strict; Path=/; Max-Age=' + segundos);
  responder(res, 200, { nome: usuario.nome });
}
