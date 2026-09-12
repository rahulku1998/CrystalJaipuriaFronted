// Auto-generated legacy products registry - Cleaned (all pending products cleared)
export const LEGACY_PRODUCTS = [];

export const LEGACY_PRODUCT_MAP = new Map();

export const SLUG_ALIASES = {
  "red-jasper-gemston-shivling": "natural-red-jasper-gemstone-shivling",
  "rose-quartz-ganesh-with-gold-painting": "rose-quartz-ganesha-with-gold-painted",
  "natural-green-jade-shiva-face-statue": "green-jade-carving-shiva-face-statue",
};

export function resolveProductSlug(slug) {
  if (!slug) return "";
  const clean = String(slug).trim().toLowerCase().replace(/^\/product\//, "").replace(/\/$/, "");
  return SLUG_ALIASES[clean] || clean;
}

export function getLegacyProductBySlug(_slug) {
  return null;
}
