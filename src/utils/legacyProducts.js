// Auto-generated legacy products registry - Cleaned (all pending products cleared)
export const LEGACY_PRODUCTS = [];

export const LEGACY_PRODUCT_MAP = new Map();

export const SLUG_ALIASES = {
  "red-jasper-gemston-shivling": "natural-red-jasper-gemstone-shivling",
  "rose-quartz-ganesh-with-gold-painting": "rose-quartz-ganesha-with-gold-painted",
  "natural-green-jade-shiva-face-statue": "green-jade-carving-shiva-face-statue",
  "labradorite-power-mini-shiv-face": "labradorite-power-mini-shiva-face",
  "natural-lapis-lazuli-lord-krishan-statue": "natural-lapis-lazuli-lord-krishna-statue",
  "rose-quartz-handmade-carving-of-ganesh": "rose-quartz-ganesha",
  "rose-quartz-mahaveer": "rose-quartz-bhagwan-mahaveer-statue",
  "lapis-lazuli-shivlnga": "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva",
  "natural-rose-quartz-shree-yantra": "crystal-shree-yantra"
};

export function resolveProductSlug(slug) {
  if (!slug) return "";
  const clean = String(slug).trim().toLowerCase().replace(/^\/product\//, "").replace(/\/$/, "");
  return SLUG_ALIASES[clean] || clean;
}

export function getLegacyProductBySlug(_slug) {
  return null;
}
