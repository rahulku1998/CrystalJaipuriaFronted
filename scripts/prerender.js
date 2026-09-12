import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
  str
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

    return html;
  };

  const saveFile = (relPath, content) => {
    const fullPath = path.join(distDir, relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, "utf-8");
  };

  // Fetch live products, categories, blogs
  const [productsData, categoriesData] = await Promise.all([
    fetchData("/products"),
    fetchData("/categories"),
  ]);

  const products = productsData.products || productsData || [];
  const categories = categoriesData.categories || categoriesData || [];

  console.log(`📦 Pre-rendering ${products.length} Products & ${categories.length} Categories...`);

  // ==========================================
  // 1. Pre-render All Products
  // ==========================================
  let prodCount = 0;
  products.forEach((prod) => {
    const slug = prod.slug || prod._id;
    if (!slug) return;

    const cleanName = (prod.name || "Gemstone Idol")
      .replace(/\s*-\s*100%\s*certified/gi, "")
      .replace(/\s*100%\s*certified/gi, "")
      .trim();

    const cleanProductSlug = (prod.slug || slug || "product")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const imageUrl = `${BASE_URL}/images/${cleanProductSlug}.webp?v=2`;

    let priceNum = 999;
    if (typeof prod.price === "number" && prod.price > 0) {
      priceNum = prod.price;
    } else if (typeof prod.discountPrice === "number" && prod.discountPrice > 0) {
      priceNum = prod.discountPrice;
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
    if (!displayTitle.includes("(") && (shippingWeight || size)) {
      const specLabel = [shippingWeight, size].filter(Boolean).join(", ");
      displayTitle = `${cleanName} (${specLabel})`;
    }

    const metaTitle = prod.metaTitle || `${displayTitle} | Crystal Jaipuria`;
    const cleanDesc = (prod.detail || prod.description || cleanName)
      .replace(/<[^>]*>?/gm, "")
      .replace(/100%\s*certified\s*/gi, "")
      .replace(/\r?\n|\r/g, " ")
      .trim();

    const metaDesc = prod.metaDescription || cleanDesc.slice(0, 160);

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: displayTitle,
      image: [imageUrl],
      description: cleanDesc.slice(0, 500),
      sku: prod._id,
      mpn: slug,
      brand: {
        "@type": "Brand",
        name: "Crystal Jaipuria",
      },
      offers: {
        "@type": "Offer",
        url: `${BASE_URL}/product/${slug}`,
        priceCurrency: "INR",
        price: priceNum,
        itemCondition: "https://schema.org/NewCondition",
        availability:
          prod.stock === 0 || prod.stock === "0"
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Crystal Jaipuria",
        },
      },
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
              <h1 style="font-size:26px;font-weight:800;color:#0f172a;line-height:1.3;margin-bottom:12px;">${escapeHtml(displayTitle)}</h1>
              <div style="font-size:28px;font-weight:800;color:#047857;margin-bottom:16px;">₹${priceNum.toLocaleString("en-IN")}</div>
              <p style="font-size:15px;color:#475569;line-height:1.6;margin-bottom:24px;">${escapeHtml(cleanDesc.slice(0, 350))}...</p>
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <a href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20am%20interested%20in%20${encodeURIComponent(displayTitle)}" style="background:#25D366;color:#ffffff;font-weight:700;padding:12px 24px;border-radius:12px;text-decoration:none;font-size:15px;display:inline-flex;align-items:center;gap:8px;">WhatsApp Inquiry</a>
                <a href="${BASE_URL}/shop" style="background:#4f46e5;color:#ffffff;font-weight:600;padding:12px 24px;border-radius:12px;text-decoration:none;font-size:15px;">Explore Store</a>
              </div>
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
    });

    saveFile(`product/${slug}/index.html`, pageHtml);
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
    const catTitle = `${catName} - Handcrafted Gemstone Idols | Crystal Jaipuria`;
    const catDesc = `Explore authentic hand-carved ${catName} in natural gemstones and pure crystals. Factory direct wholesale prices from master artisans in Jaipur since 1989.`;

    const catHtml = buildPageHtml({
      title: catTitle,
      description: catDesc,
      canonical: `${BASE_URL}/${cat.slug}`,
      ogTitle: catTitle,
      ogDescription: catDesc,
      ogImage: `${BASE_URL}/logo.png`,
    });

    saveFile(`${cat.slug}/index.html`, catHtml);
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

  corePages.forEach((cp) => {
    const pageHtml = buildPageHtml({
      title: cp.title,
      description: cp.description,
      canonical: `${BASE_URL}/${cp.slug}`,
      ogTitle: cp.title,
      ogDescription: cp.description,
    });
    saveFile(`${cp.slug}/index.html`, pageHtml);
  });

  console.log(`✓ Pre-rendered ${corePages.length} core pages to /dist/*/index.html`);
  console.log("🎉 Static Pre-rendering Completed Successfully!");
};

runPrerender();
