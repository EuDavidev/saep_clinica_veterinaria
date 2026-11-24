import requisicao from '../comum/requisicao.js';
import tabela from '../comum/tabela.js';
import { prepararEdicao } from '../comum/formulario.js';
export default async function listarAgendamentos() {
  const seletor = document.getElementById('pet');
  const pets = await requisicao('/api/pets');
  seletor.replaceChildren(new Option('Selecione o pet', ''));
  for (const p of pets) seletor.add(new Option(p.nome + ' - ' + p.tutor, p.id));
  const itens = await requisicao('/api/agendamentos');
  tabela(itens, a => {
    const [dia, hora] = a.data_hora.split(' ');
    const valor = Number(a.valor).toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL'
    });
    return [dia.split('-').reverse().join('/') + ' ' + hora.slice(0, 5),
      a.procedimento,valor,
      '#' + a.pet_id + ' ' + a.pet_nome + ' / ' + a.especie + ' / ' + a.raca +
        ' / ' + a.idade + ' ano(s)',
      '#' + a.tutor_id + ' ' + a.tutor_nome + ' / ' + a.email + ' / ' +
        a.telefone + ' / ' + a.endereco + ' / CPF ' + a.cpf];
  }, prepararEdicao);
}
