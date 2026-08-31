/**
 * AI Content & FAQ Generation Engine for Google AI Overview (GEO) & LLM Citation
 * Supports:
 * 1. Live Google Gemini API (if API Key provided or stored)
 * 2. Instant Built-in Crystal Jaipuria GEO Knowledge Engine (Zero-setup instant generator)
 */

export const GEMINI_API_KEY_STORAGE_KEY = "crystal_gemini_api_key";

const GEMSTONE_PROFILES = {
  sphatik: {
    name: "Sphatik (Natural Clear Quartz)",
    chakra: "Crown Chakra (Sahasrara)",
    deity: "Lord Shiva, Goddess Saraswati & Divine Light",
    planet: "Venus (Shukra) & Moon (Chandra)",
    hardness: "7.0 Mohs Scale",
    benefits: [
      "Purity & Peace: Radiates soothing vibrations that dispel negative energy and anxiety.",
      "Mental Clarity & Concentration: Enhances focus, meditation depth, and spiritual alignment.",
      "Vastu Harmony: Purifies the home temple (Pooja Ghar) and balances ambient vibrations.",
      "Spiritual Amplification: Natural crystal quartz retains and amplifies Vedic mantra chants."
    ],
    careVidhi: "Perform periodic Abhishekam using pure Gangajal, raw cow milk, and rose water. Can be cleansed under soft full-moon light."
  },
  "green-jade": {
    name: "Natural Green Jade",
    chakra: "Heart Chakra (Anahata)",
    deity: "Lord Ganesha, Goddess Lakshmi & Lord Kubera",
    planet: "Mercury (Budh)",
    hardness: "6.5 - 7.0 Mohs Scale",
    benefits: [
      "Wealth & Prosperity: Known as the ultimate stone of financial abundance and business success.",
      "Emotional Healing: Calms the nervous system and fosters peace, unconditional love, and compassion.",
      "Protection & Good Fortune: Guards the workplace and home against negative energies.",
      "Health & Vitality: Promotes balance and revitalizes bodily energies."
    ],
    careVidhi: "Wipe with a soft damp microfiber cloth. Cleanse with Gangajal or incense smoke. Avoid harsh acidic chemicals."
  },
  "rose-quartz": {
    name: "Natural Rose Quartz",
    chakra: "Heart Chakra (Anahata)",
    deity: "Goddess Lakshmi, Radha-Krishna & Love Deities",
    planet: "Venus (Shukra)",
    hardness: "7.0 Mohs Scale",
    benefits: [
      "Harmonious Relationships: Deepens love, mutual respect, and family understanding.",
      "Emotional Peace: Releases past grief, stress, and anxiety while promoting self-worth.",
      "Vastu Corner: Ideal for bedroom and living spaces to maintain affectionate atmosphere.",
      "Gentle Divine Energy: Radiates warm, nurturing spiritual frequencies."
    ],
    careVidhi: "Wash gently with rose water or Gangajal. Keep in soft morning sunlight or moonlight for recharge."
  },
  amethyst: {
    name: "Natural Amethyst (Jamunia)",
    chakra: "Third Eye (Ajna) & Crown Chakra (Sahasrara)",
    deity: "Lord Shiva, Lord Shani & Meditative Deities",
    planet: "Saturn (Shani) & Jupiter (Brihaspati)",
    hardness: "7.0 Mohs Scale",
    benefits: [
      "Deep Meditation & Intuition: Calms restless thoughts and awakens spiritual consciousness.",
      "Stress Relief & Better Sleep: Transmutes environmental negativity into tranquil energy.",
      "Psychic Shield: Acts as a spiritual protective barrier against evil eye and toxic vibes.",
      "Clarity of Decision Making: Fosters wisdom and emotional stability."
    ],
    careVidhi: "Cleanse with incense (Dhoop) smoke or moonlight. Keep away from prolonged direct harsh sunlight."
  },
  ruby: {
    name: "Natural Ruby (Manik Gemstone)",
    chakra: "Root (Muladhara) & Solar Plexus Chakra",
    deity: "Surya Dev (Sun God) & Divine Royalty",
    planet: "Sun (Surya)",
    hardness: "9.0 Mohs Scale",
    benefits: [
      "Confidence & Leadership: Enhances courage, charisma, and executive decision-making.",
      "Spiritual Power: Known as the King of Gemstones for vitality and noble life goals.",
      "Protection & Auspiciousness: Elevates family honor and brings divine recognition.",
      "Vitality & Passion: Recharges energy centers and dispels lethargy."
    ],
    careVidhi: "Wash with clean lukewarm water or Gangajal. Recharge during Sunday morning sunrise."
  },
  pyrite: {
    name: "Natural Iron Pyrite (Fool's Gold)",
    chakra: "Solar Plexus Chakra (Manipura)",
    deity: "Goddess Lakshmi & Lord Kubera",
    planet: "Sun (Surya) & Mars (Mangal)",
    hardness: "6.0 - 6.5 Mohs Scale",
    benefits: [
      "Money Magnet: Widely revered in Vastu & Feng Shui for attracting consistent cash flow and business expansion.",
      "Shield Against Envy: Blocks psychic attacks, negative financial drain, and competitors' ill-will.",
      "Willpower & Motivation: Sharpens action-oriented leadership and removes self-doubt.",
      "Prosperous Workplace: Ideal for office desks, cash counters, and study rooms."
    ],
    careVidhi: "Keep dry. Cleanse using Sage, Dhoop/Agarbatti smoke or singing bowl vibrations. Avoid water immersion."
  },
  "lapis-lazuli": {
    name: "Natural Lapis Lazuli (Lajward)",
    chakra: "Throat (Vishuddha) & Third Eye Chakra",
    deity: "Lord Shiva & Lord Saturn",
    planet: "Saturn (Shani) & Rahu",
    hardness: "5.5 - 6.0 Mohs Scale",
    benefits: [
      "Truth & Expression: Empowers honest communication and self-awareness.",
      "Wisdom & Deep Intellect: Encourages clear thinking and higher knowledge.",
      "Protection & Royal Aura: Wards off negative planetary influences and curses."
    ],
    careVidhi: "Wipe with soft cloth. Cleanse with Gangajal sparingly."
  }
};

