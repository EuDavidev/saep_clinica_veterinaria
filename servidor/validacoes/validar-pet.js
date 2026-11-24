import exigir from './exigir.js';
import validarInteiro from './validar-inteiro.js';
export default function validarPet(dados) {
  const pet = { tutor_id: validarInteiro(dados.tutor_id) };
  for (const [campo, limite] of Object.entries({
    nome: 100, especie: 50, raca: 80
  })) {
    exigir(typeof dados[campo] === 'string', 'Preencha ' + campo + '.');
    pet[campo] = dados[campo].trim();
    exigir(pet[campo].length > 0 && pet[campo].length <= limite,
      'Confira o campo ' + campo + '.');
  }
  const idade = String(dados.idade ?? '');
  exigir(/^\d{1,2}$/.test(idade), 'Idade: use anos inteiros de 0 a 99.');
  pet.idade = Number(idade);
  return pet;
}
