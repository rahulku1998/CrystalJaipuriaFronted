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
import { generateShortDetail } from "../utils/aiGenerator";
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
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // file change (appends new files so multiple clicks/files work seamlessly)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const handleRemoveNewImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreview((prev) => {
      if (prev[indexToRemove]) URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, i) => i !== indexToRemove);
    });
  };

  const handleClearAllNewImages = () => {
    preview.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setPreview([]);
  };

  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== indexToRemove));
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

      setExistingImages(p.images || []);
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
      const res = await API.get("/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setForm({
      ...form,
      categoryId,
      subCategoryId: ""
    });

    const res = await API.get(`/subcategories/category/${categoryId}`);
    setSubCategories(res.data.subCategories);
  };

  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "additionalInfo" && form[key] !== "" && form[key] !== null && form[key] !== undefined) {
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
        metaDescription
      });
      formData.append("additionalInfo", packedAdditionalInfo);

      const seoImageSlug = (form.name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      images.forEach((img, idx) => {
        const ext = (img.name?.split(".").pop() || "jpg").toLowerCase();
        formData.append("images", img, `${seoImageSlug}-${idx + 1}.${ext}`);
      });

      formData.append("existingImages", JSON.stringify(existingImages));

      await API.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product & SEO Meta Updated Successfully!");
      navigate("/admin-vijay/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
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
  onApplyName={(formattedName) => setForm((prev) => ({ ...prev, name: formattedName }))}
  onApplyDetail={(detailText) => setForm((prev) => ({ ...prev, detail: detailText }))}
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
  />
</div>





<div className="grid md:grid-cols-2 gap-6">



<Input

label={<>

Price <span className="text-red-500">*</span>

</>}

name="price"

type="text"

value={form.price}
onChange={handleChange}
placeholder="e.g. 1000, 6/GRAM, 500/carat"
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

<select
name="categoryId"
value={form.categoryId}
onChange={handleCategoryChange}
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"
>

<option value="">
Select Category
</option>

{
categories.map((cat)=>(
<option key={cat._id} value={cat._id}>
{cat.name}
</option>
))
}

</select>



<select
name="subCategoryId"
value={form.subCategoryId}
onChange={handleChange}
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"
>

<option value="">
Select Sub Category
</option>

{
subCategories.map((sub)=>(
<option key={sub._id} value={sub._id}>
{sub.name}
</option>
))
}

</select>




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

{/* Existing Images */}
{existingImages.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaImages className="text-indigo-600" />
                    <span>Current Product Images</span>
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full border">
                    {existingImages.length} {existingImages.length === 1 ? "Image" : "Images"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {existingImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white aspect-square"
                    >
                      <img
                        src={img.url}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                        #{index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(index)}
                        className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
                        title="Remove existing image"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaCloudUploadAlt className="text-indigo-600 text-lg" />
                  <span>Upload More / New Images (Multiple Supported)</span>
                </label>
                {preview.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                      {preview.length} New {preview.length === 1 ? "Image" : "Images"} Selected
                    </span>
                    <button
                      type="button"
                      onClick={handleClearAllNewImages}
                      className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <FaTrashAlt className="text-xs" />
                      Clear New
                    </button>
                  </div>
                )}
              </div>

              {/* Upload Drop Area */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/80 rounded-2xl p-6 cursor-pointer transition-all duration-200 group">
                <FaCloudUploadAlt className="text-4xl text-indigo-500 group-hover:scale-110 duration-200 mb-2" />
                <span className="font-semibold text-indigo-900 text-sm sm:text-base">
                  Click to select multiple new images
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP • You can select multiple images or add them in batches
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* New Previews Grid */}
              {preview.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-5">
                  {preview.map((img, index) => (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden shadow-md border-2 border-indigo-400 bg-white aspect-square"
                    >
                      <img
                        src={img}
                        alt={`New Preview ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                        NEW #{index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(index)}
                        className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
                        title="Remove new image"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>







<button

type="submit"

className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition shadow-lg"

>

Update Product

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