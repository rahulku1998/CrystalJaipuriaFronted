import fs from "fs";
import path from "path";
import https from "https";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://www.crystaljaipuria.com";
const API_URL = "https://shop.codewithrahulkumawat.com/api";
const INDEXNOW_KEY = "f8a7e3d1c9b24a5682e0f4a1bc89e123";

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
          } catch {
            resolve({});
          }
        });
      })
      .on("error", () => resolve({}));
  });
};

const postJSON = (urlStr, data, headers = {}) => {
  return new Promise((resolve) => {
    const url = new URL(urlStr);
    const body = JSON.stringify(data);
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          ...headers,
        },
      },
      (res) => {
        let resData = "";
        res.on("data", (chunk) => (resData += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: resData }));
      }
    );
    req.on("error", (err) => resolve({ status: 500, body: err.message }));
    req.write(body);
    req.end();
  });
};

const pingUrl = (urlStr) => {
  return new Promise((resolve) => {
    https
      .get(urlStr, (res) => {
        resolve(res.statusCode);
      })
      .on("error", () => resolve(500));
  });
};

const getGoogleAccessToken = async (serviceAccount) => {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64UrlEncode = (str) =>
    Buffer.from(str)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const unsignedToken =
    base64UrlEncode(JSON.stringify(header)) +
    "." +
    base64UrlEncode(JSON.stringify(claimSet));

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsignedToken);
  const signature = signer
    .sign(serviceAccount.private_key, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = unsignedToken + "." + signature;

  const postBody = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: jwt,
  }).toString();

  return new Promise((resolve) => {
    const req = https.request(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postBody),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed.access_token || null);
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on("error", () => resolve(null));
    req.write(postBody);
    req.end();
  });
};

const runInstantIndexing = async () => {
  console.log("🚀 Starting Instant Indexing & Crawl Acceleration...");
  console.log("==================================================");

  const [productsRes, categoriesRes, blogsRes] = await Promise.all([
    fetchData("/products"),
    fetchData("/categories"),
    fetchData("/blogs"),
  ]);

  const products = productsRes.products || [];
  const categories = categoriesRes.categories || [];
  const blogs = blogsRes.blogs || [];

  const urlList = [
    `${BASE_URL}/`,
    `${BASE_URL}/shop`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
  ];

  categories.forEach((cat) => {
    if (cat.slug) urlList.push(`${BASE_URL}/${cat.slug}`);
  });

  products.forEach((prod) => {
    const slug = prod.slug || prod._id;
    urlList.push(`${BASE_URL}/product/${slug}`);
  });

  blogs.forEach((b) => {
    const slug = b.slug || b._id;
    urlList.push(`${BASE_URL}/blog/${slug}`);
  });

  console.log(`📦 Total ${urlList.length} Live URLs collected for instant indexing.`);

  // 1. IndexNow (Bing / Search Engine Coalition)
  console.log("\n1️⃣ Pinging IndexNow API (Bing / Microsoft Instant Indexing)...");
  try {
    const indexNowPayload = {
      host: "www.crystaljaipuria.com",
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urlList,
    };
    const indexNowRes = await postJSON("https://api.indexnow.org/IndexNow", indexNowPayload);
    if (indexNowRes.status === 200 || indexNowRes.status === 202) {
      console.log(`   ✅ IndexNow: Successfully submitted ${urlList.length} URLs (Status: ${indexNowRes.status})!`);
    } else {
      console.log(`   ℹ️  IndexNow status: ${indexNowRes.status} (Key will activate once deployed)`);
    }
  } catch (err) {
    console.log("   ⚠️ IndexNow error:", err.message);
  }

  // 2. Google Sitemap Ping
  console.log("\n2️⃣ Pinging Google & Bing Sitemaps...");
  const gPing = await pingUrl(`https://www.google.com/ping?sitemap=${BASE_URL}/sitemap.xml`);
  const bPing = await pingUrl(`https://www.bing.com/ping?sitemap=${BASE_URL}/sitemap.xml`);
  console.log(`   ✅ Google Sitemap Ping: ${gPing === 200 ? "SUCCESS (200)" : gPing}`);
  console.log(`   ✅ Bing Sitemap Ping: ${bPing === 200 ? "SUCCESS (200)" : bPing}`);

  // 3. Google Indexing API
  console.log("\n3️⃣ Google Indexing API (Direct Googlebot Instant Crawling)...");
  const serviceAccountPath = path.resolve(__dirname, "../service-account.json");

  if (fs.existsSync(serviceAccountPath)) {
    try {
      const raw = fs.readFileSync(serviceAccountPath, "utf8").replace(/^\uFEFF/, "");
      const sa = JSON.parse(raw);
      const token = await getGoogleAccessToken(sa);

      if (token) {
        console.log(`   🔑 Google OAuth Token Acquired for ${sa.client_email}`);
        let count = 0;
        for (const url of urlList) {
          const res = await postJSON(
            "https://indexing.googleapis.com/v3/urlNotifications:publish",
            { url: url, type: "URL_UPDATED" },
            { Authorization: `Bearer ${token}` }
          );
          if (res.status === 200) {
            count++;
            console.log(`   ✅ [${count}/${urlList.length}] Googlebot Notified: ${url}`);
          } else {
            console.log(`   ⚠️ [${url}] Google Indexing Response: ${res.status} - ${res.body}`);
          }
          await new Promise((r) => setTimeout(r, 150));
        }
        console.log(`\n🎉 Total ${count} URLs submitted to Google Indexing API successfully!`);
      } else {
        console.log("   ⚠️ Failed to generate Google Indexing token. Check private key.");
      }
    } catch (err) {
      console.log("   ⚠️ Google Indexing API Error:", err.message);
    }
  } else {
    console.log('   ℹ️  Note: "service-account.json" not found in root directory.');
    console.log('   👉 Place your Google Cloud Service Account JSON file as "service-account.json" to auto-notify Googlebot for every URL!');
  }

  console.log("\n==================================================");
  console.log("🏁 Instant Indexing Routine Completed!");
};

runInstantIndexing();
