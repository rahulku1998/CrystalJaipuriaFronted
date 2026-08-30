/**
 * SEO helper functions for optimizing title and description lengths
 * Target limits:
 * - Meta Title: ~50-60 characters (max 60 chars)
 * - Meta Description: ~150-160 characters (max 160 chars)
 */

export const getProductMetaTitle = (productName) => {
  if (!productName) return "Crystal Jaipuria | Gemstone Statues";
  const brand = " | Crystal Jaipuria";
  const cleanName = productName.trim();

  if (cleanName.length + brand.length <= 60) {
    return `${cleanName}${brand}`;
  }

  const maxNameLen = 60 - brand.length; // 41 chars
  let trimmed = cleanName.slice(0, maxNameLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace > 15) {
    trimmed = trimmed.slice(0, lastSpace);
  }
  // Strip trailing punctuation and dangling prepositions
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
 * Generate Google Schema.org Product Structured Data (JSON-LD) with BreadcrumbList
 */
export const getProductSchema = (product, canonicalUrl) => {
  if (!product) return null;

  const price = product.discountPrice || product.price || 0;
  const imageUrl = product.images?.[0]?.url || "https://www.crystaljaipuria.com/logo.png";
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

  return {
    "@context": "https://schema.org/",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        "name": product.name,
        "image": product.images?.map((img) => img.url) || [imageUrl],
        "description": desc,
        "sku": product._id,
        "mpn": product.slug || product._id,
        "category": categoryName,
        "brand": {
          "@type": "Brand",
          "name": "Crystal Jaipuria"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "36",
          "bestRating": "5",
          "worstRating": "1"
        },
        "offers": {
          "@type": "Offer",
          "url": canonicalUrl,
          "priceCurrency": "INR",
          "price": String(price),
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "Crystal Jaipuria"
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "IN",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 7,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          },
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "INR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "IN"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 2,
                "unitCode": "d"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 3,
                "maxValue": 5,
                "unitCode": "d"
              }
            }
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      }
    ]
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
