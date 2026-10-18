import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../out');
const required = ['index.html', '404.html', '.nojekyll', 'CNAME', 'robots.txt', 'sitemap.xml',
  'case-study/index.html', 'case-study.html', 'case-study/website/index.html',
  'case-study/kyc/index.html', 'case-study/product/index.html',
  'Dipesh_Shrestha_resume.pdf', 'assets/ranjana-greeting.svg'];
const errors = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Missing required file: ${file}`);
}
if (fs.readFileSync(path.join(root, 'CNAME'), 'utf8').trim() !== 'dipeshshrestha69.com.np') {
  errors.push('Incorrect custom domain');
}
const files = fs.readdirSync(root, { recursive: true }).filter((file) => /\.(html|css)$/.test(file));
let checked = 0;
for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const references = file.endsWith('.html')
    ? [...source.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1])
    : [...source.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)].map((m) => m[1]);
  for (const reference of references) {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) continue;
    const url = new URL(reference.replaceAll('&amp;', '&'), `https://dipeshshrestha69.com.np/${file}`);
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    let target = path.join(root, relative);
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    checked++;
    if (!fs.existsSync(target)) errors.push(`${file}: ${reference}`);
  }
}
if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exit(1);
}
console.log(`Export verified: ${required.length} required files; ${checked} local links/assets; ${files.length} HTML/CSS files.`);
