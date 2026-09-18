import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const xmlPath = path.resolve(__dirname, "../public/google-products.xml");
const outPath = path.resolve(__dirname, "../src/data/fallbackData.js");

const xml = fs.readFileSync(xmlPath, "utf-8");
const items = xml.split("<item>").slice(1);

const unescapeXml = (str) => {
  if (!str) return "";
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
};

const CATEGORIES = [
  { _id: "6a55bb1f2e9a358fc926cbab", name: "God Statues", slug: "god-statues" },
  { _id: "6a55bc292dcf49aacd71ef65", name: "Shivling", slug: "shivling" },
  { _id: "6a55bc362dcf49aacd71ef66", name: "Shree Yantra", slug: "shree-yantra" },
  { _id: "6a55bc3f2dcf49aacd71ef67", name: "Angel", slug: "angel" },
  { _id: "6a55bc492dcf49aacd71ef68", name: "Crystal Statues", slug: "crystal-statues" },
  { _id: "6a55bc522dcf49aacd71ef69", name: "Diya", slug: "diya" },
];

const SUBCATEGORIES = [
  {
    _id: "sub-god-ganesha",
    name: "Ganesha Statues",
    slug: "ganesha-statues",
    categoryId: { _id: "6a55bb1f2e9a358fc926cbab", name: "God Statues", slug: "god-statues" }
  },
  {
    _id: "sub-god-shiva",
    name: "Shiva Statues",
    slug: "shiva-statues",
    categoryId: { _id: "6a55bb1f2e9a358fc926cbab", name: "God Statues", slug: "god-statues" }
  },
  {
    _id: "sub-god-krishna",
    name: "Krishna Statues",
    slug: "krishna-statues",
    categoryId: { _id: "6a55bb1f2e9a358fc926cbab", name: "God Statues", slug: "god-statues" }
  },
  {
    _id: "sub-god-hanuman",
    name: "Hanuman Statues",
    slug: "hanuman-statues",
    categoryId: { _id: "6a55bb1f2e9a358fc926cbab", name: "God Statues", slug: "god-statues" }
  },
  {
    _id: "sub-god-other",
    name: "Other Divine Deities",
    slug: "other-deities",
    categoryId: { _id: "6a55bb1f2e9a358fc926cbab", name: "God Statues", slug: "god-statues" }
  },
  {
    _id: "sub-shiv-sphatik",
    name: "Sphatik Shivling",
    slug: "sphatik-shivling",
    categoryId: { _id: "6a55bc292dcf49aacd71ef65", name: "Shivling", slug: "shivling" }
  },
  {
    _id: "sub-shiv-lapis",
    name: "Lapis Lazuli Shivling",
    slug: "lapis-lazuli-shivling",
    categoryId: { _id: "6a55bc292dcf49aacd71ef65", name: "Shivling", slug: "shivling" }
  },
  {
    _id: "sub-shiv-ruby",
    name: "Ruby Shivling",
    slug: "ruby-shivling",
    categoryId: { _id: "6a55bc292dcf49aacd71ef65", name: "Shivling", slug: "shivling" }
  },
  {
    _id: "sub-shiv-other",
    name: "Natural Gemstone Shivling",
    slug: "gemstone-shivling",
    categoryId: { _id: "6a55bc292dcf49aacd71ef65", name: "Shivling", slug: "shivling" }
  },
  {
    _id: "sub-yantra-sphatik",
    name: "Sphatik Shree Yantra",
    slug: "sphatik-shree-yantra",
    categoryId: { _id: "6a55bc362dcf49aacd71ef66", name: "Shree Yantra", slug: "shree-yantra" }
  },
  {
    _id: "sub-yantra-ruby",
    name: "Ruby Shree Yantra",
    slug: "ruby-shree-yantra",
    categoryId: { _id: "6a55bc362dcf49aacd71ef66", name: "Shree Yantra", slug: "shree-yantra" }
  },
  {
    _id: "sub-yantra-other",
    name: "Sacred Gemstone Yantra",
    slug: "gemstone-shree-yantra",
    categoryId: { _id: "6a55bc362dcf49aacd71ef66", name: "Shree Yantra", slug: "shree-yantra" }
  },
  {
    _id: "sub-angel-gemstone",
    name: "Gemstone Angels",
    slug: "gemstone-angels",
    categoryId: { _id: "6a55bc3f2dcf49aacd71ef67", name: "Angel", slug: "angel" }
  },
  {
    _id: "sub-statues-handcrafted",
    name: "Handcrafted Crystal Statues",
    slug: "handcrafted-crystal-statues",
    categoryId: { _id: "6a55bc492dcf49aacd71ef68", name: "Crystal Statues", slug: "crystal-statues" }
  },
  {
    _id: "sub-diya-gemstone",
    name: "Gemstone Diyas",
    slug: "gemstone-diyas",
    categoryId: { _id: "6a55bc522dcf49aacd71ef69", name: "Diya", slug: "diya" }
  },
];

