/**
 * Cloudinary on-the-fly Image Optimization & SEO Asset Delivery Utility
 * 1. Automatically serves SEO-friendly URL ending with /<product-name-slug>.jpg for top Image SEO
 * 2. Adds f_auto (AVIF/WebP), q_auto:good (optimal compression), and responsive width scaling
 */
export const optimizeCloudinaryUrl = (url, width = 800, seoSlug = "") => {
  if (!url || typeof url !== "string") return url || "/Gemstone.webp";
  if (!url.includes("res.cloudinary.com")) return url;

  const cleanSlug = (seoSlug || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // If SEO slug is provided, deliver via Cloudinary's dynamic SEO root URL
  if (cleanSlug) {
    let cleanUrl = url;
    cleanUrl = cleanUrl.replace(
      /\/image\/upload\/(?:[^\/]+\/)?/,
      `/images/f_auto,q_auto:good,w_${width},c_limit/`
    );
    cleanUrl = cleanUrl.replace(/\.[a-zA-Z0-9]+(?:\?.*)?$/, "");
    return `${cleanUrl}/${cleanSlug}.jpg`;
  }

  // Fallback to standard Cloudinary image transformations
  if (url.includes("/image/upload/")) {
    if (url.includes("/f_auto") || url.includes("/q_auto")) return url;
    return url.replace(
      "/image/upload/",
      `/image/upload/f_auto,q_auto:good,w_${width},c_limit/`
    );
  }

  return url;
};
