import prepararCadastro from './comum/preparar-cadastro.js';
import mostrarMensagem from './comum/mostrar-mensagem.js';
import listar from './pets/listar-pets.js';
import salvar from './pets/salvar-pets.js';
prepararCadastro(listar, salvar).catch(erro => mostrarMensagem(erro.message));
