/**
 * Product Data Standardizer for Crystal Jaipuria
 * Normalizes price ranges, unit rates (e.g. 6/GRAM), missing weights & dimensions
 * to industry-standard realistic single pricing and precise specs.
 */

export const STANDARDIZED_SPECS = {
  "natural-opal-stone-shivling": {
    price: 3500,
    weight: "200 Gram",
    size: "3.0 Inch",
    dimensions: "7.6 x 5.0 x 5.0 cm",
  },
  "natural-lapis-lazuli-lord-krishna-statue": {
    price: 22000,
    weight: "1.8 Kg",
    size: "7.5 Inch",
    dimensions: "19.0 x 8.5 x 6.0 cm",
  },
  "natural-lapis-lazuli-shiva-face-carving-idol": {
    price: 18500,
    weight: "1.5 Kg",
    size: "6.5 Inch",
    dimensions: "16.5 x 9.0 x 6.5 cm",
  },
  "natural-sphatik-shivling": {
    price: 2000,
    weight: "60 Gram",
    size: "2.5 Inch",
    dimensions: "6.3 x 4.0 x 4.0 cm",
  },
  "clear-crystal-quartz-shivling-with-shiva-face": {
    price: 37500,
    weight: "500 Gram",
    size: "4.5 Inch",
    dimensions: "11.4 x 7.5 x 7.5 cm",
  },
  "green-jade-shiva-statue-with-gold-panting": {
    price: 20000,
    weight: "6.5 Kg",
    size: "9.5 Inch",
    dimensions: "24.1 x 15.2 x 10.1 cm",
  },
  "natural-rose-quartz-pair-of-swan": {
    price: 750,
    weight: "150 Gram",
    size: "5.5 Inch",
    dimensions: "14.0 x 7.5 x 4.0 cm",
  },
  "gemston-ruby-shree-yantra": {
    price: 750,
    weight: "50 Gram",
    size: "1.5 Inch",
    dimensions: "3.8 x 3.8 x 3.8 cm",
  },
  "blue-sapphire-carving-shiva-statue": {
    price: 4800,
    weight: "400 Gram",
    size: "4.0 Inch",
    dimensions: "10.2 x 6.5 x 4.5 cm",
  },
  "green-jade-carved-shree-krishana-statue": {
    price: 28000,
    weight: "3.5 Kg",
    size: "8.0 Inch",
    dimensions: "20.3 x 10.0 x 7.5 cm",
  },
  "pyrite-gemston-shivling": {
    price: 500,
    weight: "100 Gram",
    size: "2.5 Inch",
    dimensions: "6.3 x 4.0 x 4.0 cm",
  },
  "green-jade-panchmukhi-shivling": {
    price: 5000,
    weight: "500 Grams (apx.)",
    size: "4.5 Inches",
    dimensions: "11.4 x 8.0 x 8.0 cm",
  },
  "natural-ruby-shivling": {
    price: 8500,
    weight: "60 Gram",
    size: "1.5 Inch",
    dimensions: "3.8 x 3.0 x 3.0 cm",
  },
  "green-jade-elephant-staute": {
    price: 1200,
    weight: "200 Gram",
    size: "2.5 Inch",
    dimensions: "6.3 x 7.5 x 4.0 cm",
  },
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva": {
    price: 5000,
    weight: "500 Gram",
    size: "4.5 Inch",
    dimensions: "11.4 x 7.5 x 7.5 cm",
  },
  "green-jade-carving-shiva-face-statue": {
    price: 37500,
    weight: "5.0 Kg",
    size: "8.0 Inch",
    dimensions: "20.3 x 12.5 x 9.0 cm",
  },
  "crystal-sphtik-shree-yantra-on-kamal-flower": {
    price: 2000,
    weight: "250 Gram",
    size: "3.5 Inch",
    dimensions: "8.9 x 8.9 x 7.0 cm",
  },
  "black-agate-gemstone-carving-of-ganesh": {
    price: 12000,
    weight: "2.0 Kg",
    size: "8.0 Inch",
    dimensions: "20.3 x 11.5 x 8.0 cm",
  },
  "gemston-amethyst-diya": {
    price: 200,
    weight: "80 Gram",
    size: "2.5 Inch",
    dimensions: "6.3 x 6.3 x 3.0 cm",
  },
  "crystal-clear-mahvaveer-ji-statue": {
    price: 25000,
    weight: "2.5 Kg",
    size: "9.0 Inch",
    dimensions: "22.8 x 14.0 x 8.5 cm",
  },
  "amethyst-gemston-angel": {
    price: 350,
    weight: "110 Gram",
    size: "3.0 Inch",
    dimensions: "7.6 x 4.5 x 2.5 cm",
  },
};

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

  const cleanWeight = spec.weight || product.weight || "";
  const cleanSize = spec.size || product.size || "";
  const cleanDimensions = spec.dimensions || product.dimensions || "";

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
  "green-jade-panchmukhi-shivling": "Natural Green Jade Stone Panchmukhi Shivling (500g, 4.5\")"
};

