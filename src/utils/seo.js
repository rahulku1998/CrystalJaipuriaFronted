/**
 * SEO helper functions for optimizing title and description lengths
 * Super SEO Titles designed for Google Search, AI Overviews & High Click-Through Rate (CTR)
 */
import { GOOGLE_BUSINESS_STATS } from "../config/businessStats.js";
import { getVedicVastuForProduct } from "./productMetadata.js";


export const SUPER_TITLE_MAPPINGS = {
  "ruby-ram-darbar-carving": "Ruby Ram Darbar Carving | Gemstone Idol | Crystal Jaipuria",
  "elegant-ruby-ram-darbar-carving": "Ruby Ram Darbar Carving | Gemstone Idol | Crystal Jaipuria",
  "green-aventurine-lord-shiva": "Green Aventurine Lord Shiva Statue | Mahadev | Crystal Jaipuria",
  "goddess-tara-in-green-aventurine": "Goddess Tara in Green Aventurine | Healing Idol | Crystal Jaipuria",
  "green-aventurine-goddess-tara": "Goddess Tara in Green Aventurine | Healing Idol | Crystal Jaipuria",
  "tirupati-balaji-in-tiger-eye": "Tirupati Balaji in Tiger's Eye | Lord Balaji | Crystal Jaipuria",
  "tiger-eye-tirupati-balaji": "Tirupati Balaji in Tiger's Eye | Lord Balaji | Crystal Jaipuria",
  "carving-of-4-horse-bust-together-in-lapis-lazuli": "Lapis Lazuli 4 Horse Bust Sculpture | Vastu | Crystal Jaipuria",
  "lapis-lazuli-four-horse-carving": "Lapis Lazuli 4 Horse Bust Sculpture | Vastu | Crystal Jaipuria",
  "7-running-horses-in-lapis-lazuli": "7 Running Horses in Lapis Lazuli | Vastu Horses | Crystal Jaipuria",
  "lapis-lazuli-7-running-horses": "7 Running Horses in Lapis Lazuli | Vastu Horses | Crystal Jaipuria",
  "tea-set-in-crystal-quartz": "Crystal Quartz Tea Set | Handcrafted Gemstone | Crystal Jaipuria",
  "crystal-quartz-tea-set": "Crystal Quartz Tea Set | Handcrafted Gemstone | Crystal Jaipuria",
  "sodalite-buddha": "Sodalite Buddha Statue (17 in) | Meditating Idol | Crystal Jaipuria",
  "ruby-kyanite-buddha": "Ruby Kyanite Buddha Statue (14 in) | Gem Murti | Crystal Jaipuria",
  "natural-opal-stone-shivling": "Natural Opal Stone Shivling (Upal Ratna) | Crystal Jaipuria",
  "natural-lapis-lazuli-lord-krishna-statue": "Natural Lapis Lazuli Lord Krishna Statue | Crystal Jaipuria",
  "natural-lapis-lazuli-shiva-face-carving-idol": "Natural Lapis Lazuli Shiva Face Carving Idol | Crystal Jaipuria",
  "crystal-shivling": "Original Sphatik Shivling in Jaipur | Crystal Jaipuria",
  "natural-sphatik-shivling": "Natural Sphatik Shivling in Jaipur | Crystal Jaipuria",
  "clear-crystal-quartz-shivling-with-shiva-face": "Clear Quartz Shivling With Shiva Face | Crystal Jaipuria",
  "green-jade-shiva-statue-with-gold-panting": "Green Jade Shiva Statue with 24K Gold Painting | Crystal Jaipuria",
  "natural-rose-quartz-pair-of-swan": "Natural Rose Quartz Pair of Swans | Crystal Jaipuria",
  "gemston-ruby-shree-yantra": "Natural Ruby Gemstone Shree Yantra | Crystal Jaipuria",
  "blue-sapphire-carving-shiva-statue": "Handcrafted Blue Sapphire Carving Shiva Statue | Crystal Jaipuria",
  "green-jade-carved-shree-krishana-statue": "Green Jade Carved Shree Krishna Statue | Crystal Jaipuria",
  "pyrite-gemston-shivling": "Golden Pyrite Gemstone Shivling | Crystal Jaipuria",
  "green-jade-panchmukhi-shivling": "Natural Green Jade Panchmukhi Shivling | Crystal Jaipuria",
  "natural-ruby-shivling": "Natural Ruby Gemstone Shivling | Crystal Jaipuria",
  "green-jade-elephant-staute": "Handcrafted Green Jade Elephant Statue | Crystal Jaipuria",
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva": "Natural Lapis Lazuli Shiva Linga With Face | Crystal Jaipuria",
  "green-jade-carving-shiva-face-statue": "Green Jade Carved Shiva Face Idol | Crystal Jaipuria",
  "crystal-sphtik-shree-yantra-on-kamal-flower": "Crystal Sphatik Shree Yantra on Lotus | Crystal Jaipuria",
  "black-agate-gemstone-carving-of-ganesh": "Natural Black Agate Ganesha Murti | Crystal Jaipuria",
  "gemston-amethyst-diya": "Natural Amethyst Gemstone Diya | Crystal Jaipuria",
  "crystal-clear-mahvaveer-ji-statue": "Crystal Clear Mahaveer Ji Statue | Crystal Jaipuria",
  "amethyst-gemston-angel": "Natural Amethyst Gemstone Guardian Angel | Crystal Jaipuria",
  "rose-quartz-ganesh-with-silver-work-idol-for-luxury-decor": "Rose Quartz Ganesh with Silver Work | Luxury Murti | Crystal Jaipuria",
  "rose-quartz-ganesh-with-silver-work": "Rose Quartz Ganesh with Silver Work | Luxury Murti | Crystal Jaipuria",
  "green-jade-carved-ganesha-statue-with-silver-gold-work": "Green Jade Ganesha with Silver & Gold Work | Crystal Jaipuria",
  "green-jade-carved-ganesha": "Green Jade Ganesha with Silver & Gold Work | Crystal Jaipuria",
  "durga-devi-ruby-idol": "Durga Devi Ruby Idol | Natural Gemstone Murti | Crystal Jaipuria",
  "green-aventurine-shankh": "Green Aventurine Shankh | Wealth & Vastu Crystal | Crystal Jaipuria",
  "nataraja-dancing-shiva-sunstone-idol": "Nataraja Dancing Shiva Sunstone Idol | Murti | Crystal Jaipuria",
  "shiva-in-lepidolite": "Shiva in Lepidolite | Rahu Mahadasha Idol | Crystal Jaipuria",
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

export const SUPER_DESCRIPTION_MAPPINGS = {
  "green-jade-panchmukhi-shivling": "Buy 100% Certified Natural Green Jade Stone Panchmukhi Shivling. 5 divine faces of Pashupatinath Mahadev. Handcrafted in Jaipur at factory direct price.",
  "crystal-shivling": "Buy 100% original certified Sphatik Shivling in Jaipur directly from manufacturer. Ideal for daily Jalabhishek. Visit our Sanganer workshop or order online.",
  "natural-sphatik-shivling": "Original certified Natural Sphatik Shivling in Jaipur crafted by master artisans. Direct factory price in Jaipur. 100% pure Clear Quartz for holy Jalabhishek.",
  "rose-quartz-ganesh-with-silver-work-idol-for-luxury-decor": "Buy luxury Handcrafted Rose Quartz Ganesh with 925 Sterling Silver Work & 24K Gold Mukut. 100% natural certified gemstone idol for luxury home decor from Jaipur.",
  "rose-quartz-ganesh-with-silver-work": "Buy luxury Handcrafted Rose Quartz Ganesh with 925 Sterling Silver Work & 24K Gold Mukut. 100% natural certified gemstone idol for luxury home decor from Jaipur.",
  "green-jade-carved-ganesha-statue-with-silver-gold-work": "Buy luxury Handcrafted Green Jade Carved Ganesha Statue with Silver & 24K Gold Work. 100% natural certified gemstone idol for luxury home decor & corporate gifts.",
  "green-jade-carved-ganesha": "Buy luxury Handcrafted Green Jade Carved Ganesha Statue with Silver & 24K Gold Work. 100% natural certified gemstone idol for luxury home decor & corporate gifts.",
};

export const getProductMetaDescription = (product) => {
  if (!product) {
    return "Shop authentic handcrafted gemstone god statues, crystal carvings & spiritual decor from Crystal Jaipuria, Jaipur. Best wholesale & retail prices.";
  }

  const slug = (product.slug || "").toLowerCase().trim();
  if (slug && SUPER_DESCRIPTION_MAPPINGS[slug]) {
    return SUPER_DESCRIPTION_MAPPINGS[slug];
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
 * Default high-intent gemstone FAQs for GEO, AEO, and Google Rich Snippets
 */
export const getDefaultProductFaqs = (productName = "Gemstone Idol") => [
  {
    question: `How can I verify that this ${productName} is 100% natural gemstone and not glass or synthetic resin?`,
    answer: `All our gemstone sculptures are handcrafted directly from natural earth-mined stones in Jaipur. Genuine natural gemstones exhibit organic internal inclusions, micro-veins, and remain naturally cool to the touch at room temperature, unlike plastic polymers or glass imitations.`,
  },
  {
    question: `Can I perform daily Jalabhishekam, Milk, or Panchamrit Puja on this idol?`,
    answer: `Yes, authentic natural gemstones (such as Sphatik Quartz, Green Jade, Black Agate, and Narmadeshwar stone) are naturally dense and water-resistant. You can safely perform daily Vedic Puja, Jalabhishekam, and Panchamrit rituals.`,
  },
  {
    question: `How is the gemstone idol packaged to prevent transit breakage?`,
    answer: `Every sculpture undergoes 5-layer shockproof protective sacred packaging: soft velvet wrapping, high-density bubble cushioning, custom thermocol casing, heavy-duty corrugated boxing, and waterproof stretch sealing to guarantee 100% breakage-free delivery across India and worldwide.`,
  },
  {
    question: `Where is this crafted and dispatched from?`,
    answer: `Hand-carved and directly dispatched by hereditary master stone carvers from Crystal Jaipuria's artisan workshop in Sanganer, Jaipur, Rajasthan (crafting sacred gemstone murti art since 1989).`,
  },
  {
    question: `What is your return and replacement policy?`,
    answer: `We provide a 7-day hassle-free return and replacement policy. In the rare event of transit damage or customer dissatisfaction, our Jaipur customer support team (+91 83063 17032) provides immediate replacement or full refund.`,
  },
];

export const toAbsoluteUrl = (url) => {
  if (!url) return "https://www.crystaljaipuria.com/logo.png";
  if (typeof url !== "string") return "https://www.crystaljaipuria.com/logo.png";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `https://www.crystaljaipuria.com${clean}`;
};

/**
 * Generate Google Schema.org Product Structured Data (JSON-LD) with BreadcrumbList
 */
export const getProductSchema = (product, canonicalUrl) => {
  if (!product) return null;

  const vedicVastu = getVedicVastuForProduct(product);
  const parsedPrice = parseSchemaPrice(product.price || product.discountPrice);
  const rawImageUrl =
    (Array.isArray(product.images) && product.images[0]?.url) ||
    (Array.isArray(product.images) && typeof product.images[0] === "string" ? product.images[0] : null) ||
    (typeof product.images === "string" ? product.images : null) ||
    "https://www.crystaljaipuria.com/logo.png";
  const imageUrl = toAbsoluteUrl(rawImageUrl);
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
          maxValue: 7,
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
      price: Number(parsedPrice.price) || 999,
      ...commonOfferFields,
    };
  }

  if (product.pricePerUnit) {
    offersObj.priceSpecification = {
      "@type": "UnitPriceSpecification",
      price: Number(parsedPrice.price) || 0,
      priceCurrency: "INR",
      unitText: product.pricePerUnit,
    };
  }

  const graph = [
    {
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      name: product.name,
      image: Array.isArray(product.images) && product.images.length > 0
        ? product.images.map((img) => toAbsoluteUrl(typeof img === "string" ? img : img?.url || imageUrl))
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
        ratingValue: String(GOOGLE_BUSINESS_STATS.rating),
        reviewCount: String(GOOGLE_BUSINESS_STATS.reviewCount),
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Verified Collector",
          },
          datePublished: "2024-04-10",
          reviewBody: `Authentic handcrafted natural gemstone sculpture from Crystal Jaipuria. Exquisite Vedic carving, certified natural stone, and pristine artisan finishing.`,
        },
      ],
      offers: offersObj,
      additionalProperty: [
        vedicVastu?.placementDirection ? {
          "@type": "PropertyValue",
          name: "Vastu Placement Direction",
          value: vedicVastu.placementDirection,
        } : null,
        vedicVastu?.chakraPlanet ? {
          "@type": "PropertyValue",
          name: "Chakra & Ruling Planet",
          value: vedicVastu.chakraPlanet,
        } : null,
        product.weight ? {
          "@type": "PropertyValue",
          name: "Weight",
          value: String(product.weight),
        } : null,
        product.size ? {
          "@type": "PropertyValue",
          name: "Dimensions",
          value: String(product.size),
        } : null,
        product.pricePerUnit ? {
          "@type": "PropertyValue",
          name: "Price per Unit",
          value: String(product.pricePerUnit),
        } : null,
      ].filter(Boolean),
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

  let parsedFaqs = [];
  if (product.faqs) {
    try {
      parsedFaqs = typeof product.faqs === "string" ? JSON.parse(product.faqs) : product.faqs;
    } catch {
      parsedFaqs = [];
    }
  }
  if (!Array.isArray(parsedFaqs) || parsedFaqs.length === 0) {
    parsedFaqs = getDefaultProductFaqs(product.name);
  }
  const validFaqs = (parsedFaqs || []).filter((f) => f && f.question && f.answer);
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
    "image": toAbsoluteUrl(blog.coverImage?.url || "https://www.crystaljaipuria.com/logo.png"),
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
