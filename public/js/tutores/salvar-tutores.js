import salvar from '../comum/salvar.js';
import listar from './listar-tutores.js';
export default function salvarCadastro(evento) {
  return salvar(evento, 'tutores', listar);
}
