import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const syncImages = async () => {
  const imagesDir = path.resolve(__dirname, "../public/images");
  const productsDir = path.resolve(__dirname, "../public/images/products");

  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
  if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });

  try {
    const res = await fetch("https://shop.codewithrahulkumawat.com/api/products");
    const data = await res.json();
    const products = data.products || data || [];

    console.log(`Syncing ${products.length} product images to clean static .webp...`);

    for (const prod of products) {
      const slug = prod.slug || prod._id;
      const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

      // Sync all images for this product (main + secondary views)
      if (Array.isArray(prod.images)) {
        for (let i = 0; i < prod.images.length; i++) {
          const imgUrl = typeof prod.images[i] === "string" ? prod.images[i] : prod.images[i]?.url;
          if (!imgUrl) continue;

          const outName = i === 0 ? `${cleanSlug}.webp` : `${cleanSlug}-${i + 1}.webp`;
          const targetPath = path.join(imagesDir, outName);
          const prodSubPath = path.join(productsDir, outName);

          if (!fs.existsSync(targetPath)) {
            try {
              const imgRes = await fetch(imgUrl);
              const buf = Buffer.from(await imgRes.arrayBuffer());
              await sharp(buf)
                .resize({ width: 1200, withoutEnlargement: true })
                .webp({ quality: 85 })
                .toFile(targetPath);
              fs.copyFileSync(targetPath, prodSubPath);
              console.log(`✓ Saved /images/${outName}`);
            } catch (e) {
              console.log(`Failed to process ${outName}:`, e.message);
            }
          }
        }
      }
    }

    console.log("All product images synced successfully to /images/*.webp!");
  } catch (err) {
    console.log("Image sync error:", err.message);
  }
};

syncImages();
