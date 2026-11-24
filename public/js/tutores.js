import prepararCadastro from './comum/preparar-cadastro.js';
import mostrarMensagem from './comum/mostrar-mensagem.js';
import listar from './tutores/listar-tutores.js';
import salvar from './tutores/salvar-tutores.js';
prepararCadastro(listar, salvar).catch(erro => mostrarMensagem(erro.message));
