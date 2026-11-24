// Insertion sort: insere cada produto na posição correta da lista.
export default function ordenarProdutos(produtos) {
  for (let indice = 1; indice < produtos.length; indice++) {
    const produtoAtual = produtos[indice];
    let anterior = indice - 1;

    while (anterior >= 0 && produtos[anterior].nome.localeCompare(
      produtoAtual.nome, 'pt-BR', { sensitivity: 'base' }
    ) > 0) {
      produtos[anterior + 1] = produtos[anterior];
      anterior--;
    }

    produtos[anterior + 1] = produtoAtual;
  }

  return produtos;
}