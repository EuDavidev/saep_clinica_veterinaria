// Envia um pedido à API e devolve os dados recebidos.
export default async function requisicao(caminho, metodo = 'GET', dados) {
  const opcoes = { method: metodo };
  if (dados !== undefined) {
    opcoes.headers = { 'Content-Type': 'application/json' };
    opcoes.body = JSON.stringify(dados);
  }

  const resposta = await fetch(caminho, opcoes);
  const resultado = await resposta.json();

  if (!resposta.ok) {
    if (resposta.status === 401 && caminho !== '/api/login') window.location.href = '/login';
    throw new Error(resultado.erro || 'Não foi possível concluir a operação.');
  }

  return resultado;
}