import requisicao from './comum/requisicao.js';
import mostrarMensagem from './comum/mostrar-mensagem.js';
document.getElementById('formulario-login').addEventListener('submit', async evento => {
  evento.preventDefault();
  const botao = document.getElementById('botao-entrar');
  botao.disabled = true;
  try {
    const dados = Object.fromEntries(new FormData(evento.currentTarget));
    await requisicao('/api/login', 'POST', dados);
    location.href = '/';
  } catch (erro) { mostrarMensagem(erro.message); }
  finally { botao.disabled = false; }
});
