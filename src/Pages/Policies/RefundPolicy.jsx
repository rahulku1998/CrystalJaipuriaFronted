import React from "react";
import SEO from "../../Components/SEO";
import { FaUndoAlt, FaShieldAlt, FaCheckCircle, FaMoneyCheckAlt, FaWhatsapp } from "react-icons/fa";

const RefundPolicy = () => {
  return (
    <>
      <SEO
        title="Refund and Return Policy | 7 Days Easy Replacement | Crystal Jaipuria"
        description="Crystal Jaipuria's 7-day hassle-free return and replacement policy. 100% money-back or replacement guarantee on transit damages or authentic gemstone discrepancies."
        canonicalUrl="https://www.crystaljaipuria.com/refund-policy"
      />

      <div className="bg-stone-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200 mb-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              <FaUndoAlt />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Return, Replacement &amp; Refund Policy
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Our 100% Devotee Satisfaction Guarantee: If your idol is damaged in transit or does not meet our authenticity standards, we replace or refund it immediately.
            </p>
          </div>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1">
              <span className="text-xl text-emerald-600 block">🔄</span>
              <h3 className="font-bold text-sm text-gray-800">7 Days Return Window</h3>
              <p className="text-xs text-gray-500">Request replacement within 7 days of package delivery.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1">
              <span className="text-xl text-indigo-600 block">📦</span>
              <h3 className="font-bold text-sm text-gray-800">Zero Cost Replacement</h3>
              <p className="text-xs text-gray-500">Free return pickup and re-shipment if damaged in transit.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center space-y-1">
              <span className="text-xl text-amber-600 block">⚡</span>
              <h3 className="font-bold text-sm text-gray-800">5-7 Days Fast Refund</h3>
              <p className="text-xs text-gray-500">Refund credited directly to original payment or UPI.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200 space-y-8 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                1. 7-Day Hassle-Free Replacement Policy
              </h2>
              <p>
                We stand behind the craftsmanship and purity of every natural gemstone artifact carved in our Jaipur atelier. You are eligible for a complete replacement or full refund within <strong>7 calendar days</strong> from the delivery date if:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>The item arrived physically damaged or chipped during transit.</li>
                <li>The item received is different from what was ordered (incorrect size, category, or gemstone).</li>
                <li>The product has a certified material defect.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                2. How to Request a Return or Replacement
              </h2>
              <p>
                To process your request quickly, please follow these 3 simple steps:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                <li>Take 2-3 clear photographs or a short video showing the delivered parcel and any transit damage.</li>
                <li>Send the photos along with your Order ID to our WhatsApp support at <strong>+91 83063 17032</strong> or email <strong>crystaljaipurya@gmail.com</strong>.</li>
                <li>Our Jaipur dispatch team will approve your claim within 24 hours and arrange a free return pickup.</li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                3. Return Shipping &amp; Reverse Pickup
              </h2>
              <p>
                For verified transit damages or incorrect items, <strong>Crystal Jaipuria covers 100% of the return shipping costs</strong>. A reverse courier pickup will be scheduled from your doorstep at zero cost to you.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                4. Refund Processing &amp; Timeline
              </h2>
              <p>
                If you choose a monetary refund instead of a replacement:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li><strong>Prepaid / UPI / Card Orders:</strong> The full amount will be credited back to your original payment method or bank account within <strong>5 to 7 business days</strong>.</li>
                <li><strong>Cash on Delivery (COD) Orders:</strong> The refund will be transferred directly to your bank account via IMPS/NEFT or your designated UPI ID (Google Pay, PhonePe, Paytm).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                5. Natural Gemstone Characteristics
              </h2>
              <p className="text-gray-600 text-xs">
                Please note that 100% genuine earth-mined gemstones (such as natural Quartz, Sphatik, Ruby, Green Jade, or Lapis Lazuli) naturally possess internal inclusions, mineral veining, and micro-crystallization. These natural inclusions are scientific proof of earth-mined authenticity and are not considered manufacturing defects.
              </p>
            </section>

            {/* Support Desk */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <strong className="text-gray-900 block text-sm">Need a Replacement or Refund?</strong>
                <span className="text-gray-500">Our customer team responds within 2 hours.</span>
              </div>
              <a
                href="https://wa.me/918306317032?text=Hello%20Crystal%20Jaipuria,%20I%20want%20to%20request%20a%20replacement/refund."
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition"
              >
                Start Return on WhatsApp (+91 8306317032)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
