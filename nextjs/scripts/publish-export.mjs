import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './verify-export.mjs';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../out');
const target = path.resolve(process.argv[2] || path.join(source, '../..'));
const config = path.join(target, '.git/config');
if (!fs.existsSync(config) || !fs.readFileSync(config, 'utf8').includes('github.com/Dipesh-xtha/New_Portfolio.git')) {
  throw new Error('The publishing target must be the New_Portfolio Git checkout.');
}
for (const name of fs.readdirSync(source)) {
  fs.cpSync(path.join(source, name), path.join(target, name), { recursive: true });
}
console.log(`Copied the verified static export to ${target}. Review git status before committing and pushing.`);
