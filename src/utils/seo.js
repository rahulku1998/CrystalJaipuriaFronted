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
 * Generate Google Schema.org Product Structured Data (JSON-LD)
 */
export const getProductSchema = (product, canonicalUrl) => {
  if (!product) return null;

  const price = product.discountPrice || product.price || 0;
  const imageUrl = product.images?.[0]?.url || "https://www.crystaljaipuria.com/logo.png";
  const desc = getProductMetaDescription(product);

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.map((img) => img.url) || [imageUrl],
    "description": desc,
    "sku": product._id,
    "brand": {
      "@type": "Brand",
      "name": "Crystal Jaipuria"
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "INR",
      "price": String(price),
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Crystal Jaipuria"
      }
    }
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
