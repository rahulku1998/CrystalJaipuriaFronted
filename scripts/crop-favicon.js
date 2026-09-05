import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicons() {
  const logoPath = path.resolve(__dirname, '../public/logo.png');
  const publicDir = path.resolve(__dirname, '../public');

  // Step 1: Trim whitespace around logo
  const trimmedLogoBuffer = await sharp(logoPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedLogoBuffer).metadata();
  console.log('Trimmed logo size:', trimmedMeta.width, 'x', trimmedMeta.height);

  // Step 2: The diamond emblem on the left of the trimmed logo is approximately square (height = trimmedMeta.height)
  // Extract roughly the square emblem from left
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
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .toBuffer();

  // 1. favicon-48x48.png (Google Search multiple of 48px square requirement)
  await sharp(squareBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('✓ Created public/favicon-48x48.png');

  // 2. favicon-96x96.png
  await sharp(squareBuffer)
    .resize(96, 96, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-96x96.png'));
  console.log('✓ Created public/favicon-96x96.png');

  // 3. favicon-192x192.png (Google Android & high-DPI desktop)
  await sharp(squareBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-192x192.png'));
  console.log('✓ Created public/favicon-192x192.png');

  // 4. apple-touch-icon.png (180x180 for iOS)
  await sharp(squareBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  // 5. favicon.ico (48x48 PNG format for standard browsers & Google Favicon crawler)
  await sharp(squareBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('✓ Created public/favicon.ico');

  console.log('All Google-compliant favicons generated successfully!');
}

generateFavicons().catch(console.error);
