import React from "react";
import SEO from "../../Components/SEO";
import { FaFileContract, FaGavel, FaGem, FaHandshake } from "react-icons/fa";

const TermsConditions = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions | Crystal Jaipuria Store Guidelines"
        description="Terms and Conditions of Crystal Jaipuria. Understand product warranties, order acceptance, pricing integrity, and Jaipur legal jurisdiction."
        canonicalUrl="https://www.crystaljaipuria.com/terms-and-conditions"
      />

      <div className="bg-stone-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200 mb-8 text-center space-y-3">
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              <FaFileContract />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Please review the terms and conditions governing the purchase of handcrafted gemstone sculptures from Crystal Jaipuria.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200 space-y-8 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                1. General Overview
              </h2>
              <p>
                By accessing this website (https://www.crystaljaipuria.com) and placing an order, you agree to comply with and be bound by the following terms of service. "Crystal Jaipuria", "we", "us", or "our" refers to the owner of the enterprise based in Sanganer, Jaipur, Rajasthan, India.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                2. Authentic Gemstone Representation &amp; Uniqueness
              </h2>
              <p>
                All idols, Shivlings, and spiritual carvings sold on Crystal Jaipuria are hand-carved by master lapidary artisans from 100% natural, earth-mined rough stones. Because natural gemstones are geological specimens formed over millions of years:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Slight variations in natural mineral color, internal striations, and veining are natural proofs of earth-mined authenticity.</li>
                <li>Dimensions and weights are approximate to within standard lapidary industry tolerances (±5%).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                3. Pricing &amp; Order Acceptance
              </h2>
              <p>
                All prices on the website are listed in <strong>Indian Rupees (INR)</strong> and include all applicable GST taxes. We reserve the right to modify prices without prior notice based on gemstone raw material market fluctuations.
              </p>
              <p>
                Order confirmation is issued once delivery information is verified. In the rare event of an out-of-stock item, you will be notified within 24 hours with the option of a full refund or custom carving pre-order.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                4. Intellectual Property Rights
              </h2>
              <p>
                All photographs, descriptions, 2-stage fact-checked articles, and blog content on this website are the proprietary property of Crystal Jaipuria. Unauthorized reproduction or scraping for commercial distribution is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                5. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                Any legal disputes, claims, or proceedings arising from transactions on this website shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in <strong>Jaipur, Rajasthan, India</strong>.
              </p>
            </section>

            {/* Contact Box */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs space-y-2">
              <strong className="text-gray-900 block text-sm">Have Questions Regarding Our Terms?</strong>
              <p className="text-gray-600">
                Feel free to email us at <a href="mailto:crystaljaipurya@gmail.com" className="text-indigo-600 font-bold">crystaljaipurya@gmail.com</a> or call +91 83063 17032.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
