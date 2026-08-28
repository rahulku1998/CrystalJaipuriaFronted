import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    question: "1. Where can I buy wholesale gemstone statues from India?",
    answer: (
      <>
        Crystal Jaipuria is a Jaipur-based{" "}
        <strong className="font-semibold text-stone-900">
          gemstone statues manufacturer, wholesaler, and supplier in India
        </strong>
        , offering handcrafted gemstone idols, crystal carvings, deity statues,
        figurines, and decorative sculptures for bulk and wholesale buyers. We
        supply customers in India and international markets.
      </>
    ),
    rawAnswer:
      "Crystal Jaipuria is a Jaipur-based gemstone statues manufacturer, wholesaler, and supplier in India, offering handcrafted gemstone idols, crystal carvings, deity statues, figurines, and decorative sculptures for bulk and wholesale buyers. We supply customers in India and international markets.",
  },
  {
    id: 2,
    question: "2. Are you a gemstone statues manufacturer or supplier in Jaipur?",
    answer: (
      <>
        Yes. Crystal Jaipuria is a{" "}
        <strong className="font-semibold text-stone-900">
          Jaipur, India-based gemstone statues manufacturer, wholesaler, and supplier
        </strong>
        . Our products are handcrafted using natural gemstones and semi-precious
        stones, with wholesale and bulk sourcing options available for
        retailers, spiritual stores, collectors, and exporters.
      </>
    ),
    rawAnswer:
      "Yes. Crystal Jaipuria is a Jaipur, India-based gemstone statues manufacturer, wholesaler, and supplier. Our products are handcrafted using natural gemstones and semi-precious stones, with wholesale and bulk sourcing options available for retailers, spiritual stores, collectors, and exporters.",
  },
  {
    id: 3,
    question: "3. Do you supply wholesale crystal carvings and statues internationally?",
    answer: (
      <>
        Yes. We supply{" "}
        <strong className="font-semibold text-stone-900">
          wholesale crystal carvings and gemstone statues to international buyers
        </strong>
        , including retailers, importers, distributors, spiritual stores, and
        collectors. We serve markets such as the USA, UK, Europe, Australia,
        UAE, and other countries, subject to shipping and export requirements.
      </>
    ),
    rawAnswer:
      "Yes. We supply wholesale crystal carvings and gemstone statues to international buyers, including retailers, importers, distributors, spiritual stores, and collectors. We serve markets such as the USA, UK, Europe, Australia, UAE, and other countries, subject to shipping and export requirements.",
  },
  {
    id: 4,
    question: "4. What types of gemstone and crystal statues do you offer?",
    answer: (
      <>
        Our range includes{" "}
        <strong className="font-semibold text-stone-900">
          gemstone god idols, crystal statues, deity carvings, Buddha statues,
          Ganesha idols, Shiva statues, Lakshmi idols, Shivlings, animal
          figurines, decorative carvings, and custom gemstone sculptures
        </strong>
        . Availability depends on the gemstone, design, size, and current
        collection.
      </>
    ),
    rawAnswer:
      "Our range includes gemstone god idols, crystal statues, deity carvings, Buddha statues, Ganesha idols, Shiva statues, Lakshmi idols, Shivlings, animal figurines, decorative carvings, and custom gemstone sculptures. Availability depends on the gemstone, design, size, and current collection.",
  },
  {
    id: 5,
    question: "5. Which gemstones are commonly used for your statues and carvings?",
    answer: (
      <>
        We work with a range of{" "}
        <strong className="font-semibold text-stone-900">
          natural gemstones and semi-precious stones
        </strong>
        , including rose quartz, amethyst, jade, quartz, aventurine, and other
        suitable materials. The available stone depends on the design, size,
        finish, and buyer requirements.
      </>
    ),
    rawAnswer:
      "We work with a range of natural gemstones and semi-precious stones, including rose quartz, amethyst, jade, quartz, aventurine, and other suitable materials. The available stone depends on the design, size, finish, and buyer requirements.",
  },
  {
    id: 6,
    question: "6. Can I order gemstone god idols and murtis in bulk?",
    answer: (
      <>
        Yes. We support{" "}
        <strong className="font-semibold text-stone-900">
          bulk and wholesale orders for gemstone god idols and murtis
        </strong>
        , including Ganesha, Shiva, Lakshmi, Krishna, Buddha, and other
        spiritual designs. Wholesale buyers can discuss required quantities,
        gemstone preferences, sizes, and product specifications with our team.
      </>
    ),
    rawAnswer:
      "Yes. We support bulk and wholesale orders for gemstone god idols and murtis, including Ganesha, Shiva, Lakshmi, Krishna, Buddha, and other spiritual designs. Wholesale buyers can discuss required quantities, gemstone preferences, sizes, and product specifications with our team.",
  },
  {
    id: 7,
    question: "7. Do you offer custom gemstone carvings or statues?",
    answer: (
      <>
        Yes. We can discuss{" "}
        <strong className="font-semibold text-stone-900">
          custom gemstone carvings and statues
        </strong>{" "}
        based on requirements such as deity, animal, figurine, design, gemstone,
        dimensions, and finishing details. Custom production is subject to
        design feasibility, material availability, and order quantity.
      </>
    ),
    rawAnswer:
      "Yes. We can discuss custom gemstone carvings and statues based on requirements such as deity, animal, figurine, design, gemstone, dimensions, and finishing details. Custom production is subject to design feasibility, material availability, and order quantity.",
  },
  {
    id: 8,
    question: "8. Do you supply gemstone statues for retailers and spiritual stores?",
    answer: (
      <>
        Yes. Our{" "}
        <strong className="font-semibold text-stone-900">
          wholesale gemstone statues and crystal carvings
        </strong>{" "}
        are suitable for retailers, crystal shops, spiritual stores, gift
        businesses, home décor businesses, interior designers, and collectors.
        Buyers can source multiple designs and gemstone categories for their
        product collections.
      </>
    ),
    rawAnswer:
      "Yes. Our wholesale gemstone statues and crystal carvings are suitable for retailers, crystal shops, spiritual stores, gift businesses, home décor businesses, interior designers, and collectors. Buyers can source multiple designs and gemstone categories for their product collections.",
  },
  {
    id: 9,
    question: "9. Why source gemstone statues from Jaipur, India?",
    answer: (
      <>
        Jaipur is widely known for its gemstone and handicraft ecosystem,
        making it an important sourcing destination for{" "}
        <strong className="font-semibold text-stone-900">
          gemstone carvings, statues, idols, and semi-precious stone products
        </strong>
        . Working with a Jaipur-based supplier can provide access to skilled
        craftsmanship, gemstone sourcing, and a wide variety of handcrafted
        designs.
      </>
    ),
    rawAnswer:
      "Jaipur is widely known for its gemstone and handicraft ecosystem, making it an important sourcing destination for gemstone carvings, statues, idols, and semi-precious stone products. Working with a Jaipur-based supplier can provide access to skilled craftsmanship, gemstone sourcing, and a wide variety of handcrafted designs.",
  },
  {
    id: 10,
    question: "10. Do you export gemstone statues and crystal carvings from India?",
    answer: (
      <>
        Yes. Crystal Jaipuria supplies{" "}
        <strong className="font-semibold text-stone-900">
          gemstone statues and crystal carvings for international wholesale and
          export requirements
        </strong>
        . Buyers outside India can contact us for product availability,
        quantities, specifications, packaging, and shipping-related information
        for their market.
      </>
    ),
    rawAnswer:
      "Yes. Crystal Jaipuria supplies gemstone statues and crystal carvings for international wholesale and export requirements. Buyers outside India can contact us for product availability, quantities, specifications, packaging, and shipping-related information for their market.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Google FAQ Schema JSON-LD for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.rawAnswer,
      },
    })),
  };

  // Split into 2 columns for clean desktop view (5 items in left column, 5 in right)
  const midPoint = Math.ceil(faqData.length / 2);
  const leftCol = faqData.slice(0, midPoint);
  const rightCol = faqData.slice(midPoint);

  const renderFAQItem = (item, actualIndex) => {
    const isOpen = openIndex === actualIndex;

    return (
      <div
        key={item.id}
        className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
      >
        <button
          type="button"
          onClick={() => toggleFAQ(actualIndex)}
          className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5 cursor-pointer select-none"
          aria-expanded={isOpen}
        >
          <h3 className="text-sm font-semibold text-stone-800 transition-colors sm:text-base hover:text-indigo-600">
            {item.question}
          </h3>

          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-600 shadow-sm transition-transform duration-300 ${
              isOpen ? "rotate-180 bg-indigo-50 text-indigo-600 border-indigo-200" : ""
            }`}
          >
            <FaChevronDown className="text-xs" />
          </div>
        </button>

        {isOpen && (
          <div className="border-t border-stone-100 bg-stone-50/50 px-4 pb-5 pt-3 sm:px-5">
            <p className="text-sm leading-relaxed text-stone-600 sm:text-[15px]">
              {item.answer}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-12 sm:py-16 lg:py-20 border-t border-stone-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="h-px w-6 bg-indigo-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
              Got Questions?
            </span>
            <span className="h-px w-6 bg-indigo-600" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-stone-600 sm:text-base">
            Everything you need to know about our handcrafted gemstone statues,
            manufacturing process, and wholesale shipping.
          </p>
        </div>

        {/* FAQ Grid: 2 Columns on Desktop, 1 Column on Mobile */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {leftCol.map((item, idx) => renderFAQItem(item, idx))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightCol.map((item, idx) =>
              renderFAQItem(item, idx + midPoint)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
