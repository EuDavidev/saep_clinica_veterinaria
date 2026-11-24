import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

export default async function abrirArquivo(caminho, resposta) {
  const paginas = {
    '/': '/principal.html',
    '/login': '/login.html',
    '/produtos': '/produtos.html',
    '/estoque': '/estoque.html'
  };
  const nome = paginas[caminho] || caminho;
  const pastaPublica = path.resolve(fileURLToPath(new URL('../public/', import.meta.url)));
  const arquivo = path.resolve(pastaPublica, '.' + decodeURIComponent(nome));
  const tipos = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
  const tipo = tipos[path.extname(arquivo)];

  // Somente arquivos HTML, CSS e JS dentro de public podem ser entregues.
  if (!arquivo.startsWith(pastaPublica + path.sep) || !tipo) {
    resposta.writeHead(404);
    return resposta.end('Arquivo não encontrado.');
  }

  try {
    const conteudo = await readFile(arquivo);
    resposta.writeHead(200, { 'Content-Type': tipo + '; charset=utf-8' });
    resposta.end(conteudo);
  } catch (erro) {
    resposta.writeHead(404);
    resposta.end('Arquivo não encontrado.');
  }
}