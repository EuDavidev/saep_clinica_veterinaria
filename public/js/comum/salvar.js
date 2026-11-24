import requisicao from './requisicao.js';
import mostrarMensagem from './mostrar-mensagem.js';
import { lerFormulario, limparFormulario } from './formulario.js';

export default async function salvar(evento, recurso, listar) {
  evento.preventDefault();
  const botao = document.getElementById('botao-salvar');
  botao.disabled = true;
  try {
    const dados = lerFormulario();
    const caminho = '/api/' + recurso + (dados.id ? '/' + dados.id : '');
    const resultado = await requisicao(caminho, dados.id ? 'PUT' : 'POST', dados);
    limparFormulario();
    await listar();
    mostrarMensagem(resultado.mensagem);
  } catch (erro) { mostrarMensagem(erro.message); }
  finally { botao.disabled = false; }
}
