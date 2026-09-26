import { STATIC_CATALOG_SLUGS } from "./imageOptimizer.js";

/**
 * Product Data Standardizer for Crystal Jaipuria
 * Normalizes price ranges, unit rates (e.g. 6/GRAM), missing weights & dimensions
 * to industry-standard realistic single pricing and precise specs.
 */

export const STANDARDIZED_SPECS = {
  "hand-carved-rose-quartz-ganesha-with-sterling-silver-testing": {
    price: 5800,
    weight: "371 g to 2 kg",
    size: "2 in to 5 inch",
    pricePerUnit: "₹10 / gram",
  },
  "australian-jade-ganesha-carving": {
    price: 500,
    weight: "50 gram to 500 gram",
    size: "2 inch to 7 inch",
    pricePerUnit: "₹4.5 / gram",
  },
  "hand-carved-ruby-ganesha": {
    price: 30,
    weight: "200 carat to 5000 carat",
    size: "2 inch to 5 inch",
    pricePerUnit: "₹30 / carat",
  },
  "natural-ruby-radha-krishna-idol-hand-carved": {
    price: 20300,
    weight: "200 carat to 4500 carat",
    size: "4 inch to 8 inch",
    pricePerUnit: "₹60 / carat",
  },
  "green-jade-ganesha": {
    price: 5200,
    weight: "50 gram to 1 kg",
    size: "2 inch to 7 inch",
    pricePerUnit: "₹4.5 / gram",
  },
  "rose-quartz-ganesha": {
    price: 500,
    weight: "50 gram to 1 kg",
    size: "2 inch to 5 in",
    pricePerUnit: "₹4.5 / gram",
  },
  "crystal-ganesha": {
    price: 25,
    weight: "50 gram to 2 kg",
    size: "2 inch to 5 inch",
    pricePerUnit: "₹50 / gram",
  },
  "blue-sodalite-carved-ganesha-statue": {
    price: 9500,
    weight: "500 gram to 10 kg",
    size: "4 inch to 12 inch",
    pricePerUnit: "₹6 / gram",
  },
  "rose-quartz-ganesha-with-gold-painted": {
    price: 16500,
    weight: "1 kg to 50 kg",
    size: "8 inch to 40 inch",
    pricePerUnit: "₹3 / gram",
  },
  "blue-sodalite-carved-lord-shiva-statue": {
    price: 14000,
    weight: "1 kg to 25 kg",
    size: "5 inch to 20 inch",
    pricePerUnit: "₹10 / gram",
  },
  "natural-blue-sodalite-hanuman-ji-statue": {
    price: 13500,
    weight: "1 kg to 30 kg",
    size: "5 inch to 25 inch",
    pricePerUnit: "₹15 / gram",
  },
  "blue-sodalite-carving-shiva-face-idol": {
    price: 11000,
    weight: "500 gram to 15 kg",
    size: "5 inch to 15 inch",
    pricePerUnit: "₹15 / gram",
  },
  "labradorite-power-mini-shiva-face": {
    price: 2200,
    weight: "200 gram to 50 kg",
    size: "4 inch to 45 inch",
    pricePerUnit: "₹8 / gram",
  },
  "natural-yellow-jade-ganesha-statue": {
    price: 12500,
    weight: "500 gram to 20 kg",
    size: "5 inch to 15 inch",
    pricePerUnit: "₹5 / gram",
  },
  "rose-quartz-bhagwan-mahaveer-statue": {
    price: 14000,
    weight: "1 kg to 50 kg",
    size: "5 inch to 50 inch",
    pricePerUnit: "₹15 / gram",
  },
  "tiger-eye-carving-shiva-statue": {
    price: 16500,
    weight: "500 gram to 25 kg",
    size: "4 inch to 40 inch",
    pricePerUnit: "₹15 / gram",
  },
  "rose-quartz-carved-shree-krishna-ji-idol": {
    price: 21000,
    weight: "5 kg to 100 kg",
    size: "4 inch to 80 inch",
    pricePerUnit: "₹10 / gram",
  },
  "natural-amethyst-gemstone-shiva-face-idol": {
    price: 14500,
    weight: "200 gram to 10 kg",
    size: "3 inch to 10 inch",
    pricePerUnit: "₹15 / gram",
  },
  "green-jade-mahalakshmi-ji-idol": {
    price: 19500,
    weight: "1 kg to 10 kg",
    size: "5 inch to 12 inch",
    pricePerUnit: "₹20 / gram",
  },
  "green-aventurine-parshvanath-ji-statue": {
    price: 9500,
    weight: "1 kg to 50 kg",
    size: "5 inch to 50 inch",
    pricePerUnit: "₹10 / gram",
  },
  "green-jade-goddess-maa-saraswati-carving": {
    price: 24000,
    weight: "1 kg to 20 kg",
    size: "5 inch to 20 inch",
    pricePerUnit: "₹15 / gram",
  },
  "smokey-quartz-crystal-shiva-face-idol": {
    price: 16500,
    weight: "200 gram to 2 kg",
    size: "5 inch to 15 inch",
    pricePerUnit: "₹17 / gram",
  },
  "green-jade-radha-krishna-statue-carving": {
    price: 38000,
    weight: "5 kg to 50 kg",
    size: "15 inch to 40 inch",
    pricePerUnit: "₹20 / gram",
  },
  "rose-quartz-shiva-statue-with-gold-painting": {
    price: 28000,
    weight: "1 kg to 70 kg",
    size: "10 inch to 40 inch",
    pricePerUnit: "₹5 / gram",
  },
  "natural-lapis-lazuli-lord-krishna-statue": {
    price: 22000,
    weight: "1 kg to 50 kg",
    size: "8 inch to 20 inch",
    pricePerUnit: "₹21 / gram",
  },
  "natural-lapis-lazuli-shiva-face-carving-idol": {
    price: 18500,
    weight: "500 gram to 50 kg",
    size: "5 inch to 20 inch",
    pricePerUnit: "₹19 / gram",
  },
  "green-jade-shiva-statue-with-gold-panting": {
    price: 4200,
    weight: "5 kg to 100 kg",
    size: "5 inch to 40 inch",
    pricePerUnit: "₹5 / gram",
  },
  "blue-sapphire-carving-shiva-statue": {
    price: 14700,
    weight: "50 carat to 2000 carat",
    size: "2 inch to 6 inch",
    pricePerUnit: "₹50 / carat",
  },
  "green-jade-carved-shree-krishana-statue": {
    price: 5400,
    weight: "10 kg to 80 kg",
    size: "15 inch to 50 inch",
    pricePerUnit: "₹10 / gram",
  },
  "green-jade-carving-shiva-face-statue": {
    price: 37500,
    weight: "1 kg to 50 kg",
    size: "10 in to 50 inch",
    pricePerUnit: "₹5 / gram",
  },
  "black-agate-gemstone-carving-of-ganesh": {
    price: 12000,
    weight: "2 kg to 10 kg",
    size: "5 inch to 15 inch",
    pricePerUnit: "₹5 / gram",
  },
  "crystal-clear-mahvaveer-ji-statue": {
    price: 4200,
    weight: "500 gram to 10 kg",
    size: "7 inch to 29 inch",
    pricePerUnit: "₹100 / gram",
  },
  "green-jade-shivling": {
    price: 4200,
    weight: "20 gram to 500 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹4 / gram",
  },
  "crystal-shivling": {
    price: 4500,
    weight: "20 gram to 500 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹15 / gram",
  },
  "natural-red-jasper-gemstone-shivling": {
    price: 1200,
    weight: "20 gram to 500 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹7 / gram",
  },
  "natural-labradorite-gemstone-shivling": {
    price: 2400,
    weight: "20 gram to 500 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹8 / gram",
  },
  "natural-howlite-gemstone-shivling": {
    price: 1400,
    weight: "20 gram to 500 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹8 / gram",
  },
  "natural-tiger-eye-gemstone-shivling": {
    price: 1800,
    weight: "20 gram to 200 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹9 / gram",
  },
  "natural-opal-stone-shivling": {
    price: 3500,
    weight: "20 gram to 300 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹7 / gram",
  },
  "natural-sphatik-shivling": {
    price: 2500,
    weight: "20 gram to 200 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹20 / gram",
  },
  "clear-crystal-quartz-shivling-with-shiva-face": {
    price: 3800,
    weight: "500 gram to 10 kg",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹25 / gram",
  },
  "pyrite-gemston-shivling": {
    price: 3800,
    weight: "20 gram to 500 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹10 / gram",
  },
  "green-jade-panchmukhi-shivling": {
    price: 3800,
    weight: "1 kg to 10 kg",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹10 / gram",
  },
  "natural-ruby-shivling": {
    price: 8750,
    weight: "20 carat to 1000 carat",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹50 / carat",
  },
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva": {
    price: 2500,
    weight: "500 gram to 10 kg",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹15 / gram",
  },
  "crystal-shree-yantra": {
    price: 5800,
    weight: "50 gram to 2 kg",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹15 / gram",
  },
  "green-jade-shree-yantra": {
    price: 4900,
    weight: "50 gram to 5 kg",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹8 / gram",
  },
  "gemston-ruby-shree-yantra": {
    price: 16800,
    weight: "100 carat to 1000 carat",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹40 / carat",
  },
  "crystal-sphtik-shree-yantra-on-kamal-flower": {
    price: 2000,
    weight: "50 gram to 1 kg",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹10 / gram",
  },
  "amethyst-gemston-angel": {
    price: 350,
    weight: "37 g",
    size: "1 inch to 6 inch",
    pricePerUnit: "",
  },
  "natural-rose-quartz-pair-of-swan": {
    price: 2000,
    weight: "50 gram to 500 gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹4.5 / gram",
  },
  "green-jade-elephant-staute": {
    price: 800,
    weight: "100 gram to 500gram",
    size: "1 inch to 6 inch",
    pricePerUnit: "₹6 / gram",
  },
  "gemston-amethyst-diya": {
    price: 250,
    weight: "66 g",
    size: "2.5 Inch",
    pricePerUnit: "",
  },
};

