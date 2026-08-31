import React, { useState, useRef, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnlink,
  FaTable,
  FaEraser,
  FaUndo,
  FaRedo,
  FaNetworkWired,
  FaCheck,
} from "react-icons/fa";
import {
  autoInjectInternalLinks,
  scanForInternalLinks,
} from "../utils/internalLinking";

const RichTextEditor = ({ label, name, value = "", onChange, rows = 6, placeholder = "", currentSlug = "" }) => {
  const [activeTab, setActiveTab] = useState("visual"); // 'visual' | 'html'
  const [interlinkNotice, setInterlinkNotice] = useState("");
  const editorRef = useRef(null);
  const isUpdatingRef = useRef(false);

  // Keep visual editor in sync with value prop when not actively typing
  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, activeTab]);

  const handleVisualInput = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      const html = editorRef.current.innerHTML;
      onChange({ target: { name, value: html } });
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  };

  const handleHtmlChange = (e) => {
    onChange(e);
  };

  const exec = (command, val = null) => {
    if (activeTab !== "visual") return;
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, val);
      handleVisualInput();
    }
  };

  const handleLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) {
      exec("createLink", url);
    }
  };

  const handleHeading = (e) => {
    const heading = e.target.value;
    if (heading) {
      exec("formatBlock", `<${heading}>`);
    } else {
      exec("formatBlock", "<p>");
    }
  };

  const handleInsertTable = () => {
    const tableHtml = `
      <table style="width:100%; border-collapse:collapse; margin:12px 0; border:1px solid #ddd;">
        <thead>
          <tr style="background:#f8f9fa;">
            <th style="border:1px solid #ddd; padding:8px; text-align:left;">Specification</th>
            <th style="border:1px solid #ddd; padding:8px; text-align:left;">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #ddd; padding:8px;">Material</td>
            <td style="border:1px solid #ddd; padding:8px;">Natural Gemstone</td>
          </tr>
          <tr>
            <td style="border:1px solid #ddd; padding:8px;">Origin</td>
            <td style="border:1px solid #ddd; padding:8px;">Jaipur, India</td>
          </tr>
        </tbody>
      </table><p><br></p>
    `;
    exec("insertHTML", tableHtml);
  };

  const handleAutoInterlink = () => {
    const currentHtml = value || (editorRef.current ? editorRef.current.innerHTML : "");
    if (!currentHtml || currentHtml.trim() === "<p><br></p>") {
      alert("Please enter some text in the editor first to scan for links!");
      return;
    }
    const updatedHtml = autoInjectInternalLinks(currentHtml, currentSlug, 4);
    if (updatedHtml !== currentHtml) {
      if (editorRef.current) {
        editorRef.current.innerHTML = updatedHtml;
      }
      onChange({ target: { name, value: updatedHtml } });
      setInterlinkNotice("✨ Smart Internal Links Injected!");
      setTimeout(() => setInterlinkNotice(""), 3000);
    } else {
      setInterlinkNotice("ℹ️ Content is already interlinked or no new matching keywords found.");
      setTimeout(() => setInterlinkNotice(""), 3000);
    }
  };

  const detectedLinks = scanForInternalLinks(value || (editorRef.current ? editorRef.current.innerHTML : ""), currentSlug);

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 font-semibold text-gray-700">
          {label}
        </label>
      )}

      <div className="rounded-xl border border-gray-300 bg-white shadow-xs overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-indigo-400">
        {/* Top bar: Upload/Insert helper on left, Visual/HTML tab switch on right */}
        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-500">Editor Toolbar</span>
          </div>

          {/* Tab buttons (WordPress style) */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("visual")}
              className={`px-3 py-1 text-xs font-semibold rounded-t border-t border-x transition-colors cursor-pointer ${
                activeTab === "visual"
                  ? "bg-white text-gray-900 border-gray-300 -mb-[7px] pb-2 z-10"
                  : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
              }`}
            >
              Visual
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("html")}
              className={`px-3 py-1 text-xs font-semibold rounded-t border-t border-x transition-colors cursor-pointer ${
                activeTab === "html"
                  ? "bg-white text-gray-900 border-gray-300 -mb-[7px] pb-2 z-10"
                  : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
              }`}
            >
              HTML
            </button>
          </div>
        </div>

        {/* Toolbar Buttons (Active only in Visual mode) */}
        {activeTab === "visual" && (
          <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-100/80 p-2">
            {/* Bold */}
            <button
              type="button"
              title="Bold (Ctrl+B)"
              onClick={() => exec("bold")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaBold className="text-xs" />
            </button>

            {/* Italic */}
            <button
              type="button"
              title="Italic (Ctrl+I)"
              onClick={() => exec("italic")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaItalic className="text-xs" />
            </button>

            {/* Underline */}
            <button
              type="button"
              title="Underline (Ctrl+U)"
              onClick={() => exec("underline")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaUnderline className="text-xs" />
            </button>

            {/* Strikethrough */}
            <button
              type="button"
              title="Strikethrough"
              onClick={() => exec("strikeThrough")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaStrikethrough className="text-xs" />
            </button>

            {/* Headings Pills (H1, H2, H3, H4, Paragraph) */}
            <div className="flex items-center gap-0.5 bg-gray-200/70 p-0.5 rounded border border-gray-300">
              <button
                type="button"
                title="Heading 2 (Main Section Heading)"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (editorRef.current) editorRef.current.focus();
                  try { document.execCommand("formatBlock", false, "<h2>"); } catch { document.execCommand("formatBlock", false, "h2"); }
                  handleVisualInput();
                }}
                className="h-6 px-1.5 flex items-center justify-center rounded bg-white text-gray-800 text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 cursor-pointer"
              >
                H2
              </button>
              <button
                type="button"
                title="Heading 3 (Sub-heading)"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (editorRef.current) editorRef.current.focus();
                  try { document.execCommand("formatBlock", false, "<h3>"); } catch { document.execCommand("formatBlock", false, "h3"); }
                  handleVisualInput();
                }}
                className="h-6 px-1.5 flex items-center justify-center rounded bg-white text-gray-800 text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 cursor-pointer"
              >
                H3
              </button>
              <button
                type="button"
                title="Heading 4 (Small Heading)"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (editorRef.current) editorRef.current.focus();
                  try { document.execCommand("formatBlock", false, "<h4>"); } catch { document.execCommand("formatBlock", false, "h4"); }
                  handleVisualInput();
                }}
                className="h-6 px-1.5 flex items-center justify-center rounded bg-white text-gray-800 text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 cursor-pointer"
              >
                H4
              </button>
              <button
                type="button"
                title="Normal Paragraph"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (editorRef.current) editorRef.current.focus();
                  try { document.execCommand("formatBlock", false, "<p>"); } catch { document.execCommand("formatBlock", false, "p"); }
                  handleVisualInput();
                }}
                className="h-6 px-1.5 flex items-center justify-center rounded bg-white text-gray-700 text-xs font-semibold hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 cursor-pointer"
              >
                ¶ P
              </button>
            </div>

            <span className="h-4 w-px bg-gray-300 mx-1" />

            {/* Bullet List */}
            <button
              type="button"
              title="Bullet List"
              onClick={() => exec("insertUnorderedList")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaListUl className="text-xs" />
            </button>

            {/* Numbered List */}
            <button
              type="button"
              title="Numbered List"
              onClick={() => exec("insertOrderedList")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaListOl className="text-xs" />
            </button>

            {/* Blockquote */}
            <button
              type="button"
              title="Quote"
              onClick={() => exec("formatBlock", "<blockquote>")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaQuoteLeft className="text-xs" />
            </button>

            <span className="h-4 w-px bg-gray-300 mx-1" />

            {/* Alignment */}
            <button
              type="button"
              title="Align Left"
              onClick={() => exec("justifyLeft")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaAlignLeft className="text-xs" />
            </button>
            <button
              type="button"
              title="Align Center"
              onClick={() => exec("justifyCenter")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaAlignCenter className="text-xs" />
            </button>
            <button
              type="button"
              title="Align Right"
              onClick={() => exec("justifyRight")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaAlignRight className="text-xs" />
            </button>

            <span className="h-4 w-px bg-gray-300 mx-1" />

            {/* Link */}
            <button
              type="button"
              title="Insert Link"
              onClick={handleLink}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaLink className="text-xs" />
            </button>
            <button
              type="button"
              title="Remove Link"
              onClick={() => exec("unlink")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaUnlink className="text-xs" />
            </button>

            {/* Smart Auto Interlink Button */}
            <button
              type="button"
              title="Auto-inject Smart Internal Links for SEO"
              onClick={handleAutoInterlink}
              className="h-7 px-2 flex items-center gap-1 rounded border border-indigo-300 bg-indigo-50 text-indigo-700 shadow-xs hover:bg-indigo-100 hover:text-indigo-900 active:scale-95 cursor-pointer text-xs font-bold"
            >
              <FaNetworkWired className="text-xs text-indigo-600" />
              <span>Smart Interlink</span>
            </button>

            <span className="h-4 w-px bg-gray-300 mx-1" />

            {/* Table */}
            <button
              type="button"
              title="Insert Specification Table"
              onClick={handleInsertTable}
              className="h-7 px-2 flex items-center gap-1 rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer text-xs"
            >
              <FaTable className="text-xs text-indigo-600" />
              <span>Table</span>
            </button>

            <span className="h-4 w-px bg-gray-300 mx-1" />

            {/* Clear Formatting */}
            <button
              type="button"
              title="Clear Formatting"
              onClick={() => exec("removeFormat")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaEraser className="text-xs" />
            </button>

            {/* Undo / Redo */}
            <button
              type="button"
              title="Undo"
              onClick={() => exec("undo")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaUndo className="text-xs" />
            </button>
            <button
              type="button"
              title="Redo"
              onClick={() => exec("redo")}
              className="h-7 w-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-100 hover:text-black active:scale-95 cursor-pointer"
            >
              <FaRedo className="text-xs" />
            </button>
          </div>
        )}

        {/* Notice Message */}
        {interlinkNotice && (
          <div className="bg-indigo-50 border-b border-indigo-200 px-3 py-1.5 text-xs text-indigo-800 font-semibold flex items-center gap-1.5 animate-fadeIn">
            <FaCheck className="text-indigo-600" />
            <span>{interlinkNotice}</span>
          </div>
        )}

        {/* Content Area */}
        {activeTab === "visual" ? (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleVisualInput}
            onBlur={handleVisualInput}
            className="w-full min-h-[160px] p-4 text-sm text-gray-800 outline-none leading-relaxed overflow-y-auto focus:bg-white bg-white prose max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-3 [&_h2]:text-gray-900 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:my-2 [&_h3]:text-gray-800 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:my-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-400 [&_blockquote]:pl-3 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2 [&_a]:text-indigo-600 [&_a]:underline font-normal"
            style={{ minHeight: `${rows * 28}px` }}
            placeholder={placeholder}
          />
        ) : (
          <textarea
            name={name}
            value={value || ""}
            onChange={handleHtmlChange}
            rows={rows}
            placeholder="Edit raw HTML code..."
            className="w-full p-4 text-xs sm:text-sm font-mono text-gray-800 bg-gray-900 text-green-400 outline-none border-0 leading-relaxed"
          />
        )}
      </div>

      {/* Suggested Internal Links Pills */}
      {detectedLinks.length > 0 && (
        <div className="mt-2 p-2.5 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
              <FaNetworkWired className="text-indigo-600" />
              <span>Suggested Internal Links ({detectedLinks.length}):</span>
            </span>
            <button
              type="button"
              onClick={handleAutoInterlink}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
            >
              + Link All Automatically
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {detectedLinks.slice(0, 5).map((sug, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white border border-gray-300 text-gray-700 shadow-2xs font-medium"
              >
                <span className="font-semibold text-indigo-700">{sug.keyword}</span>
                <span className="text-[10px] text-gray-400">➔ {sug.targetUrl}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
