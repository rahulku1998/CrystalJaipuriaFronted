import React from "react";
import SEO from "../../Components/SEO";
import { FaUserShield, FaLock, FaDatabase, FaCookieBite } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | Secure Data Protection | Crystal Jaipuria"
        description="Crystal Jaipuria's privacy policy. We protect your personal information, delivery addresses, and payment details with bank-grade 256-bit SSL encryption."
        canonicalUrl="https://www.crystaljaipuria.com/privacy-policy"
      />

      <div className="bg-stone-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200 mb-8 text-center space-y-3">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center mx-auto text-2xl">
              <FaUserShield />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Your trust is our utmost priority. Learn how Crystal Jaipuria collects, protects, and handles your personal information.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-stone-200 space-y-8 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                1. Information We Collect
              </h2>
              <p>
                When you visit, browse, or place an order on <strong>Crystal Jaipuria</strong> (https://www.crystaljaipuria.com), we only collect information essential for fulfilling your delivery and providing customer support:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li><strong>Order &amp; Contact Details:</strong> Your name, phone/WhatsApp number, delivery address, city, state, and pincode.</li>
                <li><strong>Communication Records:</strong> WhatsApp or email inquiries regarding custom gemstone carvings and consecrated puja items.</li>
                <li><strong>Device &amp; Analytics Data:</strong> IP address, browser type, and anonymous browsing sessions to improve website loading speeds.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                2. How We Use Your Information
              </h2>
              <p>
                We use your details strictly for:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Packing and dispatching your orders with our courier partners (BlueDart, Delhivery, DTDC, DHL).</li>
                <li>Providing instant order status updates and tracking numbers via WhatsApp or SMS.</li>
                <li>Issuing tax invoices and GST receipts for certified gemstone purchases.</li>
              </ul>
              <p className="font-semibold text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                🔒 We NEVER sell, rent, or trade your personal information to any third-party advertisers or telemarketers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                3. Payment Security &amp; Encryption
              </h2>
              <p>
                All online transactions and customer data transfers are encrypted with <strong>256-bit Secure Socket Layer (SSL) encryption</strong>. Crystal Jaipuria does not store your credit card numbers, debit card PINs, or net banking passwords on our servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                4. Cookies &amp; Tracking Technologies
              </h2>
              <p>
                We use standard cookies to remember your browsing preferences and analyze website traffic. You can choose to disable cookies through your browser settings at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                5. Contacting Our Data Privacy Officer
              </h2>
              <p>
                For questions regarding your personal information or to request deletion of your account records:
              </p>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-1">
                <p><strong>Crystal Jaipuria</strong></p>
                <p>Bajni Talai, Plot No. 03 West Part, Prabha, Mangal Vihar, Sanganer, Jaipur, Rajasthan - 302029</p>
                <p>Email: <a href="mailto:crystaljaipurya@gmail.com" className="text-indigo-600 font-semibold">crystaljaipurya@gmail.com</a></p>
                <p>Phone: +91 83063 17032</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
