/**
 * SEO helper functions for optimizing title and description lengths
 * Super SEO Titles designed for Google Search, AI Overviews & High Click-Through Rate (CTR)
 */
import { GOOGLE_BUSINESS_STATS } from "../config/businessStats.js";
import { getVedicVastuForProduct } from "./productMetadata.js";
import { getProductImageUrl } from "./imageOptimizer.js";


export const SUPER_TITLE_MAPPINGS = {
  "australian-jade-chrysoprase-ganesha": "Australian Jade Chrysoprase Ganesha Statue with Arch | Crystal Jaipuria",
  "ruby-panchmukhi-ganesha-carving-833": "Natural Ruby Panchmukhi Ganesha Carving (833 Carats) | Crystal Jaipuria",
  "milky-quartz-ganesh-statue-with-gold": "Milky Quartz Ganesh Statue with 24K Gold Foil Work | Crystal Jaipuria",
  "natural-hand-carved-rose-quartz-ganesha": "Hand Carved Rose Quartz Ganesha Gemstone Statue (850 g) | Crystal Jaipuria",
  "natural-handmade-emerald-ganesha-statue": "Natural Emerald (Panna) Ganesha Statue (1420 Carats) | Crystal Jaipuria",
  "ruby-ganesha-2195-carat-hand-carved-ruby": "Natural Ruby Ganesha 2195 Carat Gemstone Statue | Crystal Jaipuria",
  "ruby-ganesha-idol-25-handcrafted-statue": "Natural Ruby Ganesha Idol 2.5 Inch (560 Carats) | Crystal Jaipuria",
  "blue-sapphire-shiva-head-handmade": "Natural Blue Sapphire Shiva Head Gemstone Sculpture | Crystal Jaipuria",
  "ruby-zoisite-ganesha-statue-hand-carved": "Ruby Zoisite Ganesha Gemstone Statue with Arch (1180 Ct) | Crystal Jaipuria",
  "natural-emerald-green-stone-shivling": "Natural Emerald Green Stone Shivling for Jalabhishek | Crystal Jaipuria",
  "breathtaking-natural-hessonite-garnet-shivling": "Natural Hessonite Garnet (Gomed) Shivling for Rahu Shanti | Crystal Jaipuria",
  "emerald-ganesh-statue-3625-carat-ganesh": "Museum Grade Natural Emerald Ganesh Statue (3625 Carats) | Crystal Jaipuria",
  "green-aventurine-diya": "Natural Green Aventurine Diya for Mandir Pooja & Aarti | Crystal Jaipuria",
  "green-jade-diya": "Natural Green Jade Diya for Mandir Pooja & Diwali Aarti | Crystal Jaipuria",
  "moonstone-diya": "Natural Moonstone Diya for Mandir Pooja & Peace | Crystal Jaipuria",
  "yellow-aventurine-diya": "Natural Yellow Aventurine Diya for Mandir Pooja & Aarti | Crystal Jaipuria",
  "rose-quartz-diya": "Natural Rose Quartz Diya for Mandir Pooja & Diwali | Crystal Jaipuria",
  "lapis-lazuli-diya": "Natural Lapis Lazuli Diya for Mandir Pooja & Aarti | Crystal Jaipuria",
  "black-agate-diya": "Natural Black Agate (Hakik) Diya for Mandir Pooja & Vastu | Crystal Jaipuria",
  "emerald-ganesha-idol": "Natural Emerald (Panna) Ganesha Idol for Home Temple | Crystal Jaipuria",
  "tiger-eye-ganesha-idol": "Natural Tiger Eye Ganesha Idol for Prosperity & Vastu | Crystal Jaipuria",
  "sunstone-ganesha": "Natural Sunstone Ganesha Idol for Success & Vitality | Crystal Jaipuria",
  "lapis-lazuli-elephant-idols-set-of-2": "Natural Lapis Lazuli Elephant Idols (Pair of 2) Vastu | Crystal Jaipuria",
  "jasper-shree-yantra": "Natural Red Jasper Shree Yantra 3D Meru for Stability | Crystal Jaipuria",
  "gomedh-shree-yantra": "Natural Hessonite Garnet (Gomedh) Shree Yantra 3D Meru | Crystal Jaipuria",
  "cats-eye-shree-yantra": "Natural Cat's Eye (Lehsuniya) Shree Yantra 3D Meru | Crystal Jaipuria",
  "rose-quartz-kurma-shree-yantra": "Natural Rose Quartz Kurma Shree Yantra (Tortoise Base) | Crystal Jaipuria",
  "lapis-lazuli-shree-yantra": "Natural Lapis Lazuli Shree Yantra 3D Meru for Wisdom | Crystal Jaipuria",
  "labradorite-shree-yantra": "Natural Labradorite Shree Yantra 3D Meru (Blue Flash) | Crystal Jaipuria",
  "howlite-shree-yantra": "Natural White Howlite Shree Yantra 3D Meru for Peace | Crystal Jaipuria",
  "fluorite-shree-yantra": "Natural Rainbow Fluorite Shree Yantra 3D Meru | Crystal Jaipuria",
  "emerald-shree-yantra-on-lotus": "Natural Emerald (Panna) Shree Yantra on Lotus 3D Meru | Crystal Jaipuria",
  "blue-sunstone-shree-yantra": "Natural Blue Sunstone Shree Yantra 3D Meru (Galaxy Stone) | Crystal Jaipuria",
  "blue-sodalite-shree-yantra": "Natural Blue Sodalite Shree Yantra 3D Meru for Harmony | Crystal Jaipuria",
  "amethyst-shree-yantra": "Natural Amethyst Shree Yantra 3D Meru (Crown Chakra) | Crystal Jaipuria",
  "yellow-jade-shree-yantra": "Natural Yellow Jade Shree Yantra 3D Meru for Prosperity | Crystal Jaipuria",
  "unakite-shree-yantra": "Natural Unakite Shree Yantra 3D Meru (Heart & Vision) | Crystal Jaipuria",
  "tiger-eye-shree-yantra": "Natural Tiger Eye Shree Yantra 3D Meru for Wealth | Crystal Jaipuria",
  "sunstone-shree-yantra": "Natural Sunstone Shree Yantra 3D Meru for Solar Energy | Crystal Jaipuria",
  "red-jade-shree-yantra": "Natural Red Jade Shree Yantra 3D Meru (Wealth & Vastu) | Crystal Jaipuria",
  "amethyst-gemston-angel": "Natural Amethyst Gemstone Guardian Angel for Reiki | Crystal Jaipuria",
  "crystal-clear-mahvaveer-ji-statue": "Crystal Clear Quartz Bhagwan Mahaveer Ji Statue | Crystal Jaipuria",
  "gemston-amethyst-diya": "Natural Amethyst Gemstone Diya for Mandir Pooja | Crystal Jaipuria",
  "black-agate-gemstone-carving-of-ganesh": "Natural Black Agate (Hakik) Ganesha Idol (2 kg, 8 in) | Crystal Jaipuria",
  "crystal-sphtik-shree-yantra-on-kamal-flower": "Natural Sphatik Shree Yantra on Lotus Flower 3D Meru | Crystal Jaipuria",
  "green-jade-carving-shiva-face-statue": "Natural Green Jade Shiva Face Idol (5 Inch, 1 kg) | Crystal Jaipuria",
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva": "Lapis Lazuli Shiva Linga with Shiva Face Mukhalingam | Crystal Jaipuria",
  "green-jade-elephant-staute": "Natural Green Jade Elephant Statue for Vastu & Wealth | Crystal Jaipuria",
  "natural-ruby-shivling": "Natural Ruby (Manik) Gemstone Shivling for Mandir | Crystal Jaipuria",
  "green-jade-panchmukhi-shivling": "100% Certified Natural Green Jade Panchmukhi Shivling | Crystal Jaipuria",
  "pyrite-gemston-shivling": "Natural Golden Pyrite Gemstone Shivling for Wealth | Crystal Jaipuria",
  "green-jade-carved-shree-krishana-statue": "Natural Green Jade Shree Krishna Statue (Murli Manohar) | Crystal Jaipuria",
  "blue-sapphire-carving-shiva-statue": "Natural Blue Sapphire Shiva Statue (400 g Certified) | Crystal Jaipuria",
  "gemston-ruby-shree-yantra": "Natural Ruby Gemstone Shree Yantra 3D Meru | Crystal Jaipuria",
  "natural-rose-quartz-pair-of-swan": "Natural Rose Quartz Pair of Swans (Love & Vastu) | Crystal Jaipuria",
  "green-jade-shiva-statue-with-gold-panting": "Green Jade Shiva Statue with 24K Gold Leaf Painting | Crystal Jaipuria",
  "clear-crystal-quartz-shivling-with-shiva-face": "Clear Quartz Shivling with Shiva Face (Mukhalingam) | Crystal Jaipuria",
  "natural-sphatik-shivling": "100% Certified Natural Sphatik Shivling in Jaipur | Crystal Jaipuria",
  "natural-opal-stone-shivling": "Natural Opal Stone Shivling (Upal Ratna) for Mandir | Crystal Jaipuria",
  "natural-lapis-lazuli-shiva-face-carving-idol": "Natural Lapis Lazuli Shiva Face Carving Idol (500 g) | Crystal Jaipuria",
  "natural-lapis-lazuli-lord-krishna-statue": "Natural Lapis Lazuli Lord Krishna Statue (Banke Bihari) | Crystal Jaipuria",
  "natural-tiger-eye-gemstone-shivling": "Natural Tiger Eye Gemstone Shivling for Jalabhishek | Crystal Jaipuria",
  "natural-howlite-gemstone-shivling": "Natural White Howlite Gemstone Shivling for Mandir | Crystal Jaipuria",
  "rose-quartz-shiva-statue-with-gold-painting": "Rose Quartz Shiva Statue with 24K Gold Leaf Painting | Crystal Jaipuria",
  "natural-labradorite-gemstone-shivling": "Natural Labradorite Gemstone Shivling (Peacock Blue) | Crystal Jaipuria",
  "green-jade-radha-krishna-statue-carving": "Green Jade Radha Krishna Statue Carving (5 kg, 15 in) | Crystal Jaipuria",
  "smokey-quartz-crystal-shiva-face-idol": "Natural Smokey Quartz Shiva Face Idol (1.1 kg) | Crystal Jaipuria",
  "green-jade-goddess-maa-saraswati-carving": "Natural Green Jade Goddess Saraswati Statue (Veena) | Crystal Jaipuria",
  "green-aventurine-parshvanath-ji-statue": "Green Aventurine Lord Parshvanath Ji Statue (Jain Idol) | Crystal Jaipuria",
  "green-jade-mahalakshmi-ji-idol": "Natural Green Jade Goddess Lakshmi Idol for Pooja | Crystal Jaipuria",
  "natural-amethyst-gemstone-shiva-face-idol": "Natural Amethyst Gemstone Shiva Face Idol (3 Inch) | Crystal Jaipuria",
  "rose-quartz-carved-shree-krishna-ji-idol": "Natural Rose Quartz Shree Krishna Ji Idol (Flute) | Crystal Jaipuria",
  "tiger-eye-carving-shiva-statue": "Natural Tiger Eye Shiva Statue for Home Temple & Vastu | Crystal Jaipuria",
  "rose-quartz-bhagwan-mahaveer-statue": "Rose Quartz Bhagwan Mahaveer Ji Statue (Jain Idol) | Crystal Jaipuria",
  "natural-yellow-jade-ganesha-statue": "Natural Yellow Jade Ganesha Statue for Vastu & Wealth | Crystal Jaipuria",
  "labradorite-power-mini-shiva-face": "Natural Labradorite Shiva Face Idol (Blue Flash) | Crystal Jaipuria",
  "blue-sodalite-carving-shiva-face-idol": "Natural Blue Sodalite Shiva Face Idol (Royal Blue) | Crystal Jaipuria",
  "natural-red-jasper-gemstone-shivling": "Natural Red Jasper Gemstone Shivling for Mandir | Crystal Jaipuria",
  "natural-blue-sodalite-hanuman-ji-statue": "Natural Blue Sodalite Hanuman Ji Statue (1.1 kg) | Crystal Jaipuria",
  "blue-sodalite-carved-lord-shiva-statue": "Natural Blue Sodalite Lord Shiva Statue (1.2 kg) | Crystal Jaipuria",
  "rose-quartz-ganesha-with-gold-painted": "Rose Quartz Ganesha with 24K Gold Paint Work | Crystal Jaipuria",
  "blue-sodalite-carved-ganesha-statue": "Natural Blue Sodalite Ganesha Statue for Mandir Pooja | Crystal Jaipuria",
  "crystal-shivling": "Original Sphatik Shivling in Jaipur (100% Certified) | Crystal Jaipuria",
  "crystal-ganesha": "Natural Clear Quartz (Sphatik) Ganesha Idol for Pooja | Crystal Jaipuria",
  "green-jade-shivling": "Natural Green Jade Shivling for Jalabhishek & Mandir | Crystal Jaipuria",
  "green-jade-shree-yantra": "Natural Green Jade Shree Yantra 3D Meru (Wealth & Kuber) | Crystal Jaipuria",
  "rose-quartz-ganesha": "Natural Rose Quartz Ganesha Idol (370 g, 2 in) | Crystal Jaipuria",
  "green-jade-ganesha": "Natural Green Jade Ganesha Idol for Good Fortune | Crystal Jaipuria",
  "crystal-shree-yantra": "Natural Sphatik Shree Yantra 3D Meru (Clear Quartz) | Crystal Jaipuria",
  "natural-ruby-radha-krishna-idol-hand-carved": "Natural Ruby Radha Krishna Idol Hand Carved (616 g) | Crystal Jaipuria",
  "hand-carved-ruby-ganesha": "Hand Carved Natural Ruby Ganesha Gemstone Statue | Crystal Jaipuria",
  "australian-jade-ganesha-carving": "Australian Jade Ganesha Carving (462 g, 4.2 in) | Crystal Jaipuria",
  "hand-carved-rose-quartz-ganesha-with-sterling-silver-testing": "Rose Quartz Ganesha with 925 Sterling Silver Work | Crystal Jaipuria",
  "green-jade-carved-ganesha-statue-with-silver-gold-work": "Green Jade Ganesha with 925 Silver & 24K Gold Work | Crystal Jaipuria",
  "rose-quartz-ganesh-with-silver-work-idol-for-luxury-decor": "Rose Quartz Ganesh with Silver Work | Luxury Murti | Crystal Jaipuria",
  "shiva-in-lepidolite": "Natural Lepidolite Lord Shiva Statue (Anxiety Relief) | Crystal Jaipuria",
  "nataraja-dancing-shiva-sunstone-idol": "Natural Sunstone Nataraja Dancing Shiva Statue | Crystal Jaipuria",
  "green-aventurine-shankh": "Natural Green Aventurine Shankh (Sacred Conch Shell) | Crystal Jaipuria",
  "durga-devi-ruby-idol": "Natural Ruby Durga Devi Idol (Lion Simhavahini) | Crystal Jaipuria",
  "ruby-kyanite-buddha": "Natural Ruby Kyanite Meditating Buddha Statue (12.6 kg) | Crystal Jaipuria",
  "sodalite-buddha": "Natural Blue Sodalite Buddha Statue (18.2 kg, 17 in) | Crystal Jaipuria",
  "tea-set-in-crystal-quartz": "Natural Crystal Quartz Tea Set (Teapot & 4 Cups) | Crystal Jaipuria",
  "7-running-horses-in-lapis-lazuli": "7 Running Horses in Natural Lapis Lazuli Vastu Carving | Crystal Jaipuria",
  "carving-of-4-horse-bust-together-in-lapis-lazuli": "Lapis Lazuli 4 Horse Bust Sculpture | Vastu | Crystal Jaipuria",
  "tirupati-balaji-in-tiger-eye": "Natural Tiger Eye Tirupati Balaji Murti (3.6 kg) | Crystal Jaipuria",
  "goddess-tara-in-green-aventurine": "Goddess Green Tara Statue in Natural Green Aventurine | Crystal Jaipuria",
  "green-aventurine-lord-shiva": "Green Aventurine Lord Shiva Statue (6.4 kg, 10 in) | Crystal Jaipuria",
  "ruby-ram-darbar-carving": "Magnificent Ruby Ram Darbar Carving (4.85 kg) | Crystal Jaipuria",
  "lord-krishna-in-ruby-zoisite": "Lord Krishna Statue in Natural Ruby Zoisite (Anyolite) | Crystal Jaipuria",
  "lord-parasnath-in-lapis-lazuli": "Natural Lapis Lazuli Lord Parshvanath Ji Statue | Crystal Jaipuria",
  "buddha-in-ruby-kyanite": "Natural Ruby Kyanite Buddha Statue (8.5 kg, 12 in) | Crystal Jaipuria",
  "lord-ganesha-in-green-aventurine": "Green Aventurine Lord Ganesha Idol for Vastu | Crystal Jaipuria",
  "laughing-buddha-in-labradorite": "Natural Labradorite Laughing Buddha Statue (4.5 kg) | Crystal Jaipuria",
  "special-sphatik-crystal-lingam-for-temple": "Monumental 16.3 kg Sphatik Crystal Lingam for Temple | Crystal Jaipuria",
  "goddess-kali-in-black-obsidian": "Natural Black Obsidian Goddess Kali Statue | Crystal Jaipuria",
  "intricately-carved-wooden-ganesha-shrine": "Intricately Carved Wooden Ganesha Shrine (12 in) | Crystal Jaipuria",
  "natural-lapis-lazuli-ganesha-idol": "Natural Lapis Lazuli Ganesha Idol (1.55 kg) | Crystal Jaipuria",
  "lapis-lazuli-ganesha-with-arch": "Hand-Carved Lapis Lazuli Ganesha with Arch (3.2 kg) | Crystal Jaipuria",
  "dark-green-aventurine-ganesha-idol": "Dark Green Aventurine Ganesha Idol (2.1 kg) | Crystal Jaipuria",
  "green-jade-stone-ganesha-with-arch": "Green Jade Stone Ganesha with Arch (11 in) | Crystal Jaipuria",
  "natural-jade-stone-ganesha-with-arch": "Natural Green Jade Ganesha with Arch (5.8 kg) | Crystal Jaipuria",
  "corundum-ruby-gemstone-ganesh-statue": "Natural Corundum Ruby Ganesha Statue (12.5 kg) | Crystal Jaipuria",
  "silver-natural-rose-quartz-stone-shrinath-ji": "Silver Natural Rose Quartz Shrinath Ji Idol | Crystal Jaipuria"
};

