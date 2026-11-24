import requisicao from '../comum/requisicao.js';

export default async function editarProduto(dados) {
  return requisicao('/api/produtos/' + dados.id, 'PUT', dados);
}