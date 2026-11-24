import mostrarMensagem from '../comum/mostrar-mensagem.js';
import listarSaldos from './listar-saldos.js';
import listarHistorico from './listar-historico.js';
import registrarMovimentacao from './registrar-movimentacao.js';

export default async function salvarMovimento(evento) {
  evento.preventDefault();
  const botao = document.getElementById('botao-movimentar');
  botao.disabled = true;

  try {
    const resultado = await registrarMovimentacao();
    await listarSaldos();
    await listarHistorico();
    mostrarMensagem(resultado.mensagem);
    document.getElementById('formulario-movimento').elements.quantidade.value = '';
  } catch (erro) {
    mostrarMensagem(erro.message);
  } finally {
    botao.disabled = false;
  }
}