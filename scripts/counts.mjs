// Reports per cause in a ticket, straight from the export: `npm run counts [ticket]`.
// Runs the same causes.ts the kb pages run (Node strips the TypeScript types).
import fs from 'node:fs';
import { groupByCause, uniqueById } from '../src/lib/kb/causes.ts';

const read = (p) => JSON.parse(fs.readFileSync(new URL(`../src/lib/data/${p}`, import.meta.url), 'utf8'));
const ticket = Number(process.argv[2] ?? 4471);
const tdir = new URL('../src/lib/data/tenants/', import.meta.url);
const tenants = new Map(fs.readdirSync(tdir).map((f) => read(`tenants/${f}`)).map((t) => [t.handle, t]));
const merged = uniqueById(read('reports-4471.json')).filter((r) => r.mergedInto === ticket);
const groups = groupByCause(merged, (r) => tenants.get(r.tenant), read('desk-notes.json').oneDayMove);
console.log(`#${ticket}: ${merged.length} reports`);
for (const g of groups) console.log(`${g.cause.padEnd(9)} ${String(g.reports.length).padStart(4)}  tenants ${g.tenants}  ${g.firstSeen} → ${g.lastSeen}`);
