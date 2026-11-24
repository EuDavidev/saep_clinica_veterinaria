import iniciar from './iniciar.js';
import mostrarMensagem from './mostrar-mensagem.js';
import { limparFormulario } from './formulario.js';
export default async function prepararCadastro(listar, salvar) {
  await iniciar();
  document.getElementById('formulario').addEventListener('submit', salvar);
  document.getElementById('botao-cancelar').addEventListener('click', limparFormulario);
  document.getElementById('formulario-busca')?.addEventListener('submit', async evento => {
    evento.preventDefault();
    try { await listar(); } catch (erro) { mostrarMensagem(erro.message); }
  });
  await listar();
}
