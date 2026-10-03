import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { STANDARDIZED_SPECS, getStandardizedProduct } from "../src/utils/productStandardizer.js";
import { CATEGORY_CONTENT } from "../src/utils/categoryContent.js";
import { sanitizeNaturalStutter } from "../src/utils/aiGenerator.js";
import { getVedicVastuForProduct } from "../src/utils/productMetadata.js";
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES, FALLBACK_SUBCATEGORIES } from "../src/data/fallbackData.js";
import {
  getProductMetaTitle,
  getProductMetaDescription,
  SUPER_TITLE_MAPPINGS,
  SUPER_DESCRIPTION_MAPPINGS,
} from "../src/utils/seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.crystaljaipuria.com";
const API_URL = "https://shop.codewithrahulkumawat.com/api";

const fetchData = async (endpoint) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    return await res.json();
  } catch (err) {
    console.warn(`Prerender fetch error (${endpoint}):`, err.message);
    return {};
  }
};

const escapeHtml = (str = "") =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const runPrerender = async () => {
  console.log("⚡ Starting Static Pre-rendering for High-Performance SEO & Instant Social Sharing...");

  const distDir = path.resolve(__dirname, "../dist");
  const templatePath = path.join(distDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error("❌ dist/index.html not found! Run vite build first.");
    return;
  }

  const baseHtml = fs.readFileSync(templatePath, "utf-8");

  // Helper to customize HTML head and root
  const buildPageHtml = ({
    title,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    schema,
    bodyContent = "",
    noscriptContent = "",
    productMeta = null,
  }) => {
    let html = baseHtml;

    const safeTitle = escapeHtml(title || "Gemstone God Statues Manufacturer in India | Crystal Jaipuria");
    const safeDesc = escapeHtml(
      (description || "Leading gemstone god statues manufacturer & wholesaler in Jaipur, India. Hand-carved crystal idols, Vastu decor & healing stones. Global shipping since 1989.").slice(0, 200)
    );
    const safeOgTitle = escapeHtml(ogTitle || safeTitle);
    const safeOgDesc = escapeHtml(ogDescription || safeDesc);
    const safeOgImage = ogImage || `${BASE_URL}/logo.png`;
    const safeCanonical = canonical || `${BASE_URL}/`;

    // 1. Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${safeTitle}</title>`);

    // 2. Replace Description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${safeDesc}" />`
    );

    // 3. Replace or Insert Canonical
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
        `<link rel="canonical" href="${safeCanonical}" />`
      );
    } else {
      html = html.replace("</head>", `  <link rel="canonical" href="${safeCanonical}" />\n</head>`);
    }

    // 4. Replace OpenGraph & Twitter
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${safeOgTitle}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${safeOgDesc}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:image" content="${safeOgImage}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${safeCanonical}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${safeOgTitle}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${safeOgDesc}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i,
      `<meta name="twitter:image" content="${safeOgImage}" />`
    );

    // 5. Injected Schema
    if (schema) {
      const schemaScript = `\n  <script type="application/ld+json" id="page-dynamic-schema">${JSON.stringify(
        schema
      )}</script>\n</head>`;
      html = html.replace("</head>", schemaScript);
    }

    // 6. Pre-rendered Body Content (instant visual paint before React hydrates)
    if (bodyContent) {
      html = html.replace('<div id="root"></div>', `<div id="root">${bodyContent}</div>`);
    }

    // 6b. Noscript Content (for SEO crawlers and non-JS clients without flashing to JS users)
    if (noscriptContent) {
      html = html.replace('</body>', `<noscript>\n${noscriptContent}\n</noscript>\n</body>`);
    }

    // 7. Inject OpenGraph & Google Merchant Microdata for Instant Price Verification
    if (productMeta) {
      const productMetaTags = `  <meta property="og:type" content="product" />\n  <meta property="product:price:amount" content="${productMeta.price.toFixed(2)}" />\n  <meta property="product:price:currency" content="INR" />\n  <meta property="product:availability" content="${productMeta.inStock ? "in stock" : "out of stock"}" />\n  <meta property="product:condition" content="new" />\n  <meta property="product:brand" content="Crystal Jaipuria" />\n  <meta property="product:retailer_item_id" content="${escapeHtml(String(productMeta.id || productMeta.slug))}" />\n`;
      html = html.replace("</head>", `${productMetaTags}</head>`);
    }

    return html;
  };

  const saveFile = (relPath, content) => {
    const fullPath = path.join(distDir, relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, "utf-8");
  };

  const parsePrice = (p) => {
    const pSlug = (p.slug || p._id || "").toLowerCase().trim();
    if (typeof p?.price === "number" && p.price > 0) {
      return `₹${p.price.toLocaleString("en-IN")}`;
    }
    if (typeof p?.discountPrice === "number" && p.discountPrice > 0) {
      return `₹${p.discountPrice.toLocaleString("en-IN")}`;
    }
    if (STANDARDIZED_SPECS[pSlug]?.price) {
      return `₹${STANDARDIZED_SPECS[pSlug].price.toLocaleString("en-IN")}`;
    }
    const raw = String(p?.price || p?.discountPrice || "").replace(/,/g, "");
    const match = raw.match(/\d+(\.\d+)?/);
    if (match && Number(match[0]) > 0) {
      return `₹${Number(match[0]).toLocaleString("en-IN")}`;
    }
    return "Inquire Price";
  };

  // Fetch live products, categories, blogs
  const [productsData, categoriesData] = await Promise.all([
    fetchData("/products"),
    fetchData("/categories"),
  ]);

  let products = Array.isArray(productsData?.products)
    ? productsData.products
    : (Array.isArray(productsData) ? productsData : []);
  let categories = Array.isArray(categoriesData?.categories)
    ? categoriesData.categories
    : (Array.isArray(categoriesData) ? categoriesData : []);

  const existingSlugs = new Set(products.map((p) => p.slug || p._id));
  const missingFallbacks = FALLBACK_PRODUCTS.filter(
    (fbProd) => !existingSlugs.has(fbProd.slug) && !existingSlugs.has(fbProd._id)
  );
  products = [...missingFallbacks, ...products];
  if (categories.length === 0) {
    console.log("⚡ [Prerender] Using fallback categories catalog (5 categories)...");
    categories = FALLBACK_CATEGORIES;
  }

  // Filter out Angel and Diya (merged into Crystal Statues)
  categories = categories.filter((c) => {
    const s = (c.slug || "").toLowerCase().trim();
    const n = (c.name || "").toLowerCase().trim();
    return s !== "angel" && s !== "diya" && n !== "angel" && n !== "diya";
  });

  // Re-order categories so Luxurious Idols & Decor is directly below God Statues
  const luxIdx = categories.findIndex(
    (c) =>
      (c.slug || "").includes("luxurious") ||
      (c.name || "").toLowerCase().includes("luxurious")
  );
  if (luxIdx > -1) {
    const [luxItem] = categories.splice(luxIdx, 1);
    luxItem.slug = "luxurious-idols-decor";
    const godIdx = categories.findIndex(
      (c) =>
        (c.slug || "").toLowerCase() === "god-statues" ||
        (c.name || "").toLowerCase().includes("god")
    );
    if (godIdx > -1) {
      categories.splice(godIdx + 1, 0, luxItem);
    } else {
      categories.unshift(luxItem);
    }
  }

  console.log(`📦 Pre-rendering ${products.length} Products & ${categories.length} Categories...`);

  // ==========================================
  // 1. Pre-render All Products
  // ==========================================
  let prodCount = 0;
  products.forEach((rawProd) => {
    const rawSlug = rawProd.slug || rawProd._id;
    const fbMatch = FALLBACK_PRODUCTS.find(
      (p) => p.slug === rawSlug || p._id === rawProd._id || p.slug === rawProd.slug
    );
    const isJaipurTarget = rawSlug === "crystal-shivling" || rawSlug === "natural-sphatik-shivling" || rawProd.slug === "crystal-shivling" || rawProd.slug === "natural-sphatik-shivling";
    const enrichedProd = fbMatch ? {
      ...rawProd,
      detail: (isJaipurTarget && fbMatch.detail) ? fbMatch.detail : ((fbMatch.detail && fbMatch.detail.length > (rawProd.detail || "").length) ? fbMatch.detail : rawProd.detail),
      description: (isJaipurTarget && fbMatch.description) ? fbMatch.description : ((fbMatch.description && fbMatch.description.length > (rawProd.description || "").length) ? fbMatch.description : rawProd.description),
      additionalInfo: (isJaipurTarget && fbMatch.additionalInfo) ? fbMatch.additionalInfo : (fbMatch.additionalInfo || rawProd.additionalInfo),
      faqs: (isJaipurTarget && fbMatch.faqs) ? fbMatch.faqs : ((fbMatch.faqs && fbMatch.faqs.length > 0) ? fbMatch.faqs : rawProd.faqs),
    } : rawProd;
    const prod = getStandardizedProduct(enrichedProd);
    const vedicVastu = getVedicVastuForProduct(prod);
    const slug = prod.slug || prod._id;
    if (!slug) return;

    const cleanName = sanitizeNaturalStutter(
      (prod.name || "Gemstone Idol")
        .replace(/\s*-\s*100%\s*certified/gi, "")
        .replace(/\s*100%\s*certified/gi, "")
        .trim()
    );

    const cleanProductSlug = (prod.slug || slug || "product")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    let imageUrl = "";
    const localMainPath = path.join(__dirname, `../public/images/${cleanProductSlug}.webp`);
    if (fs.existsSync(localMainPath)) {
      imageUrl = `${BASE_URL}/images/${cleanProductSlug}.webp`;
    } else if (Array.isArray(prod.images) && prod.images.length > 0) {
      const first = typeof prod.images[0] === "string" ? prod.images[0] : prod.images[0]?.url;
      if (first) {
        imageUrl = first.startsWith("http") ? first : `${BASE_URL}${first.startsWith("/") ? "" : "/"}${first}`;
      }
    }
    if (!imageUrl) {
      imageUrl = `${BASE_URL}/images/${cleanProductSlug}.webp`;
    }

    const allProductImages = [imageUrl];
    for (let i = 2; i <= 10; i++) {
      const secImg = path.join(__dirname, `../public/images/${cleanProductSlug}-${i}.webp`);
      if (fs.existsSync(secImg)) {
        allProductImages.push(`${BASE_URL}/images/${cleanProductSlug}-${i}.webp`);
      }
    }
    if (Array.isArray(prod.images)) {
      for (let i = 1; i < prod.images.length; i++) {
        const raw = typeof prod.images[i] === "string" ? prod.images[i] : (prod.images[i]?.url || "");
        if (raw) {
          const fullUrl = raw.startsWith("http") ? raw : `${BASE_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
          if (!allProductImages.includes(fullUrl)) allProductImages.push(fullUrl);
        }
      }
    }

    let priceNum = 999;
    if (typeof prod.price === "number" && prod.price > 0) {
      priceNum = prod.price;
    } else if (typeof prod.discountPrice === "number" && prod.discountPrice > 0) {
      priceNum = prod.discountPrice;
    } else if (STANDARDIZED_SPECS[slug]?.price) {
      priceNum = STANDARDIZED_SPECS[slug].price;
    } else {
      const raw = String(prod.price || prod.discountPrice || "999").replace(/,/g, "");
      const match = raw.match(/\d+(\.\d+)?/);
      if (match) priceNum = Number(match[0]);
    }

    // Extract specs for title
    let shippingWeight = "";
    const weightStr = String(prod.weight || "");
    if (weightStr && weightStr !== "N/A") {
      const wMatch = weightStr.match(/(\d+(\.\d+)?)\s*(kg|gram|g|gm)/i);
      if (wMatch) {
        const num = wMatch[1];
        const unit = wMatch[3].toLowerCase().startsWith("k") ? "kg" : "g";
        shippingWeight = `${num} ${unit}`;
      }
    }

    let size = "";
    const sizeStr = String(prod.size || "");
    if (sizeStr && sizeStr !== "N/A") {
      const sMatch = sizeStr.match(/(\d+(\.\d+)?)\s*(inch|inches|cm|mm|")/i);
      if (sMatch) size = `${sMatch[1]} Inch`;
      else size = sizeStr.split("-")[0].trim();
    }

    let displayTitle = cleanName;

    let metaTitle = prod.metaTitle || "";
    let metaDesc = prod.metaDescription || "";
    let customHeading = prod.heading || prod.h1 || "";
    const metaMatch = String(prod.additionalInfo || "").match(/<!-- SEO_META:([\s\S]*?)-->/);
    if (metaMatch && metaMatch[1]) {
      try {
        const parsed = JSON.parse(metaMatch[1]);
        if (!metaTitle && parsed.metaTitle) metaTitle = parsed.metaTitle;
        if (!metaDesc && parsed.metaDescription) metaDesc = parsed.metaDescription;
        if (!customHeading && (parsed.heading || parsed.h1)) customHeading = parsed.heading || parsed.h1;
      } catch (e) {}
    }

    const cleanDesc = sanitizeNaturalStutter(
      (prod.detail || prod.description || cleanName)
        .replace(/<[^>]*>?/gm, "")
        .replace(/100%\s*certified\s*/gi, "")
        .replace(/\r?\n|\r/g, " ")
        .trim()
    );

    const pSlugKey = (cleanProductSlug || slug || "").toLowerCase().trim();
    if (SUPER_TITLE_MAPPINGS[pSlugKey]) {
      metaTitle = SUPER_TITLE_MAPPINGS[pSlugKey];
    } else if (!metaTitle) {
      metaTitle = getProductMetaTitle(displayTitle, slug);
    }

    if (SUPER_DESCRIPTION_MAPPINGS[pSlugKey]) {
      metaDesc = SUPER_DESCRIPTION_MAPPINGS[pSlugKey];
    } else if (!metaDesc) {
      metaDesc = getProductMetaDescription(prod);
    }

    let productFaqs = [];
    const faqMatch = String(prod.additionalInfo || "").match(/<!-- FAQS_JSON:([\s\S]*?)-->/);
    if (faqMatch && faqMatch[1]) {
      try {
        productFaqs = JSON.parse(faqMatch[1]);
      } catch (e) {}
    }
    if (Array.isArray(productFaqs)) {
      productFaqs = productFaqs.map((f) => ({
        question: sanitizeNaturalStutter(f.question || ""),
        answer: sanitizeNaturalStutter(f.answer || "")
      }));
    }

    const graphItems = [
      {
        "@type": "Product",
        "@id": `${BASE_URL}/product/${slug}#product`,
        name: displayTitle,
        image: allProductImages,
        description: cleanDesc.slice(0, 500),
        sku: prod._id,
        mpn: slug,
        brand: {
          "@type": "Brand",
          name: "Crystal Jaipuria",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "40",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Verified Collector",
            },
            datePublished: "2024-04-10",
            reviewBody: `Authentic handcrafted natural gemstone sculpture from Crystal Jaipuria. Exquisite Vedic carving, certified natural stone, and pristine artisan finishing.`,
          },
        ],
        offers: {
          "@type": "Offer",
          url: `${BASE_URL}/product/${slug}`,
          priceCurrency: "INR",
          price: priceNum,
          priceValidUntil: "2027-12-31",
          validFrom: "2024-01-01",
          itemCondition: "https://schema.org/NewCondition",
          availability:
            prod.stock === 0 || prod.stock === "0"
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Crystal Jaipuria",
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "IN",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 7,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: "INR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "IN",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 2,
                unitCode: "d",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 3,
                maxValue: 7,
                unitCode: "d",
              },
            },
          },
        },
        additionalProperty: [
          vedicVastu?.placementDirection ? {
            "@type": "PropertyValue",
            name: "Vastu Placement Direction",
            value: vedicVastu.placementDirection,
          } : null,
          vedicVastu?.chakraPlanet ? {
            "@type": "PropertyValue",
            name: "Chakra & Ruling Planet",
            value: vedicVastu.chakraPlanet,
          } : null,
          prod.weight ? {
            "@type": "PropertyValue",
            name: "Weight",
            value: String(prod.weight),
          } : null,
          prod.size ? {
            "@type": "PropertyValue",
            name: "Dimensions",
            value: String(prod.size),
          } : null,
        ].filter(Boolean),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/product/${slug}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Shop", item: `${BASE_URL}/shop` },
          ...(prod.categoryId?.name && prod.categoryId?.slug ? [{
            "@type": "ListItem",
            position: 3,
            name: prod.categoryId.name,
            item: `${BASE_URL}/${prod.categoryId.slug}`
          }] : []),
          { "@type": "ListItem", position: (prod.categoryId?.slug ? 4 : 3), name: cleanName, item: `${BASE_URL}/product/${slug}` }
        ]
      }
    ];

    if (Array.isArray(productFaqs) && productFaqs.length > 0) {
      graphItems.push({
        "@type": "FAQPage",
        "@id": `${BASE_URL}/product/${slug}#faq`,
        mainEntity: productFaqs.map(f => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer
          }
        }))
      });
    }

    const schema = {
      "@context": "https://schema.org",
      "@graph": graphItems,
    };

    const bodyPreview = `
      <div style="min-height:70vh;background-color:#FAF8F5;padding:24px 16px;font-family:system-ui,-apple-system,sans-serif;">
        <div style="max-width:1100px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05);border:1px solid #f1f5f9;">
          <div style="display:flex;flex-wrap:wrap;gap:36px;align-items:center;">
            <div style="flex:1;min-width:280px;max-width:480px;background:#FAF8F5;border-radius:20px;padding:20px;text-align:center;">
              <img src="${imageUrl}" alt="${escapeHtml(displayTitle)}" style="width:100%;max-height:480px;object-fit:contain;border-radius:16px;" width="480" height="480" />
            </div>
            <div style="flex:1.2;min-width:280px;">
              <span style="display:inline-block;background:#fef3c7;color:#92400e;font-size:12px;font-weight:700;padding:4px 12px;border-radius:9999px;margin-bottom:12px;letter-spacing:0.5px;">100% NATURAL CERTIFIED GEMSTONE</span>
              <h1 style="font-size:26px;font-weight:800;color:#0f172a;line-height:1.3;margin-bottom:12px;">${escapeHtml(customHeading || displayTitle)}</h1>
              <div style="font-size:24px;font-weight:800;color:#154734;margin-bottom:10px;">₹${priceNum.toLocaleString("en-IN")}${prod.pricePerUnit ? ` <span style="font-size:15px;color:#6B5E55;font-weight:500;">(${escapeHtml(prod.pricePerUnit)})</span>` : ""}</div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
                ${prod.weight ? `<span style="display:inline-block;background:#FDF8F3;color:#221C18;font-size:13px;font-weight:600;padding:4px 10px;border-radius:6px;border:1px solid #D4AF37;"><strong>Weight Range:</strong> ${escapeHtml(String(prod.weight))}</span>` : ""}
                ${prod.size ? `<span style="display:inline-block;background:#FDF8F3;color:#221C18;font-size:13px;font-weight:600;padding:4px 10px;border-radius:6px;border:1px solid #D4AF37;"><strong>Size Range:</strong> ${escapeHtml(String(prod.size))}</span>` : ""}
              </div>
              <p style="font-size:15px;color:#475569;line-height:1.6;margin-bottom:20px;">${escapeHtml(cleanDesc.slice(0, 350))}...</p>
              <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">
                <a href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20am%20interested%20in%20${encodeURIComponent(displayTitle)}" style="background:#25D366;color:#ffffff;font-weight:700;padding:12px 24px;border-radius:12px;text-decoration:none;font-size:15px;display:inline-flex;align-items:center;gap:8px;">WhatsApp Inquiry</a>
                <a href="${BASE_URL}/shop" style="background:#4f46e5;color:#ffffff;font-weight:600;padding:12px 24px;border-radius:12px;text-decoration:none;font-size:15px;">Explore Store</a>
              </div>
              ${vedicVastu?.placementDirection ? `
              <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:8px 12px;font-size:13px;color:#065f46;margin-bottom:16px;display:flex;align-items:center;gap:8px;">
                <span>🧭</span>
                <span><strong>Vastu Placement:</strong> ${escapeHtml(vedicVastu.placementDirection)}</span>
              </div>` : ""}
            </div>
          </div>
        </div>
      </div>
    `.trim();

    const pageHtml = buildPageHtml({
      title: metaTitle,
      description: metaDesc,
      canonical: `${BASE_URL}/product/${slug}`,
      ogTitle: metaTitle,
      ogDescription: metaDesc,
      ogImage: imageUrl,
      schema,
      bodyContent: bodyPreview,
      productMeta: {
        price: priceNum,
        inStock: prod.stock !== 0 && prod.stock !== "0",
        id: prod._id,
        slug,
      },
    });

    saveFile(`product/${slug}/index.html`, pageHtml);
    if (slug === "rose-quartz-ganesh-with-silver-work-idol-for-luxury-decor") {
      saveFile("product/rose-quartz-ganesh-with-silver-work/index.html", pageHtml);
    }
    if (slug === "green-jade-carved-ganesha-statue-with-silver-gold-work") {
      saveFile("product/green-jade-carved-ganesha/index.html", pageHtml);
    }
    prodCount++;
  });

  console.log(`✓ Pre-rendered ${prodCount} dynamic product pages to /dist/product/*/index.html`);

  // ==========================================
  // 2. Pre-render Category Pages
  // ==========================================
  let catCount = 0;
  categories.forEach((cat) => {
    if (!cat.slug) return;
    const catName = cat.name || cat.slug;
    const catContent = CATEGORY_CONTENT[cat.slug] || null;
    const catTitle = catContent?.title || `${catName} - Handcrafted Gemstone Idols | Crystal Jaipuria`;
    const catDesc =
      catContent?.description ||
      `Explore authentic hand-carved ${catName} in natural gemstones and pure crystals. Factory direct wholesale prices from master artisans in Jaipur since 1989.`;
    const catCanonical = catContent?.canonical || `${BASE_URL}/${cat.slug}`;

    const catProducts = products.filter(
      (p) =>
        p.categoryId?.slug === cat.slug ||
        p.categoryId?._id === cat._id ||
        (typeof p.categoryId === "string" && p.categoryId === cat._id) ||
        (cat.slug === "crystal-statues" && (
          p.categoryId?.slug === "angel" ||
          p.categoryId?.slug === "diya" ||
          p.slug === "amethyst-gemston-angel" ||
          p.slug === "gemston-amethyst-diya" ||
          p.slug === "green-aventurine-shankh" ||
          p.slug?.includes("horse") ||
          p.slug?.includes("tea-set") ||
          p.name?.toLowerCase().includes("angel") ||
          p.name?.toLowerCase().includes("diya") ||
          p.name?.toLowerCase().includes("shankh") ||
          p.name?.toLowerCase().includes("horse") ||
          p.name?.toLowerCase().includes("tea set")
        ))
    );

    const cardsHtml = catProducts
      .map((p) => {
        const pSlug = p.slug || p._id;
        const pImg = `${BASE_URL}/images/${pSlug}.webp`;
        const pPrice = parsePrice(p);
        return `
          <a href="${BASE_URL}/product/${pSlug}" style="text-decoration:none;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:12px;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="aspect-ratio:1/1;background:#faf8f5;border-radius:12px;display:flex;align-items:center;justify-content:center;padding:8px;">
                <img src="${pImg}" alt="${escapeHtml(p.name)}" style="max-height:100%;max-width:100%;object-fit:contain;" width="300" height="300" loading="lazy" />
              </div>
              <h3 style="font-size:14px;font-weight:700;color:#1e293b;margin:12px 0 6px 0;line-height:1.4;">${escapeHtml(p.name)}</h3>
            </div>
            <div style="font-size:16px;font-weight:800;color:#92400e;margin-top:8px;">${pPrice}</div>
          </a>
        `;
      })
      .join("\n");

    const guideHtml = catContent?.intro
      ? `
        <div style="margin-top:40px;background:#FAF8F5;border-radius:16px;padding:24px;border:1px solid #f1f5f9;">
          <h2 style="font-size:20px;font-weight:800;color:#0f172a;margin-bottom:12px;">✨ ${escapeHtml(catContent.headline || `About ${catName}`)}</h2>
          <p style="font-size:14px;color:#475569;line-height:1.7;margin-bottom:16px;">${escapeHtml(catContent.intro)}</p>
          <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:13px;font-weight:700;color:#334155;">
            <span>✓ 100% Certified Natural Crystals</span>
            <span>✓ Jaipur Heritage Hand-Carving</span>
            <span>✓ Safe Insured Worldwide Shipping</span>
          </div>
        </div>
      `
      : "";

    const faqsHtml = catContent?.faqs?.length
      ? `
        <div style="margin-top:24px;background:#ffffff;border-radius:16px;padding:24px;border:1px solid #e2e8f0;">
          <h3 style="font-size:18px;font-weight:800;color:#0f172a;margin-bottom:16px;">❓ Frequently Asked Questions about ${escapeHtml(catName)}</h3>
          ${catContent.faqs
            .map(
              (f) => `
            <div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #f1f5f9;">
              <h4 style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:6px;">${escapeHtml(f.question)}</h4>
              <p style="font-size:13px;color:#475569;line-height:1.6;margin:0;">${escapeHtml(f.answer)}</p>
            </div>
          `
            )
            .join("")}
        </div>
      `
      : "";

    const catSubs = FALLBACK_SUBCATEGORIES.filter((s) => {
      const belongs =
        s.categoryId?._id === cat._id ||
        s.categoryId === cat._id ||
        (s.categoryId?.slug && s.categoryId.slug === cat.slug) ||
        (cat.slug === "crystal-statues" && (
          s.categoryId?.slug === "angel" ||
          s.categoryId?.slug === "diya" ||
          s._id === "6a55bc912dcf49aacd71ef6c" ||
          s._id === "6a55bcad2dcf49aacd71ef6e"
        ));
      if (!belongs) return false;
      const sName = (s.name || "").toLowerCase().trim();
      const sSlug = (s.slug || "").toLowerCase().trim();
      const cName = (cat.name || "").toLowerCase().trim();
      if (cat.slug === "shree-yantra" && (sName === "god" || sSlug === "god")) return false;
      if ((sName === cName || sSlug === cat.slug) && (cat.slug === "shree-yantra" || cat.slug === "shivling")) return false;
      if (cat.slug === "god-statues" && (sSlug.includes("krishna") || sSlug.includes("hanuman") || sName.includes("statues") || sName.includes("deities"))) return false;
      if (cat.slug === "crystal-statues" && (sName.includes("gemstone") || sName.includes("handcrafted"))) return false;
      return true;
    });

    const subPillsHtml = catSubs.length > 0
      ? `
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
          <span style="background:#78350f;color:#ffffff;font-size:13px;font-weight:600;padding:6px 14px;border-radius:9999px;">All (${catProducts.length})</span>
          ${catSubs.map((sub) => {
            const count = catProducts.filter((p) => {
              const pSubId = p.subCategoryId?._id || p.subCategoryId;
              const pSubSlug = (p.subCategoryId?.slug || "").toLowerCase().trim();
              const pSubName = (p.subCategoryName || p.subCategoryId?.name || "").toLowerCase().trim();
              const targetSlug = (sub.slug || "").toLowerCase().trim();
              const targetName = (sub.name || "").toLowerCase().trim();
              return (
                pSubId === sub._id ||
                (targetSlug && pSubSlug && targetSlug === pSubSlug) ||
                (targetName && pSubName && targetName === pSubName)
              );
            }).length;
            return `<a href="${BASE_URL}/subcategory/${sub._id}" style="text-decoration:none;background:#f3f4f6;color:#374151;font-size:13px;font-weight:500;padding:6px 14px;border-radius:9999px;border:1px solid #e5e7eb;display:inline-flex;align-items:center;gap:6px;"><span>${escapeHtml(sub.name)}</span><span style="background:#e5e7eb;color:#4b5563;font-size:11px;padding:2px 6px;border-radius:9999px;">${count}</span></a>`;
          }).join("\n")}
        </div>
      `
      : "";

    const categoryBodyPreview = `
      <div style="max-width:1200px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,sans-serif;">
        <div style="margin-bottom:24px;">
          <h1 style="font-size:28px;font-weight:800;color:#1e293b;">All <span style="color:#92400e;">${escapeHtml(catName)}</span></h1>
          <p style="font-size:14px;color:#64748b;margin-top:4px;">${catProducts.length} Products</p>
        </div>
        ${subPillsHtml}
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:16px;">
          ${cardsHtml}
        </div>
        ${guideHtml}
        ${faqsHtml}
      </div>
    `.trim();

    const catGraphElements = [
      {
        "@type": "CollectionPage",
        "@id": `${catCanonical}#collection`,
        name: catTitle,
        description: catDesc,
        url: catCanonical,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${catCanonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Shop", item: `${BASE_URL}/shop` },
          { "@type": "ListItem", position: 3, name: catName, item: catCanonical },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${catCanonical}#itemlist`,
        numberOfItems: catProducts.length,
        itemListElement: catProducts.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${BASE_URL}/product/${p.slug || p._id}`,
          name: p.name,
        })),
      },
    ];

    if (catContent?.faqs?.length) {
      catGraphElements.push({
        "@type": "FAQPage",
        "@id": `${catCanonical}#faq`,
        mainEntity: catContent.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      });
    }

    const catSchema = {
      "@context": "https://schema.org",
      "@graph": catGraphElements,
    };

    const catHtml = buildPageHtml({
      title: catTitle,
      description: catDesc,
      canonical: catCanonical,
      ogTitle: catContent?.ogTitle || catTitle,
      ogDescription: catContent?.ogDescription || catDesc,
      ogImage: `${BASE_URL}/logo.png`,
      schema: catSchema,
      bodyContent: categoryBodyPreview,
    });

    if (cat.slug === "angel" || cat.slug === "diya") {
      const redirectContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting to Crystal Statues | Crystal Jaipuria</title>
  <meta http-equiv="refresh" content="0;url=/crystal-statues">
  <link rel="canonical" href="${BASE_URL}/crystal-statues">
</head>
<body style="font-family:sans-serif;text-align:center;padding:50px;">
  <p>Redirecting to <a href="${BASE_URL}/crystal-statues">${BASE_URL}/crystal-statues</a>...</p>
</body>
</html>`;
      saveFile(`${cat.slug}/index.html`, redirectContent);
    } else {
      saveFile(`${cat.slug}/index.html`, catHtml);
    }
    if (cat.slug === "luxurious-idols-&-decor") {
      saveFile("luxurious-idols-decor/index.html", catHtml);
    } else if (cat.slug === "luxurious-idols-decor") {
      saveFile("luxurious-idols-&-decor/index.html", catHtml);
    }
    catCount++;
  });

  console.log(`✓ Pre-rendered ${catCount} category pages to /dist/*/index.html`);

  // ==========================================
  // 3. Pre-render Core Pages
  // ==========================================
  const corePages = [
    {
      slug: "shop",
      title: "Shop All Authentic Gemstone Statues & Idols | Crystal Jaipuria",
      description: "Browse our complete collection of natural gemstone God statues, Sphatik Shivlings, Shree Yantra, and healing crystals handcrafted in Jaipur since 1989.",
    },
    {
      slug: "about",
      title: "About Us - 35+ Years Gemstone Craftsmanship | Crystal Jaipuria",
      description: "Learn about Crystal Jaipuria's heritage since 1989. Master artisans, 100% natural earth-mined gemstones, factory direct pricing, and worldwide delivery.",
    },
    {
      slug: "contact",
      title: "Contact Us & Factory Visit | Crystal Jaipuria, Jaipur",
      description: "Get in touch with Crystal Jaipuria for custom gemstone statues, wholesale inquiries, factory visits in Sanganer, Jaipur, and international shipping.",
    },
    {
      slug: "blog",
      title: "Gemstone & Spiritual Vastu Insights Blog | Crystal Jaipuria",
      description: "Read expert guides on natural gemstone identification, Sphatik Shivling benefits, Shree Yantra placement, and authentic Vedic murti care.",
    },
    {
      slug: "gemstone-authenticity-guide",
      title: "Gemstone Authenticity Guide - 100% Natural Verification | Crystal Jaipuria",
      description: "Learn how to verify authentic 100% natural gemstones, cold touch test, microscopic inclusions, and lab certification by Crystal Jaipuria experts.",
    },
  ];

  const shopCardsHtml = products.slice(0, 15)
    .map((p) => {
      const pSlug = p.slug || p._id;
      const pImg = `${BASE_URL}/images/${pSlug}.webp`;
      const pPrice = parsePrice(p);
      return `
        <a href="${BASE_URL}/product/${pSlug}" style="text-decoration:none;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="aspect-ratio:1/1;background:#faf8f5;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:8px;">
              <img src="${pImg}" alt="${escapeHtml(p.name)}" style="max-height:100%;max-width:100%;object-fit:contain;" width="300" height="300" loading="lazy" />
            </div>
            <h3 style="font-size:14px;font-weight:700;color:#1e293b;margin:12px 0 6px 0;line-height:1.4;">${escapeHtml(p.name)}</h3>
          </div>
          <div style="font-size:16px;font-weight:800;color:#92400e;margin-top:8px;">${pPrice}</div>
        </a>
      `;
    })
    .join("\n");

  const shopBodyPreview = `
    <div style="max-width:1200px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,sans-serif;">
      <h1 style="font-size:28px;font-weight:800;color:#0f172a;margin-bottom:8px;">Shop All Gemstone Statues &amp; Crystal Handicrafts</h1>
      <p style="font-size:14px;color:#64748b;margin-bottom:24px;">Explore 100% natural certified gemstone god statues, Sphatik Shivlings, and Vastu artifacts handcrafted in Jaipur.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:16px;">
        ${shopCardsHtml}
      </div>
    </div>
  `.trim();

  corePages.forEach((cp) => {
    const pageHtml = buildPageHtml({
      title: cp.title,
      description: cp.description,
      canonical: `${BASE_URL}/${cp.slug}`,
      ogTitle: cp.title,
      ogDescription: cp.description,
      bodyContent: cp.slug === "shop" ? shopBodyPreview : "",
    });
    saveFile(`${cp.slug}/index.html`, pageHtml);
  });

  console.log(`✓ Pre-rendered ${corePages.length} core pages to /dist/*/index.html`);

  // ==========================================
  // 4. Pre-render Homepage (dist/index.html)
  // ==========================================
  const homeFeaturedProducts = products.slice(0, 12);
  const homeCardsHtml = homeFeaturedProducts
    .map((p) => {
      const pSlug = p.slug || p._id;
      const pImg = `${BASE_URL}/images/${pSlug}.webp`;
      const pPrice = parsePrice(p);
      return `
        <a href="${BASE_URL}/product/${pSlug}" style="text-decoration:none;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="aspect-ratio:1/1;background:#faf8f5;border-radius:8px;display:flex;align-items:center;justify-content:center;padding:8px;">
              <img src="${pImg}" alt="${escapeHtml(p.name)}" style="max-height:100%;max-width:100%;object-fit:contain;" width="300" height="300" loading="lazy" />
            </div>
            <h3 style="font-size:14px;font-weight:700;color:#1e293b;margin:12px 0 6px 0;line-height:1.4;">${escapeHtml(p.name)}</h3>
          </div>
          <div style="font-size:16px;font-weight:800;color:#92400e;margin-top:8px;">${pPrice}</div>
        </a>
      `;
    })
    .join("\n");

  const homeCategoriesHtml = categories
    .map((c) => `
      <a href="${BASE_URL}/${c.slug}" style="text-decoration:none;display:inline-block;padding:8px 16px;background:#ffffff;border:1px solid #e2e8f0;border-radius:4px;font-size:13px;font-weight:600;color:#1e293b;margin:4px;">
        ${escapeHtml(c.name)}
      </a>
    `)
    .join("");

  const homeFaqsHtml = `
    <div style="margin-top:40px;background:#ffffff;border-radius:16px;padding:24px;border:1px solid #e2e8f0;">
      <h3 style="font-size:20px;font-weight:800;color:#0f172a;margin-bottom:16px;">Frequently Asked Questions</h3>
      <div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #f1f5f9;">
        <h4 style="font-size:15px;font-weight:700;color:#1e293b;margin-bottom:6px;">Are you a direct gemstone statues manufacturer in Jaipur?</h4>
        <p style="font-size:13px;color:#475569;line-height:1.6;margin:0;">Yes. Crystal Jaipuria has been manufacturing and hand-carving natural gemstone God statues, Sphatik Shivlings, and crystal idols in Jaipur, Rajasthan since 1989. We operate our own carving unit in Sanganer, Jaipur.</p>
      </div>
      <div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #f1f5f9;">
        <h4 style="font-size:15px;font-weight:700;color:#1e293b;margin-bottom:6px;">Do you supply wholesale across India and internationally?</h4>
        <p style="font-size:13px;color:#475569;line-height:1.6;margin:0;">Yes. We are a trusted wholesale supplier and exporter delivering to temples, retailers, and devotees across India (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Ahmedabad) and globally to the USA, UK, Canada, Australia, and UAE.</p>
      </div>
      <div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #f1f5f9;">
        <h4 style="font-size:15px;font-weight:700;color:#1e293b;margin-bottom:6px;">Are your gemstones and Sphatik idols 100% natural and certified?</h4>
        <p style="font-size:13px;color:#475569;line-height:1.6;margin:0;">Every statue, Shivling, and Shree Yantra is carved from 100% authentic earth-mined gemstones (Sphatik Quartz, Rose Quartz, Green Jade, Amethyst, Lapis Lazuli). Each piece comes with a laboratory test certificate verifying authenticity.</p>
      </div>
      <div>
        <h4 style="font-size:15px;font-weight:700;color:#1e293b;margin-bottom:6px;">Can I order custom sized deity idols or visit your Jaipur workshop?</h4>
        <p style="font-size:13px;color:#475569;line-height:1.6;margin:0;">Yes, we welcome custom deity carving orders from 2 inches up to 5+ feet as per Vedic Shilpa Shastra. You can also visit our workshop in Sanganer, Jaipur, Rajasthan by appointment.</p>
      </div>
    </div>
  `;

  const homepageBodyPreview = `
    <div style="max-width:1200px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,sans-serif;">
      <!-- Hero / Brand Introduction -->
      <div style="margin-bottom:32px;background:#FAF8F5;border-radius:16px;padding:32px 24px;border:1px solid #f1f5f9;">
        <span style="font-size:11px;font-weight:700;color:#b45309;text-transform:uppercase;letter-spacing:1px;background:#fef3c7;padding:4px 10px;border-radius:9999px;">Est. 1989 • Jaipur Heritage</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;margin:16px 0 12px 0;line-height:1.2;">
          Handcrafted Gemstone Statues &amp; Crystal Carvings <span style="color:#d97706;">Manufacturer in Jaipur, India</span>
        </h1>
        <p style="font-size:15px;color:#475569;line-height:1.7;max-width:850px;margin-bottom:20px;">
          Crystal Jaipuria is Rajasthan&#039;s premier manufacturer, wholesale supplier, and global exporter of certified natural gemstone god statues, Sphatik Shivlings, and sacred Vedic yantras. Handcrafted with traditional Jaipur craftsmanship and Shilpa Shastra proportions.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          ${homeCategoriesHtml}
        </div>
      </div>

      <!-- Featured Products Grid -->
      <div style="margin-bottom:40px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
          <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin:0;">Featured Handcrafted Gemstone Statues</h2>
          <a href="${BASE_URL}/shop" style="font-size:14px;font-weight:700;color:#d97706;text-decoration:none;">View All Products &rarr;</a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:16px;">
          ${homeCardsHtml}
        </div>
      </div>

      <!-- B2B Wholesale & Custom Manufacturing Section -->
      <div style="margin-bottom:40px;background:#ffffff;border-radius:16px;padding:32px 24px;border:1px solid #e2e8f0;">
        <h2 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:12px;">Gemstone Statues Wholesale Supplier &amp; Custom Carving in Jaipur</h2>
        <p style="font-size:14px;color:#475569;line-height:1.7;margin-bottom:24px;">
          We supply temples, retailers, and export houses worldwide with authentic natural gemstone sculptures, custom deity carvings, and pure Sphatik idols at direct factory wholesale rates from our workshop in Sanganer, Jaipur, Rajasthan (India).
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;margin-bottom:24px;">
          <div style="padding:16px;background:#faf8f5;border-radius:8px;border:1px solid #f1f5f9;">
            <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:6px;">Direct Factory Wholesale</h3>
            <p style="font-size:13px;color:#64748b;line-height:1.5;margin:0;">Zero middlemen markup with transparent bulk pricing for dealers, retailers, and institutions.</p>
          </div>
          <div style="padding:16px;background:#faf8f5;border-radius:8px;border:1px solid #f1f5f9;">
            <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:6px;">Bespoke Deity Carving</h3>
            <p style="font-size:13px;color:#64748b;line-height:1.5;margin:0;">Custom statues from 2 inches to 5+ feet in White Quartz, Rose Quartz, Green Jade, Amethyst, and Black Obsidian.</p>
          </div>
          <div style="padding:16px;background:#faf8f5;border-radius:8px;border:1px solid #f1f5f9;">
            <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:6px;">100% Natural Earth Crystals</h3>
            <p style="font-size:13px;color:#64748b;line-height:1.5;margin:0;">Every idol is carved from certified earth-mined rough gemstones with verifiable inclusions and test certificates.</p>
          </div>
          <div style="padding:16px;background:#faf8f5;border-radius:8px;border:1px solid #f1f5f9;">
            <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:6px;">All-India &amp; Global Shipping</h3>
            <p style="font-size:13px;color:#64748b;line-height:1.5;margin:0;">Multi-layer wooden crate packaging with express insured transit across India and to USA, UK, Canada, Australia, UAE.</p>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      ${homeFaqsHtml}

      <!-- Local Business NAP Footer Preview -->
      <div style="margin-top:32px;padding:20px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;font-size:13px;color:#64748b;text-align:center;">
        <p style="font-weight:700;color:#1e293b;margin:0 0 6px 0;">Crystal Jaipuria — Gemstone God Statues Manufacturer &amp; Wholesale Supplier</p>
        <p style="margin:0 0 4px 0;">Workshop Address: West Part, Prabha Mangal Vihar, Plot No.03, Mod, Sanganer, Muhana, Jaipur, Rajasthan 302029, India</p>
        <p style="margin:0;">Phone / WhatsApp: +91 8306317032 | Email: crystaljaipurya@gmail.com | Worldwide Delivery</p>
      </div>
    </div>
  `.trim();

  const luxuryHomepageLoader = `
    <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#FAF8F5;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:24px;text-align:center;">
      <div style="position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
        <div style="position:absolute;width:96px;height:96px;border-radius:50%;background:radial-gradient(circle, rgba(197,155,39,0.25) 0%, rgba(217,119,6,0.1) 70%, transparent 100%);filter:blur(8px);"></div>
        <div style="width:72px;height:72px;border-radius:50%;border:2px solid #F3E8D2;border-top-color:#C59B27;border-right-color:#D4AF37;animation:cj-spin 1s linear infinite;"></div>
        <div style="position:absolute;width:50px;height:50px;border-radius:50%;background:#ffffff;box-shadow:0 4px 14px rgba(0,0,0,0.06);display:flex;align-items:center;justify-content:center;border:1px solid #FAF7F2;">
          <img src="${BASE_URL}/logo.png" alt="Crystal Jaipuria" style="width:34px;height:34px;object-fit:contain;" width="34" height="34" />
        </div>
      </div>
      <div style="font-size:18px;font-weight:800;letter-spacing:3px;color:#1e293b;text-transform:uppercase;margin-bottom:4px;">CRYSTAL JAIPURIA</div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#C59B27;text-transform:uppercase;margin-bottom:12px;">JAIPUR HERITAGE &bull; EST. 1989</div>
      <div style="font-size:13px;color:#64748b;font-weight:500;">Loading handcrafted gemstone collection...</div>
      <style>
        @keyframes cj-spin { to { transform: rotate(360deg); } }
      </style>
    </div>
  `.trim();

  const homeHtml = buildPageHtml({
    title: "Gemstone God Statues Manufacturer & Wholesale Supplier in Jaipur, India | Crystal Jaipuria",
    description: "Leading gemstone god statues manufacturer & wholesale supplier in Jaipur, Rajasthan (India). Handcrafted natural crystal idols, Sphatik Shivlings & Vedic spiritual decor since 1989.",
    canonical: `${BASE_URL}/`,
    ogTitle: "Gemstone God Statues Manufacturer & Wholesale Supplier in Jaipur, India | Crystal Jaipuria",
    ogDescription: "Leading gemstone god statues manufacturer & wholesale supplier in Jaipur, Rajasthan (India). Handcrafted natural crystal idols, Sphatik Shivlings & Vedic spiritual decor since 1989.",
    bodyContent: luxuryHomepageLoader,
    noscriptContent: homepageBodyPreview,
  });
  saveFile("index.html", homeHtml);
  console.log("✓ Pre-rendered homepage with luxury brand loader & noscript SEO content to /dist/index.html");

  // ==========================================
  // 5. Pre-render 404 Page (dist/404.html & dist/404/index.html)
  // ==========================================
  const notFoundBodyPreview = `
    <div style="min-height:85vh;background:linear-gradient(180deg, #fdfbf7 0%, #faf5eb 50%, #f5ede0 100%);display:flex;align-items:center;justify-content:center;padding:48px 16px;font-family:system-ui,-apple-system,sans-serif;text-align:center;">
      <div style="max-width:620px;width:100%;background:rgba(255,255,255,0.95);border:1px solid rgba(245,215,140,0.6);border-radius:24px;padding:48px 32px;box-shadow:0 20px 45px -10px rgba(180,83,9,0.08);">
        <div style="display:inline-block;padding:6px 16px;background:#fef3c7;color:#92400e;border:1px solid #fde68a;border-radius:9999px;font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:20px;">
          Crystal Jaipuria • Jaipur Art &amp; Craft
        </div>
        <div style="font-size:80px;font-weight:800;line-height:1;margin-bottom:12px;background:linear-gradient(135deg, #b45309 0%, #d97706 50%, #1e293b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-2px;">
          404
        </div>
        <h2 style="font-size:24px;font-weight:700;color:#1e293b;margin-bottom:12px;">Sacred Piece or Page Not Found</h2>
        <p style="color:#64748b;font-size:15px;line-height:1.6;margin-bottom:28px;max-width:480px;margin-left:auto;margin-right:auto;">
          The gemstone statue, Shivling, or page you are looking for may have been moved, renamed, or is currently unavailable.
        </p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;">
          <a href="${BASE_URL}/" style="display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;background:#0f172a;color:#ffffff;">Back to Homepage</a>
          <a href="${BASE_URL}/shop" style="display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;background:#d97706;color:#ffffff;">Explore All Shop</a>
          <a href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20was%20looking%20for%20a%20product%20on%20your%20website" style="display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;background:#16a34a;color:#ffffff;" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        </div>
        <div style="border-top:1px solid #e2e8f0;padding-top:24px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;margin-bottom:12px;">Popular Gemstone Categories</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
            <a href="${BASE_URL}/shivling" style="font-size:12px;font-weight:600;color:#475569;background:#faf8f5;border:1px solid #e2e8f0;padding:6px 14px;border-radius:6px;text-decoration:none;">Gemstone Shivling</a>
            <a href="${BASE_URL}/god-statues" style="font-size:12px;font-weight:600;color:#475569;background:#faf8f5;border:1px solid #e2e8f0;padding:6px 14px;border-radius:6px;text-decoration:none;">God Statues</a>
            <a href="${BASE_URL}/shree-yantra" style="font-size:12px;font-weight:600;color:#475569;background:#faf8f5;border:1px solid #e2e8f0;padding:6px 14px;border-radius:6px;text-decoration:none;">Crystal Shree Yantra</a>
            <a href="${BASE_URL}/diya" style="font-size:12px;font-weight:600;color:#475569;background:#faf8f5;border:1px solid #e2e8f0;padding:6px 14px;border-radius:6px;text-decoration:none;">Handcrafted Diyas</a>
            <a href="${BASE_URL}/shop" style="font-size:12px;font-weight:600;color:#475569;background:#faf8f5;border:1px solid #e2e8f0;padding:6px 14px;border-radius:6px;text-decoration:none;">All Products</a>
          </div>
        </div>
      </div>
    </div>
  `.trim();

  const notFoundHtml = buildPageHtml({
    title: "404 - Page Not Found | Crystal Jaipuria",
    description: "The page you are looking for does not exist. Explore authentic handcrafted gemstone statues, Shivlings, Shree Yantra, and crystal spiritual decor from Crystal Jaipuria.",
    canonical: `${BASE_URL}/404`,
    bodyContent: notFoundBodyPreview,
  });
  saveFile("404.html", notFoundHtml);
  saveFile("404/index.html", notFoundHtml);
  console.log("✓ Pre-rendered 404 page to /dist/404.html and /dist/404/index.html");

  console.log("🎉 Static Pre-rendering Completed Successfully!");
};

runPrerender();
