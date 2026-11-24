import requisicao from '../comum/requisicao.js';

export default async function registrarMovimentacao() {
  const campos = document.getElementById('formulario-movimento').elements;
  const dados = {
    produto_id: campos.produto_id.value,
    tipo: campos.tipo.value,
    quantidade: campos.quantidade.value,
    data: campos.data.value
  };

  return requisicao('/api/movimentacoes', 'POST', dados);
}