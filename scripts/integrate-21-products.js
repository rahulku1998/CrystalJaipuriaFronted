import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const newProductsPath = path.resolve(__dirname, "../scratch_21_products.json");
const newProducts = JSON.parse(fs.readFileSync(newProductsPath, "utf8"));

console.log(`Found ${newProducts.length} new products to integrate.`);

// 1. UPDATE src/data/fallbackData.js
const fallbackDataPath = path.resolve(__dirname, "../src/data/fallbackData.js");
let fallbackContent = fs.readFileSync(fallbackDataPath, "utf8");

// Check if already added
let addedCount = 0;
const productsToAdd = [];
for (const p of newProducts) {
  if (fallbackContent.includes(`"slug": "${p.slug}"`)) {
    console.log(`Product ${p.slug} already in fallbackData.js, skipping.`);
  } else {
    productsToAdd.push(p);
  }
}

if (productsToAdd.length > 0) {
  const lastBracketIndex = fallbackContent.lastIndexOf("];");
  if (lastBracketIndex === -1) {
    throw new Error("Could not find end of FALLBACK_PRODUCTS array in fallbackData.js");
  }

  // Format productsToAdd into formatted JS objects
  const formattedObjects = productsToAdd
    .map((p) => "  " + JSON.stringify(p, null, 2).replace(/\n/g, "\n  "))
    .join(",\n");

  const before = fallbackContent.slice(0, lastBracketIndex).trimEnd();
  const after = fallbackContent.slice(lastBracketIndex);

  const separator = before.endsWith("[") ? "\n" : ",\n";
  fallbackContent = before + separator + formattedObjects + "\n" + after;
  fs.writeFileSync(fallbackDataPath, fallbackContent, "utf8");
  console.log(`✅ Appended ${productsToAdd.length} products to src/data/fallbackData.js!`);
} else {
  console.log("ℹ️ All 21 products already present in fallbackData.js.");
}

// 2. UPDATE src/utils/productStandardizer.js
const standardizerPath = path.resolve(__dirname, "../src/utils/productStandardizer.js");
let standardizerContent = fs.readFileSync(standardizerPath, "utf8");

// Add to STANDARDIZED_SPECS
const specsMarker = "export const STANDARDIZED_SPECS = {";
const specsIndex = standardizerContent.indexOf(specsMarker);
if (specsIndex !== -1) {
  let specsToAdd = "";
  for (const p of newProducts) {
    if (!standardizerContent.includes(`"${p.slug}": {`)) {
      specsToAdd += `  "${p.slug}": { price: ${p.price}, size: "${p.size}", weight: "${p.weight}" },\n`;
    }
  }
  if (specsToAdd) {
    standardizerContent = standardizerContent.replace(
      specsMarker,
      `${specsMarker}\n${specsToAdd}`
    );
    console.log("✅ Added 21 products to STANDARDIZED_SPECS in productStandardizer.js");
  }
}

// Add to MULTI_IMAGE_SLUGS
const multiMarker = "export const MULTI_IMAGE_SLUGS = new Set([";
const multiIndex = standardizerContent.indexOf(multiMarker);
if (multiIndex !== -1) {
  let slugsToAdd = "";
  for (const p of newProducts) {
    if (!standardizerContent.includes(`"${p.slug}"`)) {
      slugsToAdd += `  "${p.slug}",\n`;
    }
  }
  if (slugsToAdd) {
    standardizerContent = standardizerContent.replace(
      multiMarker,
      `${multiMarker}\n${slugsToAdd}`
    );
    console.log("✅ Added 21 product slugs to MULTI_IMAGE_SLUGS in productStandardizer.js");
  }
}

// Add to multi-image fallback check in getStandardizedProduct
let multiFallbackCode = "";
for (const p of newProducts) {
  if (!standardizerContent.includes(`slug === "${p.slug}"`)) {
    const imgArrayCode = p.images
      .map((img, i) => `        { url: "${img}", public_id: "products/${p.slug}${i === 0 ? "" : `-${i + 1}`}" },`)
      .join("\n");
    multiFallbackCode += `    } else if (slug === "${p.slug}") {\n      standardizedImages = [\n${imgArrayCode}\n      ];\n`;
  }
}

if (multiFallbackCode) {
  const targetClause = `} else if (MULTI_IMAGE_SLUGS.has(slug)) {`;
  standardizerContent = standardizerContent.replace(
    targetClause,
    `${multiFallbackCode}    ${targetClause}`
  );
  console.log("✅ Added 21 explicit multi-image handlers to productStandardizer.js");
}

fs.writeFileSync(standardizerPath, standardizerContent, "utf8");

// 3. UPDATE scripts/sync-images.js PROTECTED_STUDIO_SLUGS
const syncImagesPath = path.resolve(__dirname, "./sync-images.js");
let syncContent = fs.readFileSync(syncImagesPath, "utf8");
const protectedMarker = "const PROTECTED_STUDIO_SLUGS = new Set([";
if (syncContent.includes(protectedMarker)) {
  let protectedSlugsToAdd = "";
  for (const p of newProducts) {
    if (!syncContent.includes(`"${p.slug}"`)) {
      protectedSlugsToAdd += `      "${p.slug}",\n`;
    }
  }
  if (protectedSlugsToAdd) {
    syncContent = syncContent.replace(
      protectedMarker,
      `${protectedMarker}\n${protectedSlugsToAdd}`
    );
    fs.writeFileSync(syncImagesPath, syncContent, "utf8");
    console.log("✅ Added 21 product slugs to PROTECTED_STUDIO_SLUGS in sync-images.js");
  }
}

console.log("🎉 Integration completed successfully!");
