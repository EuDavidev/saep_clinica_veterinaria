import requisicao from './requisicao.js';

export default async function verificarLogin() {
  const usuario = await requisicao('/api/eu');
  document.getElementById('nome-usuario').textContent = 'Olá, ' + usuario.nome;
  document.getElementById('conteudo').hidden = false;
  return usuario;
}