const fs = require('fs');
const path = require('path');

const gscProducts = [
  {
    slug: 'natural-ruby-shivling',
    name: 'Natural Ruby Shivling',
    categoryName: 'Shivling',
    price: 8500,
    weight: '350 Grams - 1.5 Kg',
    dimension: '3.5 x 2.5 x 4.0 Inches',
    color: 'Deep Purplish Red',
    material: '100% Certified Natural Ruby Gemstone (Manikya)',
    image: '/Gemstone.webp',
    shortDetail: 'Authentic handcrafted Natural Ruby (Manik) Shivling carved from certified natural ruby stone for Surya planetary strength, prosperity and spiritual leadership.',
    metaTitle: 'Natural Ruby Shivling (100% Certified Manikya) | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Natural Ruby Shivling from Jaipur manufacturer. 100% certified pure Manik stone for home temple, wealth, Sun planet power and Vastu peace.',
    faqs: [
      { question: 'What are the benefits of Natural Ruby Shivling?', answer: 'Ruby Shivling represents the Sun (Surya) and cosmic energy. Worshipping it blesses the devotee with leadership, health, name, fame, and deep spiritual enlightenment.' },
      { question: 'How to do abhishek on Ruby Shivling?', answer: 'Daily Jalabhishek with pure water, Ganga jal, raw cow milk, and applying white sandalwood paste (Chandan) is highly auspicious.' }
    ]
  },
  {
    slug: 'gemston-ruby-shree-yantra',
    name: 'Natural Ruby Shree Yantra',
    categoryName: 'Shree Yantra',
    price: 3500,
    weight: '250 Grams',
    dimension: '2.5 x 2.5 x 3.0 Inches',
    color: 'Rich Deep Red',
    material: '100% Certified Pure Natural Ruby',
    image: '/Gemstone.webp',
    shortDetail: 'Sacred 3D Meru Natural Ruby Shree Yantra hand-carved with precise Vedic geometry for Mahalakshmi blessings, immense wealth, and vastu aura purification.',
    metaTitle: 'Natural Ruby Shree Yantra 3D Meru | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Natural Ruby Shree Yantra from Jaipur manufacturer (est. 1989). 100% certified pure ruby for wealth, prosperity and Lakshmi puja.',
    faqs: [
      { question: 'What is the significance of Ruby Shree Yantra?', answer: 'Ruby Shree Yantra combines the royal wealth energy of Goddess Mahalakshmi with the planetary brilliance of the Sun (Surya).' }
    ]
  },
  {
    slug: 'blue-sapphire-carving-shiva-statue',
    name: 'Blue Sapphire Carving Shiva Statue',
    categoryName: 'God Statues',
    price: 9500,
    weight: '450 Grams',
    dimension: '4.5 x 3.0 x 2.2 Inches',
    color: 'Deep Celestial Indigo Blue',
    material: '100% Certified Natural Blue Sapphire / Sodalite Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Master artisan carved Lord Shiva meditative idol in precious Blue Sapphire / Celestial Blue gemstone for Saturn harmony, deep focus, and supreme protection.',
    metaTitle: 'Blue Sapphire Shiva Statue Handcrafted | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Blue Sapphire Lord Shiva idol from Jaipur manufacturer. 100% certified natural gemstone statue for meditation room, home altar and Vastu.',
    faqs: [
      { question: 'Where should we place Blue Sapphire Shiva Statue?', answer: 'Place the Shiva idol facing East or North in your home temple or meditation room.' }
    ]
  },
  {
    slug: 'green-jade-shiva-statue-with-gold-panting',
    name: 'Green Jade Shiva Statue With Gold Painting',
    categoryName: 'God Statues',
    price: 25000,
    weight: '1.8 Kg',
    dimension: '7.5 x 5.0 x 3.5 Inches',
    color: 'Emerald Green with 24K Gold Leaf Accents',
    material: '100% Certified Natural Green Jade Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Luxurious Green Jade Lord Shiva meditative statue embellished with handcrafted pure gold painting work. Inspires prosperity, heart chakra healing, and divine bliss.',
    metaTitle: 'Green Jade Shiva Statue with Gold Painting | Crystal Jaipuria',
    metaDescription: 'Exquisite Green Jade Lord Shiva idol with pure 24K gold painted highlights. Direct manufacturer price from Jaipur. 100% certified pure natural jade.',
    faqs: [
      { question: 'Is the gold painting durable on Green Jade?', answer: 'Yes, our master artisans use traditional heritage techniques that ensure permanent, lasting luster for regular temple worship.' }
    ]
  },
  {
    slug: 'green-jade-panchmukhi-shivling',
    name: 'Green Jade Panchmukhi Shivling',
    categoryName: 'Shivling',
    price: 8500,
    weight: '850 Grams',
    dimension: '5.0 x 3.5 x 4.0 Inches',
    color: 'Lustrous Emerald Green',
    material: '100% Certified Pure Green Jade Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Rare sacred Green Jade Panchmukhi (5-Faced) Shivling representing Sadyojata, Vamadeva, Aghora, Tatpurusha, and Ishana for all-round spiritual liberation.',
    metaTitle: 'Green Jade Panchmukhi Shivling Handcrafted | Crystal Jaipuria',
    metaDescription: 'Buy rare 5-Faced Green Jade Panchmukhi Shivling from Jaipur manufacturer. 100% certified natural gemstone for home temple and daily Rudrabhishek.',
    faqs: [
      { question: 'What is the power of Panchmukhi Shivling?', answer: 'Panchmukhi Shivling embodies the 5 elements and 5 divine faces of Lord Shiva, removing all negative energies and granting Moksha and prosperity.' }
    ]
  },
  {
    slug: 'opal-ston-shivling',
    name: 'Natural Opal Stone Shivling',
    categoryName: 'Shivling',
    price: 3500,
    weight: '350 Grams',
    dimension: '3.5 x 2.2 x 2.5 Inches',
    color: 'Iridescent Milky Opal',
    material: '100% Certified Pure Natural Opal Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Handcrafted Natural Opal Stone Shivling representing peace, cosmic consciousness, and planetary healing for home temple & daily abhishek.',
    metaTitle: 'Natural Opal Stone Shivling (100% Certified) | Crystal Jaipuria',
    metaDescription: 'Buy pure handcrafted Natural Opal Stone Shivling for home mandir. Promotes spiritual intuition, peace and Venus planetary blessings. Jaipur manufacturer pricing.',
    faqs: [
      { question: 'What are the spiritual benefits of Opal Stone Shivling?', answer: 'Opal Stone Shivling represents peace, emotional balance, Venus planetary strength, and spiritual intuition. Doing Jalabhishek brings harmony and positive cosmic vibrations.' },
      { question: 'Is this Opal Shivling made of 100% natural gemstone?', answer: 'Yes, all our gemstone Shivlings are handcrafted from 100% certified authentic natural gemstones by master artisans in Jaipur.' }
    ]
  },
  {
    slug: 'green-jade-carved-shree-krishana-statue',
    name: 'Green Jade Carved Shree Krishna Statue',
    categoryName: 'God Statues',
    price: 32000,
    weight: '2.2 Kg',
    dimension: '9.0 x 4.5 x 3.0 Inches',
    color: 'Natural Deep Green',
    material: '100% Certified Pure Green Jade Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Exquisitely sculpted Lord Krishna playing the divine flute in pure natural Green Jade stone. Brings joy, unconditional love, harmony, and prosperity into the home.',
    metaTitle: 'Green Jade Shree Krishna Statue Hand-Carved | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Green Jade Krishna idol with flute from Jaipur manufacturer. 100% certified natural gemstone statue for living room, temple and gifting.',
    faqs: [
      { question: 'What are the benefits of keeping Green Jade Krishna?', answer: 'Green Jade resonates with the Anahata (Heart) Chakra, attracting peace, harmonious relationships, health, and spiritual joy.' }
    ]
  },
  {
    slug: 'natural-rose-quartz-pair-of-swan',
    name: 'Natural Rose Quartz Pair of Swan',
    categoryName: 'Crystal Statues',
    price: 1200,
    weight: '280 Grams',
    dimension: '3.0 x 2.0 x 2.5 Inches',
    color: 'Soft Translucent Pastel Pink',
    material: '100% Certified Natural Rose Quartz',
    image: '/Gemstone.webp',
    shortDetail: 'Handcrafted Rose Quartz Love Birds / Pair of Swans. A potent Feng Shui and Vastu cure for bedroom love, marital harmony, and affectionate relationships.',
    metaTitle: 'Natural Rose Quartz Pair of Swan (Love Birds) | Crystal Jaipuria',
    metaDescription: 'Buy pure Rose Quartz Pair of Swans for bedroom love and marital relationship harmony. 100% certified natural crystal carved in Jaipur.',
    faqs: [
      { question: 'Where to place Rose Quartz Swans in the home?', answer: 'Place the pair of swans in the South-West corner of the master bedroom or living room to boost relationship love and understanding.' }
    ]
  },
  {
    slug: 'pyrite-gemston-shivling',
    name: 'Natural Pyrite Gemstone Shivling',
    categoryName: 'Shivling',
    price: 750,
    weight: '200 Grams',
    dimension: '2.5 x 1.8 x 2.2 Inches',
    color: 'Metallic Golden Shimmer',
    material: '100% Certified Natural Golden Pyrite (Fool\'s Gold)',
    image: '/Gemstone.webp',
    shortDetail: 'High-vibration Golden Pyrite Shivling known as the stone of wealth, financial manifestation, willpower, and solar plexus activation.',
    metaTitle: 'Natural Golden Pyrite Shivling for Wealth | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Golden Pyrite Gemstone Shivling from Jaipur. Attracts money luck, abundance and strong auric protection. 100% certified stone.',
    faqs: [
      { question: 'What is the power of Pyrite Shivling?', answer: 'Pyrite attracts financial abundance, shields against negative energy, and enhances vitality and confidence during prayer.' }
    ]
  },
  {
    slug: 'clear-crystal-quartz-shivling-with-shiva-face',
    name: 'Clear Crystal Quartz Shivling With Shiva Face',
    categoryName: 'Shivling',
    price: 45000,
    weight: '2.5 Kg',
    dimension: '8.0 x 5.0 x 6.0 Inches',
    color: 'Water-Clear Transparent Quartz',
    material: '100% Certified Pure Natural Sphatik (Clear Quartz)',
    image: '/Gemstone.webp',
    shortDetail: 'Magnificent hand-carved Natural Sphatik (Clear Quartz) Shivling featuring a detailed 3D carving of Lord Shiva\'s face on the lingam. Radiates supreme purity and peace.',
    metaTitle: 'Clear Crystal Quartz Shivling with Shiva Face | Crystal Jaipuria',
    metaDescription: 'Buy museum-grade 100% pure Clear Sphatik Quartz Shivling with hand-carved Shiva face. Direct manufacturer pricing from Jaipur with authenticity certificate.',
    faqs: [
      { question: 'How is Sphatik Shivling with Shiva face energized?', answer: 'Each crystal piece is washed in sacred Ganga water and energized with Maha Mrityunjaya mantras before safe dispatch.' }
    ]
  },
  {
    slug: 'green-jade-carving-shiva-face-statue',
    name: 'Green Jade Carving Shiva Face Statue',
    categoryName: 'God Statues',
    price: 37500,
    weight: '3.0 Kg',
    dimension: '9.5 x 6.0 x 4.0 Inches',
    color: 'Lush Forest Green',
    material: '100% Certified Natural Green Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Masterpiece Green Jade Lord Shiva face sculpture with serene meditative expression, third eye detailing, and crescent moon carved from natural single-block jade.',
    metaTitle: 'Green Jade Shiva Face Carving Statue (3 Kg) | Crystal Jaipuria',
    metaDescription: 'Shop hand-carved Green Jade Shiva Face Idol from Jaipur manufacturer. Single solid gemstone carving for luxury temple, meditation hall and office decor.',
    faqs: [
      { question: 'Is this carved from a single piece of stone?', answer: 'Yes, our Shiva face sculptures are carved out of a single monolithic piece of certified natural Green Jade.' }
    ]
  },
  {
    slug: 'lapis-lazuli-carving-shiva-face-idol',
    name: 'Natural Lapis Lazuli Shiva Face Carving Idol',
    categoryName: 'God Statues',
    price: 18500,
    weight: '1.2 Kg',
    dimension: '6.5 x 4.2 x 3.5 Inches',
    color: 'Deep Celestial Royal Blue with Golden Pyrite Flecks',
    material: '100% Certified Natural Lapis Lazuli Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Exquisitely hand-carved Lord Shiva Face idol in authentic deep blue Lapis Lazuli stone with natural golden pyrite specks.',
    metaTitle: 'Natural Lapis Lazuli Shiva Face Idol Carving | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Natural Lapis Lazuli Shiva Face idol from Jaipur manufacturer. 100% pure royal blue stone for third-eye awakening and Vastu protection.',
    faqs: [
      { question: 'What is the significance of Lapis Lazuli Shiva Face?', answer: 'Lapis Lazuli is a sacred stone associated with the Third Eye Chakra, wisdom, truth, and protection from negative energies.' }
    ]
  },
  {
    slug: 'natural-lapis-lazuli-lord-krishan-statue',
    name: 'Natural Lapis Lazuli Lord Krishna Statue',
    categoryName: 'God Statues',
    price: 22000,
    weight: '1.5 Kg',
    dimension: '8.0 x 4.0 x 2.8 Inches',
    color: 'Deep Royal Blue with Golden Mineral Specks',
    material: '100% Certified Natural Lapis Lazuli',
    image: '/Gemstone.webp',
    shortDetail: 'Handcrafted Shyam Sundar Lord Krishna idol carved in rare celestial blue Lapis Lazuli stone. Brings divine love, wisdom, and peaceful aura.',
    metaTitle: 'Natural Lapis Lazuli Krishna Statue Hand-Carved | Crystal Jaipuria',
    metaDescription: 'Buy divine Lapis Lazuli Lord Krishna idol from Jaipur artisan workshop. 100% natural royal blue gemstone for home mandir and spiritual gifts.',
    faqs: [
      { question: 'Why is Krishna carved in Lapis Lazuli?', answer: 'Lapis Lazuli\'s celestial blue color represents the cosmic infinite nature (Neel-Varna) of Lord Krishna.' }
    ]
  },
  {
    slug: 'shyana-murti-in-natural-columbian-green-jade',
    name: 'Shyana Murti in Natural Columbian Green Jade',
    categoryName: 'God Statues',
    price: 48000,
    weight: '3.5 Kg',
    dimension: '12.0 x 5.5 x 4.0 Inches',
    color: 'Rich Columbian Emerald Green',
    material: '100% Certified Columbian Natural Green Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Rare collector Shyana Murti (Reclining Vishnu / Anantha Padmanabha) carved in premium Columbian Green Jade stone by master sculptors in Jaipur.',
    metaTitle: 'Shyana Murti in Columbian Green Jade (Reclining Vishnu) | Crystal Jaipuria',
    metaDescription: 'Rare museum-quality Reclining Vishnu (Shyana Murti) in Columbian Green Jade. 100% certified natural gemstone. Jaipur manufacturer direct export.',
    faqs: [
      { question: 'What is the spiritual significance of Shyana Murti?', answer: 'The reclining posture represents eternal cosmic tranquility, preservation of creation, and immense prosperity (Vaikuntha blessing).' }
    ]
  },
  {
    slug: 'tiger-eye-shivling',
    name: 'Natural Tiger Eye Gemstone Shivling',
    categoryName: 'Shivling',
    price: 1800,
    weight: '320 Grams',
    dimension: '3.2 x 2.0 x 2.8 Inches',
    color: 'Golden Brown with Silky Chatoyant Bands',
    material: '100% Certified Natural Tiger Eye Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Handcrafted Natural Tiger Eye Shivling with golden silky chatoyant luster. Enhances courage, grounding, evil eye protection, and planetary balance.',
    metaTitle: 'Natural Tiger Eye Shivling (100% Certified) | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Natural Tiger Eye Shivling from Jaipur. Powerful grounding stone for confidence, protection and daily Jalabhishek.',
    faqs: [
      { question: 'What are the benefits of Tiger Eye Shivling?', answer: 'Tiger Eye provides strong shielding against negative gaze (Buri Nazar), boosts self-confidence, and balances the Solar Plexus chakra.' }
    ]
  },
  {
    slug: 'howlite-gemston-shivling',
    name: 'Natural Howlite Gemstone Shivling',
    categoryName: 'Shivling',
    price: 1400,
    weight: '280 Grams',
    dimension: '3.0 x 2.0 x 2.5 Inches',
    color: 'Ivory White with Natural Grey Veins',
    material: '100% Certified Natural White Howlite Stone',
    image: '/Gemstone.webp',
    shortDetail: 'Calming Natural White Howlite Gemstone Shivling. Promotes deep mental tranquility, anger reduction, sleep wellness, and Crown chakra alignment.',
    metaTitle: 'Natural White Howlite Gemstone Shivling | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Natural Howlite Shivling from Jaipur manufacturer. Calming ivory stone for meditation, home peace, and daily worship.',
    faqs: [
      { question: 'What does Howlite stone symbolize?', answer: 'Howlite is celebrated for eliminating stress, tension, and overthinking, creating a calm sanctuary in your prayer room.' }
    ]
  },
  {
    slug: 'rose-quartz-shiva-statue-with-gold-panting',
    name: 'Rose Quartz Shiva Statue With Gold Painting',
    categoryName: 'God Statues',
    price: 28000,
    weight: '2.0 Kg',
    dimension: '8.0 x 5.0 x 3.5 Inches',
    color: 'Pastel Pink with 24K Gold Embellishments',
    material: '100% Certified Natural Rose Quartz Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Divine Rose Quartz Lord Shiva idol in deep meditation, accented with genuine 24K gold paint. Radiates unconditional love, peace, and domestic harmony.',
    metaTitle: 'Rose Quartz Shiva Statue with Gold Painting | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Natural Rose Quartz Shiva Statue with pure gold painted details from Jaipur manufacturer. 100% certified authentic gemstone.',
    faqs: [
      { question: 'Why choose Rose Quartz Shiva statue?', answer: 'Rose Quartz activates heart-centered compassion and family harmony, combining Shiva\'s stillness with loving energy.' }
    ]
  },
  {
    slug: 'labradorite-shivling',
    name: 'Natural Labradorite Gemstone Shivling',
    categoryName: 'Shivling',
    price: 2400,
    weight: '400 Grams',
    dimension: '3.5 x 2.2 x 3.0 Inches',
    color: 'Dark Grey with Blue & Golden Flash (Labradorescence)',
    material: '100% Certified Natural Labradorite Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Mystical Natural Labradorite Shivling exhibiting iridescent peacock blue and golden fire flashes. A stone of magic, auric shielding, and awakening spiritual intuition.',
    metaTitle: 'Natural Labradorite Shivling with Blue Flash | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Natural Labradorite Shivling from Jaipur manufacturer. 100% certified authentic crystal with stunning blue labradorescence for home temple.',
    faqs: [
      { question: 'What is unique about Labradorite Shivling?', answer: 'Labradorite contains optical labradorescence (iridescent fire) that deflects negative vibrations and heightens meditation.' }
    ]
  },
  {
    slug: 'greem-jade-carving-radha-krishana-statue',
    name: 'Green Jade Radha Krishna Statue Carving',
    categoryName: 'God Statues',
    price: 38000,
    weight: '2.8 Kg',
    dimension: '10.0 x 6.0 x 3.5 Inches',
    color: 'Natural Emerald Green',
    material: '100% Certified Pure Natural Green Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Exquisitely hand-carved Divine Radha Krishna idol carved from single solid Green Jade block. Symbolizes eternal love, prosperity, and spiritual devotion.',
    metaTitle: 'Green Jade Radha Krishna Carving Statue | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Green Jade Radha Krishna idol from Jaipur master craftsmen. 100% certified natural gemstone statue for home altar and luxury gifting.',
    faqs: [
      { question: 'How is Radha Krishna carved in Jade?', answer: 'Each statue is carefully sculpted with intricate facial expressions, peacock feather crown, and flute detailing.' }
    ]
  },
  {
    slug: 'smokey-crystal-quartz-shiva-face',
    name: 'Smokey Quartz Crystal Shiva Face Idol',
    categoryName: 'God Statues',
    price: 16500,
    weight: '1.1 Kg',
    dimension: '6.0 x 4.0 x 3.0 Inches',
    color: 'Translucent Smoky Grey-Brown',
    material: '100% Certified Natural Smoky Quartz Crystal',
    image: '/Gemstone.webp',
    shortDetail: 'Powerful Smoky Quartz Crystal Lord Shiva Face carving. Exceptional gemstone for psychic protection, EMF grounding, and neutralizing environmental negativity.',
    metaTitle: 'Smokey Crystal Quartz Shiva Face Idol | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Smokey Quartz Shiva Face from Jaipur manufacturer. 100% certified natural grounding crystal for temple, office and meditation desk.',
    faqs: [
      { question: 'What is Smoky Quartz used for?', answer: 'Smoky Quartz is one of the most efficient grounding and anchoring stones that neutralizes negative energies and stress.' }
    ]
  },
  {
    slug: 'green-jade-goddess-maa-sarswati-carving',
    name: 'Green Jade Goddess Maa Saraswati Carving',
    categoryName: 'God Statues',
    price: 24000,
    weight: '1.6 Kg',
    dimension: '7.5 x 4.5 x 3.0 Inches',
    color: 'Lustrous Pale to Deep Green Jade',
    material: '100% Certified Natural Green Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Graceful hand-carved Goddess Saraswati idol holding the divine Veena in natural Green Jade stone. Blesses students, artists, and creators with wisdom, arts, and speech.',
    metaTitle: 'Green Jade Goddess Saraswati Idol Carving | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Green Jade Maa Saraswati statue from Jaipur manufacturer. 100% certified natural gemstone for study room, home temple and knowledge blessings.',
    faqs: [
      { question: 'Where should Saraswati idol be placed?', answer: 'Place the Saraswati idol in the East or North-East direction on your study table or home temple.' }
    ]
  },
  {
    slug: 'green-aventurine-parasnath-ji-statue',
    name: 'Green Aventurine Parshvanath Ji Statue',
    categoryName: 'God Statues',
    price: 9500,
    weight: '750 Grams',
    dimension: '6.0 x 3.5 x 2.2 Inches',
    color: 'Shimmering Light to Medium Green',
    material: '100% Certified Natural Green Aventurine Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Sacred Jain Tirthankar Bhagwan Parshvanath Ji seated in Padmasana posture with 7-hooded snake canopy (Dharanendra snake hood) carved in natural Green Aventurine.',
    metaTitle: 'Green Aventurine Parshvanath Ji Statue | Crystal Jaipuria',
    metaDescription: 'Buy handcrafted 23rd Tirthankar Parshvanath Ji idol in Green Aventurine from Jaipur manufacturer. 100% certified natural stone for Jain Jinalay & home worship.',
    faqs: [
      { question: 'Is this statue suitable for Jain home temple (Ghar Derasar)?', answer: 'Yes, it is carved strictly following Jain iconography and Shastrokta lakshanas.' }
    ]
  },
  {
    slug: 'green-hade-laxmi-ji-idol',
    name: 'Green Jade Mahalakshmi Ji Idol',
    categoryName: 'God Statues',
    price: 19500,
    weight: '1.4 Kg',
    dimension: '7.0 x 4.2 x 2.8 Inches',
    color: 'Emerald Green',
    material: '100% Certified Pure Green Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Divine Goddess Mahalakshmi seated on lotus posture in authentic Green Jade stone. Attracts continuous wealth flow, business success, and domestic auspiciousness.',
    metaTitle: 'Green Jade Laxmi Ji Idol Handcrafted | Crystal Jaipuria',
    metaDescription: 'Shop pure Green Jade Goddess Lakshmi statue from Jaipur manufacturer. 100% certified natural gemstone idol for Diwali puja, cash locker, and home mandir.',
    faqs: [
      { question: 'How does Green Jade Lakshmi idol help in business?', answer: 'Green Jade is the stone of luck, opportunity, and financial growth, making it ideal for business cash counters and offices.' }
    ]
  },
  {
    slug: 'crystal-clear-mahvaveer-ji-statue',
    name: 'Crystal Clear Mahaveer Ji Statue',
    categoryName: 'God Statues',
    price: 25000,
    weight: '1.5 Kg',
    dimension: '7.5 x 4.5 x 3.0 Inches',
    color: '100% Transparent Crystal Clear Sphatik',
    material: '100% Certified Pure Natural Quartz (Sphatik)',
    image: '/Gemstone.webp',
    shortDetail: 'Magnificent 24th Tirthankar Bhagwan Mahaveer Ji statue hand-carved from pure natural clear crystal quartz. Radiates eternal peace, non-violence, and spiritual enlightenment.',
    metaTitle: 'Crystal Clear Mahaveer Ji Statue (Sphatik) | Crystal Jaipuria',
    metaDescription: 'Buy 100% pure Sphatik Clear Quartz Bhagwan Mahaveer idol from Jaipur manufacturer. Certified natural crystal for Jain Ghar Derasar and meditation room.',
    faqs: [
      { question: 'What is the quality of the quartz crystal?', answer: 'Carved from 100% natural, flawless gem-quality clear quartz mined responsibly and polished by master artisans.' }
    ]
  },
  {
    slug: 'amethyst-gemston-shiva-face',
    name: 'Natural Amethyst Gemstone Shiva Face Idol',
    categoryName: 'God Statues',
    price: 14500,
    weight: '950 Grams',
    dimension: '5.5 x 3.8 x 2.8 Inches',
    color: 'Vibrant Royal Purple Amethyst',
    material: '100% Certified Natural Amethyst Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Hand-carved Lord Shiva Face in authentic deep purple Amethyst stone. Enhances Third Eye intuition, overcomes addictions, and invites deep meditative stillness.',
    metaTitle: 'Natural Amethyst Shiva Face Carving Idol | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Amethyst Lord Shiva face idol from Jaipur manufacturer. 100% certified purple gemstone for Crown chakra, stress relief and home mandir.',
    faqs: [
      { question: 'What are the benefits of Amethyst Shiva idol?', answer: 'Amethyst radiates calming spiritual frequencies, clearing negative thoughts and promoting lucid spiritual awareness.' }
    ]
  },
  {
    slug: 'rose-quartz-carved-shree-krishan-ji-idol',
    name: 'Rose Quartz Carved Shree Krishna Ji Idol',
    categoryName: 'God Statues',
    price: 21000,
    weight: '1.4 Kg',
    dimension: '7.5 x 4.0 x 2.5 Inches',
    color: 'Gentle Translucent Pink',
    material: '100% Certified Natural Rose Quartz',
    image: '/Gemstone.webp',
    shortDetail: 'Charming hand-carved Rose Quartz Lord Krishna idol with flute. Spreads joyful vibrations, harmony, loving devotion, and emotional healing throughout the household.',
    metaTitle: 'Rose Quartz Krishna Idol Handcrafted | Crystal Jaipuria',
    metaDescription: 'Buy pure Rose Quartz Shree Krishna statue from Jaipur artisan workshop. 100% certified natural pink crystal for temple worship and spiritual gifts.',
    faqs: [
      { question: 'How to clean Rose Quartz idols?', answer: 'Wipe gently with soft cotton cloth and lukewarm water. Avoid harsh chemical cleaners to preserve its natural crystal sheen.' }
    ]
  },
  {
    slug: 'lapis-lazuli-carved-shiva-face',
    name: 'Lapis Lazuli Carved Shiva Face',
    categoryName: 'God Statues',
    price: 15500,
    weight: '1.0 Kg',
    dimension: '5.8 x 3.8 x 3.0 Inches',
    color: 'Midnight Blue with Golden Pyrite Inclusions',
    material: '100% Certified Pure Lapis Lazuli Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Serene Lord Shiva face sculpture carved from solid natural Lapis Lazuli stone. Protects against malefic planetary forces and elevates meditative consciousness.',
    metaTitle: 'Lapis Lazuli Shiva Face Sculpture | Crystal Jaipuria',
    metaDescription: 'Buy authentic Lapis Lazuli Shiva Face carving from Jaipur manufacturer (since 1989). 100% certified natural gemstone for sacred home altar.',
    faqs: [
      { question: 'What are the golden specks in Lapis Lazuli?', answer: 'The golden specks are natural Pyrite inclusions, which prove the 100% authenticity of genuine Afghan/Indian Lapis Lazuli.' }
    ]
  },
  {
    slug: 'mahalakshmi-idol-in-natural-columbian-green-jade',
    name: 'Mahalakshmi Idol in Natural Columbian Green Jade',
    categoryName: 'God Statues',
    price: 42000,
    weight: '2.8 Kg',
    dimension: '9.0 x 5.0 x 3.5 Inches',
    color: 'Premium Columbian Deep Green',
    material: '100% Certified Columbian Natural Green Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Grand collector-grade Goddess Lakshmi idol seated in blessing posture carved in rare Columbian Green Jade. Supreme symbol of Ashta Lakshmi prosperity.',
    metaTitle: 'Mahalakshmi Idol in Columbian Green Jade | Crystal Jaipuria',
    metaDescription: 'Exquisite Columbian Green Jade Goddess Lakshmi statue. 100% certified authentic gemstone idol from Jaipur master craftsmen. Worldwide safe shipping.',
    faqs: [
      { question: 'Why is Columbian Green Jade considered premium?', answer: 'Columbian Jade has superior density, rich emerald green color saturation, and high spiritual resonance.' }
    ]
  },
  {
    slug: 'tiger-eye-carving-shiva-statue',
    name: 'Tiger Eye Carving Shiva Statue',
    categoryName: 'God Statues',
    price: 16500,
    weight: '1.2 Kg',
    dimension: '6.5 x 4.0 x 2.8 Inches',
    color: 'Golden Amber & Dark Chocolate Stripes',
    material: '100% Certified Natural Tiger Eye Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Hand-carved Lord Shiva seated in meditative Dhyana posture sculpted from natural chatoyant Tiger Eye stone for strength, fearlessness, and victory over obstacles.',
    metaTitle: 'Tiger Eye Shiva Statue Hand-Carved | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Tiger Eye Lord Shiva statue from Jaipur manufacturer. 100% natural chatoyant stone for courage, home temple and protection.',
    faqs: [
      { question: 'What are the spiritual benefits of Tiger Eye Shiva statue?', answer: 'It combines the grounded shielding energy of Tiger Eye with the supreme stillness of Lord Shiva, removing anxiety and fear.' }
    ]
  },
  {
    slug: 'rose-quartz-mahaveer',
    name: 'Rose Quartz Bhagwan Mahaveer Statue',
    categoryName: 'God Statues',
    price: 14000,
    weight: '900 Grams',
    dimension: '5.8 x 3.5 x 2.2 Inches',
    color: 'Soft Translucent Pastel Pink',
    material: '100% Certified Natural Rose Quartz',
    image: '/Gemstone.webp',
    shortDetail: 'Serene Bhagwan Mahaveer Swami idol in Padmasana posture carved from pure natural Rose Quartz crystal. Radiates peace, forgiveness, and universal compassion.',
    metaTitle: 'Rose Quartz Mahaveer Swami Statue | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Rose Quartz Bhagwan Mahaveer idol from Jaipur manufacturer. 100% certified natural crystal for Jain Ghar Derasar and home temple.',
    faqs: [
      { question: 'Is this idol carved according to Jain Vidhi?', answer: 'Yes, it features perfect Dhyanamudra posture, Srivatsa mark on the chest, and serene meditative expression.' }
    ]
  },
  {
    slug: 'yellow-jad-ganesh-statue',
    name: 'Natural Yellow Jade Ganesha Statue',
    categoryName: 'God Statues',
    price: 12500,
    weight: '850 Grams',
    dimension: '5.5 x 3.8 x 2.5 Inches',
    color: 'Warm Golden Yellow',
    material: '100% Certified Natural Yellow Jade Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Auspicious Lord Ganesha idol hand-carved in bright natural Yellow Jade. Associated with Guru (Jupiter) planet, intellect, auspicious beginnings, and financial luck.',
    metaTitle: 'Yellow Jade Ganesha Statue Handcrafted | Crystal Jaipuria',
    metaDescription: 'Buy natural Yellow Jade Ganesha idol from Jaipur manufacturer. 100% certified gemstone statue for office desk, home entrance and Vastu luck.',
    faqs: [
      { question: 'What is the significance of Yellow Jade Ganesha?', answer: 'Yellow color is sacred to Lord Ganesha and represents Jupiter (Brihaspati) blessings of wisdom, wealth, and intellect.' }
    ]
  },
  {
    slug: 'ganeshji-with-lingam-in-jigalong-jasper',
    name: 'Ganeshji with Lingam in Jigalong Jasper',
    categoryName: 'God Statues',
    price: 18000,
    weight: '1.3 Kg',
    dimension: '6.5 x 4.5 x 3.0 Inches',
    color: 'Multicolor Earthy Jasper Tones',
    material: '100% Certified Natural Jigalong Jasper Stone',
    image: '/Gemstone.webp',
    shortDetail: 'Unique dual spiritual sculpture featuring Lord Ganesha seated alongside Shiva Lingam carved in natural Australian Jigalong Jasper stone.',
    metaTitle: 'Ganesha with Shiva Lingam in Jigalong Jasper | Crystal Jaipuria',
    metaDescription: 'Rare handcrafted Ganesha with Shiva Lingam idol in natural Jigalong Jasper stone. Jaipur manufacturer direct export. 100% certified authentic.',
    faqs: [
      { question: 'What is Jigalong Jasper?', answer: 'Jigalong Jasper is a rare, dense earth-healing gemstone known for stabilizing root chakra and harmonizing family energies.' }
    ]
  },
  {
    slug: 'labradorite-power-mini-shiv-face',
    name: 'Labradorite Power Mini Shiva Face',
    categoryName: 'God Statues',
    price: 2200,
    weight: '180 Grams',
    dimension: '2.8 x 1.8 x 1.2 Inches',
    color: 'Dark Matrix with Iridescent Electric Blue Flash',
    material: '100% Certified Natural Labradorite Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Compact pocket / desk altar Lord Shiva face carving in genuine Labradorite displaying brilliant iridescent blue-golden flash.',
    metaTitle: 'Labradorite Mini Shiva Face Altar Idol | Crystal Jaipuria',
    metaDescription: 'Buy mini Labradorite Shiva face carving with electric blue flash from Jaipur manufacturer. Pocket size crystal for meditation, car dashboard and desk altar.',
    faqs: [
      { question: 'Can this be kept on a car dashboard or work desk?', answer: 'Yes, its compact size and solid base make it ideal for car dashboards, study tables, and travel altars.' }
    ]
  },
  {
    slug: 'blue-sodalite-carving-shiva-face-idol',
    name: 'Blue Sodalite Carving Shiva Face Idol',
    categoryName: 'God Statues',
    price: 11000,
    weight: '900 Grams',
    dimension: '5.5 x 3.5 x 2.8 Inches',
    color: 'Deep Royal Blue with Calcite White Veins',
    material: '100% Certified Natural Blue Sodalite Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Meditative Lord Shiva Face carved from solid Blue Sodalite gemstone. Promotes mental clarity, emotional calm, throat chakra expression, and deep dhyana.',
    metaTitle: 'Blue Sodalite Shiva Face Idol Carving | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Blue Sodalite Lord Shiva face statue from Jaipur manufacturer. 100% certified natural blue stone for home temple and meditation room.',
    faqs: [
      { question: 'What is the power of Blue Sodalite?', answer: 'Sodalite encourages rational thought, emotional balance, self-trust, and deep peaceful contemplation during meditation.' }
    ]
  },
  {
    slug: 'clear-crystal-shivling',
    name: 'Natural Clear Crystal Sphatik Shivling',
    categoryName: 'Shivling',
    price: 2000,
    weight: '300 Grams - 1.0 Kg',
    dimension: '3.0 x 2.0 x 2.5 Inches',
    color: 'Transparent Water-Clear Quartz',
    material: '100% Certified Pure Natural Sphatik (Clear Quartz)',
    image: '/Gemstone.webp',
    shortDetail: 'Vedic Pure Natural Sphatik (Clear Quartz) Shivling. Cold to touch, 100% certified natural gemstone that purifies vastu doshas and brings peace to home temples.',
    metaTitle: 'Natural Sphatik Clear Crystal Shivling | Crystal Jaipuria',
    metaDescription: 'Buy 100% certified authentic Natural Sphatik Shivling from Jaipur manufacturer (est. 1989). Factory direct prices, worldwide express shipping.',
    faqs: [
      { question: 'How to verify real Sphatik Shivling?', answer: 'Original Sphatik remains naturally cold to touch even in warm rooms and displays natural crystal inclusions without air bubbles.' }
    ]
  },
  {
    slug: 'gemston-amethyst-diya',
    name: 'Natural Amethyst Gemstone Diya',
    categoryName: 'Diya',
    price: 650,
    weight: '150 Grams',
    dimension: '2.5 x 2.5 x 1.2 Inches',
    color: 'Translucent Deep Purple',
    material: '100% Certified Natural Amethyst Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Sacred hand-carved Natural Amethyst Puja Diya / Oil Lamp. Lighting camphor or ghee in an Amethyst diya purifies household air and raises spiritual frequencies.',
    metaTitle: 'Natural Amethyst Gemstone Puja Diya | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Amethyst Gemstone Diya for mandir daily aarti. 100% natural purple crystal from Jaipur manufacturer.',
    faqs: [
      { question: 'Can we use this Diya for daily oil/ghee lighting?', answer: 'Yes, it is carved from durable natural gemstone suitable for ghee wicks, oil, and camphor aarti.' }
    ]
  },
  {
    slug: 'red-jasper-gemston-shivling',
    name: 'Natural Red Jasper Gemstone Shivling',
    categoryName: 'Shivling',
    price: 1200,
    weight: '280 Grams',
    dimension: '3.0 x 2.0 x 2.5 Inches',
    color: 'Terracotta Brick Red with Natural Mineral Veins',
    material: '100% Certified Natural Red Jasper Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Root chakra grounding Red Jasper Shivling. Provides physical stamina, courage, Mars (Mangal) planetary healing, and protection against negative energies.',
    metaTitle: 'Natural Red Jasper Shivling (Mangal Stone) | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Red Jasper Gemstone Shivling from Jaipur. 100% certified stone for Mars planetary strength, vitality and home temple worship.',
    faqs: [
      { question: 'What are the benefits of Red Jasper Shivling?', answer: 'Red Jasper is the stone of vitality, stamina, and Mangal Dosha pacification, strengthening life force energy.' }
    ]
  },
  {
    slug: 'black-agate-gemstone-carving-of-ganesh',
    name: 'Black Agate Gemstone Carving of Ganesh',
    categoryName: 'God Statues',
    price: 12000,
    weight: '1.2 Kg',
    dimension: '6.0 x 4.0 x 2.8 Inches',
    color: 'Glossy Pitch Black Agate',
    material: '100% Certified Natural Black Agate (Kala Hakik)',
    image: '/Gemstone.webp',
    shortDetail: 'Protective Lord Ganesha idol sculpted in genuine Black Agate (Kala Hakik). Removes obstacles, wards off evil eye (Buri Nazar), and stabilizes financial wealth.',
    metaTitle: 'Black Agate Ganesha Statue (Kala Hakik) | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Black Agate Ganesha idol from Jaipur manufacturer. 100% certified natural Hakik gemstone for powerful evil eye protection and success.',
    faqs: [
      { question: 'What is the power of Black Agate Ganesha?', answer: 'Black Agate is renowned for absorbing negative energies, shielding the home from dark forces, and ensuring steady prosperity.' }
    ]
  },
  {
    slug: 'blue-sodalite-hanuman-ji',
    name: 'Natural Blue Sodalite Hanuman Ji Statue',
    categoryName: 'God Statues',
    price: 13500,
    weight: '1.1 Kg',
    dimension: '6.5 x 3.8 x 2.5 Inches',
    color: 'Deep Ocean Blue with White Matrix',
    material: '100% Certified Natural Blue Sodalite',
    image: '/Gemstone.webp',
    shortDetail: 'Courageous Lord Hanuman Ji statue holding the Gada and mountain carved in solid Blue Sodalite gemstone. Bestows immense strength, fearlessness, and devotion.',
    metaTitle: 'Blue Sodalite Hanuman Ji Statue Handcrafted | Crystal Jaipuria',
    metaDescription: 'Shop hand-carved Blue Sodalite Lord Hanuman idol from Jaipur manufacturer. 100% certified natural gemstone statue for protection and courage.',
    faqs: [
      { question: 'What are the benefits of Blue Sodalite Hanuman Ji?', answer: 'Worshipping Hanuman Ji in Sodalite gemstone eliminates fear, mental stress, and obstacles while granting physical and mental fortitude.' }
    ]
  },
  {
    slug: 'blue-sodalite-carved-gord-shiva-statue',
    name: 'Blue Sodalite Carved Lord Shiva Statue',
    categoryName: 'God Statues',
    price: 14000,
    weight: '1.2 Kg',
    dimension: '7.0 x 4.0 x 2.8 Inches',
    color: 'Rich Indigo Blue with White Calcite Veins',
    material: '100% Certified Natural Blue Sodalite',
    image: '/Gemstone.webp',
    shortDetail: 'Lord Shiva seated in deep meditation (Dhyanamudra) carved in natural Blue Sodalite gemstone. Promotes inner peace, throat chakra balance, and divine focus.',
    metaTitle: 'Blue Sodalite Lord Shiva Statue Handcrafted | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Blue Sodalite Shiva statue from Jaipur manufacturer. 100% natural gemstone idol for meditation altar, temple and spiritual decor.',
    faqs: [
      { question: 'Where is this statue made?', answer: 'Hand-sculpted by master stone carvers in Jaipur, Rajasthan (est. 1989).' }
    ]
  },
  {
    slug: 'rose-quartz-ganesha-with-gold-painted',
    name: 'Rose Quartz Ganesha With Gold Painted',
    categoryName: 'God Statues',
    price: 16500,
    weight: '1.1 Kg',
    dimension: '6.0 x 4.0 x 3.0 Inches',
    color: 'Pastel Pink with 24K Gold Embellishments',
    material: '100% Certified Natural Rose Quartz',
    image: '/Gemstone.webp',
    shortDetail: 'Divine Rose Quartz Lord Ganesha idol detailed with pure 24K gold painting work on crown and ornaments. Brings love, harmony, sweet relationships, and auspiciousness.',
    metaTitle: 'Rose Quartz Ganesha with Gold Painting | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Rose Quartz Ganesha idol with 24K gold paint accents from Jaipur manufacturer. 100% certified natural pink crystal for temple and gifting.',
    faqs: [
      { question: 'What is special about Rose Quartz Ganesha?', answer: 'Rose Quartz radiates gentle loving energy, reducing household friction while inviting Lord Ganesha\'s blessings of wisdom.' }
    ]
  },
  {
    slug: 'blue-sodalite-carved-ganesha-statue',
    name: 'Blue Sodalite Carved Ganesha Statue',
    categoryName: 'God Statues',
    price: 9500,
    weight: '750 Grams',
    dimension: '5.2 x 3.5 x 2.5 Inches',
    color: 'Celestial Blue with White Marbling',
    material: '100% Certified Natural Blue Sodalite',
    image: '/Gemstone.webp',
    shortDetail: 'Lord Ganesha in blessings posture carved in natural Blue Sodalite gemstone. Inspires clear intellect, artistic creativity, and smooth obstacle-free success.',
    metaTitle: 'Blue Sodalite Ganesha Statue Handcrafted | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Blue Sodalite Ganesha idol from Jaipur manufacturer. 100% certified natural gemstone statue for study desk, office and home temple.',
    faqs: [
      { question: 'Is Sodalite Ganesha good for students?', answer: 'Yes, Sodalite enhances memory concentration and communicative confidence.' }
    ]
  },
  {
    slug: 'crystal-parshvanath-ji-statue-with-gold-panting',
    name: 'Crystal Parshvanath Ji Statue with Gold Painting',
    categoryName: 'God Statues',
    price: 28000,
    weight: '1.8 Kg',
    dimension: '8.0 x 4.5 x 3.0 Inches',
    color: 'Crystal Clear with 24K Gold Detailing',
    material: '100% Certified Pure Natural Quartz (Sphatik)',
    image: '/Gemstone.webp',
    shortDetail: 'Museum-grade Clear Quartz Sphatik Bhagwan Parshvanath Ji statue featuring 7-serpent hood canopy with delicate 24K gold leaf painting work.',
    metaTitle: 'Sphatik Parshvanath Ji Statue with Gold Paint | Crystal Jaipuria',
    metaDescription: 'Buy 100% pure Clear Sphatik Quartz Parshvanath Ji idol with 24K gold painting from Jaipur manufacturer. Certified gemstone statue for Jain Derasar.',
    faqs: [
      { question: 'What is the significance of the 7-hooded serpent?', answer: 'The 7-headed Dharanendra snake hood represents divine protection and spiritual shelter over the 23rd Tirthankar.' }
    ]
  },
  {
    slug: 'yellow-jade-parshvanath-ji-statue',
    name: 'Yellow Jade Parshvanath Ji Statue',
    categoryName: 'God Statues',
    price: 13500,
    weight: '950 Grams',
    dimension: '6.2 x 3.8 x 2.4 Inches',
    color: 'Golden Honey Yellow',
    material: '100% Certified Natural Yellow Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Bhagwan Parshvanath Ji seated in lotus Dhyanamudra carved from natural Yellow Jade. Radiates solar optimism, wisdom, non-attachment, and Jain spiritual peace.',
    metaTitle: 'Yellow Jade Parshvanath Ji Statue Hand-Carved | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Yellow Jade Parshvanath Ji idol from Jaipur manufacturer. 100% certified natural stone for Jain temple worship and home altar.',
    faqs: [
      { question: 'What are the dimensions of this Parshvanath statue?', answer: 'Height is approximately 6.2 inches, width 3.8 inches, weight 950 grams.' }
    ]
  },
  {
    slug: 'labradorite-shiva-head',
    name: 'Natural Labradorite Shiva Head Statue',
    categoryName: 'God Statues',
    price: 16000,
    weight: '1.1 Kg',
    dimension: '6.0 x 4.2 x 3.2 Inches',
    color: 'Charcoal Grey with Electric Royal Blue Fire',
    material: '100% Certified Natural Labradorite Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Impressive 3D Lord Shiva head carving in natural Labradorite gemstone with stunning blue and golden labradorescence fire flashes across the face and Jata.',
    metaTitle: 'Natural Labradorite Shiva Head Carving | Crystal Jaipuria',
    metaDescription: 'Buy handcrafted Labradorite Shiva Head statue with electric blue flash from Jaipur manufacturer. 100% certified natural crystal for luxury spiritual decor.',
    faqs: [
      { question: 'Does the blue flash show in normal room light?', answer: 'Yes, as light shifts across the surface, brilliant peacock blue and golden fire flashes illuminate the carving.' }
    ]
  },
  {
    slug: 'lapis-lazuli-gemstone-shiva-linga-with-face-of-shiva',
    name: 'Lapis Lazuli Gemstone Shiva Linga with Face of Shiva',
    categoryName: 'Shivling',
    price: 19500,
    weight: '1.4 Kg',
    dimension: '6.5 x 4.0 x 4.5 Inches',
    color: 'Deep Celestial Blue with Golden Flecks',
    material: '100% Certified Natural Lapis Lazuli Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Master artisan carved Lapis Lazuli Mukhalingam (Shivalinga with Shiva Face). Connects with cosmic Third Eye energies and purifies surrounding aura.',
    metaTitle: 'Lapis Lazuli Shiva Lingam with Shiva Face | Crystal Jaipuria',
    metaDescription: 'Buy rare Lapis Lazuli Mukhalingam from Jaipur manufacturer. 100% certified natural royal blue stone for home temple, daily abhishek and Vastu protection.',
    faqs: [
      { question: 'What is a Mukhalingam?', answer: 'A Mukhalingam is a sacred Shiva Lingam that features the carved face of Lord Shiva, allowing direct eye-to-eye devotion during puja.' }
    ]
  },
  {
    slug: 'green-aventurine-ganesha-statue',
    name: 'Green Aventurine Ganesha Statue',
    categoryName: 'God Statues',
    price: 4500,
    weight: '450 Grams',
    dimension: '4.5 x 3.0 x 2.0 Inches',
    color: 'Natural Shimmering Forest Green',
    material: '100% Certified Natural Green Aventurine',
    image: '/Gemstone.webp',
    shortDetail: 'Handcrafted Green Aventurine Lord Ganesha idol. Known as the Stone of Opportunity, it brings financial good luck, growth, and joyful obstacle removal.',
    metaTitle: 'Green Aventurine Ganesha Statue Handcrafted | Crystal Jaipuria',
    metaDescription: 'Buy natural Green Aventurine Ganesha idol from Jaipur manufacturer. 100% certified gemstone statue for cash locker, desk and home entrance.',
    faqs: [
      { question: 'Why is Green Aventurine called the Stone of Opportunity?', answer: 'Green Aventurine aligns with the Heart chakra and attracts positive coincidences, new ventures, and business luck.' }
    ]
  },
  {
    slug: 'rose-quartz-parshvanath-ji-statue',
    name: 'Natural Rose Quartz Parshvanath Ji Statue',
    categoryName: 'God Statues',
    price: 11500,
    weight: '850 Grams',
    dimension: '5.8 x 3.5 x 2.4 Inches',
    color: 'Gentle Translucent Pink',
    material: '100% Certified Natural Rose Quartz',
    image: '/Gemstone.webp',
    shortDetail: 'Peaceful Bhagwan Parshvanath Ji seated with 7-hooded snake canopy carved from pure natural Rose Quartz crystal. Emanates Ahimsa, forgiveness, and tranquility.',
    metaTitle: 'Rose Quartz Parshvanath Ji Statue | Crystal Jaipuria',
    metaDescription: 'Buy handcrafted Rose Quartz Parshvanath Ji idol from Jaipur manufacturer. 100% certified natural pink crystal for Jain Ghar Derasar and meditation altar.',
    faqs: [
      { question: 'What are the benefits of Rose Quartz Parshvanath statue?', answer: 'It combines Jain spiritual renunciation with the healing, loving vibrations of Rose Quartz crystal.' }
    ]
  },
  {
    slug: 'black-agate-carving-shiva-face',
    name: 'Natural Black Agate Shiva Face Carving',
    categoryName: 'God Statues',
    price: 25000,
    weight: '2.5 Kg',
    dimension: '8.5 x 5.5 x 3.5 Inches',
    color: 'Deep Lustrous Jet Black (Kala Hakik)',
    material: '100% Certified Natural Black Agate (Hakik)',
    image: '/Gemstone.webp',
    shortDetail: 'Commanding Lord Shiva Face sculpture carved from monolithic natural Black Agate (Kala Hakik). Supreme shield against black magic, evil gaze, and Rahu/Saturn doshas.',
    metaTitle: 'Black Agate Shiva Face Carving Statue (Kala Hakik) | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Black Agate Shiva Face statue from Jaipur manufacturer. 100% certified natural Kala Hakik for ultimate protection, temple and home decor.',
    faqs: [
      { question: 'How does Black Agate Shiva face protect the house?', answer: 'Black Agate is an impenetrable energetic shield that absorbs negative vibrations and neutralizes malefic psychic attacks.' }
    ]
  },
  {
    slug: 'lepidolite-goddess-saraswati-carving',
    name: 'Lepidolite Goddess Saraswati Carving',
    categoryName: 'God Statues',
    price: 18500,
    weight: '1.2 Kg',
    dimension: '6.8 x 4.0 x 2.8 Inches',
    color: 'Lilac Lavender to Deep Plum Purple',
    material: '100% Certified Natural Lepidolite Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Rare hand-carved Goddess Saraswati with Veena in natural Lithium-rich Lepidolite stone. Reduces anxiety, enhances musical/artistic genius, and Crown chakra flow.',
    metaTitle: 'Lepidolite Goddess Saraswati Carving Idol | Crystal Jaipuria',
    metaDescription: 'Buy rare natural Lepidolite Goddess Saraswati idol from Jaipur manufacturer. 100% certified lilac gemstone for students, musicians and artists.',
    faqs: [
      { question: 'What is unique about Lepidolite gemstone?', answer: 'Lepidolite is naturally rich in lithium, making it the premier calming crystal for anxiety relief and peaceful creativity.' }
    ]
  },
  {
    slug: 'rose-quartz-shivling-with-face',
    name: 'Rose Quartz Shivling with Shiva Face',
    categoryName: 'Shivling',
    price: 4500,
    weight: '650 Grams',
    dimension: '4.5 x 3.0 x 3.5 Inches',
    color: 'Translucent Pastel Pink',
    material: '100% Certified Natural Rose Quartz',
    image: '/Gemstone.webp',
    shortDetail: 'Sacred Rose Quartz Mukhalingam featuring a detailed carving of Lord Shiva\'s face on the lingam. Fills the home with divine love, peace, and spiritual harmony.',
    metaTitle: 'Rose Quartz Shivling with Shiva Face (Mukhalingam) | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Rose Quartz Shivling with Shiva Face from Jaipur manufacturer. 100% certified natural pink crystal for daily Jalabhishek and mandir.',
    faqs: [
      { question: 'Can we do milk and water abhishek on Rose Quartz Shivling?', answer: 'Yes, natural Rose Quartz is completely safe for daily Jalabhishek, milk, honey, and chandan puja.' }
    ]
  },
  {
    slug: 'yellow-quartz-ganesha-statue',
    name: 'Natural Yellow Quartz Ganesha Statue',
    categoryName: 'God Statues',
    price: 5500,
    weight: '500 Grams',
    dimension: '4.8 x 3.2 x 2.2 Inches',
    color: 'Golden Citrus Yellow Quartz',
    material: '100% Certified Natural Yellow Quartz / Golden Healer',
    image: '/Gemstone.webp',
    shortDetail: 'Radiant Lord Ganesha idol sculpted in translucent natural Yellow Quartz. Enhances solar plexus energy, career confidence, and financial breakthroughs.',
    metaTitle: 'Natural Yellow Quartz Ganesha Statue | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Yellow Quartz Ganesha idol from Jaipur manufacturer. 100% certified natural crystal for cash counter, office and home altar.',
    faqs: [
      { question: 'What does Yellow Quartz represent?', answer: 'Yellow Quartz is associated with the Sun and Solar Plexus, fostering optimism, abundance, and clear decision-making.' }
    ]
  },
  {
    slug: 'rose-quartz-shivling',
    name: 'Natural Rose Quartz Shivling',
    categoryName: 'Shivling',
    price: 1800,
    weight: '350 Grams',
    dimension: '3.5 x 2.2 x 2.8 Inches',
    color: 'Soft Translucent Pink',
    material: '100% Certified Pure Natural Rose Quartz',
    image: '/Gemstone.webp',
    shortDetail: 'Pure Natural Rose Quartz Shivling handcrafted in Jaipur. Eliminates family tension, invites unconditional love, and balances the Anahata Heart Chakra.',
    metaTitle: 'Natural Rose Quartz Shivling (100% Certified) | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Natural Rose Quartz Shivling from Jaipur manufacturer (est. 1989). 100% certified authentic pink crystal for home temple worship.',
    faqs: [
      { question: 'What is the benefit of Rose Quartz Shivling?', answer: 'It combines the transcendent blessings of Lord Shiva with the gentle, loving, soothing vibrations of Rose Quartz.' }
    ]
  },
  {
    slug: 'yellow-agate-shivling',
    name: 'Natural Yellow Agate Gemstone Shivling',
    categoryName: 'Shivling',
    price: 1600,
    weight: '320 Grams',
    dimension: '3.2 x 2.0 x 2.5 Inches',
    color: 'Warm Golden Amber Yellow (Peela Hakik)',
    material: '100% Certified Natural Yellow Agate (Peela Hakik)',
    image: '/Gemstone.webp',
    shortDetail: 'Auspicious Yellow Agate (Peela Hakik) Shivling. Pacifies Guru (Jupiter) planet doshas, brings wisdom, academic success, and family prosperity.',
    metaTitle: 'Natural Yellow Agate Shivling (Peela Hakik) | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Yellow Agate Gemstone Shivling from Jaipur. 100% certified natural Peela Hakik for Jupiter blessings, wealth, and home mandir.',
    faqs: [
      { question: 'Which planet is pacified by Yellow Agate Shivling?', answer: 'Yellow Agate is dedicated to Lord Brihaspati (Jupiter), bringing wisdom, good fortune, and academic success.' }
    ]
  },
  {
    slug: 'lapis-lazuli-carving-ganesha-statue',
    name: 'Lapis Lazuli Carving Ganesha Statue',
    categoryName: 'God Statues',
    price: 8500,
    weight: '650 Grams',
    dimension: '4.8 x 3.2 x 2.2 Inches',
    color: 'Royal Cobalt Blue with Pyrite Flecks',
    material: '100% Certified Natural Lapis Lazuli',
    image: '/Gemstone.webp',
    shortDetail: 'Handcrafted Lord Ganesha in deep blue celestial Lapis Lazuli stone. Bestows intellect, royal status, protection from negative gaze, and spiritual wisdom.',
    metaTitle: 'Lapis Lazuli Ganesha Statue Handcrafted | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Lapis Lazuli Ganesha idol from Jaipur manufacturer. 100% natural royal blue gemstone for study table, home mandir and spiritual gifts.',
    faqs: [
      { question: 'What is special about Lapis Ganesha?', answer: 'Lapis Lazuli is the gemstone of kings and scholars, connecting with the Ajna (Third Eye) chakra.' }
    ]
  },
  {
    slug: 'gemston-howlite-shree-yantra',
    name: 'Natural White Howlite Shree Yantra',
    categoryName: 'Shree Yantra',
    price: 1500,
    weight: '220 Grams',
    dimension: '2.5 x 2.5 x 2.8 Inches',
    color: 'Calming White with Natural Grey Veins',
    material: '100% Certified Natural White Howlite',
    image: '/Gemstone.webp',
    shortDetail: '3D Meru Natural White Howlite Shree Yantra. Combines the wealth attraction of Sri Vidya with the peace and calming energy of white howlite.',
    metaTitle: 'White Howlite Shree Yantra 3D Meru | Crystal Jaipuria',
    metaDescription: 'Buy handcrafted White Howlite Shree Yantra from Jaipur manufacturer. 100% certified natural stone for cash locker, Diwali puja and vastu peace.',
    faqs: [
      { question: 'Where to keep Howlite Shree Yantra?', answer: 'Keep on a clean red or yellow silk cloth in the North-East or East of your puja room.' }
    ]
  },
  {
    slug: 'green-avernturine-carving-handicraft-ganesha',
    name: 'Green Aventurine Carving Handicraft Ganesha',
    categoryName: 'God Statues',
    price: 5200,
    weight: '500 Grams',
    dimension: '5.0 x 3.5 x 2.2 Inches',
    color: 'Natural Shimmering Jade Green',
    material: '100% Certified Natural Green Aventurine',
    image: '/Gemstone.webp',
    shortDetail: 'Artistic handcrafted Lord Ganesha idol in sparkling Green Aventurine stone. Inspires good fortune, luck in business ventures, and removes obstacles.',
    metaTitle: 'Green Aventurine Handicraft Ganesha Idol | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Green Aventurine Ganesha statue from Jaipur artisan workshop. 100% certified natural gemstone for home, office and gifting.',
    faqs: [
      { question: 'How is this Ganesha sculpted?', answer: 'Meticulously hand-carved by heritage artisans in Jaipur using traditional diamond cutting and polishing tools.' }
    ]
  },
  {
    slug: 'labradorite-power-carved-shiva-face',
    name: 'Labradorite Power Carved Shiva Face',
    categoryName: 'God Statues',
    price: 18500,
    weight: '1.3 Kg',
    dimension: '6.8 x 4.5 x 3.2 Inches',
    color: 'Dark Grey Matrix with Intense Blue & Green Flash',
    material: '100% Certified Natural Labradorite Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'High-energy Lord Shiva face carving in grade-A Labradorite. High labradorescence flash creates an otherworldly aura during meditation and prayer.',
    metaTitle: 'Labradorite Power Carved Shiva Face (1.3 Kg) | Crystal Jaipuria',
    metaDescription: 'Shop master-carved Labradorite Shiva Face statue with electric blue flash. 100% certified authentic gemstone from Jaipur manufacturer.',
    faqs: [
      { question: 'What makes this Labradorite piece high-power?', answer: 'Handpicked for high-density flash and optical iridescence that vibrates with upper chakra energy.' }
    ]
  },
  {
    slug: 'rube-gemston-parshvanath-ji-statue',
    name: 'Ruby Gemstone Parshvanath Ji Statue',
    categoryName: 'God Statues',
    price: 18000,
    weight: '750 Grams',
    dimension: '6.0 x 3.8 x 2.4 Inches',
    color: 'Deep Purplish Red (Manikya)',
    material: '100% Certified Natural Ruby Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Rare and precious Bhagwan Parshvanath Ji statue with 7-hooded serpent carved in genuine Natural Ruby (Manik) stone. Supreme Jain spiritual collector piece.',
    metaTitle: 'Ruby Gemstone Parshvanath Ji Statue (Manik) | Crystal Jaipuria',
    metaDescription: 'Buy rare Natural Ruby Parshvanath Ji idol from Jaipur master craftsmen. 100% certified authentic gemstone for Jain Ghar Derasar and temple altar.',
    faqs: [
      { question: 'What is the significance of Ruby in Jain statues?', answer: 'Ruby (Manikya) represents the brilliance of the soul (Atma-Jyoti) and supreme spiritual victory.' }
    ]
  },
  {
    slug: 'labradorite-ston-carving-shiva-face',
    name: 'Labradorite Stone Carving Shiva Face',
    categoryName: 'God Statues',
    price: 14500,
    weight: '1.0 Kg',
    dimension: '5.8 x 4.0 x 2.8 Inches',
    color: 'Mystical Grey-Blue with Peacock Flash',
    material: '100% Certified Natural Labradorite',
    image: '/Gemstone.webp',
    shortDetail: 'Detailed meditative Lord Shiva face sculpture in natural Labradorite gemstone with natural blue and bronze labradorescence sheen.',
    metaTitle: 'Labradorite Shiva Face Stone Carving | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Labradorite Shiva Face idol from Jaipur manufacturer. 100% certified natural gemstone for home mandir and spiritual protection.',
    faqs: [
      { question: 'How is this statue packaged for export?', answer: 'Packed in double-walled shockproof wooden/foam boxes with moisture barrier for 100% damage-free delivery.' }
    ]
  },
  {
    slug: 'green-jade-shiva-face-with-gold-panting',
    name: 'Green Jade Shiva Face With Gold Painting',
    categoryName: 'God Statues',
    price: 26000,
    weight: '1.7 Kg',
    dimension: '7.5 x 4.8 x 3.2 Inches',
    color: 'Emerald Green with 24K Gold Highlights',
    material: '100% Certified Natural Green Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Hand-carved Green Jade Lord Shiva Face statue detailed with pure 24K gold leaf painting on Tripundra, third eye, and crescent moon.',
    metaTitle: 'Green Jade Shiva Face with Gold Painting | Crystal Jaipuria',
    metaDescription: 'Shop exquisite Green Jade Shiva Face with 24K gold painted accents from Jaipur manufacturer. 100% certified natural stone for luxury home altar.',
    faqs: [
      { question: 'Will the gold paint fade over time?', answer: 'No, traditional gold leaf lacquer bonding ensures permanent brilliance.' }
    ]
  },
  {
    slug: 'natural-tiger-eye-stone-carved-ganesha-statue',
    name: 'Natural Tiger Eye Stone Carved Ganesha Statue',
    categoryName: 'God Statues',
    price: 7500,
    weight: '600 Grams',
    dimension: '4.8 x 3.2 x 2.2 Inches',
    color: 'Golden Brown with Silky Chatoyancy',
    material: '100% Certified Natural Tiger Eye Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Lord Ganesha carved in natural Tiger Eye stone. Provides powerful grounding, shields from evil eye, and attracts prosperous opportunities.',
    metaTitle: 'Tiger Eye Ganesha Statue Handcrafted | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Natural Tiger Eye Ganesha idol from Jaipur manufacturer. 100% certified chatoyant stone for home entrance, desk and mandir.',
    faqs: [
      { question: 'What are the benefits of Tiger Eye Ganesha?', answer: 'Brings courage, protection against malefic energies, and steady commercial growth.' }
    ]
  },
  {
    slug: 'green-aventurine-carving-shiva-face-statue',
    name: 'Green Aventurine Carving Shiva Face Statue',
    categoryName: 'God Statues',
    price: 12500,
    weight: '1.1 Kg',
    dimension: '6.0 x 4.0 x 2.8 Inches',
    color: 'Sparkling Forest Green Aventurine',
    material: '100% Certified Natural Green Aventurine',
    image: '/Gemstone.webp',
    shortDetail: 'Calming Lord Shiva face sculpture carved in sparkling Green Aventurine stone. Opens the Heart Chakra, relieves stress, and promotes harmonious family life.',
    metaTitle: 'Green Aventurine Shiva Face Statue | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Green Aventurine Shiva Face idol from Jaipur manufacturer. 100% certified natural gemstone for home temple and meditation hall.',
    faqs: [
      { question: 'What does Green Aventurine Shiva face represent?', answer: 'It combines the supreme stillness of Shiva with the rejuvenating, healing energy of Aventurine crystal.' }
    ]
  },
  {
    slug: 'green-jade-parshvanath-ji-with-gold-panting',
    name: 'Green Jade Parshvanath Ji with Gold Painting',
    categoryName: 'God Statues',
    price: 24000,
    weight: '1.5 Kg',
    dimension: '7.5 x 4.2 x 2.8 Inches',
    color: 'Rich Green Jade with 24K Gold Embellishments',
    material: '100% Certified Natural Green Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Bhagwan Parshvanath Ji with 7-hooded serpent canopy in natural Green Jade, exquisitely detailed with pure 24K gold painting work.',
    metaTitle: 'Green Jade Parshvanath Ji with Gold Painting | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Green Jade Parshvanath Ji idol with 24K gold paint accents from Jaipur manufacturer. 100% certified natural stone for Jain Derasar.',
    faqs: [
      { question: 'Is this suitable for Jain temple consecration (Pratishtha)?', answer: 'Yes, our master sculptors strictly follow Jain Agamic sculpting parameters.' }
    ]
  },
  {
    slug: 'yellow-jade-shree-yantra',
    name: 'Natural Yellow Jade Shree Yantra',
    categoryName: 'Shree Yantra',
    price: 2800,
    weight: '300 Grams',
    dimension: '2.8 x 2.8 x 3.2 Inches',
    color: 'Warm Golden Yellow',
    material: '100% Certified Natural Yellow Jade',
    image: '/Gemstone.webp',
    shortDetail: '3D Maha Meru Shree Yantra hand-carved in natural Yellow Jade. Brings wealth, prosperity, auspiciousness, and Jupiter planet harmony.',
    metaTitle: 'Yellow Jade Shree Yantra 3D Meru | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Yellow Jade Shree Yantra from Jaipur manufacturer. 100% certified natural gemstone for Lakshmi puja, cash locker, and Vastu.',
    faqs: [
      { question: 'What is the power of Yellow Jade Shree Yantra?', answer: 'Combines the supreme geometric energy of Sri Yantra with the abundance vibrations of Yellow Jade.' }
    ]
  },
  {
    slug: 'green-averntuine-shivling',
    name: 'Natural Green Aventurine Shivling',
    categoryName: 'Shivling',
    price: 1500,
    weight: '320 Grams',
    dimension: '3.2 x 2.2 x 2.8 Inches',
    color: 'Translucent Emerald Green with Natural Mica Sparkle',
    material: '100% Certified Natural Green Aventurine',
    image: '/Gemstone.webp',
    shortDetail: 'Handcrafted Green Aventurine (Green Jade Quartz) Shivling. Brings emotional healing, prosperity, heart chakra activation, and peaceful family vibrations.',
    metaTitle: 'Natural Green Aventurine Shivling (100% Certified) | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Green Aventurine Shivling from Jaipur manufacturer. 100% certified authentic natural gemstone for home temple and daily Jalabhishek.',
    faqs: [
      { question: 'What are the benefits of Green Aventurine Shivling?', answer: 'Known as the stone of opportunity, it attracts luck, soothing emotional healing, and divine blessings.' }
    ]
  },
  {
    slug: 'natural-pyrite-angel',
    name: 'Natural Pyrite Carved Healing Angel',
    categoryName: 'Angel',
    price: 650,
    weight: '120 Grams',
    dimension: '2.5 x 1.5 x 1.0 Inches',
    color: 'Brilliant Metallic Gold',
    material: '100% Certified Natural Golden Pyrite',
    image: '/Gemstone.webp',
    shortDetail: 'Guardian Angel carved in solid natural Golden Pyrite. An exceptional talisman for attracting wealth, financial protection, willpower, and confidence.',
    metaTitle: 'Natural Golden Pyrite Guardian Angel | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Golden Pyrite Guardian Angel from Jaipur manufacturer. 100% certified natural healing crystal for wealth, protection and desk altar.',
    faqs: [
      { question: 'Where to place the Pyrite Angel?', answer: 'Place in the North/North-East wealth corner, office desk, or carry in your pocket for abundance.' }
    ]
  },
  {
    slug: 'lapis-lazuli-ston-shivling',
    name: 'Natural Lapis Lazuli Stone Shivling',
    categoryName: 'Shivling',
    price: 2500,
    weight: '380 Grams',
    dimension: '3.5 x 2.2 x 2.8 Inches',
    color: 'Celestial Royal Blue with Golden Pyrite Flecks',
    material: '100% Certified Natural Lapis Lazuli Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Sacred deep blue Lapis Lazuli Shivling with golden pyrite flecks. Enhances third eye vision, wisdom, cosmic truth, and protects from negativity.',
    metaTitle: 'Natural Lapis Lazuli Stone Shivling | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Lapis Lazuli Shivling from Jaipur manufacturer. 100% certified royal blue stone for home temple, meditation and daily abhishek.',
    faqs: [
      { question: 'What are the benefits of Lapis Lazuli Shivling?', answer: 'Lapis Lazuli promotes spiritual intuition, truth, inner peace, and strong auric shielding.' }
    ]
  },
  {
    slug: 'amethyst-shree-yantra',
    name: 'Natural Amethyst Gemstone Shree Yantra',
    categoryName: 'Shree Yantra',
    price: 3200,
    weight: '260 Grams',
    dimension: '2.6 x 2.6 x 3.0 Inches',
    color: 'Translucent Royal Purple',
    material: '100% Certified Natural Amethyst Gemstone',
    image: '/Gemstone.webp',
    shortDetail: '3D Maha Meru Shree Yantra carved in natural purple Amethyst stone. Purifies the Crown Chakra, attracts spiritual wealth, and calms the mind.',
    metaTitle: 'Natural Amethyst Shree Yantra 3D Meru | Crystal Jaipuria',
    metaDescription: 'Shop handcrafted Amethyst Gemstone Shree Yantra from Jaipur manufacturer. 100% certified purple crystal for home mandir, peace and Lakshmi blessings.',
    faqs: [
      { question: 'How does Amethyst Shree Yantra work?', answer: 'It combines the high spiritual frequency of Amethyst with the sacred geometry of the Sri Chakra.' }
    ]
  },
  {
    slug: 'black-jade-gemston-handicraft-shree-yantra',
    name: 'Black Jade Gemstone Handicraft Shree Yantra',
    categoryName: 'Shree Yantra',
    price: 3800,
    weight: '320 Grams',
    dimension: '2.8 x 2.8 x 3.2 Inches',
    color: 'Lustrous Jet Black',
    material: '100% Certified Natural Black Jade',
    image: '/Gemstone.webp',
    shortDetail: 'Powerful 3D Maha Meru Shree Yantra carved in natural Black Jade. Acts as an impenetrable energetic shield while attracting prosperity and success.',
    metaTitle: 'Black Jade Shree Yantra 3D Meru | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Black Jade Shree Yantra from Jaipur manufacturer. 100% certified natural gemstone for wealth, vastu protection and Diwali puja.',
    faqs: [
      { question: 'What is the power of Black Jade Shree Yantra?', answer: 'It combines maximum psychic protection against evil eye with the wealth blessings of Goddess Mahalakshmi.' }
    ]
  },
  {
    slug: 'gemston-green-avernturine-shiva-head',
    name: 'Green Aventurine Shiva Head Gemstone Carving',
    categoryName: 'God Statues',
    price: 13500,
    weight: '1.0 Kg',
    dimension: '5.8 x 4.0 x 2.8 Inches',
    color: 'Sparkling Jade Green',
    material: '100% Certified Natural Green Aventurine',
    image: '/Gemstone.webp',
    shortDetail: 'Lord Shiva Head sculpture hand-carved in glittering Green Aventurine gemstone. Inspires healing, spiritual peace, and emotional rejuvenation.',
    metaTitle: 'Green Aventurine Shiva Head Carving | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Green Aventurine Shiva Head from Jaipur manufacturer. 100% certified natural gemstone statue for home altar and meditation room.',
    faqs: [
      { question: 'Where should this be placed?', answer: 'Place facing North or East on a raised wooden or marble chowki.' }
    ]
  },
  {
    slug: 'selenite-angel',
    name: 'Natural Selenite Carved Healing Angel',
    categoryName: 'Angel',
    price: 550,
    weight: '110 Grams',
    dimension: '2.8 x 1.5 x 1.0 Inches',
    color: 'Silky Pearlescent White',
    material: '100% Certified Pure Natural Selenite Crystal',
    image: '/Gemstone.webp',
    shortDetail: 'Luminous Guardian Angel carved in genuine fibrous Selenite crystal. Cleanses negative energy, clears auric field, and purifies surrounding crystals.',
    metaTitle: 'Natural Selenite Guardian Angel | Crystal Jaipuria',
    metaDescription: 'Buy hand-carved Selenite Healing Angel from Jaipur manufacturer. 100% certified natural crystal for aura cleansing, peace, and meditation altar.',
    faqs: [
      { question: 'How to care for Selenite?', answer: 'Never wash Selenite in water as it is a soft mineral. Cleanse using sage smoke or moonlight.' }
    ]
  },
  {
    slug: 'natural-tiger-eye-angel',
    name: 'Natural Tiger Eye Carved Healing Angel',
    categoryName: 'Angel',
    price: 600,
    weight: '110 Grams',
    dimension: '2.5 x 1.5 x 1.0 Inches',
    color: 'Golden Brown with Silky Chatoyant Bands',
    material: '100% Certified Natural Tiger Eye Gemstone',
    image: '/Gemstone.webp',
    shortDetail: 'Protective Guardian Angel sculpted in natural Tiger Eye stone. Promotes courage, grounding, vitality, and shielding from negative influences.',
    metaTitle: 'Natural Tiger Eye Guardian Angel | Crystal Jaipuria',
    metaDescription: 'Shop hand-carved Tiger Eye Healing Angel from Jaipur manufacturer. 100% certified natural gemstone for courage, pocket protection, and altar decor.',
    faqs: [
      { question: 'What is the purpose of a gemstone Angel?', answer: 'Gemstone angels serve as visual and energetic reminders of spiritual guidance, protection, and divine support.' }
    ]
  }
];

