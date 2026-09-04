/**
 * Clean Static WebP Image Delivery Utility
 * Delivers clean static image paths: /images/<clean-slug>.webp
 * (Exactly like homeslider: /images/slider-shivling-desk.webp)
 */
export const optimizeCloudinaryUrl = (url, width = 800, seoSlug = "") => {
  if (!url || typeof url !== "string") return "/images/slider-shivling-desk.webp";

  const cleanSlug = (seoSlug || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // If clean product slug is available, deliver clean static WebP image directly from /images/
  if (cleanSlug) {
    return `/images/${cleanSlug}.webp`;
  }

  // If URL is already a clean static image path
  if (url.startsWith("/images/") || url.startsWith("/assets/")) {
    return url;
  }

  // Fallback if no slug: try to extract image filename or return default
  return url;
};
