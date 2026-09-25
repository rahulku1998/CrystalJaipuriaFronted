import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "../Components/SEO";
import {
  FaCompass,
  FaCopy,
  FaCheck,
  FaWhatsapp,
  FaWater,
  FaFire,
  FaWind,
  FaMountain,
  FaSun,
  FaMoon,
  FaShieldAlt,
  FaOm,
  FaArrowRight,
  FaCode,
  FaLightbulb,
  FaInfoCircle,
} from "react-icons/fa";

// Comprehensive Vedic Shastra Direction Data
const VASTU_DIRECTIONS = [
  {
    id: "north-east",
    name: "North-East (Ishanya Kon)",
    hindiName: "ईशान कोण (उत्तर-पूर्व)",
    short: "NE",
    degree: 45,
    element: "Water (Jal Tattva)",
    elementIcon: <FaWater className="text-cyan-500" />,
    color: "from-cyan-50 to-teal-50 border-cyan-200 text-cyan-900",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
    deity: "Lord Shiva & Lord Ishana",
    planet: "Jupiter (Guru) & Ketu",
    coreVibe: "Supreme Spiritual Consciousness & Divine Wisdom",
    description:
      "Ishanya is revered in Vedic Shilpa Shastra as the most sacred threshold of any home. Divine cosmic energies enter from the North-East. It governs peace of mind, meditation, clarity, and spiritual elevation.",
    bestIdols: [
      {
        name: "Natural Sphatik Shivling",
        slug: "natural-sphatik-shivling",
        image: "/images/natural-sphatik-shivling.webp",
        why: "Highest vibrational quartz. When placed in Ishanya with the Jalhari spout facing North or East, it dissipates negative energy and radiates divine shanti.",
      },
      {
        name: "Crystal Sphatik Shree Yantra",
        slug: "crystal-sphtik-shree-yantra-on-kamal-flower",
        image: "/images/crystal-sphtik-shree-yantra-on-kamal-flower.webp",
        why: "Geometry of supreme prosperity and Mahalakshmi energy, ideally energized in Ishanya.",
      },
    ],
    dos: [
      "Keep this corner light, clean, holy, and completely uncluttered.",
      "Place your home mandir or meditation altar here facing East or West.",
      "Ensure water Abhishek drain (Jalhari spout) strictly faces North or East.",
    ],
    donts: [
      "Never construct a toilet, septic tank, or heavy storage in North-East.",
      "Never place a kitchen gas stove or heavy iron lockers here (creates severe Vastu dosha).",
    ],
    abhishekVidhi:
      "Perform snan-abhishek on Monday mornings with raw milk and pure Ganga jal chanting 'Om Namah Shivaya'. Offer white chandan and bilva leaves.",
  },
  {
    id: "north",
    name: "North (Kuber Kon)",
    hindiName: "उत्तर दिशा (कुबेर स्थान)",
    short: "N",
    degree: 0,
    element: "Water & Earth (Wealth Axis)",
    elementIcon: <FaWater className="text-emerald-500" />,
    color: "from-emerald-50 to-green-50 border-emerald-200 text-emerald-900",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    deity: "Lord Kuber & Goddess Lakshmi",
    planet: "Mercury (Budh)",
    coreVibe: "Cash Flow, Prosperity & New Business Opportunities",
    description:
      "Governed by Yaksharaja Kuber, the divine treasurer of the Gods. North controls the inflow of money, high-paying career advancements, new client acquisitions, and financial liquidity.",
    bestIdols: [
      {
        name: "Pyrite Gemstone Shivling",
        slug: "pyrite-gemston-shivling",
        image: "/images/pyrite-gemston-shivling.webp",
        why: "Pyrite (Fool's Gold) is the premier mineral for attracting wealth, golden opportunities, and business abundance.",
      },
      {
        name: "Green Jade Ganesha / Krishna",
        slug: "green-jade-carved-shree-krishana-statue",
        image: "/images/green-jade-carved-shree-krishana-statue.webp",
        why: "Green Jade harmonizes planet Mercury (Budh) to boost commerce, intellect, and lucrative negotiations.",
      },
    ],
    dos: [
      "Keep open windows or light green/blue accents to invite wealth energy.",
      "Place cash drawer, ledger books, or sacred wealth crystals on an elevated wooden chowki.",
      "Ensure statues face inward toward the room to keep abundance circulating inside.",
    ],
    donts: [
      "Avoid heavy junk, red fire elements, or clutter that blocks incoming prosperity.",
      "Do not build a staircase in the exact North zone.",
    ],
    abhishekVidhi:
      "Wednesday morning puja with panchamrit. Offer fresh durva grass to Ganesha or perform Jalabhishek on Pyrite Shivling with mild Gangajal.",
  },
  {
    id: "east",
    name: "East (Purva Dik)",
    hindiName: "पूर्व दिशा (सूर्य स्थान)",
    short: "E",
    degree: 90,
    element: "Air & Wood (Prana Vayu)",
    elementIcon: <FaSun className="text-amber-500" />,
    color: "from-amber-50 to-yellow-50 border-amber-200 text-amber-900",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    deity: "Surya Dev (Sun) & Lord Indra",
    planet: "Sun (Surya)",
    coreVibe: "Health, Vitality, Social Respect & Leadership",
    description:
      "The direction of the rising Sun. Governs health, vitality, public reputation, government relations, and paternal warmth. Ideal for family living areas and children's study desks.",
    bestIdols: [
      {
        name: "Gemstone Ruby Shree Yantra",
        slug: "gemston-ruby-shree-yantra",
        image: "/images/gemston-ruby-shree-yantra.webp",
        why: "Natural Ruby (Manik) channels solar vitality, royal confidence, and social prestige.",
      },
      {
        name: "Clear Crystal Quartz Shivling",
        slug: "clear-crystal-quartz-shivling-with-shiva-face",
        image: "/images/clear-crystal-quartz-shivling-with-shiva-face.webp",
        why: "Amplifies morning prana and cleanses the family aura from lethargy and illnesses.",
      },
    ],
    dos: [
      "Allow fresh morning sunlight to penetrate this quadrant daily.",
      "Sit facing East while praying, meditating, or studying.",
      "Place idols on a silk saffron or red cloth facing inward.",
    ],
    donts: [
      "Avoid tall solid windowless walls or heavy dark curtains blocking the morning light.",
    ],
    abhishekVidhi:
      "Sunday sunrise puja. Chant the Gayatri Mantra or Aditya Hridaya Stotram while offering pure water in a copper or brass patra.",
  },
  {
    id: "south-east",
    name: "South-East (Agni Kon)",
    hindiName: "आग्नेय कोण (अग्नि स्थान)",
    short: "SE",
    degree: 135,
    element: "Fire (Agni Tattva)",
    elementIcon: <FaFire className="text-rose-500" />,
    color: "from-rose-50 to-orange-50 border-rose-200 text-rose-900",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    deity: "Lord Agni",
    planet: "Venus (Shukra)",
    coreVibe: "Vital Energy, Passion, Cash Liquidity & Cooking Harmony",
    description:
      "Ruled by Agni, the transformer of energies. South-East governs metabolic health, physical stamina, financial velocity, and luxury. The natural quadrant for kitchens and sacred fire.",
    bestIdols: [
      {
        name: "Gemstone Amethyst Diya",
        slug: "gemston-amethyst-diya",
        image: "/images/gemston-amethyst-diya.webp",
        why: "Hand-carved from natural amethyst crystal to burn pure cow ghee, transmuting fire into divine protective aura.",
      },
      {
        name: "Green Jade Elephant Statue",
        slug: "green-jade-elephant-staute",
        image: "/images/green-jade-elephant-staute.webp",
        why: "Balances fiery impulses with grounded planetary stability and Shukra elegance.",
      },
    ],
    dos: [
      "Light a cow ghee diya in the South-East corner every morning and evening.",
      "Use warm pastel shades of rose, cream, or light peach.",
    ],
    donts: [
      "Never keep a water tank, underground water boring, or ice fountain in Agni Kon (Fire-Water clash leads to financial drain).",
      "Do not place a full mandir with water abhishek here.",
    ],
    abhishekVidhi:
      "Daily Sandhya Deepam. Light a cotton wick soaked in organic cow ghee inside the gemstone diya facing East.",
  },
  {
    id: "south",
    name: "South (Dakshin Dik)",
    hindiName: "दक्षिण दिशा (यम स्थान)",
    short: "S",
    degree: 180,
    element: "Fire & Earth (Bhoomi Sthirta)",
    elementIcon: <FaMountain className="text-amber-700" />,
    color: "from-stone-50 to-amber-50 border-stone-200 text-stone-900",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    deity: "Lord Yama & Lord Hanuman",
    planet: "Mars (Mangal)",
    coreVibe: "Fame, Legal Victory, Discipline & Courage",
    description:
      "Governs legal matters, authority, discipline, and standing in society. When balanced correctly with heavier items and protective deities, it shields the family from evil eye and litigation.",
    bestIdols: [
      {
        name: "Black Agate Gemstone Ganesh",
        slug: "black-agate-gemstone-carving-of-ganesh",
        image: "/images/black-agate-gemstone-carving-of-ganesh.webp",
        why: "Black Agate (Akik) is the foremost grounding gemstone for banishing evil eye (Buri Nazar), negative psychic vibrations, and court disputes.",
      },
    ],
    dos: [
      "Keep this area elevated and solid with heavier furniture or stone artifacts.",
      "Place protective deities like Lord Hanuman or Black Agate Ganesha facing outward.",
    ],
    donts: [
      "Avoid large main entrance doors or water pumps in the exact South quadrant.",
    ],
    abhishekVidhi:
      "Tuesday puja with red sindoor and jasmine (chameli) oil for Hanuman ji. Offer red flowers or jaggery.",
  },
  {
    id: "south-west",
    name: "South-West (Nairutya Kon)",
    hindiName: "नैऋत्य कोण (स्थिरता स्थान)",
    short: "SW",
    degree: 225,
    element: "Earth (Prithvi Tattva)",
    elementIcon: <FaMountain className="text-amber-800" />,
    color: "from-amber-50 to-stone-50 border-amber-300 text-amber-950",
    badgeColor: "bg-amber-200/80 text-amber-900 border-amber-400",
    deity: "Lord Nirriti",
    planet: "Rahu",
    coreVibe: "Grounding, Marital Fidelity, Ancestral Blessings & Authority",
    description:
      "The heaviest and most grounded quadrant of the house. Belongs to the head of the family (Karta) and master bedroom. Governs stability of relationships, marital bond, and long-term asset retention.",
    bestIdols: [
      {
        name: "Natural Rose Quartz Pair of Swan",
        slug: "natural-rose-quartz-pair-of-swan",
        image: "/images/natural-rose-quartz-pair-of-swan.webp",
        why: "Revered in Vedic Vastu as the ultimate beacon of marital love, emotional gentleness, and lifelong loyalty in master bedrooms.",
      },
      {
        name: "Natural Labradorite Gemstone Shivling",
        slug: "natural-labradorite-gemstone-shivling",
        image: "/images/natural-labradorite-gemstone-shivling.webp",
        why: "Shields against Rahu illusions and strengthens mental fortitude and ancestral roots.",
      },
    ],
    dos: [
      "Make this the heaviest, tallest corner of the entire home.",
      "Ideal for master bedroom and keeping heavy iron/gold lockers.",
      "Place the pair of swans on your bedroom side table facing each other.",
    ],
    donts: [
      "Strictly avoid toilets, main water tanks, or temple puja altars here (leads to head-of-family instability).",
    ],
    abhishekVidhi:
      "Clean gently with soft dry cloth and rose water on Fridays. Re-charge under full moonlight once a month.",
  },
  {
    id: "west",
    name: "West (Paschim Dik)",
    hindiName: "पश्चिम दिशा (वरुण स्थान)",
    short: "W",
    degree: 270,
    element: "Space & Metal (Akasha & Loha)",
    elementIcon: <FaWind className="text-indigo-500" />,
    color: "from-indigo-50 to-slate-50 border-indigo-200 text-indigo-950",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300",
    deity: "Lord Varuna",
    planet: "Saturn (Shani)",
    coreVibe: "Gains, Profitable Returns, Desire Fulfillment & Trade",
    description:
      "Governs gains of business, profit margins, fulfilling desires, and the fruits of your hard labor. Ideal for dining areas, study rooms, and study altars.",
    bestIdols: [
      {
        name: "Lapis Lazuli Gemstone Shiva Linga",
        slug: "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva",
        image: "/images/lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva.webp",
        why: "Royal blue lapis lazuli aligns with planet Saturn to ensure just, ethical wealth, steady gains, and wisdom.",
      },
      {
        name: "Amethyst Gemstone Angel",
        slug: "amethyst-gemston-angel",
        image: "/images/amethyst-gemston-angel.webp",
        why: "Calms intellectual stress and deepens higher spiritual perspective.",
      },
    ],
    dos: [
      "Place idols on a clean blue, white, or silver altar base.",
      "Great area for dining table and study table facing East.",
    ],
    donts: [
      "Do not build a septic tank directly in the West axis.",
    ],
    abhishekVidhi:
      "Saturday evening puja. Offer blue flowers (Aparajita) or mustard oil diya in the evening chanting 'Om Sham Shanaicharaya Namah'.",
  },
  {
    id: "north-west",
    name: "North-West (Vayavya Kon)",
    hindiName: "वायव्य कोण (वायु स्थान)",
    short: "NW",
    degree: 315,
    element: "Air (Vayu Tattva)",
    elementIcon: <FaWind className="text-sky-500" />,
    color: "from-sky-50 to-blue-50 border-sky-200 text-sky-950",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    deity: "Lord Vayu",
    planet: "Moon (Chandra)",
    coreVibe: "Helpful Friends, Banking Support, Travel & Mental Peace",
    description:
      "The zone of movement and winds. Governs international trade, flight journeys, banking loan sanctions, helpful allies, and emotional tranquility of women in the home.",
    bestIdols: [
      {
        name: "Natural Howlite Gemstone Shivling",
        slug: "natural-howlite-gemstone-shivling",
        image: "/images/natural-howlite-gemstone-shivling.webp",
        why: "Pure white cooling mineral known as the stone of calm mind, dissipating stress and emotional anger.",
      },
      {
        name: "Natural Opal Stone Shivling",
        slug: "natural-opal-stone-shivling",
        image: "/images/natural-opal-stone-shivling.webp",
        why: "Radiates harmonious lunar energy, nurturing healthy relationships with partners and clients.",
      },
    ],
    dos: [
      "Maintain active airflow and fresh cross-ventilation.",
      "Ideal quadrant for guest bedrooms and finished product storage ready to ship.",
    ],
    donts: [
      "Avoid storing heavy static dead weight here; things here must stay in fluid circulation.",
    ],
    abhishekVidhi:
      "Monday evening puja with pure fresh cow milk and rose petals, chanting Chandra Gayatri or 'Om Chandraya Namah'.",
  },
  {
    id: "center",
    name: "Center (Brahmasthan)",
    hindiName: "ब्रह्मस्थान (केंद्र बिंदु)",
    short: "CTR",
    degree: 0,
    element: "Ether & Pure Cosmic Space (Akasha)",
    elementIcon: <FaOm className="text-purple-600" />,
    color: "from-purple-50 via-amber-50/40 to-white border-purple-200 text-purple-950",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    deity: "Lord Brahma",
    planet: "All Navagrahas",
    coreVibe: "Universal Cosmic Balance, Harmony & Prana Core",
    description:
      "The cosmic navel of the home. All energies from all 8 directions converge here. Must always remain completely open, hollow, lightweight, and pure.",
    bestIdols: [
      {
        name: "Crystal Sphatik Shree Yantra on Kamal",
        slug: "crystal-sphtik-shree-yantra-on-kamal-flower",
        image: "/images/crystal-sphtik-shree-yantra-on-kamal-flower.webp",
        why: "When kept in a clean glass bowl with fresh water and lotus petals in the central courtyard/living hall, it balances the entire home's energy grid.",
      },
    ],
    dos: [
      "Keep this central zone hollow, uncluttered, and well lit.",
      "Place a flat brass or crystal urli with fresh water and fragrant flowers.",
    ],
    donts: [
      "Never build heavy pillars, staircases, load-bearing walls, or toilets in Brahmasthan.",
    ],
    abhishekVidhi:
      "Sprinkle Gangajal every morning and chant Gayatri Mantra 11 times to revitalize the whole house with pure prana.",
  },
];

