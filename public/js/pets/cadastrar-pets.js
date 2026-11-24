import requisicao from '../comum/requisicao.js';

export default async function cadastrarProduto(dados) {
  return requisicao('/api/produtos', 'POST', dados);
}