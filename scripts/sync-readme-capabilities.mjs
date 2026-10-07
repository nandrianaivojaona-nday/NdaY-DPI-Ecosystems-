import { readFileSync, writeFileSync } from "node:fs";

const DATA = "data/architecture92.ts";
const README = "README.md";
const START = "<!-- capabilities:start -->";
const END = "<!-- capabilities:end -->";
const ORDER = ["implemented", "pilot", "planned", "blocked"];

const src = readFileSync(DATA, "utf8");
const block = src.match(/export const capabilities\s*=\s*\[([\s\S]*?)\n\]/);
if (!block) throw new Error("capabilities array not found in " + DATA);

const rows = [...block[1].matchAll(/name:\s*"([^"]+)"\s*,\s*status:\s*"([^"]+)"/g)]
  .map(([, name, status]) => ({ name, status }));
if (!rows.length) throw new Error("No capabilities parsed");

const bad = rows.filter((r) => !ORDER.includes(r.status));
if (bad.length) throw new Error("Unknown status: " + bad.map((r) => r.status).join(", "));

const cap = (s) => s[0].toUpperCase() + s.slice(1);
const counts = ORDER.map((s) => `${cap(s)}: ${rows.filter((r) => r.status === s).length}`).join(", ");
const table = [
  "| Capability | Status |",
  "|---|---|",
  ...rows.map((r) => `| ${r.name} | ${cap(r.status)} |`),
  "",
  `Summary: ${counts}.`,
].join("\n");

const readme = readFileSync(README, "utf8");
const re = new RegExp(`${START}[\\s\\S]*?${END}`);
if (!re.test(readme)) throw new Error("Markers not found in " + README);

const next = readme.replace(re, `${START}\n${table}\n${END}`);
if (next === readme) console.log("README already up to date.");
else { writeFileSync(README, next); console.log("README capability table updated."); }
