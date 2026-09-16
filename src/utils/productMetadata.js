import {
  generateCompetitorMeta,
  detectGemstone,
  detectArchetype,
  GEMSTONE_PROFILES,
  toProperTitleCase,
  generateBestH1Options,
  fetchAIBestH1Options,
} from "./aiGenerator.js";

export { generateBestH1Options, fetchAIBestH1Options };

/**
 * Packs FAQs, custom Meta Title, custom Meta Description, and custom H1 Heading
 * into product data for guaranteed persistence even without backend schema changes.
 */
export const packProductMetadata = ({
  additionalInfo = "",
  faqs = [],
  metaTitle = "",
  metaDescription = "",
  galleryOrder = [],
  heading = "",
  h1 = "",
  vedicVastu = null,
}) => {
  // Strip any old embedded metadata first
  let cleanInfo = (additionalInfo || "")
    .replace(/<!-- FAQS_JSON:[\s\S]*?-->/g, "")
    .replace(/<!-- SEO_META:[\s\S]*?-->/g, "")
    .replace(/<!-- GALLERY_ORDER:[\s\S]*?-->/g, "")
    .replace(/<!-- VEDIC_VASTU_JSON:[\s\S]*?-->/g, "")
    .trim();

  // Valid FAQs only
  const validFaqs = (faqs || []).filter(
    (f) => (f.question && f.question.trim()) || (f.answer && f.answer.trim())
  );

  let packed = cleanInfo;

  if (validFaqs.length > 0) {
    packed += `\n<!-- FAQS_JSON:${JSON.stringify(validFaqs)} -->`;
  }

  const cleanHeading = (heading || h1 || "").trim();
  if (metaTitle.trim() || metaDescription.trim() || cleanHeading) {
    const metaObj = {};
    if (metaTitle.trim()) metaObj.metaTitle = metaTitle.trim();
    if (metaDescription.trim()) metaObj.metaDescription = metaDescription.trim();
    if (cleanHeading) metaObj.heading = cleanHeading;

    packed += `\n<!-- SEO_META:${JSON.stringify(metaObj)} -->`;
  }

  if (Array.isArray(galleryOrder) && galleryOrder.length > 0) {
    packed += `\n<!-- GALLERY_ORDER:${JSON.stringify(galleryOrder)} -->`;
  }

  if (
    vedicVastu &&
    typeof vedicVastu === "object" &&
    (vedicVastu.placementDirection ||
      vedicVastu.chakraPlanet ||
      vedicVastu.poojaVidhi ||
      vedicVastu.vedicBenefits)
  ) {
    packed += `\n<!-- VEDIC_VASTU_JSON:${JSON.stringify(vedicVastu)} -->`;
  }

  return packed;
};

/**
 * Unpacks FAQs, custom Meta Title, custom Meta Description, and custom H1 Heading from product data
 */
