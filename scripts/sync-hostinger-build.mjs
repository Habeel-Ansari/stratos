import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, copyFileSync, statSync } from "node:fs";
import { dirname, join, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = join(projectRoot, "dist");
const rootAssetsDir = join(projectRoot, "assets");
const distAssetsDir = join(distDir, "assets");
const distIndexPath = join(distDir, "index-source.html");

if (!existsSync(distDir) || !existsSync(distIndexPath) || !existsSync(distAssetsDir)) {
  throw new Error("Build output in dist/ was not found. Run Vite build first.");
}

// 1. Sync hashed asset bundles (JS/CSS/fonts)
if (existsSync(rootAssetsDir)) {
  rmSync(rootAssetsDir, { recursive: true, force: true });
}
mkdirSync(rootAssetsDir, { recursive: true });
cpSync(distAssetsDir, rootAssetsDir, { recursive: true });
const copiedAssets = readdirSync(rootAssetsDir).length;

// 2. Copy ALL root-level dist files to the project root
//    (og-image.png, sitemap.xml, robots.txt, webmanifest, favicons,
//     Google/Bing verification files, etc.)
//    index-source.html → index.html is handled specially.
const rootFiles = readdirSync(distDir).filter((name) => {
  const full = join(distDir, name);
  return statSync(full).isFile() && name !== "index-source.html";
});

for (const name of rootFiles) {
  copyFileSync(join(distDir, name), join(projectRoot, name));
}

// 3. index-source.html → index.html
copyFileSync(distIndexPath, join(projectRoot, "index.html"));

console.log(
  `Synced Hostinger root files from dist/. ` +
  `Copied ${copiedAssets} asset files + ${rootFiles.length + 1} root files.`
);