/**
 * Products that are already ranking well on Google Search & Merchant Center.
 * These are strictly preserved and never auto-modified so their live SEO rankings remain untouched.
 */
export const PROTECTED_RANKING_SLUGS = new Set([
  "natural-sphatik-shivling",
  "gemston-ruby-shree-yantra",
  "pyrite-gemston-shivling",
  "natural-rose-quartz-pair-of-swan",
  "gemston-amethyst-diya",
  "clear-crystal-quartz-shivling-with-shiva-face",
  "green-jade-shiva-statue-with-gold-panting",
  "green-jade-panchmukhi-shivling",
  "crystal-sphtik-shree-yantra-on-kamal-flower",
  "black-agate-gemstone-carving-of-ganesh",
  "crystal-clear-mahvaveer-ji-statue",
  "amethyst-gemston-angel",
]);

export const SACRED_SHLOKAS = {
  shivling: {
    shloka: "स्फटिकस्य प्रपूजनात् सर्वकामसमृद्धिः स्यात्।",
    source: "Shiva Purana",
    meaning: "Sacred Shivling worship bestows peace, spiritual vitality, and fulfillment of noble desires.",
  },
  shiva: {
    shloka: "ध्यायेन्नित्यं महेशं रजतगिरिनिभं चारुचंद्रावतंसम्।",
    source: "Dhyana Shloka",
    meaning: "Meditate upon Lord Shiva, serene like a silver peak, radiating supreme consciousness.",
  },
  "shree-yantra": {
    shloka: "ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्मांक दारिद्र्य नाशय नाशय प्रसीद प्रसीद।",
    source: "Lakshmi Suktam",
    meaning: "Invoking supreme Mahalakshmi to dispel lack and usher continuous abundance and grace.",
  },
  ganesha: {
    shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    source: "Ganapati Dhyanam",
    meaning: "Salutations to Lord Ganesha, remover of obstacles and harbinger of success.",
  },
  krishna: {
    shloka: "वसुदेवसुतं देवं कंसचाणूरमर्दनम्। देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥",
    source: "Gita Dhyanam",
    meaning: "Salutations to Lord Krishna, the supreme divine guide, radiating joy and wisdom.",
  },
  jain: {
    shloka: "नमो अरिहंताणं नमो सिद्धाणं नमो आयरियाणं। नमो उवज्झायाणं नमो लोए सव्व साहूणं॥",
    source: "Ṇamōkāra Mahamantra",
    meaning: "Universal veneration to the enlightened conquerors, teachers, and seekers of Ahimsa.",
  },
};

