export function lerFormulario() {
  return Object.fromEntries(new FormData(document.getElementById('formulario')));
}
export function limparFormulario() {
  const form = document.getElementById('formulario');
  form.reset();
  form.elements.id.value = '';
  if (form.elements.cpf) form.elements.cpf.required = true;
  document.getElementById('titulo-formulario').textContent = 'Novo cadastro';
}
export function prepararEdicao(item) {
  const form = document.getElementById('formulario');
  form.reset();
  for (const [campo, valor] of Object.entries(item)) {
    const elemento = Array.from(form.elements).find(e => e.name === campo);
    if (elemento && campo !== 'cpf') elemento.value = valor;
  }
  if (form.elements.cpf) {
    form.elements.cpf.value = '';
    form.elements.cpf.required = false;
  }
  if (form.elements.data_hora) {
    form.elements.data_hora.value = item.data_hora.slice(0, 16).replace(' ', 'T');
  }
  document.getElementById('titulo-formulario').textContent = 'Editar cadastro';
  form.scrollIntoView({ behavior: 'smooth' });
  form.querySelector('input:not([type=hidden]),select').focus();
}