export const getProductMetaTitle = (productName, slug = "") => {
  if (!productName) return "Crystal Jaipuria | Gemstone Statues & Sphatik Manufacturer";

  // Check direct high-intent mapping
  const normalizedSlug = (slug || "").toLowerCase().trim();
  if (normalizedSlug && SUPER_TITLE_MAPPINGS[normalizedSlug]) {
    return SUPER_TITLE_MAPPINGS[normalizedSlug];
  }

  // Check matching by product name keyword
  const lowerName = productName.toLowerCase();
  for (const [key, superTitle] of Object.entries(SUPER_TITLE_MAPPINGS)) {
    const keyword = key.replace(/-/g, " ");
    if (lowerName.includes(keyword) || keyword.includes(lowerName)) {
      return superTitle;
    }
  }

  const brand = " | Crystal Jaipuria";
  const cleanName = productName.trim();

  if (cleanName.length + brand.length <= 60) {
    return `${cleanName}${brand}`;
  }

  const maxNameLen = 60 - brand.length;
  let trimmed = cleanName.slice(0, maxNameLen);
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace > 15) {
    trimmed = trimmed.slice(0, lastSpace);
  }
  trimmed = trimmed
    .replace(/[\s,\-_|]+$/, "")
    .replace(/\s+(with|of|and|in|for|on|the|a|an|to|from|by)$/i, "")
    .trim();

  return `${trimmed}${brand}`;
};

