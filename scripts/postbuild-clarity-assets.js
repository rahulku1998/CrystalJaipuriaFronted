import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postbuildClarityAssets = () => {
  const distAssetsDir = path.resolve(__dirname, "../dist/assets");
  const distDir = path.resolve(__dirname, "../dist");

  if (!fs.existsSync(distAssetsDir)) {
    console.log("dist/assets directory does not exist, skipping postbuild clarity assets.");
    return;
  }

  const files = fs.readdirSync(distAssetsDir);
  const mainCss = files.find((f) => f.startsWith("index-") && f.endsWith(".css"));
  const swiperCss = files.find((f) => f.startsWith("vendor-swiper-") && f.endsWith(".css"));

  const publicAssetsDir = path.resolve(__dirname, "../public/assets");
  if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });

  if (mainCss) {
    fs.copyFileSync(path.join(distAssetsDir, mainCss), path.join(distAssetsDir, "index.css"));
    fs.copyFileSync(path.join(distAssetsDir, mainCss), path.join(distDir, "index.css"));
    fs.copyFileSync(path.join(distAssetsDir, mainCss), path.join(publicAssetsDir, "index.css"));
    console.log(`✓ Copied ${mainCss} to dist/assets/index.css & public/assets/index.css`);
  }

  if (swiperCss) {
    fs.copyFileSync(path.join(distAssetsDir, swiperCss), path.join(distAssetsDir, "vendor-swiper.css"));
    fs.copyFileSync(path.join(distAssetsDir, swiperCss), path.join(distDir, "vendor-swiper.css"));
    fs.copyFileSync(path.join(distAssetsDir, swiperCss), path.join(publicAssetsDir, "vendor-swiper.css"));
    console.log(`✓ Copied ${swiperCss} to dist/assets/vendor-swiper.css & public/assets/vendor-swiper.css`);
  }
};

postbuildClarityAssets();
