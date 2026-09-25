import { FALLBACK_PRODUCTS } from '../src/data/fallbackData.js';

console.log("FALLBACK_PRODUCTS length:", FALLBACK_PRODUCTS.length);
FALLBACK_PRODUCTS.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.slug}] "${p.name?.slice(0, 45)}" | Current Price: ${p.price} | Weight: ${p.weight} | Size: ${p.size}`);
});
