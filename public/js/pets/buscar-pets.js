import listarProdutos from './listar-produtos.js';
import mostrarMensagem from '../comum/mostrar-mensagem.js';

export default async function buscarProdutos(evento) {
  evento.preventDefault();
  try {
    await listarProdutos();
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
}