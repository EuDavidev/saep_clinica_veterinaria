// textContent evita interpretar dados digitados como HTML.
export default function tabela(registros, valores, editar) {
  const corpo = document.getElementById('tabela');
  corpo.replaceChildren();
  for (const item of registros) {
    const linha = corpo.insertRow();
    for (const valor of valores(item)) linha.insertCell().textContent = valor ?? '';
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = 'Editar';
    botao.addEventListener('click', () => editar(item));
    linha.insertCell().append(botao);
  }
  if (!registros.length) {
    const celula = corpo.insertRow().insertCell();
    celula.colSpan = document.querySelectorAll('thead th').length;
    celula.textContent = 'Nenhum registro encontrado.';
  }
}