export const unpackProductMetadata = (product) => {
  if (!product) {
    return {
      faqs: [],
      metaTitle: "",
      metaDescription: "",
      heading: "",
      galleryOrder: [],
      cleanAdditionalInfo: "",
      vedicVastu: null,
    };
  }

  let rawInfo = product.additionalInfo || "";
  let faqs = [];
  let metaTitle = product.metaTitle || "";
  let metaDescription = product.metaDescription || "";
  let heading = product.heading || product.h1 || "";
  let galleryOrder = [];
  let vedicVastu = null;

  // 1. Direct field check
  if (product.faqs) {
    try {
      faqs = typeof product.faqs === "string" ? JSON.parse(product.faqs) : product.faqs;
    } catch {
      faqs = [];
    }
  }

  // 2. Parse from embedded comments in additionalInfo (or description fallback)
  const faqMatch = rawInfo.match(/<!-- FAQS_JSON:([\s\S]*?)-->/);
  if (faqMatch && faqMatch[1]) {
    try {
      faqs = JSON.parse(faqMatch[1]);
    } catch (e) {
      console.warn("Failed to parse embedded FAQs:", e);
    }
  }

  const metaMatch = rawInfo.match(/<!-- SEO_META:([\s\S]*?)-->/);
  if (metaMatch && metaMatch[1]) {
    try {
      const parsedMeta = JSON.parse(metaMatch[1]);
      if (!metaTitle && parsedMeta.metaTitle) metaTitle = parsedMeta.metaTitle;
      if (!metaDescription && parsedMeta.metaDescription) metaDescription = parsedMeta.metaDescription;
      if (!heading && (parsedMeta.heading || parsedMeta.h1)) heading = parsedMeta.heading || parsedMeta.h1;
    } catch (e) {
      console.warn("Failed to parse embedded SEO meta:", e);
    }
  }

  const galleryMatch = rawInfo.match(/<!-- GALLERY_ORDER:([\s\S]*?)-->/);
  if (galleryMatch && galleryMatch[1]) {
    try {
      galleryOrder = JSON.parse(galleryMatch[1]);
    } catch (e) {
      console.warn("Failed to parse embedded gallery order:", e);
    }
  }

  const vedicMatch = rawInfo.match(/<!-- VEDIC_VASTU_JSON:([\s\S]*?)-->/);
  if (vedicMatch && vedicMatch[1]) {
    try {
      vedicVastu = JSON.parse(vedicMatch[1]);
    } catch (e) {
      console.warn("Failed to parse embedded Vedic Vastu data:", e);
    }
  }

  const cleanAdditionalInfo = rawInfo
    .replace(/<!-- FAQS_JSON:[\s\S]*?-->/g, "")
    .replace(/<!-- SEO_META:[\s\S]*?-->/g, "")
    .replace(/<!-- GALLERY_ORDER:[\s\S]*?-->/g, "")
    .replace(/<!-- VEDIC_VASTU_JSON:[\s\S]*?-->/g, "")
    .trim();

  return {
    faqs: Array.isArray(faqs) ? faqs : [],
    metaTitle: metaTitle || "",
    metaDescription: metaDescription || "",
    heading: heading || "",
    galleryOrder: Array.isArray(galleryOrder) ? galleryOrder : [],
    cleanAdditionalInfo,
    vedicVastu,
  };
};

/**
 * Generate 1-Click Super SEO Meta Title and Description for Admin Panel
 */
export const generateSuperMetaTags = (
  productName = "",
  categoryName = "",
  weight = "",
  size = "",
  price = 0
) => {
  const cleanName = toProperTitleCase(productName.trim() || "Gemstone Sacred Idol");
  const stoneKey = detectGemstone(cleanName + " " + categoryName);
  const archetype = detectArchetype(cleanName + " " + categoryName);
  const stone = GEMSTONE_PROFILES[stoneKey] || GEMSTONE_PROFILES.sphatik;

  return generateCompetitorMeta(cleanName, stone, archetype, weight, size, price, productName);
};

/**
 * Intelligent Vedic & Vastu details resolver for live pages and admin auto-fill
 */
