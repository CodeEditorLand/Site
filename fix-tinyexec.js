import { copyFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

const root = process.cwd();
const nodeModules = join(root, "node_modules");
const tinyexecPath = join(nodeModules, "tinyexec");

if (!existsSync(tinyexecPath)) {
	console.log("tinyexec not found");
	process.exit(1);
}

// Ensure dist exists
const distPath = join(tinyexecPath, "dist");
if (!existsSync(distPath)) {
	console.log("tinyexec/dist not found");
	process.exit(1);
}

// Create a .js alias to .mjs if missing
const mainMjs = join(distPath, "main.mjs");
const mainJs = join(distPath, "main.js");

if (existsSync(mainMjs) && !existsSync(mainJs)) {
	copyFileSync(mainMjs, mainJs);
	console.log("Created main.js alias for tinyexec");
}

console.log("Tinyexec fix applied successfully");
