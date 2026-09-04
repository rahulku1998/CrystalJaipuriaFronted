import React from "react";
import SEO from "../../Components/SEO";
import { FaTruck, FaShieldAlt, FaPlane, FaBoxOpen, FaClock, FaPhoneAlt } from "react-icons/fa";

const ShippingPolicy = () => {
  return (
    <>
      <SEO
        title="Shipping Policy | Free Delivery & Safe Transit | Crystal Jaipuria"
        description="Learn about Crystal Jaipuria's domestic and international shipping policy. 100% insured, shockproof multi-layer packaging, dispatched directly from Jaipur, Rajasthan."
        canonicalUrl="https://www.crystaljaipuria.com/shipping-policy"
      />

      <div className="bg-stone-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200 mb-8 text-center space-y-3">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              <FaTruck />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shipping &amp; Delivery Policy
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              At Crystal Jaipuria, every sacred gemstone and crystal idol is packed with extreme devotional care and 100% transit insurance from our Jaipur workshop.
            </p>
          </div>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1">
              <span className="text-xl text-emerald-600 block">🚚</span>
              <h3 className="font-bold text-sm text-gray-800">Free Domestic Shipping</h3>
              <p className="text-xs text-gray-500">₹0 Delivery charge across all India pincodes.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1">
              <span className="text-xl text-indigo-600 block">⏱️</span>
              <h3 className="font-bold text-sm text-gray-800">3 to 7 Days Delivery</h3>
              <p className="text-xs text-gray-500">Dispatched within 24-48 hours via premium couriers.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1">
              <span className="text-xl text-amber-600 block">🛡️</span>
              <h3 className="font-bold text-sm text-gray-800">100% Transit Insurance</h3>
              <p className="text-xs text-gray-500">Full replacement guarantee if damaged during transit.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200 space-y-8 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <span>1. Domestic Shipping &amp; Coverage (India)</span>
              </h2>
              <p>
                We provide <strong>100% Free Standard Delivery</strong> on all orders across all serviceable pincodes in India (including metros, tier-2, tier-3 cities, and rural locations).
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li><strong>Order Processing Time:</strong> 1 to 2 business days (for quality inspection and cleansing).</li>
                <li><strong>Transit &amp; Delivery Time:</strong> 3 to 7 business days depending on customer location.</li>
                <li><strong>Trusted Courier Partners:</strong> BlueDart, Delhivery, DTDC, and India Post Speed Post.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <span>2. Multi-Layer Shockproof Packaging</span>
              </h2>
              <p>
                Because natural gemstones and Sphatik crystals require delicate handling, our master dispatch team uses a 5-layer protective packing protocol:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Layer 1: Soft velvet pouch / sacred red cloth wrapping.</li>
                <li>Layer 2: Multi-layer high-density air bubble wrap.</li>
                <li>Layer 3: Custom-fitted thermocol / high-density foam casing.</li>
                <li>Layer 4: Heavy-duty 5-ply corrugated master shipping box.</li>
                <li>Layer 5: Tamper-evident waterproof stretch sealing.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <span>3. Worldwide International Export</span>
              </h2>
              <p>
                We proudly export certified gemstone idols worldwide, including the USA, Canada, United Kingdom, Australia, Singapore, and UAE via <strong>DHL Express</strong> and <strong>FedEx International</strong>. International transit time is typically 5 to 10 business days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <span>4. Tracking Your Order</span>
              </h2>
              <p>
                As soon as your shipment is dispatched from our Jaipur warehouse, tracking details with a direct live tracking link are sent to your provided WhatsApp number and Email.
              </p>
            </section>

            {/* Contact Box */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <strong className="text-gray-900 block text-sm">Need Help With Your Shipment?</strong>
                <span className="text-gray-500">Contact our dispatch desk directly in Jaipur.</span>
              </div>
              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20have%20a%20shipping%20query."
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition"
              >
                Chat on WhatsApp (+91 8306317032)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
