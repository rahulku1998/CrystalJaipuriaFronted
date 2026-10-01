import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PRODUCTS_DATA } from "./add-21-products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateProductObject = (item, index) => {
  const idHex = (0x6abd5000 + index).toString(16).padEnd(24, "0");
  const isYantra = item.archetype === "yantra";
  const isElephant = item.archetype === "statue";
  const isGanesha = item.archetype === "ganesha";

  let detail = "";
  let fullDesc = "";
  let faqs = [];
  let vedicVastu = {};
  let additionalBullets = [];

  const cleanName = item.name;
  const stoneName = item.stoneName;
  const size = item.size;
  const weight = item.weight;
  const price = item.price;
  const formattedPrice = `₹${price.toLocaleString("en-IN")}`;

  if (isYantra) {
    const isKurma = item.slug.includes("kurma");
    const isLotus = item.slug.includes("lotus");

    detail = `Sacred hand-carved ${cleanName} (${weight}, ${size}) sculpted from certified earth-mined ${stoneName} by master lapidaries in Jaipur (est. 1989). Designed in accordance with ancient Vedic Agama Shastras with 43 interlocking sacred triangles and 3D Meru Mount geometry, channeling continuous Mahalakshmi wealth magnetism, Vastu harmony, and spiritual elevation for home temple and workplace.`;

    const subArchitecture = isKurma
      ? `<p>This sacred <strong>Kurma Shree Yantra</strong> features the 3D Meru Maha Yantra consecrated upon the solid back of Lord Kurma (the tortoise avatar of Lord Vishnu). The cosmic turtle represents stability, eternal grounding, and unshakeable prosperity, ensuring wealth earned is preserved and multiplied across generations.</p>`
      : isLotus
      ? `<p>Sculpted upon an intricately unfurled <strong>Padma Peetham (Sacred Lotus Base)</strong>, this ${stoneName} Shree Yantra symbolizes divine purity, self-realization, and the supreme seat of Goddess Lakshmi, radiating serene vibrations throughout your sanctum.</p>`
      : `<p>Engineered with flawless mathematical precision, this 3D <strong>Maha Meru Shree Yantra</strong> reflects the sacred geometric blueprint of the macrocosmic cosmos. Its 43 interlocking triangles (9 intersecting primary triangles) generate an intense vortex of positive bio-electromagnetic energy that dispels negative frequencies and invokes lasting auspiciousness.</p>`;

    fullDesc = `<p>${detail}</p>

<h2>Sacred Vedic Geometry & Meru Architecture</h2>
${subArchitecture}
<ul>
  <li><strong>Bindu (The Supreme Central Source):</strong> The focal apex representing pure cosmic consciousness and the supreme seat of Tripurasundari Mahalakshmi.</li>
  <li><strong>Trikona &amp; Chakras:</strong> Nine interlocking triangles forming 43 sub-triangles enclosed by eight and sixteen lotus petals (Ashtadal &amp; Shodashadal).</li>
  <li><strong>Bhupura (Earth Citadel):</strong> The square protective base with four cardinal gates, anchoring abundance into physical reality and shielding your premises from evil eye and financial stagnation.</li>
  <li><strong>100% Certified Natural ${stoneName}:</strong> Hand-carved from genuine, unheated, earth-mined gemstone possessing inherent crystalline vibrational healing attributes.</li>
</ul>

<h2>Astrological &amp; Vastu Shastra Placement</h2>
<p>According to classical Vastu Shastra, placing the ${cleanName} in the <strong>North-East (Ishanya Kon)</strong>, <strong>North (Kuber Asthana)</strong>, or <strong>East</strong> sector harmonizes stagnant energy and amplifies wealth creation:</p>
<ul>
  <li><strong>Home Temple / Puja Altar:</strong> Elevates spiritual awareness, brings inner tranquility, and removes planetary afflictions (${item.planet}).</li>
  <li><strong>Cash Safe / Billing Desk / Locker:</strong> Directs auspicious financial flow, protects accumulated wealth, and mitigates business losses.</li>
  <li><strong>Meditation &amp; Study Area:</strong> Balances the ${item.chakra}, sharpening focus, intellectual clarity, and decision-making capabilities.</li>
</ul>

<h2>Consecration &amp; Daily Puja Vidhi</h2>
<p>To awaken the divine prana of your ${stoneName} Shree Yantra:</p>
<ol>
  <li>Cleanse gently on Friday morning or during Shukla Paksha with fresh Gangajal or raw cow milk, followed by pure water.</li>
  <li>Gently wipe dry with a clean, unused microfiber cloth.</li>
  <li>Place on a clean silk cloth (yellow, pink, or red) with the flat base anchored firmly and apex pointing towards the worshipper.</li>
  <li>Offer fragrant red flowers, pure chandan/kumkum at the Bindu, and light a pure cow-ghee diya with natural dhoop.</li>
  <li>Chant the sacred Mahalakshmi Beej Mantra: <em>"Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed Om Shreem Hreem Shreem Mahalakshmaye Namah"</em> or <em>Sri Suktam</em> 11 or 108 times.</li>
</ol>

<h2>Technical &amp; Gemological Specifications</h2>
<table style="width:100%; border-collapse:collapse; margin:18px 0; border:1px solid #e5e7eb; font-size:14px;">
  <thead>
    <tr style="background:#f8fafc;">
      <th style="border:1px solid #e2e8f0; padding:10px 14px; text-align:left; font-weight:700; color:#1e293b;">Attribute</th>
      <th style="border:1px solid #e2e8f0; padding:10px 14px; text-align:left; font-weight:700; color:#1e293b;">Certified Specification</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Product Name</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${cleanName}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Material Composition</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${stoneName} (${item.mineral})</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Weight Category</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${weight}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Size Dimensions</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${size}</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Gemstone Hardness</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${item.hardness}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Natural Gemstone Color</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${item.color}</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Listed Value</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569; font-weight:700;">${formattedPrice}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Primary Vastu Direction</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">North-East (Ishanya Kon), North or East Altar</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Lapidary Provenance</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">Jaipur Heritage Workshops, Rajasthan, India (Est. 1989)</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Authenticity Guarantee</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">100% Earth-Mined Natural Gemstone (Lab Certified)</td>
    </tr>
  </tbody>
</table>`;

    faqs = [
      {
        question: `How do I properly worship and activate this ${cleanName} at home?`,
        answer: `Cleanse your ${cleanName} with pure Gangajal, place it on a clean red or yellow silk cloth in the North-East or North direction, apply kumkum/sandalwood paste to the central Bindu, light a ghee diya, and chant the Mahalakshmi Beej Mantra or Sri Suktam on Friday mornings for energized prosperity.`
      },
      {
        question: `What are the Vedic and Vastu benefits of keeping a ${cleanName} in the office or home?`,
        answer: `The 3D Meru geometry of the Shree Yantra combined with natural ${stoneName} attracts financial abundance, resolves persistent Vastu doshas, neutralizes malefic planetary influences (${item.planet}), and fosters peace and emotional harmony across the living space.`
      },
      {
        question: `Which direction should the ${cleanName} face according to Vastu Shastra?`,
        answer: `Vastu Shastra strongly recommends placing the ${cleanName} in the North-East (Ishanya) corner, North (Kubera direction for wealth), or East (sunrise spiritual portal). The apex should point upwards, oriented towards the devotee during prayer.`
      },
      {
        question: `Is this ${cleanName} hand-carved from 100% genuine earth-mined gemstone?`,
        answer: `Yes, each ${cleanName} is hand-carved from certified, 100% natural earth-mined ${stoneName} by generational master lapidaries in Jaipur, India (est. 1989). It is entirely free of synthetic resins, artificial dyes, or lab-created composites.`
      }
    ];

    vedicVastu = {
      placementDirection: "North-East (Ishanya Kon), North (Kubera Realm), or East Home Temple Altar",
      chakraPlanet: `${item.chakra} • Planetary Energy: ${item.planet}`,
      poojaVidhi: "Offer holy Gangajal, raw unboiled milk, apply kumkum to the Bindu apex, light a pure cow-ghee lamp, and chant Sri Suktam or Om Shreem Hreem Shreem Mahalakshmaye Namah on Fridays.",
      vedicBenefits: `Radiates 3D Meru Sri Chakra geometry, attracts unhindered financial abundance, neutralizes environmental disharmony, and channels supreme Mahalakshmi blessings.`
    };

    additionalBullets = [
      `<li><strong class="font-bold text-gray-900">Product Name :</strong> ${cleanName}</li>`,
      `<li><strong class="font-bold text-gray-900">Brand &amp; Manufacturer :</strong> Crystal Jaipuria, Jaipur (Est. 1989)</li>`,
      `<li><strong class="font-bold text-gray-900">Material Composition :</strong> 100% Certified Earth-Mined ${stoneName}</li>`,
      `<li><strong class="font-bold text-gray-900">Weight :</strong> ${weight}</li>`,
      `<li><strong class="font-bold text-gray-900">Dimensions :</strong> ${size}</li>`,
      `<li><strong class="font-bold text-gray-900">Geometry :</strong> 3D Maha Meru Pyramid with 43 Sacred Triangles</li>`,
      `<li><strong class="font-bold text-gray-900">Listed Price :</strong> ${formattedPrice} (Factory Direct)</li>`,
      `<li><strong class="font-bold text-gray-900">Auspicious Vastu Direction :</strong> North-East (Ishanya Kon) or North Altar</li>`,
      `<li><strong class="font-bold text-gray-900">Authenticity Guarantee :</strong> 100% Earth-Mined Natural Gemstone</li>`,
      `<li><strong class="font-bold text-gray-900">Packaging &amp; Transit :</strong> Heavy-duty shockproof box with 100% insured express delivery</li>`
    ];

  } else if (isElephant) {
    detail = `Magnificent hand-carved ${cleanName} (${weight}, ${size}) sculpted from certified earth-mined ${stoneName} with brilliant golden pyrite specks by generational Jaipur artisans. In Vedic Vastu Shastra, the sacred elephant pair (Gajendra / Airavata) personifies wisdom, steadfast strength, royal authority, and unshakeable financial abundance, making it an extraordinary talisman for home, office, and luxury decor.`;

    fullDesc = `<p>${detail}</p>

<h2>Sacred Elephant Iconography &amp; Vedic Symbolism</h2>
<p>Handcrafted strictly according to traditional Indian lapidary heritage by master stone-carvers in Jaipur (est. 1989), this rare pair of elephants portrays the supreme auspiciousness of Vedic Gajalakshmi traditions:</p>
<ul>
  <li><strong>Raised Trunk Posture:</strong> Signifies triumphant reception of divine blessings, active fortune, high vitality, and barrier removal.</li>
  <li><strong>Set of 2 Harmony:</strong> Dual elephants symbolize balanced marital affection, generational lineage protection, and unwavering loyalty in relationships.</li>
  <li><strong>Natural Royal Lapis Lazuli:</strong> Featuring authentic lazurite with sparkling golden pyrite crystals, reflecting cosmic starlight, stimulating the Third Eye chakra, and repelling malefic psychic energies.</li>
</ul>

<h2>Vastu Placement &amp; Energy Alignment</h2>
<p>To harness the auspicious energy of your ${cleanName}:</p>
<ul>
  <li><strong>Main Entrance / Foyer:</strong> Place the pair facing inward towards the interior of the home or office to invite continuous prosperity and guard against negative intrusions.</li>
  <li><strong>Living Room &amp; Executive Office:</strong> Display on a sturdy wooden console in the North or East quadrant to promote career elevation, executive command, and financial security.</li>
  <li><strong>Bedroom Console:</strong> Fosters enduring mutual respect, stability, and emotional grounding between partners.</li>
</ul>

<h2>Care, Cleansing &amp; Maintenance</h2>
<p>To preserve the lustrous natural sheen of ${stoneName}:</p>
<ol>
  <li>Wipe gently with a soft dry or slightly damp cotton cloth.</li>
  <li>Avoid soaking in acidic cleaners or harsh chemicals to protect the delicate calcite and pyrite matrix.</li>
  <li>Recharge in soft morning sunlight or moonbeam light periodically to revitalize its crystalline frequency.</li>
</ol>

<h2>Technical &amp; Gemological Specifications</h2>
<table style="width:100%; border-collapse:collapse; margin:18px 0; border:1px solid #e5e7eb; font-size:14px;">
  <thead>
    <tr style="background:#f8fafc;">
      <th style="border:1px solid #e2e8f0; padding:10px 14px; text-align:left; font-weight:700; color:#1e293b;">Attribute</th>
      <th style="border:1px solid #e2e8f0; padding:10px 14px; text-align:left; font-weight:700; color:#1e293b;">Certified Specification</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Product Name</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${cleanName}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Material Composition</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${stoneName} (${item.mineral})</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Weight Category</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${weight}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Size Dimensions</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${size}</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Configuration</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">Set of 2 Matching Handcrafted Elephant Idols</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Listed Value</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569; font-weight:700;">${formattedPrice}</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Primary Vastu Direction</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">North, East, or Main Entrance Facing Inward</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Lapidary Provenance</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">Jaipur Heritage Workshops, Rajasthan, India (Est. 1989)</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Authenticity Guarantee</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">100% Earth-Mined Natural Gemstone (Lab Certified)</td>
    </tr>
  </tbody>
</table>`;

    faqs = [
      {
        question: `Where should I place the ${cleanName} in my home according to Vastu?`,
        answer: `Place the elephant pair facing inward into your home near the main foyer, or in the North or East zones of your living room or study. Facing inwards symbolizes welcoming wealth and wisdom into the household while shielding the residence from obstacles.`
      },
      {
        question: `What is the spiritual and Vastu significance of elephant statues in Lapis Lazuli?`,
        answer: `In Vedic wisdom, elephants represent Gajalakshmi, unshakeable stability, and royal fortune. Carved in deep blue Lapis Lazuli with golden pyrite, they channel the Third Eye chakra, promote intellectual clarity, and ward off negative external influences.`
      },
      {
        question: `Is this set carved from 100% authentic natural Lapis Lazuli?`,
        answer: `Yes, this pair is sculpted from 100% certified earth-mined Lapis Lazuli featuring natural blue lazurite and authentic golden iron pyrite veins, completely free from artificial dyes or synthetic resins.`
      },
      {
        question: `Can this elephant pair be gifted for housewarmings or corporate occasions?`,
        answer: `Absolutely. A pair of gemstone elephants is considered among the most prestigious and auspicious gifts in Indian tradition, symbolizing long life, professional success, wisdom, and everlasting goodwill.`
      }
    ];

    vedicVastu = {
      placementDirection: "North, East, or Main Entrance Foyer Facing Inward",
      chakraPlanet: `${item.chakra} • Planetary Energy: ${item.planet}`,
      poojaVidhi: "Wipe with holy Gangajal cloth on Thursdays, offer fragrant flowers or dhoop, and place as a protective abundance guardian.",
      vedicBenefits: "Invokes Gajalakshmi blessings, safeguards accumulated wealth, fosters domestic harmony, and stimulates high-level strategic intelligence."
    };

    additionalBullets = [
      `<li><strong class="font-bold text-gray-900">Product Name :</strong> ${cleanName}</li>`,
      `<li><strong class="font-bold text-gray-900">Brand &amp; Manufacturer :</strong> Crystal Jaipuria, Jaipur (Est. 1989)</li>`,
      `<li><strong class="font-bold text-gray-900">Material Composition :</strong> 100% Certified Natural Lapis Lazuli</li>`,
      `<li><strong class="font-bold text-gray-900">Weight :</strong> ${weight}</li>`,
      `<li><strong class="font-bold text-gray-900">Dimensions :</strong> ${size}</li>`,
      `<li><strong class="font-bold text-gray-900">Contents :</strong> Set of 2 Matching Handcrafted Elephant Idols</li>`,
      `<li><strong class="font-bold text-gray-900">Listed Price :</strong> ${formattedPrice} (Pair Complete)</li>`,
      `<li><strong class="font-bold text-gray-900">Auspicious Vastu Direction :</strong> North, East or Foyer Facing Inwards</li>`,
      `<li><strong class="font-bold text-gray-900">Authenticity Guarantee :</strong> 100% Earth-Mined Natural Gemstone</li>`,
      `<li><strong class="font-bold text-gray-900">Packaging &amp; Transit :</strong> Heavy-duty shockproof box with 100% insured express delivery</li>`
    ];

  } else if (isGanesha) {
    const isEmerald = item.slug.includes("emerald");
    const weightCarats = isEmerald ? ` (${weight})` : ` (${weight})`;

    detail = `Auspicious hand-carved ${cleanName}${weightCarats} sculpted from single-specimen certified natural ${stoneName} by master lapidaries in Jaipur (est. 1989). Radiating divine Vighnaharta blessings, Abhaya Mudra protection, and obstacle-clearing grace, this sacred Ganesha idol invites profound wisdom, commercial prosperity, and spiritual elevation to your home temple or office altar.`;

    const emeraldHighlight = isEmerald
      ? `<p><strong>Precious Gemstone Consecration:</strong> Carved from over 500 carats of natural earth-mined precious Emerald (Panna), this masterwork holds supreme Vedic astrological potency for pacifying Planet Mercury (Budh Mahadasha), awakening rapid business growth, intellect, and eloquence.</p>`
      : `<p><strong>Sacred Shilpa Shastra Proportions:</strong> Sculpted with anatomical precision and sacred geometry, this ${stoneName} Ganesha channels continuous positive bio-resonance, banishing lethargy and dispelling stagnant vibrations from your surroundings.</p>`;

    fullDesc = `<p>${detail}</p>

<h2>Sacred Ganesha Iconography &amp; Vedic Attributes</h2>
${emeraldHighlight}
<ul>
  <li><strong>Vamamukhi Swaroop (Left-Turned Trunk):</strong> Symbolizes gentle, peaceful Ida Nadi energy, blessing the home with domestic bliss, effortless obstacle removal, and enduring contentment.</li>
  <li><strong>Modak &amp; Ankush:</strong> The sacred sweet delicacy in hand represents the sweet reward of spiritual self-realization (Jnana), while the divine goad guides self-discipline.</li>
  <li><strong>Abhaya Mudra:</strong> The right hand raised in fearless protection assures the devotee of supreme divine shielding against misfortune and malicious intent.</li>
  <li><strong>Certified Natural ${stoneName}:</strong> 100% untreated, earth-mined gemstone displaying authentic crystalline inclusions and brilliant natural luster.</li>
</ul>

<h2>Vastu Placement &amp; Astrological Significance</h2>
<p>Placing your ${cleanName} in accordance with classical Vastu Shastra maximizes its benevolent energy:</p>
<ul>
  <li><strong>Home Temple (Ishanya Kon):</strong> Set in the North-East or North altar to remove obstacles from family endeavors and enhance spiritual serenity.</li>
  <li><strong>Work Desk &amp; Commercial Office:</strong> Position facing North or East on your executive desk to attract lucrative opportunities, sharp business discernment, and steady progress.</li>
  <li><strong>Planetary Pacification:</strong> Strengthens ${item.planet} and balances the ${item.chakra}, instilling mental focus and emotional composure.</li>
</ul>

<h2>Puja Vidhi &amp; Consecration Guidelines</h2>
<ol>
  <li>Consecrate your Ganesha idol on Wednesday or during Chaturthi.</li>
  <li>Gently wipe with holy Gangajal or pure floral water using a soft cotton cloth.</li>
  <li>Apply a sacred tilak of pure red vermilion (Kumkum) or yellow chandan.</li>
  <li>Offer fresh green Durva grass blades, red hibiscus or marigold flowers, and a piece of jaggery or modak.</li>
  <li>Light a pure cow-ghee lamp and chant the powerful Ganesha Mool Mantra: <em>"Om Gam Ganapataye Namaha"</em> 21 or 108 times.</li>
</ol>

<h2>Technical &amp; Gemological Specifications</h2>
<table style="width:100%; border-collapse:collapse; margin:18px 0; border:1px solid #e5e7eb; font-size:14px;">
  <thead>
    <tr style="background:#f8fafc;">
      <th style="border:1px solid #e2e8f0; padding:10px 14px; text-align:left; font-weight:700; color:#1e293b;">Attribute</th>
      <th style="border:1px solid #e2e8f0; padding:10px 14px; text-align:left; font-weight:700; color:#1e293b;">Certified Specification</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Product Name</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${cleanName}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Material Composition</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${stoneName} (${item.mineral})</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Weight Category</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${weight}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Size Dimensions</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${size}</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Hardness &amp; Durability</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">${item.hardness}</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Listed Value</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569; font-weight:700;">${formattedPrice}</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Primary Vastu Direction</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">North-East (Ishanya Kon), North or East Altar</td>
    </tr>
    <tr style="background:#f8fafc;">
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Lapidary Provenance</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">Jaipur Heritage Workshops, Rajasthan, India (Est. 1989)</td>
    </tr>
    <tr>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; font-weight:600; color:#334155;">Authenticity Guarantee</td>
      <td style="border:1px solid #e2e8f0; padding:9px 14px; color:#475569;">100% Earth-Mined Natural Gemstone (Lab Certified)</td>
    </tr>
  </tbody>
</table>`;

    faqs = [
      {
        question: `How should I worship and energize this ${cleanName} at home?`,
        answer: `Cleanse the idol with holy Gangajal on a Wednesday, place on a clean silk asana facing North or East, offer Durva grass and a modest modak/sweet, light a pure cow-ghee lamp, and chant the Ganesha Mool Mantra 'Om Gam Ganapataye Namaha' 21 or 108 times.`
      },
      {
        question: `What are the benefits of keeping a ${stoneName} Ganesha idol in the office or home altar?`,
        answer: `Lord Ganesha removes financial, personal, and career hurdles. Handcrafted from natural ${stoneName}, this sacred idol balances the ${item.chakra}, harmonizes planetary energies (${item.planet}), and brings mental focus, good fortune, and success.`
      },
      {
        question: `Which direction is most auspicious for placing this Ganesha idol?`,
        answer: `The ideal direction for Lord Ganesha is the North-East (Ishanya Kon), North (Kubera direction for wealth), or East (sunrise spiritual portal). Ensure Ganesha's back does not face any main living door or room.`
      },
      {
        question: `Is this ${cleanName} sculpted from 100% certified natural gemstone?`,
        answer: `Yes, every ${cleanName} is meticulously hand-sculpted from single-piece, certified 100% earth-mined ${stoneName} by master lapidaries in Jaipur, India (est. 1989), completely unadulterated by artificial resins or colors.`
      }
    ];

    vedicVastu = {
      placementDirection: "North-East (Ishanya Kon), North, or East Altar / Office Desk",
      chakraPlanet: `${item.chakra} • Planetary Energy: ${item.planet}`,
      poojaVidhi: "Offer Gangajal, sacred Durva grass blades, red/yellow flowers, light a pure ghee diya, and chant Om Gam Ganapataye Namaha.",
      vedicBenefits: "Clears professional and domestic obstacles, invokes Vighnaharta blessings, sharpens intellect, and brings unhindered commercial abundance."
    };

    additionalBullets = [
      `<li><strong class="font-bold text-gray-900">Product Name :</strong> ${cleanName}</li>`,
      `<li><strong class="font-bold text-gray-900">Brand &amp; Manufacturer :</strong> Crystal Jaipuria, Jaipur (Est. 1989)</li>`,
      `<li><strong class="font-bold text-gray-900">Material Composition :</strong> 100% Certified Earth-Mined ${stoneName}</li>`,
      `<li><strong class="font-bold text-gray-900">Weight :</strong> ${weight}</li>`,
      `<li><strong class="font-bold text-gray-900">Dimensions :</strong> ${size}</li>`,
      `<li><strong class="font-bold text-gray-900">Listed Price :</strong> ${formattedPrice} (Factory Direct)</li>`,
      `<li><strong class="font-bold text-gray-900">Auspicious Vastu Direction :</strong> North-East (Ishanya Kon), North or East Altar</li>`,
      `<li><strong class="font-bold text-gray-900">Authenticity Guarantee :</strong> 100% Earth-Mined Natural Gemstone</li>`,
      `<li><strong class="font-bold text-gray-900">Packaging &amp; Transit :</strong> Heavy-duty shockproof box with 100% insured express delivery</li>`
    ];
  }

  // Meta Title & Meta Description targeting user's short-tail, long-tail, and LSI keywords
  let metaTitle = "";
  let metaDescription = "";

  if (isYantra) {
    metaTitle = `${cleanName} (${weight}) | 100% Natural Meru Sri Chakra | Crystal Jaipuria`;
    metaDescription = `Buy 100% certified ${cleanName} (${size}, ${weight}). Handcrafted 3D Meru Sri Chakra geometry for wealth, Vastu & home temple at ${formattedPrice} direct from Jaipur.`;
  } else if (isElephant) {
    metaTitle = `Natural Lapis Lazuli Elephant Idols Set of 2 (${weight}) | Vastu Gemstone Pair | Crystal Jaipuria`;
    metaDescription = `Buy authentic hand-carved ${cleanName} (${size}, ${weight}). Royal blue natural lapis lazuli elephant pair for Vastu prosperity & luxury decor at ${formattedPrice}.`;
  } else if (isGanesha) {
    metaTitle = `${cleanName} (${weight}) | Hand-Carved Natural Gemstone Murti | Crystal Jaipuria`;
    metaDescription = `Buy certified ${cleanName} (${size}, ${weight}). Handcrafted Vighnaharta idol in natural ${stoneName} for home temple & office altar at ${formattedPrice} from Jaipur.`;
  }

  const additionalInfo = `<ul class="space-y-2.5 list-disc pl-5 text-gray-700 leading-relaxed font-normal">\n  ${additionalBullets.join("\n  ")}\n</ul>\n` +
    `<!-- FAQS_JSON:${JSON.stringify(faqs)} -->\n` +
    `<!-- SEO_META:${JSON.stringify({ metaTitle, metaDescription })} -->\n` +
    `<!-- VEDIC_VASTU_JSON:${JSON.stringify(vedicVastu)} -->`;

  return {
    _id: idHex,
    name: cleanName,
    slug: item.slug,
    price: item.price,
    discountPrice: item.price,
    detail: detail.trim(),
    description: fullDesc.trim(),
    additionalInfo: additionalInfo.trim(),
    faqs,
    metaTitle,
    metaDescription,
    vedicVastu,
    images: item.images,
    categoryId: item.category,
    categoryName: item.category.name,
    subCategoryId: item.subCategory,
    subCategoryName: item.subCategory.name,
    size: item.size,
    weight: item.weight,
    stock: "in_stock",
    featured: true,
    pricePerUnit: item.price,
    pricePerCarat: isYantra && item.slug.includes("emerald") ? Math.round(item.price / 174.3) : (isGanesha && item.slug.includes("emerald") ? Math.round(item.price / 509.1) : undefined)
  };
};

const generatedProducts = PRODUCTS_DATA.map((p, idx) => generateProductObject(p, idx));

console.log(`Generated ${generatedProducts.length} full product entries.`);

// Export to file for verification
fs.writeFileSync(
  path.resolve(__dirname, "../scratch_21_products.json"),
  JSON.stringify(generatedProducts, null, 2),
  "utf8"
);

console.log("Written to scratch_21_products.json successfully.");
