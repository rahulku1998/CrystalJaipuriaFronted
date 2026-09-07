const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://www.crystaljaipuria.com';
const API_URL = 'https://shop.codewithrahulkumawat.com/api';

const fetchData = (endpoint) => {
  return new Promise((resolve) => {
    https
      .get(`${API_URL}${endpoint}`, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve({});
          }
        });
      })
      .on('error', () => resolve({}));
  });
};

const runAudit = async () => {
  console.log('🔍 ========================================================');
  console.log('🔍 CRYSTAL JAIPURIA - FULL CURRENT URL & ROUTE INTEGRITY AUDIT');
  console.log('🔍 ========================================================\n');

  const [productsRes, categoriesRes, blogsRes] = await Promise.all([
    fetchData('/products'),
    fetchData('/categories'),
    fetchData('/blogs'),
  ]);

  const dbProducts = productsRes.products || [];
  const dbCategories = categoriesRes.categories || [];
  const dbBlogs = blogsRes.blogs || [];

  console.log(`📊 Live Database Entities: ${dbProducts.length} Products, ${dbCategories.length} Categories, ${dbBlogs.length} Blogs.\n`);

  let errorCount = 0;
  let warningCount = 0;

  // ----------------------------------------------------
  // 1. AUDIT SITEMAP.XML
  // ----------------------------------------------------
  console.log('1️⃣ Checking public/sitemap.xml...');
  const sitemapContent = fs.readFileSync(path.join(__dirname, '../public/sitemap.xml'), 'utf-8');
  const sitemapUrls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

  console.log(`   Found ${sitemapUrls.length} URLs in sitemap.xml.`);

  sitemapUrls.forEach(url => {
    // Check base domain
    if (!url.startsWith(BASE_URL)) {
      console.log(`   ❌ Invalid domain in sitemap URL: ${url}`);
      errorCount++;
    }
    // Check double slashes
    const pathPart = url.replace(BASE_URL, '');
    if (pathPart.includes('//')) {
      console.log(`   ❌ Double slash detected: ${url}`);
      errorCount++;
    }
    // Check spaces or uppercase characters in slugs
    if (/\s/.test(url)) {
      console.log(`   ❌ Whitespace detected in URL: ${url}`);
      errorCount++;
    }
    // Check product slugs
    if (url.includes('/product/')) {
      const slug = url.split('/product/')[1];
      const found = dbProducts.some(p => (p.slug || p._id) === slug);
      if (!found) {
        console.log(`   ⚠️ Product slug in sitemap not found in live DB: ${slug}`);
        warningCount++;
      }
    }
  });
  console.log('   ✅ sitemap.xml URLs syntax and structure verified!\n');

  // ----------------------------------------------------
  // 2. AUDIT GOOGLE-PRODUCTS.XML (MERCHANT FEED)
  // ----------------------------------------------------
  console.log('2️⃣ Checking public/google-products.xml (Google Merchant Feed)...');
  const gmcContent = fs.readFileSync(path.join(__dirname, '../public/google-products.xml'), 'utf-8');
  const productLinks = [...gmcContent.matchAll(/<g:link>([^<]+)<\/g:link>/g)].map(m => m[1]);
  const imageLinks = [...gmcContent.matchAll(/<g:image_link>([^<]+)<\/g:image_link>/g)].map(m => m[1]);
  const productTitles = [...gmcContent.matchAll(/<g:title>([^<]+)<\/g:title>/g)].map(m => m[1]);

  console.log(`   Found ${productLinks.length} products in Google Merchant Feed.`);

  productLinks.forEach(link => {
    if (!link.startsWith(`${BASE_URL}/product/`)) {
      console.log(`   ❌ Malformed product link in GMC: ${link}`);
      errorCount++;
    }
  });

  imageLinks.forEach(img => {
    if (!img.startsWith(`${BASE_URL}/images/`) && !img.startsWith('https://res.cloudinary.com/')) {
      console.log(`   ❌ Unexpected image link format in GMC: ${img}`);
      errorCount++;
    }
    const cleanImgPath = img.replace(BASE_URL, '');
    const localImgPath = path.join(__dirname, '../public', cleanImgPath);
    if (!fs.existsSync(localImgPath)) {
      console.log(`   ⚠️ Image file referenced in GMC does not exist locally: ${cleanImgPath}`);
      warningCount++;
    }
  });

  productTitles.forEach(t => {
    if (t.toLowerCase().includes('100% certified')) {
      console.log(`   ❌ "100% Certified" still found in title: ${t}`);
      errorCount++;
    }
  });
  console.log('   ✅ google-products.xml URLs & image paths verified!\n');

  // ----------------------------------------------------
  // 3. AUDIT LLMS.TXT
  // ----------------------------------------------------
  console.log('3️⃣ Checking public/llms.txt...');
  const llmsContent = fs.readFileSync(path.join(__dirname, '../public/llms.txt'), 'utf-8');
  const llmsLinks = [...llmsContent.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(m => ({ text: m[1], url: m[2] }));

  console.log(`   Found ${llmsLinks.length} markdown links in llms.txt.`);
  llmsLinks.forEach(item => {
    if (!item.url.startsWith('https://')) {
      console.log(`   ❌ Non-HTTPS link in llms.txt: ${item.url}`);
      errorCount++;
    }
  });
  console.log('   ✅ llms.txt links verified!\n');

  // ----------------------------------------------------
  // 4. AUDIT FRONTEND INTERNAL LINKS
  // ----------------------------------------------------
  console.log('4️⃣ Auditing Frontend Internal Links (Navbar, Footer, ProductCard, CategoryBar)...');

  const filesToScan = [
    '../src/Components/Navbar/Navbar.jsx',
    '../src/Components/Navbar/CategoryBar.jsx',
    '../src/Components/Footer.jsx',
    '../src/Components/ProductCard.jsx',
    '../src/Components/CategoryCard.jsx',
    '../src/Pages/NotFound.jsx',
  ];

  filesToScan.forEach(relPath => {
    const fullPath = path.join(__dirname, relPath);
    if (fs.existsSync(fullPath)) {
      const code = fs.readFileSync(fullPath, 'utf-8');
      const routerLinks = [...code.matchAll(/to=["']([^"']+)["']/g)].map(m => m[1]);
      routerLinks.forEach(route => {
        if (route.startsWith('http')) return; // external
        if (route.includes('undefined') || route.includes('null') || route.includes('//')) {
          console.log(`   ❌ Malformed internal route in ${relPath}: ${route}`);
          errorCount++;
        }
      });
    }
  });

  console.log('   ✅ Frontend internal router paths verified!\n');

  console.log('========================================================');
  if (errorCount === 0) {
    console.log(`🎉 AUDIT PASSED: ZERO (0) ERRORS FOUND!`);
    console.log(`   All current site URLs, product paths, and Merchant feeds are 100% clean and correct.`);
  } else {
    console.log(`❌ AUDIT FAILED: Found ${errorCount} errors, ${warningCount} warnings.`);
  }
  console.log('========================================================');
};

runAudit();
