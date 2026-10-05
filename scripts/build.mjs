import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { Script } from 'node:vm';
const root = new URL('../', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
const names = ['assets', 'fixtures', 'domain', 'files', 'app', 'manual-review', 'webmcp'];
const scripts = await Promise.all(names.map(name => read(`src/${name}.js`)));
const js = `(()=>{\n'use strict';\n${scripts.join('\n')}\n})();`;
new Script(js, { filename: 'mahogany.js' });
const css = await read('src/styles.css');
const html = await read('src/index.html');
const output = html.replace('<!-- STYLES -->', () => `<style>${css}</style>`)
  .replace('<!-- APPLICATION -->', () => `<script>${js}</script>`);
await mkdir(new URL('dist/', root), { recursive: true });
await writeFile(new URL('dist/index.html', root), output);
console.log(`Built Mahogany: ${Buffer.byteLength(output)} bytes, all assets embedded.`);
