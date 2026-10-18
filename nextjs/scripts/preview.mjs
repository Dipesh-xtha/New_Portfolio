import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../out');
const port = Number(process.env.PORT || 4174);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.txt': 'text/plain', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.pdf': 'application/pdf', '.xml': 'application/xml' };
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let target = path.resolve(root, '.' + decodeURIComponent(url.pathname));
  if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    if (!url.pathname.endsWith('/')) {
      res.writeHead(301, { Location: url.pathname + '/' + url.search }).end(); return;
    }
    target = path.join(target, 'index.html');
  }
  const found = fs.existsSync(target) && fs.statSync(target).isFile();
  if (!found) target = path.join(root, '404.html');
  res.writeHead(found ? 200 : 404, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream' });
  fs.createReadStream(target).pipe(res);
}).listen(port, '127.0.0.1', () => console.log(`Static export preview: http://localhost:${port}`));
