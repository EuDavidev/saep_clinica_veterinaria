import mostrarMensagem from '../comum/mostrar-mensagem.js';
import listarProdutos from './listar-produtos.js';
import lerFormulario from './ler-formulario.js';
import cadastrarProduto from './cadastrar-produto.js';
import editarProduto from './editar-produto.js';
import limparFormulario from './limpar-formulario.js';

export default async function salvarProduto(evento) {
  evento.preventDefault();
  const botao = document.getElementById('botao-salvar');
  botao.disabled = true;

  try {
    const dados = lerFormulario();
    let resultado;
    if (dados.id === '') {
      resultado = await cadastrarProduto(dados);
    } else {
      resultado = await editarProduto(dados);
    }
    limparFormulario();
    await listarProdutos();
    mostrarMensagem(resultado.mensagem);
  } catch (erro) {
    mostrarMensagem(erro.message);
  } finally {
    botao.disabled = false;
  }
}