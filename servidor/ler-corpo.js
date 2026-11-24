export default async function lerCorpo(req) {
  req.setEncoding('utf8');
  let texto = '';
  for await (const parte of req) {
    texto += parte;
    if (Buffer.byteLength(texto) > 32768) {
      throw Object.assign(new Error('Dados muito grandes.'), { status: 413 });
    }
  }
  const dados = texto ? JSON.parse(texto) : {};
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
    throw Object.assign(new Error('Envie um objeto JSON.'), { status: 400 });
  }
  return dados;
}
