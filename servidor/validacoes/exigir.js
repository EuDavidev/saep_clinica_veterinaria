// Interrompe a operação quando uma regra não é atendida.
export default function exigir(condicao, mensagem) {
  if (!condicao) {
    const erro = new Error(mensagem);
    erro.status = 400;
    throw erro;
  }
}