import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { formatPrice } from "../utils/price";
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

  const renderFaqSection = () => {
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

    if (productFaqs.length === 0) return null;

    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
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

        <div className="p-3 sm:p-4 space-y-2.5 max-h-[380px] sm:max-h-[460px] overflow-y-auto overscroll-contain">
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
    );
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-1 text-indigo-600 font-semibold hover:underline cursor-pointer text-sm sm:text-base"
        >
          ← Back to Products
        </button>







<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-8
lg:gap-12
">






{/* LEFT IMAGE SECTION */}


<div>



<img

src={selectedImage}

alt={product.name}

className="
w-full
h-[300px]
sm:h-[420px]
lg:h-[550px]
object-contain
rounded-xl
shadow
bg-gray-100
"

/>







<div className="
flex
gap-3
mt-5
flex-wrap
">


{

product.images.map((img, idx)=>(


<img

key={img.public_id || idx}

src={img.url}

alt={product.name}

onClick={() => {
  setSelectedImage(img.url);
  trackGalleryClick(idx, product);
}}

className={`
w-16
h-16
sm:w-20
sm:h-20
md:w-24
md:h-24
object-cover
rounded-lg
cursor-pointer
border-2

${
selectedImage === img.url
?
"border-orange-500"
:
"border-gray-300"
}

`}


/>


))


}

</div>

{/* Desktop FAQs Placement (Side-by-side with Description) */}
<div className="hidden lg:block mt-8">
  {renderFaqSection()}
</div>

</div>









{/* RIGHT PRODUCT INFO */}


<div>



<h1 className="
text-2xl
sm:text-3xl
lg:text-4xl
font-bold
leading-tight
">

{product.name}

</h1>






<div className="
flex
flex-wrap
items-center
gap-3
mt-5
">


{product.price && (
  <span className="text-2xl sm:text-3xl font-bold text-indigo-600">
    {formatPrice(product.price)}
  </span>
)}
</div>







{
product.detail && (

<div className="mt-5">

<p className="
text-gray-600
text-sm
sm:text-base
leading-7
">

{product.detail}

</p>

</div>

)

}







<div className="
mt-7
space-y-3
text-sm
sm:text-base
">


{

product.weight && (

<p>

<span className="font-semibold text-indigo-600">

Weight :

</span>

{" "}{product.weight}

</p>

)

}






{

product.size && (

<p>

<span className="font-semibold text-indigo-600">

Size :

</span>

{" "}{product.size}

</p>

)

}







<p>

<span className="font-semibold">

Availability :

</span>


{" "}


{

product.stock > 0 ?


<span className="text-green-600">

In Stock

</span>


:

<span className="text-red-600">

Out Of Stock

</span>


}


</p>



</div>







<div className="grid grid-cols-2 gap-4 mt-8">

  {/* Row 1 - WhatsApp */}
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackWhatsAppClick("product_details_enquire_button", product)}
    className="block text-center bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition"
  >
    <FaWhatsapp className="inline mr-2" /> Enquire Now
  </a>

  {/* Row 1 - Call Now */}
  <a
    href="tel:+918955613237"
    onClick={() => trackContactClick("phone", "+918955613237")}
    className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition"
  >
   📞 Call Now
  </a>

  {/* Row 2 - Request a Query */}
  <button
    type="button"
    onClick={() => {
      setShowQueryForm(true);
      trackQueryModalOpen(product);
    }}
    className="col-span-2 text-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition cursor-pointer"
  >
    💬 Request a Query
  </button>

