export default function exigir(condicao, mensagem, status = 400) {
  if (!condicao) throw Object.assign(new Error(mensagem), { status });
}
