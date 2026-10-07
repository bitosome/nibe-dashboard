import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, statSync } from 'node:fs';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
test('HACS metadata points to the shipped self-contained bundle', () => {
  const hacs = JSON.parse(read('hacs.json'));
  const pkg = JSON.parse(read('package.json'));
  assert.equal(hacs.filename, `${pkg.name}.js`);
  assert.ok(statSync(new URL(`../dist/${hacs.filename}`, import.meta.url)).size < 180000);
  const source = read(`dist/${hacs.filename}`);
  assert.doesNotMatch(source, /from\s*["']lit["']/);
  assert.match(source, /nibe-dashboard-editor/);
});
test('UI service writers never target raw NIBE domains', () => {
  const source = read('src/nibe-dashboard.ts');
  assert.doesNotMatch(source, /this\.command\(id, '(number|switch|select|automation)'/);
  assert.doesNotMatch(source, /fetch\(|setInterval\(|localStorage|sessionStorage/);
});
