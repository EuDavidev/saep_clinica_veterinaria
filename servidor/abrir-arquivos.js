import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

export default async function abrirArquivo(caminho, res) {
  const paginas = { '/': '/principal.html', '/login': '/login.html',
    '/tutores': '/tutores.html', '/pets': '/pets.html',
    '/agendamentos': '/agendamentos.html' };
  const pasta = fileURLToPath(new URL('../public/', import.meta.url));
  const arquivo = path.resolve(pasta, '.' + decodeURIComponent(
    paginas[caminho] || caminho));
  const tipos = { '.html': 'text/html', '.js': 'text/javascript',
    '.css': 'text/css' };
  const tipo = tipos[path.extname(arquivo)];
  if (!arquivo.startsWith(pasta) || !tipo) {
    res.writeHead(404);
    return res.end('Arquivo nao encontrado.');
  }
  try {
    const conteudo = await readFile(arquivo);
    res.writeHead(200, { 'Content-Type': tipo + '; charset=utf-8',
      'Cache-Control': 'no-store' });
    res.end(conteudo);
  } catch {
    res.writeHead(404);
    res.end('Arquivo nao encontrado.');
  }
}
