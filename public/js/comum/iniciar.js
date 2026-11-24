import verificarLogin from './verificar-login.js';
import sair from './sair.js';
export default async function iniciar() {
  await verificarLogin();
  document.getElementById('botao-sair').addEventListener('click', sair);
}