</div>
{showQueryForm && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">

      {querySubmitted ? (

        /* SUCCESS */
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-6 py-12">

          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                ✓
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Thank You!
          </h2>

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
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b px-5 sm:px-6 py-4 rounded-t-2xl">

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Request a Query
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Send your enquiry directly on WhatsApp
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowQueryForm(false)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-2xl transition"
            >
              ×
            </button>

          </div>

          {/* Form */}
          <form
            onSubmit={handleQuerySubmit}
            className="p-5 sm:p-6 space-y-4"
          >

            {/* YAHAN TERA PURA EXISTING FORM SAME RAHEGA */}

            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Name
              </label>

              <input
                type="text"
                value={product?.name || ""}
                readOnly
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Full Name */}
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

            {/* WhatsApp + Email */}
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

            {/* Country */}
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

            {/* Quantity + Weight */}
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

            {/* Message */}
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

            {/* Submit */}
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




<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

  {/* Authentic Product */}
  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="text-2xl">✨</div>
    <div>
      <h3 className="font-semibold text-gray-800">
        100% Authentic
      </h3>
      <p className="text-sm text-gray-500">
        Genuine & Premium Products
      </p>
    </div>
  </div>

  {/* Fast Delivery */}
  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="text-2xl">🚚</div>
    <div>
      <h3 className="font-semibold text-gray-800">
        Easy & Fast Delivery
      </h3>
      <p className="text-sm text-gray-500">
        Safe & Quick Doorstep Delivery
      </p>
    </div>
  </div>

  {/* Secure Shopping */}
  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="text-2xl">🔒</div>
    <div>
      <h3 className="font-semibold text-gray-800">
        Secure Shopping
      </h3>
      <p className="text-sm text-gray-500">
        Safe & Trusted Experience
      </p>
    </div>
  </div>

</div>



{/* SHARE */}


<div className="mt-8">


<h3 className="
font-semibold
text-lg
sm:text-xl
mb-4
">

Share Product

</h3>



<div className="
flex
flex-wrap
gap-4
items-center
">


<a
href={whatsappShare}
target="_blank"
rel="noopener noreferrer"
onClick={() => trackProductShare("whatsapp", product)}
className="text-green-600 text-3xl hover:scale-110 transition"
>

<FaWhatsapp/>

</a>



<a
href={facebookShare}
target="_blank"
rel="noopener noreferrer"
onClick={() => trackProductShare("facebook", product)}
className="text-blue-600 text-3xl hover:scale-110 transition"
>

<FaFacebook/>

</a>




<a
href={twitterShare}
target="_blank"
rel="noopener noreferrer"
onClick={() => trackProductShare("twitter", product)}
className="text-black text-3xl hover:scale-110 transition"
>

<FaTwitter/>

</a>




<a
href={linkedinShare}
target="_blank"
rel="noopener noreferrer"
onClick={() => trackProductShare("linkedin", product)}
className="text-blue-700 text-3xl hover:scale-110 transition"
>

<FaLinkedin/>

</a>





<button

onClick={copyLink}

className="
text-gray-700
text-3xl
hover:scale-110
transition
cursor-pointer
"

>

<FaLink/>

</button>



</div>




{
copied && (

<p className="
text-green-600
mt-3
">

Link copied!

</p>

)

}



</div>

<div className="
mt-10
sm:mt-16
border
rounded-xl
overflow-hidden
">


{/* Tabs Header */}

<div className="
flex
flex-col
sm:flex-row
border-b
">


<button

onClick={() => {
  setActiveTab("description");
  trackTabSwitch("description", product);
}}

className={`
px-5
py-3
sm:px-8
sm:py-4
font-semibold
text-base
sm:text-lg
cursor-pointer
text-left

${
activeTab==="description"
?
"border-b-2 border-indigo-500 text-indigo-600"
:
"text-gray-500"
}

`}

>

Description

</button>





<button

onClick={() => {
  setActiveTab("additional");
  trackTabSwitch("additional", product);
}}

className={`
px-5
py-3
sm:px-8
sm:py-4
font-semibold
text-base
sm:text-lg
cursor-pointer
text-left

${
activeTab==="additional"
?
"border-b-2 border-indigo-500 text-indigo-600"
:
"text-gray-500"
}

`}

>

Additional Information

</button>



</div>





{/* Tab Content */}


<div className="p-5 sm:p-8 min-h-[150px]">
{activeTab === "description" && (
  <div className="relative">
    <div
      className="text-gray-700 text-sm sm:text-base leading-7 sm:leading-8 prose max-w-none max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-3 overscroll-contain focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1.5 [&_p]:my-3 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2"
      dangerouslySetInnerHTML={{ __html: product.description || "No description available." }}
    />
  </div>
)}

{activeTab === "additional" && (
  <div
    className="text-gray-700 text-sm sm:text-base leading-7 sm:leading-8 prose max-w-none max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-3 overscroll-contain focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1.5 [&_p]:my-3 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:p-2 [&_td]:border [&_td]:p-2"
    dangerouslySetInnerHTML={{
      __html: product.additionalInfo || "No additional information available.",
    }}
  />
)}
</div>

</div>

{/* Mobile / Tablet FAQs Placement (Stacked neatly below Description) */}
<div className="block lg:hidden mt-8">
  {renderFaqSection()}
</div>

</div>


</div>










{/* RELATED PRODUCTS */}


{

relatedProducts.length > 0 && (


<div className="
mt-12
sm:mt-16
">


<h2 className="
text-2xl
sm:text-3xl
font-bold
mb-6
sm:mb-8
">

You May Also Like

</h2>






<div className="
grid
grid-cols-2
sm:grid-cols-3
lg:grid-cols-5
gap-4
sm:gap-6
">



{

relatedProducts.map((item)=>(


<div

key={item._id}

onClick={()=>navigate(`/product/${item.slug || item._id}`)}

className="
bg-white
rounded-xl
shadow
hover:shadow-lg
cursor-pointer
overflow-hidden
transition
"


>




<img

src={item.images?.[0]?.url}

alt={item.name}

className="
w-full
h-32
sm:h-40
lg:h-48
object-cover
"

/>






<div className="
p-3
sm:p-4
">



<h3 className="
font-semibold
text-sm
sm:text-base
line-clamp-2
">

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



))


}




</div>



</div>


)


}




</div>
</>
);
};


export default ProductDetails;