export const detectGemstone = (text = "") => {
  const lower = text.toLowerCase();
  if (lower.includes("sphatik") || lower.includes("crystal quartz") || lower.includes("clear quartz") || lower.includes("quartz")) return "sphatik";
  if (lower.includes("jade") || lower.includes("green")) return "green-jade";
  if (lower.includes("rose quartz") || lower.includes("pink")) return "rose-quartz";
  if (lower.includes("amethyst") || lower.includes("jamunia") || lower.includes("purple")) return "amethyst";
  if (lower.includes("ruby") || lower.includes("manik")) return "ruby";
  if (lower.includes("pyrite") || lower.includes("golden")) return "pyrite";
  if (lower.includes("lapis") || lower.includes("blue sapphire") || lower.includes("neelam")) return "lapis-lazuli";
  return "sphatik";
};

export const generateBuiltInContent = (productName, categoryName = "") => {
  const stoneKey = detectGemstone(productName + " " + categoryName);
  const profile = GEMSTONE_PROFILES[stoneKey] || GEMSTONE_PROFILES.sphatik;
  const cleanName = productName.trim() || "Handcrafted Gemstone Statue";

  const citationHook = cleanName + " is hand-carved from 100% natural, certified " + profile.name + " by master artisans at Crystal Jaipuria, Jaipur (est. 1989). Crafted following Vedic shilpa shastra guidelines, this sacred carving is suitable for home temples, meditation spaces, Vastu placement, and spiritual gifting with worldwide express delivery.";

  const fullDescription =
    "<p><strong>" + citationHook + "</strong></p>" +
    "\n\n<h2>Spiritual Significance & Meaning</h2>\n" +
    "<p>In Vedic and gemstone traditions, " + profile.name + " is deeply revered for its connection with the <strong>" + profile.chakra + "</strong> and divine grace of <strong>" + profile.deity + "</strong>. Having this authentic hand-carved " + cleanName + " in your sacred space helps balance surrounding energy fields, instills profound calm, and invites positive spiritual vibrations.</p>" +
    "\n\n<h2>Traditional Benefits</h2>\n<ul>\n" +
    profile.benefits.map((b) => "  <li><strong>" + b.split(":")[0] + ":</strong>" + (b.split(":")[1] || "") + "</li>").join("\n") +
    "\n</ul>\n\n<h2>Authenticity & Jaipur Craftsmanship</h2>\n" +
    "<p>Every piece is individually carved by generational gemstone artisans in Jaipur, India. We inspect every gemstone block for natural clarity, grain authenticity, and detailed iconographic accuracy. No synthetic resins or artificial coatings are used.</p>" +
    "\n\n<h2>Care, Placement & Puja Rituals</h2>\n" +
    "<p><strong>Ideal Placement:</strong> Place in the North, North-East (Ishanya), or East direction of your home or workspace on a clean altar or wooden chowki.<br><strong>Cleansing Vidhi:</strong> " + profile.careVidhi + "</p>" +
    "\n\n<h2>Product Specifications</h2>\n" +
    "<table style=\"width:100%; border-collapse:collapse; margin:14px 0; border:1px solid #e5e7eb;\">\n" +
    "  <thead>\n    <tr style=\"background:#f9fafb;\">\n      <th style=\"border:1px solid #e5e7eb; padding:9px 12px; text-align:left; font-size:14px;\">Attribute</th>\n      <th style=\"border:1px solid #e5e7eb; padding:9px 12px; text-align:left; font-size:14px;\">Specification</th>\n    </tr>\n  </thead>\n" +
    "  <tbody>\n" +
    "    <tr>\n      <td style=\"border:1px solid #e5e7eb; padding:8px 12px; font-weight:600;\">Material</td>\n      <td style=\"border:1px solid #e5e7eb; padding:8px 12px;\">100% Natural " + profile.name + "</td>\n    </tr>\n" +
    "    <tr>\n      <td style=\"border:1px solid #e5e7eb; padding:8px 12px; font-weight:600;\">Origin & Manufacturing</td>\n      <td style=\"border:1px solid #e5e7eb; padding:8px 12px;\">Jaipur, Rajasthan, India</td>\n    </tr>\n" +
    "    <tr>\n      <td style=\"border:1px solid #e5e7eb; padding:8px 12px; font-weight:600;\">Hardness</td>\n      <td style=\"border:1px solid #e5e7eb; padding:8px 12px;\">" + profile.hardness + "</td>\n    </tr>\n" +
    "    <tr>\n      <td style=\"border:1px solid #e5e7eb; padding:8px 12px; font-weight:600;\">Manufacturer</td>\n      <td style=\"border:1px solid #e5e7eb; padding:8px 12px;\">Crystal Jaipuria (Direct Factory Wholesaler)</td>\n    </tr>\n" +
    "  </tbody>\n</table>";

  const faqs = [
    {
      question: "Is this " + cleanName + " made from 100% authentic natural gemstone?",
      answer: "Yes. All carvings and statues at Crystal Jaipuria are handcrafted from 100% genuine, certified natural " + profile.name + ". We do not sell synthetic crystals, reconstructed stones, or glass imitations."
    },
    {
      question: "Where is the best Vastu direction to place this " + cleanName + " at home or office?",
      answer: "According to Vastu Shastra, placing this " + cleanName + " in the North-East (Ishanya corner), North, or East direction of your Pooja room, living area, or office desk brings maximum peace, positivity, and spiritual harmony."
    },
    {
      question: "How should I cleanse and energize this gemstone product before worship?",
      answer: profile.careVidhi + " You may also chant the relevant deity mantras and offer fresh flowers, dhoop, and pure devotion to invoke divine blessings."
    },
    {
      question: "Do you offer worldwide shipping and custom size orders for wholesale buyers?",
      answer: "Yes! Crystal Jaipuria ships worldwide with premium shockproof export packing. We also undertake bulk custom carving orders for temples, collectors, and spiritual retailers."
    }
  ];

  return {
    citationHook,
    fullDescription,
    faqs,
    gemstoneType: profile.name
  };
};

