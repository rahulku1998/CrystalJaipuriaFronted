import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

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

const generateSitemap = async () => {
  console.log("Generating dynamic sitemap.xml and llms.txt...");

  const [productsRes, categoriesRes, blogsRes] = await Promise.all([
    fetchData("/products"),
    fetchData("/categories"),
    fetchData("/blogs"),
  ]);

  const products = productsRes.products || [];
  const categories = categoriesRes.categories || [];
  const blogs = blogsRes.blogs || [];

  console.log(
    `Fetched ${products.length} products, ${categories.length} categories, ${blogs.length} blogs from database.`
  );

  const staticPages = [
    { url: `${BASE_URL}/`, changefreq: "daily", priority: "1.0" },
    { url: `${BASE_URL}/shop`, changefreq: "daily", priority: "0.9" },
    { url: `${BASE_URL}/blog`, changefreq: "weekly", priority: "0.8" },
    { url: `${BASE_URL}/about`, changefreq: "monthly", priority: "0.7" },
    { url: `${BASE_URL}/contact`, changefreq: "monthly", priority: "0.7" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

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
      if (cat.slug) {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}/${cat.slug}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.85</priority>\n`;
        xml += `  </url>\n`;
      }
    });
  }

  // Only include live database products in sitemap.xml
  if (products.length > 0) {
    xml += `\n  <!-- Dynamic Product Pages (${products.length} Live Products) -->\n`;
    products.forEach((prod) => {
      const slug = prod.slug || prod._id;
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/product/${slug}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });
  }

  if (blogs.length > 0) {
    xml += `\n  <!-- Blog Detail Pages (${blogs.length} Stories) -->\n`;
    blogs.forEach((blog) => {
      const slug = blog.slug || blog._id;
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}/blog/${slug}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.75</priority>\n`;
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
  llms += `Crystal Jaipuria is a trusted Jaipur-based gemstone and crystal carving manufacturer with over 35 years of heritage in artisan craftsmanship, wholesale supply, and international export. Every idol and artifact is hand-carved by master artisans using 100% natural, certified gemstones and crystals.\n\n`;
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
  llms += `- [About Us](${BASE_URL}/about): Brand history, 35+ years of craftsmanship, workshop details, and values.\n`;
  llms += `- [Contact Us](${BASE_URL}/contact): Direct contact, manufacturing queries, and wholesale inquiries.\n`;

  if (products.length > 0) {
    llms += `\n## Live Products Catalog (${products.length} Products)\n`;
    products.forEach((prod) => {
      const slug = prod.slug || prod._id;
      const desc = (prod.detail || prod.description || "").replace(/<[^>]*>?/gm, "").slice(0, 100);
      llms += `- [${prod.name}](${BASE_URL}/product/${slug}): ${desc || "Handcrafted natural gemstone product by Crystal Jaipuria."}\n`;
    });
  }

  llms += `\n## Business & Contact Information\n`;
  llms += `- **Brand**: Crystal Jaipuria\n`;
  llms += `- **Address**: Bajni talai, Crystal Jaipuria, Plot No.03 West Part, Prabha, Mangal Vihar, Sanganer, Jaipur, Rajasthan - 302029, India\n`;
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
  gmcXml += `    <description>100% Certified natural gemstone god statues, crystal carvings, Shivlings and spiritual products from Jaipur manufacturer since 1989.</description>\n`;

  products.forEach((prod) => {
    const slug = prod.slug || prod._id;
    const prodUrl = `${BASE_URL}/product/${slug}`;
    const cleanName = (prod.name || "Gemstone Product").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const cleanDesc = (prod.detail || prod.description || cleanName)
      .replace(/<[^>]*>?/gm, "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\r?\n|\r/g, " ")
      .trim()
      .slice(0, 1000);

    let priceNum = 999;
    if (typeof prod.price === "number" && prod.price > 0) {
      priceNum = prod.price;
    } else if (typeof prod.discountPrice === "number" && prod.discountPrice > 0) {
      priceNum = prod.discountPrice;
    } else {
      const raw = String(prod.price || prod.discountPrice || "999").replace(/,/g, "");
      const match = raw.match(/\d+(\.\d+)?/);
      if (match && Number(match[0]) > 0) {
        priceNum = Number(match[0]);
      }
    }
    const imageMain = typeof prod.images?.[0] === "string" ? prod.images[0] : (prod.images?.[0]?.url || `${BASE_URL}/Gemstone.webp`);
    const categoryName = prod.categoryId?.name ? prod.categoryId.name.replace(/&/g, "&amp;") : "Gemstones";

    gmcXml += `    <item>\n`;
    gmcXml += `      <g:id>${prod._id}</g:id>\n`;
    gmcXml += `      <g:title>${cleanName}</g:title>\n`;
    gmcXml += `      <g:description>${cleanDesc}</g:description>\n`;
    gmcXml += `      <g:link>${prodUrl}</g:link>\n`;
    gmcXml += `      <g:image_link>${imageMain}</g:image_link>\n`;
    if (prod.images && prod.images.length > 1) {
      const extraImg = typeof prod.images[1] === "string" ? prod.images[1] : prod.images[1]?.url;
      if (extraImg) {
        gmcXml += `      <g:additional_image_link>${extraImg}</g:additional_image_link>\n`;
      }
    }
    gmcXml += `      <g:availability>${(prod.stock === 0 || prod.stock === "0") ? "out_of_stock" : "in_stock"}</g:availability>\n`;
    gmcXml += `      <g:price>${priceNum.toFixed(2)} INR</g:price>\n`;
    gmcXml += `      <g:brand>Crystal Jaipuria</g:brand>\n`;
    gmcXml += `      <g:condition>new</g:condition>\n`;
    gmcXml += `      <g:google_product_category>Religious &amp; Ceremonial &gt; Religious Items</g:google_product_category>\n`;
    gmcXml += `      <g:product_type>Gemstones &gt; ${categoryName}</g:product_type>\n`;
    gmcXml += `      <g:identifier_exists>no</g:identifier_exists>\n`;
    gmcXml += `      <g:shipping>\n`;
    gmcXml += `        <g:country>IN</g:country>\n`;
    gmcXml += `        <g:service>Standard Safe Delivery</g:service>\n`;
    gmcXml += `        <g:price>0.00 INR</g:price>\n`;
    gmcXml += `      </g:shipping>\n`;
    gmcXml += `    </item>\n`;
  });

  gmcXml += `  </channel>\n`;
  gmcXml += `</rss>\n`;

  const gmcPath = path.join(publicDir, "google-products.xml");
  fs.writeFileSync(gmcPath, gmcXml, "utf-8");
  console.log(`Successfully generated ${gmcPath}!`);
};

generateSitemap();
