import exigir from './exigir.js';

export default function validarInteiro(valor, minimo = 0) {
  const preenchido = String(valor ?? '').trim() !== '';
  const numero = Number(valor);

  exigir(preenchido && typeof valor !== 'boolean', 'Preencha os números.');
  exigir(Number.isSafeInteger(numero), 'Use somente números inteiros.');
  exigir(numero >= minimo, 'Número abaixo do mínimo permitido.');
  exigir(numero <= 1000000000, 'Número acima do limite permitido.');

  return numero;
}