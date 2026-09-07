import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // count

  let offset = 6 + 16 * pngBuffers.length;
  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += item.buffer.length;
  }
  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buffer)]);
}

async function generateFavicons() {
  const logoPath = path.resolve(__dirname, '../public/logo.png');
  const publicDir = path.resolve(__dirname, '../public');

  // Step 1: Trim whitespace around logo
  const trimmedLogoBuffer = await sharp(logoPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedLogoBuffer).metadata();
  console.log('Trimmed logo size:', trimmedMeta.width, 'x', trimmedMeta.height);

  // Step 2: The diamond emblem on the left of the trimmed logo is approximately square (height = trimmedMeta.height)
  const emblemWidth = Math.min(Math.round(trimmedMeta.height * 1.05), trimmedMeta.width);
  const emblemBuffer = await sharp(trimmedLogoBuffer)
    .extract({ left: 0, top: 0, width: emblemWidth, height: trimmedMeta.height })
    .trim()
    .toBuffer();

  const emblemMeta = await sharp(emblemBuffer).metadata();
  console.log('Emblem exact size:', emblemMeta.width, 'x', emblemMeta.height);

  // Step 3: Create a clean square canvas with comfortable breathing margin
  const maxDim = Math.max(emblemMeta.width, emblemMeta.height);
  const padding = Math.round(maxDim * 0.08); // 8% padding
  const squareSize = maxDim + padding * 2;

  const squareBuffer = await sharp(emblemBuffer)
    .extend({
      top: Math.round((squareSize - emblemMeta.height) / 2),
      bottom: squareSize - emblemMeta.height - Math.round((squareSize - emblemMeta.height) / 2),
      left: Math.round((squareSize - emblemMeta.width) / 2),
      right: squareSize - emblemMeta.width - Math.round((squareSize - emblemMeta.width) / 2),
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toBuffer();

  // Generate PNG buffers for multiple resolutions
  const p16 = await sharp(squareBuffer).resize(16, 16).png().toBuffer();
  const p32 = await sharp(squareBuffer).resize(32, 32).png().toBuffer();
  const p48 = await sharp(squareBuffer).resize(48, 48).png().toBuffer();
  const p96 = await sharp(squareBuffer).resize(96, 96).png().toBuffer();
  const p180 = await sharp(squareBuffer).resize(180, 180).png().toBuffer();
  const p192 = await sharp(squareBuffer).resize(192, 192).png().toBuffer();
  const p512 = await sharp(squareBuffer).resize(512, 512).png().toBuffer();

  // Save PNG files
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), p16);
  console.log('✓ Created public/favicon-16x16.png');

  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), p32);
  console.log('✓ Created public/favicon-32x32.png');

  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), p48);
  console.log('✓ Created public/favicon-48x48.png');

  fs.writeFileSync(path.join(publicDir, 'favicon-96x96.png'), p96);
  console.log('✓ Created public/favicon-96x96.png');

  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), p180);
  console.log('✓ Created public/apple-touch-icon.png (180x180)');

  fs.writeFileSync(path.join(publicDir, 'favicon-192x192.png'), p192);
  console.log('✓ Created public/favicon-192x192.png');

  fs.writeFileSync(path.join(publicDir, 'favicon-512x512.png'), p512);
  console.log('✓ Created public/favicon-512x512.png');

  // Multi-resolution binary ICO (16x16, 32x32, 48x48)
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: p16 },
    { width: 32, height: 32, buffer: p32 },
    { width: 48, height: 48, buffer: p48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Created public/favicon.ico (Multi-size 16/32/48 ICO container)');

  // Clean SVG Favicon embedding the crisp diamond emblem
  const b64 = p512.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${b64}" width="512" height="512"/>
</svg>\n`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg);
  console.log('✓ Created public/favicon.svg (Crystal Jaipuria Diamond Emblem)');

  console.log('All Google-compliant favicons generated successfully!');
}

generateFavicons().catch(console.error);
