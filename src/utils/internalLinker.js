/**
 * src/utils/internalLinker.js
 * 
 * Intelligent, Google-compliant Internal Linking Engine.
 * 
 * Complies with Google Search Essentials & Internal Linking Guidelines:
 * 1. Helpful & Natural Anchor Text: Meaningful descriptive phrases, zero spam or keyword stuffing.
 * 2. Strict Frequency Cap: Maximum 1 link per destination URL per page.
 * 3. Density Control: Max 4-6 links total per long-form article, 1-2 per short category intro.
 * 4. Safety First: NEVER replaces inside existing <a> tags, headings (h1-h6), <code>, <script>,
 *    or HTML element attributes (alt, title, src, href).
 * 5. Automatic Scalability: Works seamlessly on existing blogs, new blogs, category intros,
 *    and static prerendering.
 */

export const INTERLINK_RULES = [
  // 1. BRAND & HOMEPAGE
  {
    targetUrl: "/",
    label: "Crystal Jaipuria",
    priority: 10,
    keywords: [
      "Crystal Jaipuria",
      "Jaipur gemstone manufacturer",
      "Jaipur lapidary artisan",
      "Jaipur gemstone carving workshop",
    ],
  },

  // 2. CORE CATEGORIES
  {
    targetUrl: "/god-statues",
    label: "Gemstone God Statues",
    priority: 9,
    keywords: [
      "gemstone God statues",
      "gemstone deity idols",
      "handcrafted deity murtis",
      "natural gemstone God statues",
      "hand-carved Hindu God statues",
    ],
  },
  {
    targetUrl: "/shivling",
    label: "Gemstone Shivling",
    priority: 9,
    keywords: [
      "natural gemstone Shivling",
      "gemstone Shivlings",
      "Sphatik Shivlings",
      "natural quartz Shivling",
      "Shiva Lingam",
    ],
  },
  {
    targetUrl: "/shree-yantra",
    label: "Crystal Shree Yantra",
    priority: 9,
    keywords: [
      "3D Meru Shree Yantra",
      "crystal Shree Yantra",
      "Sphatik Shree Yantra",
      "3D Meru crystal Shree Yantra",
      "sacred Shree Yantra",
    ],
  },
  {
    targetUrl: "/crystal-statues",
    label: "Crystal Statues & Carvings",
    priority: 8,
    keywords: [
      "crystal statues",
      "handcrafted crystal statues",
      "gemstone animal carvings",
      "healing crystal carvings",
      "crystal carvings",
    ],
  },
  {
    targetUrl: "/luxurious-idols-decor",
    label: "Luxurious Gemstone Idols",
    priority: 7,
    keywords: [
      "luxurious gemstone idols",
      "luxury gemstone statues",
      "high-end gemstone decor",
      "monumental gemstone idols",
    ],
  },
  {
    targetUrl: "/shop",
    label: "Gemstone Collection",
    priority: 6,
    keywords: [
      "handcrafted gemstone collection",
      "all gemstone statues",
      "gemstone idol catalog",
    ],
  },

  // 3. TRUST & AUTHENTICITY RESOURCE
  {
    targetUrl: "/gemstone-authenticity-guide",
    label: "Gemstone Authenticity Guide",
    priority: 10,
    keywords: [
      "Gemstone Authenticity Guide",
      "verify natural gemstones",
      "how to test natural quartz",
      "authentic gemstone testing",
      "identifying natural Sphatik",
    ],
  },

  // 4. FLAGSHIP INTENT PRODUCTS (Targeted conversion anchors)
  {
    targetUrl: "/product/natural-sphatik-shivling",
    label: "Natural Sphatik Shivling",
    priority: 8,
    keywords: [
      "natural Sphatik Shivling",
      "pure Sphatik Shivling",
      "Clear Quartz Shivling",
    ],
  },
  {
    targetUrl: "/product/green-jade-ganesha-statue",
    label: "Green Jade Ganesha Statue",
    priority: 8,
    keywords: [
      "Green Jade Ganesha statue",
      "hand-carved Green Jade Ganesha",
      "Jade Ganesha statue",
      "Green Jade Ganesha",
    ],
  },
  {
    targetUrl: "/product/crystal-shree-yantra-100-certified",
    label: "Certified Crystal Shree Yantra",
    priority: 8,
    keywords: [
      "Clear Quartz Shree Yantra",
      "certified crystal Shree Yantra",
    ],
  },
  {
    targetUrl: "/product/rose-quartz-ganesha-statue",
    label: "Rose Quartz Ganesha Statue",
    priority: 7,
    keywords: [
      "Rose Quartz Ganesha statue",
      "Rose Quartz Ganesha",
    ],
  },
  {
    targetUrl: "/product/7-running-horses-in-lapis-lazuli",
    label: "7 Running Horses in Lapis Lazuli",
    priority: 7,
    keywords: [
      "7 Running Horses in Lapis Lazuli",
      "Lapis Lazuli 7 horses",
      "7 running horses carving",
    ],
  },
  {
    targetUrl: "/product/natural-red-jasper-gemstone-shivling",
    label: "Red Jasper Shivling",
    priority: 7,
    keywords: [
      "natural Red Jasper Shivling",
      "Red Jasper Shivling",
    ],
  },
  {
    targetUrl: "/product/rose-quartz-pair-of-swan",
    label: "Rose Quartz Pair of Swans",
    priority: 7,
    keywords: [
      "Pair of Swans in Rose Quartz",
      "Rose Quartz pair of swans",
      "pair of swans for Vastu",
    ],
  },
  {
    targetUrl: "/product/green-jade-elephant-staute",
    label: "Green Jade Elephant Statue",
    priority: 7,
    keywords: [
      "Green Jade elephant statue",
      "Jade elephant carving",
    ],
  },

  // 5. EDITORIAL GUIDES & DEEP CONTEXTUAL CROSS-LINKING
  {
    targetUrl: "/blog/how-to-choose-gemstone-sculpture",
    label: "Gemstone Sculpture Buyer's Guide",
    priority: 8,
    keywords: [
      "how to choose a gemstone sculpture",
      "choosing gemstone sculptures",
      "choosing a gemstone sculpture",
    ],
  },
  {
    targetUrl: "/blog/hand-carved-vs-machine-made-stone-decor",
    label: "Hand-Carved vs Machine-Made Stone Guide",
    priority: 8,
    keywords: [
      "hand-carved vs machine-made",
      "machine-assisted stone carving",
      "hand carving vs machine carving",
    ],
  },
  {
    targetUrl: "/blog/how-to-evaluate-gemstone-carving-supplier",
    label: "Evaluating Gemstone Suppliers",
    priority: 8,
    keywords: [
      "evaluate a gemstone carving supplier",
      "evaluating gemstone suppliers",
      "gemstone supplier verification",
    ],
  },
  {
    targetUrl: "/blog/wholesale-gemstone-carvings-india",
    label: "Wholesale Gemstone Sourcing Guide",
    priority: 8,
    keywords: [
      "wholesale gemstone carvings from India",
      "sourcing gemstone carvings from India",
      "wholesale gemstone sourcing",
    ],
  },
  {
    targetUrl: "/blog/how-to-pack-and-ship-stone-sculptures",
    label: "Safe Stone Packaging & Shipping",
    priority: 8,
    keywords: [
      "pack and ship fragile stone sculptures",
      "shipping stone sculptures safely",
      "safe packaging for stone sculptures",
    ],
  },
  {
    targetUrl: "/blog/jaipur-gemstone-carving-tradition",
    label: "Jaipur Gemstone Carving Tradition",
    priority: 8,
    keywords: [
      "Jaipur gemstone carving tradition",
      "Jaipur's gemstone carving tradition",
      "Jaipur lapidary tradition",
    ],
  },
  {
    targetUrl: "/blog/gemstone-carving-process",
    label: "Gemstone Carving Process Guide",
    priority: 7,
    keywords: [
      "gemstone carving process",
      "how gemstone carving works",
    ],
  },
  {
    targetUrl: "/blog/how-to-care-for-gemstone-carvings",
    label: "Gemstone Carving Care Tips",
    priority: 7,
    keywords: [
      "care for gemstone carvings",
      "cleaning gemstone carvings",
    ],
  },
  {
    targetUrl: "/blog/factors-affecting-gemstone-carving-price",
    label: "Gemstone Carving Pricing Factors",
    priority: 7,
    keywords: [
      "factors affecting gemstone carving price",
      "price of a natural gemstone carving",
    ],
  },
  {
    targetUrl: "/blog/sphatik-clear-quartz-vs-glass",
    label: "Sphatik vs Glass Identification Guide",
    priority: 8,
    keywords: [
      "Sphatik vs glass",
      "how to identify real Sphatik",
      "Clear Quartz vs glass",
      "distinguishing real Sphatik from glass",
      "real Sphatik test",
    ],
  },
  {
    targetUrl: "/blog/natural-vs-synthetic-gemstones",
    label: "Natural vs Synthetic Gemstones Guide",
    priority: 8,
    keywords: [
      "natural vs synthetic gemstones",
      "identifying synthetic stones",
      "natural vs lab-grown stones",
      "detecting simulated gemstones",
    ],
  },
  {
    targetUrl: "/blog/gemstone-types-colours-patterns-inclusions",
    label: "Gemstone Inclusions & Patterns Guide",
    priority: 7,
    keywords: [
      "gemstone inclusions and colors",
      "natural gemstone inclusions",
      "gemstone color variations",
    ],
  },
  {
    targetUrl: "/blog/crystal-statues-a-unique-and-meaningful-gift-idea",
    label: "Crystal Statues as Meaningful Gifts",
    priority: 7,
    keywords: [
      "meaningful gemstone gift",
      "crystal statue as a gift",
      "gemstone gifts for housewarming",
      "spiritual gemstone gifts",
    ],
  },
  {
    targetUrl: "/shipping-policy",
    label: "Breakage-Free Shipping Guarantee",
    priority: 6,
    keywords: [
      "breakage-free transit guarantee",
      "shipping and delivery policy",
    ],
  },
  {
    targetUrl: "/about",
    label: "Our Jaipur Lapidary Heritage",
    priority: 6,
    keywords: [
      "Jaipur workshop in Sanganer",
      "35+ years of craftsmanship in Jaipur",
    ],
  },
  {
    targetUrl: "/contact",
    label: "Wholesale & Custom Inquiries",
    priority: 6,
    keywords: [
      "wholesale export desk",
      "custom carving inquiries",
    ],
  },
];

