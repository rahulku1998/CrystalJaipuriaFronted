import { getProductMetaTitle } from "./seo.js";
import { detectGemstone } from "./aiGenerator.js";

/**
 * Packs FAQs, custom Meta Title, and custom Meta Description into product data
 * for guaranteed persistence even without backend schema changes.
 */
export const packProductMetadata = ({
  additionalInfo = "",
  faqs = [],
  metaTitle = "",
  metaDescription = "",
}) => {
  // Strip any old embedded metadata first
  let cleanInfo = (additionalInfo || "")
    .replace(/<!-- FAQS_JSON:[\s\S]*?-->/g, "")
    .replace(/<!-- SEO_META:[\s\S]*?-->/g, "")
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
      cleanAdditionalInfo: "",
    };
  }

  let rawInfo = product.additionalInfo || "";
  let faqs = [];
  let metaTitle = product.metaTitle || "";
  let metaDescription = product.metaDescription || "";

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

  const cleanAdditionalInfo = rawInfo
    .replace(/<!-- FAQS_JSON:[\s\S]*?-->/g, "")
    .replace(/<!-- SEO_META:[\s\S]*?-->/g, "")
    .trim();

  return {
    faqs: Array.isArray(faqs) ? faqs : [],
    metaTitle: metaTitle || "",
    metaDescription: metaDescription || "",
    cleanAdditionalInfo,
  };
};

/**
 * Generate 1-Click Super SEO Meta Title and Description for Admin Panel
 */
export const generateSuperMetaTags = (productName = "", categoryName = "") => {
  const cleanName = productName.trim() || "Gemstone God Statue";
  const stoneKey = detectGemstone(`${cleanName} ${categoryName}`);

  // Generate Super Title
  const superTitle = getProductMetaTitle(cleanName);

  // Generate High-Converting Super Meta Description (~150-158 characters)
  const superDescription = `Buy authentic handcrafted ${cleanName} from Crystal Jaipuria, Jaipur (est. 1989). 100% natural certified gemstone for temple, Vastu & gifting. Worldwide shipping.`;

  return {
    metaTitle: superTitle,
    metaDescription: superDescription,
  };
};
