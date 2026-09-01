import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { formatPrice } from "../utils/price";
import { optimizeCloudinaryUrl } from "../utils/imageOptimizer";
import { getStandardizedProduct } from "../utils/productStandardizer";
import { unpackProductMetadata } from "../utils/productMetadata";
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
  trackGalleryClick,
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
} from "react-icons/fa";
import SEO from "../Components/SEO";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    fetchProduct();
  }, [id]);

  const fetchRelatedProducts = async (prod) => {
    try {
      if (!prod?.categoryId?._id) return;
      const res = await API.get(`/products/category/${prod.categoryId._id}`);
      setRelatedProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/products/${id}`);
      const data = res.data.product;

      if (data?.slug) {
        navigate(`/product/${data.slug}`, { replace: true });
        return;
      }

      let standardized = null;
      if (data) {
        const unpacked = unpackProductMetadata(data);
        const mergedData = {
          ...data,
          faqs: unpacked.faqs,
          metaTitle: unpacked.metaTitle,
          metaDescription: unpacked.metaDescription,
          additionalInfo: unpacked.cleanAdditionalInfo || data.additionalInfo
        };
        standardized = getStandardizedProduct(mergedData);
      }

      setProduct(standardized || null);
      if (standardized) {
        trackProductView(standardized);
      }
      if (data?.categoryId?._id) {
        fetchRelatedProducts(data);
      }
      if (data?.images?.length > 0) {
        setSelectedImage(data.images[0].url);
      }
    } catch (err) {
      console.log(err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
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
    return null;
  }

  if (!product) {
    return <NotFound />;
  }

  const canonicalUrl = `https://www.crystaljaipuria.com/product/${product.slug || id}`;
  const metaTitle = product.metaTitle || getProductMetaTitle(product.name, product.slug || id);
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

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        image={product.images?.[0]?.url || "https://www.crystaljaipuria.com/logo.png"}
        type="product"
        schema={schema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* TOP SECTION: 2 COLUMNS (Images on Left, Buy Box on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT: MAIN IMAGE & THUMBNAILS */}
          <div>
            <div className="w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-h-[500px] bg-gray-50 rounded-2xl shadow-xs border border-gray-200 overflow-hidden flex items-center justify-center p-2">
              <img
                src={optimizeCloudinaryUrl(selectedImage, 800)}
                alt={product.name}
                width="600"
                height="600"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Thumbnails Row */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <img
                    key={img.public_id || idx}
                    src={optimizeCloudinaryUrl(img.url, 160)}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    width="80"
                    height="80"
                    loading="lazy"
                    decoding="async"
                    onClick={() => {
                      setSelectedImage(img.url);
                      trackGalleryClick(idx, product);
                    }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 shrink-0 ${
                      selectedImage === img.url
                        ? "border-amber-500 shadow-md scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  />
                ))}
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

              {/* ACTION BUTTONS (Aligned level with bottom of Big Image) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("product_details_enquire_button", product)}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3.5 rounded-xl text-base font-semibold shadow-md transition-all active:scale-95"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>Enquire Now</span>
                </a>

                <a
                  href="tel:+918955613237"
                  onClick={() => trackContactClick("phone", "+918955613237")}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-xl text-base font-semibold shadow-md transition-all active:scale-95"
                >
                  <span>📞 Call Now</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setShowQueryForm(true);
                    trackQueryModalOpen(product);
                  }}
                  className="sm:col-span-2 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3.5 rounded-xl text-base font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>💬 Request a Query</span>
                </button>
              </div>

              {/* 3 TRUST FEATURE CARDS (Aligned level with Thumbnails Row) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 mt-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xl shrink-0">✨</span>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm">100% Authentic</h3>
                    <p className="text-[11px] text-gray-500 hidden sm:block">Genuine & Certified</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xl shrink-0">🚚</span>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm">Fast Delivery</h3>
                    <p className="text-[11px] text-gray-500 hidden sm:block">Safe & Doorstep</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xl shrink-0">🔒</span>
                  <div>
                    <h3 className="font-bold text-gray-800 text-xs sm:text-sm">Secure Trust</h3>
                    <p className="text-[11px] text-gray-500 hidden sm:block">Trusted Since 1989</p>
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
                  <div
                    className="text-gray-700 text-sm sm:text-base leading-7 sm:leading-8 prose max-w-none max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-3 overscroll-contain focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1.5 [&_p]:my-3 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2 [&_a]:text-indigo-600 [&_a]:underline"
                    dangerouslySetInnerHTML={{
                      __html: product.description || "No description available.",
                    }}
                  />
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
        {relatedProducts.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item.slug || item._id}`)}
                  className="bg-white rounded-xl shadow-xs hover:shadow-lg cursor-pointer overflow-hidden transition-all duration-200 border border-gray-100"
                >
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="w-full h-36 sm:h-44 lg:h-48 object-contain bg-gray-50 p-2"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-800">
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
              ))}
            </div>
          </div>
        )}

        {/* QUERY FORM MODAL */}
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
                  <p className="text-gray-600 text-base sm:text-lg mt-3 max-w-md">
                    Your query has been submitted. We will connect with you on WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => {
                      setShowQueryForm(false);
                      setQuerySubmitted(false);
                    }}
                    className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800">Request a Product Query</h2>
                    <button
                      onClick={() => setShowQueryForm(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                  <form onSubmit={handleQuerySubmit} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={queryForm.fullName}
                        onChange={handleQueryChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          WhatsApp Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="whatsappNumber"
                          value={queryForm.whatsappNumber}
                          onChange={handleQueryChange}
                          placeholder="+91 9876543210"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={queryForm.email}
                          onChange={handleQueryChange}
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={queryForm.country}
                          onChange={handleQueryChange}
                          placeholder="e.g. India, USA"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={queryForm.quantity}
                          onChange={handleQueryChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Weight / Size</label>
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
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3.5 rounded-lg font-semibold text-base sm:text-lg transition cursor-pointer"
                    >
                      <FaWhatsapp className="text-xl" />
                      <span>Submit Query on WhatsApp</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;