export const getSacredShloka = (nameOrSlug = "") => {
  const text = (nameOrSlug || "").toLowerCase();
  if (text.includes("shivling") || text.includes("lingam") || text.includes("shiva-linga")) return SACRED_SHLOKAS.shivling;
  if (text.includes("shree yantra") || text.includes("shree-yantra") || text.includes("meru")) return SACRED_SHLOKAS["shree-yantra"];
  if (text.includes("ganesh") || text.includes("ganpati")) return SACRED_SHLOKAS.ganesha;
  if (text.includes("krishna") || text.includes("krishana") || text.includes("radha")) return SACRED_SHLOKAS.krishna;
  if (text.includes("shiva") || text.includes("shiv")) return SACRED_SHLOKAS.shiva;
  if (text.includes("mahvaveer") || text.includes("mahaveer") || text.includes("jain")) return SACRED_SHLOKAS.jain;
  return null;
};

/**
 * Format and convert any Additional Information string or HTML into standard bullet points
 * with bold labels (e.g. <strong>Color :</strong> White, <strong>Weight :</strong> 500 Gram)
 */
export const formatAdditionalInfo = (inputHtmlOrText, product = {}) => {
  const slug = (product.slug || "").toLowerCase().trim();
  const spec = STANDARDIZED_SPECS[slug] || {};

  const cleanWeight = product.weight || spec.weight || "";
  const cleanSize = product.size || spec.size || "";
  const cleanDimensions = product.dimensions || spec.dimensions || "";

  if (
    !inputHtmlOrText ||
    inputHtmlOrText.trim().length < 5 ||
    inputHtmlOrText.toLowerCase().includes("all the size and weight")
  ) {
    // Generate clean comprehensive default bullet specs
    const name = product.name || "Handcrafted Gemstone Artifact";
    const category = product.categoryId?.name || "Natural Gemstones";
    return `
<ul class="space-y-2.5 list-disc pl-5 text-gray-700 leading-relaxed font-normal">
  <li><strong class="font-bold text-gray-900">Product Name :</strong> ${name}</li>
  <li><strong class="font-bold text-gray-900">Brand &amp; Manufacturer :</strong> Crystal Jaipuria, Jaipur (est. 1989)</li>
  <li><strong class="font-bold text-gray-900">Category :</strong> ${category}</li>
  ${cleanWeight ? `<li><strong class="font-bold text-gray-900">Weight :</strong> ${cleanWeight}</li>` : ""}
  ${cleanSize ? `<li><strong class="font-bold text-gray-900">Size :</strong> ${cleanSize}</li>` : ""}
  ${cleanDimensions ? `<li><strong class="font-bold text-gray-900">Dimensions :</strong> ${cleanDimensions}</li>` : ""}
  <li><strong class="font-bold text-gray-900">Material :</strong> 100% Certified Pure Natural Gemstone</li>
  <li><strong class="font-bold text-gray-900">Surface Finish :</strong> Highly Polished, Smooth &amp; Lustrous</li>
  <li><strong class="font-bold text-gray-900">Craftsmanship :</strong> Hand-Carved with Vedic Shilpa Shastra Precision</li>
  <li><strong class="font-bold text-gray-900">Suitable For :</strong> Home Temple, Pooja Room, Meditation Altar, Vastu &amp; Gifting</li>
  <li><strong class="font-bold text-gray-900">Country of Origin :</strong> Jaipur, Rajasthan, India</li>
  <li><strong class="font-bold text-gray-900">Packaging :</strong> Secure, Multi-Layer Shockproof Packaging for Worldwide Shipping</li>
</ul>
    `.trim();
  }

  // Parse existing content
  let text = inputHtmlOrText
    .replace(/<\/?(div|p|li|tr|br\s*\/?)>/gi, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, ""); // Strip remaining tags

  const rawLines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const items = [];
  const seenKeys = new Set();

  for (const line of rawLines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0 && colonIdx < 40) {
      let key = line.substring(0, colonIdx).trim();
      let val = line.substring(colonIdx + 1).trim();

      // Normalize key capitalization
      key = key.replace(/\b\w/g, (c) => c.toUpperCase());

      // Key specific normalizations
      if (key.toLowerCase() === "colour") key = "Color";
      if (key.toLowerCase() === "craftmanship") key = "Craftsmanship";
      if (
        key.toLowerCase() === "usage/application" ||
        key.toLowerCase() === "usage / application"
      ) {
        key = "Usage & Application";
      }

      if (key.toLowerCase().includes("weight") && cleanWeight) {
        val = cleanWeight;
      }
      if ((key.toLowerCase().includes("size") || key.toLowerCase().includes("dimension")) && cleanSize) {
        val = cleanSize;
      }

      if (val && !seenKeys.has(key.toLowerCase())) {
        items.push({ key, val });
        seenKeys.add(key.toLowerCase());
      }
    } else {
      const cleanLine = line.replace(/^[•\-*\s\d.]+/, "").trim();
      if (cleanLine && cleanLine.length > 2) {
        items.push({ key: "", val: cleanLine });
      }
    }
  }

  // Ensure weight and size from standardizer are included if missing
  if (cleanWeight && !seenKeys.has("weight")) {
    items.push({ key: "Weight", val: cleanWeight });
    seenKeys.add("weight");
  }
  if (cleanSize && !seenKeys.has("size") && !seenKeys.has("dimensions")) {
    items.push({ key: "Size", val: cleanSize });
    seenKeys.add("size");
  }
  if (cleanDimensions && !seenKeys.has("dimensions") && cleanDimensions !== cleanSize) {
    items.push({ key: "Dimensions", val: cleanDimensions });
    seenKeys.add("dimensions");
  }
  if (!seenKeys.has("brand") && !seenKeys.has("brand & manufacturer")) {
    items.push({ key: "Brand & Manufacturer", val: "Crystal Jaipuria, Jaipur (est. 1989)" });
    seenKeys.add("brand");
  }
  if (!seenKeys.has("consecration & energization") && !seenKeys.has("pran pratishtha")) {
    items.push({
      key: "Consecration & Energization",
      val: "Purified with sacred Gangajal and energized prior to shockproof dispatch."
    });
    seenKeys.add("consecration & energization");
  }
  if (!seenKeys.has("natural stone note") && !seenKeys.has("stone authenticity")) {
    items.push({
      key: "Natural Stone Note",
      val: "100% Earth-mined gemstone with characteristic mineral fingerprints (0% synthetic glass/resin)."
    });
    seenKeys.add("natural stone note");
  }

  if (items.length === 0) {
    return inputHtmlOrText;
  }

  return `
<ul class="space-y-2.5 list-disc pl-5 text-gray-700 leading-relaxed font-normal">
${items
  .map((item) => {
    if (item.key) {
      return `  <li><strong class="font-bold text-gray-900">${item.key} :</strong> ${item.val}</li>`;
    }
    return `  <li>${item.val}</li>`;
  })
  .join("\n")}
</ul>
  `.trim();
};

