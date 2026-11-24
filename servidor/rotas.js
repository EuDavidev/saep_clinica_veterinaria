import responder from './responder.js';
import obterUsuario from './obter-usuario.js';
import validarInteiro from './validacoes/validar-inteiro.js';
import entrar from './funcoes/entrar.js';
import sair from './funcoes/sair.js';
import listarTutores from './funcoes/listar-tutores.js';
import cadastrarTutor from './funcoes/cadastrar-tutor.js';
import editarTutor from './funcoes/editar-tutor.js';
import listarPets from './funcoes/listar-pets.js';
import cadastrarPet from './funcoes/cadastrar-pet.js';
import editarPet from './funcoes/editar-pet.js';
import listarAgendamentos from './funcoes/listar-agendamentos.js';
import registrarAgendamento from './funcoes/registrar-agendamento.js';
import editarAgendamento from './funcoes/editar-agendamento.js';

export default async function rotas(req, res) {
  const caminho = new URL(req.url, 'http://localhost').pathname;
  const metodo = req.method;
  if (caminho === '/api/login' && metodo === 'POST') return entrar(req, res);
  if (caminho === '/api/logout' && metodo === 'POST') return sair(req, res);
  req.usuario = obterUsuario(req);
  if (!req.usuario) return responder(res, 401, { erro: 'Entre no sistema.' });
  if (caminho === '/api/eu' && metodo === 'GET') {
    return responder(res, 200, req.usuario);
  }
  if (caminho === '/api/tutores' && metodo === 'GET') return listarTutores(req, res);
  if (caminho === '/api/tutores' && metodo === 'POST') return cadastrarTutor(req, res);
  if (caminho === '/api/pets' && metodo === 'GET') return listarPets(req, res);
  if (caminho === '/api/pets' && metodo === 'POST') return cadastrarPet(req, res);
  if (caminho === '/api/agendamentos' && metodo === 'GET') return listarAgendamentos(req, res);
  if (caminho === '/api/agendamentos' && metodo === 'POST') return registrarAgendamento(req, res);
  const registro = caminho.match(/^\/api\/(tutores|pets|agendamentos)\/(\d+)$/);
  if (registro && metodo === 'PUT') {
    req.id = validarInteiro(registro[2]);
    if (registro[1] === 'tutores') return editarTutor(req, res);
    if (registro[1] === 'pets') return editarPet(req, res);
    return editarAgendamento(req, res);
  }
  responder(res, 404, { erro: 'Operacao nao encontrada.' });
}
