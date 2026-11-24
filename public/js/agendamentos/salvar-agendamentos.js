import salvar from '../comum/salvar.js';
import listar from './listar-agendamentos.js';
export default function salvarCadastro(evento) {
  return salvar(evento, 'agendamentos', listar);
}
