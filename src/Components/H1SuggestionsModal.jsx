import React, { useState, useEffect } from "react";
import {
  FaMagic,
  FaTimes,
  FaCheck,
  FaCopy,
  FaSpinner,
  FaHeading,
  FaLightbulb,
} from "react-icons/fa";
import {
  generateBestH1Options,
  fetchAIBestH1Options,
} from "../utils/aiGenerator";

const H1SuggestionsModal = ({
  isOpen,
  onClose,
  productName = "",
  categoryName = "",
  weight = "",
  size = "",
  price = 0,
  currentHeading = "",
  onSelectH1,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customText, setCustomText] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setCustomText(currentHeading || productName || "");
      loadInitialOptions();
    }
  }, [isOpen, productName, categoryName, weight, size, price, currentHeading]);

  const loadInitialOptions = () => {
    const list = generateBestH1Options({
      name: productName,
      categoryName,
      weight,
      size,
      price,
      originalTitle: productName,
    });
    setOptions(list);
  };

  const handleLiveAiRefresh = async () => {
    if (!productName.trim()) return;
    setLoading(true);
    try {
      const fresh = await fetchAIBestH1Options({
        name: productName,
        categoryName,
        weight,
        size,
        price,
      });
      if (Array.isArray(fresh) && fresh.length > 0) {
        setOptions(fresh);
      }
    } catch (err) {
      console.warn("H1 AI Refresh error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (text) => {
    if (!text?.trim()) return;
    onSelectH1(text.trim());
    onClose();
  };

  const handleCopy = (id, text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
              <FaHeading className="text-amber-300 text-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold">
                  AI Best H1 Heading Options
                </h2>
                <span className="text-[10px] uppercase font-extrabold bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded-full border border-amber-300/30">
                  SEO &amp; CTR
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Top high-converting, deity-accurate &amp; Vastu-optimized headings for your product page
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition cursor-pointer"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Product Context Sub-bar */}
        <div className="bg-purple-50/70 border-b border-purple-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-gray-700 truncate max-w-[480px]">
            <span className="font-semibold text-purple-900">Product:</span>
            <span className="font-mono text-purple-700 truncate font-medium">
              {productName || "Untitled Product"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLiveAiRefresh}
            disabled={loading || !productName.trim()}
            className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 font-bold bg-white px-3 py-1 rounded-lg border border-purple-200 shadow-2xs hover:shadow-xs transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <FaSpinner className="animate-spin text-xs" />
            ) : (
              <FaMagic className="text-xs text-amber-500" />
            )}
            <span>{loading ? "Generating..." : "⚡ Live AI Refresh"}</span>
          </button>
        </div>

        {/* Options List Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3.5 flex-1">
          {options.map((opt) => {
            const isCurrentlyApplied = (currentHeading || productName) === opt.title;
            return (
              <div
                key={opt.id}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  isCurrentlyApplied
                    ? "border-emerald-400 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-300"
                    : "border-slate-200 hover:border-purple-300 bg-white hover:shadow-xs"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${opt.badgeColor}`}
                    >
                      {opt.badge}
                    </span>
                    {isCurrentlyApplied && (
                      <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                        <FaCheck className="text-[9px]" /> Current H1
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {opt.title.length} characters
                  </span>
                </div>

                <p className="text-base font-bold text-gray-900 leading-snug">
                  {opt.title}
                </p>

                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {opt.rationale}
                </p>

                <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleCopy(opt.id, opt.title)}
                    className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                    title="Copy text"
                  >
                    <FaCopy className="text-xs" />
                    <span>{copiedId === opt.id ? "Copied!" : "Copy"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCustomText(opt.title);
                      handleApply(opt.title);
                    }}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-xs ${
                      isCurrentlyApplied
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    }`}
                  >
                    <FaCheck className="text-[11px]" />
                    <span>{isCurrentlyApplied ? "Re-Apply This" : "Apply This H1"}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Custom Editable H1 Box */}
          <div className="mt-5 p-4 rounded-2xl border border-dashed border-purple-200 bg-purple-50/30">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
              <FaLightbulb className="text-amber-500" />
              <span>Or refine &amp; apply custom heading:</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type or tweak your custom H1 heading..."
                className="flex-1 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400 font-medium"
              />
              <button
                type="button"
                onClick={() => handleApply(customText)}
                disabled={!customText.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs whitespace-nowrap"
              >
                Apply Custom H1
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0 text-xs">
          <span className="text-gray-500">
            Clicking <strong>Apply</strong> sets the H1 field in the product form immediately.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default H1SuggestionsModal;
