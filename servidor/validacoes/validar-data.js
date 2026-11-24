import exigir from './exigir.js';
export default function validarData(valor) {
  const texto = String(valor ?? '').replace('T', ' ');
  exigir(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(texto),
    'Informe data e horario completos.');
  const data = new Date(texto.replace(' ', 'T') + ':00Z');
  exigir(Number.isFinite(data.getTime()), 'Data invalida.');
  exigir(Number(texto.slice(0, 4)) >= 1000 &&
    data.toISOString().slice(0, 16).replace('T', ' ') === texto,
    'Data ou horario inexistente.');
  return texto + ':00';
}
