#!/usr/bin/env node
/**
 * One-off: render favicon-32.png, favicon-180.png, og-cover.jpg
 * from the advisor-mark.svg + LIC blue background.
 *
 *   node scripts/build-brand-assets.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const BRAND_DIR = path.join(ROOT, "public", "brand");
const MARK_SVG = path.join(BRAND_DIR, "advisor-mark.svg");

const LIC_BLUE = { r: 0, g: 44, b: 119, alpha: 1 };

async function favicon(size, outName) {
  const buf = await sharp(MARK_SVG, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await fs.writeFile(path.join(BRAND_DIR, outName), buf);
  console.log(`${outName} ${(buf.length / 1024).toFixed(1)} KB`);
}

async function ogCover() {
  const W = 1200;
  const H = 630;
  const MARK_SIZE = 280;

  // Render the SVG mark at MARK_SIZE
  const markPng = await sharp(MARK_SVG, { density: 512 })
    .resize(MARK_SIZE, MARK_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Text rendered as SVG (system serif/sans fallback — fine for OG render)
  const textSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <style>
        .name { font: 700 64px 'Helvetica Neue', Arial, sans-serif; fill: #FFFFFF; }
        .role { font: 500 36px 'Helvetica Neue', Arial, sans-serif; fill: #FFEEDD; }
        .eyebrow { font: 600 20px 'Helvetica Neue', Arial, sans-serif; fill: #FF8B1F; letter-spacing: 4px; }
      </style>
      <text x="520" y="245" class="eyebrow">SENIOR LIC ADVISOR</text>
      <text x="520" y="320" class="name">Umashankar Rai</text>
      <text x="520" y="385" class="role">Life insurance, planned with care.</text>
      <rect x="520" y="420" width="80" height="4" fill="#FF8B1F"/>
    </svg>
  `);

  const buf = await sharp({
      create: { width: W, height: H, channels: 3, background: LIC_BLUE },
    })
    .composite([
      { input: markPng, left: 160, top: 175 },
      { input: textSvg, left: 0, top: 0 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  await fs.writeFile(path.join(BRAND_DIR, "og-cover.jpg"), buf);
  console.log(`og-cover.jpg ${(buf.length / 1024).toFixed(1)} KB`);
}

async function main() {
  await fs.mkdir(BRAND_DIR, { recursive: true });
  await favicon(32, "favicon-32.png");
  await favicon(180, "favicon-180.png");
  await ogCover();
}

main().catch((e) => { console.error(e); process.exit(1); });
