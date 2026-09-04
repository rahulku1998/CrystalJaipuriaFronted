import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { formatPrice } from "../utils/price";
import { optimizeCloudinaryUrl } from "../utils/imageOptimizer";
import { unpackProductMetadata } from "../utils/productMetadata";
import { getStandardizedProduct, getSacredShloka } from "../utils/productStandardizer";
import { getLegacyProductBySlug, resolveProductSlug } from "../utils/legacyProducts";
import {
  getProductMetaTitle,
  getProductMetaDescription,
  getProductSchema,
} from "../utils/seo";
import {
  trackProductView,
  trackWhatsAppClick,
  trackInquirySubmit,
  trackContactClick,
  trackTabSwitch,
  trackProductShare,
  trackQueryModalOpen,
} from "../utils/analytics";
import NotFound from "./NotFound";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink,
  FaChevronDown,
  FaPhoneAlt,
  FaBolt,
} from "react-icons/fa";
import SEO from "../Components/SEO";
import BuyNowModal from "../Components/BuyNowModal";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [queryForm, setQueryForm] = useState({
    fullName: "",
    whatsappNumber: "",
    email: "",
    country: "",
    quantity: 1,
    weight: "",
    message: "",
  });

  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const handleQueryChange = (e) => {
    const { name, value } = e.target;
    setQueryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "918306317032";
    const message = `
Hello Crystal Jaipuria, I have a query regarding this product.

*Product:* ${product?.name || "N/A"}
*Full Name:* ${queryForm.fullName}
*WhatsApp Number:* ${queryForm.whatsappNumber}
*Email:* ${queryForm.email}
*Country:* ${queryForm.country}
*Quantity:* ${queryForm.quantity}
*Weight:* ${queryForm.weight || "Not specified"}
*Message:* ${queryForm.message || "N/A"}
*Product Link:* ${window.location.href}
    `.trim();

    trackInquirySubmit(queryForm, product);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setQuerySubmitted(true);
    setShowQueryForm(false);
    setQueryForm({
      fullName: "",
      whatsappNumber: "",
      email: "",
      country: "",
      quantity: 1,
      weight: "",
      message: "",
    });
  };

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchRelatedProducts = async (prod) => {
    try {
      const catId = prod?.categoryId?._id || (typeof prod?.categoryId === 'string' ? prod.categoryId : null);
      if (!catId) return;
      const res = await API.get(`/products/category/${catId}`);
      const related = (res.data?.products || []).filter((p) => (p.slug || p._id) !== (prod.slug || prod._id));
      setRelatedProducts(related);
    } catch (err) {
      console.log("Error fetching related products:", err);
    }
  };

  const fetchProduct = async () => {
    try {
      const rawSlug = String(slug || "").trim().toLowerCase().replace(/^\/product\//, "").replace(/\/$/, "");
      const cleanSlug = resolveProductSlug(rawSlug);
      if (rawSlug !== cleanSlug) {
        navigate(`/product/${cleanSlug}`, { replace: true });
        return;
      }
      setLoading(true);

      let data = null;

      // 1. Try DB fetch by slug
      try {
        const res = await API.get(`/products/slug/${cleanSlug}`);
        const resData = res.data?.product || (res.data?.name ? res.data : null);
        if (resData && (resData.name || resData._id)) {
          data = resData;
        }
      } catch {
        data = null;
      }

      // 2. Try DB fetch by ID if slug is MongoDB ID
      if (!data) {
        try {
          const idRes = await API.get(`/products/${cleanSlug}`);
          const idData = idRes.data?.product || (idRes.data?.name ? idRes.data : null);
          if (idData && (idData.name || idData._id)) {
            data = idData;
          }
        } catch {
          data = null;
        }
      }

      // 3. Fallback to full products catalog search
      if (!data) {
        try {
          const allRes = await API.get("/products");
          const allProds = allRes.data?.products || allRes.data || [];
          const found = allProds.find(
            (p) =>
              (p.slug && p.slug.toLowerCase() === cleanSlug) ||
              p._id === cleanSlug ||
              (p.name && p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === cleanSlug)
          );
          if (found) {
            data = found;
          }
        } catch {
          // ignore
        }
      }

      // 4. Fallback to legacy products registry (with auto-sync to live DB product if already published)
      if (!data) {
        const leg = getLegacyProductBySlug(cleanSlug);
        if (leg) {
          try {
            const allRes = await API.get("/products");
            const allProds = allRes.data?.products || allRes.data || [];
            const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
            const liveMatch = allProds.find((p) => norm(p.name) === norm(leg.name));
            data = liveMatch || leg;
          } catch {
            data = leg;
          }
        }
      }

      // Automatically strip junk query parameters from browser URL
      if (typeof window !== "undefined" && window.location.search) {
        const searchParams = new URLSearchParams(window.location.search);
        const allowedMarketingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
        const hasOnlyMarketing = Array.from(searchParams.keys()).every((k) => allowedMarketingKeys.includes(k));
        if (!hasOnlyMarketing) {
          const cleanPath = `/product/${data?.slug || cleanSlug}`;
          window.history.replaceState(null, "", cleanPath);
        }
      }

      let standardized = null;
      if (data) {
        const unpacked = unpackProductMetadata(data);
        const mergedData = {
          ...data,
          faqs: (unpacked.faqs && unpacked.faqs.length > 0) ? unpacked.faqs : data.faqs,
          metaTitle: unpacked.metaTitle || data.metaTitle,
          metaDescription: unpacked.metaDescription || data.metaDescription,
          additionalInfo: unpacked.cleanAdditionalInfo || data.additionalInfo,
        };
        standardized = getStandardizedProduct(mergedData);
      }

      setProduct(standardized || null);

      if (standardized) {
        trackProductView(standardized);
        fetchRelatedProducts(standardized);

        setSelectedImageIndex(0);
        if (standardized?.images?.length > 0) {
          const firstImg = typeof standardized.images[0] === 'string'
            ? standardized.images[0]
            : (standardized.images[0]?.url || "/Gemstone.webp");
          setSelectedImage(firstImg);
        } else {
          setSelectedImage("/Gemstone.webp");
        }
      }
    } catch (err) {
      console.error("Error in fetchProduct:", err);
      const cleanSlug = String(slug || "").trim().toLowerCase().replace(/^\/product\//, "").replace(/\/$/, "");
      const legacyFallback = getLegacyProductBySlug(cleanSlug);
      if (legacyFallback) {
        const std = getStandardizedProduct(legacyFallback);
        setProduct(std);
        setSelectedImage(std.images?.[0] || "/Gemstone.webp");
      } else {
        setProduct(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/product/${product?.slug || slug}` : "";
  const shareText = `Check out this amazing product: ${product?.name || ""}`;
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const copyLink = async () => {
    trackProductShare("copy_link", product);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  if (loading && !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium text-sm">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  const canonicalUrl = `https://www.crystaljaipuria.com/product/${product.slug || slug}`;
  const metaTitle = product.metaTitle || getProductMetaTitle(product.name, product.slug || slug);
  const metaDescription = product.metaDescription || getProductMetaDescription(product);
  const schema = getProductSchema(product, canonicalUrl);
  const whatsappMessage = `Hi Crystal Jaipuria, I am interested in buying "${product.name}". Please share more details on this Number .`;
  const whatsappLink = `https://wa.me/918306317032?text=${encodeURIComponent(whatsappMessage)}`;

  // Parse FAQs
  let productFaqs = [];
  if (product?.faqs) {
    try {
      productFaqs = typeof product.faqs === "string" ? JSON.parse(product.faqs) : product.faqs;
    } catch {
      productFaqs = [];
    }
  }
  if (!Array.isArray(productFaqs)) productFaqs = [];
  productFaqs = productFaqs.filter((f) => f && (f.question || f.answer));
  const hasFaqs = productFaqs.length > 0;
  const isPendingProduct = Boolean(product._id?.startsWith?.('legacy_') || product.isPending);
  const sacredShloka = getSacredShloka(product?.slug || product?.name);

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        image={(typeof product.images?.[0] === 'string' ? product.images[0] : product.images?.[0]?.url) || "https://www.crystaljaipuria.com/logo.png"}
        type="product"
        schema={schema}
        robots={isPendingProduct ? "noindex, nofollow" : "index, follow"}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1.5 text-indigo-600 font-semibold hover:underline cursor-pointer text-sm sm:text-base"
        >
          ← Back to Products
        </button>

        {/* TOP SECTION: 2 COLUMNS (Images on Left, Buy Box on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT: MAIN IMAGE & THUMBNAILS */}
          <div>
            <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-h-[500px] bg-gray-50 rounded-2xl shadow-xs border border-gray-200 overflow-hidden flex items-center justify-center p-2">
              {(() => {
                const activeImg = (Array.isArray(product.images) && product.images[selectedImageIndex]) || product.images?.[0];
                const activeRaw = typeof activeImg === 'string' ? activeImg : (activeImg?.url || "/Gemstone.webp");
                const cleanSlug = (product.slug || product.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                const activeClean = selectedImageIndex === 0 
                  ? `/images/${cleanSlug}.webp` 
                  : `/images/${cleanSlug}-${selectedImageIndex + 1}.webp`;

                return (
                  <img
                    src={activeClean}
                    onError={(e) => {
                      if (e.target.src !== activeRaw) {
                        e.target.src = activeRaw;
                      }
                    }}
                    alt={`${product.name} - 100% Certified Natural Gemstone Idol by Crystal Jaipuria, Jaipur`}
                    width="600"
                    height="600"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                );
              })()}
            </div>

            {/* Thumbnails Row */}
            {Array.isArray(product.images) && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => {
                  const rawSrc = typeof img === 'string' ? img : (img?.url || '');
                  const cleanSlug = (product.slug || product.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                  const thumbClean = idx === 0 
                    ? `/images/${cleanSlug}.webp` 
                    : `/images/${cleanSlug}-${idx + 1}.webp`;

                  return (
                    <img
                      key={img.public_id || idx}
                      src={thumbClean}
                      onError={(e) => {
                        if (e.target.src !== rawSrc) {
                          e.target.src = rawSrc;
                        }
                      }}
                      alt={`${product.name} - Handcrafted Gemstone Idol View ${idx + 1}`}
                      width="80"
                      height="80"
                      loading="lazy"
                      decoding="async"
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setSelectedImage(rawSrc);
                      }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border-2 cursor-pointer transition ${
                        selectedImageIndex === idx ? "border-amber-700 ring-2 ring-amber-200" : "border-gray-200 hover:border-gray-400"
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO & BUY ACTIONS */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {product.price && (
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
                    {formatPrice(product.price)}
                  </span>
                </div>
              )}

              {product.detail && (
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
                  {product.detail}
                </p>
              )}

              {/* Specs Badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 text-sm sm:text-base text-gray-700">
                {product.weight && (
                  <p>
                    <span className="font-semibold text-indigo-600">Weight :</span> {product.weight}
                  </p>
                )}
                {product.size && (
                  <p>
                    <span className="font-semibold text-indigo-600">Size :</span> {product.size}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Availability :</span>{" "}
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Out Of Stock</span>
                  )}
                </p>
              </div>

              {/* ACTION BUTTONS (Clean Neutral 2x2 Layout with Colorful Icons & Hover States) */}
              <div className="space-y-2.5 sm:space-y-3 mt-6">
                {/* ROW 1: PRIMARY ORDERING ACTIONS (2x2 Grid on Mobile & Desktop) */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {/* BUTTON 1: BUY NOW (Google Merchant Center Requirement) */}
                  <button
                    type="button"
                    onClick={() => setShowBuyModal(true)}
                    className="group w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-emerald-600 text-gray-800 hover:text-white border-2 border-gray-300 hover:border-emerald-600 py-3 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold shadow-2xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <FaBolt className="text-amber-500 group-hover:text-amber-200 text-base sm:text-lg transition-colors shrink-0" />
                    <span>Buy Now</span>
                  </button>

                  {/* BUTTON 2: WHATSAPP ENQUIRY */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("product_details_enquire_button", product)}
                    className="group w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-emerald-600 text-gray-800 hover:text-white border border-gray-300 hover:border-emerald-600 py-3 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-base font-bold shadow-2xs hover:shadow-md transition-all duration-200 active:scale-95"
                  >
                    <FaWhatsapp className="text-emerald-600 group-hover:text-white text-base sm:text-xl transition-colors shrink-0" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>

                {/* ROW 2: DIRECT CONSULTATION & CUSTOMIZATION (2x2 Grid on Mobile & Desktop) */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {/* BUTTON 3: CALL DIRECTLY */}
                  <a
                    href="tel:+918955613237"
                    onClick={() => trackContactClick("phone", "+918955613237")}
                    className="group w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-blue-600 text-gray-800 hover:text-white border border-gray-300 hover:border-blue-600 py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-md transition-all duration-200 active:scale-95"
                  >
                    <FaPhoneAlt className="text-blue-600 group-hover:text-white text-xs sm:text-sm transition-colors shrink-0" />
                    <span className="hidden sm:inline">Call Us (+91 89556 13237)</span>
                    <span className="sm:hidden">Call Us</span>
                  </a>

                  {/* BUTTON 4: CUSTOM SPECIFICATION & BULK */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowQueryForm(true);
                      trackQueryModalOpen(product);
                    }}
                    className="group w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-white hover:bg-amber-500 text-gray-800 hover:text-white border border-gray-300 hover:border-amber-500 py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <span className="text-amber-500 group-hover:scale-125 transition-transform text-sm sm:text-base shrink-0">✨</span>
                    <span className="hidden sm:inline">Custom Size &amp; Bulk Specs</span>
                    <span className="sm:hidden">Custom / Bulk</span>
                  </button>
                </div>
              </div>

              {/* 3 HIGH-TRUST VEDIC & LAB FEATURE CARDS */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3.5 mt-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-amber-50/70 rounded-xl border border-amber-200/70">
                  <span className="text-lg sm:text-xl shrink-0">🕉️</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Pran Pratishtha</h3>
                    <p className="text-[11px] text-amber-900 font-medium hidden sm:block">Gangajal Cleansed</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-lg sm:text-xl shrink-0">🔬</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Lab Certified</h3>
                    <p className="text-[11px] text-gray-500 hidden sm:block">100% Earth-Mined</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-lg sm:text-xl shrink-0">🏛️</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Jaipur Karigar</h3>
                    <p className="text-[11px] text-gray-500 hidden sm:block">Direct Lapidary (1989)</p>
                  </div>
                </div>
              </div>

              {/* SHARE PRODUCT ROW */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs sm:text-sm font-bold text-gray-700">Share Product:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={whatsappShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProductShare("whatsapp", product)}
                    className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition shadow-2xs"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp className="text-base" />
                  </a>
                  <a
                    href={facebookShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProductShare("facebook", product)}
                    className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition shadow-2xs"
                    title="Share on Facebook"
                  >
                    <FaFacebook className="text-base" />
                  </a>
                  <a
                    href={twitterShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProductShare("twitter", product)}
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-black hover:text-white transition shadow-2xs"
                    title="Share on X (Twitter)"
                  >
                    <FaTwitter className="text-base" />
                  </a>
                  <a
                    href={linkedinShare}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackProductShare("linkedin", product)}
                    className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition shadow-2xs"
                    title="Share on LinkedIn"
                  >
                    <FaLinkedin className="text-base" />
                  </a>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="h-8 px-3 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1 hover:bg-gray-200 transition cursor-pointer"
                    title="Copy Link"
                  >
                    <FaLink className="text-xs" />
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOWER SECTION: EQUAL LEVEL SIDE-BY-SIDE (FAQs on Left & Description on Right) */}
        <div className="mt-12 sm:mt-16">
          {hasFaqs ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* LEFT: FAQs SECTION */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs order-2 lg:order-1">
                <div className="p-4 sm:p-5 border-b border-gray-100 bg-stone-50/70 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                      Product FAQs
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">
                    {productFaqs.length} Q&As
                  </span>
                </div>

                <div className="p-4 space-y-3 max-h-[380px] sm:max-h-[460px] overflow-y-auto overscroll-contain">
                  {productFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs transition-all duration-200 hover:border-indigo-300"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-semibold text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer text-xs sm:text-sm"
                      >
                        <span className="pr-3">
                          {index + 1}. {faq.question}
                        </span>
                        <FaChevronDown
                          className={`text-gray-400 text-xs shrink-0 transition-transform duration-200 ${
                            openFaqIndex === index ? "rotate-180 text-indigo-600" : ""
                          }`}
                        />
                      </button>
                      {openFaqIndex === index && (
                        <div className="px-3.5 pb-4 sm:px-4 sm:pb-4 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-2.5 leading-relaxed bg-gray-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: DESCRIPTION & ADDITIONAL INFORMATION TABS */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs order-1 lg:order-2">
                {/* Tabs Header */}
                <div className="flex border-b border-gray-200 bg-stone-50/70">
                  <button
                    onClick={() => {
                      setActiveTab("description");
                      trackTabSwitch("description", product);
                    }}
                    className={`px-5 py-3.5 sm:px-8 sm:py-4 font-semibold text-sm sm:text-base cursor-pointer text-left transition-colors ${
                      activeTab === "description"
                        ? "border-b-2 border-indigo-600 text-indigo-600 bg-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Description
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("additional");
                      trackTabSwitch("additional", product);
                    }}
                    className={`px-5 py-3.5 sm:px-8 sm:py-4 font-semibold text-sm sm:text-base cursor-pointer text-left transition-colors ${
                      activeTab === "additional"
                        ? "border-b-2 border-indigo-600 text-indigo-600 bg-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Additional Information
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-5 sm:p-7 min-h-[150px]">
                  {activeTab === "description" && (
                    <div className="relative">
                      {sacredShloka && (
                        <div className="mb-4 p-3 sm:p-3.5 bg-gradient-to-r from-amber-50/90 via-stone-50 to-orange-50/70 border-l-3 border-amber-500 rounded-r-xl shadow-2xs">
                          <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1">
                            <span>🕉️ {sacredShloka.source}</span>
                            <span className="text-amber-700/80 font-semibold">Authentic Vedic Consecration</span>
                          </div>
                          <p className="font-bold text-gray-900 text-xs sm:text-sm tracking-wide font-serif">
                            {sacredShloka.shloka}
                          </p>
                          <p className="text-[11px] sm:text-xs text-gray-600 italic mt-0.5">
                            "{sacredShloka.meaning}"
                          </p>
                        </div>
                      )}
                      <div
                        className="text-gray-700 text-sm sm:text-base leading-7 sm:leading-8 prose max-w-none max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-3 overscroll-contain focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1.5 [&_p]:my-3 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2 [&_a]:text-indigo-600 [&_a]:underline"
                        dangerouslySetInnerHTML={{
                          __html: product.description || "No description available.",
                        }}
                      />
                    </div>
                  )}

                  {activeTab === "additional" && (
                    <div
                      className="text-gray-700 text-sm sm:text-base leading-7 sm:leading-8 prose max-w-none max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-3 overscroll-contain focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-2 [&_p]:my-3 [&_strong]:font-bold [&_strong]:text-gray-900 [&_b]:font-bold [&_b]:text-gray-900 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2 [&_a]:text-indigo-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{
                        __html: product.additionalInfo || "No additional information available.",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Full width Description if product has no FAQs */
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs">
              <div className="flex border-b border-gray-200 bg-stone-50/70">
                <button
                  onClick={() => {
                    setActiveTab("description");
                    trackTabSwitch("description", product);
                  }}
                  className={`px-5 py-3.5 sm:px-8 sm:py-4 font-semibold text-sm sm:text-base cursor-pointer text-left transition-colors ${
                    activeTab === "description"
                      ? "border-b-2 border-indigo-600 text-indigo-600 bg-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description
                </button>

                <button
                  onClick={() => {
                    setActiveTab("additional");
                    trackTabSwitch("additional", product);
                  }}
                  className={`px-5 py-3.5 sm:px-8 sm:py-4 font-semibold text-sm sm:text-base cursor-pointer text-left transition-colors ${
                    activeTab === "additional"
                      ? "border-b-2 border-indigo-600 text-indigo-600 bg-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Additional Information
                </button>
              </div>

              <div className="p-5 sm:p-7 min-h-[150px]">
                {activeTab === "description" && (
                  <div className="relative">
                    {sacredShloka && (
                      <div className="mb-4 p-3 sm:p-3.5 bg-gradient-to-r from-amber-50/90 via-stone-50 to-orange-50/70 border-l-3 border-amber-500 rounded-r-xl shadow-2xs">
                        <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1">
                          <span>🕉️ {sacredShloka.source}</span>
                          <span className="text-amber-700/80 font-semibold">Authentic Vedic Consecration</span>
                        </div>
                        <p className="font-bold text-gray-900 text-xs sm:text-sm tracking-wide font-serif">
                          {sacredShloka.shloka}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-600 italic mt-0.5">
                          "{sacredShloka.meaning}"
                        </p>
                      </div>
                    )}
                    <div
                      className="text-gray-700 text-sm sm:text-base leading-7 sm:leading-8 prose max-w-none max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-3 overscroll-contain focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1.5 [&_p]:my-3 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2 [&_a]:text-indigo-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{
                        __html: product.description || "No description available.",
                      }}
                    />
                  </div>
                )}

                {activeTab === "additional" && (
                  <div
                    className="text-gray-700 text-sm sm:text-base leading-7 sm:leading-8 prose max-w-none max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-3 overscroll-contain focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-2 [&_p]:my-3 [&_strong]:font-bold [&_strong]:text-gray-900 [&_b]:font-bold [&_b]:text-gray-900 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2 [&_a]:text-indigo-600 [&_a]:underline"
                    dangerouslySetInnerHTML={{
                      __html: product.additionalInfo || "No additional information available.",
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        {Array.isArray(relatedProducts) && relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {relatedProducts.map((item) => {
                const itemImg = Array.isArray(item.images)
                  ? (typeof item.images[0] === 'string' ? item.images[0] : (item.images[0]?.url || "/Gemstone.webp"))
                  : (typeof item.images === 'string' ? item.images : "/Gemstone.webp");
                return (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/product/${item.slug || item._id}`)}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg cursor-pointer overflow-hidden transition"
                  >
                    <img
                      src={itemImg}
                      alt={item.name}
                      className="w-full h-32 sm:h-40 lg:h-48 object-contain p-2 bg-gray-50"
                    />
                    <div className="p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="mt-2">
                        {item.price && (
                          <span className="font-bold text-indigo-600 text-sm sm:text-base">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Query Modal */}
      {showQueryForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
            {querySubmitted ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-6 py-12">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">✓</span>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Thank You!</h2>
                <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                  Your query has been submitted successfully.
                  <br />
                  Our team will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowQueryForm(false);
                    setQuerySubmitted(false);
                  }}
                  className="mt-8 px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-semibold transition"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b px-5 sm:px-6 py-4 rounded-t-2xl">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Request a Query</h2>
                    <p className="text-sm text-gray-500 mt-1">Send your enquiry directly on WhatsApp</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQueryForm(false)}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-2xl transition"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleQuerySubmit} className="p-5 sm:p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={product?.name || ""}
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={queryForm.fullName}
                      onChange={handleQueryChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={queryForm.whatsappNumber}
                        onChange={handleQueryChange}
                        required
                        placeholder="Enter WhatsApp number"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Email <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={queryForm.email}
                        onChange={handleQueryChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={queryForm.country}
                      onChange={handleQueryChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                    >
                      <option value="">Select your country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={queryForm.quantity}
                        onChange={handleQueryChange}
                        required
                        placeholder="Enter quantity"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Weight <span className="text-gray-400">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="weight"
                        value={queryForm.weight}
                        onChange={handleQueryChange}
                        placeholder="e.g. 2 kg"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={queryForm.message}
                      onChange={handleQueryChange}
                      rows="4"
                      placeholder="Write your query or requirements..."
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3.5 rounded-lg font-semibold text-base sm:text-lg transition"
                  >
                    <FaWhatsapp className="text-xl" />
                    Submit Query on WhatsApp
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* INSTANT BUY NOW / CHECKOUT MODAL (Google Merchant Center Requirement) */}
      <BuyNowModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        product={product}
      />
    </>
  );
};

export default ProductDetails;