import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const root = new URL('../', import.meta.url);
const sourceFiles = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git') continue;
    const absolute = join(directory, entry);
    const stat = statSync(absolute);
    if (stat.isDirectory()) walk(absolute);
    else if (['.ts', '.tsx', '.js', '.mjs', '.html', '.css', '.md', '.json', '.yml', '.yaml'].includes(extname(entry))) {
      sourceFiles.push(absolute);
    }
  }
}

walk(new URL('../', import.meta.url).pathname);

test('tracked text files do not contain the prohibited reference brand', () => {
  const prohibited = ['Jan', 'Bask'].join('');
  for (const path of sourceFiles) {
    const content = readFileSync(path, 'utf8');
    assert.equal(content.toLowerCase().includes(prohibited.toLowerCase()), false, path);
  }
});

test('checkout cannot fabricate payment success or order fulfillment', () => {
  const checkout = read('../src/components/cart/CheckoutModal.tsx');
  assert.doesNotMatch(checkout, /paymentStatus:\s*['"]PAID['"]/);
  assert.doesNotMatch(checkout, /Math\.random\s*\(/);
  assert.doesNotMatch(checkout, /setTimeout\s*\(/);
  assert.doesNotMatch(checkout, /placeOrder\s*\(/);
});

test('client role preview does not claim server-side authorization', () => {
  const roles = read('../src/components/common/RoleSwitcherModal.tsx');
  assert.match(roles, /preview|demonstration|local/i);
  assert.doesNotMatch(roles, /Enforces strict server-side RBAC/i);
  assert.doesNotMatch(roles, /Row Level Security/i);
});

test('client state does not preload fabricated customers, orders, or commissions', () => {
  const context = read('../src/context/AppContext.tsx');
  assert.doesNotMatch(context, /SEED_COMMISSIONS/);
  assert.doesNotMatch(context, /SEED_ORDERS/);
  assert.doesNotMatch(context, /SEED_AUDIT_LOGS/);
  assert.match(context, /readStoredArray<CommissionRequest>\('mag_commissions'/);
  assert.match(context, /readStoredArray<Order>\('mag_orders'/);
});

test('public catalogue does not preload fabricated artist and exhibition profiles', () => {
  const data = read('../src/data/seedData.ts');
  assert.match(data, /SEED_ARTISTS:\s*Artist\[\]\s*=\s*\[\]/);
  assert.match(data, /SEED_ARTWORKS:\s*Artwork\[\]\s*=\s*\[\]/);
  assert.match(data, /SEED_EXHIBITIONS:\s*Exhibition\[\]\s*=\s*\[\]/);
  assert.match(data, /SEED_JOURNAL_ARTICLES:\s*JournalArticle\[\]\s*=\s*\[\]/);
});

test('runtime asset references do not point into the source tree', () => {
  for (const path of sourceFiles.filter((file) => file.includes('/src/'))) {
    const content = readFileSync(path, 'utf8');
    assert.doesNotMatch(content, /\/src\/assets\/images\//, path);
  }
});

test('JSON-LD metadata is valid JSON and does not claim an unconfigured registry', () => {
  const html = read('../index.html');
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert.ok(match, 'JSON-LD block must exist');
  const metadata = JSON.parse(match[1]);
  assert.equal(metadata['@type'], 'ArtGallery');
  assert.equal(metadata.address.addressLocality, 'Arusha');
  assert.doesNotMatch(JSON.stringify(metadata), /blockchain|verified/i);
});
