import { randomBytes, createCipheriv, createDecipheriv,
  createHmac } from 'node:crypto';
import exigir from './validacoes/exigir.js';

function chave(nome) {
  const valor = process.env[nome] || '';
  if (!/^[a-f0-9]{64}$/i.test(valor)) {
    throw new Error('Configure ' + nome + ' com 64 caracteres hexadecimais.');
  }
  return Buffer.from(valor, 'hex');
}
export function normalizarCpf(valor) {
  exigir(typeof valor === 'string' && /^[\d.\-\s]+$/.test(valor),
    'Informe um CPF valido.');
  const cpf = valor.replace(/\D/g, '');
  exigir(/^\d{11}$/.test(cpf) && !/^(\d)\1{10}$/.test(cpf),
    'CPF invalido.');
  for (const tamanho of [9, 10]) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(cpf[i]) * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    exigir(Number(cpf[tamanho]) === (resto === 10 ? 0 : resto),
      'Digitos verificadores do CPF invalidos.');
  }
  return cpf;
}
export function criptografarCpf(valor) {
  const cpf = normalizarCpf(valor);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', chave('CPF_KEY'), iv);
  const cifrado = Buffer.concat([cipher.update(cpf, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), cifrado].map(v => v.toString('hex')).join(':');
}
export function descriptografarCpf(valor) {
  const [iv, tag, cifrado] = valor.split(':').map(v => Buffer.from(v, 'hex'));
  const decipher = createDecipheriv('aes-256-gcm', chave('CPF_KEY'), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(cifrado), decipher.final()]).toString('utf8');
}
export function hashCpf(valor) {
  return createHmac('sha256', chave('CPF_HASH_KEY'))
    .update(normalizarCpf(valor)).digest('hex');
}
export function mascararTutor(tutor) {
  const { cpf_criptografado, cpf_hash, ...publico } = tutor;
  const cpf = descriptografarCpf(cpf_criptografado);
  return { ...publico, cpf: '***.***.***-' + cpf.slice(-2) };
}
