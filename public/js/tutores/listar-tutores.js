import requisicao from '../comum/requisicao.js';
import tabela from '../comum/tabela.js';
import { prepararEdicao } from '../comum/formulario.js';
export default async function listarTutores() {
  const busca = document.getElementById('campo-busca').value;
  const tutores = await requisicao('/api/tutores?busca=' + encodeURIComponent(busca));
  tabela(tutores, t => [t.nome,t.email,t.telefone,t.endereco,t.cpf], prepararEdicao);
}
