import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const Categories = () => {

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);


  const fetchCategories = async () => {
    try {

      const res = await API.get("/categories");

      setCategories(res.data.categories);

    } catch (err) {

      console.log(err);

    }
  };


  useEffect(() => {

    fetchCategories();

  }, []);



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if(editId){

        await API.put(`/categories/${editId}`,{
          name
        });

      }
      else{

        await API.post("/categories",{
          name
        });

      }


      setName("");
      setEditId(null);
      fetchCategories();


    } catch(err){

      alert(
        err.response?.data?.message || "Error"
      );

    }

  };



  const handleDelete = async(id)=>{

    try{

      await API.delete(`/categories/${id}`);

      fetchCategories();

    }
    catch(err){

      alert("Delete Failed");

    }

  };



  return (
    
<div className="min-h-screen bg-gray-100 p-6 md:p-10">
<div className="max-w-5xl mx-auto">
  <Link
      to="/admin/dashboard"
      className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-xl bg-white text-indigo-600 font-semibold border  hover:bg-blue-100 border-gray-200  hover:text-indigo-800 "
    >
      ← Back To Dashboard
    </Link>


<div className="mb-10">

<h1 className="text-4xl font-bold text-gray-800">
Category Management
</h1>

<p className="text-gray-500 mt-2">
Create, update and manage product categories
</p>

</div>



<div className="bg-white rounded-3xl shadow-xl p-8 mb-10">


<form 
onSubmit={handleSubmit}
className="space-y-5"
>


<div>

<label className="block mb-2 font-semibold text-gray-700">
Category Name
</label>


<input

type="text"

placeholder="Enter category name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"

 />

</div>



<button

type="submit"

className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition"

>

{
editId
?
"Update Category"
:
"Create Category"
}

</button>



{
editId &&

<button

type="button"

onClick={()=>{

setEditId(null);
setName("");

}}

className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition"

>

Cancel Edit

</button>

}



</form>


</div>





<div className="bg-white rounded-3xl shadow-xl p-8">


<h2 className="text-2xl font-bold text-gray-800 mb-6">

All Categories

</h2>




<div className="space-y-4">


{

categories.map((cat)=>(


<div

key={cat._id}

className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-5"

>


<div>

<p className="text-sm text-gray-500">
Category Name
</p>

<h3 className="text-xl font-semibold text-gray-800">
{cat.name}
</h3>

</div>




<div className="flex gap-3">


<button

onClick={()=>{

setName(cat.name);
setEditId(cat._id);

}}

className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"

>

Edit

</button>




<button

onClick={()=>handleDelete(cat._id)}

className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"

>

Delete

</button>



</div>



</div>


))


}



{
categories.length===0 &&

<p className="text-gray-500 text-center py-10">
No Categories Found
</p>

}


</div>


</div>


</div>

</div>


  );

};


export default Categories;