const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const output = path.join(root, 'dist');
const files = ['index.html', 'style.css', 'script.js'];
const folders = ['images', 'music', 'videos'];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

files.forEach((file) => {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
});

folders.forEach((folder) => {
  fs.cpSync(path.join(root, folder), path.join(output, folder), { recursive: true });
});

console.log('Static site built in dist/');
