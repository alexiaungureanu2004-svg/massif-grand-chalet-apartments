import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.webp':'image/webp', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.txt':'text/plain; charset=utf-8' };
createServer(async (req,res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const path = resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!path.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    const data = await readFile(path);
    res.writeHead(200, {'Content-Type':mime[extname(path)] || 'application/octet-stream'}); res.end(data);
  } catch { res.writeHead(404); res.end('Pagina nu a fost găsită.'); }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
