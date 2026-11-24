import requisicao from './requisicao.js';
import mostrarMensagem from './mostrar-mensagem.js';

export default async function sair() {
  try {
    await requisicao('/api/logout', 'POST');
    window.location.href = '/login';
  } catch (erro) {
    mostrarMensagem(erro.message);
  }
}