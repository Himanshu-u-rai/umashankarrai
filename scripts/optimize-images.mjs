#!/usr/bin/env node
/**
 * One-off image optimization script (P0.1).
 * Reads the two source portraits in public/ and emits AVIF + WebP at 400/720/1080.
 *
 * Run from project root:
 *   node scripts/optimize-images.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT_DIR = path.join(ROOT, "public", "portrait");

const SOURCES = [
  { src: "public/umashankar-rai-portrait.png",        prefix: "hero" },
  { src: "public/umashankar-rai-portrait-studio.png", prefix: "studio" },
];

const WIDTHS = [400, 720, 1080];
const AVIF_QUALITY = 50;
const WEBP_QUALITY = 78;

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function processOne({ src, prefix }) {
  const absSrc = path.join(ROOT, src);
  try {
    await fs.access(absSrc);
  } catch {
    console.error(`[skip] source missing: ${src}`);
    return;
  }

  const input = sharp(absSrc, { failOn: "none" });
  const meta = await input.metadata();
  console.log(`\n${prefix}: ${src} (${meta.width}x${meta.height})`);

  for (const w of WIDTHS) {
    const base = path.join(OUT_DIR, `${prefix}-${w}`);

    const avifBuf = await sharp(absSrc)
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: AVIF_QUALITY, effort: 6 })
      .toBuffer();
    await fs.writeFile(`${base}.avif`, avifBuf);

    const webpBuf = await sharp(absSrc)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toBuffer();
    await fs.writeFile(`${base}.webp`, webpBuf);

    console.log(
      `  ${prefix}-${w}.avif ${fmtKB(avifBuf.length).padStart(9)}   ` +
      `${prefix}-${w}.webp ${fmtKB(webpBuf.length).padStart(9)}`
    );
  }
}

async function main() {
  await ensureDir(OUT_DIR);
  for (const s of SOURCES) {
    await processOne(s);
  }
  console.log(`\nDone. Output: ${path.relative(ROOT, OUT_DIR)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