// Rashi & Goal Presets
const RASHI_PRESETS = [
  { rashi: "Mesh / Aries (मेष)", rashiLord: "Mars (Mangal)", dirId: "east", idol: "Ruby Shree Yantra or Clear Quartz" },
  { rashi: "Vrishabh / Taurus (वृषभ)", rashiLord: "Venus (Shukra)", dirId: "north-east", idol: "Natural Sphatik Shivling" },
  { rashi: "Mithun / Gemini (मिथुन)", rashiLord: "Mercury (Budh)", dirId: "north", idol: "Green Jade Ganesha or Krishna" },
  { rashi: "Kark / Cancer (कर्क)", rashiLord: "Moon (Chandra)", dirId: "north-east", idol: "Natural Sphatik Shivling / Howlite" },
  { rashi: "Singh / Leo (सिंह)", rashiLord: "Sun (Surya)", dirId: "east", idol: "Natural Ruby Shree Yantra" },
  { rashi: "Kanya / Virgo (कन्या)", rashiLord: "Mercury (Budh)", dirId: "north", idol: "Green Jade Idols / Pyrite Shivling" },
  { rashi: "Tula / Libra (तुला)", rashiLord: "Venus (Shukra)", dirId: "south-east", idol: "Amethyst Diya / Rose Quartz Swans" },
  { rashi: "Vrishchik / Scorpio (वृश्चिक)", rashiLord: "Mars (Mangal)", dirId: "south", idol: "Black Agate Ganesha" },
  { rashi: "Dhanu / Sagittarius (धनु)", rashiLord: "Jupiter (Guru)", dirId: "north-east", idol: "Clear Crystal Quartz Shivling" },
  { rashi: "Makar / Capricorn (मकर)", rashiLord: "Saturn (Shani)", dirId: "west", idol: "Lapis Lazuli Shiva Linga" },
  { rashi: "Kumbh / Aquarius (कुंभ)", rashiLord: "Saturn (Shani)", dirId: "west", idol: "Amethyst Gemstone Angel / Lapis" },
  { rashi: "Meen / Pisces (मीन)", rashiLord: "Jupiter (Guru)", dirId: "north-east", idol: "Natural Sphatik Shivling on Kamal" },
];

