import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES, FALLBACK_SUBCATEGORIES } from "../src/data/fallbackData.js";
import { FALLBACK_BLOGS, getDeduplicatedBlogs } from "../src/data/fallbackBlogs.js";
import { getStandardizedProduct, STANDARDIZED_SPECS } from "../src/utils/productStandardizer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.crystaljaipuria.com";
const API_URL = "https://shop.codewithrahulkumawat.com/api";

const fetchData = (endpoint) => {
  return new Promise((resolve) => {
    https
      .get(`${API_URL}${endpoint}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (err) {
            console.warn(`Failed to parse JSON from ${endpoint}:`, err.message);
            resolve({});
          }
        });
      })
      .on("error", (err) => {
        console.warn(`Error fetching ${endpoint}:`, err.message);
        resolve({});
      });
  });
};

const escapeXml = (unsafe) => {
  return String(unsafe || "")
    .replace(/&amp;/g, "&")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const generateSitemap = async () => {
  console.log("Generating dynamic sitemap.xml and llms.txt...");

  const [productsRes, categoriesRes, blogsRes, subCategoriesRes] = await Promise.all([
    fetchData("/products"),
    fetchData("/categories"),
    fetchData("/blogs"),
    fetchData("/subcategories"),
  ]);

  let products = productsRes.products || [];
  let categories = categoriesRes.categories || [];
  let blogs = getDeduplicatedBlogs(blogsRes.blogs || [], FALLBACK_BLOGS);
  let subCategories = subCategoriesRes.subCategories || [];
  if (subCategories.length === 0) {
    subCategories = FALLBACK_SUBCATEGORIES;
  }

  const existingSlugs = new Set(products.map((p) => p.slug || p._id));
  FALLBACK_PRODUCTS.forEach((fbProd) => {
    if (!existingSlugs.has(fbProd.slug) && !existingSlugs.has(fbProd._id)) {
      products.push(fbProd);
      existingSlugs.add(fbProd.slug);
    }
  });
  if (categories.length === 0) {
    console.log("⚡ [Sitemap] Using fallback categories catalog (6 categories)...");
    categories = FALLBACK_CATEGORIES;
  }

  // Standardize all products sitewide for 100% price, weight, size, and spec consistency
  products = products.map((prod) => getStandardizedProduct(prod));

  console.log(
    `Fetched ${products.length} products, ${categories.length} categories, ${blogs.length} blogs from database.`
  );

  const staticPages = [
    { url: `${BASE_URL}/`, changefreq: "daily", priority: "1.0" },
    { url: `${BASE_URL}/shop`, changefreq: "daily", priority: "0.9" },
    { url: `${BASE_URL}/blog`, changefreq: "weekly", priority: "0.8" },
    { url: `${BASE_URL}/about`, changefreq: "monthly", priority: "0.7" },
    { url: `${BASE_URL}/contact`, changefreq: "monthly", priority: "0.7" },
    { url: `${BASE_URL}/shipping-policy`, changefreq: "monthly", priority: "0.6" },
    { url: `${BASE_URL}/refund-policy`, changefreq: "monthly", priority: "0.6" },
    { url: `${BASE_URL}/privacy-policy`, changefreq: "monthly", priority: "0.6" },
    { url: `${BASE_URL}/terms-and-conditions`, changefreq: "monthly", priority: "0.6" },
    { url: `${BASE_URL}/gemstone-authenticity-guide`, changefreq: "weekly", priority: "0.8" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  xml += `  <!-- Core Static Pages -->\n`;
  staticPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  if (categories.length > 0) {
    xml += `\n  <!-- Category Pages -->\n`;
    categories.forEach((cat) => {
      if (cat.slug && cat.slug !== "angel" && cat.slug !== "diya") {
        const catSlug = cat.slug === "luxurious-idols-&-decor" ? "luxurious-idols-decor" : cat.slug;
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/${escapeXml(catSlug)}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.85</priority>\n`;
        xml += `  </url>\n`;
      }
    });
  }

  if (subCategories.length > 0) {
    xml += `\n  <!-- Subcategory Pages (Clean SEO Slugs) -->\n`;
    const seenSubSlugs = new Set();
    subCategories.forEach((sub) => {
      let slug = sub.slug || (sub.name && sub.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
      if (slug) {
        slug = slug.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      }
      if (slug && !seenSubSlugs.has(slug)) {
        seenSubSlugs.add(slug);
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/subcategory/${escapeXml(slug)}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.80</priority>\n`;
        xml += `  </url>\n`;
      }
    });
  }

  // Only include live database products in sitemap.xml
  if (products.length > 0) {
    xml += `\n  <!-- Dynamic Product Pages (${products.length} Live Products) -->\n`;
    products.forEach((prod) => {
      const slug = prod.slug || prod._id;
      const cleanName = (prod.name || "Gemstone Product").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const cleanProductSlug = (prod.slug || slug || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      let imageMain = "";
      if (Array.isArray(prod.images) && prod.images.length > 0) {
        const first = typeof prod.images[0] === "string" ? prod.images[0] : prod.images[0]?.url;
        if (first) {
          imageMain = first.startsWith("http") ? first : `${BASE_URL}${first.startsWith("/") ? "" : "/"}${first}`;
        }
      }
      if (!imageMain) {
        const localMainPath = path.join(__dirname, `../public/images/${cleanProductSlug}.webp`);
        if (fs.existsSync(localMainPath)) {
          imageMain = `${BASE_URL}/images/${cleanProductSlug}.webp`;
        }
      }
      if (!imageMain) {
        imageMain = `${BASE_URL}/images/${cleanProductSlug}.webp`;
      }

      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/product/${slug}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${imageMain.replace(/&/g, "&amp;")}</image:loc>\n`;
      xml += `      <image:title>${cleanName} | Crystal Jaipuria</image:title>\n`;
      xml += `    </image:image>\n`;

      const additionalImages = [];
      for (let i = 2; i <= 10; i++) {
        const secImgPath = path.join(__dirname, `../public/images/${cleanProductSlug}-${i}.webp`);
        if (fs.existsSync(secImgPath)) {
          additionalImages.push(`${BASE_URL}/images/${cleanProductSlug}-${i}.webp`);
        }
      }
      if (Array.isArray(prod.images)) {
        for (let i = 1; i < prod.images.length; i++) {
          const raw = typeof prod.images[i] === "string" ? prod.images[i] : (prod.images[i]?.url || "");
          if (raw) {
            const fullUrl = raw.startsWith("http") ? raw : `${BASE_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
            if (fullUrl !== imageMain && !additionalImages.includes(fullUrl)) {
              additionalImages.push(fullUrl);
            }
          }
        }
      }

      additionalImages.forEach((imgUrl, idx) => {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${imgUrl.replace(/&/g, "&amp;")}</image:loc>\n`;
        xml += `      <image:title>${cleanName} - View ${idx + 2} | Crystal Jaipuria</image:title>\n`;
        xml += `    </image:image>\n`;
      });

      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });
  }

  if (blogs.length > 0) {
    xml += `\n  <!-- Blog Detail Pages (${blogs.length} Stories) -->\n`;
    blogs.forEach((blog) => {
      const slug = blog.slug || blog._id;
      const rawCover = blog.coverImage?.url || "/Gemstone.webp";
      const coverUrl = rawCover.startsWith("http")
        ? rawCover
        : `${BASE_URL}${rawCover.startsWith("/") ? "" : "/"}${rawCover}`;
      const cleanTitle = escapeXml(blog.title || "Crystal Jaipuria Blog");

      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/blog/${slug}</loc>\n`;
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${coverUrl.replace(/&/g, "&amp;")}</image:loc>\n`;
      xml += `      <image:title>${cleanTitle} | Crystal Jaipuria</image:title>\n`;
      xml += `    </image:image>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.80</priority>\n`;
      xml += `  </url>\n`;
    });
  }

  xml += `</urlset>\n`;

  const publicDir = path.resolve(__dirname, "../public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf-8");
  console.log(`Successfully generated ${sitemapPath}!`);

  let llms = `# Crystal Jaipuria\n\n`;
  llms += `> Leading manufacturer, wholesaler, and exporter of authentic gemstone god statues, hand-carved crystal idols, Shivlings, Shree Yantra, Vastu decor, and spiritual healing products in Jaipur, India since 1989.\n\n`;
  llms += `## Overview\n`;
  llms += `Crystal Jaipuria is a trusted Jaipur-based gemstone and crystal carving manufacturer with over 35 years of heritage in artisan craftsmanship, wholesale supply, and international export. Every idol and artifact is hand-carved by master artisans using authentic natural gemstones and crystals.\n\n`;
  llms += `## Key Product Categories\n`;
  categories.forEach((cat) => {
    if (cat.slug && cat.name) {
      llms += `- [${cat.name}](${BASE_URL}/${cat.slug}): Hand-carved ${cat.name} in natural gemstones and authentic crystals.\n`;
    }
  });

  llms += `\n## Core Pages & Navigation\n`;
  llms += `- [Home](${BASE_URL}/): Official homepage with latest collections and featured handicrafts.\n`;
  llms += `- [Shop](${BASE_URL}/shop): Browse all handcrafted gemstone statues, carvings, and spiritual items.\n`;
  llms += `- [Our Blog](${BASE_URL}/blog): Insights on gemstones, Vastu guidelines, crystal healing, and Indian handicrafts.\n`;
  llms += `- [Natural vs Synthetic Gemstones Guide](${BASE_URL}/blog/natural-vs-synthetic-gemstones): In-depth comparison of earth-mined vs lab-grown stones, inclusion analysis, optical testing, and buying guide for gemstone carvings.\n`;
  llms += `- [How Gemstone Carving Works](${BASE_URL}/blog/gemstone-carving-process): Step-by-step master lapidary guide from raw crystal selection to rough shaping, detailing, diamond polishing, and Jaipur craftsmanship.\n`;
  llms += `- [How to Care for Gemstone Carvings](${BASE_URL}/blog/how-to-care-for-gemstone-carvings): Expert maintenance guide on gentle cleaning, safe water usage, puja abhishek guidelines, and impact protection.\n`;
  llms += `- [What Determines Gemstone Carving Price](${BASE_URL}/blog/factors-affecting-gemstone-carving-price): Comprehensive buyer's guide on mineral rarity, weight yield, carving labor hours, Jaipur finishing, and certification.\n`;
  llms += `- [About Us](${BASE_URL}/about): Brand history, 35+ years of craftsmanship, workshop details, and values.\n`;
  llms += `- [Contact Us](${BASE_URL}/contact): Direct contact, manufacturing queries, and wholesale inquiries.\n`;
  llms += `- [Gemstone Authenticity Guide](${BASE_URL}/gemstone-authenticity-guide): Authoritative guide on verifying 100% natural earth-mined gemstones, cold-touch tests, inclusion checks, and Vedic Shilpa Shastra care.\n`;

  if (products.length > 0) {
    llms += `\n## Live Products Catalog (${products.length} Products)\n`;
    products.forEach((prod) => {
      const slug = prod.slug || prod._id;
      const desc = (prod.detail || prod.description || "")
        .replace(/<[^>]*>?/gm, "")
        .replace(/100%\s*certified\s*/gi, "authentic ")
        .replace(/(\b100%\s*)?natural\s+natural\b/gi, "Natural")
        .replace(/\bauthentic\s+natural\s+natural\b/gi, "authentic Natural")
        .replace(/\bnatural\s+natural\b/gi, "Natural")
        .slice(0, 100);
      const cleanProdName = (prod.name || "")
        .replace(/\s*-\s*100%\s*certified/gi, "")
        .replace(/\s*100%\s*certified/gi, "")
        .trim();
      const priceText = prod.price ? `₹${prod.price}` : "";
      const unitText = prod.pricePerUnit ? ` (${prod.pricePerUnit})` : "";
      const weightText = prod.weight ? ` | Weight: ${prod.weight}` : "";
      const sizeText = prod.size ? ` | Size: ${prod.size}` : "";
      const pricingStats = priceText ? ` [Price: ${priceText}${unitText}${weightText}${sizeText}]` : "";
      llms += `- [${cleanProdName}](${BASE_URL}/product/${slug})${pricingStats}: ${desc || "Handcrafted natural gemstone product by Crystal Jaipuria."}\n`;
    });
  }

  llms += `\n## Business & Contact Information\n`;
  llms += `- **Brand**: Crystal Jaipuria\n`;
  llms += `- **Address**: West Part, Prabha Mangal Vihar, Plot No.03, Mod, Sanganer, Muhana, Jaipur, Rajasthan 302029, India\n`;
  llms += `- **WhatsApp / Phone**: +91 8306317032 / +91 8955613237 / +91 9828723652\n`;
  llms += `- **Email**: crystaljaipurya@gmail.com\n`;
  llms += `- **Official Website**: ${BASE_URL}/\n`;
  llms += `- **Working Hours**: Monday – Saturday: 8:00 AM – 7:30 PM (IST)\n`;
  llms += `- **Shipping**: Worldwide shipping and domestic India delivery available.\n`;

  const llmsPath = path.join(publicDir, "llms.txt");
  fs.writeFileSync(llmsPath, llms, "utf-8");
  console.log(`Successfully generated ${llmsPath}!`);

  // ==========================================
  // Generate Google Merchant Center & GMB Feed
  // ==========================================
  let gmcXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  gmcXml += `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n`;
  gmcXml += `  <channel>\n`;
  gmcXml += `    <title>Crystal Jaipuria - Authentic Gemstone Statues &amp; Handicrafts</title>\n`;
  gmcXml += `    <link>${BASE_URL}</link>\n`;
  gmcXml += `    <description>Authentic natural gemstone god statues, crystal carvings, Shivlings and spiritual products from Jaipur manufacturer since 1989.</description>\n`;

  products.forEach((prod) => {
    const slug = prod.slug || prod._id;
    const prodUrl = `${BASE_URL}/product/${slug}`;
    const cleanName = (prod.name || "Gemstone Product")
      .replace(/\s*-\s*100%\s*certified/gi, "")
      .replace(/\s*100%\s*certified/gi, "")
      .trim();
    const cleanDesc = (prod.metaDescription || prod.detail || prod.description || cleanName)
      .replace(/<[^>]*>?/gm, "")
      .replace(/100%\s*certified\s*/gi, "")
      .replace(/(\b100%\s*)?natural\s+natural\b/gi, "Natural")
      .replace(/\bauthentic\s+natural\s+natural\b/gi, "authentic Natural")
      .replace(/\bnatural\s+natural\b/gi, "Natural")
      .replace(/\r?\n|\r/g, " ")
      .trim()
      .slice(0, 1000);

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
      if (match && Number(match[0]) > 0) {
        priceNum = Number(match[0]);
      }
    }
    const cleanProductSlug = (prod.slug || slug || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    
    // 100% Valid Google Merchant Center Compliant Image URLs (Clean without query params)
    let imageMain = "";
    if (Array.isArray(prod.images) && prod.images.length > 0) {
      const first = typeof prod.images[0] === "string" ? prod.images[0] : prod.images[0]?.url;
      if (first) {
        imageMain = first.startsWith("http") ? first : `${BASE_URL}${first.startsWith("/") ? "" : "/"}${first}`;
      }
    }
    if (!imageMain) {
      const localMainPath = path.join(__dirname, `../public/images/${cleanProductSlug}.webp`);
      if (fs.existsSync(localMainPath)) {
        imageMain = `${BASE_URL}/images/${cleanProductSlug}.webp`;
      }
    }
    if (!imageMain) {
      imageMain = `${BASE_URL}/images/${cleanProductSlug}.webp`;
    }

    const categoryName = prod.categoryId?.name ? prod.categoryId.name.replace(/&/g, "&amp;") : "Gemstones";

    const titleSlug = `${cleanName} ${slug}`.toLowerCase();
    const text = `${titleSlug} ${prod.detail || ""} ${prod.description || ""}`.toLowerCase();

    let material = "Natural Gemstone";
    let color = "Natural";

    if (titleSlug.includes("red jade") || text.includes("red jade")) {
      material = "Natural Red Jade";
      color = "Red";
    } else if (titleSlug.includes("yellow jade") || text.includes("yellow jade")) {
      material = "Natural Yellow Jade";
      color = "Yellow";
    } else if (titleSlug.includes("blue sunstone") || text.includes("blue sunstone")) {
      material = "Natural Blue Sunstone";
      color = "Blue";
    } else if (titleSlug.includes("sunstone") || text.includes("sunstone") || titleSlug.includes("sun stone")) {
      material = "Natural Sunstone";
      color = "Orange / Golden Peach";
    } else if (titleSlug.includes("emerald") || text.includes("emerald") || text.includes("panna")) {
      material = "Natural Emerald (Panna)";
      color = "Green";
    } else if (titleSlug.includes("unakite") || text.includes("unakite")) {
      material = "Natural Unakite";
      color = "Green and Pink";
    } else if (titleSlug.includes("fluorite") || text.includes("fluorite")) {
      material = "Natural Rainbow Fluorite";
      color = "Multi-Color";
    } else if (titleSlug.includes("cats eye") || titleSlug.includes("cat's eye") || text.includes("cat's eye") || text.includes("lehsuniya")) {
      material = "Natural Cat's Eye Quartz";
      color = "Honey Yellow";
    } else if (titleSlug.includes("gomed") || titleSlug.includes("hessonite") || text.includes("gomed") || text.includes("hessonite")) {
      material = "Natural Hessonite Garnet (Gomedh)";
      color = "Brownish Red / Amber";
    } else if (titleSlug.includes("jasper") || text.includes("jasper")) {
      material = "Natural Red Jasper";
      color = "Red";
    } else if (titleSlug.includes("blue sodalite") || titleSlug.includes("sodalite") || text.includes("sodalite")) {
      material = "Natural Blue Sodalite";
      color = "Blue";
    } else if (titleSlug.includes("green aventurine") || (!titleSlug.includes("jade") && text.includes("green aventurine"))) {
      material = "Natural Green Aventurine";
      color = "Green";
    } else if (titleSlug.includes("smokey quartz") || text.includes("smokey quartz")) {
      material = "Natural Smokey Quartz";
      color = "Smoky Brown";
    } else if (titleSlug.includes("tiger eye") || titleSlug.includes("tiger's eye") || text.includes("tiger eye") || text.includes("tiger's eye")) {
      material = "Natural Tiger Eye Gemstone";
      color = "Golden Brown";
    } else if (titleSlug.includes("labradorite") || text.includes("labradorite")) {
      material = "Natural Labradorite Gemstone";
      color = "Grey with Peacock Blue Flash";
    } else if (titleSlug.includes("howlite") || text.includes("howlite")) {
      material = "Natural Howlite Gemstone";
      color = "White with Grey Veins";
    } else if (titleSlug.includes("rose quartz") || text.includes("rose quartz")) {
      material = "Natural Rose Quartz";
      color = "Pink";
    } else if (titleSlug.includes("lapis lazuli") || text.includes("lapis lazuli") || titleSlug.includes("lapis")) {
      material = "Natural Lapis Lazuli";
      color = "Royal Blue";
    } else if (titleSlug.includes("ruby") || text.includes("ruby")) {
      material = "Natural Ruby Gemstone";
      color = "Red";
    } else if (titleSlug.includes("amethyst") || text.includes("amethyst")) {
      material = "Natural Amethyst";
      color = "Purple";
    } else if (titleSlug.includes("pyrite") || text.includes("pyrite")) {
      material = "Natural Golden Pyrite";
      color = "Golden Metallic";
    } else if (titleSlug.includes("black agate") || text.includes("black agate") || titleSlug.includes("agate")) {
      material = "Natural Black Agate";
      color = "Black";
    } else if (titleSlug.includes("opal") || text.includes("opal")) {
      material = "Natural Opal Stone";
      color = "White Iridescent";
    } else if (titleSlug.includes("sapphire") || text.includes("sapphire")) {
      material = "Natural Blue Sapphire";
      color = "Deep Blue";
    } else if (titleSlug.includes("green jade") || titleSlug.includes("jade") || text.includes("green jade") || text.includes("jade")) {
      material = "Natural Green Jade";
      color = "Green";
    } else if (text.includes("sphatik") || text.includes("clear quartz") || text.includes("clear crystal") || text.includes("crystal clear")) {
      material = "Natural Sphatik (Clear Quartz)";
      color = "Clear";
    }

    // Weight extraction (e.g. "500 g", "1.8 kg", "60 g")
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

    // Size extraction (e.g. "4.5 Inch", "2.5 Inch")
    let size = "";
    const sizeStr = String(prod.size || "");
    if (sizeStr && sizeStr !== "N/A") {
      const sMatch = sizeStr.match(/(\d+(\.\d+)?)\s*(inch|inches|cm|mm|")/i);
      if (sMatch) {
        size = `${sMatch[1]} Inch`;
      } else {
        size = sizeStr.split("-")[0].trim();
      }
    }

    // Clean base name: strip typos, -Testing, duplicate spaces, and old raw spec tags
    let baseName = cleanName
      .replace(/\bGemston\b/gi, "Gemstone")
      .replace(/\bPanting\b/gi, "Painting")
      .replace(/\bKrishana\b/gi, "Krishna")
      .replace(/\bMahvaveer\b/gi, "Mahaveer")
      .replace(/\bStaute\b/gi, "Statue")
      .replace(/\bSphtik\b/gi, "Sphatik")
      .replace(/\bGord Shiva\b/gi, "Lord Shiva")
      .replace(/\bHade\b/gi, "Jade")
      .replace(/\s*-\s*testing\b/gi, "")
      .replace(/\btesting\b/gi, "")
      .replace(/\s*-\s*100%\s*certified/gi, "")
      .replace(/\s*100%\s*certified/gi, "")
      .replace(/\s*\([^\)]*?(?:g|kg|inch|cm|mm|[0-9])[^\)]*?\)/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    // Archetype / Intent analysis for maximum Google Shopping matching
    const lowerName = baseName.toLowerCase();
    const isGanesh = lowerName.includes("ganesh") || lowerName.includes("ganpati") || lowerName.includes("vinayaka");
    const isShivling = lowerName.includes("shivling") || lowerName.includes("shivaling") || lowerName.includes("shiva linga");
    const isShiva = !isShivling && (lowerName.includes("shiva") || lowerName.includes("mahadev") || lowerName.includes("bholenath"));
    const isKrishna = lowerName.includes("krishna") || lowerName.includes("krishan") || lowerName.includes("radha");
    const isHanuman = lowerName.includes("hanuman") || lowerName.includes("bajrangbali");
    const isLaxmi = lowerName.includes("laxmi") || lowerName.includes("lakshmi");
    const isMahaveer = lowerName.includes("mahaveer") || lowerName.includes("mahavir");
    const isShreeYantra = lowerName.includes("shree yantra") || lowerName.includes("shri yantra") || lowerName.includes("yantra");
    const isDiya = lowerName.includes("diya") || lowerName.includes("deepak");
    const isAngel = lowerName.includes("angel");

    let intentSuffix = "";
    if (isShivling) {
      if (!lowerName.includes("pooja") && !lowerName.includes("jalabhishek") && !lowerName.includes("temple")) {
        intentSuffix = "for Home Temple & Jalabhishek";
      }
    } else if (isShreeYantra) {
      if (!lowerName.includes("wealth") && !lowerName.includes("vastu") && !lowerName.includes("meru")) {
        intentSuffix = "3D Meru for Wealth & Vastu";
      }
    } else if (isDiya) {
      if (!lowerName.includes("mandir") && !lowerName.includes("pooja")) {
        intentSuffix = "for Mandir Pooja";
      }
    } else if (isAngel) {
      if (!lowerName.includes("reiki") && !lowerName.includes("healing")) {
        intentSuffix = "for Reiki Healing & Positive Energy";
      }
    } else if (isGanesh || isShiva || isKrishna || isHanuman || isLaxmi || isMahaveer) {
      const hasMurtiWord = lowerName.includes("idol") || lowerName.includes("statue") || lowerName.includes("murti");
      if (!hasMurtiWord) {
        baseName += " Idol Statue";
      }
      if (!lowerName.includes("temple") && !lowerName.includes("vastu") && !lowerName.includes("pooja")) {
        intentSuffix = "for Home Temple & Vastu";
      }
    }

    const specParts = [size, shippingWeight].filter(Boolean);
    const specString = specParts.length > 0 ? `(${specParts.join(", ")})` : "";

    let feedTitle = `${baseName} ${intentSuffix} ${specString}`.replace(/\s{2,}/g, " ").trim();
    if (feedTitle.length > 145) {
      feedTitle = `${baseName} ${specString}`.replace(/\s{2,}/g, " ").trim();
    }

    // High-Intent Custom Titles & Overrides for Maximum CTR and Google Shopping Relevance
    const HIGH_INTENT_TITLES = {
      "green-jade-panchmukhi-shivling": "Natural Green Jade Stone Panchmukhi Shivling for Home Temple",
      "tirupati-balaji-in-tiger-eye": "Natural Tiger Eye Hand-Carved Tirupati Balaji Idol Statue for Mandir & Vastu (9 Inch, 3.6 kg)",
      "crystal-clear-mahvaveer-ji-statue": "Authentic Sphatik Crystal Clear Bhagwan Mahaveer Swami Statue for Jain Mandir (7 Inch, 500 g)",
      "blue-sodalite-carved-lord-shiva-statue": "Natural Blue Sodalite Hand Carved Lord Shiva Idol Statue for Home Temple (5 Inch, 1 kg)",
      "natural-sphatik-shivling": "Original 100% Natural Sphatik (Clear Quartz) Shivling for Pooja & Daily Jalabhishek (1 Inch, 20 g)",
      "green-jade-shree-yantra": "Original Green Jade Shree Yantra 3D Meru for Wealth & Vastu (1 Inch, 50 g)",
      "clear-crystal-quartz-shivling-with-shiva-face": "Natural Sphatik Crystal Quartz Shivling with Shiva Face (Mukhalingam) for Home Temple (1 Inch, 500 g)",
      "blue-sapphire-carving-shiva-statue": "Natural Blue Sapphire (Neelam) Hand Carved Shiva Idol Statue for Home Temple (2 Inch)",
      "goddess-kali-in-black-obsidian": "Hand Carved Natural Black Obsidian Goddess Kali Maa Statue for Mandir & Vastu (11 Inch, 3.8 kg)",
      "natural-blue-sodalite-hanuman-ji-statue": "Natural Blue Sodalite Hand Carved Hanuman Ji Statue for Home Temple & Vastu (5 Inch, 1 kg)",
      "green-jade-shivling": "Natural Green Jade Stone Shivling for Home Temple & Jalabhishek (1 Inch, 20 g)",
      "special-sphatik-crystal-lingam-for-temple": "Large Original Sphatik Crystal Shiva Lingam for Temple Mandir (13 Inch, 16.3 kg)",
      "natural-ruby-shivling": "Original Natural Ruby (Manikya) Gemstone Shivling for Home Temple & Jalabhishek (1 Inch, 50 g)",
      "pyrite-gemston-shivling": "Natural Golden Pyrite Gemstone Shivling for Wealth & Home Temple (1 Inch, 20 g)",
      "amethyst-gemston-angel": "Natural Amethyst Gemstone Carved Angel for Reiki Healing & Positive Energy (1 Inch, 37 g)",
      "gemston-amethyst-diya": "Handcrafted Natural Amethyst Gemstone Diya for Mandir Pooja (2.5 Inch, 66 g)",
      "gemston-ruby-shree-yantra": "Natural Manikya Ruby Gemstone Shree Yantra 3D Meru for Wealth & Vastu (1 Inch, 40 g)",
      "green-jade-elephant-staute": "Hand Carved Natural Green Jade Elephant Statue for Vastu & Good Luck (1 Inch, 100 g)",
      "green-jade-shiva-statue-with-gold-panting": "Natural Green Jade Shiva Statue with Real Gold Painting for Home Temple (5 Inch, 5 kg)",
      "green-jade-carved-shree-krishana-statue": "Natural Green Jade Hand Carved Shree Krishna Statue for Home Temple & Vastu (15 Inch, 10 kg)",
      "tea-set-in-crystal-quartz": "Luxury Handcrafted Natural Clear Quartz Crystal Tea Set (Teapot with 4 Cups, 2.45 kg)",
      "rose-quartz-carved-shree-krishna-ji-idol": "Natural Rose Quartz Hand Carved Shree Krishna Idol for Home Temple & Love (4 Inch, 5 kg)",
      "rose-quartz-bhagwan-mahaveer-statue": "Natural Pink Rose Quartz Bhagwan Mahaveer Swami Statue for Jain Mandir (5 Inch, 1 kg)",
      "tiger-eye-carving-shiva-statue": "Natural Tiger Eye Hand Carved Lord Shiva Statue for Home Temple & Protection (4 Inch, 500 g)",
      "smokey-quartz-crystal-shiva-face-idol": "Natural Smokey Quartz Crystal Shiva Face Idol for Home Temple & Vastu (5 Inch, 200 g)",
      "natural-opal-stone-shivling": "Natural White Opal Stone Shivling for Home Temple & Jalabhishek (1 Inch, 20 g)",
      "natural-labradorite-gemstone-shivling": "Natural Labradorite Gemstone Shivling with Blue Fire for Jalabhishek (1 Inch, 20 g)",
      "natural-howlite-gemstone-shivling": "Natural White Howlite Gemstone Shivling for Peace & Jalabhishek (1 Inch, 20 g)",
      "natural-tiger-eye-gemstone-shivling": "Natural Tiger Eye Gemstone Shivling for Power & Jalabhishek (1 Inch, 20 g)",
      "rose-quartz-shiva-statue-with-gold-painting": "Natural Rose Quartz Shiva Statue with 24K Gold Painting for Home Temple (10 Inch, 1 kg)",
      "green-jade-mahalakshmi-ji-idol": "Natural Green Jade Goddess Mahalakshmi Ji Idol for Wealth & Diwali Pooja (5 Inch, 1 kg)",
      "green-jade-goddess-maa-saraswati-carving": "Natural Green Jade Goddess Maa Saraswati Statue for Vidya & Temple (5 Inch, 1 kg)",
      "green-aventurine-parshvanath-ji-statue": "Natural Green Aventurine Parshvanath Ji Tirthankara Statue for Jain Mandir (5 Inch, 1 kg)",
      "australian-jade-chrysoprase-ganesha": "Natural Australian Jade Chrysoprase Ganesha Statue with Arch (7 Inch, 1.45 kg)",
      "ruby-panchmukhi-ganesha-carving-833": "Natural Ruby Panchmukhi Ganesha Carving with Zoisite Arch (833 Carats, 167 g)",
      "milky-quartz-ganesh-statue-with-gold": "Natural Milky Quartz Ganesh Statue with 24K Gold Foil Painting (6.5 Inch, 1.35 kg)",
      "natural-hand-carved-rose-quartz-ganesha": "Hand-Carved Natural Rose Quartz Ganesha Gemstone Statue for Home Mandir (4.5 Inch, 850 g)",
      "natural-handmade-emerald-ganesha-statue": "Natural Handmade Emerald Ganesha Gemstone Statue for Temple & Vastu (1420 Carats, 284 g)",
      "ruby-ganesha-2195-carat-hand-carved-ruby": "Large Natural Ruby Ganesha 2195 Carat Hand Carved Gemstone Statue in Zoisite (5.2 Inch, 439 g)",
      "ruby-ganesha-idol-25-handcrafted-statue": "Handcrafted Natural Ruby Ganesha Idol 2.5 Inch Gemstone Statue (560 Carats, 112 g)",
      "blue-sapphire-shiva-head-handmade": "Natural Blue Sapphire Shiva Head Handmade Gemstone Sculpture (5.5 Inch, 1.15 kg)",
      "ruby-zoisite-ganesha-statue-hand-carved": "Hand Carved Natural Ruby Zoisite Ganesha Statue with Floral Arch (4.8 Inch, 1180 Carats)",
      "natural-emerald-green-stone-shivling": "Natural Emerald Green Stone Shivling for Jalabhishek & Home Temple (2.8 Inch, 420 g)",
      "breathtaking-natural-hessonite-garnet-shivling": "Breathtaking Natural Hessonite Garnet (Gomed) Shivling for Rahu Shanti (2.6 Inch, 385 g)",
      "emerald-ganesh-statue-3625-carat-ganesh": "Museum Grade Natural Emerald Ganesh Statue Hand-Carved (3625 Carats, 725 g)"
    };

    if (HIGH_INTENT_TITLES[slug]) {
      feedTitle = HIGH_INTENT_TITLES[slug];
    }

    const CUSTOM_FEED_DESCS = {
      "green-jade-panchmukhi-shivling": `Authentic Natural Green Jade Stone Panchmukhi Shivling (${prod.weight || "1 kg to 10 kg"}, ${prod.size || "1 inch to 6 inch"}) handcrafted by Jaipur master artisans. Sacred Pashupatinath Mahadev Swaroop with 5 divine faces (Sadyojata, Vamadeva, Aghora, Tatpurusha, Ishana) for home pooja and Jalabhishek at factory direct price.`,
      "tirupati-balaji-in-tiger-eye": `Handcrafted from certified 100% natural earth-mined Tiger Eye gemstone, this auspicious Lord Tirupati Balaji (Venkateswara) idol statue is masterfully sculpted by hereditary lapidaries in Jaipur. Known for attracting unbounded financial prosperity, removing Vastu dosha, and dissolving debts. Ideal for home temple and office worship.`,
      "crystal-clear-mahvaveer-ji-statue": `Sacred 100% authentic natural Sphatik (clear quartz crystal) Bhagwan Mahaveer Swami idol statue hand-carved in Jaipur for Jain Derasar, home mandir, and spiritual meditation. Pure, unblemished, cold-to-touch crystal blessed for peace, ahimsa, and spiritual elevation.`,
      "blue-sodalite-carved-lord-shiva-statue": `Majestic Lord Shiva idol hand-carved from genuine deep royal-blue Sodalite gemstone by Jaipur master craftsmen. Complete with divine blessing posture for home temple worship, positive aura, and spiritual protection.`,
      "natural-sphatik-shivling": `Original 100% natural certified Sphatik (Clear Quartz) Shivling for daily Jalabhishek and home temple pooja. Hand-carved in sacred Vedic Shilpa Shastra proportions by master artisans of Jaipur (est. 1989). Radiates divine peaceful vibrations.`,
      "green-jade-shree-yantra": `Authentic 100% natural Green Jade Shree Yantra 3D Meru hand-carved by Jaipur master lapidaries. Sacred geometric Yantraraj for continuous financial growth, Kubera blessings, and Vastu energization.`,
      "australian-jade-chrysoprase-ganesha": `Exquisitely hand-carved from certified Australian Jade Chrysoprase gemstone by master lapidaries in Jaipur. Features Lord Ganesha seated on a lotus base beneath an intricately carved sacred Prabhavali arch with divine Mooshak attendants. 100% natural earth-mined gemstone at Jaipur direct manufacturer price.`,
      "ruby-panchmukhi-ganesha-carving-833": `Auspicious 833-carat natural corundum Ruby Panchmukhi (5-faced) Ganesha idol masterfully carved with natural green zoisite backing. Symbolizes multi-dimensional spiritual protection, obstacle removal, and cosmic blessings. Certified authentic gemstone from Jaipur.`,
      "milky-quartz-ganesh-statue-with-gold": `Regal Lord Ganesha idol meticulously carved from solid natural milky quartz crystal and adorned with authentic 24K pure gold foil relief artwork. Brings divine peace, purity, and luxurious Vastu harmony to living spaces and temple altars.`,
      "natural-hand-carved-rose-quartz-ganesha": `Sculpted from genuine translucent pink Madagascar Rose Quartz, this divine Lord Ganesha idol radiates unconditional love, heart healing, and peaceful family harmony. Expertly hand-polished with sacred lotus throne at direct factory price.`,
      "natural-handmade-emerald-ganesha-statue": `Crafted from 100% natural earth-mined green Emerald gemstone (1420 Carats), featuring intricate crown detailing, sacred modak, and mirror-finished lotus pedestal. Highly auspicious for Mercury (Budh) alignment, commercial success, and intelligence.`,
      "ruby-ganesha-2195-carat-hand-carved-ruby": `Magnificent 2195-carat natural Ruby Ganesha sculpture seated inside an organic carved green Zoisite arch. Authentic collector-grade masterpiece directly from the gemstone capital of Jaipur with lab certification.`,
      "ruby-ganesha-idol-25-handcrafted-statue": `Handcrafted 2.5-inch natural Ruby Ganesha idol in divine Abhaya Mudra posture. Carved from genuine untreated Ruby corundum with rich deep magenta tones. Sacred Vastu idol for office desk, home temple, and auspicious gifting.`,
      "blue-sapphire-shiva-head-handmade": `Monumental hand-carved Shiva Head (Mukhalingam) sculpture sculpted from natural Blue Sapphire corundum (1.15 kg / 5750 Carats). Displays intricate matted Jata hair, sacred crescent moon, third-eye Tripundra, and coiled serpent. Masterpiece of Jaipur heritage carving.`,
      "ruby-zoisite-ganesha-statue-hand-carved": `Divine Lord Ganesha hand-sculpted from natural Ruby in Zoisite gemstone featuring a dual-tone carved floral arch. Harnesses the vibrant passion of natural Ruby and the revitalizing heart chakra energy of Zoisite.`,
      "natural-emerald-green-stone-shivling": `Sacred Natural Emerald Green Stone Shivling (420 g, 2.8 Inch) complete with smooth polished lingam pillar and traditionally carved Jaladhari Yoni base. Pure, non-porous natural stone ideal for daily sacred Jalabhishek and temple worship.`,
      "breathtaking-natural-hessonite-garnet-shivling": `Rare and sacred natural Hessonite Garnet (Gomed) Shivling handcrafted in Jaipur with smooth glossy mirror polish. Displays warm cinnamon-amber tones with authentic natural inclusions. Revered in Vedic astrology for neutralizing Rahu dosha and elevating spiritual focus.`,
      "emerald-ganesh-statue-3625-carat-ganesh": `Extraordinary 3625-carat museum-grade Natural Emerald Ganesha statue. Hand-sculpted over months by Jaipur master artisans with elaborate beaded crown, sacred ornaments, and floral motifs. Truly one-of-a-kind divine heirloom.`
    };

    const feedDesc = CUSTOM_FEED_DESCS[slug] || cleanDesc;

    gmcXml += `    <item>\n`;
    gmcXml += `      <g:id>${prod._id}</g:id>\n`;
    gmcXml += `      <g:title>${escapeXml(feedTitle)}</g:title>\n`;
    gmcXml += `      <g:description>${escapeXml(feedDesc)}</g:description>\n`;
    gmcXml += `      <g:link>${prodUrl}</g:link>\n`;
    gmcXml += `      <g:image_link>${imageMain.replace(/&/g, "&amp;")}</g:image_link>\n`;
    // Additional images (up to 10 additional images per GMC spec, clean without query params)
    const gmcAdditionalImages = [];
    for (let i = 2; i <= 10; i++) {
      const secImgPath = path.join(__dirname, `../public/images/${cleanProductSlug}-${i}.webp`);
      if (fs.existsSync(secImgPath)) {
        gmcAdditionalImages.push(`${BASE_URL}/images/${cleanProductSlug}-${i}.webp`);
      }
    }
    if (Array.isArray(prod.images)) {
      for (let i = 1; i < prod.images.length; i++) {
        const raw = typeof prod.images[i] === "string" ? prod.images[i] : (prod.images[i]?.url || "");
        if (raw) {
          const fullUrl = raw.startsWith("http") ? raw : `${BASE_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;
          if (fullUrl !== imageMain && !gmcAdditionalImages.includes(fullUrl)) {
            gmcAdditionalImages.push(fullUrl);
          }
        }
      }
    }
    gmcAdditionalImages.slice(0, 10).forEach((addImg) => {
      gmcXml += `      <g:additional_image_link>${addImg.replace(/&/g, "&amp;")}</g:additional_image_link>\n`;
    });
    gmcXml += `      <g:availability>${(prod.stock === 0 || prod.stock === "0") ? "out_of_stock" : "in_stock"}</g:availability>\n`;
    gmcXml += `      <g:price>${priceNum.toFixed(2)} INR</g:price>\n`;
    gmcXml += `      <g:brand>Crystal Jaipuria</g:brand>\n`;
    gmcXml += `      <g:mpn>${slug}</g:mpn>\n`;
    gmcXml += `      <g:condition>new</g:condition>\n`;
    gmcXml += `      <g:google_product_category>Religious &amp; Ceremonial &gt; Religious Items</g:google_product_category>\n`;
    gmcXml += `      <g:product_type>Gemstones &gt; ${categoryName}</g:product_type>\n`;
    gmcXml += `      <g:identifier_exists>no</g:identifier_exists>\n`;
    gmcXml += `      <g:color>${color}</g:color>\n`;
    gmcXml += `      <g:material>${material}</g:material>\n`;
    gmcXml += `      <g:product_highlight>100% Earth-Mined ${escapeXml(material)} (Zero Synthetic or Resin)</g:product_highlight>\n`;
    gmcXml += `      <g:product_highlight>Handcrafted by Hereditary Master Artisans in Jaipur, Rajasthan</g:product_highlight>\n`;
    gmcXml += `      <g:product_highlight>5-Layer Sacred Shockproof Packaging (100% Breakage-Free Guarantee)</g:product_highlight>\n`;
    gmcXml += `      <g:product_highlight>7-Day Replacement Guarantee with Free Express Delivery Across India</g:product_highlight>\n`;
    gmcXml += `      <g:product_detail>\n`;
    gmcXml += `        <g:section_name>General</g:section_name>\n`;
    gmcXml += `        <g:attribute_name>Material</g:attribute_name>\n`;
    gmcXml += `        <g:attribute_value>${escapeXml(material)}</g:attribute_value>\n`;
    gmcXml += `      </g:product_detail>\n`;
    gmcXml += `      <g:product_detail>\n`;
    gmcXml += `        <g:section_name>Origin</g:section_name>\n`;
    gmcXml += `        <g:attribute_name>Manufactured In</g:attribute_name>\n`;
    gmcXml += `        <g:attribute_value>Jaipur, Rajasthan, India</g:attribute_value>\n`;
    gmcXml += `      </g:product_detail>\n`;
    gmcXml += `      <g:product_detail>\n`;
    gmcXml += `        <g:section_name>Authenticity</g:section_name>\n`;
    gmcXml += `        <g:attribute_name>Certification</g:attribute_name>\n`;
    gmcXml += `        <g:attribute_value>100% Earth-Mined Natural Gemstone</g:attribute_value>\n`;
    gmcXml += `      </g:product_detail>\n`;
    gmcXml += `      <g:return_policy_label>Free 7-Day Replacement</g:return_policy_label>\n`;
    if (size) {
      gmcXml += `      <g:size>${size}</g:size>\n`;
    }
    if (shippingWeight) {
      gmcXml += `      <g:shipping_weight>${shippingWeight}</g:shipping_weight>\n`;
    }
    gmcXml += `      <g:min_handling_time>1</g:min_handling_time>\n`;
    gmcXml += `      <g:max_handling_time>2</g:max_handling_time>\n`;
    gmcXml += `      <g:transit_time_label>Standard 3-7 Days</g:transit_time_label>\n`;
    gmcXml += `      <g:shipping>\n`;
    gmcXml += `        <g:country>IN</g:country>\n`;
    gmcXml += `        <g:service>Standard Safe Express Delivery</g:service>\n`;
    gmcXml += `        <g:price>0.00 INR</g:price>\n`;
    gmcXml += `        <g:min_handling_time>1</g:min_handling_time>\n`;
    gmcXml += `        <g:max_handling_time>2</g:max_handling_time>\n`;
    gmcXml += `        <g:min_transit_time>3</g:min_transit_time>\n`;
    gmcXml += `        <g:max_transit_time>7</g:max_transit_time>\n`;
    gmcXml += `      </g:shipping>\n`;
    gmcXml += `    </item>\n`;
  });

  gmcXml += `  </channel>\n`;
  gmcXml += `</rss>\n`;

  const gmcPath = path.join(publicDir, "google-products.xml");
  fs.writeFileSync(gmcPath, gmcXml, "utf-8");
  console.log(`Successfully generated ${gmcPath}!`);

  // ----------------------------------------------------
  // Generate Local Inventory Feed for Google Merchant Free Local Listings
  // ----------------------------------------------------
  let storeCode = "11769123335765617743";
  const storeCodeFile = path.join(__dirname, "../store_code.txt");
  if (fs.existsSync(storeCodeFile)) {
    storeCode = fs.readFileSync(storeCodeFile, "utf-8").trim();
  } else if (process.env.GOOGLE_STORE_CODE) {
    storeCode = process.env.GOOGLE_STORE_CODE.trim();
  }

  let localXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  localXml += `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n`;
  localXml += `  <channel>\n`;
  localXml += `    <title>Crystal Jaipuria - Local Product Inventory</title>\n`;
  localXml += `    <link>${BASE_URL}</link>\n`;
  localXml += `    <description>Local in-store product inventory for Crystal Jaipuria store in Jaipur.</description>\n`;

  let localTsv = `store_code\tid\tavailability\tprice\tquantity\tpickup_method\tpickup_sla\n`;

  products.forEach((prod) => {
    const slug = prod.slug || prod._id;
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
      if (match && Number(match[0]) > 0) priceNum = Number(match[0]);
    }
    const isOutOfStock = prod.stock === 0 || prod.stock === "0";
    const availability = isOutOfStock ? "out_of_stock" : "in_stock";
    const priceStr = `${priceNum.toFixed(2)} INR`;

    localXml += `    <item>\n`;
    localXml += `      <g:store_code>${storeCode}</g:store_code>\n`;
    localXml += `      <g:id>${prod._id}</g:id>\n`;
    localXml += `      <g:availability>${availability}</g:availability>\n`;
    localXml += `      <g:price>${priceStr}</g:price>\n`;
    localXml += `      <g:quantity>10</g:quantity>\n`;
    localXml += `      <g:pickup_method>buy</g:pickup_method>\n`;
    localXml += `      <g:pickup_sla>same_day</g:pickup_sla>\n`;
    localXml += `    </item>\n`;

    localTsv += `${storeCode}\t${prod._id}\t${availability}\t${priceStr}\t10\tbuy\tsame_day\n`;
  });

  localXml += `  </channel>\n`;
  localXml += `</rss>\n`;

  const localXmlPath = path.join(publicDir, "local-inventory.xml");
  fs.writeFileSync(localXmlPath, localXml, "utf-8");
  console.log(`Successfully generated ${localXmlPath}!`);

  const localTsvPath = path.join(publicDir, "local-inventory.tsv");
  fs.writeFileSync(localTsvPath, localTsv, "utf-8");
  console.log(`Successfully generated ${localTsvPath}!`);
};

generateSitemap();
