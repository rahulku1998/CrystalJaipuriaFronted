import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { 
  FaWhatsapp, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaLink 
} from "react-icons/fa";
const ProductDetails = () => {
  const { id } = useParams();
const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [copied, setCopied] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetchProduct();
  }, [id]);

const fetchRelatedProducts = async (product) => {
  try {
    const res = await API.get(
      `/products/category/${product.categoryId._id}`
    );
    setRelatedProducts(res.data.products);
  } catch(err){
    console.log(err);
  }
};


  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);

      setProduct(res.data.product);
      fetchRelatedProducts(res.data.product);
            console.log(res.data.product);
      if (res.data.product.images.length > 0) {
        setSelectedImage(res.data.product.images[0].url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading...
      </div>
    );
  }


  
  
  const whatsappMessage = `Hi, I am interested in buying "${product.name}". Please share more details.`;

  const whatsappLink = `https://wa.me/918955613237?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  const shareUrl = window.location.href;

const shareText = `Check out this amazing product: ${product.name}`;

const whatsappShare = `https://wa.me/?text=${encodeURIComponent(
  shareText + " " + shareUrl
)}`;

const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  shareUrl
)}`;

const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  shareText
)}&url=${encodeURIComponent(shareUrl)}`;

const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
  shareUrl
)}`;

const copyLink = async () => {
  await navigator.clipboard.writeText(shareUrl);
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

  return (
    
    <div className="max-w-7xl mx-auto px-5 py-10">
       <button
      onClick={() => navigate((-1))}
      className="mb-1 flex items-center gap-1 text-indigo-600 font-semibold hover:underline cursor-pointer"
    >
      ← Back to Products
    </button>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* LEFT */}

        <div>

          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[550px] object-contain rounded-xl shadow bg-gray-100"
          />

          <div className="flex gap-3 mt-5 flex-wrap">

            {product.images.map((img) => (
              <img
                key={img.public_id}
                src={img.url}
                alt=""
                onClick={() => setSelectedImage(img.url)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img.url
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
              />
            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-6">

            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-indigo-600">
                  ₹{product.discountPrice}
                </span>

                <span className="line-through text-gray-500 text-xl">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-indigo-600">
                ₹{product.price}
              </span>
            )}

          </div>

          {product.detail && (
  <div className="mt-5">

    <p className="text-gray-600 leading-7 text-base">
      {product.detail}
    </p>

  </div>
)}

          

          

          <div className="mt-8 space-y-3">
            
            <p>
  {
  product.weight && (
    <>
      <span className="font-semibold text-indigo-600">Weight : {product.weight}</span>{" "}
      
    </>
  )}
</p>
<p>
  {
  product.size && (
    <>
      <span className="font-semibold text-indigo-600">Size :  {product.size}</span>{" "}
     
    </>
  )}
</p>

            

            <p>
              <span className="font-semibold">Availability :</span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out Of Stock</span>
              )}
            </p>

          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Buy on WhatsApp
          </a>
          <div className="mt-8">

  <h3 className="font-semibold text-xl mb-4">
    Share Product
  </h3>

  <div className="flex gap-4 items-center">


    {/* WhatsApp */}
    <a
      href={whatsappShare}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 text-3xl hover:scale-110 transition"
      title="Share on WhatsApp"
    >
      <FaWhatsapp />
    </a>


    {/* Facebook */}
    <a
      href={facebookShare}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 text-3xl hover:scale-110 transition"
      title="Share on Facebook"
    >
      <FaFacebook />
    </a>


    {/* Twitter */}
    <a
      href={twitterShare}
      target="_blank"
      rel="noopener noreferrer"
      className="text-black text-3xl hover:scale-110 transition"
      title="Share on Twitter"
    >
      <FaTwitter />
    </a>


    {/* LinkedIn */}
    <a
      href={linkedinShare}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-700 text-3xl hover:scale-110 transition"
      title="Share on LinkedIn"
    >
      <FaLinkedin />
    </a>


    {/* Copy Link */}
    <button
      onClick={copyLink}
      className="text-gray-700 text-3xl hover:scale-110 transition cursor-pointer"
      title="Copy Product Link"
    >
      <FaLink />
    </button>


  </div>

  {copied && (
    <p className="text-green-600 mt-3">
      Link copied!
    </p>
  )}

   {/* Product Tabs */}

<div className="mt-16 border rounded-xl overflow-hidden">

  {/* Tabs Header */}
  <div className="flex border-b">

    <button
      onClick={() => setActiveTab("description")}
      className={`px-8 py-4 font-semibold text-lg cursor-pointer ${
        activeTab === "description"
          ? "border-b-2 border-indigo-500 text-indigo-600"
          : "text-gray-500"
      }`}
    >
      Description
    </button>


    <button
      onClick={() => setActiveTab("additional")}
      className={`px-8 py-4 font-semibold text-lg cursor-pointer ${
        activeTab === "additional"
          ? "border-b-2 border-indigo-500 text-indigo-600"
          : "text-gray-500"
      }`}
    >
      Additional Information
    </button>


  </div>


  {/* Tab Content */}

  <div className="p-8 min-h-[180px]">

    {activeTab === "description" && (
      <p className="text-gray-600 leading-8">
        {product.description}
      </p>
    )}


    {activeTab === "additional" && (
      <p className="text-gray-600 leading-8">
        {product.additionalInfo || "No additional information available."}
      </p>
    )}

  </div>


</div>



</div>
        </div>
        

      </div>
      {/* You May Also Like */}

{relatedProducts.length > 0 && (

<div className="mt-16">

<h2 className="text-3xl font-bold mb-8">
  You May Also Like
</h2>


<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">


{relatedProducts.map((item)=>(

<div
key={item._id}
onClick={() => navigate(`/product/${item._id}`)}
className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition"
>


<img
src={item.images?.[0]?.url}
alt={item.name}
className="w-full h-48 object-cover"
/>


<div className="p-4">

<h3 className="font-semibold line-clamp-2">
{item.name}
</h3>


<div className="mt-2">

<span className="font-bold text-red-600">
₹{item.discountPrice || item.price}
</span>


</div>


</div>


</div>


))}


</div>

</div>

)}

    </div>







  );
};

export default ProductDetails;