export const STANDARDIZED_NAMES = {
  "gemston-ruby-shree-yantra": "Natural Gemstone Ruby Shree Yantra",
  "gemston-amethyst-diya": "Natural Amethyst Gemstone Diya",
  "crystal-clear-mahvaveer-ji-statue": "Crystal Clear Mahaveer Ji Statue",
  "crystal-sphtik-shree-yantra-on-kamal-flower": "Crystal Sphatik Shree Yantra On Lotus Flower",
  "green-jade-elephant-staute": "Green Jade Elephant Statue",
  "green-jade-shiva-statue-with-gold-panting": "Green Jade Shiva Statue With Gold Painting",
  "green-jade-carved-shree-krishana-statue": "Green Jade Carved Shree Krishna Statue",
  "green-jade-panchmukhi-shivling": "Natural Green Jade Stone Panchmukhi Shivling"
};

export const MULTI_IMAGE_SLUGS = new Set([
  "amethyst-gemston-angel",
  "blue-sapphire-carving-shiva-statue",
  "clear-crystal-quartz-shivling-with-shiva-face",
  "crystal-clear-mahvaveer-ji-statue",
  "crystal-sphtik-shree-yantra-on-kamal-flower",
  "gemston-amethyst-diya",
  "gemston-ruby-shree-yantra",
  "green-aventurine-parshvanath-ji-statue",
  "green-jade-carved-shree-krishana-statue",
  "green-jade-goddess-maa-saraswati-carving",
  "green-jade-mahalakshmi-ji-idol",
  "green-jade-radha-krishna-statue-carving",
  "green-jade-shiva-statue-with-gold-panting",
  "mahalakshmi-idol-in-natural-columbian-green-jade",
  "natural-amethyst-gemstone-shiva-face-idol",
  "natural-howlite-gemstone-shivling",
  "natural-labradorite-gemstone-shivling",
  "natural-lapis-lazuli-lord-krishna-statue",
  "natural-lapis-lazuli-shiva-face-carving-idol",
  "natural-opal-stone-shivling",
  "natural-rose-quartz-pair-of-swan",
  "natural-ruby-shivling",
  "natural-sphatik-shivling",
  "natural-tiger-eye-gemstone-shivling",
  "pyrite-gemston-shivling",
  "rose-quartz-carved-shree-krishan-ji-idol",
  "rose-quartz-carved-shree-krishna-ji-idol",
  "rose-quartz-shiva-statue-with-gold-painting",
  "smokey-quartz-crystal-shiva-face-idol"
]);

