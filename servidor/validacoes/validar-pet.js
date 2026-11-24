import exigir from './exigir.js';
import validarInteiro from './validar-inteiro.js';

export default function validarProduto(dados) {
  const produto = {
    nome: String(dados.nome ?? '').trim(),
    marca: String(dados.marca ?? '').trim(),
    categoria: String(dados.categoria ?? '').trim(),
    modelo: String(dados.modelo ?? '').trim(),
    conexao: String(dados.conexao ?? '').trim(),
    voltagem: String(dados.voltagem ?? '').trim()
  };

  exigir(produto.nome !== '' && produto.nome.length <= 100, 'Nome: preencha até 100 caracteres.');
  exigir(produto.marca !== '' && produto.marca.length <= 100, 'Marca: preencha até 100 caracteres.');
  exigir(produto.categoria !== '' && produto.categoria.length <= 60, 'Categoria: preencha até 60 caracteres.');
  exigir(produto.modelo !== '' && produto.modelo.length <= 100, 'Modelo: preencha até 100 caracteres.');
  exigir(produto.conexao.length <= 100, 'Conexão: use até 100 caracteres.');
  exigir(produto.voltagem.length <= 30, 'Voltagem: use até 30 caracteres.');

  const preco = String(dados.preco ?? '').trim().replace(',', '.');
  exigir(/^\d+(\.\d{1,2})?$/.test(preco), 'Preço: informe um valor não negativo com até duas casas decimais.');
  exigir(Number(preco) <= 99999999.99, 'Preço acima do limite permitido.');

  produto.preco = preco;
  produto.garantia_meses = validarInteiro(dados.garantia_meses);
  produto.estoque_minimo = validarInteiro(dados.estoque_minimo);

  return produto;
}