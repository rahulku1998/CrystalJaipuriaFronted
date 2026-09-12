export const PROTECTED_STUDIO_SLUGS = new Set([
  "natural-amethyst-gemstone-shiva-face-idol",
  "gemston-ruby-shree-yantra",
  "green-aventurine-parshvanath-ji-statue",
  "green-jade-goddess-maa-saraswati-carving",
  "green-jade-mahalakshmi-ji-idol",
  "green-jade-radha-krishna-statue-carving",
  "natural-howlite-gemstone-shivling",
  "natural-labradorite-gemstone-shivling",
  "natural-lapis-lazuli-lord-krishna-statue",
  "natural-lapis-lazuli-shiva-face-carving-idol",
  "natural-opal-stone-shivling",
  "rose-quartz-carved-shree-krishna-ji-idol",
  "rose-quartz-carved-shree-krishan-ji-idol",
  "natural-rose-quartz-pair-of-swan",
  "rose-quartz-shiva-statue-with-gold-painting",
  "smokey-quartz-crystal-shiva-face-idol",
  "natural-tiger-eye-gemstone-shivling",
  "mahalakshmi-idol-in-natural-columbian-green-jade"
]);

/**
 * Universal bulletproof Product Image resolver
 * Prioritizes live, fresh Cloudinary URLs so newly uploaded/reordered images
 * in admin panel display instantly without duplicate or stale local static files.
 */
export const getProductImageUrl = (product, index = 0, width = 800) => {
  if (!product) return "/Gemstone.webp";

  const images = Array.isArray(product.images)
    ? product.images
    : (product.image ? [product.image] : []);

  const imgItem = images[index] || (index === 0 ? images[0] : null);
  const rawUrl = typeof imgItem === "string" ? imgItem : (imgItem?.url || "");

  const cleanSlug = (product.slug || product.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Protected legacy studio photos (only for primary #1 view)
  if (index === 0 && cleanSlug && PROTECTED_STUDIO_SLUGS.has(cleanSlug)) {
    return `/images/${cleanSlug}.webp`;
  }

  // Live Cloudinary or remote HTTP image URL
  if (rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))) {
    return optimizeCloudinaryUrl(rawUrl, width);
  }

  // Already a local static path
  if (rawUrl && (rawUrl.startsWith("/images/") || rawUrl.startsWith("/assets/"))) {
    return rawUrl;
  }

  // Fallback to static clean slug or Gemstone placeholder
  if (cleanSlug) {
    return index === 0 ? `/images/${cleanSlug}.webp` : `/images/${cleanSlug}-${index + 1}.webp`;
  }

  return "/Gemstone.webp";
};

/**
 * Clean Static WebP Image Delivery Utility
 * Delivers clean static image paths: /images/<clean-slug>.webp
 * (Exactly like homeslider: /images/slider-shivling-desk.webp)
 */
export const optimizeCloudinaryUrl = (url, width = 800, seoSlug = "") => {
  if (!url || typeof url !== "string") return "/Gemstone.webp";

  // If already a local static path
  if (url.startsWith("/images/") || url.startsWith("/assets/")) {
    return url;
  }

  // If it's a Cloudinary URL, deliver fast auto-format, auto-quality, scaled responsive image
  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    return url.includes("/f_auto")
      ? url
      : url.replace("/image/upload/", `/image/upload/f_auto,q_auto:good,w_${width},c_limit/`);
  }

  // If clean product slug is explicitly requested
  if (seoSlug) {
    const cleanSlug = seoSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (cleanSlug) return `/images/${cleanSlug}.webp`;
  }

  return url;
};

/**
 * Browser-side Image Compression for Admin Uploads
 * Resizes large camera/phone photos (> 1600px, > 1MB) to lightweight optimized images
 * Prevents Railway server timeouts, 413 Payload Too Large, and connection resets.
 */
export const compressImageForUpload = async (file, maxDimension = 1600, quality = 0.88) => {
  if (!file || !file.type || !file.type.startsWith("image/")) return file;
  // If already under 700KB, no compression needed
  if (file.size && file.size < 700 * 1024) return file;

  return new Promise((resolve) => {
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;
        if (!width || !height) {
          resolve(file);
          return;
        }

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const targetType = file.type === "image/png" ? "image/png" : "image/jpeg";
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              resolve(file);
            } else {
              const compressedFile = new File([blob], file.name, {
                type: targetType,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            }
          },
          targetType,
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(file);
      };

      img.src = url;
    } catch {
      resolve(file);
    }
  });
};

