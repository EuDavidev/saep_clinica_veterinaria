import exigir from './exigir.js';

export default function validarData(valor) {
  const data = String(valor ?? '');
  exigir(/^\d{4}-\d{2}-\d{2}$/.test(data), 'Informe uma data válida.');
  exigir(Number(data.slice(0, 4)) >= 1000, 'Ano inválido.');

  const dia = new Date(data + 'T12:00:00Z');
  exigir(Number.isFinite(dia.getTime()), 'Data inválida.');
  exigir(dia.toISOString().slice(0, 10) === data, 'Esta data não existe no calendário.');

  return data;
}