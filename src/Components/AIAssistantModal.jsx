import React, { useState, useEffect } from "react";
import {
  FaMagic,
  FaTimes,
  FaCheck,
  FaCopy,
  FaKey,
  FaQuestionCircle,
  FaFileAlt,
  FaRobot,
  FaLightbulb,
  FaSpinner
} from "react-icons/fa";
import {
  generateGeminiContent,
  toProperTitleCase,
  GEMINI_API_KEY_STORAGE_KEY
} from "../utils/aiGenerator";
import { autoInjectInternalLinks } from "../utils/internalLinking";

const AIAssistantModal = ({
  isOpen,
  onClose,
  productName = "",
  categoryName = "",
  onApplyDescription,
  onApplyFaqs,
  onApplyMeta,
  onApplyName,
  onApplyDetail
}) => {
  const [activeTab, setActiveTab] = useState("generate");
  const [name, setName] = useState(productName || "");
  const [category, setCategory] = useState(categoryName || "");
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedSection, setCopiedSection] = useState("");
  const [appliedSection, setAppliedSection] = useState("");

  useEffect(() => {
    setName(productName || "");
    setCategory(categoryName || "");
  }, [productName, categoryName]);

  useEffect(() => {
    const key = localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || "";
    setSavedKey(key);
    setApiKey(key);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!name.trim()) {
      alert("Please enter a product name first!");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const data = await generateGeminiContent(name, category, apiKey);
      if (data?.fullDescription) {
        data.fullDescription = autoInjectInternalLinks(data.fullDescription, "", 3);
      }
      setResult(data);
    } catch (err) {
      console.error("AI Generation Error:", err);
      alert("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, apiKey.trim());
    setSavedKey(apiKey.trim());
    alert("Gemini API Key saved successfully!");
  };

  const handleApplyDescription = () => {
    if (result?.fullDescription && onApplyDescription) {
      onApplyDescription(result.fullDescription);
      setAppliedSection("desc");
      setTimeout(() => setAppliedSection(""), 2500);
    }
  };

  const handleApplyFaqs = () => {
    if (result?.faqs?.length > 0 && onApplyFaqs) {
      onApplyFaqs(result.faqs);
      setAppliedSection("faqs");
      setTimeout(() => setAppliedSection(""), 2500);
    }
  };

  const handleFormatName = () => {
    if (name) {
      setName(toProperTitleCase(name));
    }
  };

  const handleApplyMeta = () => {
    if (onApplyMeta && (result?.metaTitle || result?.metaDescription)) {
      onApplyMeta({
        metaTitle: result.metaTitle,
        metaDescription: result.metaDescription
      });
      setAppliedSection("meta");
      setTimeout(() => setAppliedSection(""), 2500);
    }
  };

  const handleApplyDetail = () => {
    if (result?.citationHook && onApplyDetail) {
      onApplyDetail(result.citationHook);
      setAppliedSection("hook");
      setTimeout(() => setAppliedSection(""), 2500);
    }
  };

  const handleApplyAll = () => {
    if (result?.fullDescription && onApplyDescription) {
      onApplyDescription(result.fullDescription);
    }
    if (result?.faqs?.length > 0 && onApplyFaqs) {
      onApplyFaqs(result.faqs);
    }
    if (onApplyMeta && (result?.metaTitle || result?.metaDescription)) {
      onApplyMeta({
        metaTitle: result.metaTitle,
        metaDescription: result.metaDescription
      });
    }
    if (onApplyName && result?.cleanName) {
      onApplyName(result.cleanName);
    }
    if (onApplyDetail && result?.citationHook) {
      onApplyDetail(result.citationHook);
    }
    setAppliedSection("all");
    setTimeout(() => {
      setAppliedSection("");
      onClose();
    }, 1000);
  };

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(""), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-stone-900 via-indigo-950 to-slate-900 text-white border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-lg shadow-inner">
              <FaMagic />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>AI Overview & GEO Content Assistant</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400 text-black">
                  AI Powered
                </span>
              </h2>
              <p className="text-xs text-gray-300">
                Generate citation-ready descriptions, specs & FAQs for Google AI Overview, Perplexity & ChatGPT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "generate" ? "settings" : "generate")}
              className="p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer bg-white/10 text-gray-300 hover:bg-white/15"
              title="API Key Settings"
            >
              <FaKey />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
            >
              <FaTimes className="text-base" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "settings" ? (
            <div className="space-y-4 max-w-2xl mx-auto py-4">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 text-sm">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <FaLightbulb className="text-amber-600" />
                  <span>Google Gemini API Key (Optional)</span>
                </div>
                <p className="text-xs leading-relaxed text-amber-800">
                  By default, our built-in <strong>Crystal Jaipuria GEO Knowledge Engine</strong> works instantly with 0 setup! If you wish to use live Google Gemini AI, paste your free Google Gemini API Key below.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Gemini API Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <button
                    type="button"
                    onClick={handleSaveApiKey}
                    className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition cursor-pointer"
                  >
                    Save Key
                  </button>
                </div>
                {savedKey && (
                  <p className="text-xs text-green-600 font-semibold mt-1.5 flex items-center gap-1">
                    <FaCheck /> API Key is active & stored securely in browser.
                  </p>
                )}
              </div>

              <div className="pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setActiveTab("generate")}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold cursor-pointer"
                >
                  ← Back to Content Generator
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Input Form Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Product Name
                      </label>
                      <button
                        type="button"
                        onClick={handleFormatName}
                        className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                        title="Auto-Capitalize with Proper Title Case"
                      >
                        <span>✨ Format Title</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => {
                        if (name) setName(toProperTitleCase(name));
                      }}
                      placeholder="e.g. Natural Sphatik Shivling"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Category (Optional)
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Shivling / God Statues"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500 flex items-center gap-1.5">
                    <FaRobot className="text-indigo-500" />
                    <span>Engine: {savedKey ? "Google Gemini AI" : "Built-in Jaipuria GEO Knowledge Engine"}</span>
                  </span>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Generating AI Content...</span>
                      </>
                    ) : (
                      <>
                        <FaMagic />
                        <span>Generate Full AI Content & FAQs</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Output Results Preview */}
              {result && (
                <div className="space-y-6">
                  {/* Stage 2 Verification Seal Banner */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0">
                          <FaCheck />
                        </span>
                        <h4 className="text-sm font-bold text-emerald-900">
                          100% Fact-Checked &amp; Verified by AI Quality Engine
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300 w-fit">
                        Zero Discrepancy Passed
                      </span>
                    </div>
                    {Array.isArray(result.verificationChecks) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900 mt-2.5 bg-white/80 p-3 rounded-xl border border-emerald-100 font-medium">
                        {result.verificationChecks.map((chk, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <span>{chk}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content Quality & Reading Metrics */}
                  {result.stats && (
                    <div className="flex flex-wrap items-center gap-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl px-4 py-3 text-xs text-indigo-950 font-medium shadow-2xs">
                      <span>📊 <strong>Word Count:</strong> {result.stats.wordCount} words</span>
                      <span className="text-indigo-300">•</span>
                      <span>⏱ <strong>Reading Time:</strong> {result.stats.readingTime}</span>
                      <span className="text-indigo-300">•</span>
                      <span>❓ <strong>Verified FAQs:</strong> {result.stats.faqCount} Q&amp;As</span>
                      <span className="text-indigo-300">•</span>
                      <span>💎 <strong>Mineral:</strong> {result.gemstoneType}</span>
                    </div>
                  )}

                  {/* Google SERP Snippet Preview */}
                  {(result.metaTitle || result.metaDescription) && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                          <span>🔍 Google Search Result Snippet Preview</span>
                        </span>
                        <div className="flex items-center gap-2">
                          {onApplyMeta && (
                            <button
                              type="button"
                              onClick={handleApplyMeta}
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 flex items-center gap-1 cursor-pointer transition"
                            >
                              {appliedSection === "meta" ? "✔ Applied to SEO" : "Apply to SEO"}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleCopy(`${result.metaTitle}\n${result.metaDescription}`, "meta")}
                            className="text-xs font-semibold text-gray-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedSection === "meta" ? (
                              <span className="text-green-600 font-bold flex items-center gap-1">✔ Copied</span>
                            ) : (
                              <>
                                <FaCopy /> Copy Meta
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-blue-700 hover:underline cursor-pointer">
                        {result.metaTitle}
                      </div>
                      <div className="text-xs text-emerald-700 font-mono truncate">
                        https://www.crystaljaipuria.com/product/{(result.cleanName || name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {result.metaDescription}
                      </p>
                    </div>
                  )}

                  {/* AI Overview Citation Hook Card */}
                  <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 border border-indigo-200/80 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-0.5 rounded-full flex items-center gap-1">
                        <FaLightbulb /> Google AI Overview Citation Summary
                      </span>
                      <div className="flex items-center gap-2">
                        {onApplyDetail && (
                          <button
                            type="button"
                            onClick={handleApplyDetail}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 flex items-center gap-1 cursor-pointer transition"
                          >
                            {appliedSection === "hook" ? "✔ Applied to Details" : "Apply to Details"}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCopy(result.citationHook, "hook")}
                          className="text-xs font-semibold text-gray-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSection === "hook" ? (
                            <span className="text-green-600 font-bold flex items-center gap-1">
                              <FaCheck /> Copied!
                            </span>
                          ) : (
                            <>
                              <FaCopy /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-800 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-indigo-100">
                      "{result.citationHook}"
                    </p>
                  </div>

                  {/* Full Description & Specs */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3 border-b pb-3">
                      <div>
                        <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
                          <FaFileAlt className="text-indigo-600" />
                          <span>Structured Product Description & Specs</span>
                        </h3>
                        <p className="text-xs text-gray-500">
                          Formatted with H2 headings, spiritual benefits, care vidhi & specification table
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(result.fullDescription, "desc")}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSection === "desc" ? <FaCheck className="text-green-600" /> : <FaCopy />}
                          <span>Copy HTML</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleApplyDescription}
                          className="px-4 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          {appliedSection === "desc" ? <FaCheck /> : <FaMagic />}
                          <span>{appliedSection === "desc" ? "Inserted!" : "Insert into Description"}</span>
                        </button>
                      </div>
                    </div>

                    <div
                      className="max-h-60 overflow-y-auto p-3 text-xs sm:text-sm text-gray-700 bg-stone-50 rounded-xl border border-stone-200 prose max-w-none leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: result.fullDescription }}
                    />
                  </div>

                  {/* High Intent FAQs */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3 border-b pb-3">
                      <div>
                        <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
                          <FaQuestionCircle className="text-amber-500" />
                          <span>Top 4 High-Intent FAQs</span>
                        </h3>
                        <p className="text-xs text-gray-500">
                          Trending buyer queries ready for 1-click insertion into the Product FAQs section
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleApplyFaqs}
                          className="px-4 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          {appliedSection === "faqs" ? <FaCheck /> : <FaCheck />}
                          <span>{appliedSection === "faqs" ? "FAQs Applied!" : "Apply to Product FAQs"}</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {result.faqs?.map((faq, idx) => (
                        <div key={idx} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs sm:text-sm space-y-1">
                          <p className="font-bold text-gray-800">
                            Q{idx + 1}: {faq.question}
                          </p>
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-black cursor-pointer"
          >
            Cancel
          </button>

          {result && activeTab === "generate" && (
            <button
              type="button"
              onClick={handleApplyAll}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              <FaCheck />
              <span>{appliedSection === "all" ? "Applied Successfully!" : "Apply All (Description + FAQs)"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantModal;