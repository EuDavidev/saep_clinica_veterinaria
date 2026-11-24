import requisicao from '../comum/requisicao.js';

export default async function listarSaldos() {
  const produtos = await requisicao('/api/produtos');
  const tabela = document.getElementById('tabela-saldos');
  const seletor = document.getElementById('produto-movimento');
  const selecionado = seletor.value;
  tabela.replaceChildren();
  seletor.replaceChildren(new Option('Selecione um produto', ''));

  for (const produto of produtos) {
    seletor.add(new Option(produto.nome + ' (saldo ' + produto.quantidade + ')', produto.id));
    let situacao = 'Normal';
    if (produto.quantidade < produto.estoque_minimo) situacao = 'Abaixo do mínimo';

    const linha = document.createElement('tr');
    const valores = [produto.nome, produto.quantidade, produto.estoque_minimo, situacao];
    for (const valor of valores) {
      const celula = document.createElement('td');
      celula.textContent = valor;
      linha.append(celula);
    }
    if (situacao === 'Abaixo do mínimo') linha.classList.add('estoque-baixo');
    tabela.append(linha);
  }

  seletor.value = selecionado;
  if (produtos.length === 0) {
    const linha = tabela.insertRow();
    const celula = linha.insertCell();
    celula.colSpan = 4;
    celula.textContent = 'Nenhum produto disponível.';
  }
}