const LIFE_GOALS = [
  { id: "wealth", label: "💰 Dhan Labh & Cashflow", dirId: "north", tip: "Kuber Kon (North) with Pyrite & Green Jade attracts golden opportunities." },
  { id: "peace", label: "🧘 Mental Peace & Spiritual Aura", dirId: "north-east", tip: "Ishanya Kon (North-East) with Sphatik Shivling purifies all home stress." },
  { id: "marriage", label: "💖 Marital Love & Harmony", dirId: "south-west", tip: "Nairutya Kon (South-West) with Rose Quartz Swan Pair grounds love." },
  { id: "career", label: "🏆 Career Fame & Health", dirId: "east", tip: "Purva (East) with Ruby Shree Yantra boosts leadership & respect." },
  { id: "protection", label: "🛡️ Nazar Dosh & Court Defense", dirId: "south", tip: "Dakshin (South) with Black Agate Ganesha repels negativity." },
];

const VastuCompass = () => {
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get("embed") === "true";

  const [activeDirectionId, setActiveDirectionId] = useState("north-east");
  const [activeTab, setActiveTab] = useState("direction"); // 'direction' | 'rashi' | 'goal'
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const currentDir = useMemo(
    () => VASTU_DIRECTIONS.find((d) => d.id === activeDirectionId) || VASTU_DIRECTIONS[0],
    [activeDirectionId]
  );

  const embedSnippet = `<iframe src="https://www.crystaljaipuria.com/vastu-compass?embed=true" width="100%" height="780" frameborder="0" style="border-radius:16px;border:1px solid #e2e8f0;box-shadow:0 10px 25px -5px rgba(0,0,0,0.08);max-width:100%;"></iframe>\n<p style="font-size:12px;text-align:center;color:#64748b;margin-top:8px;">Interactive Vedic Vastu Tool by <a href="https://www.crystaljaipuria.com" target="_blank" rel="follow" style="color:#047857;font-weight:700;text-decoration:underline;">Crystal Jaipuria - Jaipur Gemstone Idols & Vastu Crystals</a></p>`;

  const handleCopyEmbed = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(embedSnippet);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `🧭 *Vedic Mandir Vastu Advice for ${currentDir.name}*\n\n✨ *Deity:* ${currentDir.deity}\n🪐 *Planet:* ${currentDir.planet}\n💧 *Tattva:* ${currentDir.element}\n\n🔱 *Recommended Gemstone Idol:* ${currentDir.bestIdols[0]?.name}\n📌 *Key Rule:* ${currentDir.dos[0]}\n\nCheck your home Vastu direction free on:\nhttps://www.crystaljaipuria.com/vastu-compass`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Interactive Vedic Mandir Vastu & Gemstone Idol Compass",
    url: "https://www.crystaljaipuria.com/vastu-compass",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    description:
      "Free interactive Vedic Vastu Shastra compass and gemstone idol recommendation calculator for home mandirs, altars, and positive energy flow.",
    creator: {
      "@type": "Organization",
      name: "Crystal Jaipuria",
      url: "https://www.crystaljaipuria.com",
    },
  };

  return (
    <div className={`min-h-screen bg-[#faf8f5] text-slate-800 ${isEmbed ? "p-3 sm:p-5" : "py-8 sm:py-14 px-4 sm:px-6 lg:px-8"}`}>
      <SEO
        title="Interactive Vedic Mandir Vastu Compass & Gemstone Idol Finder | Crystal Jaipuria"
        description="Calculate exact Vastu directions for your home mandir, Sphatik Shivling, and gemstone deities. Discover ruling deities, tattvas, and sacred abhishek vidhi for all 8 directions."
        canonical="https://www.crystaljaipuria.com/vastu-compass"
        schema={structuredData}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        {!isEmbed && (
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <span>🧭</span>
              <span>Authentic Shastric Guidance</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Vedic Mandir Vastu &amp; Gemstone Idol Compass
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Align your home mandir with pure cosmic prana. Select your room direction or zodiac sign to reveal the ideal gemstone murti, ruling deity, and sacred placement rules according to Vedic Shilpa Shastra.
            </p>
          </div>
        )}

        {/* NAVIGATION TABS (Direction / Rashi / Goal) */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-200/70 rounded-2xl gap-1 shadow-inner text-xs sm:text-sm font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("direction")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === "direction"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaCompass className="text-emerald-700 text-base" />
              <span>8 Directions Wheel</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("rashi")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === "rashi"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaMoon className="text-indigo-600 text-base" />
              <span>Match by Rashi</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("goal")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                activeTab === "goal"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaLightbulb className="text-amber-500 text-base" />
              <span>Match by Life Goal</span>
            </button>
          </div>
        </div>

        {/* TAB 1: 8 DIRECTIONS GRID / WHEEL */}
        {activeTab === "direction" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-7 shadow-xs">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
              Select Any Direction To Inspect Its Energy &amp; Best Idol
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 sm:gap-2.5">
              {VASTU_DIRECTIONS.map((dir) => {
                const isSelected = dir.id === activeDirectionId;
                return (
                  <button
                    key={dir.id}
                    type="button"
                    onClick={() => setActiveDirectionId(dir.id)}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-md scale-105 ring-2 ring-emerald-300"
                        : "bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="text-sm font-black tracking-wide">{dir.short}</span>
                    <span className="text-[11px] font-semibold truncate w-full">{dir.name.split(" ")[0]}</span>
                    <span className="text-xs">{dir.elementIcon}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: RASHI QUICK SELECTOR */}
        {activeTab === "rashi" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
              Select Your Janma Rashi (Zodiac Moon Sign)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {RASHI_PRESETS.map((item) => (
                <button
                  key={item.rashi}
                  type="button"
                  onClick={() => {
                    setActiveDirectionId(item.dirId);
                    setActiveTab("direction");
                  }}
                  className="p-3 text-left rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 transition group cursor-pointer"
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-900">
                    {item.rashi}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Lord: {item.rashiLord}</div>
                  <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                    <span>View {item.dirId.toUpperCase()}</span>
                    <FaArrowRight className="text-[9px]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LIFE GOAL SELECTOR */}
        {activeTab === "goal" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
              What Is Your Primary Vedic Goal For Your Home?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {LIFE_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => {
                    setActiveDirectionId(goal.dirId);
                    setActiveTab("direction");
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-white to-slate-50 hover:to-emerald-50 border border-slate-200 hover:border-emerald-300 transition text-left space-y-1.5 cursor-pointer shadow-2xs group"
                >
                  <div className="font-bold text-sm text-slate-900 group-hover:text-emerald-900">
                    {goal.label}
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">{goal.tip}</div>
                  <div className="text-xs font-bold text-emerald-700 pt-1 flex items-center gap-1">
                    <span>Inspect Optimal Placement &rarr;</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MAIN SELECTED DIRECTION CARD */}
        <div className="bg-white rounded-3xl border border-emerald-200/90 shadow-sm overflow-hidden">
          {/* Top Banner with Direction Info */}
          <div className={`p-5 sm:p-8 bg-gradient-to-r ${currentDir.color} border-b border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentDir.badgeColor}`}>
                  {currentDir.short} • {currentDir.degree}&deg;
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Tattva: {currentDir.element}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentDir.name}
              </h2>
              <p className="text-sm font-medium text-slate-700">
                {currentDir.hindiName} &bull; <span className="italic">{currentDir.coreVibe}</span>
              </p>
            </div>

            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <FaWhatsapp className="text-base" />
                <span>Share On WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 space-y-8">
            {/* 1. Core Essence & Shastric Significance */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Vedic Shastric Significance
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {currentDir.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800">👑 Ruling Deity: </span>
                  <span className="text-slate-600">{currentDir.deity}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800">🪐 Astrological Planet: </span>
                  <span className="text-slate-600">{currentDir.planet}</span>
                </div>
              </div>
            </div>

            {/* 2. RECOMMENDED GEMSTONE IDOLS (E-Commerce Linking) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Auspicious Consecrated Gemstone Idols for {currentDir.name}
                </h3>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Certified Jaipur Lapidary
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDir.bestIdols.map((idol) => (
                  <div
                    key={idol.slug}
                    className="p-4 rounded-2xl bg-gradient-to-br from-white to-stone-50/50 border border-slate-200 hover:border-emerald-300 transition shadow-2xs flex gap-4 items-center"
                  >
                    <img
                      src={idol.image}
                      alt={idol.name}
                      width="80"
                      height="80"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl bg-white p-1 border border-slate-100 shrink-0"
                      onError={(e) => {
                        e.target.src = "/Gemstone.webp";
                      }}
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {idol.name}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {idol.why}
                      </p>
                      <Link
                        to={`/product/${idol.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline pt-0.5"
                      >
                        <span>View Specifications &amp; Buy</span>
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. DOS & DONTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2.5">
                <h4 className="font-bold text-xs sm:text-sm text-emerald-950 flex items-center gap-2">
                  <FaCheck className="text-emerald-600" />
                  <span>Vedic Guidelines (Do&apos;s)</span>
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-[13px] text-slate-700 list-disc list-inside">
                  {currentDir.dos.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2.5">
                <h4 className="font-bold text-xs sm:text-sm text-rose-950 flex items-center gap-2">
                  <FaShieldAlt className="text-rose-600" />
                  <span>Vastu Cautions (Don&apos;ts &amp; Dosha Prevention)</span>
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-[13px] text-slate-700 list-disc list-inside">
                  {currentDir.donts.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. ABHISHEK & PUJA VIDHI */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
              <h4 className="font-bold text-xs sm:text-sm text-amber-950 flex items-center gap-2">
                <FaOm className="text-amber-700" />
                <span>Sacred Consecration &amp; Abhishek Vidhi</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentDir.abhishekVidhi}
              </p>
            </div>
          </div>
        </div>

        {/* EMBED WIDGET CARD (THE PERPETUAL BACKLINK ENGINE) */}
        {!isEmbed && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <FaCode />
                  <span>For Astrologers, Vastu Consultants &amp; Bloggers</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Embed This Interactive Vastu Compass on Your Website
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  Add this free, responsive Vedic Vastu tool to your spiritual blog, WordPress site, or astrology portal. Works seamlessly on all mobile and desktop layouts.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyEmbed}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold transition shadow-md cursor-pointer shrink-0"
              >
                {copiedEmbed ? <FaCheck className="text-base" /> : <FaCopy className="text-base" />}
                <span>{copiedEmbed ? "Copied to Clipboard!" : "Copy Embed Code"}</span>
              </button>
            </div>

            {/* Code Box */}
            <div className="relative bg-slate-950/80 rounded-2xl p-4 font-mono text-[11px] sm:text-xs text-emerald-300 overflow-x-auto border border-slate-700/80">
              <code>{embedSnippet}</code>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FaInfoCircle className="text-emerald-400 shrink-0" />
              <span>
                Includes 100% responsive iframe with clean attribution link to Crystal Jaipuria. Free to use on commercial and personal websites.
              </span>
            </div>
          </div>
        )}

        {/* FAQS & HELPFUL KNOWLEDGE BASE */}
        {!isEmbed && (
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/90 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Frequently Asked Questions (Vastu Mandir &amp; Idols)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="font-bold text-slate-900">Where should the spout of Sphatik Shivling face?</h4>
                <p className="text-slate-600 leading-relaxed">
                  According to Shiva Purana, the Jalhari spout must face strictly towards North (Kailash) or East, while the devotee faces North or East during puja.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="font-bold text-slate-900">Can we keep gemstone statues in the bedroom?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Deity idols should be kept in home mandir. However, semi-precious symbols like the Rose Quartz Swan pair are recommended specifically for master bedrooms to enhance marital harmony.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VastuCompass;
