import requisicao from '../comum/requisicao.js';

export default async function listarHistorico() {
  const historico = await requisicao('/api/movimentacoes');
  const tabela = document.getElementById('tabela-historico');
  tabela.replaceChildren();

  for (const movimento of historico) {
    const linha = document.createElement('tr');
    const data = movimento.data.split('-').reverse().join('/');
    const valores = [movimento.produto, movimento.tipo, movimento.quantidade, data, movimento.responsavel];

    for (const valor of valores) {
      const celula = document.createElement('td');
      celula.textContent = valor;
      linha.append(celula);
    }
    tabela.append(linha);
  }

  if (historico.length === 0) {
    const linha = tabela.insertRow();
    const celula = linha.insertCell();
    celula.colSpan = 5;
    celula.textContent = 'Nenhuma movimentação registrada.';
  }
}