export const getVedicVastuForProduct = (productOrName) => {
  if (!productOrName) {
    return {
      placementDirection: "North-East (Ishanya Kon) or East Altar",
      chakraPlanet: "Crown & Heart Chakra · Jupiter & Sun",
      poojaVidhi: "Cleanse with pure Gangajal or floral water. Light a pure cow ghee diya and offer fragrant sandalwood paste (Chandan).",
      vedicBenefits: "Harmonizes household energy, dispels environmental negativity, and invites peaceful domestic prosperity.",
    };
  }

  // 1. If product object has custom saved vedicVastu from Vijay Admin
  if (typeof productOrName === "object") {
    const unpacked = unpackProductMetadata(productOrName);
    if (
      unpacked.vedicVastu &&
      (unpacked.vedicVastu.placementDirection ||
        unpacked.vedicVastu.chakraPlanet ||
        unpacked.vedicVastu.poojaVidhi ||
        unpacked.vedicVastu.vedicBenefits)
    ) {
      return unpacked.vedicVastu;
    }
  }

  const name = typeof productOrName === "string" ? productOrName : (productOrName.name || productOrName.slug || "");
  const stoneKey = detectGemstone(name);
  const archetype = detectArchetype(name);
  const stone = GEMSTONE_PROFILES[stoneKey] || GEMSTONE_PROFILES.sphatik;

  let placementDirection = "North-East (Ishanya Kon) or East quadrant";
  let chakraPlanet = `${stone.chakra || "Heart Chakra (Anahata)"} · ${stone.planet || "Mercury & Venus"}`;
  let poojaVidhi = stone.careVidhi || "Gently cleanse with holy Gangajal or raw cow milk. Light a pure cow ghee deepak facing East.";
  let vedicBenefits = (stone.vibeKeywords && stone.vibeKeywords.length > 0)
    ? `Promotes ${stone.vibeKeywords.join(", ")}, transmuting dense environmental negativity into calm, focused spiritual vitality.`
    : "Bestows peace, spiritual vitality, mental clarity, and auspicious domestic harmony.";

  switch (archetype) {
    case "krishna":
      placementDirection = "North-East (Ishanya Kon) or East Altar (Master bedroom for marital harmony)";
      chakraPlanet = "Heart Chakra (Anahata) · Venus (Shukra) & Mercury (Budh)";
      poojaVidhi = "Purify with Gangajal, offer fresh Tulsi leaves, white chandan, and light a pure cow ghee deepak while chanting Om Namo Bhagavate Vasudevaya.";
      vedicBenefits = "Radiates unconditional love, heals emotional heartache, dissolves domestic friction, and blesses relationships with joyous unity.";
      break;

    case "hanuman":
      placementDirection = "Facing South (Dakshin Mukhi) or East on an elevated altar";
      chakraPlanet = "Root Chakra (Muladhara) & Solar Plexus · Mars (Mangal) & Saturn (Shani)";
      poojaVidhi = "Consecrate on Tuesday or Saturday morning. Offer pure Jasmine oil (Chameli tel), sindoor, and red flowers while chanting the Hanuman Chalisa.";
      vedicBenefits = "Impenetrable shield against evil eye (Buri Nazar), fear, and acute planetary distress. Bestows moral courage and physical endurance.";
      break;

    case "saraswati":
      placementDirection = "North-East (Ishanya Kon), East, or upon Student's Study Desk / Workstation";
      chakraPlanet = "Throat (Vishuddha) & Crown Chakra · Mercury (Budh) & Jupiter (Guru)";
      poojaVidhi = "Perform puja on Wednesday or Thursday morning. Offer white sandalwood, fragrant white flowers, and pure ghee diya chanting the Saraswati Vandana.";
      vedicBenefits = "Amplifies cognitive focus, intellectual retention, creative eloquence, and academic excellence.";
      break;

    case "lakshmi":
      placementDirection = "North quadrant (Abode of Lord Kubera) or North-East altar facing East";
      chakraPlanet = "Heart (Anahata) & Solar Plexus · Venus (Shukra) & Jupiter (Brihaspati)";
      poojaVidhi = "Consecrate on Friday mornings during Shukla Paksha. Light a pure cow ghee diya and offer fragrant lotus or rose petals while chanting Sri Suktam.";
      vedicBenefits = "Continuous commercial expansion, steady cash flow, protection against financial stagnant inertia, and household prosperity.";
      break;

    case "ganesha":
      placementDirection = "North (Kubera direction) or East quadrant on an elevated wooden chowki";
      chakraPlanet = "Root Chakra (Muladhara) & Heart Chakra · Mercury (Budh)";
      poojaVidhi = "Cleanse with Gangajal on Wednesday morning. Offer fresh Durva grass, yellow modak, and red chandan tilak.";
      vedicBenefits = "Vighnaharta grace removing professional blockages, awakening creative clarity, and protecting new business ventures.";
      break;

    case "shivling":
      placementDirection = "North-East (Ishanya Kon) with the Jalhari spout facing strictly North or East";
      chakraPlanet = "Crown Chakra (Sahasrara) & Third Eye · Moon (Chandra) & Jupiter";
      poojaVidhi = "Daily Jalabhishek with pure water, Gangajal, and raw cow milk. Offer Bilva patra and bhasma while reciting the Maha Mrityunjaya Mantra.";
      vedicBenefits = "Purifies household Vastu doshas, dispels negative astral energies, and bestows profound meditative stillness.";
      break;

    case "shiva":
    case "shiva-face":
      placementDirection = "North-East (Ishanya Kon) or North (Mount Kailash direction) altar";
      chakraPlanet = "Third Eye (Ajna) & Crown Chakra · Saturn (Shani) & Moon";
      poojaVidhi = "Cleanse with pure Gangajal, apply white chandan tilak, and light fragrant dhoop incense during sunrise or sunset Sandhya.";
      vedicBenefits = "Awakens inner fearlessness, yogic clarity, mental discipline, and destroys deep-seated anxiety.";
      break;

    case "shree-yantra":
      placementDirection = "North-East (Ishanya) or North on a clean yellow or red silk altar cloth";
      chakraPlanet = "All 7 Chakras Harmonized · Supreme Cosmic Yantraraja";
      poojaVidhi = "Consecrate on Friday morning or Dhanteras/Diwali. Bathe with rose water or Gangajal, offering lotus petals while chanting Lakshmi Gayatri.";
      vedicBenefits = "Multi-directional pyramidal vortex that continuously clears stagnant financial blockages and attracts high-vibrational wealth.";
      break;

    case "jain":
      placementDirection = "Elevated quiet home Derasar facing East or North";
      chakraPlanet = "Crown Chakra (Sahasrara) & Higher Anahata · Pure Sattva";
      poojaVidhi = "Maintain reverent silence, offer pure water or kesar chandan snan, and contemplate upon the Ṇamōkāra Mahamantra.";
      vedicBenefits = "Radiates Ahimsa (universal compassion), detachment from stress, inner conquest of passions, and soulful peace.";
      break;

    case "swan":
      placementDirection = "South-West (Nairutya Kon) of Master Bedroom or Living Room";
      chakraPlanet = "Heart Chakra (Anahata) · Venus (Shukra)";
      poojaVidhi = "Keep clean and dusted with a soft microfiber cloth. Recharge under morning sunrise or full moonlight.";
      vedicBenefits = "Symbol of pure lifelong companionship, marital fidelity, mutual trust, and affectionate domestic peace.";
      break;

    case "elephant":
      placementDirection = "North or East quadrant of living room or office entrance facing inwards";
      chakraPlanet = "Root Chakra (Muladhara) · Mercury & Jupiter";
      poojaVidhi = "Wipe with damp clean cotton. Offer fragrant incense on auspicious festival mornings.";
      vedicBenefits = "Airavata royal power anchor, locking in business stability, family prestige, and enduring financial strength.";
      break;

    case "diya":
      placementDirection = "South-East (Agni Kon) or North-East (Ishanya Kon) of Altar";
      chakraPlanet = "Solar Plexus (Manipura) & Crown · Sun (Surya) & Agni Tattva";
      poojaVidhi = "Fill with pure desi cow ghee or sesame oil with cotton wick. Light during morning and evening Aarti.";
      vedicBenefits = "Awakens Sattvic light, burns away stagnant negative aura, and brings sacred auspicious warmth into the household.";
      break;

    case "buddha":
      placementDirection = "Eye level in East or North-East living / meditation space facing room entrance";
      chakraPlanet = "Third Eye (Ajna) & Crown Chakra · Mental Equanimity";
      poojaVidhi = "Light natural sandalwood dhoop incense, maintaining a quiet, clean, and elevated platform.";
      vedicBenefits = "Dispels mental turbulence, anxiety, and insomnia, fostering zen mindfulness and restorative tranquility.";
      break;
  }

  return {
    placementDirection,
    chakraPlanet,
    poojaVidhi,
    vedicBenefits,
  };
};


