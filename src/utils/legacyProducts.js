// Auto-generated legacy products registry - Cleaned (all pending products cleared)
export const LEGACY_PRODUCTS = [];

export const LEGACY_PRODUCT_MAP = new Map();

export const SLUG_ALIASES = {
  "elegant-ruby-ram-darbar-carving": "ruby-ram-darbar-carving",
  "green-aventurine-goddess-tara": "goddess-tara-in-green-aventurine",
  "tiger-eye-tirupati-balaji": "tirupati-balaji-in-tiger-eye",
  "lapis-lazuli-four-horse-carving": "carving-of-4-horse-bust-together-in-lapis-lazuli",
  "4-horse-bust-together-in-lapis-lazuli": "carving-of-4-horse-bust-together-in-lapis-lazuli",
  "lapis-lazuli-7-running-horses": "7-running-horses-in-lapis-lazuli",
  "seven-running-horses-in-lapis-lazuli": "7-running-horses-in-lapis-lazuli",
  "crystal-quartz-tea-set": "tea-set-in-crystal-quartz",
  "natural-green-jade-shivling": "green-jade-shivling",
  "red-jasper-gemston-shivling": "natural-red-jasper-gemstone-shivling",
  "rose-quartz-ganesh-with-gold-painting": "rose-quartz-ganesha-with-gold-painted",
  "natural-green-jade-shiva-face-statue": "green-jade-carving-shiva-face-statue",
  "labradorite-power-mini-shiv-face": "labradorite-power-mini-shiva-face",
  "natural-lapis-lazuli-lord-krishan-statue": "natural-lapis-lazuli-lord-krishna-statue",
  "rose-quartz-handmade-carving-of-ganesh": "rose-quartz-ganesha",
  "rose-quartz-mahaveer": "rose-quartz-bhagwan-mahaveer-statue",
  "lapis-lazuli-shivlnga": "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva",
  "natural-rose-quartz-shree-yantra": "crystal-shree-yantra",
  "rose-quartz-ganesh-with-silver-work": "rose-quartz-ganesh-with-silver-work-idol-for-luxury-decor",
  "green-jade-carved-ganesha": "green-jade-carved-ganesha-statue-with-silver-gold-work",
  "durga-devi-ruby-idol-432-carats": "durga-devi-ruby-idol",
  "green-aventurine-shankh-648g": "green-aventurine-shankh",
  "nataraja-dancing-shiva-sunstone-idol-22kg": "nataraja-dancing-shiva-sunstone-idol",
  "lord-shiva-in-natural-lepidolite-101kg": "shiva-in-lepidolite",
  "sphatik-crystal-lingam-for-temple": "special-sphatik-crystal-lingam-for-temple",
  "vibrant-ruby-kyanite-buddha": "buddha-in-ruby-kyanite",
  "lord-parshvanath-in-lapis-lazuli": "lord-parasnath-in-lapis-lazuli",
  "black-obsidian-goddess-kali": "goddess-kali-in-black-obsidian",
  "green-aventurine-lord-ganesha": "lord-ganesha-in-green-aventurine",
  "labradorite-laughing-buddha": "laughing-buddha-in-labradorite",
  "luxurious-idols-&-decor": "luxurious-idols-decor",
  "black-agate-carving-shiva-face": "blue-sodalite-carving-shiva-face-idol",
  "natural-tiger-eye-angel": "amethyst-gemston-angel",
  "natural-pyrite-angel": "amethyst-gemston-angel",
  "black-jade-gemston-handicraft-shree-yantra": "green-jade-shree-yantra",
  "mahalakshmi-idol-in-natural-columbian-green-jade": "green-jade-mahalakshmi-ji-idol",
  "green-hade-laxmi-ji-idol": "green-jade-mahalakshmi-ji-idol",
  "rose-quartz-shivling": "crystal-shivling",
  "gemston-green-avernturine-shiva-head": "green-jade-carving-shiva-face-statue",
  "rose-quartz-shivling-with-face": "clear-crystal-quartz-shivling-with-shiva-face",
  "green-aventurine-parasnath-ji-statue": "green-aventurine-parshvanath-ji-statue",
  "lapis-lazuli-carving-ganesha-statue": "lapis-lazuli-ganesha-with-arch",
  "rose-quartz-carved-shree-krishan-ji-idol": "rose-quartz-carved-shree-krishna-ji-idol",
  "yellow-jad-ganesh-statue": "natural-yellow-jade-ganesha-statue",
  "natural-tiger-eye-stone-carved-ganesha-statue": "tiger-eye-ganesha-idol",
  "rose-quartz-shiva-statue-with-gold-panting": "rose-quartz-shiva-statue-with-gold-painting",
  "clear-crystal-shivling": "crystal-shivling",
};

export function resolveProductSlug(slug) {
  if (!slug) return "";
  const clean = String(slug).trim().toLowerCase().replace(/^\/product\//, "").replace(/\/$/, "");
  return SLUG_ALIASES[clean] || clean;
}

export function getLegacyProductBySlug(_slug) {
  return null;
}
