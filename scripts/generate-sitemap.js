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

  if (products.length > 0) {
    xml += `\n  <!-- Dynamic Product Pages (${products.length} Products) -->\n`;
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
};

generateSitemap();
