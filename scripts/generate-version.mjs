import fs from "fs";
import { execSync } from "child_process";

const pkg = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8")
);

const now = new Date();

const pad = (n) => String(n).padStart(2, "0");

const build =
  now.getFullYear() +
  pad(now.getMonth() + 1) +
  pad(now.getDate()) +
  pad(now.getHours()) +
  pad(now.getMinutes());

function git(command, fallback = "") {
  try {
    return execSync(command).toString().trim();
  } catch {
    return fallback;
  }
}

const version = {
  product: "NdaY' Digital Public Infrastructure Ecosystems",
  organization: "NdaY' Individual Enterprise",

  version: pkg.version,

  engineeringGeneration: Number(pkg.version.split(".")[0]),

  codename: process.env.NDAY_CODENAME || "NdaY'DPI Ecosystems",

  ecosystemArchitecture: "9.2",

  tveEngine: "3.0.0",

  build,

  buildTimestamp: now.toISOString(),

  commit: git("git rev-parse --short HEAD", "unknown"),

  branch: git("git rev-parse --abbrev-ref HEAD", "unknown"),

  environment: process.env.NODE_ENV || "development",

  node: process.version,
};

fs.writeFileSync(
  new URL("../version.json", import.meta.url),
  JSON.stringify(version, null, 2)
);

console.log("");
console.log("✓ NdaY' Version generated");
console.log(version);
console.log("");