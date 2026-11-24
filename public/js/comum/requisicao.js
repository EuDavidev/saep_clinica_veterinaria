export default async function requisicao(caminho, metodo = 'GET', dados) {
  const opcoes = { method: metodo };
  if (dados !== undefined) {
    opcoes.headers = { 'Content-Type': 'application/json' };
    opcoes.body = JSON.stringify(dados);
  }
  const resposta = await fetch(caminho, opcoes);
  const resultado = await resposta.json();
  if (!resposta.ok) {
    if (resposta.status === 401 && caminho !== '/api/login') location.href = '/login';
    throw new Error(resultado.erro || 'Nao foi possivel concluir.');
  }
  return resultado;
}