const categoryIdMap = {
  'God Statues': '6a55bb1f2e9a358fc926cbab',
  'Shivling': '6a55bc292dcf49aacd71ef65',
  'Shree Yantra': '6a55bc362dcf49aacd71ef66',
  'Angel': '6a55bc3f2dcf49aacd71ef67',
  'Crystal Statues': '6a55bc492dcf49aacd71ef68',
  'Diya': '6a55bc522dcf49aacd71ef69'
};

const fullProducts = gscProducts.map(p => {
  const catId = categoryIdMap[p.categoryName] || '6a55bb1f2e9a358fc926cbab';
  const additionalInfo = '<ul>' +
    '<li><strong>Color :</strong> ' + p.color + '</li>' +
    '<li><strong>Weight :</strong> ' + p.weight + '</li>' +
    '<li><strong>Dimension :</strong> ' + p.dimension + '</li>' +
    '<li><strong>Material :</strong> ' + p.material + '</li>' +
    '<li><strong>Country of Origin :</strong> Handcrafted in Jaipur, India (Est. 1989)</li>' +
    '<li><strong>Certification :</strong> 100% Certified Authentic Natural Gemstone</li>' +
  '</ul>';

  const description = '<h2>About ' + p.name + '</h2>' +
    '<p>' + p.shortDetail + '</p>' +
    '<h3>Key Spiritual &amp; Astrological Benefits</h3>' +
    '<ul>' +
      '<li><strong>Authentic Vedic Craftsmanship:</strong> Handcrafted by generational master artisans in Jaipur according to Shilpa Shastra guidelines.</li>' +
      '<li><strong>100% Certified Natural Gemstone:</strong> Carved from genuine, unheated natural gemstone possessing high spiritual energy vibrations.</li>' +
      '<li><strong>Vastu &amp; Spiritual Energy:</strong> Neutralizes household vastu doshas and purifies the surrounding electromagnetic aura.</li>' +
      '<li><strong>Puja &amp; Consecration:</strong> Ideal for home temple, daily abhishek, meditation altar, and spiritual gifting.</li>' +
    '</ul>' +
    '<h3>Packaging &amp; Worldwide Safe Delivery</h3>' +
    '<p>Each product is carefully packaged in shockproof multi-layered protective casing to guarantee 100% safe, damage-free doorstep delivery worldwide.</p>';

  return {
    _id: 'legacy_' + p.slug,
    name: p.name,
    slug: p.slug,
    price: p.price,
    discountPrice: Math.round(p.price * 1.35),
    stock: 5,
    categoryId: {
      _id: catId,
      name: p.categoryName,
      slug: p.categoryName.toLowerCase().replace(/\s+/g, '-')
    },
    images: [p.image || '/Gemstone.webp'],
    detail: p.shortDetail,
    description: description,
    additionalInfo: additionalInfo,
    weight: p.weight,
    size: p.dimension,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    faqs: p.faqs,
    isStandardized: true
  };
});

const content = '// Auto-generated legacy products registry for Google Search Console recovery\n' +
  'export const LEGACY_PRODUCTS = ' + JSON.stringify(fullProducts, null, 2) + ';\n\n' +
  'export const LEGACY_PRODUCT_MAP = new Map(\n' +
  '  LEGACY_PRODUCTS.map(p => [p.slug, p])\n' +
  ');\n\n' +
  'export function getLegacyProductBySlug(slug) {\n' +
  '  if (!slug) return null;\n' +
  '  const cleanSlug = String(slug).trim().toLowerCase().replace(/^\\/product\\//, "").replace(/\\/$/, "");\n' +
  '  return LEGACY_PRODUCT_MAP.get(cleanSlug) || null;\n' +
  '}\n';

fs.writeFileSync(path.join(__dirname, '../src/utils/legacyProducts.js'), content, 'utf8');
console.log('Successfully generated legacyProducts.js with', fullProducts.length, 'products!');
