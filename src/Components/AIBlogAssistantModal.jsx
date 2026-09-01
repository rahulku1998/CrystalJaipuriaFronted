import React, { useState, useEffect } from "react";
import {
  FaMagic,
  FaLightbulb,
  FaFileAlt,
  FaCheck,
  FaCopy,
  FaTimes,
  FaRobot,
  FaCog,
  FaChartLine,
  FaFire,
  FaCalendarAlt,
  FaArrowRight,
  FaSearch
} from "react-icons/fa";
import {
  BLOG_TOPIC_DATABASE,
  SEASONAL_TRENDS,
  generateLiveGeminiBlog,
  generateBuiltInBlog
} from "../utils/blogAiGenerator.js";
import { GEMINI_API_KEY_STORAGE_KEY, toProperTitleCase } from "../utils/aiGenerator.js";

const AIBlogAssistantModal = ({
  isOpen,
  onClose,
  onApplyBlog
}) => {
  const [activeTab, setActiveTab] = useState("strategy"); // 'strategy' | 'writer' | 'settings'
  const [selectedFunnel, setSelectedFunnel] = useState("ALL");
  const [selectedCluster, setSelectedCluster] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [topicTitle, setTopicTitle] = useState("");
  const [topicCluster, setTopicCluster] = useState("shivling");
  
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedSection, setCopiedSection] = useState("");
  const [previewMode, setPreviewMode] = useState("visual"); // 'visual' | 'html'

  useEffect(() => {
    const key = localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || "";
    setSavedKey(key);
    setApiKey(key);
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter topics
  const filteredTopics = BLOG_TOPIC_DATABASE.filter((t) => {
    const matchFunnel = selectedFunnel === "ALL" || t.funnel === selectedFunnel;
    const matchCluster = selectedCluster === "ALL" || t.cluster === selectedCluster;
    const matchSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFunnel && matchCluster && matchSearch;
  });

  const handleSelectTopic = (topic) => {
    setTopicTitle(topic.title);
    setTopicCluster(topic.cluster);
    setActiveTab("writer");
  };

  const handleFormatTitle = () => {
    if (topicTitle) {
      setTopicTitle(toProperTitleCase(topicTitle));
    }
  };

  const handleGenerate = async () => {
    if (!topicTitle.trim()) {
      alert("Please choose or enter a blog topic title first!");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const data = await generateLiveGeminiBlog(topicTitle, topicCluster, apiKey);
      setResult(data);
    } catch (err) {
      console.error("Blog Generation Error:", err);
      alert("Generation encountered an issue. Using verified fallback.");
      const fallback = generateBuiltInBlog(topicTitle, topicCluster);
      setResult(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, apiKey.trim());
    setSavedKey(apiKey.trim());
    alert("Gemini API Key saved successfully!");
  };

  const handleApplyAll = () => {
    if (result && onApplyBlog) {
      onApplyBlog({
        title: result.title,
        description: result.description,
        content: result.content
      });
      onClose();
    }
  };

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(""), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-stone-900 via-indigo-950 to-slate-900 text-white border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 text-lg shadow-inner">
              <FaMagic />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">
                  AI Blog Assistant &amp; Content Strategist
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-stone-900 tracking-wider">
                  1000–1500 Words
                </span>
              </div>
              <p className="text-xs text-gray-300">
                SEO &amp; LLM-friendly pillar blog generator based on Google Trends &amp; Funnel Strategy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "settings" ? "strategy" : "settings")}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FaCog />
              <span>{activeTab === "settings" ? "Close Settings" : "API Key"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-stone-50 px-6 pt-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("strategy")}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "strategy"
                ? "border-indigo-600 text-indigo-700 font-extrabold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FaFire className="text-amber-500" />
            <span>1. Trending Ideas &amp; Strategy</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("writer")}
            className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "writer"
                ? "border-indigo-600 text-indigo-700 font-extrabold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FaFileAlt className="text-indigo-500" />
            <span>2. Write &amp; Generate Article</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "settings" ? (
            /* Settings Tab */
            <div className="max-w-xl mx-auto py-6 space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 text-sm">
                <h4 className="font-bold flex items-center gap-2 mb-2 text-amber-950">
                  <FaLightbulb /> Google Gemini API Key
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  The Blog Assistant uses Google Gemini 1.5 Flash to generate 1000–1500 words deep, competitor-grade articles. The key is shared across Product &amp; Blog generators and stored securely in your browser.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Gemini API Key
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <button
                    type="button"
                    onClick={handleSaveApiKey}
                    className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Save Key
                  </button>
                </div>
                {savedKey && (
                  <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                    <FaCheck /> API Key is active and ready.
                  </p>
                )}
              </div>

              <div className="pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setActiveTab("strategy")}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold cursor-pointer"
                >
                  &larr; Back to Strategy &amp; Topics
                </button>
              </div>
            </div>
          ) : activeTab === "strategy" ? (
            /* TAB 1: TOPIC & KEYWORD STRATEGY FINDER */
            <div className="space-y-6">
              {/* Seasonal Trend Alerts Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-indigo-500/10 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs shadow-xs">
                    <FaCalendarAlt />
                  </span>
                  <h3 className="text-sm font-bold text-gray-900">
                    Google Trends Seasonal Peak Alerts (Publish 30 Days Early!)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                  {SEASONAL_TRENDS.slice(0, 2).map((st, i) => (
                    <div key={i} className="bg-white/90 border border-amber-100 rounded-xl p-3 text-xs shadow-2xs">
                      <div className="font-bold text-orange-950 flex items-center gap-1">
                        {st.alert}
                      </div>
                      <p className="text-gray-600 mt-1">{st.season}</p>
                      <p className="text-stone-700 font-medium mt-1 text-[11px] italic">{st.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                {/* Funnel Stage Filter */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
                    Funnel:
                  </span>
                  {[
                    { key: "ALL", label: "All Stages" },
                    { key: "TOFU", label: "TOFU (Awareness)" },
                    { key: "MOFU", label: "MOFU (Comparison)" },
                    { key: "BOFU", label: "BOFU (Buying Intent)" }
                  ].map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setSelectedFunnel(f.key)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        selectedFunnel === f.key
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Cluster Filter */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
                    Cluster:
                  </span>
                  <select
                    value={selectedCluster}
                    onChange={(e) => setSelectedCluster(e.target.value)}
                    className="bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="ALL">All Topic Clusters</option>
                    <option value="shivling">Sacred Sphatik &amp; Shivling</option>
                    <option value="shree-yantra">3D Meru Shree Yantra</option>
                    <option value="deity-idols">Vastu Deity Idols (Ganesha, Shiva)</option>
                    <option value="healing-crystals">Healing Crystals &amp; Angels</option>
                  </select>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <FaChartLine className="text-indigo-600" />
                    <span>Curated High-Volume Keyword Topics ({filteredTopics.length})</span>
                  </h4>
                  <span className="text-xs text-gray-400">Click any card to load into article writer</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => handleSelectTopic(topic)}
                      className="group bg-white border border-gray-200 hover:border-indigo-400 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                              topic.funnel === "TOFU"
                                ? "bg-indigo-100 text-indigo-700"
                                : topic.funnel === "MOFU"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-emerald-100 text-emerald-800 font-black"
                            }`}
                          >
                            {topic.funnel} • {topic.intent}
                          </span>
                          <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                            {topic.searchVolume}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
                          {topic.title}
                        </h5>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                          {topic.summary}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                        <span className="text-[11px] text-gray-400 font-mono">
                          kw: {topic.primaryKeyword}
                        </span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Write Article <FaArrowRight className="text-[10px]" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Topic Input */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Or Enter Your Own Custom Blog Topic / Search Query:
                  </label>
                  <button
                    type="button"
                    onClick={handleFormatTitle}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    ✨ Format Title Case
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={topicTitle}
                    onChange={(e) => setTopicTitle(e.target.value)}
                    onBlur={handleFormatTitle}
                    placeholder="e.g. Benefits of Keeping Narmadeshwar Shivling in Flats"
                    className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!topicTitle.trim()) {
                        alert("Please enter a topic title!");
                        return;
                      }
                      setActiveTab("writer");
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shrink-0"
                  >
                    Proceed to Writer &rarr;
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: WRITE & GENERATE ARTICLE */
            <div className="space-y-6">
              {/* Topic Selector Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Selected Blog Topic / Primary Focus
                    </label>
                    <button
                      type="button"
                      onClick={handleFormatTitle}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    >
                      ✨ Format Title Case
                    </button>
                  </div>
                  <input
                    type="text"
                    value={topicTitle}
                    onChange={(e) => setTopicTitle(e.target.value)}
                    onBlur={handleFormatTitle}
                    placeholder="e.g. Complete Guide to Natural Sphatik Shivling"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 font-semibold text-gray-800"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <FaRobot className="text-indigo-500" />
                    <span>
                      Engine: {savedKey ? "Google Gemini 1.5 Flash AI" : "Built-in Jaipuria GEO Knowledge Engine"}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleGenerate}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating 1000–1500 Words Deep Article...</span>
                      </>
                    ) : (
                      <>
                        <FaMagic />
                        <span>Generate 1000–1500 Words Full Article</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Generated Result Preview */}
              {result && (
                <div className="space-y-6">
                  {/* Quality Stats Bar */}
                  {result.stats && (
                    <div className="flex flex-wrap items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-2xl px-5 py-3 text-xs text-indigo-950 font-medium shadow-2xs">
                      <span>📊 <strong>Word Count:</strong> {result.stats.wordCount} words (Pillar Authority Grade)</span>
                      <span className="text-indigo-300">•</span>
                      <span>⏱ <strong>Reading Time:</strong> {result.stats.readingTime}</span>
                      <span className="text-indigo-300">•</span>
                      <span>📑 <strong>Headings:</strong> {result.stats.headingsCount} Sections</span>
                      <span className="text-indigo-300">•</span>
                      <span>❓ <strong>Schema FAQs:</strong> {result.stats.faqCount} Q&amp;As</span>
                      <span className="text-indigo-300">•</span>
                      <span className="text-emerald-700 font-bold">✔ Smart Internal Links Injected</span>
                    </div>
                  )}

                  {/* Google SERP Snippet Preview */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                        <FaSearch className="text-indigo-600" />
                        <span>Google Search Result Snippet Preview</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(`${result.title}\n${result.description}`, "meta")}
                        className="text-xs font-semibold text-gray-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedSection === "meta" ? "✔ Copied" : "Copy Meta"}
                      </button>
                    </div>
                    <div className="text-base font-semibold text-blue-700 hover:underline cursor-pointer">
                      {result.title}
                    </div>
                    <div className="text-xs text-emerald-700 font-mono truncate">
                      https://www.crystaljaipuria.com/blog/{result.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  {/* Content Preview Container */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-4 border-b pb-3">
                      <div>
                        <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
                          <FaFileAlt className="text-indigo-600" />
                          <span>Full Article Content ({result.stats?.wordCount} words)</span>
                        </h3>
                        <p className="text-xs text-gray-500">
                          Complete with Shastric references, mineral science, comparison table &amp; Vastu placement
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex rounded-lg bg-gray-100 p-0.5 text-xs font-bold">
                          <button
                            type="button"
                            onClick={() => setPreviewMode("visual")}
                            className={`px-3 py-1 rounded-md transition cursor-pointer ${
                              previewMode === "visual"
                                ? "bg-white text-indigo-700 shadow-xs"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            Visual
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewMode("html")}
                            className={`px-3 py-1 rounded-md transition cursor-pointer ${
                              previewMode === "html"
                                ? "bg-white text-indigo-700 shadow-xs"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            HTML Code
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(result.content, "fullContent")}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSection === "fullContent" ? (
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

                    {previewMode === "visual" ? (
                      <div
                        className="max-h-[380px] overflow-y-auto p-4 bg-stone-50/50 rounded-xl border border-gray-100 text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-4 [&_h2]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_table]:w-full [&_table]:text-xs [&_th]:bg-gray-100 [&_th]:p-2 [&_td]:p-2 [&_td]:border"
                        dangerouslySetInnerHTML={{ __html: result.content }}
                      />
                    ) : (
                      <textarea
                        readOnly
                        rows={14}
                        value={result.content}
                        className="w-full font-mono text-xs p-4 bg-gray-900 text-emerald-400 rounded-xl border border-gray-800 outline-none"
                      />
                    )}
                  </div>

                  {/* 1-Click Apply All Button */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">
                        Ready to Publish to Blog Management?
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Inserts Blog Title, Meta Description &amp; 1500-words Content straight into your form.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyAll}
                      className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FaCheck />
                      <span>Apply All to Blog Form</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-800 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 cursor-pointer"
          >
            Close
          </button>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-bold text-indigo-700">Crystal Jaipuria GEO Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBlogAssistantModal;