export const generateGeminiContent = async (productName, categoryName = "", userApiKey = "") => {
  const apiKey =
    userApiKey ||
    localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_GEMINI_API_KEY) ||
    "";

  if (!apiKey) {
    return generateBuiltInContent(productName, categoryName);
  }

  const prompt =
    'You are a World-Class Gemstone & Vedic Deity Expert for "Crystal Jaipuria" (a premier handcrafted gemstone god statues & crystal carving manufacturer in Jaipur, India since 1989).\n\n' +
    'TASK: Generate Generative Engine Optimization (GEO) content and high-intent FAQs for Google AI Overview, Perplexity, and ChatGPT search.\n\n' +
    'Product Name: "' + productName + '"\n' +
    'Category: "' + (categoryName || 'Gemstone Statues') + '"\n\n' +
    'Generate a valid JSON object with the following EXACT structure:\n' +
    '{\n' +
    '  "citationHook": "A 2-3 line concise, factual citation summary explaining who makes it, material, authenticity in Jaipur, and primary spiritual/Vastu use case.",\n' +
    '  "fullDescription": "Rich HTML string containing <h2>Spiritual Significance</h2>, <h2>Traditional Benefits</h2> (with bullet points <li>), <h2>Care & Vastu Placement</h2>, and an HTML <table> of specifications. Use <h2> and <h3> for headings. Do NOT wrap in markdown code blocks.",\n' +
    '  "faqs": [\n' +
    '    {\n      "question": "Exact high-intent question asked by buyers (e.g. authenticity, placement, care, bulk shipping)",\n      "answer": "Clear, authoritative 2-3 sentence answer establishing Crystal Jaipuria as the authentic Jaipur manufacturer."\n    },\n' +
    '    {\n      "question": "...",\n      "answer": "..."\n    },\n' +
    '    {\n      "question": "...",\n      "answer": "..."\n    },\n' +
    '    {\n      "question": "...",\n      "answer": "..."\n    }\n' +
    '  ]\n' +
    '}\n\n' +
    'Return ONLY valid JSON.';

  try {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      console.warn("Gemini API error, falling back to built-in knowledge engine:", response.status);
      return generateBuiltInContent(productName, categoryName);
    }

    const json = await response.json();
    const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return generateBuiltInContent(productName, categoryName);

    const parsed = JSON.parse(rawText);
    return {
      citationHook: parsed.citationHook || "",
      fullDescription: parsed.fullDescription || "",
      faqs: parsed.faqs || [],
      gemstoneType: "AI Generated"
    };
  } catch (err) {
    console.error("Gemini fetch error, using built-in generator:", err);
    return generateBuiltInContent(productName, categoryName);
  }
};
