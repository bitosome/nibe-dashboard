import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css' };
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, `.${pathname === '/' ? '/preview/index.html' : pathname}`);
    if (!file.startsWith(`${root}${path.sep}`) && !file.startsWith(root)) throw new Error('Invalid path');
    // Preview exposes only the mock host and the compiled card, never workspace files.
    const relative = path.relative(root, file);
    if (!(relative.startsWith('preview/') || relative === 'dist/nibe-dashboard.js')) throw new Error('Not found');
    res.setHeader('Content-Type', types[path.extname(file)] ?? 'text/plain');
    res.setHeader('Cache-Control', 'no-store');
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(5187, '127.0.0.1', () => console.log('Synthetic preview: http://127.0.0.1:5187'));
