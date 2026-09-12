import { getProductMetaTitle } from "./seo.js";
import {
  generateCompetitorMeta,
  detectGemstone,
  detectArchetype,
  GEMSTONE_PROFILES,
  toProperTitleCase,
} from "./aiGenerator.js";

/**
 * Packs FAQs, custom Meta Title, and custom Meta Description into product data
 * for guaranteed persistence even without backend schema changes.
 */
export const packProductMetadata = ({
  additionalInfo = "",
  faqs = [],
  metaTitle = "",
  metaDescription = "",
  galleryOrder = [],
}) => {
  // Strip any old embedded metadata first
  let cleanInfo = (additionalInfo || "")
    .replace(/<!-- FAQS_JSON:[\s\S]*?-->/g, "")
    .replace(/<!-- SEO_META:[\s\S]*?-->/g, "")
    .replace(/<!-- GALLERY_ORDER:[\s\S]*?-->/g, "")
    .trim();

  // Valid FAQs only
  const validFaqs = (faqs || []).filter(
    (f) => (f.question && f.question.trim()) || (f.answer && f.answer.trim())
  );

  let packed = cleanInfo;

  if (validFaqs.length > 0) {
    packed += `\n<!-- FAQS_JSON:${JSON.stringify(validFaqs)} -->`;
  }

  if (metaTitle.trim() || metaDescription.trim()) {
    const metaObj = {
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
    };
    packed += `\n<!-- SEO_META:${JSON.stringify(metaObj)} -->`;
  }

  if (Array.isArray(galleryOrder) && galleryOrder.length > 0) {
    packed += `\n<!-- GALLERY_ORDER:${JSON.stringify(galleryOrder)} -->`;
  }

  return packed;
};

/**
 * Unpacks FAQs, custom Meta Title, and custom Meta Description from product data
 */
export const unpackProductMetadata = (product) => {
  if (!product) {
    return {
      faqs: [],
      metaTitle: "",
      metaDescription: "",
      galleryOrder: [],
      cleanAdditionalInfo: "",
    };
  }

  let rawInfo = product.additionalInfo || "";
  let faqs = [];
  let metaTitle = product.metaTitle || "";
  let metaDescription = product.metaDescription || "";
  let galleryOrder = [];

  // 1. Direct field check
  if (product.faqs) {
    try {
      faqs = typeof product.faqs === "string" ? JSON.parse(product.faqs) : product.faqs;
    } catch {
      faqs = [];
    }
  }

  // 2. Parse from embedded comments in additionalInfo (or description fallback)
  const faqMatch = rawInfo.match(/<!-- FAQS_JSON:([\s\S]*?)-->/);
  if (faqMatch && faqMatch[1]) {
    try {
      faqs = JSON.parse(faqMatch[1]);
    } catch (e) {
      console.warn("Failed to parse embedded FAQs:", e);
    }
  }

  const metaMatch = rawInfo.match(/<!-- SEO_META:([\s\S]*?)-->/);
  if (metaMatch && metaMatch[1]) {
    try {
      const parsedMeta = JSON.parse(metaMatch[1]);
      if (!metaTitle && parsedMeta.metaTitle) metaTitle = parsedMeta.metaTitle;
      if (!metaDescription && parsedMeta.metaDescription) metaDescription = parsedMeta.metaDescription;
    } catch (e) {
      console.warn("Failed to parse embedded SEO meta:", e);
    }
  }

  const galleryMatch = rawInfo.match(/<!-- GALLERY_ORDER:([\s\S]*?)-->/);
  if (galleryMatch && galleryMatch[1]) {
    try {
      galleryOrder = JSON.parse(galleryMatch[1]);
    } catch (e) {
      console.warn("Failed to parse embedded gallery order:", e);
    }
  }

  const cleanAdditionalInfo = rawInfo
    .replace(/<!-- FAQS_JSON:[\s\S]*?-->/g, "")
    .replace(/<!-- SEO_META:[\s\S]*?-->/g, "")
    .replace(/<!-- GALLERY_ORDER:[\s\S]*?-->/g, "")
    .trim();

  return {
    faqs: Array.isArray(faqs) ? faqs : [],
    metaTitle: metaTitle || "",
    metaDescription: metaDescription || "",
    galleryOrder: Array.isArray(galleryOrder) ? galleryOrder : [],
    cleanAdditionalInfo,
  };
};

/**
 * Generate 1-Click Super SEO Meta Title and Description for Admin Panel
 */
export const generateSuperMetaTags = (
  productName = "",
  categoryName = "",
  weight = "",
  size = "",
  price = 0
) => {
  const cleanName = toProperTitleCase(productName.trim() || "Gemstone Sacred Idol");
  const stoneKey = detectGemstone(cleanName + " " + categoryName);
  const archetype = detectArchetype(cleanName + " " + categoryName);
  const stone = GEMSTONE_PROFILES[stoneKey] || GEMSTONE_PROFILES.sphatik;

  return generateCompetitorMeta(cleanName, stone, archetype, weight, size, price, productName);
};

