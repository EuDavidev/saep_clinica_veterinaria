import requisicao from '../comum/requisicao.js';
import tabela from '../comum/tabela.js';
import { prepararEdicao } from '../comum/formulario.js';
export default async function listarPets() {
  const seletor = document.getElementById('tutor');
  const selecionado = seletor.value;
  const tutores = await requisicao('/api/tutores');
  seletor.replaceChildren(new Option('Selecione o tutor', ''));
  for (const t of tutores) seletor.add(new Option(t.nome + ' (#' + t.id + ')', t.id));
  seletor.value = selecionado;
  const busca = document.getElementById('campo-busca').value;
  const pets = await requisicao('/api/pets?busca=' + encodeURIComponent(busca));
  tabela(pets, p => [p.nome,p.especie,p.raca,p.idade,p.tutor], prepararEdicao);
}