const catMap = {};
CATEGORIES.forEach((c) => {
  catMap[c.slug] = c;
});

const subMap = {};
SUBCATEGORIES.forEach((s) => {
  subMap[s._id] = s;
});

const products = items.map((item) => {
  const getTag = (t) => {
    const m = item.match(new RegExp("<" + t + "[^>]*>([\\s\\S]*?)<\\/" + t + ">"));
    return m ? m[1].trim() : "";
  };

  const id = getTag("g:id");
  const title = unescapeXml(getTag("g:title"));
  const desc = unescapeXml(getTag("g:description"));
  const link = getTag("g:link");
  const slug = link.replace(/.*\/product\//, "").replace(/\/$/, "");
  const rawImg = getTag("g:image_link").replace(/\?.*$/, "");
  const img = rawImg.replace("https://www.crystaljaipuria.com", "");
  const priceRaw = getTag("g:price");
  const price = parseFloat(priceRaw.replace(/[^0-9.]/g, "")) || 0;
  const pType = getTag("g:product_type");
  const size = getTag("g:size");
  const weight = getTag("g:shipping_weight");

  let catSlug = "god-statues";
  if (pType.includes("Shivling")) catSlug = "shivling";
  else if (pType.includes("Shree Yantra")) catSlug = "shree-yantra";
  else if (pType.includes("Angel")) catSlug = "angel";
  else if (pType.includes("Crystal Statues")) catSlug = "crystal-statues";
  else if (pType.includes("Diya")) catSlug = "diya";

  const cat = catMap[catSlug];
  const tLow = title.toLowerCase();

  let subId = "";
  if (catSlug === "god-statues") {
    if (tLow.includes("ganesh") || tLow.includes("ganpati") || tLow.includes("vinayak")) {
      subId = "sub-god-ganesha";
    } else if (tLow.includes("shiva") || tLow.includes("shiv") || tLow.includes("mahadev")) {
      subId = "sub-god-shiva";
    } else if (tLow.includes("krishna") || tLow.includes("kanha") || tLow.includes("radha")) {
      subId = "sub-god-krishna";
    } else if (tLow.includes("hanuman") || tLow.includes("balaji")) {
      subId = "sub-god-hanuman";
    } else {
      subId = "sub-god-other";
    }
  } else if (catSlug === "shivling") {
    if (tLow.includes("sphatik") || tLow.includes("quartz")) {
      subId = "sub-shiv-sphatik";
    } else if (tLow.includes("lapis")) {
      subId = "sub-shiv-lapis";
    } else if (tLow.includes("ruby")) {
      subId = "sub-shiv-ruby";
    } else {
      subId = "sub-shiv-other";
    }
  } else if (catSlug === "shree-yantra") {
    if (tLow.includes("sphatik") || tLow.includes("quartz")) {
      subId = "sub-yantra-sphatik";
    } else if (tLow.includes("ruby")) {
      subId = "sub-yantra-ruby";
    } else {
      subId = "sub-yantra-other";
    }
  } else if (catSlug === "angel") {
    subId = "sub-angel-gemstone";
  } else if (catSlug === "crystal-statues") {
    subId = "sub-statues-handcrafted";
  } else if (catSlug === "diya") {
    subId = "sub-diya-gemstone";
  }

  const sub = subMap[subId] || null;

  return {
    _id: id,
    name: title,
    slug: slug,
    price: price,
    detail: desc,
    images: [img, img.replace(".webp", "-2.webp")],
    categoryId: {
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
    },
    categoryName: cat.name,
    subCategoryId: sub ? {
      _id: sub._id,
      name: sub.name,
      slug: sub.slug,
    } : null,
    subCategoryName: sub ? sub.name : "",
    size: size || "Standard",
    weight: weight || "Standard",
    stock: 10,
    featured: true,
  };
});

const activeSubCategories = SUBCATEGORIES.filter((sub) => {
  return products.some((p) => p.subCategoryId?._id === sub._id);
});

const fileContent = `// Auto-generated Bulletproof Fallback Data for Crystal Jaipuria
// Generated to ensure 100% zero downtime even if remote backend API is offline.

export const FALLBACK_CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const FALLBACK_SUBCATEGORIES = ${JSON.stringify(activeSubCategories, null, 2)};

export const FALLBACK_PRODUCTS = ${JSON.stringify(products, null, 2)};
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, fileContent, "utf-8");

console.log(`✅ Successfully generated fallbackData.js with ${products.length} products across ${CATEGORIES.length} categories and ${activeSubCategories.length} subcategories!`);

