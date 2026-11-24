import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { setTimeout as aguardar } from 'node:timers/promises';

test('HTTP: paginas da clinica, protecao da API, validacao e saida', async t => {
  const filho = spawn(process.execPath, ['server.js'], {
    cwd: new URL('../', import.meta.url),
    env: { ...process.env, DB_HOST: '127.0.0.1', DB_PORT: '1' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let erros = '';
  filho.stderr.on('data', texto => { erros += texto; });
  try {
    await Promise.race([
      once(filho.stdout, 'data'),
      once(filho, 'exit').then(() => { throw new Error('Servidor nao iniciou: ' + erros); }),
      aguardar(10000).then(() => { throw new Error('Tempo de inicio excedido.'); })
    ]);
    const base = 'http://127.0.0.1:3000';
    for (const caminho of ['/login', '/', '/tutores', '/pets', '/agendamentos',
      '/css/base.css', '/js/login.js']) {
      await t.test('entrega ' + caminho, async () => {
        assert.equal((await fetch(base + caminho)).status, 200);
      });
    }
    for (const caminho of ['/api/eu', '/api/tutores', '/api/pets', '/api/agendamentos']) {
      await t.test('exige sessao em ' + caminho, async () => {
        const res = await fetch(base + caminho);
        assert.equal(res.status, 401);
        assert((await res.json()).erro);
      });
    }
    await t.test('nao publica configuracao nem telas antigas', async () => {
      for (const caminho of ['/.env', '/.env.local', '/package.json', '/produtos', '/estoque']) {
        assert.equal((await fetch(base + caminho)).status, 404);
      }
    });
    await t.test('rejeita dados invalidos antes de consultar banco', async () => {
      for (const body of ['{}', '{', '[]', JSON.stringify({ email: '', senha: 'abc' })]) {
        const res = await fetch(base + '/api/login', { method: 'POST',
          headers: { 'Content-Type': 'application/json' }, body });
        assert.equal(res.status, 400);
      }
      const res = await fetch(base + '/api/login', { method: 'POST', body: '{}' });
      assert.equal(res.status, 415);
    });
    await t.test('logout invalida cookie e nao retorna dados pessoais', async () => {
      const res = await fetch(base + '/api/logout', { method: 'POST',
        headers: { 'Content-Type': 'application/json' }, body: '{}' });
      assert.equal(res.status, 200);
      assert.match(res.headers.get('set-cookie'), /HttpOnly.*SameSite=Strict.*Max-Age=0/);
    });
  } finally {
    filho.kill();
  }
});
