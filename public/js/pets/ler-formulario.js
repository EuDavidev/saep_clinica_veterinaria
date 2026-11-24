export default function lerFormulario() {
  const campos = document.getElementById('formulario-produto').elements;

  return {
    id: campos.id.value,
    nome: campos.nome.value,
    marca: campos.marca.value,
    categoria: campos.categoria.value,
    modelo: campos.modelo.value,
    conexao: campos.conexao.value,
    voltagem: campos.voltagem.value,
    garantia_meses: campos.garantia_meses.value,
    preco: campos.preco.value,
    quantidade: campos.quantidade.value,
    estoque_minimo: campos.estoque_minimo.value
  };
}