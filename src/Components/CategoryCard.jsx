import { Link } from "react-router-dom";


const CategorySection = ({ title, slug, products }) => {


return (

<section className="
w-full
overflow-hidden
py-10
sm:py-12
">


<div className="
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8
">



{/* HEADER */}

<div className="
flex
justify-between
items-center
mb-6
sm:mb-8
gap-3
">


<h2 className="
text-2xl
sm:text-3xl
font-bold
text-gray-800
truncate
">

{title}

</h2>



<Link

to={`/${slug}`}

className="
text-indigo-600
font-semibold
text-sm
sm:text-base
whitespace-nowrap
"

>

View All →

</Link>


</div>







{/* PRODUCTS */}


<div className="
grid

grid-cols-2

min-[400px]:grid-cols-2

sm:grid-cols-3

md:grid-cols-4

lg:grid-cols-5

gap-4

sm:gap-6

">



{

products?.map(product=>(


<Link

key={product._id}

to={`/product/${product._id}`}

className="
group
w-full
bg-white
rounded-3xl
overflow-hidden
shadow-md
hover:shadow-xl
transition
border
border-gray-100
"

>



{/* IMAGE */}


<div

className="
w-full
h-60
sm:h-56
md:h-60
bg-gray-50
m-0
sm:m-3
sm:w-auto
rounded-3xl
flex
items-center
justify-center
overflow-hidden
"

>


<img

loading="lazy"

src={product.images?.[0]?.url}

alt={product.name}

className="
w-full
h-full
object-contain
p-4
group-hover:scale-110
transition
duration-300
"

/>


</div>







{/* DETAILS */}


<div className="
px-3
sm:px-4
pb-4
sm:pb-5
text-center
">


<h3

className="
text-sm
sm:text-base
font-semibold
text-gray-800
leading-5
line-clamp-2
min-h-[40px]
"

>

{product.name}

</h3>




<p

className="
mt-2
text-base
sm:text-lg
font-bold
text-indigo-600
"

>

₹ {product.price}

</p>



</div>



</Link>


))

}



</div>




</div>


</section>


)


}


export default CategorySection;