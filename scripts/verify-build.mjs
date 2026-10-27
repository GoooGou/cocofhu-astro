import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const files = fs.readdirSync(root, { recursive: true }).map(String);
const errors = [];
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    const pathname = decodeURIComponent(raw.split(/[?#]/)[0]);
    const target = path.join(root, pathname);
    if (!fs.existsSync(target) && !fs.existsSync(path.join(target, 'index.html'))) errors.push(`${file}: ${raw}`);
  }
}
if (files.some(file => /qa-editor-|qa-delete-/.test(file))) errors.push('Temporary test content in production output');
if (fs.existsSync(path.join(root, 'keystatic')) || fs.existsSync(path.join(root, 'api/keystatic'))) errors.push('Local editor exposed in static output');
const result = { pages: files.filter(file => file.endsWith('.html')).length, brokenInternalLinks: errors, localEditorExcluded: !fs.existsSync(path.join(root, 'keystatic')), passed: errors.length === 0 };
fs.writeFileSync('qa/build-results.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
