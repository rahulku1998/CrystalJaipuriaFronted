import { useEffect } from "react";
import { optimizeCloudinaryUrl } from "../utils/imageOptimizer";

const SEO = ({
  title,
  description,
  canonical,
  image = "https://www.crystaljaipuria.com/logo.png",
  type = "website",
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema,
  robots = "index, follow",
}) => {
  const finalOgTitle = ogTitle || title;
  const finalOgDesc = ogDescription || description;
  const finalTwTitle = twitterTitle || ogTitle || title;
  const finalTwDesc = twitterDescription || ogDescription || description;
  const finalTwImage = twitterImage || image;

  useEffect(() => {
    try {
      if (typeof document === "undefined") return;

      if (title) {
        document.title = title;
      }

      const setMeta = (attrName, attrValue, content) => {
        if (!content) return;
        try {
          let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
          if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute(attrName, attrValue);
            document.head?.appendChild(tag);
          }
          tag?.setAttribute("content", content);
        } catch {
          // ignore
        }
      };

      const setCanonical = (url) => {
        if (!url) return;
        try {
          let tag = document.querySelector('link[rel="canonical"]');
          if (!tag) {
            tag = document.createElement("link");
            tag.setAttribute("rel", "canonical");
            document.head?.appendChild(tag);
          }
          tag?.setAttribute("href", url);
        } catch {
          // ignore
        }
      };

      if (description) setMeta("name", "description", description);
      if (canonical) setCanonical(canonical);
      if (robots) setMeta("name", "robots", robots);

      setMeta("property", "og:title", finalOgTitle);
      setMeta("property", "og:site_name", "Crystal Jaipuria");
      if (canonical) setMeta("property", "og:url", canonical);
      if (finalOgDesc) setMeta("property", "og:description", finalOgDesc);
      setMeta("property", "og:type", type);
      if (image) setMeta("property", "og:image", image);

      setMeta("name", "twitter:card", "summary_large_image");
      setMeta("name", "twitter:title", finalTwTitle);
      if (finalTwDesc) setMeta("name", "twitter:description", finalTwDesc);
      if (finalTwImage) setMeta("name", "twitter:image", finalTwImage);

      // Dynamic High-Priority LCP Image Preload for Mobile & Desktop
      const existingPreload = document.getElementById("lcp-image-preload");
      if (type === "product" && image && image.startsWith("http") && !image.includes("logo.png")) {
        const optimizedImg = optimizeCloudinaryUrl(image, 800);
        let preloadTag = existingPreload;
        if (!preloadTag) {
          preloadTag = document.createElement("link");
          preloadTag.id = "lcp-image-preload";
          preloadTag.rel = "preload";
          preloadTag.as = "image";
          preloadTag.setAttribute("fetchpriority", "high");
          document.head?.appendChild(preloadTag);
        }
        preloadTag.href = optimizedImg;
      } else if (existingPreload) {
        existingPreload.remove();
      }

      // Dynamic Schema Injection
      if (schema) {
        let scriptTag = document.getElementById("page-dynamic-schema");
        if (!scriptTag) {
          scriptTag = document.createElement("script");
          scriptTag.id = "page-dynamic-schema";
          scriptTag.type = "application/ld+json";
          document.head?.appendChild(scriptTag);
        }
        scriptTag.text = JSON.stringify(schema);
      } else {
        const existingScript = document.getElementById("page-dynamic-schema");
        if (existingScript) {
          existingScript.remove();
        }
      }
    } catch (err) {
      console.warn("SEO tag injection error:", err);
    }
  }, [
    title,
    description,
    canonical,
    image,
    type,
    finalOgTitle,
    finalOgDesc,
    finalTwTitle,
    finalTwDesc,
    finalTwImage,
    schema,
    robots,
  ]);

  return null;
};

export default SEO;
