import iniciar from './comum/iniciar.js';
import mostrarMensagem from './comum/mostrar-mensagem.js';
iniciar().catch(erro => mostrarMensagem(erro.message));
