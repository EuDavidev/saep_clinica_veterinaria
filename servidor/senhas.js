import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
const derivar = promisify(scrypt);
export async function gerarHash(senha) {
  const sal = randomBytes(16).toString('hex');
  const hash = await derivar(senha, sal, 64);
  return sal + ':' + hash.toString('hex');
}
export async function conferirSenha(senha, armazenado) {
  const [sal, hex] = armazenado.split(':');
  const hash = await derivar(senha, sal, 64);
  const salvo = Buffer.from(hex, 'hex');
  return salvo.length === hash.length && timingSafeEqual(salvo, hash);
}
