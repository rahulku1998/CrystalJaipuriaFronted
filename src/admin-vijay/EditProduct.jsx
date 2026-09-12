import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import RichTextEditor from "../Components/RichTextEditor";
import AIAssistantModal from "../Components/AIAssistantModal";
import {
  packProductMetadata,
  unpackProductMetadata,
  generateSuperMetaTags,
} from "../utils/productMetadata";
import { formatAdditionalInfo } from "../utils/productStandardizer";
import { generateShortDetail, estimateProductSpecs } from "../utils/aiGenerator";
import { compressImageForUpload } from "../utils/imageOptimizer";
import { detectCategoryAndSubCategory } from "../utils/categoryResolver";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaTrashAlt,
  FaImages,
  FaPlusCircle,
  FaQuestionCircle,
  FaMagic,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [generatingDetail, setGeneratingDetail] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    categoryId: "",
    subCategoryId: "",
    stock: "",
    additionalInfo: "",
    detail: "",
    weight: "",
    pricePerGram: "",
    pricePerCarat: "",
    size: ""
  });
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [autoDetectedBadge, setAutoDetectedBadge] = useState("");
  const [gallery, setGallery] = useState([]);
  const [initialGalleryUrls, setInitialGalleryUrls] = useState([]);

  const autoDetectCategory = (nameToTest, force = true, cats = categories, allSubs = allSubCategories) => {
    const testName = nameToTest !== undefined ? nameToTest : form.name;
    if (!testName?.trim() || cats.length === 0) return;

    const detected = detectCategoryAndSubCategory(testName, cats, allSubs);
    if (detected.categoryId) {
      const filteredSubs = allSubs.filter(
        (s) => (s.categoryId?._id || s.categoryId) === detected.categoryId
      );
      setSubCategories(filteredSubs);
      setForm((prev) => ({
        ...prev,
        categoryId: detected.categoryId,
        subCategoryId: detected.subCategoryId || (filteredSubs[0]?._id || ""),
      }));
      setAutoDetectedBadge(`${detected.categoryName} > ${detected.subCategoryName || filteredSubs[0]?.name || ""}`);
    }
  };

  // input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // file change: appends new files to the unified gallery
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const newItems = files.map((file, idx) => ({
      id: `new-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
      type: "new",
      url: URL.createObjectURL(file),
      file: file,
    }));
    setGallery((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  // Live Shuffle / Reorder Handlers
  const handleMoveImage = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= gallery.length) return;
    setGallery((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  const handleSetFeatured = (index) => {
    if (index === 0) return;
    handleMoveImage(index, 0);
  };

  const handleRemoveImageItem = (index) => {
    setGallery((prev) => {
      const item = prev[index];
      if (item.type === "new" && item.url) {
        URL.revokeObjectURL(item.url);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  // fetch product
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/products/${id}`);
      const p = res.data.product;

      // Unpack embedded metadata (FAQs, Super Meta Title & Description)
      const unpacked = unpackProductMetadata(p);
      const cleanAdditionalInfo = unpacked.cleanAdditionalInfo || p.additionalInfo || "";
      const formattedAdditionalInfo = formatAdditionalInfo(cleanAdditionalInfo, p);

      setForm({
        name: p.name || "",
        description: p.description || "",
        price: p.price || "",
        discountPrice: p.discountPrice || "",
        categoryId: p.categoryId?._id || "",
        subCategoryId: p.subCategoryId?._id || "",
        stock: p.stock || "",
        additionalInfo: formattedAdditionalInfo,
        detail: p.detail || "",
        weight: p.weight || "",
        pricePerGram: p.pricePerGram || "",
        pricePerCarat: p.pricePerCarat || "",
        size: p.size || "",
        slug: p.slug || ""
      });

      const rawImages = p.images || [];
      const initialGallery = rawImages.map((img, idx) => ({
        id: `existing-${idx}-${Date.now()}`,
        type: "existing",
        url: typeof img === "string" ? img : (img?.url || ""),
        raw: img,
      }));
      setGallery(initialGallery);
      setInitialGalleryUrls(initialGallery.map((item) => item.url));
      setMetaTitle(unpacked.metaTitle || "");
      setMetaDescription(unpacked.metaDescription || "");

      if (unpacked.faqs && unpacked.faqs.length > 0) {
        setFaqs(unpacked.faqs);
      } else {
        setFaqs([{ question: "", answer: "" }]);
      }

      if (p.categoryId?._id) {
        const subRes = await API.get(
          `/subcategories/category/${p.categoryId._id}`
        );
        setSubCategories(subRes.data.subCategories);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleFaqChange = (index, field, value) => {
    setFaqs((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq))
    );
  };

  const handleRemoveFaq = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateShortDetail = async () => {
    if (!form.name.trim()) {
      alert("Please enter a product name first!");
      return;
    }
    setGeneratingDetail(true);
    try {
      const catName = categories.find((c) => c._id === form.categoryId)?.name || "";
      const generated = await generateShortDetail(form.name, catName);
      setForm((prev) => ({
        ...prev,
        detail: generated,
      }));
    } catch (e) {
      console.log("Error generating short detail:", e);
    } finally {
      setGeneratingDetail(false);
    }
  };

  const handleGenerateSuperMeta = () => {
    const categoryName = categories.find((c) => c._id === form.categoryId)?.name || "";
    const generated = generateSuperMetaTags(form.name, categoryName);
    setMetaTitle(generated.metaTitle);
    setMetaDescription(generated.metaDescription);
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const [cRes, sRes] = await Promise.all([
        API.get("/categories"),
        API.get("/subcategories"),
      ]);
      setCategories(cRes.data?.categories || []);
      setAllSubCategories(sRes.data?.subCategories || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    if (!categoryId) {
      setForm((prev) => ({
        ...prev,
        categoryId: "",
        subCategoryId: "",
      }));
      setSubCategories([]);
      setAutoDetectedBadge("");
      return;
    }

    let subs = allSubCategories.filter(
      (s) => (s.categoryId?._id || s.categoryId) === categoryId
    );

    if (subs.length === 0) {
      try {
        const res = await API.get(`/subcategories/category/${categoryId}`);
        subs = res.data?.subCategories || [];
      } catch (err) {
        console.log(err);
      }
    }

    setSubCategories(subs);

    // Auto-select matching subcategory based on product name, or default to first
    const matchedSub =
      subs.find((s) => (form.name || "").toLowerCase().includes((s.name || "").toLowerCase())) ||
      subs[0];

    setForm((prev) => ({
      ...prev,
      categoryId,
      subCategoryId: matchedSub?._id || "",
    }));

    const catObj = categories.find((c) => c._id === categoryId);
    setAutoDetectedBadge(catObj ? `${catObj.name} > ${matchedSub?.name || ""}` : "");
  };

  const handleQuickAiPrice = () => {
    const prodName = form.name.trim();
    if (!prodName) {
      alert("Please enter a product name first to calculate AI Market Price & Weight!");
      return;
    }
    const catName = categories.find((c) => c._id === form.categoryId)?.name || "";
    const specs = estimateProductSpecs(prodName, catName);
    setForm((prev) => ({
      ...prev,
      price: String(specs.suggestedPrice),
      weight: specs.weight,
      size: specs.size,
      pricePerGram: specs.pricePerGram
    }));
    setAutoDetectedBadge(`AI Price: ₹${specs.suggestedPrice.toLocaleString("en-IN")} | Weight: ${specs.weight}`);
    setTimeout(() => setAutoDetectedBadge(""), 5000);
  };

  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const formData = new FormData();

      // Ensure categoryId and subCategoryId are properly resolved
      let finalSubCategoryId = form.subCategoryId;
      if (!finalSubCategoryId && form.categoryId) {
        const matching = allSubCategories.filter(
          (s) => (s.categoryId?._id || s.categoryId) === form.categoryId
        );
        if (matching.length > 0) {
          finalSubCategoryId = matching[0]._id;
        } else if (subCategories.length > 0) {
          finalSubCategoryId = subCategories[0]._id;
        }
      }

      Object.keys(form).forEach((key) => {
        if (key === "subCategoryId") {
          if (finalSubCategoryId) formData.append("subCategoryId", finalSubCategoryId);
        } else if (key !== "additionalInfo" && form[key] !== "" && form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });

      // Filter and append valid FAQs
      const validFaqs = faqs.filter((f) => f.question.trim() || f.answer.trim());
      formData.append("faqs", JSON.stringify(validFaqs));
      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);

      // Pack metadata into additionalInfo so backend MongoDB persistence is 100% guaranteed!
      const packedAdditionalInfo = packProductMetadata({
        additionalInfo: form.additionalInfo,
        faqs: validFaqs,
        metaTitle,
        metaDescription,
        galleryOrder: gallery.filter((item) => item.type === "existing").map((item) => item.url)
      });
      formData.append("additionalInfo", packedAdditionalInfo);

      const seoImageSlug = (form.name || "product")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      if (gallery.length === 0) {
        alert("Please ensure the product has at least 1 image.");
        setSubmitting(false);
        return;
      }

      // Check if gallery was changed by user (new images added, existing removed, or sequence changed)
      const hasNewImages = gallery.some((item) => item.type === "new");
      const currentUrls = gallery.map((item) => item.url);
      const galleryChanged =
        hasNewImages ||
        currentUrls.length !== initialGalleryUrls.length ||
        currentUrls.some((url, idx) => url !== initialGalleryUrls[idx]);

      if (galleryChanged) {
        // User modified images or order: convert all gallery items into Files in the exact user sequence.
        // This guarantees:
        // 1. Existing images are preserved when adding new images.
        // 2. Newly added or reordered image at #1 becomes the true main featured image.
        // 3. Any shuffle order is 100% saved in the database.
        for (let idx = 0; idx < gallery.length; idx++) {
          const item = gallery[idx];
          const ext = "webp";
          const cleanFileName = idx === 0 ? `${seoImageSlug}.${ext}` : `${seoImageSlug}-${idx + 1}.${ext}`;

          if (item.type === "new" && item.file) {
            const compressed = await compressImageForUpload(item.file);
            formData.append("images", compressed, cleanFileName);
          } else if (item.type === "existing") {
            try {
              const imgUrl = typeof item.raw === "string" ? item.raw : (item.raw?.url || item.url);
              if (imgUrl) {
                const res = await fetch(imgUrl);
                if (res.ok) {
                  const blob = await res.blob();
                  const file = new File([blob], cleanFileName, { type: blob.type || "image/webp" });
                  const compressed = await compressImageForUpload(file);
                  formData.append("images", compressed, cleanFileName);
                }
              }
            } catch (fetchErr) {
              console.warn("Could not fetch existing image blob:", fetchErr);
            }
          }
        }
      }

      // Always pass existing images in their exact reordered sequence
      const orderedExisting = gallery
        .filter((item) => item.type === "existing")
        .map((item) => item.raw);
      formData.append("existingImages", JSON.stringify(orderedExisting));

      await API.put(`/products/${id}`, formData);

      alert("Product & SEO Meta Updated Successfully!");
      navigate("/admin-vijay/dashboard");
    } catch (err) {
      console.error("Edit product error:", err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Update failed";
      alert(`Failed to update product: ${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };
  

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (

<div className="min-h-screen bg-gray-100 p-6 md:p-10">

<div className="max-w-5xl mx-auto">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
  <div>
    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
      Edit Product
    </h1>
    <p className="text-gray-500 mt-1 text-sm">
      Update product details with SEO & AI Overview optimization
    </p>
  </div>

  <button
    type="button"
    onClick={() => setShowAiModal(true)}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
  >
    <FaMagic className="text-amber-200 text-sm" />
    <span>✨ AI Content & FAQ Assistant</span>
  </button>
</div>

<AIAssistantModal
  isOpen={showAiModal}
  onClose={() => setShowAiModal(false)}
  productName={form.name}
  categoryName={categories.find((c) => c._id === form.categoryId)?.name || ""}
  onApplyDescription={(html) => setForm((prev) => ({ ...prev, description: html }))}
  onApplyFaqs={(generatedFaqs) => setFaqs(generatedFaqs)}
  onApplyMeta={(meta) => {
    if (meta?.metaTitle) setMetaTitle(meta.metaTitle);
    if (meta?.metaDescription) setMetaDescription(meta.metaDescription);
  }}
  onApplyName={(formattedName) => {
    setForm((prev) => ({ ...prev, name: formattedName }));
    autoDetectCategory(formattedName, true);
  }}
  onApplyCategory={(prodName) => autoDetectCategory(prodName, true)}
  onApplyDetail={(detailText) => setForm((prev) => ({ ...prev, detail: detailText }))}
  onApplyPrice={(price) => setForm((prev) => ({ ...prev, price: String(price) }))}
  onApplyDiscountPrice={(mrp) => setForm((prev) => ({ ...prev, discountPrice: String(mrp) }))}
  onApplyPricePerGram={(rate) => setForm((prev) => ({ ...prev, pricePerGram: String(rate) }))}
  onApplyWeight={(w) => setForm((prev) => ({ ...prev, weight: w }))}
  onApplySize={(s) => setForm((prev) => ({ ...prev, size: s }))}
  onApplyAdditionalInfo={(info) => setForm((prev) => ({ ...prev, additionalInfo: info }))}
/>

<div className="bg-white rounded-3xl shadow-xl p-8">


<form
onSubmit={handleSubmit}
className="space-y-8"
>



<Input
label={
<>
Product Name <span className="text-red-500">*</span>
</>
}
name="name"
value={form.name}
onChange={handleChange}
placeholder="Enter product name"
/>



            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="font-semibold text-gray-700">
                  Details (Short Summary)
                </label>
                <button
                  type="button"
                  onClick={handleGenerateShortDetail}
                  disabled={generatingDetail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {generatingDetail ? (
                    <FaSpinner className="animate-spin text-xs" />
                  ) : (
                    <FaMagic className="text-xs text-amber-200" />
                  )}
                  <span>{generatingDetail ? "Generating..." : "✨ AI Generate Short Details (50-55 words)"}</span>
                </button>
              </div>

              <textarea
                name="detail"
                value={form.detail}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 text-sm leading-relaxed"
                placeholder="Enter concise product details or click 'AI Generate' above (50-55 words max)..."
              />

              <div className="flex justify-between items-center mt-1 px-1 text-xs">
                <span className="text-gray-500">Short summary for top product overview &amp; snippet</span>
                <span
                  className={`font-mono font-semibold ${
                    (form.detail?.trim() ? form.detail.trim().split(/\s+/).length : 0) > 55
                      ? "text-red-600"
                      : (form.detail?.trim() ? form.detail.trim().split(/\s+/).length : 0) >= 45
                      ? "text-emerald-600"
                      : "text-gray-500"
                  }`}
                >
                  {form.detail?.trim() ? form.detail.trim().split(/\s+/).length : 0} / 55 words max
                </span>
              </div>
            </div>

<div>
  <RichTextEditor
    label={
      <>
        Description <span className="text-red-500">*</span>
      </>
    }
    name="description"
    value={form.description}
    onChange={handleChange}
    rows={6}
    placeholder="Enter product description..."
    currentSlug={form.slug || ""}
    currentName={form.name || ""}
  />
</div>





<div className="grid md:grid-cols-2 gap-6">



<Input
label={
  <div className="flex items-center justify-between">
    <span>
      Price <span className="text-red-500">*</span>
    </span>
    <button
      type="button"
      onClick={handleQuickAiPrice}
      className="text-xs text-amber-700 hover:text-amber-800 font-semibold underline flex items-center gap-1 cursor-pointer"
      title="Calculate competitor market price & weight based on mineral density"
    >
      ⚡ AI Market Price &amp; Weight
    </button>
  </div>
}
name="price"
type="text"
value={form.price}
onChange={handleChange}
placeholder="e.g. 5200, 6500, 11/GRAM"
/>

<Input
label ="Weight"
name="weight"
type="text"
value={form.weight}
onChange={handleChange}
placeholder="Enter weight"
/>

<Input
label ="Size"
name="size"
type="text"
value={form.size}
onChange={handleChange}
placeholder="Enter size"
/>

<div className="flex flex-col gap-1.5">
  <div className="flex items-center justify-between">
    <label className="text-xs font-semibold text-gray-700">
      Category <span className="text-red-500">*</span>
    </label>
    <button
      type="button"
      onClick={() => autoDetectCategory(form.name, true)}
      className="text-xs text-amber-700 hover:text-amber-800 font-medium underline flex items-center gap-1 cursor-pointer"
      title="Automatically detect category based on product title"
    >
      ⚡ Auto-detect Category
    </button>
  </div>
  <select
    name="categoryId"
    value={form.categoryId}
    onChange={handleCategoryChange}
    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300 text-sm font-medium"
  >
    <option value="">Select Category</option>
    {categories.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
  {autoDetectedBadge && (
    <span className="text-[11px] text-emerald-700 font-medium">
      ✨ {autoDetectedBadge}
    </span>
  )}
</div>

<div className="flex flex-col gap-1.5">
  <label className="text-xs font-semibold text-gray-700">
    Sub Category <span className="text-red-500">*</span>
  </label>
  <select
    name="subCategoryId"
    value={form.subCategoryId}
    onChange={handleChange}
    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-amber-300 text-sm font-medium"
  >
    <option value="">Select Sub Category</option>
    {subCategories.map((sub) => (
      <option key={sub._id} value={sub._id}>
        {sub.name}
      </option>
    ))}
  </select>
</div>




<Input

label="Stock"

name="stock"

type="number"

value={form.stock}

onChange={handleChange}

placeholder="Available stock"

/>


</div>





<div>
  <RichTextEditor
    label="Additional Information"
    name="additionalInfo"
    value={form.additionalInfo}
    onChange={handleChange}
    rows={4}
    placeholder="Material, size, color, specifications etc."
    currentSlug={form.slug || ""}
    currentName={form.name || ""}
  />
</div>

{/* Product FAQs Section */}
<div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
  <div className="flex items-center justify-between mb-4">
    <div>
      <label className="font-bold text-gray-800 text-base sm:text-lg flex items-center gap-2">
        <FaQuestionCircle className="text-amber-500" />
        <span>Product FAQs (Frequently Asked Questions)</span>
      </label>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">
        Add questions & answers for this product. If left empty, no FAQ section will appear on the product page.
      </p>
    </div>
    <button
      type="button"
      onClick={handleAddFaq}
      className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl border border-amber-200 transition-colors cursor-pointer"
    >
      <FaPlusCircle className="text-sm" />
      <span>Add FAQ</span>
    </button>
  </div>

  {faqs.length === 0 ? (
    <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl bg-gray-50">
      <p className="text-sm text-gray-400">No FAQs added yet.</p>
      <button
        type="button"
        onClick={handleAddFaq}
        className="mt-2 text-xs font-semibold text-indigo-600 hover:underline"
      >
        + Add first FAQ
      </button>
    </div>
  ) : (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 relative space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              FAQ #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveFaq(index)}
              className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 font-medium cursor-pointer"
              title="Delete FAQ"
            >
              <FaTrashAlt className="text-xs" />
              <span>Remove</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => handleFaqChange(index, "question", e.target.value)}
              placeholder="e.g. Is this Sphatik Shivling energized and authentic?"
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Answer
            </label>
            <textarea
              rows={2}
              value={faq.answer}
              onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
              placeholder="e.g. Yes, all our gemstone statues are carved from 100% natural, certified gemstones and safely packaged."
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 leading-relaxed"
            />
          </div>
        </div>
      ))}
    </div>
  )}
</div>

{/* Super SEO Meta Tags Section (Google Search & AI Overview) */}
<div className="bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 border border-indigo-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-3">
    <div>
      <label className="font-bold text-gray-800 text-base sm:text-lg flex items-center gap-2">
        <FaSearch className="text-indigo-600" />
        <span>Super SEO & Meta Tags (Google Search & AI Overviews)</span>
      </label>
      <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
        Custom title and description for Google search results, social shares, and AI bot citations.
      </p>
    </div>

    <button
      type="button"
      onClick={handleGenerateSuperMeta}
      className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer self-start sm:self-auto"
    >
      <FaMagic className="text-amber-300" />
      <span>✨ 1-Click Generate Super SEO Tags</span>
    </button>
  </div>

  <div className="space-y-4">
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-semibold text-gray-700">
          SEO Meta Title
        </label>
        <span
          className={`text-[11px] font-bold ${
            metaTitle.length > 60 ? "text-amber-600" : "text-gray-400"
          }`}
        >
          {metaTitle.length}/60 chars
        </span>
      </div>
      <input
        type="text"
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
        placeholder="e.g. Natural Sphatik Shivling (100% Certified Clear Quartz) | Jaipur Manufacturer"
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
      />
    </div>

    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-semibold text-gray-700">
          SEO Meta Description
        </label>
        <span
          className={`text-[11px] font-bold ${
            metaDescription.length > 160 ? "text-amber-600" : "text-gray-400"
          }`}
        >
          {metaDescription.length}/160 chars
        </span>
      </div>
      <textarea
        rows={3}
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
        placeholder="e.g. Buy handcrafted Natural Sphatik Shivling from Crystal Jaipuria, Jaipur (est. 1989). 100% certified pure natural crystal quartz for home temple & Vastu. Worldwide shipping."
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 leading-relaxed"
      />
    </div>

    {/* Live Google Search Snippet Preview */}
    <div className="p-3.5 bg-white border border-gray-200 rounded-xl shadow-2xs space-y-1">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
        Google Search Result Preview:
      </span>
      <p className="text-xs text-emerald-700 truncate font-mono">
        https://www.crystaljaipuria.com/product/{form.slug || "product-name"}
      </p>
      <p className="text-sm font-semibold text-indigo-800 hover:underline cursor-pointer line-clamp-1">
        {metaTitle || form.name || "Product Title | Crystal Jaipuria"}
      </p>
      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
        {metaDescription || form.detail || "Product description preview..."}
      </p>
    </div>
  </div>
</div>

            {/* Product Image Manager with Live Reorder / Shuffle */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <FaImages className="text-amber-500" />
                    <span>Product Images &amp; Sequence Order</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Image at <strong>#1 (Featured)</strong> is displayed on home page, cards, and Google Shopping. Use arrows or &quot;⭐ Make 1st&quot; to shuffle order.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200 self-start sm:self-auto">
                  {gallery.length} {gallery.length === 1 ? "Image" : "Images"} Total
                </span>
              </div>

              {/* Unified Gallery Grid */}
              {gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {gallery.map((item, index) => (
                    <div
                      key={item.id}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all shadow-sm bg-gray-50 flex flex-col justify-between ${
                        index === 0
                          ? "border-amber-500 ring-2 ring-amber-300/60 bg-amber-50/20"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {/* Image Display */}
                      <div className="relative aspect-square w-full bg-white flex items-center justify-center overflow-hidden">
                        <img
                          src={item.url}
                          alt={`Product View ${index + 1}`}
                          className="w-full h-full object-contain p-2"
                        />
                        {/* Position Badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                          {index === 0 ? (
                            <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                              ⭐ 1st (Featured)
                            </span>
                          ) : (
                            <span className="bg-gray-900/80 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                              #{index + 1} View
                            </span>
                          )}
                          {item.type === "new" && (
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                              NEW
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controls Bar */}
                      <div className="p-2.5 bg-white border-t border-gray-200 flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveImage(index, index - 1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-800 font-bold flex items-center justify-center text-sm transition cursor-pointer"
                            title="Move Left (Earlier in sequence)"
                          >
                            ◀
                          </button>
                          <button
                            type="button"
                            disabled={index === gallery.length - 1}
                            onClick={() => handleMoveImage(index, index + 1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-800 font-bold flex items-center justify-center text-sm transition cursor-pointer"
                            title="Move Right (Later in sequence)"
                          >
                            ▶
                          </button>
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetFeatured(index)}
                              className="px-2 h-8 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                              title="Make this image #1 Featured"
                            >
                              ⭐ Make 1st
                            </button>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveImageItem(index)}
                          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition text-sm cursor-pointer"
                          title="Remove Image"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300 mb-6">
                  No images currently selected. Please upload at least one product image below.
                </div>
              )}

              {/* Upload Drop Area for New Images */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/30 hover:bg-indigo-50/70 rounded-2xl p-6 cursor-pointer transition-all duration-200 group">
                <FaCloudUploadAlt className="text-4xl text-indigo-500 group-hover:scale-110 duration-200 mb-2" />
                <span className="font-semibold text-indigo-950 text-sm sm:text-base">
                  Click to add more images (Select one or multiple)
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP • Newly added images will appear above and can be shuffled or set as Featured
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>







<button
  type="submit"
  disabled={submitting}
  className={`w-full py-4 rounded-xl font-semibold text-lg transition shadow-lg ${
    submitting ? "bg-gray-400 cursor-not-allowed text-white" : "bg-black text-white hover:bg-gray-800"
  }`}
>
  {submitting ? "Uploading & Updating Images..." : "Update Product"}
</button>





</form>



</div>


</div>


</div>

);

};
const Input = ({label,...props}) => (

  <div>

    <label className="block mb-2 font-semibold text-gray-700">
      {label}
    </label>


    <input

      {...props}

      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300 transition"

    />

  </div>

);



export default EditProduct;