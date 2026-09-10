import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../Components/SEO";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaGem,
  FaChevronDown,
  FaSearch,
  FaWater,
  FaWeightHanging,
  FaTemperatureLow,
  FaWhatsapp,
} from "react-icons/fa";

const GemstoneAuthenticityGuide = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const tests = [
    {
      icon: <FaTemperatureLow className="text-2xl text-cyan-600" />,
      title: "1. The Cold-Touch Thermal Test",
      method: "Hold the stone to your cheek or in your palm at room temperature.",
      genuine:
        "Natural gemstones (like Sphatik Quartz, Jade, Agate) have high thermal conductivity and naturally remain cool to the touch for the first few seconds.",
      fake: "Glass and resin quickly absorb body heat and warm up almost instantly.",
    },
    {
      icon: <FaSearch className="text-2xl text-indigo-600" />,
      title: "2. Inclusions & Natural Flaws Check",
      method: "Examine the stone under direct sunlight or a 10x jeweler's loupe.",
      genuine:
        "True earth-mined gemstones contain natural veil patterns, mineral threads, or subtle microscopic inclusions formed over millions of years.",
      fake: "Melted glass or synthetic resin contains spherical air bubbles, perfectly uniform clarity, or swirl mold lines.",
    },
    {
      icon: <FaWeightHanging className="text-2xl text-amber-600" />,
      title: "3. Density & Specific Gravity Test",
      method: "Hold a genuine stone in one hand and a glass/plastic piece of similar size in the other.",
      genuine:
        "Natural quartz and minerals possess a density between 2.65 to 3.5+ g/cm³, giving them a distinct substantial, weighty feel.",
      fake: "Acrylic, plastic, and cheap resin feel noticeably light, hollow, and synthetic in the hand.",
    },
    {
      icon: <FaWater className="text-2xl text-blue-600" />,
      title: "4. Water & Jalabhishekam Stability",
      method: "Perform daily Puja, Jalabhishekam, and Panchamrit rituals with water, milk, and curd.",
      genuine:
        "Earth-mined gemstones are impervious to natural water and milk. Their polish and structural integrity remain intact for generations.",
      fake: "Cheap dyed stones or chemically treated resin can leach toxic chemical colors or develop surface fogging over time.",
    },
  ];

  const comparisonRows = [
    {
      feature: "Material Source",
      genuine: "100% Earth-mined rough stones sourced directly from genuine mineral mines.",
      fake: "Melted silicate glass, epoxy resin, or synthetic reconstituted powder.",
    },
    {
      feature: "Internal Structure",
      genuine: "Natural growth zoning, subtle healing inclusions, authentic mineral fractures.",
      fake: "Round circular air bubbles, chemical cloudiness, or unnatural absolute uniformity.",
    },
    {
      feature: "Surface Temperature",
      genuine: "Cool and soothing to the touch at room ambient temperature.",
      fake: "Warm or quickly matches skin temperature immediately upon contact.",
    },
    {
      feature: "Vedic & Spiritual Energy",
      genuine: "Carries high vibrational frequency according to Shilpa Shastra & Vedic scriptures.",
      fake: "Inert plastic/glass with zero energetic conductivity.",
    },
    {
      feature: "Pujas & Abhishekam",
      genuine: "Completely safe for lifelong Jalabhishekam, Ganga Jal, milk, and honey rituals.",
      fake: "May peel, lose synthetic coating, discolor, or react with acids.",
    },
    {
      feature: "Crafting Technique",
      genuine: "Hand-carved with diamond tools by hereditary master artisans in Jaipur, India.",
      fake: "Factory mold injection or high-speed automated plastic press.",
    },
  ];

  const guideFaqs = [
    {
      q: "How can I test if my Sphatik Shivling is 100% real quartz or glass?",
      a: "Perform the cold-touch test: real Sphatik feels icy cool when placed against your forehead or cheek. When examined under light, natural Sphatik has faint organic veil inclusions (called 'Dhula' or feather lines), whereas glass has perfectly spherical circular bubbles.",
    },
    {
      q: "Can I do daily Jalabhishekam with milk and water on a gemstone idol?",
      a: "Yes! Genuine natural stones (Sphatik, Black Jade, Narmadeshwar stone, Green Aventurine) are naturally dense and non-porous. Daily Abhishek rituals will not damage or erode the stone.",
    },
    {
      q: "Does a natural gemstone idol need to be 100% flaw-free like glass?",
      a: "No. In Vedic gemology, natural inclusions ('prakriti chinhas') prove that the stone is naturally formed in the earth over geological epochs. Only artificial glass or plastic is 100% bubble-free and uniform.",
    },
    {
      q: "Where does Crystal Jaipuria manufacture its gemstone idols?",
      a: "All our idols and Shivlings are handcrafted by hereditary master carvers at our dedicated artisan workshop located in Sanganer, Jaipur, Rajasthan (crafting authentic Vedic murtis since 1989).",
    },
    {
      q: "What if my gemstone idol arrives damaged during transit?",
      a: "We provide 100% transit insurance on every single package. Every parcel is packed with triple-layer shockproof bubble and rigid thermocol protection. In the rare event of transit damage, we offer an immediate 100% free replacement under our 7-day policy.",
    },
  ];

  const guideSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://www.crystaljaipuria.com/gemstone-authenticity-guide#article",
        "headline": "How to Identify Authentic Gemstone Shivling & Murti: Expert Jaipur Artisan Guide",
        "description": "Complete identification guide to test authentic gemstone Shivlings, natural Sphatik, and crystal idols. Learn cold touch, inclusion, and density tests from master artisans in Jaipur.",
        "author": {
          "@type": "Organization",
          "name": "Crystal Jaipuria",
          "url": "https://www.crystaljaipuria.com/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Crystal Jaipuria",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.crystaljaipuria.com/logo.png"
          }
        },
        "mainEntityOfPage": "https://www.crystaljaipuria.com/gemstone-authenticity-guide",
        "datePublished": "2024-01-15",
        "dateModified": "2025-09-07"
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.crystaljaipuria.com/gemstone-authenticity-guide#faq",
        "mainEntity": guideFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <SEO
        title="How to Identify Authentic Gemstone Shivling & Murti | Authenticity Guide | Crystal Jaipuria"
        description="Master guide on how to test authentic gemstone Shivlings, Sphatik idols, and healing crystals. Learn the Cold-Touch test, inclusions check, and Vedic Pran Pratishtha rituals from Jaipur artisans."
        canonical="https://www.crystaljaipuria.com/gemstone-authenticity-guide"
        schema={guideSchema}
      />

      <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* HEADER HERO */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-200 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs sm:text-sm font-bold tracking-wide">
              <FaGem className="text-amber-700 text-sm" />
              <span>JAIPUR ARTISAN KNOWLEDGE BASE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              How to Identify Authentic Natural Gemstone Shivlings &amp; Idols
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              With the influx of synthetic glass, resin molds, and Chinese plastic replicas, here is an authoritative guide by our master gemstone carvers in Jaipur on how to verify 100% natural earth-mined stone.
            </p>
          </div>

          {/* 4 SCIENTIFIC IDENTIFICATION TESTS */}
          <div className="mt-10 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-2.5 h-6 bg-indigo-600 rounded-full"></span>
              <span>4 Simple Tests to Identify Real Gemstones at Home</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tests.map((test, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 bg-slate-100 rounded-xl">{test.icon}</div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-900">
                        {test.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 italic mb-4">
                      <strong>Method:</strong> {test.method}
                    </p>
                    <div className="space-y-2.5 text-xs sm:text-sm">
                      <div className="flex items-start gap-2 text-emerald-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                        <FaCheckCircle className="text-emerald-600 text-base shrink-0 mt-0.5" />
                        <div>
                          <strong>Genuine Stone:</strong> {test.genuine}
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-rose-800 bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                        <FaTimesCircle className="text-rose-600 text-base shrink-0 mt-0.5" />
                        <div>
                          <strong>Fake / Glass:</strong> {test.fake}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDE-BY-SIDE COMPARISON TABLE */}
          <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Comparison: Natural Jaipur Gemstones vs Synthetic Replicas
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Quick reference comparison before purchasing sacred deities and Shivlings online.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    <th className="p-3.5 sm:p-4 font-bold text-gray-900">Parameter</th>
                    <th className="p-3.5 sm:p-4 font-bold text-emerald-700">Genuine Jaipur Gemstone</th>
                    <th className="p-3.5 sm:p-4 font-bold text-rose-700">Synthetic Glass / Resin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {comparisonRows.map((row, index) => (
                    <tr key={index} className="hover:bg-stone-50/60 transition">
                      <td className="p-3.5 sm:p-4 font-bold text-gray-800 whitespace-nowrap">
                        {row.feature}
                      </td>
                      <td className="p-3.5 sm:p-4 text-emerald-900 bg-emerald-50/30">
                        {row.genuine}
                      </td>
                      <td className="p-3.5 sm:p-4 text-rose-900 bg-rose-50/30">
                        {row.fake}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PRAN PRATISHTHA & CARE GUIDE */}
          <div className="mt-12 bg-amber-50/70 rounded-3xl p-6 sm:p-10 border border-amber-200/80 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-950 flex items-center gap-2">
              <span>🕉️ Sacred Care &amp; Pran Pratishtha Recommendations</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              According to the ancient Vedic <em>Shilpa Shastras</em>, genuine gemstone Shivlings and idols absorb and emit pure cosmic frequencies. Here is how to consecrate and care for them:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-1">
                <h3 className="font-bold text-sm text-gray-900">1. Jalabhishekam Cleansing</h3>
                <p className="text-xs text-gray-600">
                  Cleanse the idol with pure Ganga Jal, raw cow milk, and honey on auspicious days like Mondays or Pradosh.
                </p>
              </div>
              <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-1">
                <h3 className="font-bold text-sm text-gray-900">2. Vedic Direction</h3>
                <p className="text-xs text-gray-600">
                  Place Shivling in the North or East quadrant of your home altar with the Jaladhari (water outlet) facing North.
                </p>
              </div>
              <div className="bg-white/90 p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-1">
                <h3 className="font-bold text-sm text-gray-900">3. Gentle Drying</h3>
                <p className="text-xs text-gray-600">
                  Wipe with a soft cotton muslin cloth after daily Puja. Avoid harsh chemical detergents or abrasive brushes.
                </p>
              </div>
            </div>
          </div>

          {/* FREQUENTLY ASKED QUESTIONS */}
          <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Frequently Asked Questions About Gemstone Authenticity
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Clear answers from our master artisans to help you make an informed decision.
              </p>
            </div>

            <div className="space-y-3">
              {guideFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-stone-200 rounded-2xl overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown
                      className={`text-gray-400 text-xs shrink-0 transition-transform duration-200 ml-3 ${
                        openFaq === index ? "rotate-180 text-indigo-600" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-stone-100 pt-3 bg-stone-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CALL TO ACTION BANNER */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-indigo-900 text-white text-center space-y-4 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Explore 100% Authentic Hand-Carved Gemstones
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl mx-auto leading-relaxed">
              Every idol is direct from our Jaipur factory, hand-carved from natural rough stone, and shipped with 100% transit insurance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                to="/shop"
                className="px-6 py-3 rounded-xl bg-white text-indigo-900 font-bold text-sm hover:bg-indigo-50 transition shadow-sm"
              >
                Browse All Products
              </Link>
              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20have%20a%20question%20about%20gemstone%20authenticity."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition shadow-sm"
              >
                <FaWhatsapp className="text-base" />
                <span>Talk to Artisan on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default GemstoneAuthenticityGuide;
