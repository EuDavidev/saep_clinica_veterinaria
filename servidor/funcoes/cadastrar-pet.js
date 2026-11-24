import banco from '../db.js';
import responder from '../responder.js';
import validarPet from '../validacoes/validar-pet.js';
export default async function cadastrarPet(req, res) {
  const p = validarPet(req.body);
  await banco.execute(`INSERT INTO pets (nome,especie,raca,idade,tutor_id)
    VALUES (?,?,?,?,?)`, [p.nome,p.especie,p.raca,p.idade,p.tutor_id]);
  responder(res, 201, { mensagem: 'Pet cadastrado.' });
}
