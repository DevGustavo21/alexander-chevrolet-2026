#!/usr/bin/env node
// Upscale the 5 hero vehicle images to 4K using Real-ESRGAN, then
// re-encode to high-quality AVIF.
//
// Pipeline per image:
//   1. sharp: decode (avif/webp/jpg) -> PNG (lossless intermediate)
//   2. realesrgan-ncnn-vulkan x4 with realesrgan-x4plus model
//   3. sharp: downscale (if huge) -> 3840px wide max, encode AVIF q=80
//
// Result: clean, sharp 4K hero images, no blur/pixelation.

import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const VEHICLES = path.join(ROOT, 'public', 'vehicles');
const TMP = path.join(ROOT, 'tools', 'tmp');
const REALESRGAN_DIR = path.join(ROOT, 'tools', 'upscale');
const REALESRGAN_BIN = path.join(REALESRGAN_DIR, 'realesrgan-ncnn-vulkan');

mkdirSync(TMP, { recursive: true });

// (sourceFile, outputFile) — output goes back into public/vehicles
// overwriting the same path the app already references.
const HERO_IMAGES = [
  { src: 'Suburban.avif', out: 'Suburban.avif' },
  { src: 'Tahoe-High-Country.webp', out: 'Tahoe-High-Country.avif' },
  { src: 'Tahoe-Z71.avif', out: 'Tahoe-Z71.avif' },
  { src: 'Silverado-High-Country.avif', out: 'Silverado-High-Country.avif' },
  { src: 'Silverado-RST.avif', out: 'Silverado-RST.avif' },
];

// Target max width in pixels — 4K hero (16:9 = 3840x2160).
const TARGET_WIDTH = 3840;

async function processOne({ src, out }) {
  const srcPath = path.join(VEHICLES, src);
  const outPath = path.join(VEHICLES, out);
  if (!existsSync(srcPath)) {
    console.error(`  ! Missing: ${src}`);
    return;
  }

  const baseName = path.basename(src, path.extname(src));
  const pngIn = path.join(TMP, `${baseName}.in.png`);
  const pngOut = path.join(TMP, `${baseName}.4x.png`);

  const meta = await sharp(srcPath).metadata();
  console.log(`\n→ ${src} (${meta.width}x${meta.height}, ${(statSync(srcPath).size/1024).toFixed(0)} KB)`);

  console.log('  · decoding to PNG…');
  await sharp(srcPath).png({ compressionLevel: 0 }).toFile(pngIn);

  console.log('  · upscaling 4× with Real-ESRGAN (realesrgan-x4plus)…');
  execFileSync(
    REALESRGAN_BIN,
    ['-i', pngIn, '-o', pngOut, '-n', 'realesrgan-x4plus', '-s', '4', '-f', 'png'],
    { stdio: 'inherit', cwd: REALESRGAN_DIR }
  );

  const upMeta = await sharp(pngOut).metadata();
  console.log(`  · upscaled: ${upMeta.width}x${upMeta.height}`);

  console.log(`  · downscaling to ${TARGET_WIDTH}px wide and encoding AVIF…`);
  const resized = sharp(pngOut).resize({
    width: Math.min(TARGET_WIDTH, upMeta.width),
    withoutEnlargement: true,
    fit: 'inside',
    kernel: 'lanczos3',
  });

  await resized
    .avif({ quality: 78, effort: 6, chromaSubsampling: '4:4:4' })
    .toFile(outPath + '.tmp');

  // Atomic-ish replace
  const fs = await import('node:fs/promises');
  await fs.rename(outPath + '.tmp', outPath);

  const finalMeta = await sharp(outPath).metadata();
  const finalSize = statSync(outPath).size;
  console.log(`  ✓ ${out}: ${finalMeta.width}x${finalMeta.height}, ${(finalSize/1024).toFixed(0)} KB`);
}

(async () => {
  console.log('Real-ESRGAN 4K hero upscaler');
  console.log(`  source dir: ${VEHICLES}`);
  console.log(`  binary:     ${REALESRGAN_BIN}`);

  for (const img of HERO_IMAGES) {
    try {
      await processOne(img);
    } catch (e) {
      console.error(`  ✗ failed on ${img.src}:`, e.message);
      throw e;
    }
  }

  console.log('\nDone. All hero images upscaled to 4K AVIF.');
})();
