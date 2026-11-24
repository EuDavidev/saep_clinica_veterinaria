import sessoes from './sessoes.js';

export default function obterUsuario(requisicao) {
  const token = requisicao.headers.cookie?.match(/(?:^|;\s*)sessao=([a-f0-9]+)/)?.[1];
  const sessao = sessoes.get(token);

  if (!sessao || sessao.expira < Date.now()) {
    sessoes.delete(token);
    return null;
  }

  return { id: sessao.id, nome: sessao.nome };
}