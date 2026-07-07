import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const SubCategory = () => {

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);


  const fetchCategories = async()=>{

    try{

      const res = await API.get("/categories");

      setCategories(res.data.categories);

    }catch(err){

      console.log(err);

    }

  };



  const fetchSubCategories = async()=>{

    try{

      const res = await API.get("/subcategories");

      setSubCategories(res.data.subCategories);

    }catch(err){

      console.log(err);

    }

  };



  useEffect(()=>{

    fetchCategories();
    fetchSubCategories();

  },[]);




  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      if(editId){

        await API.put(`/subcategories/${editId}`,{
          name,
          categoryId
        });

      }
      else{

        await API.post("/subcategories",{
          name,
          categoryId
        });

      }


      setName("");
      setCategoryId("");
      setEditId(null);

      fetchSubCategories();


    }catch(err){

      alert(
        err.response?.data?.message || "Error"
      );

    }

  };




  const handleDelete = async(id)=>{

    try{

      await API.delete(`/subcategories/${id}`);

      fetchSubCategories();

    }catch(err){

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
SubCategory Management
</h1>

<p className="text-gray-500 mt-2">
Manage product sub categories under categories
</p>

</div>





<div className="bg-white rounded-3xl shadow-xl p-8 mb-10">


<form 
onSubmit={handleSubmit}
className="space-y-5"
>



<div>

<label className="block mb-2 font-semibold text-gray-700">
SubCategory Name
</label>


<input

type="text"

placeholder="Enter subcategory name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"

 />

</div>





<div>

<label className="block mb-2 font-semibold text-gray-700">
Select Category
</label>



<select

value={categoryId}

onChange={(e)=>setCategoryId(e.target.value)}

className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"

>


<option value="">
Select Category
</option>


{

categories.map((cat)=>(

<option

key={cat._id}

value={cat._id}

>

{cat.name}

</option>


))

}



</select>



</div>






<button

type="submit"

className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition"

>


{
editId
?
"Update SubCategory"
:
"Create SubCategory"
}


</button>




{

editId &&

<button

type="button"

onClick={()=>{

setEditId(null);
setName("");
setCategoryId("");

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

All SubCategories

</h2>



<div className="space-y-4">



{

subCategories.map((sub)=>(


<div

key={sub._id}

className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 border border-gray-200 rounded-2xl p-5 gap-4"

>


<div>


<p className="text-sm text-gray-500">
SubCategory Name
</p>


<h3 className="text-xl font-semibold text-gray-800">
{sub.name}
</h3>


<p className="text-gray-600 mt-1">

Category:

<span className="font-semibold ml-1">

{sub.categoryId?.name}

</span>

</p>


</div>





<div className="flex gap-3">


<button

onClick={()=>{

setName(sub.name);

setCategoryId(sub.categoryId?._id);

setEditId(sub._id);

}}

className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"

>

Edit

</button>





<button

onClick={()=>handleDelete(sub._id)}

className="px-5 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"

>

Delete

</button>



</div>



</div>



))


}



{

subCategories.length===0 &&

<p className="text-center text-gray-500 py-10">
No SubCategories Found
</p>


}



</div>


</div>




</div>


</div>


);


};


export default SubCategory;