/**
 * Standardize any product object with clean single pricing, specs, and gallery images
 */
export const getStandardizedProduct = (product) => {
  if (!product) return product;

  const slug = (product.slug || "").toLowerCase().trim();
  const spec = STANDARDIZED_SPECS[slug];
  let cleanName = STANDARDIZED_NAMES[slug] || product.name || "";

  // Strip outdated single weight/dimension strings in trailing parentheses like (4.2 Inch, 462 g)
  cleanName = cleanName
    .replace(/\s*\([^\)]*?(?:g|kg|inch|cm|mm|[0-9])[^\)]*?\)/gi, "")
    .replace(/\s*-\s*testing\b/gi, "")
    .replace(/\btesting\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  let standardizedPrice = spec?.price !== undefined && spec?.price !== "" ? spec.price : product.price;
  let standardizedWeight = spec?.weight !== undefined && spec?.weight !== "" ? spec.weight : product.weight;
  let standardizedSize = spec?.size !== undefined && spec?.size !== "" ? spec.size : product.size;
  let standardizedPricePerUnit = spec?.pricePerUnit !== undefined && spec?.pricePerUnit !== "" ? spec.pricePerUnit : (product.pricePerUnit || "");

  const dimensions = spec?.dimensions || product.dimensions || standardizedSize;
  const formattedAdditionalInfo = formatAdditionalInfo(product.additionalInfo, {
    ...product,
    name: cleanName,
    slug,
    weight: standardizedWeight,
    size: standardizedSize,
    dimensions,
  });

  let cleanDescription = product.description || (product.detail ? `<p>${product.detail}</p>` : "");
  if (slug === "natural-opal-stone-shivling" && cleanDescription) {
    cleanDescription = cleanDescription
      .replace(/Natural Sphatik \(100% Certified Clear Quartz\)/gi, "Certified Natural Opal Stone (Upal Gemstone)")
      .replace(/Natural Sphatik/gi, "Natural Opal Stone")
      .replace(/100% Certified Clear Quartz/gi, "100% Certified Natural Opal Stone")
      .replace(/Clear Quartz/gi, "Opal Gemstone")
      .replace(/Sphatik/gi, "Opal Stone");
  }

  if (cleanDescription) {
    if (standardizedWeight) {
      cleanDescription = cleanDescription
        .replace(/(Estimated\s*Weight\s*<\/td>\s*<td[^>]*>).*?(<\/td>)/gis, `$1${standardizedWeight}$2`)
        .replace(/(<strong>\s*Estimated\s*Weight\s*:\s*<\/strong>\s*)[^<\n]+/gi, `$1${standardizedWeight}`);
    }
    if (standardizedSize) {
      cleanDescription = cleanDescription
        .replace(/(Size\s*(&amp;|&)\s*Dimensions\s*<\/td>\s*<td[^>]*>).*?(<\/td>)/gis, `$1${standardizedSize}$3`)
        .replace(/(<strong>\s*Size\s*(&amp;|&)\s*Dimensions\s*:\s*<\/strong>\s*)[^<\n]+/gi, `$1${standardizedSize}`);
    }

    // 1. Fix Labradorite products showing Sphatik
    if (slug.includes("labradorite")) {
      cleanDescription = cleanDescription
        .replace(/Natural Sphatik \(100% Certified Clear Quartz\)/gi, "Natural Labradorite Gemstone")
        .replace(/Natural Sphatik/gi, "Natural Labradorite")
        .replace(/100% Certified Clear Quartz/gi, "100% Certified Natural Labradorite")
        .replace(/Clear Quartz/gi, "Labradorite Gemstone")
        .replace(/Sphatik/gi, "Labradorite")
        .replace(/Silicon Dioxide \(SiO2\)/gi, "Plagioclase Feldspar ((Na,Ca)(Al,Si)4O8)")
        .replace(/Trigonal \(Trapezohedral\)\s*•?\s*7\.0 Mohs/gi, "Triclinic • 6.0 – 6.5 Mohs")
        .replace(/RI:\s*1\.544\s*–?\s*1\.553\s*•?\s*SG:\s*2\.65/gi, "RI: 1.560 – 1.568 • SG: 2.70");
    }

    // 2. Fix Howlite Shivling showing Sphatik
    if (slug.includes("howlite")) {
      cleanDescription = cleanDescription
        .replace(/Natural Sphatik \(100% Certified Clear Quartz\)/gi, "Natural Howlite Gemstone")
        .replace(/Natural Sphatik/gi, "Natural Howlite")
        .replace(/100% Certified Clear Quartz/gi, "100% Certified Natural Howlite")
        .replace(/Clear Quartz/gi, "Howlite Gemstone")
        .replace(/Sphatik/gi, "Howlite")
        .replace(/Silicon Dioxide \(SiO2\)/gi, "Calcium Borosilicate Hydroxide")
        .replace(/Trigonal \(Trapezohedral\)\s*•?\s*7\.0 Mohs/gi, "Monoclinic • 3.5 Mohs")
        .replace(/RI:\s*1\.544\s*–?\s*1\.553\s*•?\s*SG:\s*2\.65/gi, "RI: 1.583 – 1.608 • SG: 2.55");
    }

    // 3. Fix Red Jasper Shivling showing Sphatik
    if (slug.includes("red-jasper")) {
      cleanDescription = cleanDescription
        .replace(/Natural Sphatik \(100% Certified Clear Quartz\)/gi, "Natural Red Jasper Gemstone")
        .replace(/Natural Sphatik/gi, "Natural Red Jasper")
        .replace(/100% Certified Clear Quartz/gi, "100% Certified Natural Red Jasper")
        .replace(/Clear Quartz/gi, "Red Jasper Gemstone")
        .replace(/Sphatik/gi, "Red Jasper")
        .replace(/Silicon Dioxide \(SiO2\)/gi, "Silicon Dioxide with Iron Oxide (SiO2:Fe2O3)")
        .replace(/Trigonal \(Trapezohedral\)\s*•?\s*7\.0 Mohs/gi, "Trigonal (Cryptocrystalline) • 6.5 – 7.0 Mohs")
        .replace(/RI:\s*1\.544\s*–?\s*1\.553\s*•?\s*SG:\s*2\.65/gi, "RI: 1.530 – 1.540 • SG: 2.65");
    }

    // 4. Fix Smokey Quartz showing Clear Quartz
    if (slug.includes("smokey-quartz")) {
      cleanDescription = cleanDescription
        .replace(/Clear Quartz/gi, "Natural Smokey Quartz")
        .replace(/Sphatik/gi, "Smokey Quartz");
    }

    // 5. Fix Green Aventurine showing Green Jade / Nephrite
    if (slug.includes("aventurine")) {
      cleanDescription = cleanDescription
        .replace(/Green Jade \(Nephrite \/ Columbian Jadeite\)/gi, "Green Aventurine Gemstone")
        .replace(/Natural Green Jade/gi, "Natural Green Aventurine")
        .replace(/Green Jade/gi, "Green Aventurine")
        .replace(/Calcium Magnesium Silicate \/ Sodium Aluminium Silicate/gi, "Quartzite with Fuchsite Mica (SiO2:Cr)")
        .replace(/Monoclinic \(Interlocking Fibrous Aggregate\)\s*•?\s*6\.5\s*–\s*7\.0 Mohs/gi, "Trigonal • 7.0 Mohs")
        .replace(/RI:\s*1\.600\s*–\s*1\.625\s*•?\s*SG:\s*2\.95\s*–\s*3\.05/gi, "RI: 1.544 – 1.553 • SG: 2.65");
    }

    // 6. Fix Deity Mismatch in Radha Krishna
    if (slug.includes("radha-krishna") || slug.includes("krishna")) {
      cleanDescription = cleanDescription
        .replace(/Lord Ganesha, Goddess Mahalakshmi &amp; Lord Kubera/gi, "Lord Krishna &amp; Radha Rani (Bhakti &amp; Divine Love)")
        .replace(/Lord Ganesha, Goddess Mahalakshmi & Lord Kubera/gi, "Lord Krishna & Radha Rani (Bhakti & Divine Love)");
    }

    // 7. Fix Deity Mismatch in Saraswati
    if (slug.includes("saraswati")) {
      cleanDescription = cleanDescription
        .replace(/Lord Ganesha, Goddess Mahalakshmi &amp; Lord Kubera/gi, "Maa Saraswati (Wisdom, Intellect &amp; Arts)")
        .replace(/Lord Ganesha, Goddess Mahalakshmi & Lord Kubera/gi, "Maa Saraswati (Wisdom, Intellect & Arts)");
    }

    // 8. Fix Deity Mismatch in Elephant
    if (slug.includes("elephant")) {
      cleanDescription = cleanDescription
        .replace(/Lord Ganesha, Goddess Mahalakshmi &amp; Lord Kubera/gi, "Sacred Gaja (Airavata - Royal Prosperity &amp; Stability)")
        .replace(/Lord Ganesha, Goddess Mahalakshmi & Lord Kubera/gi, "Sacred Gaja (Airavata - Royal Prosperity & Stability)");
    }

    // 9. Worldwide natural Natural stutter cleanup
    cleanDescription = cleanDescription
      .replace(/(\b100%\s*)?natural\s+natural\b/gi, "100% Natural")
      .replace(/\bnatural\s+natural\b/gi, "Natural")
      .replace(/\bauthentic\s+natural\s+natural\b/gi, "authentic Natural")
      .replace(/\bcertified\s+natural\s+natural\b/gi, "certified Natural");
  }

  // 10. For all non-ranking products, eliminate duplicate embedded boxes and boilerplate repetition
  if (!PROTECTED_RANKING_SLUGS.has(slug) && cleanDescription) {
    // A. Remove embedded duplicate green Vastu box (now prominently featured in dedicated Vedic Guide card)
    cleanDescription = cleanDescription.replace(
      /<div[^>]*style="[^"]*background:\s*#f0fdf4[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
      ""
    );

    // B. Remove embedded duplicate gray guarantee box (already covered in Hero Trust badges)
    cleanDescription = cleanDescription.replace(
      /<div[^>]*style="[^"]*background:\s*#f8fafc[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
      ""
    );

    // C. Remove redundant competitor keyword boilerplate
    cleanDescription = cleanDescription.replace(
      /<p>\s*Looking to\s*<strong>\s*buy authentic[\s\S]*?<\/p>/gi,
      ""
    );

    // D. Replace verbatim copy of product.detail with unique sacred iconography opening
    if (slug.includes("radha-krishna") || slug.includes("krishna")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>The sacred worship of <strong>Lord Krishna and Radha Rani</strong> represents the highest pinnacle of Bhakti Yoga—the supreme union of unconditional love, divine devotion, and auspicious domestic harmony. Hand-carved with generational mastery from certified natural gemstone, this sacred idol captures the serene Tribhanga posture and celestial beauty to anchor peaceful vibrations in your home temple, living sanctum, or sacred space.</p>`
      );
    } else if (slug.includes("saraswati")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>Embodying the pure divine current of wisdom, creative speech, and fine arts, this sacred <strong>Maa Saraswati</strong> idol with the sacred Veena and Vedic scripture inspires deep intellectual clarity, creative eloquence, and academic focus in your study or sacred altar.</p>`
      );
    } else if (slug.includes("hanuman")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>Embodying supreme devotion, moral fearlessness, and unshakeable strength, this sacred <strong>Lord Hanuman</strong> idol acts as an energetic shield against negative environmental influences, dispelling fear and anchoring vital spiritual fortitude in your space.</p>`
      );
    } else if (slug.includes("lakshmi")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>Channelling the auspicious benevolence of <strong>Goddess Mahalakshmi</strong> seated upon the sacred lotus, this divine murti radiates continuous wealth, commercial expansion, and peaceful domestic prosperity.</p>`
      );
    } else if (slug.includes("elephant")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>Revered in Vedic Vastu traditions as Airavata—the divine white elephant symbolizing royal majesty, unshakeable stability, and lasting abundance—this handcrafted gemstone sculpture invites steady financial strength and dignified presence.</p>`
      );
    } else if (slug.includes("labradorite")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>Handcrafted from certified natural <strong>Labradorite Gemstone</strong> exhibiting genuine optical labradorescence, this sacred Shivling is carved according to Vedic Shilpa Shastras for daily Jalabhishekam, spiritual awakening, and deep meditative tranquility.</p>`
      );
    } else if (slug.includes("howlite")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>Sculpted from genuine natural <strong>White Howlite Stone</strong> with organic grey-black veining, this sacred Shivling calms turbulent thoughts, relieves stress, and establishes pure contemplative silence during meditation and temple worship.</p>`
      );
    } else if (slug.includes("red-jasper")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>Sculpted from authentic <strong>Red Jasper Stone</strong> renowned for grounding vitality and Root Chakra alignment, this sacred Shivling provides deep energetic stamina, courage, and protection against negative environmental stress.</p>`
      );
    } else if (slug.includes("smokey-quartz")) {
      cleanDescription = cleanDescription.replace(
        /<p><strong>\s*Handcrafted from certified[\s\S]*?<\/strong><\/p>|<p>\s*Handcrafted from certified[\s\S]*?<\/p>/i,
        `<p>Hand-carved from genuine natural <strong>Smokey Quartz Crystal</strong>, this sacred idol acts as a premier grounding and psychic shielding stone, transmuting heavy electromagnetic frequencies into clear spiritual light.</p>`
      );
    }
  }

  if (slug === "green-jade-panchmukhi-shivling") {
    cleanDescription = `
<p class="mb-4">Experience the divine presence of Lord Shiva with the <strong>Natural Green Jade Stone Panchmukhi Shivling</strong> (${standardizedWeight ? `Available in ${standardizedWeight}` : ""}${standardizedSize ? `, ${standardizedSize}` : ""}) hand-carved by master artisans at Crystal Jaipuria, Jaipur. This sacred idol represents the revered <strong>Pashupatinath Mahadev Swaroop</strong> featuring five distinct faces (Panchmukh) symbolizing the five cosmic elements (Panchamahabhuta) and eternal aspects of Lord Shiva.</p>

<h3 class="text-lg font-bold text-slate-900 mt-6 mb-3">Significance of the 5 Sacred Divine Faces (Panchamukha)</h3>
<ul class="list-disc pl-5 space-y-2 mb-6">
  <li><strong>Sadyojata (West Face) :</strong> Represents Earth (Prithvi Tattva) and the divine power of Creation (Srishti). Bestows new beginnings, physical strength, and grounding energy.</li>
  <li><strong>Vamadeva (North Face) :</strong> Represents Water (Jala Tattva) and Preservation (Sthiti). Radiates maternal compassion, emotional healing, and prosperity.</li>
  <li><strong>Aghora (South Face) :</strong> Represents Fire (Agni Tattva) and Rejuvenation (Samhara). Dispels negativity, fear, evil eye, and planetary afflictions.</li>
  <li><strong>Tatpurusha (East Face) :</strong> Represents Air (Vayu Tattva) and Spiritual Wisdom (Tirobhava). Enhances mental clarity, meditation, and inner peace.</li>
  <li><strong>Ishana (Zenith / Upward Face) :</strong> Represents Ether/Space (Akasha Tattva) and Supreme Liberation (Anugraha / Moksha). Radiates ultimate cosmic consciousness.</li>
</ul>

<h3 class="text-lg font-bold text-slate-900 mt-6 mb-3">Product Specifications &amp; Dimension Details</h3>
<div class="overflow-x-auto my-4">
  <table class="w-full text-sm border border-slate-200 rounded-lg">
    <tbody>
      <tr class="border-b border-slate-100 bg-slate-50"><td class="p-2.5 font-bold text-slate-900">Gemstone Material</td><td class="p-2.5 text-slate-700">100% Certified Natural Green Jade (Earth-Mined)</td></tr>
      <tr class="border-b border-slate-100"><td class="p-2.5 font-bold text-slate-900">Size / Height Range</td><td class="p-2.5 text-slate-700">${standardizedSize || "1 inch to 6 inch"}</td></tr>
      <tr class="border-b border-slate-100 bg-slate-50"><td class="p-2.5 font-bold text-slate-900">Weight Range</td><td class="p-2.5 text-slate-700">${standardizedWeight || "1 kg to 10 kg"}</td></tr>
      <tr class="border-b border-slate-100"><td class="p-2.5 font-bold text-slate-900">Spiritual Swaroop</td><td class="p-2.5 text-slate-700">Pashupatinath Mahadev 5-Faced Shiva Lingam</td></tr>
      <tr class="border-b border-slate-100 bg-slate-50"><td class="p-2.5 font-bold text-slate-900">Color &amp; Finish</td><td class="p-2.5 text-slate-700">Natural Deep Forest Green &bull; Smooth Mirror Polish</td></tr>
      <tr class="bg-slate-50"><td class="p-2.5 font-bold text-slate-900">Origin &amp; Certification</td><td class="p-2.5 text-slate-700">Jaipur Heritage Workshop &bull; Lab Certificate Included</td></tr>
    </tbody>
  </table>
</div>

<h3 class="text-lg font-bold text-slate-900 mt-6 mb-3">Vastu Placement &amp; Jalabhishek Pooja Vidhi</h3>
<p class="mb-4">Place this Green Jade Panchmukhi Shivling in your home temple, pooja room, or meditation altar with the Yoni base facing North or East. Natural Green Jade is an authentic non-porous stone, making it completely safe for daily sacred Jalabhishek, raw milk snan, honey, and sacred chandan offerings while chanting <em>"Om Namah Shivaya"</em>.</p>
`.trim();
  }
  if (cleanDescription) {
    cleanDescription = cleanDescription
      .replace(/Gold Panting/gi, "Gold Painting")
      .replace(/Elephant Staute/gi, "Elephant Statue")
      .replace(/Gemston /gi, "Gemstone ")
      .replace(/Mahvaveer/gi, "Mahaveer");
  }

  let cleanDetail = product.detail;
  if (slug === "green-jade-panchmukhi-shivling") {
    cleanDetail = `Buy 100% Certified Natural Green Jade Stone Panchmukhi Shivling (${standardizedWeight || "1 kg to 10 kg"}, ${standardizedSize || "1 inch to 6 inch"}) handcrafted in Jaipur, India. Sacred Pashupatinath Mahadev Swaroop with 5 divine faces for home temple pooja, Jalabhishek, and Vastu prosperity at factory direct price.`;
  } else if (cleanDetail) {
    if (slug.includes("labradorite")) {
      cleanDetail = cleanDetail.replace(/Natural\s+Sphatik\s*\([^)]*\)/gi, "Natural Labradorite Gemstone").replace(/Sphatik/gi, "Labradorite");
    } else if (slug.includes("howlite")) {
      cleanDetail = cleanDetail.replace(/Natural\s+Sphatik\s*\([^)]*\)/gi, "Natural Howlite Stone").replace(/Sphatik/gi, "Howlite");
    } else if (slug.includes("red-jasper")) {
      cleanDetail = cleanDetail.replace(/Natural\s+Sphatik\s*\([^)]*\)/gi, "Natural Red Jasper Stone").replace(/Sphatik/gi, "Red Jasper");
    } else if (slug.includes("smokey-quartz")) {
      cleanDetail = cleanDetail.replace(/Natural\s+Sphatik\s*\([^)]*\)/gi, "Natural Smokey Quartz Gemstone");
    }
    cleanDetail = cleanDetail
      .replace(/Gold Panting/gi, "Gold Painting")
      .replace(/Elephant Staute/gi, "Elephant Statue")
      .replace(/Gemston /gi, "Gemstone ")
      .replace(/Mahvaveer/gi, "Mahaveer")
      .replace(/(\b100%\s*)?natural\s+natural\b/gi, "100% Natural")
      .replace(/\bnatural\s+natural\b/gi, "Natural");
  }

  // Bulletproof Pure Local Static WebP Delivery for Catalog & Live Support for Dynamic Products
  let standardizedImages = [];
  if (slug === "natural-sphatik-shivling") {
    standardizedImages = [
      { url: `/images/${slug}.webp`, public_id: `products/${slug}` },
      { url: `/images/${slug}-2.webp`, public_id: `products/${slug}-2` },
      { url: `/images/${slug}-3.webp`, public_id: `products/${slug}-3` },
    ];
  } else if (MULTI_IMAGE_SLUGS.has(slug)) {
    standardizedImages = [
      { url: `/images/${slug}.webp`, public_id: `products/${slug}` },
      { url: `/images/${slug}-2.webp`, public_id: `products/${slug}-2` },
    ];
  } else if (STATIC_CATALOG_SLUGS.has(slug)) {
    standardizedImages = [
      { url: `/images/${slug}.webp`, public_id: `products/${slug}` },
    ];
  } else if (Array.isArray(product.images) && product.images.length > 0) {
    // Preserve uploaded images for newly added admin products!
    standardizedImages = product.images.map((img) =>
      typeof img === "string" ? { url: img, public_id: img } : img
    );
  } else if (slug) {
    standardizedImages = [
      { url: `/images/${slug}.webp`, public_id: `products/${slug}` },
    ];
  } else {
    standardizedImages = [{ url: "/Gemstone.webp", public_id: "placeholder" }];
  }

  return {
    ...product,
    name: cleanName,
    price: standardizedPrice,
    weight: standardizedWeight,
    size: standardizedSize,
    pricePerUnit: standardizedPricePerUnit,
    dimensions,
    detail: cleanDetail,
    description: cleanDescription,
    additionalInfo: formattedAdditionalInfo,
    images: standardizedImages,
  };
};
