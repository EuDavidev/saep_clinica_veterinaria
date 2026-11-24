import exigir from './exigir.js';
export default function validarTutor(dados) {
  const tutor = {};
  for (const [campo, limite] of Object.entries({
    nome: 100, email: 150, telefone: 20, endereco: 200
  })) {
    exigir(typeof dados[campo] === 'string', 'Preencha ' + campo + '.');
    tutor[campo] = dados[campo].trim();
    exigir(tutor[campo].length > 0 && tutor[campo].length <= limite,
      'Confira o tamanho do campo ' + campo + '.');
  }
  exigir(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tutor.email), 'E-mail invalido.');
  return tutor;
}
