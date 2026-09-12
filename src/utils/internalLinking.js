/**
 * Smart Internal Linking Engine for Crystal Jaipuria
 * Boosts SEO PageRank flow, User Engagement, and AI Engine crawling.
 *
 * RESEARCH-BACKED 6-TIER ARCHITECTURE:
 * 1. Root Brand Authority: "Crystal Jaipuria" -> "/" (Homepage) - NEVER /about
 * 2. Artisan Lineage & Heritage: "about us", "jaipur artisan workshop" -> "/about"
 * 3. E-E-A-T & Trust Authority: "authenticity guide", "certified gemstone", "how to test" -> "/gemstone-authenticity-guide"
 * 4. Vertical Category Hubs: "sphatik shivling", "shree yantra", "god statues" -> parent collection URLs
 * 5. Wholesale & B2B Inquiries: "wholesale", "bulk orders", "custom idol carving" -> "/contact"
 * 6. Complementary Marquee Cross-Linking: Cross-product discovery without self-linking
 */

export const INTERNAL_LINK_DIRECTORY = [
  // 1. ROOT BRAND ANCHORS (HOMEPAGE)
  // Essential for brand navigational authority - NEVER link brand anchor to /about
  {
    keywords: [
      "crystal jaipuria",
      "crystaljaipuria",
      "crystal jaipuria jaipur",
      "crystaljaipuria.com",
    ],
    targetUrl: "/",
    targetTitle: "Crystal Jaipuria - Authentic Gemstone Manufacturer Jaipur",
    type: "brand",
  },

  // 2. HERITAGE & ARTISAN WORKSHOP (ABOUT US)
  // Linked only on historical/artisan/lineage context
  {
    keywords: [
      "about us",
      "jaipur artisan heritage",
      "our jaipur workshop",
      "master lapidary artisans",
      "jaipur gemstone craftsmanship",
      "traditional gemstone carving",
    ],
    targetUrl: "/about",
    targetTitle: "About Crystal Jaipuria & Artisan Heritage",
    type: "page",
  },

  // 3. E-E-A-T & TRUST AUTHORITY (AUTHENTICITY & CONSECRATION GUIDE)
  // High-intent educational hub that builds buyer confidence on high-ticket spiritual idols
  {
    keywords: [
      "gemstone authenticity",
      "authenticity guide",
      "certified natural gemstone",
      "lab certified gemstone",
      "how to test original sphatik",
      "authenticity certification",
      "vedic consecration",
      "shilpa shastra",
      "pran pratishtha",
      "jalabhishekam",
    ],
    targetUrl: "/gemstone-authenticity-guide",
    targetTitle: "Gemstone Authenticity & Consecration Guide",
    type: "guide",
  },

  // 4. VERTICAL CATEGORY HUBS (COMMERCIAL PILLARS)
  {
    keywords: [
      "natural sphatik shivling",
      "sphatik shivling",
      "crystal shivling",
      "gemstone shivling",
      "shiva lingam",
      "narmadeshwar shivling",
      "shiva linga",
      "shivling",
    ],
    targetUrl: "/shivling",
    targetTitle: "Shivling Collection",
    type: "category",
  },
  {
    keywords: [
      "sphatik shree yantra",
      "crystal shree yantra",
      "gemstone shree yantra",
      "3d meru shree yantra",
      "meru shree yantra",
      "sri yantra",
      "shree yantra",
    ],
    targetUrl: "/shree-yantra",
    targetTitle: "Shree Yantra Collection",
    type: "category",
  },
  {
    keywords: [
      "gemstone god statues",
      "crystal god idols",
      "gemstone deity statues",
      "ganesha idol",
      "ganesha murti",
      "shiva statue",
      "krishna statue",
      "hanuman murti",
      "god statues",
      "god idols",
    ],
    targetUrl: "/god-statues",
    targetTitle: "Gemstone God Statues Collection",
    type: "category",
  },
  {
    keywords: [
      "gemstone animal carvings",
      "crystal animal carvings",
      "crystal carvings",
      "gemstone sculptures",
      "crystal statues",
    ],
    targetUrl: "/crystal-statues",
    targetTitle: "Crystal Statues & Carvings Collection",
    type: "category",
  },
  {
    keywords: [
      "guardian angel carving",
      "reiki healing angel",
      "gemstone angel",
      "healing angel",
      "crystal angel",
    ],
    targetUrl: "/angel",
    targetTitle: "Healing Angels Collection",
    type: "category",
  },
  {
    keywords: [
      "gemstone diya",
      "crystal diya",
      "sphatik diya",
      "pooja diya",
      "akhand diya",
    ],
    targetUrl: "/diya",
    targetTitle: "Gemstone Diya Collection",
    type: "category",
  },

  // 5. WHOLESALE & CUSTOM COMMISSIONS (B2B & LARGE BUYERS)
  {
    keywords: [
      "wholesale inquiries",
      "bulk orders",
      "custom idol carving",
      "global gemstone export",
      "temple commissions",
      "contact crystal jaipuria",
    ],
    targetUrl: "/contact",
    targetTitle: "Wholesale & Custom Carving Inquiries",
    type: "page",
  },

  // 6. HIGH-CONVERTING MARQUEE PRODUCTS (CROSS-ENTITY REFERENCING)
  // Only linked when discussing specific minerals/forms other than the current product
  {
    keywords: ["sphatik shivling certified", "clear quartz shivling idol"],
    targetUrl: "/product/natural-sphatik-shivling",
    targetTitle: "Natural Sphatik Shivling",
    slug: "natural-sphatik-shivling",
    type: "product",
  },
  {
    keywords: ["quartz shivling with shiva face", "shiva face shivling idol"],
    targetUrl: "/product/clear-crystal-quartz-shivling-with-shiva-face",
    targetTitle: "Clear Quartz Shivling with Shiva Face",
    slug: "clear-crystal-quartz-shivling-with-shiva-face",
    type: "product",
  },
  {
    keywords: ["green jade shiva statue", "green jade shiva idol"],
    targetUrl: "/product/green-jade-shiva-statue-with-gold-panting",
    targetTitle: "Green Jade Shiva Statue with Gold Painting",
    slug: "green-jade-shiva-statue-with-gold-panting",
    type: "product",
  },
  {
    keywords: ["rose quartz pair of swan", "rose quartz love swans"],
    targetUrl: "/product/natural-rose-quartz-pair-of-swan",
    targetTitle: "Natural Rose Quartz Pair of Swan",
    slug: "natural-rose-quartz-pair-of-swan",
    type: "product",
  },
  {
    keywords: ["ruby shree yantra idol", "gemstone ruby shree yantra carving"],
    targetUrl: "/product/gemston-ruby-shree-yantra",
    targetTitle: "Gemstone Ruby Shree Yantra",
    slug: "gemston-ruby-shree-yantra",
    type: "product",
  },
  {
    keywords: ["blue sapphire shiva statue", "blue sapphire shiva carving"],
    targetUrl: "/product/blue-sapphire-carving-shiva-statue",
    targetTitle: "Blue Sapphire Carving Shiva Statue",
    slug: "blue-sapphire-carving-shiva-statue",
    type: "product",
  },
  {
    keywords: ["green jade krishna statue", "green jade carved krishna"],
    targetUrl: "/product/green-jade-carved-shree-krishana-statue",
    targetTitle: "Green Jade Carved Shree Krishna Statue",
    slug: "green-jade-carved-shree-krishana-statue",
    type: "product",
  },
  {
    keywords: ["golden pyrite shivling", "pyrite gemstone shivling"],
    targetUrl: "/product/pyrite-gemston-shivling",
    targetTitle: "Pyrite Gemstone Shivling",
    slug: "pyrite-gemston-shivling",
    type: "product",
  },
  {
    keywords: ["green jade panchmukhi shivling"],
    targetUrl: "/product/green-jade-panchmukhi-shivling",
    targetTitle: "Green Jade Panchmukhi Shivling",
    slug: "green-jade-panchmukhi-shivling",
    type: "product",
  },
  {
    keywords: ["natural ruby shivling idol", "burmese ruby shivling"],
    targetUrl: "/product/natural-ruby-shivling",
    targetTitle: "Natural Ruby Shivling",
    slug: "natural-ruby-shivling",
    type: "product",
  },
  {
    keywords: ["green jade elephant statue", "green jade elephant carving"],
    targetUrl: "/product/green-jade-elephant-staute",
    targetTitle: "Green Jade Elephant Statue",
    slug: "green-jade-elephant-staute",
    type: "product",
  },
  {
    keywords: ["lapis lazuli shiva linga", "lapis lazuli shivling carving"],
    targetUrl: "/product/lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva",
    targetTitle: "Lapis Lazuli Shiva Linga with Face",
    slug: "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva",
    type: "product",
  },
  {
    keywords: ["green jade shiva face statue", "green jade carving shiva face"],
    targetUrl: "/product/green-jade-carving-shiva-face-statue",
    targetTitle: "Green Jade Carving Shiva Face Statue",
    slug: "green-jade-carving-shiva-face-statue",
    type: "product",
  },
  {
    keywords: ["sphatik shree yantra on kamal", "crystal shree yantra on lotus"],
    targetUrl: "/product/crystal-sphtik-shree-yantra-on-kamal-flower",
    targetTitle: "Crystal Sphatik Shree Yantra on Kamal Flower",
    slug: "crystal-sphtik-shree-yantra-on-kamal-flower",
    type: "product",
  },
  {
    keywords: ["black agate ganesh statue", "black agate ganesha murti carving"],
    targetUrl: "/product/black-agate-gemstone-carving-of-ganesh",
    targetTitle: "Black Agate Gemstone Carving of Ganesh",
    slug: "black-agate-gemstone-carving-of-ganesh",
    type: "product",
  },
  {
    keywords: ["amethyst diya carving", "gemstone amethyst diya"],
    targetUrl: "/product/gemston-amethyst-diya",
    targetTitle: "Gemstone Amethyst Diya",
    slug: "gemston-amethyst-diya",
    type: "product",
  },
  {
    keywords: ["crystal clear mahaveer statue", "mahaveer ji crystal statue"],
    targetUrl: "/product/crystal-clear-mahvaveer-ji-statue",
    targetTitle: "Crystal Clear Mahaveer Ji Statue",
    slug: "crystal-clear-mahvaveer-ji-statue",
    type: "product",
  },
  {
    keywords: ["amethyst healing angel", "amethyst gemstone angel carving"],
    targetUrl: "/product/amethyst-gemston-angel",
    targetTitle: "Amethyst Gemstone Angel",
    slug: "amethyst-gemston-angel",
    type: "product",
  },
];

