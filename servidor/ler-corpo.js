// Transforma o JSON enviado pelo formulário em um objeto JavaScript.
export default async function lerCorpo(requisicao) {
  requisicao.setEncoding('utf8');
  let texto = '';

  for await (const parte of requisicao) {
    texto += parte;
    if (Buffer.byteLength(texto) > 32768) {
      const erro = new Error('Dados enviados excedem o limite permitido.');
      erro.status = 413;
      throw erro;
    }
  }

  if (texto === '') return {};
  const dados = JSON.parse(texto);
  if (dados === null || typeof dados !== 'object' || Array.isArray(dados)) {
    const erro = new Error('Envie os dados como um objeto JSON.');
    erro.status = 400;
    throw erro;
  }
  return dados;
}