import requisicao from '../comum/requisicao.js';
import mostrarMensagem from '../comum/mostrar-mensagem.js';
import prepararEdicao from './preparar-edicao.js';
import excluirProduto from './excluir-produto.js';
import limparFormulario from './limpar-formulario.js';

export default async function listarProdutos() {
  const busca = document.getElementById('campo-busca').value;
  const produtos = await requisicao('/api/produtos?busca=' + encodeURIComponent(busca));
  const tabela = document.getElementById('tabela-produtos');
  tabela.replaceChildren();

  for (const produto of produtos) {
    const linha = document.createElement('tr');
    const preco = Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const valores = [produto.nome, produto.marca, produto.categoria, preco, produto.quantidade];

    for (const valor of valores) {
      const celula = document.createElement('td');
      celula.textContent = valor;
      linha.append(celula);
    }

    const acoes = document.createElement('td');
    const editar = document.createElement('button');
    editar.textContent = 'Editar';
    editar.addEventListener('click', function () {
      prepararEdicao(produto);
    });

    const excluir = document.createElement('button');
    excluir.textContent = 'Excluir';
    excluir.addEventListener('click', async function () {
      const confirmou = window.confirm('Excluir este produto? O histórico será preservado.');
      if (!confirmou) return;
      excluir.disabled = true;
      try {
        const resultado = await excluirProduto(produto.id);
        limparFormulario();
        await listarProdutos();
        mostrarMensagem(resultado.mensagem);
      } catch (erro) {
        mostrarMensagem(erro.message);
      } finally {
        excluir.disabled = false;
      }
    });

    acoes.append(editar, excluir);
    linha.append(acoes);
    tabela.append(linha);
  }

  if (produtos.length === 0) {
    const linha = tabela.insertRow();
    const celula = linha.insertCell();
    celula.colSpan = 6;
    celula.textContent = 'Nenhum produto encontrado.';
  }
}