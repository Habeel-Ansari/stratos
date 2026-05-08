import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = join(projectRoot, "dist");
const rootAssetsDir = join(projectRoot, "assets");
const distAssetsDir = join(distDir, "assets");
const rootIndexPath = join(projectRoot, "index.html");
const distIndexPath = join(distDir, "index-source.html");

if (!existsSync(distDir) || !existsSync(distIndexPath) || !existsSync(distAssetsDir)) {
  throw new Error("Build output in dist/ was not found. Run Vite build first.");
}

if (existsSync(rootAssetsDir)) {
  rmSync(rootAssetsDir, { recursive: true, force: true });
}

mkdirSync(rootAssetsDir, { recursive: true });
cpSync(distAssetsDir, rootAssetsDir, { recursive: true });
copyFileSync(distIndexPath, rootIndexPath);

const copiedAssets = readdirSync(rootAssetsDir).length;
console.log(`Synced Hostinger root files from dist/. Copied ${copiedAssets} asset files.`);
