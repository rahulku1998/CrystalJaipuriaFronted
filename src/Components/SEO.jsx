import { useEffect } from "react";

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
}) => {
  const finalOgTitle = ogTitle || title;
  const finalOgDesc = ogDescription || description;
  const finalTwTitle = twitterTitle || ogTitle || title;
  const finalTwDesc = twitterDescription || ogDescription || description;
  const finalTwImage = twitterImage || image;

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setCanonical = (url) => {
      if (!url) return;
      let tag = document.querySelector('link[rel="canonical"]');
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", "canonical");
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", url);
    };

    if (description) setMeta("name", "description", description);
    if (canonical) setCanonical(canonical);

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

    // Dynamic Schema Injection
    if (schema) {
      let scriptTag = document.getElementById("page-dynamic-schema");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "page-dynamic-schema";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else {
      const existingScript = document.getElementById("page-dynamic-schema");
      if (existingScript) {
        existingScript.remove();
      }
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
  ]);

  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {finalOgTitle && <meta property="og:title" content={finalOgTitle} />}
      {finalOgDesc && <meta property="og:description" content={finalOgDesc} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Crystal Jaipuria" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {finalTwTitle && <meta name="twitter:title" content={finalTwTitle} />}
      {finalTwDesc && <meta name="twitter:description" content={finalTwDesc} />}
      {finalTwImage && <meta name="twitter:image" content={finalTwImage} />}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
};

export default SEO;
