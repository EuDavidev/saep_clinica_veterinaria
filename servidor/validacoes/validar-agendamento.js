import exigir from './exigir.js';
import validarData from './validar-data.js';
import validarInteiro from './validar-inteiro.js';
export default function validarAgendamento(dados) {
  exigir(typeof dados.procedimento === 'string', 'Informe o procedimento.');
  const procedimento = dados.procedimento.trim();
  exigir(procedimento.length > 0 && procedimento.length <= 100,
    'Procedimento: preencha ate 100 caracteres.');
  const valor = String(dados.valor ?? '').trim().replace(',', '.');
  exigir(/^\d{1,8}(\.\d{1,2})?$/.test(valor),
    'Valor: use um numero nao negativo com ate duas casas decimais.');
  return { pet_id: validarInteiro(dados.pet_id),
    data_hora: validarData(dados.data_hora), procedimento, valor };
}