export const SUPER_DESCRIPTION_MAPPINGS = {
  "australian-jade-chrysoprase-ganesha": "Handcrafted 1.45 kg Natural Australian Jade Chrysoprase Ganesha Statue (7 in) with Arch. 100% certified gemstone Ganpati murti for luxury home temple from Jaipur.",
  "ruby-panchmukhi-ganesha-carving-833": "Sacred 833 Carats Natural Corundum Ruby Panchmukhi Ganesha Carving (5 Faces). Authentic gemstone Vinayaka murti for 5-directional protection & Vastu in Jaipur.",
  "milky-quartz-ganesh-statue-with-gold": "Buy handcrafted 1.35 kg Natural Milky Quartz Ganesh Statue (6.5 in) with 24K Pure Gold Leaf Paint work. Certified luxury gemstone idol for Diwali puja & mandir.",
  "natural-hand-carved-rose-quartz-ganesha": "Handcrafted 850 g Natural Rose Quartz Ganesha Gemstone Statue (4.5 in). 100% certified pink quartz Ganpati idol for love, peace, harmony & home temple pooja.",
  "natural-handmade-emerald-ganesha-statue": "Rare 1420 Carats Natural Emerald (Panna Beryl) Ganesha Gemstone Statue (4.2 in). Authentic handcrafted green stone Ganpati murti for intellect, wealth & business.",
  "ruby-ganesha-2195-carat-hand-carved-ruby": "Monumental 2195 Carats (439 g) Natural Corundum Ruby Ganesha Statue (5.2 in) with Zoisite Arch. Museum-grade certified gemstone Ganpati sculpture from Jaipur.",
  "ruby-ganesha-idol-25-handcrafted-statue": "Handcrafted 560 Carats Natural Ruby Ganesha Idol (2.5 Inch). Authentic corundum gemstone Ganpati murti for personal mandir altar, car dashboard & gifting in Jaipur.",
  "blue-sapphire-shiva-head-handmade": "Exquisite 1.15 kg (5750 Carats) Natural Blue Sapphire (Neelam) Shiva Head Sculpture (5.5 in). Master-carved gemstone Mahadev idol for meditation & Third Eye focus.",
  "ruby-zoisite-ganesha-statue-hand-carved": "Handcrafted 1180 Carats Natural Ruby Zoisite (Anyolite) Ganesha Statue (4.8 in) with Carved Arch. Dual-tone red-green gemstone Ganpati murti for prosperity & Vastu.",
  "natural-emerald-green-stone-shivling": "Handcrafted 420 g Natural Emerald Green Stone Shivling (2.8 in). Authentic gemstone Shiva Lingam for holy Jalabhishek, positive aura & mandir pooja from Jaipur.",
  "breathtaking-natural-hessonite-garnet-shivling": "Sacred 385 g Natural Hessonite Garnet (Gomedh) Shivling (2.6 in). Consecrated gemstone Shiva Linga for Rahu Dosha Shanti, mental focus & daily Jalabhishek in Jaipur.",
  "emerald-ganesh-statue-3625-carat-ganesh": "Heirloom 3625 Carats (725 g) Natural Emerald (Panna Beryl) Ganesh Statue (6.0 in). Master lapidary deity carving in untreated emerald for royal luxury home decor.",
  "green-aventurine-diya": "Handcrafted Natural Green Aventurine Diya (Deepak) for mandir pooja. 100% natural healing gemstone oil lamp for inviting prosperity, heart chakra peace & luck.",
  "green-jade-diya": "Handcrafted Natural Green Jade Diya (Deepak) for temple aarti. Pure jade gemstone oil lamp consecrated for inviting Goddess Mahalakshmi & wealth into your home.",
  "moonstone-diya": "Exquisite Handcrafted Natural Moonstone Diya for home mandir pooja. Luminous gemstone deepak radiating calming lunar energy, emotional balance & spiritual grace.",
  "yellow-aventurine-diya": "Handcrafted Natural Yellow Aventurine Gemstone Diya for mandir altar. Auspicious golden stone deepak for solar plexus vitality, optimism & divine illumination.",
  "rose-quartz-diya": "Handcrafted Natural Rose Quartz Diya (Deepak) for mandir pooja & Diwali aarti. 100% natural pink gemstone diya for radiating unconditional love, peace & positivity.",
  "lapis-lazuli-diya": "Royal Natural Lapis Lazuli Diya with golden pyrite specks. Handcrafted deep blue gemstone deepak for Third Eye awakening, sacred temple aarti & mental clarity.",
  "black-agate-diya": "Handcrafted Natural Black Agate (Kala Hakik) Diya for mandir pooja. Powerful gemstone deepak for warding off negative energies, evil eye & Saturn/Rahu protection.",
  "emerald-ganesha-idol": "Buy handcrafted Natural Emerald (Panna Beryl) Ganesha Idol. Consecrated green gemstone Ganpati murti for intellect, business growth, Mercury graha & pooja altar.",
  "tiger-eye-ganesha-idol": "Handcrafted Natural Tiger Eye Ganesha Idol (4 Inch). Chatoyant golden-brown gemstone Ganpati murti for overcoming fears, career breakthroughs & auspicious beginnings.",
  "sunstone-ganesha": "Hand-carved Natural Sparkling Sunstone Ganesha Idol. Radiant golden peach gemstone Ganpati murti for leadership, solar strength, business prosperity & mandir pooja.",
  "lapis-lazuli-elephant-idols-set-of-2": "Buy handcrafted Pair of 2 Natural Lapis Lazuli Elephant Statues. Auspicious gemstone Gajraj idols for main entrance Vastu, royal decor & wisdom from Jaipur.",
  "jasper-shree-yantra": "Sacred Natural Red Jasper Shree Yantra 3D Meru. Hand-carved earth gemstone Sri Chakra for root chakra grounding, physical vitality, wealth & Vastu protection.",
  "gomedh-shree-yantra": "Handcrafted Natural Hessonite Garnet (Gomedh) Shree Yantra 3D Meru. Sacred gemstone Sri Chakra for Rahu Dosha Shanti, mental peace & financial stability from Jaipur.",
  "cats-eye-shree-yantra": "Handcrafted Natural Cat's Eye Quartz Shree Yantra 3D Meru with chatoyant honey-yellow light band. Consecrated for Ketu Graha Shanti, wealth protection & sudden gains.",
  "rose-quartz-kurma-shree-yantra": "Sacred Natural Rose Quartz Kurma Shree Yantra mounted on divine Kashyap Tortoise base. Handcrafted pink quartz Sri Chakra for stability, love, wealth & Vastu peace.",
  "lapis-lazuli-shree-yantra": "Sacred Natural Lapis Lazuli Shree Yantra 3D Meru with golden pyrite inclusions. Mastercrafted Vedic Sri Chakra for higher wisdom, spiritual awakening & prosperity.",
  "labradorite-shree-yantra": "Sacred Natural Labradorite Shree Yantra 3D Meru with iridescent blue flash. Authentic gemstone Sri Chakra for spiritual intuition, wealth & North-East Vastu placement.",
  "howlite-shree-yantra": "Handcrafted Natural White Howlite Shree Yantra 3D Meru with grey veining. Pure calming gemstone Sri Chakra for stress reduction, spiritual stillness & mandir pooja.",
  "fluorite-shree-yantra": "Sacred Natural Multi-Color Rainbow Fluorite Shree Yantra 3D Meru. Stunning banded purple-green gemstone Sri Chakra for mental focus, aura purification & Vastu harmony.",
  "emerald-shree-yantra-on-lotus": "Buy precious Natural Emerald (Panna) Shree Yantra hand-carved on sacred Lotus flower base. Authentic gemstone Sri Chakra for Budh Graha blessings & business growth.",
  "blue-sunstone-shree-yantra": "Handcrafted Natural Blue Sunstone Shree Yantra 3D Meru with shimmering galaxy sparkles. Consecrated gemstone Sri Chakra for career ambition, success & positive vibes.",
  "blue-sodalite-shree-yantra": "Handcrafted Natural Blue Sodalite Shree Yantra 3D Meru. Royal blue gemstone Sri Chakra for emotional balance, peaceful communications, intellect & temple pooja.",
  "amethyst-shree-yantra": "Sacred Natural Purple Amethyst Shree Yantra 3D Meru. Mastercrafted Vedic Sri Chakra for Crown Chakra activation, spiritual clarity, meditation & Lakshmi blessings.",
  "yellow-jade-shree-yantra": "Buy sacred Natural Yellow Jade Shree Yantra 3D Meru. Warm golden gemstone Sri Chakra consecrated for Guru Brihaspati blessings, knowledge, wealth & temple pooja.",
  "unakite-shree-yantra": "Handcrafted Natural Green & Pink Unakite Shree Yantra 3D Meru. Sacred gemstone Sri Chakra for emotional healing, relationship harmony & North-East Vastu balance.",
  "tiger-eye-shree-yantra": "Handcrafted Natural Tiger Eye Shree Yantra 3D Meru. Dynamic chatoyant golden gemstone Sri Chakra for shielding against evil eye, business growth & Vastu balance.",
  "sunstone-shree-yantra": "Handcrafted Natural Golden Sunstone Shree Yantra 3D Meru. Shimmering solar gemstone Sri Chakra for leadership authority, vitality, self-confidence & wealth attraction.",
  "red-jade-shree-yantra": "Buy sacred Natural Red Jade Shree Yantra 3D Meru. Hand-carved Vedic Sri Chakra gemstone yantra for financial abundance, Mahalakshmi blessings & Vastu dosha nivaran.",
  "amethyst-gemston-angel": "Handcrafted Natural Purple Amethyst Gemstone Guardian Angel Pocket Figurine. 100% natural quartz carving for Crown Chakra opening, psychic protection & Reiki healing.",
  "crystal-clear-mahvaveer-ji-statue": "Handcrafted Flawless Clear Crystal Quartz Bhagwan Mahaveer Ji Statue. Consecrated 24th Jain Tirthankara gemstone idol for home jinalaya, ahimsa & spiritual liberation.",
  "gemston-amethyst-diya": "Handcrafted Natural Purple Amethyst Gemstone Diya (Deepak) for mandir pooja & aarti. 100% natural quartz carving for radiating peace, spiritual serenity & positivity.",
  "black-agate-gemstone-carving-of-ganesh": "Majestic 2 kg Natural Black Agate (Kala Hakik) Ganesha Idol (8 Inch). Authentic gemstone Ganpati murti for overcoming hurdles, Vastu protection & auspicious wealth.",
  "crystal-sphtik-shree-yantra-on-kamal-flower": "Authentic Natural Sphatik (Clear Quartz) Shree Yantra mounted on sculpted Lotus Flower. Pure geometric Vedic Meru Chakra for Mahalakshmi grace & wealth in home temple.",
  "green-jade-carving-shiva-face-statue": "Handcrafted 1 kg Natural Green Jade Shiva Face Idol (5 Inch). Master carved gemstone Mahadev murti for home temple pooja & peace from Jaipur at direct factory price.",
  "lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva": "Handcrafted Natural Lapis Lazuli Shiva Linga with sculpted Shiva Face (Mukhalingam). Authentic golden pyrite-flecked royal blue stone for daily Jalabhishek & pooja.",
  "green-jade-elephant-staute": "Handcrafted Natural Green Jade Elephant (Gajraj) Statue with raised trunk. Auspicious gemstone animal carving for good luck, strength, regal luxury & Vastu stability.",
  "natural-ruby-shivling": "Buy 100% Certified Natural Ruby (Manik Corundum) Gemstone Shivling. Deep crimson stone Shiva Lingam for Surya Graha blessings, spiritual leadership & sacred pooja.",
  "green-jade-panchmukhi-shivling": "Buy 100% Certified Natural Green Jade Stone Panchmukhi Shivling. 5 divine faces of Pashupatinath Mahadev. Handcrafted in Jaipur at factory direct price.",
  "pyrite-gemston-shivling": "Handcrafted Natural Golden Pyrite Gemstone Shivling for Home Temple & Jalabhishek. Rare metallic golden Shiva Lingam for attracting money, solar energy & Kuber grace.",
  "green-jade-carved-shree-krishana-statue": "Handcrafted Natural Green Jade Shree Krishna Statue with Flute & Peacock Feather. Consecrated green gemstone Murli Manohar murti for joyful home temple pooja.",
  "blue-sapphire-carving-shiva-statue": "Rare Masterpiece Handcrafted 400 g Natural Blue Sapphire (Neelam Corundum) Lord Shiva Statue. 100% certified unheated gemstone Mahadev murti from Jaipur manufacturer.",
  "gemston-ruby-shree-yantra": "Precious Natural Corundum Ruby Shree Yantra 3D Meru. Sacred deep crimson gemstone Sri Chakra consecrated for supreme royalty, Surya grace & unending prosperity.",
  "natural-rose-quartz-pair-of-swan": "Handcrafted Pair of 2 Natural Rose Quartz Swans (Hamsa Love Birds). 100% natural pink gemstone carving for marital harmony, bedroom Vastu, gifting & unconditional love.",
  "green-jade-shiva-statue-with-gold-panting": "Handcrafted Natural Green Jade Lord Shiva Statue detailed with authentic 24K Gold Leaf Paint work. Royal gemstone Mahadev murti for Vastu harmony & sacred pooja.",
  "clear-crystal-quartz-shivling-with-shiva-face": "Exquisite Handcrafted 500 g Natural Clear Quartz (Sphatik) Shivling with sculpted Shiva Face. Flawless crystal Mukhalingam for sacred Jalabhishek & home mandir.",
  "natural-sphatik-shivling": "Buy 100% original certified Natural Sphatik Shivling directly from Jaipur manufacturer. Flawless clear quartz lingam for daily Jalabhishek with lab certificate.",
  "natural-opal-stone-shivling": "Buy 100% Certified Natural Opal Stone Shivling (Upal Ratna) for Jalabhishek. Rare iridescent gemstone Shiva Lingam for Venus Shukra grace, beauty & luxury in Jaipur.",
  "natural-lapis-lazuli-shiva-face-carving-idol": "Hand-carved 500 g Natural Lapis Lazuli Shiva Face Idol with natural golden pyrite flecks. Master crafted royal blue Mahadev murti for Third Eye awakening & pooja.",
  "natural-lapis-lazuli-lord-krishna-statue": "Handcrafted Natural Lapis Lazuli Lord Krishna Statue with divine flute pose. Deep royal blue gemstone Banke Bihari murti with golden pyrite flecks for mandir altar.",
  "natural-tiger-eye-gemstone-shivling": "Handcrafted Natural Tiger Eye Gemstone Shivling. Chatoyant golden-brown quartz Shiva Lingam for courage, solar plexus vitality & daily Jalabhishek from Jaipur.",
  "natural-howlite-gemstone-shivling": "Handcrafted Natural White Howlite Gemstone Shivling with delicate grey veining. Pure calming crystal Shiva Lingam for stress relief, mental stillness & Jalabhishek.",
  "rose-quartz-shiva-statue-with-gold-painting": "Handcrafted Natural Rose Quartz Shiva Statue (10 Inch) embellished with 24K Pure Gold Leaf work. Divine pink gemstone Mahadev murti for compassionate pooja & peace.",
  "natural-labradorite-gemstone-shivling": "Handcrafted Natural Labradorite Gemstone Shivling with mesmerizing iridescent blue flash. Mystical gemstone Shiva Lingam for higher consciousness & daily Jalabhishek.",
  "green-jade-radha-krishna-statue-carving": "Exquisite 5 kg Natural Green Jade Radha Krishna Statue (15 Inch). Master lapidary deity carving in untreated natural green jade for luxury home temple from Jaipur.",
  "smokey-quartz-crystal-shiva-face-idol": "Buy 1.1 kg Natural Smokey Quartz Shiva Face Idol. Hand-carved grounding crystal Mahadev sculpture for negative energy clearing, meditation & mandir pooja in Jaipur.",
  "green-jade-goddess-maa-saraswati-carving": "Buy Handcrafted Natural Green Jade Goddess Maa Saraswati Carving with Veena & Hamsa. Auspicious gemstone deity idol for wisdom, arts, education & student study tables.",
  "green-aventurine-parshvanath-ji-statue": "Handcrafted Natural Green Aventurine Lord Parshvanath Ji Statue. 23rd Jain Tirthankara meditation murti under divine Dharanendra serpent hood for temple jinalaya.",
  "green-jade-mahalakshmi-ji-idol": "Handcrafted Natural Green Jade Goddess Lakshmi (Mahalakshmi) Idol. Sacred green gemstone deity murti for inviting fortune, financial stability & Diwali blessings.",
  "natural-amethyst-gemstone-shiva-face-idol": "Handcrafted Natural Deep Purple Amethyst Shiva Face Idol (3 Inch). Royal gemstone Mahadev sculpture for spiritual awakening, Third Eye clarity & sacred mandir pooja.",
  "rose-quartz-carved-shree-krishna-ji-idol": "Handcrafted Natural Rose Quartz Shree Krishna Ji Idol. Exquisite pink gemstone Murli Manohar deity murti for fostering love, bhakti, joy & auspicious family harmony.",
  "tiger-eye-carving-shiva-statue": "Handcrafted Natural Tiger Eye Lord Shiva Statue (1.2 kg). Dynamic chatoyant golden gemstone Mahadev idol for courage, protection, vitality & daily temple worship.",
  "rose-quartz-bhagwan-mahaveer-statue": "Handcrafted Natural Rose Quartz Bhagwan Mahaveer Ji Statue. Serene Jain 24th Tirthankara meditation idol in natural pink gemstone for ahimsa, inner peace & mandir.",
  "natural-yellow-jade-ganesha-statue": "Handcrafted 850 g Natural Yellow Jade Ganesha Statue. Radiant golden gemstone Ganpati murti for auspicious beginnings, Jupiter graha blessings & financial success.",
  "labradorite-power-mini-shiva-face": "Buy handcrafted Natural Labradorite Shiva Face Idol with stunning royal blue peacock flash. 100% natural healing gemstone Mahadev murti from Jaipur manufacturer.",
  "blue-sodalite-carving-shiva-face-idol": "Handcrafted Natural Blue Sodalite Shiva Face Idol. Deep royal blue gemstone Mahadev carving with white calcite veining for mental peace, clarity & sacred pooja.",
  "natural-red-jasper-gemstone-shivling": "Handcrafted Natural Red Jasper Gemstone Shivling for Home Temple & Jalabhishek. Grounding brick-red crystal Shiva Lingam for root chakra strength, courage & pooja.",
  "natural-blue-sodalite-hanuman-ji-statue": "Handcrafted 1.1 kg Natural Blue Sodalite Hanuman Ji Statue (Gada & Sanjeevani Parvat). Royal blue gemstone Bajrangbali murti for courage, protection & victory.",
  "blue-sodalite-carved-lord-shiva-statue": "Handcrafted 1.2 kg Natural Blue Sodalite Lord Shiva Statue with intricate carving of Trishul & Ganga. Royal blue gemstone Mahadev murti for devotion & tranquility.",
  "rose-quartz-ganesha-with-gold-painted": "Handcrafted Natural Rose Quartz Ganesha Idol (1 kg, 8 in) adorned with 24K Gold Paint work. Auspicious pink gemstone Ganpati murti for luxury home temple & gifts.",
  "blue-sodalite-carved-ganesha-statue": "Handcrafted Natural Blue Sodalite Ganesha Idol for home temple & Vastu. Royal blue stone Ganpati murti for wisdom, throat chakra balance & removing obstacles.",
  "crystal-shivling": "Buy 100% original certified Sphatik Shivling in Jaipur directly from manufacturer. Ideal for daily Jalabhishek. Visit our Sanganer workshop or order online.",
  "crystal-ganesha": "Handcrafted 410 g Natural Clear Crystal Quartz (Sphatik) Ganesha Idol. Flawless transparent gemstone Ganpati murti for mandir altar, purity & obstacle removal.",
  "green-jade-shivling": "Buy 100% Certified Natural Green Jade Shivling for home temple Jalabhishek. Sacred emerald green gemstone Shiva Lingam for health, prosperity & Mahadev blessings.",
  "green-jade-shree-yantra": "Sacred Natural Green Jade Shree Yantra 3D Meru (480 g, 3.0 Inch). Authentic Vedic gemstone Sri Chakra for Kuber Lakshmi wealth attraction & business prosperity.",
  "rose-quartz-ganesha": "Handcrafted Natural Rose Quartz Ganesha Idol (370 g). Soothing pink crystal Ganpati murti for loving family relationships, heart chakra peace & daily mandir pooja.",
  "green-jade-ganesha": "Handcrafted 460 g Natural Green Jade Ganesha Idol. Auspicious green gemstone Ganpati murti for overcoming business hurdles, wealth attraction & Vastu harmony.",
  "crystal-shree-yantra": "Authentic Handcrafted Natural Sphatik (Clear Quartz) Shree Yantra 3D Meru. Sacred geometric Vedic Sri Chakra for attracting Goddess Lakshmi & financial abundance.",
  "natural-ruby-radha-krishna-idol-hand-carved": "Precious 616 g Natural Corundum Ruby Radha Krishna Idol (4.2 in). Handcrafted divine couple gemstone carving for sacred love, temple pooja & heirloom luxury decor.",
  "hand-carved-ruby-ganesha": "Exquisite Handcrafted Natural Corundum Ruby Ganesha Gemstone Statue. 100% certified deep crimson Ganpati murti for courage, leadership & overcoming obstacles.",
  "australian-jade-ganesha-carving": "Handcrafted 462 g Natural Australian Jade Ganesha Carving (4.2 in). Auspicious translucent apple-green gemstone Ganpati murti for prosperity & luxury decor in Jaipur.",
  "hand-carved-rose-quartz-ganesha-with-sterling-silver-testing": "Luxury Handcrafted Rose Quartz Ganesha Idol detailed with 925 Sterling Silver Work. 100% natural certified gemstone Ganpati murti for luxury home decor from Jaipur.",
  "green-jade-carved-ganesha-statue-with-silver-gold-work": "Luxury 4 kg Green Jade Ganesha Statue with 925 Sterling Silver Prabhavali & 24K Gold Mukut. 100% natural certified gemstone idol for luxury home decor & gifting.",
  "rose-quartz-ganesh-with-silver-work-idol-for-luxury-decor": "Buy luxury Handcrafted Rose Quartz Ganesh with 925 Sterling Silver Work & 24K Gold Mukut. 100% natural certified gemstone idol for luxury home decor from Jaipur.",
  "shiva-in-lepidolite": "Handcrafted Natural Lilac Lepidolite Lord Shiva Statue. High-lithium calming gemstone Mahadev carving revered for Rahu Mahadasha peace, anxiety relief & meditation.",
  "nataraja-dancing-shiva-sunstone-idol": "Exquisite Hand-Carved Natural Golden Sunstone Nataraja Dancing Shiva Idol (10.5 Inch). Glorious cosmic dance of Mahadev in sparkling sunstone from Jaipur lapidary.",
  "green-aventurine-shankh": "Handcrafted Natural Green Aventurine Sacred Shankh (Conch Shell) for mandir altar. Auspicious gemstone carving for inviting Goddess Mahalakshmi & financial abundance.",
  "durga-devi-ruby-idol": "Exquisite Hand-Carved Natural Corundum Ruby Goddess Durga Idol seated on divine Lion (Simhavahini). 100% certified gemstone Shakti murti for Navratri & daily pooja.",
  "ruby-kyanite-buddha": "Magnificent 12.6 kg Natural Ruby in Kyanite Meditating Buddha Statue (14 Inch). Rare dual-gemstone spiritual sculpture for zen decor, meditation hall & Vastu.",
  "sodalite-buddha": "Grand 18.2 kg Natural Blue Sodalite Meditating Buddha Statue (17 Inch). Museum-grade lapidary masterpiece in deep blue sodalite for meditation centers & luxury homes.",
  "tea-set-in-crystal-quartz": "Luxury Handcrafted 2.45 kg Clear Crystal Quartz Tea Set with 1 Teapot & 4 Cups. 100% natural earth-mined healing quartz tableware by master Jaipur lapidary artisans.",
  "7-running-horses-in-lapis-lazuli": "Handcrafted 7 Running Horses Sculpture in Royal Blue Natural Lapis Lazuli. Highly auspicious Vastu artwork for career speed, business success & financial momentum.",
  "carving-of-4-horse-bust-together-in-lapis-lazuli": "Handcrafted 4 Horse Bust Sculpture in Natural Royal Blue Lapis Lazuli with golden pyrite specks. Power, victory & speed Vastu gemstone artwork from Jaipur.",
  "tirupati-balaji-in-tiger-eye": "Buy handcrafted 3.6 kg Natural Tiger Eye Tirupati Balaji Murti. 100% certified golden gemstone Lord Venkateswara idol for mandir & vastu from Jaipur manufacturer.",
  "goddess-tara-in-green-aventurine": "Handcrafted Goddess Green Tara Statue (10 Inch, 4.2 kg) in Natural Green Aventurine. Revered Buddhist deity of compassion, swift protection & heart chakra healing.",
  "green-aventurine-lord-shiva": "Buy 6.4 kg Natural Green Aventurine Lord Shiva Statue (10 Inch). Hand-carved Mahadev murti with Trishul & Damru for heart chakra healing, peace & temple pooja.",
  "ruby-ram-darbar-carving": "Masterpiece 4.85 kg Natural Corundum Ruby Ram Darbar Carving depicting Lord Ram, Sita Mata, Lakshman & Hanuman Ji. 100% certified royal heirloom sculpture from Jaipur.",
  "lord-krishna-in-ruby-zoisite": "Divine Lord Krishna playing Flute (Murli Manohar) carved in Natural Ruby Zoisite (Anyolite). Contrast green-red natural gemstone carving for love, joy & temple decor.",
  "lord-parasnath-in-lapis-lazuli": "Handcrafted Royal Blue Natural Lapis Lazuli Lord Parshvanath Ji Idol with 7-hooded serpent arch. Sacred Jain Tirthankara gemstone murti with golden pyrite flecks.",
  "buddha-in-ruby-kyanite": "Handcrafted 8.5 kg Natural Ruby in Kyanite Buddha Statue (12 Inch). Rare spiritual gemstone carving combining ruby passion with kyanite tranquility for home & zen spa.",
  "lord-ganesha-in-green-aventurine": "Handcrafted Natural Green Aventurine Lord Ganesha Idol for home temple & office entrance. Auspicious Ganpati murti for new beginnings, prosperity & heart healing.",
  "laughing-buddha-in-labradorite": "Handcrafted 4.5 kg Natural Labradorite Laughing Buddha Statue (10 Inch) with iridescent blue flash. Auspicious Feng Shui & Vastu gemstone sculpture for prosperity.",
  "special-sphatik-crystal-lingam-for-temple": "Grand 16.3 kg Flawless Natural Sphatik (Clear Quartz) Crystal Lingam for Mandir & Shiva Temple. Certified museum-grade gemstone Shiva Linga for grand Jalabhishek.",
  "goddess-kali-in-black-obsidian": "Master Hand-Carved Natural Black Obsidian Goddess Kali Statue. Powerful gemstone Mahakali murti for evil eye protection, fearlessness, Tantra sadhana & Vastu defense.",
  "intricately-carved-wooden-ganesha-shrine": "Buy exquisite 12-inch Intricately Carved Wooden Ganesha Shrine & Temple Sculpture (2.4 kg). Master handcrafted spiritual artwork for home temple from Crystal Jaipuria.",
  "natural-lapis-lazuli-ganesha-idol": "100% authentic 1.55 kg Natural Lapis Lazuli Ganesha Idol. Hand-carved deep royal blue gemstone Ganpati murti with natural golden pyrite flecks at wholesale price.",
  "lapis-lazuli-ganesha-with-arch": "Buy master-crafted 3.2 kg Natural Lapis Lazuli Lord Ganesha with Arch (Prabhavali). Authentic golden pyrite-flecked royal blue gemstone idol from Crystal Jaipuria.",
  "dark-green-aventurine-ganesha-idol": "Handcrafted 2.1 kg Dark Green Aventurine Ganesha Idol from Jaipur. Auspicious Ganpati murti for vastu, heart chakra healing & prosperity at manufacturer price.",
  "green-jade-stone-ganesha-with-arch": "Buy 11-inch Handcrafted Green Jade Stone Ganesha with Arch (2.85 kg). Authentic natural green jade carving for prosperity & spiritual decor at factory direct price.",
  "natural-jade-stone-ganesha-with-arch": "Shop luxury 5.8 kg Natural Green Jade Stone Ganesha with Arch (Prabhavali). Master artisan carved Lord Ganesha for vastu, prosperity & temple decor from Jaipur.",
  "corundum-ruby-gemstone-ganesh-statue": "Buy authentic 12.5 kg Hand-Carved Corundum Ruby Gemstone Ganesha Statue from Crystal Jaipuria. Certified natural ruby idol for puja & vastu at direct factory price.",
  "silver-natural-rose-quartz-stone-shrinath-ji": "Buy handcrafted Natural Rose Quartz Shrinath Ji Statue with 925 Silver Artistry (2.5-3 kg, 3.5 in). Certified gemstone deity idol from Jaipur manufacturer."
};

