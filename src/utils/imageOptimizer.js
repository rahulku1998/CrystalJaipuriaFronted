/**
 * Cloudinary on-the-fly Image Optimization & SEO Asset Delivery Utility
 * Serves images through our branded domain proxy:
 * https://www.crystaljaipuria.com/product-images/.../<cleanSlug>.webp
 * Guarantees that Google and visitors see only your brand domain (crystaljaipuria.com)!
 */
export const optimizeCloudinaryUrl = (url, width = 800, seoSlug = "") => {
  if (!url || typeof url !== "string") return url || "/Gemstone.webp";
  if (!url.includes("res.cloudinary.com")) return url;

  const cleanSlug = (seoSlug || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // If SEO slug is provided, deliver through custom domain proxy with product name
  if (cleanSlug) {
    let cleanPath = url.replace(
      /^https:\/\/res\.cloudinary\.com\/[^\/]+\/(?:image\/upload|images)\/(?:[^\/]+\/)?/,
      `/product-images/f_auto,q_auto:good,w_${width},c_limit/`
    );
    cleanPath = cleanPath.replace(/\.[a-zA-Z0-9]+(?:\?.*)?$/, "");
    return `${cleanPath}/${cleanSlug}.webp`;
  }

  // Fallback to custom domain proxy path
  let cleanPath = url.replace(
    /^https:\/\/res\.cloudinary\.com\/[^\/]+\/(?:image\/upload|images)\/(?:[^\/]+\/)?/,
    `/product-images/f_auto,q_auto:good,w_${width},c_limit/`
  );
  return cleanPath;
};
