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

export const STATIC_CATALOG_SLUGS = new Set([
  "amethyst-gemston-angel",
  "black-agate-gemstone-carving-of-ganesh",
  "blue-sapphire-carving-shiva-statue",
  "blue-sodalite-carved-ganesha-statue",
  "blue-sodalite-carved-lord-shiva-statue",
  "blue-sodalite-carving-shiva-face-idol",
  "clear-crystal-quartz-shivling-with-shiva-face",
  "crystal-clear-mahvaveer-ji-statue",
  "crystal-ganesha",
  "crystal-shivling",
  "crystal-shree-yantra",
  "crystal-sphtik-shree-yantra-on-kamal-flower",
  "gemston-amethyst-diya",
  "gemston-ruby-shree-yantra",
  "green-aventurine-parshvanath-ji-statue",
  "green-jade-carved-shree-krishana-statue",
  "green-jade-carving-shiva-face-statue",
  "green-jade-elephant-staute",
  "green-jade-ganesha",
  "green-jade-goddess-maa-saraswati-carving",
  "green-jade-mahalakshmi-ji-idol",
  "green-jade-panchmukhi-shivling",
  "green-jade-radha-krishna-statue-carving",
  "green-jade-shiva-statue-with-gold-panting",
  "green-jade-shivling",
  "green-jade-shree-yantra",
  "labradorite-power-mini-shiva-face",
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva",
  "natural-amethyst-gemstone-shiva-face-idol",
  "natural-blue-sodalite-hanuman-ji-statue",
  "natural-howlite-gemstone-shivling",
  "natural-labradorite-gemstone-shivling",
  "natural-lapis-lazuli-lord-krishna-statue",
  "natural-lapis-lazuli-shiva-face-carving-idol",
  "natural-opal-stone-shivling",
  "natural-red-jasper-gemstone-shivling",
  "natural-rose-quartz-pair-of-swan",
  "natural-ruby-shivling",
  "natural-sphatik-shivling",
  "natural-tiger-eye-gemstone-shivling",
  "natural-yellow-jade-ganesha-statue",
  "pyrite-gemston-shivling",
  "rose-quartz-bhagwan-mahaveer-statue",
  "rose-quartz-carved-shree-krishna-ji-idol",
  "rose-quartz-carved-shree-krishan-ji-idol",
  "rose-quartz-ganesha",
  "rose-quartz-ganesha-with-gold-painted",
  "rose-quartz-shiva-statue-with-gold-painting",
  "smokey-quartz-crystal-shiva-face-idol",
  "tiger-eye-carving-shiva-statue"
]);

/**
 * Universal bulletproof Product Image resolver
 * - Serves clean local static WebP assets for all 49 core catalog products.
 * - Dynamically supports newly added products from Admin Panel with zero delay.
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

  // 1. Core catalog studio products: serve pristine local static WebP
  if (cleanSlug && STATIC_CATALOG_SLUGS.has(cleanSlug)) {
    if (index === 0) {
      return `/images/${cleanSlug}.webp`;
    }
    return `/images/${cleanSlug}-${index + 1}.webp`;
  }

  // 2. If it is already a local static path
  if (rawUrl && (rawUrl.startsWith("/images/") || rawUrl.startsWith("/assets/"))) {
    return rawUrl;
  }

  // 3. Newly added products from Admin: immediately deliver live uploaded photo
  if (rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))) {
    return optimizeCloudinaryUrl(rawUrl, width);
  }

  // 4. Fallback to clean slug static path if exists
  if (cleanSlug) {
    return index === 0 ? `/images/${cleanSlug}.webp` : `/images/${cleanSlug}-${index + 1}.webp`;
  }

  return "/Gemstone.webp";
};

/**
 * Responsive Image Delivery Utility
 * Formats remote Cloudinary URLs for fast loading or returns static paths.
 */
export const optimizeCloudinaryUrl = (url, width = 800, seoSlug = "") => {
  if (!url || typeof url !== "string") return "/Gemstone.webp";

  if (url.startsWith("/images/") || url.startsWith("/assets/")) {
    return url;
  }

  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    return url.includes("/f_auto")
      ? url
      : url.replace("/image/upload/", `/image/upload/f_auto,q_auto:good,w_${width},c_limit/`);
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (seoSlug) {
    const cleanSlug = seoSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (cleanSlug) return `/images/${cleanSlug}.webp`;
  }

  return "/Gemstone.webp";
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

