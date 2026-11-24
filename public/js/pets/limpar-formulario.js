export default function limparFormulario() {
  const formulario = document.getElementById('formulario-produto');
  formulario.reset();
  formulario.elements.id.value = '';
  formulario.elements.quantidade.disabled = false;
  document.getElementById('titulo-formulario').textContent = 'Novo produto';
}