export const getProductMetaDescription = (product) => {
  if (!product) {
    return "Shop authentic handcrafted gemstone god statues, crystal carvings & spiritual decor from Crystal Jaipuria, Jaipur. Best wholesale & retail prices.";
  }

  const slug = (product.slug || "").toLowerCase().trim();
  if (slug && SUPER_DESCRIPTION_MAPPINGS[slug]) {
    return SUPER_DESCRIPTION_MAPPINGS[slug];
  }

  const name = (product.name || "").trim();
  let rawDesc = (product.description || product.detail || "").replace(/\r?\n|\r/g, " ");
  const specIndex = rawDesc.indexOf("Product Specifications");
  if (specIndex > 0) {
    rawDesc = rawDesc.slice(0, specIndex);
  }
  rawDesc = rawDesc.replace(/\s+/g, " ").trim();

  if (rawDesc && rawDesc.length >= 80) {
    if (rawDesc.length <= 160) {
      return rawDesc;
    }
    const target = rawDesc.slice(0, 157);
    const lastSpace = target.lastIndexOf(" ");
    const truncated = (lastSpace > 100 ? target.slice(0, lastSpace) : target)
      .replace(/[\s,\-_|.:]+$/, "")
      .trim();
    return `${truncated}...`;
  }

  const crafted = `Buy handcrafted ${name} from Crystal Jaipuria, Jaipur. Premium natural gemstone for home, temple & spiritual Vastu decor. Global shipping available.`;
  if (crafted.length <= 160) {
    return crafted;
  }
  const target = crafted.slice(0, 157);
  const lastSpace = target.lastIndexOf(" ");
  const truncated = (lastSpace > 100 ? target.slice(0, lastSpace) : target)
    .replace(/[\s,\-_|.:]+$/, "")
    .trim();
  return `${truncated}...`;
};

