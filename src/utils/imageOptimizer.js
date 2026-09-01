/**
 * Cloudinary on-the-fly Image Optimization Utility for Fast Core Web Vitals (LCP & CLS)
 * Automatically adds f_auto (AVIF/WebP), q_auto:good (optimal compression), and responsive width scaling
 */
export const optimizeCloudinaryUrl = (url, width = 800) => {
  if (!url || typeof url !== "string") return url || "/Gemstone.webp";
  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    if (url.includes("/f_auto") || url.includes("/q_auto")) return url;
    return url.replace(
      "/image/upload/",
      `/image/upload/f_auto,q_auto:good,w_${width},c_limit/`
    );
  }
  return url;
};
