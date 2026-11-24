import salvar from '../comum/salvar.js';
import listar from './listar-pets.js';
export default function salvarCadastro(evento) {
  return salvar(evento, 'pets', listar);
}