/**
 * Escapes special regex characters in a search term.
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Normalizes a URL for comparison.
 */
function normalizeUrl(url = "") {
  const cleaned = String(url)
    .replace(/^https?:\/\/[^/]+/i, "")
    .trim()
    .toLowerCase();
  if (!cleaned || cleaned === "/") return "/";
  return cleaned.replace(/\/+$/, "");
}

/**
 * Applies natural, Google-compliant internal links to an HTML content string.
 * 
 * @param {string} htmlContent - The raw or processed HTML content
 * @param {Object} options - Configuration options
 * @param {string} [options.currentUrl=""] - The canonical path of current page to prevent self-linking
 * @param {number} [options.maxTotalLinks=5] - Maximum total links to insert per article/section
 * @param {string} [options.linkClass] - Tailwind or CSS class string for anchors
 * @returns {string} The enriched HTML content with natural internal links
 */
export function applySmartInterlinking(htmlContent, options = {}) {
  if (!htmlContent || typeof htmlContent !== "string") return htmlContent || "";

  const {
    currentUrl = "",
    maxTotalLinks = 5,
    linkClass = "font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-2 hover:decoration-amber-800 transition-colors",
  } = options;

  // Normalized current URL to prevent self-linking
  const normalizedCurrentUrl = normalizeUrl(currentUrl);

  // Track URLs already present in the existing HTML or inserted during this run
  const usedUrls = new Set();

  // Scan existing links in the content so we never double-link
  const existingHrefRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let hrefMatch;
  while ((hrefMatch = existingHrefRegex.exec(htmlContent)) !== null) {
    const norm = normalizeUrl(hrefMatch[1]);
    usedUrls.add(norm);
  }

  // Also consider current page as used so we never self-link
  if (normalizedCurrentUrl) {
    usedUrls.add(normalizedCurrentUrl);
  }

  // Tokenize HTML into tags and text segments so we never replace inside HTML tags
  const tokens = htmlContent.split(/(<[^>]+>)/g);

  let inExcludedTag = false;
  let excludedTagName = "";
  let linksInserted = 0;

  // Tags inside which we MUST NEVER insert links:
  // <a> (prevents nested links)
  // <h1>, <h2>, <h3>, <h4>, <h5>, <h6> (Google prefers clean heading texts)
  // <script>, <style>, <code>, <pre>, <button>
  const excludedTagRegex = /^<\/?(a|h[1-6]|script|style|code|pre|button)\b/i;

  // Sort rules by priority descending
  const sortedRules = [...INTERLINK_RULES].sort((a, b) => (b.priority || 0) - (a.priority || 0));

  for (let t = 0; t < tokens.length; t++) {
    if (linksInserted >= maxTotalLinks) break;

    const token = tokens[t];

    // If it's an HTML tag
    if (token.startsWith("<") && token.endsWith(">")) {
      const match = token.match(excludedTagRegex);
      if (match) {
        const tagName = match[1].toLowerCase();
        if (token.startsWith("</")) {
          if (excludedTagName === tagName) {
            inExcludedTag = false;
            excludedTagName = "";
          }
        } else {
          inExcludedTag = true;
          excludedTagName = tagName;
        }
      }
      continue;
    }

    // It's a text node outside tags
    if (inExcludedTag || !token.trim()) continue;

    let textNode = token;

    // Try rules in priority order
    for (const rule of sortedRules) {
      if (linksInserted >= maxTotalLinks) break;

      const normTarget = normalizeUrl(rule.targetUrl);
      if (usedUrls.has(normTarget)) continue;

      // Try keywords for this rule
      for (const kw of rule.keywords) {
        if (linksInserted >= maxTotalLinks) break;
        if (usedUrls.has(normTarget)) break;

        // Word boundary match, case-insensitive
        const kwPattern = new RegExp(`(?<![\\w-])${escapeRegExp(kw)}(?![\\w-])`, "i");
        const match = textNode.match(kwPattern);

        if (match) {
          const matchedText = match[0];
          const matchIndex = match.index;

          // Replace ONLY the first occurrence in this text node
          const replacement = `<a href="${rule.targetUrl}" class="${linkClass}" title="${rule.label}">${matchedText}</a>`;
          textNode = textNode.substring(0, matchIndex) + replacement + textNode.substring(matchIndex + matchedText.length);

          usedUrls.add(normTarget);
          linksInserted++;
          break; // move to next rule once this rule's target URL is linked
        }
      }
    }

    tokens[t] = textNode;
  }

  return tokens.join("");
}
