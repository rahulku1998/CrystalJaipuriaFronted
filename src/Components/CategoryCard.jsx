import { Link } from "react-router-dom";


const CategorySection = ({ title, slug, products }) => {


return (

<section className="container mx-auto px-5 py-12">


<div className="flex justify-between items-center mb-8">


<h2 className="text-3xl font-bold">
{title}
</h2>


<Link
to={`/${slug}`}
className="text-indigo-600 font-semibold"
>
View All →
</Link>


</div>



<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">


{
products?.map(product => (


<Link
key={product._id}
to={`/product/${product._id}`}
className="
rounded-[30px]
shadow-md
overflow-hidden
bg-white
hover:shadow-xl
transition
border
border-gray-100
"
>


<div
className="
h-56
bg-gray-50
m-3
rounded-[25px]
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
h-full
w-full
object-contain
p-5
"
/>


</div>



<div className="px-4 pb-5 text-center">


<h3
className="
text-base
font-semibold
text-gray-800
leading-6
min-h-[48px]
"
>
{product.name}
</h3>



<p
className="
mt-2
text-lg
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


</section>

)


}


export default CategorySection;