/**
 * Standardize any product object with clean single pricing and specs
 */
export const getStandardizedProduct = (product) => {
  if (!product) return product;

  const slug = (product.slug || "").toLowerCase().trim();
  const spec = STANDARDIZED_SPECS[slug];
  const cleanName = STANDARDIZED_NAMES[slug] || product.name;

  let standardizedPrice = product.price;
  let standardizedWeight = product.weight;
  let standardizedSize = product.size;

  if (spec) {
    if (
      !standardizedPrice ||
      String(standardizedPrice).includes("-") ||
      String(standardizedPrice).includes("/GRAM") ||
      String(standardizedPrice).includes("to") ||
      standardizedPrice === "120"
    ) {
      standardizedPrice = spec.price;
    }

    if (!standardizedWeight || standardizedWeight === "N/A" || standardizedWeight.includes("-") || standardizedWeight.includes("TO")) {
      standardizedWeight = spec.weight;
    }

    if (!standardizedSize || standardizedSize === "N/A" || standardizedSize.includes("-") || standardizedSize.includes("to")) {
      standardizedSize = spec.size;
    }
  }

  const dimensions = spec?.dimensions || product.dimensions || standardizedSize;
  const formattedAdditionalInfo = formatAdditionalInfo(product.additionalInfo, {
    ...product,
    name: cleanName,
    slug,
    weight: standardizedWeight,
    size: standardizedSize,
    dimensions,
  });

  let cleanDescription = product.description;
  if (slug === "natural-opal-stone-shivling" && cleanDescription) {
    cleanDescription = cleanDescription
      .replace(/Natural Sphatik \(100% Certified Clear Quartz\)/gi, "Certified Natural Opal Stone (Upal Gemstone)")
      .replace(/Natural Sphatik/gi, "Natural Opal Stone")
      .replace(/100% Certified Clear Quartz/gi, "100% Certified Natural Opal Stone")
      .replace(/Clear Quartz/gi, "Opal Gemstone")
      .replace(/Sphatik/gi, "Opal Stone");
  }

  if (slug === "green-jade-panchmukhi-shivling") {
    cleanDescription = `
<p class="mb-4">Experience the divine presence of Lord Shiva with the <strong>Natural Green Jade Stone Panchmukhi Shivling</strong> (500g, 4.5 Inches) hand-carved by master artisans at Crystal Jaipuria, Jaipur. This sacred idol represents the revered <strong>Pashupatinath Mahadev Swaroop</strong> featuring five distinct faces (Panchmukh) symbolizing the five cosmic elements (Panchamahabhuta) and eternal aspects of Lord Shiva.</p>

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
      <tr class="border-b border-slate-100"><td class="p-2.5 font-bold text-slate-900">Height</td><td class="p-2.5 text-slate-700">4.5 Inches (approx. 11.4 cm)</td></tr>
      <tr class="border-b border-slate-100 bg-slate-50"><td class="p-2.5 font-bold text-slate-900">Base Width</td><td class="p-2.5 text-slate-700">3.1 Inches (approx. 8.0 cm)</td></tr>
      <tr class="border-b border-slate-100"><td class="p-2.5 font-bold text-slate-900">Weight</td><td class="p-2.5 text-slate-700">500 Grams (approx.) &bull; Custom orders up to 2.5 kg available</td></tr>
      <tr class="border-b border-slate-100 bg-slate-50"><td class="p-2.5 font-bold text-slate-900">Spiritual Swaroop</td><td class="p-2.5 text-slate-700">Pashupatinath Mahadev 5-Faced Shiva Lingam</td></tr>
      <tr class="border-b border-slate-100"><td class="p-2.5 font-bold text-slate-900">Color &amp; Finish</td><td class="p-2.5 text-slate-700">Natural Deep Forest Green &bull; Smooth Mirror Polish</td></tr>
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
    cleanDetail = "Buy 100% Certified Natural Green Jade Stone Panchmukhi Shivling (500g, 4.5 Inches) handcrafted in Jaipur, India. Sacred Pashupatinath Mahadev Swaroop with 5 divine faces for home temple pooja, Jalabhishek, and Vastu prosperity at factory direct price.";
  } else if (cleanDetail) {
    cleanDetail = cleanDetail
      .replace(/Gold Panting/gi, "Gold Painting")
      .replace(/Elephant Staute/gi, "Elephant Statue")
      .replace(/Gemston /gi, "Gemstone ")
      .replace(/Mahvaveer/gi, "Mahaveer");
  }

  return {
    ...product,
    name: cleanName,
    price: standardizedPrice,
    weight: standardizedWeight,
    size: standardizedSize,
    dimensions,
    detail: cleanDetail,
    description: cleanDescription,
    additionalInfo: formattedAdditionalInfo,
  };
};
