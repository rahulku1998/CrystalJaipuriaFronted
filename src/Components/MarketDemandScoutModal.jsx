import React, { useState } from "react";
import {
  FaTimes,
  FaCheck,
  FaCopy,
  FaRocket,
  FaWhatsapp,
  FaVideo,
  FaShieldAlt,
  FaCoins,
  FaChartLine,
  FaUserCheck,
  FaExternalLinkAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MarketDemandScoutModal = ({
  isOpen,
  onClose,
  opportunity
}) => {
  const navigate = useNavigate();
  const [copiedSection, setCopiedSection] = useState("");

  if (!isOpen || !opportunity) return null;

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(""), 2000);
  };

  const handleLaunchProduct = () => {
    onClose();
    navigate("/admin-vijay/add-product", {
      state: { prefill: opportunity.prefillData }
    });
  };

  const p = opportunity.pricing || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-stone-900 via-indigo-950 to-slate-900 text-white border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-black text-sm shadow-inner">
              {opportunity.opportunityScore}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950">
                  {opportunity.badge || "High Opportunity"}
                </span>
                <span className="text-xs text-gray-300">
                  Category: {opportunity.categoryName}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {opportunity.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Financial Sweet-Spot Pricing Breakdown */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 border border-emerald-200 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
                <FaCoins />
              </span>
              <h3 className="font-bold text-gray-900 text-sm">
                Sweet-Spot Pricing &amp; Margin Calculator
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Jaipur Mfg Cost
                </span>
                <span className="text-sm sm:text-base font-bold text-gray-700 mt-1 block">
                  {p.mfgCost}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200">
                <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider block">
                  Amazon / Retail Price
                </span>
                <span className="text-sm sm:text-base font-bold text-red-600 line-through mt-1 block">
                  {p.competitorPrice}
                </span>
              </div>
              <div className="bg-emerald-600 text-white p-3 rounded-xl shadow-xs">
                <span className="text-[10px] font-extrabold uppercase tracking-wider block text-emerald-100">
                  🎯 Recommended Selling Price
                </span>
                <span className="text-base sm:text-lg font-black mt-1 block">
                  {p.sweetSpotPrice}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Net Profit Margin
                </span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-600 mt-1 block">
                  {p.profitMargin}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Demand Proof & Search Engine Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs">
                <FaChartLine />
                <span>Search Volume &amp; Demand Surge Proof</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-lg font-black text-gray-900">
                  {opportunity.searchVolume}
                </div>
                <span className="text-xs font-bold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                  {opportunity.growthRate}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {opportunity.proofEvidence}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
                <FaUserCheck />
                <span>Target Buyer Persona &amp; Intent</span>
              </div>
              <div className="text-xs font-bold text-gray-800">
                {opportunity.targetAudience}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Primary Buying Trigger:</strong> {opportunity.intent}
              </p>
            </div>
          </div>

          {/* Section 3: Competitor Poaching Moat */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider">
              <FaShieldAlt className="text-indigo-600" />
              <span>Competitor Poaching Moat (How Crystal Jaipuria Wins)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-red-50/70 border border-red-200 p-3 rounded-xl text-red-950">
                <strong className="text-red-700 block mb-1">❌ Competitor Flaw:</strong>
                <span>{opportunity.competitorFlaw}</span>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl text-emerald-950">
                <strong className="text-emerald-700 block mb-1">✔ Your Jaipur Advantage:</strong>
                <span>{opportunity.jaipurAdvantage}</span>
              </div>
            </div>
          </div>

          {/* Section 4: 1-Click WhatsApp High-Converting Sales Pitch */}
          {opportunity.whatsAppPitch && (
            <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                  <FaWhatsapp className="text-base text-emerald-600" />
                  <span>1-Click High-Converting WhatsApp Sales Pitch</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(opportunity.whatsAppPitch, "whatsapp")}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === "whatsapp" ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <FaCheck /> Copied to Clipboard!
                    </span>
                  ) : (
                    <>
                      <FaCopy /> Copy Pitch
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs text-gray-700 font-sans whitespace-pre-wrap bg-emerald-50/40 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                {opportunity.whatsAppPitch}
              </pre>
            </div>
          )}

          {/* Section 5: 15-Second Viral Instagram Reel Script */}
          {opportunity.reelScript && (
            <div className="bg-white border border-purple-200 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                  <FaVideo className="text-base text-purple-600" />
                  <span>15-Second Viral Instagram Reel / Shorts Script</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `HOOK (0-3 sec):\n${opportunity.reelScript.hook}\n\nBODY (4-10 sec):\n${opportunity.reelScript.body}\n\nCTA (11-15 sec):\n${opportunity.reelScript.cta}`,
                      "reel"
                    )
                  }
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === "reel" ? (
                    <span className="text-purple-600 font-bold flex items-center gap-1">
                      <FaCheck /> Copied Script!
                    </span>
                  ) : (
                    <>
                      <FaCopy /> Copy Script
                    </>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                  <strong className="text-purple-800 block mb-1">0–3s Hook:</strong>
                  <span className="text-gray-700">{opportunity.reelScript.hook}</span>
                </div>
                <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                  <strong className="text-purple-800 block mb-1">4–10s Demonstration:</strong>
                  <span className="text-gray-700">{opportunity.reelScript.body}</span>
                </div>
                <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                  <strong className="text-purple-800 block mb-1">11–15s Call to Action:</strong>
                  <span className="text-gray-700">{opportunity.reelScript.cta}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with 1-Click Launch Button */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 cursor-pointer"
          >
            Close
          </button>
          
          <button
            type="button"
            onClick={handleLaunchProduct}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <FaRocket />
            <span>🚀 Launch This Product (Auto-Prefill into Add Product)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketDemandScoutModal;
