// Toda resposta da API tem o mesmo formato JSON.
export default function responder(resposta, status, dados) {
  resposta.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  resposta.end(JSON.stringify(dados));
}