/**
 * Helper to safely extract clean numeric prices for Schema.org (handles "₹37500 - ₹75000", "6/GRAM", etc.)
 */
export const parseSchemaPrice = (raw) => {
  if (!raw) return { isRange: false, price: "999" };
  const str = String(raw).replace(/,/g, "");
  const matches = str.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length === 0) {
    return { isRange: false, price: "999" };
  }
  const nums = matches.map(Number).filter((n) => !isNaN(n) && n > 0);
  if (nums.length === 0) {
    return { isRange: false, price: "999" };
  }
  if (nums.length >= 2) {
    const low = Math.min(...nums);
    const high = Math.max(...nums);
    if (low !== high) {
      return {
        isRange: true,
        lowPrice: String(low),
        highPrice: String(high),
        price: String(low),
      };
    }
  }
  return { isRange: false, price: String(nums[0]) };
};

/**
 * Default high-intent gemstone FAQs for GEO, AEO, and Google Rich Snippets
 */
export const getDefaultProductFaqs = (productName = "Gemstone Idol") => [
  {
    question: `How can I verify that this ${productName} is 100% natural gemstone and not glass or synthetic resin?`,
    answer: `All our gemstone sculptures are handcrafted directly from natural earth-mined stones in Jaipur. Genuine natural gemstones exhibit organic internal inclusions, micro-veins, and remain naturally cool to the touch at room temperature, unlike plastic polymers or glass imitations.`,
  },
  {
    question: `Can I perform daily Jalabhishekam, Milk, or Panchamrit Puja on this idol?`,
    answer: `Yes, authentic natural gemstones (such as Sphatik Quartz, Green Jade, Black Agate, and Narmadeshwar stone) are naturally dense and water-resistant. You can safely perform daily Vedic Puja, Jalabhishekam, and Panchamrit rituals.`,
  },
  {
    question: `How is the gemstone idol packaged to prevent transit breakage?`,
    answer: `Every sculpture undergoes 5-layer shockproof protective sacred packaging: soft velvet wrapping, high-density bubble cushioning, custom thermocol casing, heavy-duty corrugated boxing, and waterproof stretch sealing to guarantee 100% breakage-free delivery across India and worldwide.`,
  },
  {
    question: `Where is this crafted and dispatched from?`,
    answer: `Hand-carved and directly dispatched by hereditary master stone carvers from Crystal Jaipuria's artisan workshop in Sanganer, Jaipur, Rajasthan (crafting sacred gemstone murti art since 1989).`,
  },
  {
    question: `What is your return and replacement policy?`,
    answer: `We provide a 7-day hassle-free return and replacement policy. In the rare event of transit damage or customer dissatisfaction, our Jaipur customer support team (+91 83063 17032) provides immediate replacement or full refund.`,
  },
];

