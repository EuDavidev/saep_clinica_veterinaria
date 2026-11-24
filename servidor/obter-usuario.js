import sessoes from './sessoes.js';
export default function obterUsuario(req) {
  const token = req.headers.cookie?.match(/(?:^|;\s*)sessao=([a-f0-9]{64})/)?.[1];
  const sessao = sessoes.get(token);
  if (!sessao || sessao.expira <= Date.now()) {
    sessoes.delete(token);
    return null;
  }
  return { id: sessao.id, nome: sessao.nome };
}
