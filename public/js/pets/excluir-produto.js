import requisicao from '../comum/requisicao.js';

export default async function excluirProduto(id) {
  return requisicao('/api/produtos/' + id, 'DELETE');
}