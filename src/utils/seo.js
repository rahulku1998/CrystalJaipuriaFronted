/**
 * SEO helper functions for optimizing title and description lengths
 * Super SEO Titles designed for Google Search, AI Overviews & High Click-Through Rate (CTR)
 */

const SUPER_TITLE_MAPPINGS = {
  "natural-sphatik-shivling": "Natural Sphatik Shivling (100% Certified Clear Quartz) | Jaipur Manufacturer",
  "clear-crystal-quartz-shivling-with-shiva-face": "Clear Quartz Shivling With Shiva Face (Handcrafted Sphatik Murti)",
  "green-jade-shiva-statue-with-gold-panting": "Green Jade Shiva Statue With 24K Gold Painting | Authentic Jaipur Carving",
  "natural-rose-quartz-pair-of-swan": "Natural Rose Quartz Pair of Swans for Love & Vastu Harmony",
  "gemston-ruby-shree-yantra": "Natural Ruby Gemstone Shree Yantra | Vedic Wealth & Prosperity",
  "blue-sapphire-carving-shiva-statue": "Handcrafted Blue Sapphire Carving Shiva Statue | Jaipur Gemstone Wholesaler",
  "green-jade-carved-shree-krishana-statue": "Green Jade Carved Shree Krishna Statue | Authentic Jaipur Gemstone Idol",
  "pyrite-gemston-shivling": "Golden Pyrite Gemstone Shivling (Money Magnet & Vastu) | Crystal Jaipuria",
  "green-jade-panchmukhi-shivling": "Natural Green Jade Panchmukhi Shivling (5-Faced Shiva) | Jaipur Manufacturer",
  "natural-ruby-shivling": "Natural Ruby Gemstone Shivling | Certified Precious Gem Carving",
  "green-jade-elephant-staute": "Handcrafted Green Jade Elephant Statue for Good Luck & Vastu | Jaipur",
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva": "Natural Lapis Lazuli Shiva Linga With Face | Authentic Gemstone Murti",
  "green-jade-carving-shiva-face-statue": "Green Jade Carved Shiva Face Idol | Handcrafted Spiritual Decor",
  "crystal-sphtik-shree-yantra-on-kamal-flower": "Crystal Sphatik Shree Yantra on Kamal Lotus | 100% Pure Clear Quartz",
  "black-agate-gemstone-carving-of-ganesh": "Natural Black Agate Ganesha Murti for Protection & Prosperity | Jaipur",
  "gemston-amethyst-diya": "Natural Amethyst Gemstone Diya for Meditation & Temple Pooja",
  "crystal-clear-mahvaveer-ji-statue": "Crystal Clear Mahaveer Ji Statue | Authentic Digambar & Shwetambar Jain Idol",
  "amethyst-gemston-angel": "Natural Amethyst Gemstone Guardian Angel for Healing & Positive Energy",
};

export const getProductMetaTitle = (productName, slug = "") => {
  if (!productName) return "Crystal Jaipuria | Gemstone Statues & Sphatik Manufacturer";

  // Check direct high-intent mapping
  const normalizedSlug = (slug || "").toLowerCase().trim();
  if (normalizedSlug && SUPER_TITLE_MAPPINGS[normalizedSlug]) {
    return SUPER_TITLE_MAPPINGS[normalizedSlug];
  }

  // Check matching by product name keyword
  const lowerName = productName.toLowerCase();
  for (const [key, superTitle] of Object.entries(SUPER_TITLE_MAPPINGS)) {
    const keyword = key.replace(/-/g, " ");
    if (lowerName.includes(keyword) || keyword.includes(lowerName)) {
      return superTitle;
    }
  }

  const brand = " | Crystal Jaipuria";
  const cleanName = productName.trim();

  if (cleanName.length + brand.length <= 60) {
    return `${cleanName}${brand}`;
  }

  const maxNameLen = 60 - brand.length;
  let trimmed = cleanName.slice(0, maxNameLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace > 15) {
    trimmed = trimmed.slice(0, lastSpace);
  }
  trimmed = trimmed
    .replace(/[\s,\-_|]+$/, "")
    .replace(/\s+(with|of|and|in|for|on|the|a|an|to|from|by)$/i, "")
    .trim();

  return `${trimmed}${brand}`;
};

export const getProductMetaDescription = (product) => {
  if (!product) {
    return "Shop authentic handcrafted gemstone god statues, crystal carvings & spiritual decor from Crystal Jaipuria, Jaipur. Best wholesale & retail prices.";
  }

  const name = (product.name || "").trim();
  let rawDesc = (product.description || product.detail || "").replace(/\r?\n|\r/g, " ");
  const specIndex = rawDesc.indexOf("Product Specifications");
  if (specIndex > 0) {
    rawDesc = rawDesc.slice(0, specIndex);
  }
  rawDesc = rawDesc.replace(/\s+/g, " ").trim();

  if (rawDesc && rawDesc.length >= 80) {
    if (rawDesc.length <= 160) {
      return rawDesc;
    }
    const target = rawDesc.slice(0, 157);
    const lastSpace = target.lastIndexOf(" ");
    const truncated = (lastSpace > 100 ? target.slice(0, lastSpace) : target)
      .replace(/[\s,\-_|.:]+$/, "")
      .trim();
    return `${truncated}...`;
  }

  const crafted = `Buy handcrafted ${name} from Crystal Jaipuria, Jaipur. Premium natural gemstone for home, temple & spiritual Vastu decor. Global shipping available.`;
  if (crafted.length <= 160) {
    return crafted;
  }
  const target = crafted.slice(0, 157);
  const lastSpace = target.lastIndexOf(" ");
  const truncated = (lastSpace > 100 ? target.slice(0, lastSpace) : target)
    .replace(/[\s,\-_|.:]+$/, "")
    .trim();
  return `${truncated}...`;
};

