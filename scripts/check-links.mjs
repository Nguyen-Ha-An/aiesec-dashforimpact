import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const BASE = '/aiesec-dashforimpact/';

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

function resolveInternalPath(pathname) {
  let relative = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, '');
  if (relative === '' || relative.endsWith('/')) relative += 'index.html';
  else if (!relative.includes('.')) relative += '/index.html';
  return join(DIST, relative);
}

const files = walk(DIST);
let brokenCount = 0;
const anchorPattern = /(?:href|src)="([^"]+)"/g;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  let match;
  while ((match = anchorPattern.exec(html))) {
    const raw = match[1];
    if (
      raw.startsWith('http://') ||
      raw.startsWith('https://') ||
      raw.startsWith('mailto:') ||
      raw.startsWith('data:') ||
      raw.startsWith('#')
    ) {
      continue;
    }
    if (!raw.startsWith('/')) continue; // ignore inline data/relative non-root paths we don't emit

    const [pathname, fragment] = raw.split('#');
    if (!pathname.startsWith(BASE) && pathname !== '/') continue; // only check our own site's internal links

    const targetPath = resolveInternalPath(pathname);
    if (!existsSync(targetPath)) {
      console.error(`BROKEN LINK: ${raw} (in ${file.replace(DIST, '')}) -> missing ${targetPath.replace(DIST, '')}`);
      brokenCount++;
      continue;
    }
    if (fragment && targetPath.endsWith('.html')) {
      const targetHtml = readFileSync(targetPath, 'utf8');
      if (!targetHtml.includes(`id="${fragment}"`)) {
        console.error(`BROKEN ANCHOR: ${raw} (in ${file.replace(DIST, '')}) -> no id="${fragment}" in ${targetPath.replace(DIST, '')}`);
        brokenCount++;
      }
    }
  }
}

if (brokenCount > 0) {
  console.error(`\n${brokenCount} broken internal link(s) found.`);
  process.exit(1);
} else {
  console.log('0 broken internal links');
}
