import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaLink
} from "react-icons/fa";


const ProductDetails = () => {


  const { id } = useParams();

  const navigate = useNavigate();


  const [activeTab, setActiveTab] = useState("description");

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [copied, setCopied] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState([]);





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


      const data = res.data.product;


      setProduct(data);


      fetchRelatedProducts(data);



      if(data.images.length > 0){

        setSelectedImage(data.images[0].url);

      }



    } catch(err){

      console.log(err);

    }


  };








  if(!product){

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-xl
        sm:text-2xl
      ">

        Loading...

      </div>

    );

  }







  const whatsappMessage =
  `Hi, I am interested in buying "${product.name}". Please share more details.`;



  const whatsappLink =
  `https://wa.me/918955613237?text=${encodeURIComponent(
    whatsappMessage
  )}`;






  const shareUrl = window.location.href;


  const shareText =
  `Check out this amazing product: ${product.name}`;





  const whatsappShare =
  `https://wa.me/?text=${encodeURIComponent(
    shareText + " " + shareUrl
  )}`;



  const facebookShare =
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;



  const twitterShare =
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}`;





  const linkedinShare =
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;





  const copyLink = async()=>{

    await navigator.clipboard.writeText(shareUrl);

    setCopied(true);


    setTimeout(()=>{

      setCopied(false);

    },2000);


  };







return (

<div className="
  max-w-7xl
  mx-auto
  px-4
  sm:px-6
  py-8
  sm:py-10
">



<button

onClick={()=>navigate(-1)}

className="
mb-5
flex
items-center
gap-1
text-indigo-600
font-semibold
hover:underline
cursor-pointer
text-sm
sm:text-base
"

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

product.images.map((img)=>(


<img

key={img.public_id}

src={img.url}

alt={product.name}

onClick={()=>setSelectedImage(img.url)}

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


{

product.discountPrice ? (

<>

<span className="
text-2xl
sm:text-3xl
font-bold
text-indigo-600
">

₹{product.discountPrice}

</span>


<span className="
line-through
text-gray-500
text-lg
sm:text-xl
">

₹{product.price}

</span>


</>

):(


<span className="
text-2xl
sm:text-3xl
font-bold
text-indigo-600
">

₹{product.price}

</span>


)


}


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







<a

href={whatsappLink}

target="_blank"

rel="noopener noreferrer"

className="
block
text-center
mt-8
bg-green-600
hover:bg-green-700
text-white
px-6
py-3
sm:py-4
rounded-lg
text-base
sm:text-lg
font-semibold
transition
"

>

Buy on WhatsApp

</a>








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
className="text-green-600 text-3xl hover:scale-110 transition"
>

<FaWhatsapp/>

</a>



<a
href={facebookShare}
target="_blank"
rel="noopener noreferrer"
className="text-blue-600 text-3xl hover:scale-110 transition"
>

<FaFacebook/>

</a>




<a
href={twitterShare}
target="_blank"
rel="noopener noreferrer"
className="text-black text-3xl hover:scale-110 transition"
>

<FaTwitter/>

</a>




<a
href={linkedinShare}
target="_blank"
rel="noopener noreferrer"
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

onClick={()=>setActiveTab("description")}

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

onClick={()=>setActiveTab("additional")}

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


<div className="
p-5
sm:p-8
min-h-[150px]
">


{

activeTab==="description" && (

<p className="
text-gray-600
text-sm
sm:text-base
leading-7
sm:leading-8
">

{product.description}

</p>

)

}





{

activeTab==="additional" && (

<p className="
text-gray-600
text-sm
sm:text-base
leading-7
sm:leading-8
">

{
product.additionalInfo ||
"No additional information available."
}

</p>

)

}



</div>



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

onClick={()=>navigate(`/product/${item._id}`)}

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


<span className="
font-bold
text-red-600
text-sm
sm:text-base
">

₹{item.discountPrice || item.price}

</span>



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



);
};


export default ProductDetails;