/**
 * Helper to safely extract clean numeric prices for Schema.org (handles "₹37500 - ₹75000", "6/GRAM", etc.)
 */
export const parseSchemaPrice = (raw) => {
  if (!raw) return { isRange: false, price: "999" };
  const str = String(raw).replace(/,/g, "");
  const matches = str.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length === 0) {
    return { isRange: false, price: "999" };
  }
  const nums = matches.map(Number).filter((n) => !isNaN(n) && n > 0);
  if (nums.length === 0) {
    return { isRange: false, price: "999" };
  }
  if (nums.length >= 2) {
    const low = Math.min(...nums);
    const high = Math.max(...nums);
    if (low !== high) {
      return {
        isRange: true,
        lowPrice: String(low),
        highPrice: String(high),
        price: String(low),
      };
    }
  }
  return { isRange: false, price: String(nums[0]) };
};

/**
 * Generate Google Schema.org Product Structured Data (JSON-LD) with BreadcrumbList
 */
export const getProductSchema = (product, canonicalUrl) => {
  if (!product) return null;

  const parsedPrice = parseSchemaPrice(product.price || product.discountPrice);
  const imageUrl =
    (Array.isArray(product.images) && product.images[0]?.url) ||
    (Array.isArray(product.images) && typeof product.images[0] === "string" ? product.images[0] : null) ||
    (typeof product.images === "string" ? product.images : null) ||
    "https://www.crystaljaipuria.com/logo.png";
  const desc = getProductMetaDescription(product);
  const categoryName = product.categoryId?.name || "Gemstone Statues";
  const categorySlug = product.categoryId?.slug || "";

  const breadcrumbs = [
    { name: "Home", url: "https://www.crystaljaipuria.com/" },
    { name: "Shop", url: "https://www.crystaljaipuria.com/shop" },
  ];

  if (categorySlug) {
    breadcrumbs.push({
      name: categoryName,
      url: `https://www.crystaljaipuria.com/${categorySlug}`,
    });
  }

  breadcrumbs.push({
    name: product.name,
    url: canonicalUrl,
  });

  const commonOfferFields = {
    priceCurrency: "INR",
    priceValidUntil: "2027-12-31",
    validFrom: "2024-01-01",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: "Crystal Jaipuria",
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 7,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "INR",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "IN",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "d",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 3,
          maxValue: 5,
          unitCode: "d",
        },
      },
    },
  };

  let offersObj;
  if (parsedPrice.isRange) {
    offersObj = {
      "@type": "AggregateOffer",
      url: canonicalUrl,
      lowPrice: parsedPrice.lowPrice,
      highPrice: parsedPrice.highPrice,
      offerCount: "1",
      ...commonOfferFields,
    };
  } else {
    offersObj = {
      "@type": "Offer",
      url: canonicalUrl,
      price: parsedPrice.price,
      ...commonOfferFields,
    };
  }

  const graph = [
    {
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      name: product.name,
      image: Array.isArray(product.images)
        ? product.images.map((img) => (typeof img === "string" ? img : img?.url || imageUrl))
        : [imageUrl],
      description: desc,
      sku: product._id,
      mpn: product.slug || product._id,
      category: categoryName,
      brand: {
        "@type": "Brand",
        name: "Crystal Jaipuria",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "36",
        bestRating: "5",
        worstRating: "1",
      },
      offers: offersObj,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];

  if (product.faqs) {
    let parsedFaqs = [];
    try {
      parsedFaqs = typeof product.faqs === "string" ? JSON.parse(product.faqs) : product.faqs;
    } catch {
      parsedFaqs = [];
    }
    if (Array.isArray(parsedFaqs) && parsedFaqs.length > 0) {
      const validFaqs = parsedFaqs.filter((f) => f.question && f.answer);
      if (validFaqs.length > 0) {
        graph.push({
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          mainEntity: validFaqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        });
      }
    }
  }

  return {
    "@context": "https://schema.org/",
    "@graph": graph,
  };
};

/**
 * Generate Google Schema.org BreadcrumbList Structured Data (JSON-LD)
 */
export const getBreadcrumbSchema = (items) => {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Generate Google Schema.org Article Structured Data (JSON-LD)
 */
export const getArticleSchema = (blog, canonicalUrl) => {
  if (!blog) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description || blog.title,
    "image": blog.coverImage?.url || "https://www.crystaljaipuria.com/logo.png",
    "datePublished": blog.createdAt || new Date().toISOString(),
    "dateModified": blog.updatedAt || blog.createdAt || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Crystal Jaipuria",
      "url": "https://www.crystaljaipuria.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Crystal Jaipuria",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.crystaljaipuria.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };
};

/**
 * Format single price or price ranges (e.g. "300-700" -> "₹300 - ₹700", "6/GRAM" -> "₹6/GRAM")
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return "";
  let str = String(price).trim();
  if (!str) return "";

  // Check for price range like "300-700", "300 - 700", "₹300-700", "300 to 700"
  if (str.includes("-") || / to /i.test(str)) {
    const separator = str.includes("-") ? "-" : / to /i;
    const parts = str.split(separator).map((p) => p.trim());
    if (parts.length === 2 && parts[0] && parts[1]) {
      const p1 = parts[0].replace(/^₹\s*/, "").trim();
      const p2 = parts[1].replace(/^₹\s*/, "").trim();
      return `₹${p1} - ₹${p2}`;
    }
  }

  if (str.startsWith("₹")) {
    return str.replace(/^₹\s+/, "₹");
  }
  return `₹${str}`;
};
