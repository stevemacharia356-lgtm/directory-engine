import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const MAX_HTML = 50 * 1024;
const MAX_JS = 60 * 1024;
const MAX_FIRESTORE_DOC = 800 * 1024;

function walk(dir, callback) {
  const files = readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const path = join(dir, file.name);
    if (file.isDirectory()) {
      if (file.name !== 'node_modules') walk(path, callback);
    } else {
      callback(path, statSync(path).size);
    }
  }
}

let issues = 0;
console.log('Checking build output...\n');

walk('dist', (path, size) => {
  if (path.endsWith('.html') && size > MAX_HTML) {
    console.warn(`WARNING: Large HTML file: ${path} (${(size/1024).toFixed(1)}KB)`);
    issues++;
  }
  if (path.endsWith('.js') && size > MAX_JS) {
    console.warn(`WARNING: Large JS file: ${path} (${(size/1024).toFixed(1)}KB)`);
    issues++;
  }
});

console.log(`\nFirestore document size limit: ${(MAX_FIRESTORE_DOC/1024).toFixed(0)}KB`);
console.log('Monitor directory documents via Firebase Console to ensure they stay under 1MB.');

if (issues === 0) {
  console.log('\nBuild passes performance checks.');
} else {
  console.warn(`\n${issues} performance issue(s) found.`);
}