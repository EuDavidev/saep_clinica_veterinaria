import prepararCadastro from './comum/preparar-cadastro.js';
import mostrarMensagem from './comum/mostrar-mensagem.js';
import listar from './agendamentos/listar-agendamentos.js';
import salvar from './agendamentos/salvar-agendamentos.js';
prepararCadastro(listar, salvar).catch(erro => mostrarMensagem(erro.message));
