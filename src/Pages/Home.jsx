import React, { useEffect, useState } from "react";
import API from "../api/axios";
import CategorySection from "../Components/CategoryCard";
import SEO from "../Components/SEO";
import homeImg from "../assets/images/banner-divine.webp";
import StatsSection from "../Components/StatsSection";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/price";
import AboutGemstoneSection from "../Components/about";
import FAQSection from "../Components/FAQSection";
import GoogleReviewsSection from "../Components/GoogleReviewsSection";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/home");
        setProducts(res.data.latestProducts || []);
        setCategories(res.data.categories || []);
        setCategoryProducts(res.data.categoryProducts || {});
      } catch (err) {
        console.log("Home data fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SEO
        title="Gemstone God Statues Manufacturer in India | Crystal Jaipuria"
        description="Leading gemstone god statues manufacturer & wholesaler in Jaipur, India. Hand-carved crystal idols, Vastu decor & healing stones. Global shipping since 1989."
        canonical="https://www.crystaljaipuria.com/"
        ogTitle="Gemstone God Statues Manufacturer in India | Crystal Jaipuria"
        ogDescription="Leading manufacturer & wholesaler of authentic gemstone god statues & crystal carvings in Jaipur since 1989. Shop hand-carved Ganesha idols, Vastu products & healing crystals. Worldwide shipping available."
        twitterTitle="Gemstone God Statues Manufacturer in India | Crystal Jaipuria"
        twitterDescription="Leading manufacturer & wholesaler of authentic gemstone god statues & crystal carvings in Jaipur since 1989. Shop hand-carved Ganesha idols, Vastu products & healing crystals. Worldwide shipping available."
        image="https://www.crystaljaipuria.com/logo.png"
        type="website"
      />
      <section className="w-full">

<AboutGemstoneSection/>




{/* PRODUCTS SECTION */}


<div className="
container
mx-auto

px-4
sm:px-6
lg:px-8

py-10
sm:py-14
lg:py-16
">



<div className="
flex
justify-between
items-center
mb-6
sm:mb-8
">


<h2 className="
text-2xl
sm:text-3xl
lg:text-4xl
font-bold
text-gray-800
">

Our Products

</h2>


</div>







<div className="
grid

grid-cols-2

sm:grid-cols-2

md:grid-cols-3

lg:grid-cols-4

xl:grid-cols-5

gap-3

sm:gap-4

">





{

products.slice(0,5).map((product)=>(



<Link

key={product._id}

to={`/products/${product.slug}`}

className="
group
bg-white
rounded-3xl
overflow-hidden
shadow-md
hover:shadow-xl
transition-all
duration-300
cursor-pointer
border
border-gray-100
"

>



{/* IMAGE */}


<div className="
h-44

sm:h-56

md:h-60

lg:h-64

bg-gray-50

rounded-3xl

m-3

overflow-hidden

flex

items-center

justify-center

">


<img

loading="lazy"

src={product.images?.[0]?.url}

alt={product.name}

className="
w-full
h-full
object-contain

p-2
sm:p-5

group-hover:scale-110

transition-transform

duration-300
"

/>


</div>





{/* DETAILS */}



<div className="
px-3
sm:px-4
pb-5
text-center
">


<h3 className="
text-base

sm:text-lg

font-semibold

text-gray-800

break-words

line-clamp-2

">

{product.name}

</h3>



{product.price && (
  <p className="mt-2 text-lg sm:text-xl font-bold text-indigo-600">
    <span>Price: </span>
    {formatPrice(product.price)}
  </p>
)}




</div>




</Link>



))


}





</div>



</div>









{/* BANNER */}



{/* BANNER */}
<div className="w-full my-6 sm:my-10 overflow-hidden">
  <Link to="/shop" className="block w-full">
    <img
      src={homeImg}
      loading="eager"
      alt="Handcrafted Gemstone God Statues, Vastu Decor & Healing Crystals Manufacturer - Crystal Jaipuria"
      className="w-full aspect-[1898/721] max-h-[721px] object-cover object-center block"
    />
  </Link>
</div>









{/* CATEGORY */}



<div className="mt-8 sm:mt-12">


{

categories.map((category)=>(


<CategorySection


key={category._id}

title={category.name}

slug={category.slug}

products={categoryProducts[category._id] || []}


/>


))


}



</div>








<StatsSection />

<GoogleReviewsSection />

<FAQSection />









{/* CONTACT */}



<section className="
bg-gradient-to-r
from-indigo-50
to-purple-50

py-10
sm:py-16

">



<div className="
container
mx-auto

px-4
sm:px-6

">



<div className="
max-w-4xl
mx-auto

bg-white

rounded-3xl

shadow-lg

p-6

sm:p-10

text-center

">





<h2 className="
text-3xl

sm:text-4xl

font-bold

text-gray-800

mb-4

">

Get in Touch

</h2>







<p className="
text-gray-600

text-base

sm:text-lg

mb-8
">

Looking for premium crystal products, customized gifts, or bulk
orders? We'd love to hear from you.

</p>







<div className="
flex

flex-col

sm:flex-row

justify-center

gap-4

">





<Link

to="/contact"

className="
px-8
py-3

bg-indigo-600

text-white

rounded-full

font-semibold

hover:bg-indigo-700

transition

text-center

"

>

Contact Us

</Link>







<a

href="https://wa.me/918955613237"

target="_blank"

rel="noopener noreferrer"

className="
px-8
py-3

border-2

border-green-600

text-green-600

rounded-full

font-semibold

hover:bg-green-600

hover:text-white

transition

text-center

"

>

WhatsApp Us

</a>







<a

href="https://mail.google.com/mail/?view=cm&fs=1&to=crystaljaipurya@gmail.com"

target="_blank"

className="
px-8
py-3

bg-indigo-600

text-white

rounded-lg

text-center

"

>

Email

</a>




</div>





</div>


</div>


</section>






</section>
</>
);

};

export default Home;