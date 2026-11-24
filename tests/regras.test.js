import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { criptografarCpf, descriptografarCpf, hashCpf,
  normalizarCpf, mascararTutor } from '../servidor/criptografia.js';
import { gerarHash, conferirSenha } from '../servidor/senhas.js';
import validarData from '../servidor/validacoes/validar-data.js';
import validarPet from '../servidor/validacoes/validar-pet.js';
import validarAgendamento from '../servidor/validacoes/validar-agendamento.js';
import obterUsuario from '../servidor/obter-usuario.js';
import sessoes from '../servidor/sessoes.js';

const exemplo = await readFile(new URL('../.env.example', import.meta.url), 'utf8');
for (const nome of ['CPF_KEY', 'CPF_HASH_KEY']) {
  process.env[nome] = exemplo.match(new RegExp('^' + nome + '=(.+)$', 'm'))[1];
}
const cpf = '52998224725';

test('CPF: formato, digitos e repeticao', () => {
  assert.equal(normalizarCpf('529.982.247-25'), cpf);
  assert.throws(() => normalizarCpf('11111111111'));
  assert.throws(() => normalizarCpf('52998224724'));
  assert.throws(() => normalizarCpf('abc52998224725'));
});

test('CPF: cifragem reversivel, IV aleatorio e integridade', () => {
  const primeiro = criptografarCpf(cpf);
  assert.notEqual(primeiro, criptografarCpf(cpf));
  assert.equal(descriptografarCpf(primeiro), cpf);
  const partes = primeiro.split(':');
  partes[1] = '00'.repeat(16);
  assert.throws(() => descriptografarCpf(partes.join(':')));
});

test('CPF: HMAC normalizado e nenhuma cifra na resposta publica', () => {
  assert.equal(hashCpf(cpf), hashCpf('529.982.247-25'));
  assert.deepEqual(mascararTutor({ nome: 'Tutor', cpf_hash: hashCpf(cpf),
    cpf_criptografado: criptografarCpf(cpf) }),
  { nome: 'Tutor', cpf: '***.***.***-25' });
});

test('senhas: sal diferente, senha correta e senha incorreta', async () => {
  const primeiro = await gerarHash('Clinica@123');
  assert.notEqual(primeiro, await gerarHash('Clinica@123'));
  assert.equal(await conferirSenha('Clinica@123', primeiro), true);
  assert.equal(await conferirSenha('outra', primeiro), false);
});

test('datas: bissexto valido e componentes inexistentes', () => {
  assert.equal(validarData('2028-02-29T10:30'), '2028-02-29 10:30:00');
  for (const valor of ['2027-02-29T10:30', '2026-13-01T10:30',
    '2026-12-01T24:00', '2026-12-01']) {
    assert.throws(() => validarData(valor));
  }
});

test('pet exige tutor e idade valida; agendamento rejeita valor negativo', () => {
  const pet = { nome: 'Luna', especie: 'Canina', raca: 'SRD', idade: '3' };
  assert.throws(() => validarPet({ ...pet, tutor_id: '' }));
  assert.throws(() => validarPet({ ...pet, tutor_id: '1', idade: '-1' }));
  assert.equal(validarPet({ ...pet, tutor_id: '1' }).tutor_id, 1);
  assert.throws(() => validarAgendamento({ pet_id: '1',
    data_hora: '2026-12-01T10:00', procedimento: 'Consulta', valor: '-1' }));
});

test('sessao valida retorna somente usuario; sessao expirada e removida', () => {
  const token = 'ab'.repeat(32);
  const req = { headers: { cookie: 'sessao=' + token } };
  sessoes.set(token, { id: 1, nome: 'Ana', expira: Date.now() + 60000 });
  assert.deepEqual(obterUsuario(req), { id: 1, nome: 'Ana' });
  sessoes.set(token, { id: 1, nome: 'Ana', expira: Date.now() - 1 });
  assert.equal(obterUsuario(req), null);
  assert.equal(sessoes.has(token), false);
});

test('SQL de demonstracao protege senhas/CPFs e usa as chaves documentadas', async () => {
  const sql = await readFile(new URL('../banco/saep_db.sql', import.meta.url), 'utf8');
  assert.equal(sql.includes('Clinica@123'), false);
  for (const documento of [cpf, '11144477735', '12345678909']) {
    assert.equal(sql.includes(documento), false);
  }
  const valores = [...sql.matchAll(/'([a-f0-9]{24}:[a-f0-9]{32}:[a-f0-9]{22})'/g)];
  assert.equal(valores.length, 3);
  const documentos = valores.map(v => descriptografarCpf(v[1]));
  assert.deepEqual(documentos, [cpf, '11144477735', '12345678909']);
  for (const documento of documentos) assert(sql.includes(hashCpf(documento)));
});
