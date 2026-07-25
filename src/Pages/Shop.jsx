import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const Shop = () => {


const [products,setProducts] = useState([]);
const [searchParams] = useSearchParams();
const [search,setSearch] = useState(searchParams.get("search") || "");
const [loading,setLoading] = useState(true);

const [page,setPage] = useState(1);
const [totalPages,setTotalPages] = useState(1);



const fetchProducts = async()=>{

try{

const res = await API.get(
`/shop?page=${page}&limit=10`
);


setProducts(res.data.products);
setTotalPages(res.data.totalPages);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};



useEffect(()=>{

fetchProducts();

},[page]);





const filteredProducts = products.filter((product)=>

product.name
?.toLowerCase()
.includes(search.toLowerCase())

);





if(loading){

return(

<div className="
min-h-screen
flex
items-center
justify-center
">

<h2 className="
text-xl
font-semibold
">

Loading Products...

</h2>

</div>

)

}





return(


<div className="
min-h-screen
bg-gray-50
py-8
sm:py-10
">


<div className="
max-w-[1400px]
mx-auto
px-3
sm:px-5
lg:px-8
">





{/* HEADER */}

<div className="
flex
flex-col
md:flex-row
justify-between
items-center
gap-5
mb-8
">


<h1 className="
text-2xl
sm:text-3xl
lg:text-4xl
font-bold
text-gray-800
">

Shop All Products

</h1>



<div className="
w-full
sm:w-[350px]
lg:w-[400px]
relative
">


<input

type="text"

placeholder="Search products..."

value={search}

onChange={(e)=>{

setSearch(e.target.value);
setPage(1);

}}

className="
w-full
px-4
py-3
pr-12
rounded-xl
border
bg-white
shadow-sm
outline-none
focus:ring-2
focus:ring-indigo-500
"

/>


<FaSearch

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-500
"

/>


</div>



</div>








{/* PRODUCT GRID */}


{

filteredProducts.length===0 ?


(


<div className="
text-center
py-20
text-gray-500
text-lg
">

No Products Found

</div>


)

:


(


<div className="
grid

grid-cols-1

sm:grid-cols-2

md:grid-cols-3

lg:grid-cols-4

xl:grid-cols-5

gap-4

sm:gap-5

lg:gap-6

">


{

filteredProducts.map((product)=>(


<ProductCard

key={product._id}

product={product}

/>


))

}


</div>


)


}








{/* PAGINATION */}


<div className="
flex
justify-center
items-center
flex-wrap
gap-2
mt-12
">



<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="
px-3
sm:px-4
py-2
rounded-lg
bg-gray-200
hover:bg-gray-300
disabled:opacity-40
text-sm
sm:text-base
cursor-pointer
">

Prev

</button>







{

Array.from(
{length:totalPages},
(_,index)=>(


<button

key={index}

onClick={()=>setPage(index+1)}

className={`
px-3
sm:px-4
py-2
rounded-lg
text-sm
sm:text-base
cursor-pointer

${
page===index+1
?
"bg-indigo-600 text-white"
:
"bg-gray-200 hover:bg-gray-300"
}

`}

>

{index+1}

</button>


))


}







<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="
px-3
sm:px-4
py-2
rounded-lg
bg-gray-200
hover:bg-gray-300
disabled:opacity-40
text-sm
sm:text-base
cursor-pointer
">

Next

</button>



</div>





</div>


</div>


)


}



export default Shop;