import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [subCategories,setSubCategories] = useState([]);
  const [search,setSearch] = useState("");
const [blogs,setBlogs] = useState([]);
  const navigate = useNavigate();


  const fetchData = async()=>{

    try{

      const productRes = await API.get("/products");
      const catRes = await API.get("/categories");
      const subCatRes = await API.get("/subcategories");
      const blogRes = await API.get("/blogs");


      setProducts(productRes.data.products || []);
      setCategories(catRes.data.categories || []);
      setSubCategories(subCatRes.data.subCategories || []);
      setBlogs(blogRes.data.blogs || []);


    }catch(err){
      console.log(err);
    }

  };


  useEffect(()=>{
    fetchData();
  },[]);



  const handleDelete = async(id)=>{

    if(!window.confirm("Delete this product?"))
      return;


    try{

      await API.delete(`/products/${id}`);

      fetchData();

    }catch(err){

      alert("Delete failed");

    }

  };



  const filteredProducts = products.filter((p)=>
    p.name.toLowerCase()
    .includes(search.toLowerCase())
  );



return (

<div className="flex min-h-screen bg-gray-100">


{/* SIDEBAR */}

<div className="w-64 bg-slate-900 text-white p-6">

<Link
      to="/"
      className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-xl bg-white text-indigo-600 font-semibold border  hover:bg-blue-100 border-gray-200  hover:text-indigo-800 "
    >
      ← Back To Website
    </Link>
<h1 className="text-2xl font-bold mb-8">
Admin Panel
</h1>


<div className="space-y-3">


<button
className="adminBtn cursor-pointer text-indigo-600 hover:text-indigo-800"
onClick={()=>navigate("/admin/dashboard")}
>
📊 Dashboard
</button>



<button
className="adminBtn cursor-pointer text-indigo-600 hover:text-indigo-800"
onClick={()=>navigate("/admin/add-product")}
>
<span className="bg-green-500 text-white p-1 rounded-full">➕</span> Add Product
</button>



<button
className="adminBtn cursor-pointer text-indigo-600 hover:text-indigo-800"
onClick={()=>navigate("/admin/categories")}
>
📂 Categories
</button>



<button
className="adminBtn cursor-pointer text-indigo-600 hover:text-indigo-800"
onClick={()=>navigate("/admin/subcategories")}
>
📁 Sub Categories
</button>

<button
className="adminBtn block w-full text-left cursor-pointer text-indigo-600 hover:text-indigo-800"
onClick={()=>navigate("/admin/blogs")}
>
📝 Blogs
</button>


</div>


</div>





{/* CONTENT */}


<div className="flex-1 p-8">


<h1 className="text-3xl font-bold text-gray-800">
Dashboard
</h1>

<p className="text-gray-500 mb-8">
Manage your store products and categories
</p>



{/* CARDS */}

<div className="grid grid-cols-4 gap-6 mb-10">


<Card
title="Total Products"
value={products.length}
icon="📦"
/>


<Card
title="Categories"
value={categories.length}
icon="📂"
/>



<Card
title="Sub Categories"
value={subCategories.length}
icon="📁"
/>

<Card
title="Total Blogs"
value={blogs.length}
icon="📝"
/>

</div>





{/* PRODUCT SECTION */}


<div className="bg-white rounded-xl shadow p-6">


<div className="flex justify-between mb-5">


<h2 className="text-xl font-bold">
Products
</h2>



<input

className="border rounded-lg px-4 py-2"

placeholder="Search product..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>





<div className="overflow-x-auto">


<table className="w-full">


<thead>

<tr className="border-b text-left">

<th className="p-3">
Image
</th>

<th>
Name
</th>

<th>
Price
</th>


<th>
Category
</th>


<th>
Action
</th>


</tr>

</thead>




<tbody>


{
filteredProducts.map((p)=>(

<tr
key={p._id}
className="border-b hover:bg-gray-50"
>


<td className="p-3">

<img

src={p.images?.[0]?.url}

className="w-14 h-14 rounded-lg object-cover"

/>

</td>



<td className="font-medium">
{p.name}
</td>



<td>
₹{p.price}
</td>



<td>
{p.categoryId?.name || "-"}
</td>



<td>


<button

onClick={()=>navigate(`/admin/edit-product/${p._id}`)}

className="bg-blue-600 text-white px-3 py-1 rounded mr-2"

>
Edit
</button>




<button

onClick={()=>handleDelete(p._id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>
Delete
</button>



</td>


</tr>


))
}



</tbody>


</table>


</div>



</div>


<div className="bg-white rounded-xl shadow p-6 mt-10">

<div className="flex justify-between mb-5">

<h2 className="text-xl font-bold">
Blogs
</h2>


<button

onClick={()=>navigate("/admin/blogs")}

className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"

>
+ Add Blog
</button>


</div>



<table className="w-full">

<thead>

<tr className="border-b text-left">

<th className="p-3">
Image
</th>

<th>
Title
</th>



<th>
Action
</th>


</tr>

</thead>


<tbody>


{
blogs.map((blog)=>(


<tr
key={blog._id}
className="border-b"
>


<td className="p-3">

<img

src={blog.image}

className="w-14 h-14 rounded object-cover"

/>

</td>


<td>
{blog.title}
</td>


<td>
{blog.author}
</td>


<td>


<button

onClick={()=>navigate(`/admin/edit-blog/${blog._id}`)}

className="bg-blue-600 text-white px-3 py-1 rounded"

>
Edit
</button>



<button

onClick={async()=>{

await API.delete(`/blogs/${blog._id}`);
fetchData();

}}

className="bg-red-600 text-white px-3 py-1 rounded ml-2"

>
Delete
</button>


</td>



</tr>


))

}


</tbody>


</table>


</div>



</div>


</div>

)

};





const Card = ({title,value,icon})=>(
<div className="bg-white shadow rounded-xl p-6 flex items-center gap-5">

<div className="text-4xl">
{icon}
</div>

<div>

<p className="text-gray-500">
{title}
</p>

<h2 className="text-3xl font-bold">
{value}
</h2>


</div>

</div>
);



export default AdminDashboard;