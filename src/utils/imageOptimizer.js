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
 * Universal bulletproof Product Image resolver - Pure Local Static WebP
 * 100% eliminated Cloudinary from the client-side system.
 * All product photos are served from clean local static paths:
 * Primary: /images/<clean-slug>.webp
 * Alternate Angle: /images/<clean-slug>-2.webp, etc.
 */
export const getProductImageUrl = (product, index = 0) => {
  if (!product) return "/Gemstone.webp";

  const cleanSlug = (product.slug || product.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!cleanSlug) return "/Gemstone.webp";

  if (index === 0) {
    return `/images/${cleanSlug}.webp`;
  }

  return `/images/${cleanSlug}-${index + 1}.webp`;
};

/**
 * Clean Static WebP Image Delivery Utility (0% Cloudinary)
 */
export const optimizeCloudinaryUrl = (url, _width = 800, seoSlug = "") => {
  if (!url || typeof url !== "string") return "/Gemstone.webp";

  if (url.startsWith("/images/") || url.startsWith("/assets/")) {
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

