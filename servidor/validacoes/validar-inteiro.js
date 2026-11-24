import exigir from './exigir.js';
export default function validarInteiro(valor) {
  exigir(/^[1-9]\d*$/.test(String(valor)), 'Selecione um registro valido.');
  const numero = Number(valor);
  exigir(Number.isSafeInteger(numero) && numero <= 2147483647, 'ID invalido.');
  return numero;
}
