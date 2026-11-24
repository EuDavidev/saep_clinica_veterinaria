export default function prepararEdicao(produto) {
  const formulario = document.getElementById('formulario-produto');
  const campos = formulario.elements;

  campos.id.value = produto.id;
  campos.nome.value = produto.nome;
  campos.marca.value = produto.marca;
  campos.categoria.value = produto.categoria;
  campos.modelo.value = produto.modelo;
  campos.conexao.value = produto.conexao || '';
  campos.voltagem.value = produto.voltagem || '';
  campos.garantia_meses.value = produto.garantia_meses;
  campos.preco.value = produto.preco;
  campos.quantidade.value = produto.quantidade;
  campos.estoque_minimo.value = produto.estoque_minimo;
  campos.quantidade.disabled = true;

  document.getElementById('titulo-formulario').textContent = 'Editar produto';
  formulario.scrollIntoView();
}