export const toAbsoluteUrl = (url) => {
  if (!url) return "https://www.crystaljaipuria.com/logo.png";
  if (typeof url !== "string") return "https://www.crystaljaipuria.com/logo.png";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const clean = url.startsWith("/") ? url : `/${url}`;
  return `https://www.crystaljaipuria.com${clean}`;
};

/**
 * Generate Google Schema.org Product Structured Data (JSON-LD) with BreadcrumbList
 */
export const getProductSchema = (product, canonicalUrl) => {
  if (!product) return null;

  const vedicVastu = getVedicVastuForProduct(product);
  const parsedPrice = parseSchemaPrice(product.price || product.discountPrice);
  const cleanImage = getProductImageUrl(product, 0);
  const imageUrl = toAbsoluteUrl(cleanImage || "https://www.crystaljaipuria.com/logo.png");
  const desc = getProductMetaDescription(product);
  const categoryName = product.categoryId?.name || "Gemstone Statues";
  const categorySlug = product.categoryId?.slug || "";

  const breadcrumbs = [
    { name: "Home", url: "https://www.crystaljaipuria.com/" },
    { name: "Shop", url: "https://www.crystaljaipuria.com/shop" },
  ];

  if (categorySlug) {
    breadcrumbs.push({
      name: categoryName,
      url: `https://www.crystaljaipuria.com/${categorySlug}`,
    });
  }

  breadcrumbs.push({
    name: product.name,
    url: canonicalUrl,
  });

  const commonOfferFields = {
    priceCurrency: "INR",
    priceValidUntil: "2027-12-31",
    validFrom: "2024-01-01",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: "Crystal Jaipuria",
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "IN",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 7,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "INR",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "IN",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 2,
          unitCode: "d",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 3,
          maxValue: 7,
          unitCode: "d",
        },
      },
    },
  };

  let offersObj;
  if (parsedPrice.isRange) {
    offersObj = {
      "@type": "AggregateOffer",
      url: canonicalUrl,
      lowPrice: parsedPrice.lowPrice,
      highPrice: parsedPrice.highPrice,
      offerCount: "1",
      ...commonOfferFields,
    };
  } else {
    offersObj = {
      "@type": "Offer",
      url: canonicalUrl,
      price: Number(parsedPrice.price) || 999,
      ...commonOfferFields,
    };
  }

  if (product.pricePerUnit) {
    offersObj.priceSpecification = {
      "@type": "UnitPriceSpecification",
      price: Number(parsedPrice.price) || 0,
      priceCurrency: "INR",
      unitText: product.pricePerUnit,
    };
  }

  const graph = [
    {
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      name: product.name,
      image: Array.isArray(product.images) && product.images.length > 0
        ? product.images.map((_, idx) => toAbsoluteUrl(getProductImageUrl(product, idx)))
        : [imageUrl],
      description: desc,
      sku: product._id,
      mpn: product.slug || product._id,
      category: categoryName,
      brand: {
        "@type": "Brand",
        name: "Crystal Jaipuria",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: String(GOOGLE_BUSINESS_STATS.rating),
        reviewCount: String(GOOGLE_BUSINESS_STATS.reviewCount),
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Verified Collector",
          },
          datePublished: "2024-04-10",
          reviewBody: `Authentic handcrafted natural gemstone sculpture from Crystal Jaipuria. Exquisite Vedic carving, certified natural stone, and pristine artisan finishing.`,
        },
      ],
      offers: offersObj,
      additionalProperty: [
        vedicVastu?.placementDirection ? {
          "@type": "PropertyValue",
          name: "Vastu Placement Direction",
          value: vedicVastu.placementDirection,
        } : null,
        vedicVastu?.chakraPlanet ? {
          "@type": "PropertyValue",
          name: "Chakra & Ruling Planet",
          value: vedicVastu.chakraPlanet,
        } : null,
        product.weight ? {
          "@type": "PropertyValue",
          name: "Weight",
          value: String(product.weight),
        } : null,
        product.size ? {
          "@type": "PropertyValue",
          name: "Dimensions",
          value: String(product.size),
        } : null,
        product.pricePerUnit ? {
          "@type": "PropertyValue",
          name: "Price per Unit",
          value: String(product.pricePerUnit),
        } : null,
      ].filter(Boolean),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];

  let parsedFaqs = [];
  if (product.faqs) {
    try {
      parsedFaqs = typeof product.faqs === "string" ? JSON.parse(product.faqs) : product.faqs;
    } catch {
      parsedFaqs = [];
    }
  }
  if (!Array.isArray(parsedFaqs) || parsedFaqs.length === 0) {
    parsedFaqs = getDefaultProductFaqs(product.name);
  }
  const validFaqs = (parsedFaqs || []).filter((f) => f && f.question && f.answer);
  if (validFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: validFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org/",
    "@graph": graph,
  };
};