/**
 * Bulletproof check to prevent self-linking on product pages
 */
export const isSelfLink = (entry, currentSlug = "", currentName = "") => {
  const cleanSlug = (currentSlug || "").toLowerCase().trim();
  const cleanName = (currentName || "").toLowerCase().trim();

  // 1. Direct slug match (e.g. entry.slug === currentSlug)
  if (entry.slug && cleanSlug && entry.slug.toLowerCase() === cleanSlug) {
    return true;
  }

  // 2. Direct targetUrl match against currentSlug
  if (cleanSlug) {
    if (entry.targetUrl === `/product/${cleanSlug}` || entry.targetUrl === `/${cleanSlug}`) {
      return true;
    }
  }

  // 3. Derived slug from currentName
  if (cleanName) {
    const derivedSlug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (entry.slug && entry.slug.toLowerCase() === derivedSlug) {
      return true;
    }
    if (entry.targetUrl === `/product/${derivedSlug}` || entry.targetUrl === `/${derivedSlug}`) {
      return true;
    }
  }

  // 4. If entry is a product, check name containment/similarity
  if (entry.type === "product" && cleanName) {
    const entryTitle = (entry.targetTitle || "").toLowerCase();
    // If titles substantially overlap
    if (cleanName === entryTitle || cleanName.includes(entryTitle) || entryTitle.includes(cleanName)) {
      return true;
    }
    // Check if any product keyword is present in current product's name
    for (const kw of entry.keywords) {
      if (cleanName === kw || (kw.length >= 6 && cleanName.includes(kw))) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Scan content and return smart suggestions
 */
export const scanForInternalLinks = (htmlOrText = "", currentSlug = "", currentName = "") => {
  if (!htmlOrText || typeof htmlOrText !== "string") return [];
  const lower = htmlOrText.toLowerCase();
  const suggestions = [];
  const usedUrls = new Set();

  // Track URLs already linked in content
  for (const entry of INTERNAL_LINK_DIRECTORY) {
    if (lower.includes(`href="${entry.targetUrl}"`) || lower.includes(`href='${entry.targetUrl}'`)) {
      usedUrls.add(entry.targetUrl);
    }
  }

  // Flatten candidates and sort by keyword length descending
  const candidates = [];
  for (const entry of INTERNAL_LINK_DIRECTORY) {
    if (isSelfLink(entry, currentSlug, currentName)) continue;
    if (usedUrls.has(entry.targetUrl)) continue;

    for (const kw of entry.keywords) {
      candidates.push({
        keyword: kw,
        entry,
        length: kw.length,
      });
    }
  }
  candidates.sort((a, b) => b.length - a.length);

  for (const { keyword, entry } of candidates) {
    if (usedUrls.has(entry.targetUrl)) continue;

    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");

    if (regex.test(lower)) {
      suggestions.push({
        keyword,
        targetUrl: entry.targetUrl,
        targetTitle: entry.targetTitle,
        type: entry.type,
      });
      usedUrls.add(entry.targetUrl);
    }
  }

  return suggestions;
};

/**
 * Automatically inject natural internal links into HTML without breaking existing tags or attributes
 */
export const autoInjectInternalLinks = (
  htmlContent = "",
  currentSlug = "",
  maxLinks = 3,
  currentName = ""
) => {
  if (!htmlContent || typeof htmlContent !== "string") return htmlContent;

  // Flatten candidates and sort by keyword length descending
  const candidates = [];
  for (const entry of INTERNAL_LINK_DIRECTORY) {
    if (isSelfLink(entry, currentSlug, currentName)) continue;

    for (const kw of entry.keywords) {
      candidates.push({
        keyword: kw,
        entry,
        length: kw.length,
      });
    }
  }
  candidates.sort((a, b) => b.length - a.length);

  // Split HTML into HTML tags and plain text tokens
  const initialTokens = htmlContent.split(/(<[^>]+>)/g);
  let segments = [];
  let insideAnchor = false;
  let insideHeading = false;

  for (const token of initialTokens) {
    if (!token) continue;
    if (token.startsWith("<") && token.endsWith(">")) {
      const tagLower = token.toLowerCase();

      if (/^<a[\s>]/.test(tagLower)) {
        insideAnchor = true;
      } else if (/^<\/a>/.test(tagLower)) {
        insideAnchor = false;
      }

      if (/^<(h[1-6]|button)[\s>]/.test(tagLower)) {
        insideHeading = true;
      } else if (/^<\/(h[1-6]|button)>/.test(tagLower)) {
        insideHeading = false;
      }

      segments.push({ content: token, isLocked: true });
    } else {
      segments.push({ content: token, isLocked: insideAnchor || insideHeading });
    }
  }

  let linksAdded = 0;
  const usedUrls = new Set();

  // Track URLs already linked in original content
  for (const entry of INTERNAL_LINK_DIRECTORY) {
    if (
      htmlContent.includes(`href="${entry.targetUrl}"`) ||
      htmlContent.includes(`href='${entry.targetUrl}'`)
    ) {
      usedUrls.add(entry.targetUrl);
    }
  }

  for (const { keyword, entry } of candidates) {
    if (linksAdded >= maxLinks) break;
    if (usedUrls.has(entry.targetUrl)) continue;

    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b(${escaped})\\b`, "i");

    let matchedInPass = false;
    const nextSegments = [];

    for (const seg of segments) {
      if (matchedInPass || seg.isLocked) {
        nextSegments.push(seg);
        continue;
      }

      const match = regex.exec(seg.content);
      if (match) {
        const matchIndex = match.index;
        const matchedText = match[0];
        const beforeText = seg.content.slice(0, matchIndex);
        const afterText = seg.content.slice(matchIndex + matchedText.length);

        if (beforeText) {
          nextSegments.push({ content: beforeText, isLocked: false });
        }

        const linkTag = `<a href="${entry.targetUrl}" class="text-indigo-600 font-semibold hover:underline" title="${entry.targetTitle}">${matchedText}</a>`;
        nextSegments.push({ content: linkTag, isLocked: true });

        if (afterText) {
          nextSegments.push({ content: afterText, isLocked: false });
        }

        matchedInPass = true;
        usedUrls.add(entry.targetUrl);
        linksAdded++;
      } else {
        nextSegments.push(seg);
      }
    }

    segments = nextSegments;
  }

  return segments.map((s) => s.content).join("");
};
