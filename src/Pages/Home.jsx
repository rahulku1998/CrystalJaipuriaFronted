import React, { useEffect, useState } from "react";
import API from "../api/axios";
import CategorySection from "../Components/CategoryCard";

import homeImg from "../assets/images/mama5.png";
import StatsSection from "../Components/StatsSection";
import { Link } from "react-router-dom";
import AboutGemstoneSection from "../Components/about";

const Home = () => {


const [products,setProducts] = useState([]);
const [categories,setCategories] = useState([]);
const [categoryProducts,setCategoryProducts] = useState({});





useEffect(()=>{

const fetchData = async()=>{

try{

const res = await API.get("/home");

setProducts(res.data.latestProducts);
setCategories(res.data.categories);
setCategoryProducts(res.data.categoryProducts);


}
catch(err){

console.log(err);

}

};


fetchData();


},[]);





return (



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



<p className="
mt-2

text-lg

sm:text-xl

font-bold

text-indigo-600
">
  
<span>Price: </span>
₹ {product.price}

</p>

{product.pricePerGram && (
<p className="
mt-2

text-lg

sm:text-xl

font-bold

text-green-700
">
<span>price/gram: </span>
₹ {product.pricePerGram}

</p>
)}
{product.pricePerCarat && (
<p className="
mt-2
text-lg

sm:text-xl
font-bold

text-yellow-700
">
  <span>price/carat: </span>
  ₹ {product.pricePerCarat}
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


<Link to="/shop">


<img

src={homeImg}

loading="eager"

alt="Home Banner"

className="
block

w-full

h-auto

sm:h-[500px]

md:h-[600px]

lg:h-screen

object-cover

object-center

"

/>


</Link>









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


);

};


export default Home;