/**
 * Generate Google Schema.org BreadcrumbList Structured Data (JSON-LD)
 */
export const getBreadcrumbSchema = (items) => {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Generate Google Schema.org Article Structured Data (JSON-LD)
 * Includes BlogPosting, Breadcrumbs, and FAQPage schemas.
 */
export const getArticleSchema = (blog, canonicalUrl) => {
  if (!blog) return null;

  const blogImageUrl = toAbsoluteUrl(blog.coverImage?.url || "https://www.crystaljaipuria.com/logo.png");
  const authorName = blog.author || "Crystal Jaipuria Artisans";
  const datePublished = blog.createdAt || new Date().toISOString();
  const dateModified = blog.updatedAt || blog.createdAt || new Date().toISOString();

  // Compute wordCount if blog content is present
  let wordCount = undefined;
  if (blog.content) {
    const plainText = typeof blog.content === "string" ? blog.content.replace(/<[^>]*>/g, " ") : "";
    const words = plainText.trim().split(/\s+/).filter(Boolean);
    if (words.length > 50) {
      wordCount = words.length;
    }
  }

  const websiteSchema = {
    "@type": "WebSite",
    "@id": "https://www.crystaljaipuria.com/#website",
    "url": "https://www.crystaljaipuria.com",
    "name": "Crystal Jaipuria",
    "description": "Original Gemstones, Crystal Idols & Certified Shivlings in Jaipur",
    "publisher": {
      "@id": "https://www.crystaljaipuria.com/#organization"
    },
    "inLanguage": "en-IN"
  };

  const organizationSchema = {
    "@type": "Organization",
    "@id": "https://www.crystaljaipuria.com/#organization",
    "name": "Crystal Jaipuria",
    "url": "https://www.crystaljaipuria.com",
    "logo": {
      "@type": "ImageObject",
      "@id": "https://www.crystaljaipuria.com/#logo",
      "url": "https://www.crystaljaipuria.com/logo.png",
      "contentUrl": "https://www.crystaljaipuria.com/logo.png",
      "caption": "Crystal Jaipuria"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9829000000",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    ]
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": canonicalUrl,
    "url": canonicalUrl,
    "name": blog.metaTitle || blog.title,
    "isPartOf": {
      "@id": "https://www.crystaljaipuria.com/#website"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "@id": `${canonicalUrl}#primaryimage`,
      "url": blogImageUrl,
      "contentUrl": blogImageUrl
    },
    "breadcrumb": {
      "@id": `${canonicalUrl}#breadcrumb`
    },
    "inLanguage": "en-IN"
  };

  const articleSchema = {
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    "isPartOf": {
      "@id": canonicalUrl
    },
    "headline": blog.title,
    "name": blog.metaTitle || blog.title,
    "description": blog.metaDescription || blog.description || blog.title,
    "image": [blogImageUrl],
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@id": "https://www.crystaljaipuria.com/#organization"
    },
    "mainEntityOfPage": canonicalUrl,
    "inLanguage": "en-IN",
    "articleSection": blog.category || "Gemstone Guides",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".blog-content p:first-of-type"]
    }
  };

  if (wordCount) {
    articleSchema.wordCount = wordCount;
  }
  if (blog.keywords) {
    articleSchema.keywords = Array.isArray(blog.keywords) ? blog.keywords.join(", ") : blog.keywords;
  }
  if (blog.about) {
    articleSchema.about = blog.about;
  }
  if (blog.mentions && Array.isArray(blog.mentions)) {
    articleSchema.mentions = blog.mentions.map((item) => {
      if (item && item["@type"] === "Product") {
        return { ...item, "@type": "WebPage" };
      }
      return item;
    });
  }

  const breadcrumbsSchema = {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.crystaljaipuria.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.crystaljaipuria.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": canonicalUrl
      }
    ]
  };

  const graph = [websiteSchema, organizationSchema, webPageSchema, articleSchema, breadcrumbsSchema];

  // FAQ Page schema if present
  let parsedFaqs = [];
  if (blog.faqs) {
    try {
      parsedFaqs = typeof blog.faqs === "string" ? JSON.parse(blog.faqs) : blog.faqs;
    } catch {
      parsedFaqs = [];
    }
  }
  const validFaqs = (parsedFaqs || []).filter((f) => f && f.question && f.answer);
  if (validFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": validFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  // HowTo schema if present
  if (blog.howTo && blog.howTo.steps && Array.isArray(blog.howTo.steps)) {
    graph.push({
      "@type": "HowTo",
      "@id": `${canonicalUrl}#howto`,
      "name": blog.howTo.name || blog.title,
      "description": blog.howTo.description || blog.description,
      ...(blog.howTo.totalTime ? { "totalTime": blog.howTo.totalTime } : {}),
      "step": blog.howTo.steps.map((st, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": st.name,
        "text": st.text,
        ...(st.url ? { "url": st.url } : {})
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
};

/**
 * Format single price or price ranges (e.g. "300-700" -> "₹300 - ₹700", "6/GRAM" -> "₹6/GRAM")
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return "";
  let str = String(price).trim();
  if (!str) return "";

  // Check for price range like "300-700", "300 - 700", "₹300-700", "300 to 700"
  if (str.includes("-") || / to /i.test(str)) {
    const separator = str.includes("-") ? "-" : / to /i;
    const parts = str.split(separator).map((p) => p.trim());
    if (parts.length === 2 && parts[0] && parts[1]) {
      const p1 = parts[0].replace(/^₹\s*/, "").trim();
      const p2 = parts[1].replace(/^₹\s*/, "").trim();
      return `₹${p1} - ₹${p2}`;
    }
  }

  if (str.startsWith("₹")) {
    return str.replace(/^₹\s+/, "₹");
  }
  return `₹${str}`;
};
