import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Blog = () => {
const [blogs,setBlogs] = useState([]);

const [form, setForm] = useState({
  title: "",
  description: "",
  content: "",
});

const [image, setImage] = useState(null);


const [editId,setEditId] = useState(null);



const fetchBlogs = async()=>{

    try{

        const res = await API.get("/blogs");

        setBlogs(res.data.blogs || res.data || []);

    }catch(err){

        console.log(err);

    }

};



useEffect(()=>{

fetchBlogs();

},[]);





const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};






const handleSubmit = async (e) => {
  e.preventDefault();
if (
  !form.title ||
  !form.description ||
  !form.content
) {
  return toast.error("All fields are required");
}

  try {

    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("content", form.content);

    if (image) {
      data.append("image", image);
    }

    if (editId) {

      await API.put(`/blogs/${editId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog Updated");

    } else {

      await API.post("/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog Created");
    }

    setForm({
      title: "",
      description: "",
      content: "",
    });

    setImage(null);

    setEditId(null);

    fetchBlogs();

  } catch (err) {

    console.log(err);

    toast.error(err.response?.data?.message || "Something went wrong");
  }
};






const editBlog = (blog) => {

  setEditId(blog._id);

  setForm({
    title: blog.title,
    description: blog.description,
    content: blog.content,
  });
  setImage(null);

};






const deleteBlog=async(id)=>{


if(!window.confirm("Delete this blog?"))
return;


try{


await API.delete(`/blogs/${id}`);

toast.success("Deleted");

fetchBlogs();



}catch(err){

console.log(err);

}



};






return (


<div className="p-8">
<Link
  to="/admin/dashboard"
  className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-xl bg-white text-indigo-600 font-semibold border border-gray-200 hover:bg-blue-100"
>
  ← Back To Dashboard
</Link>

<h1 className="text-3xl font-bold mb-6">
Blog Management
</h1>




{/* FORM */}


<div className="bg-white shadow rounded-xl p-6 mb-8">


<h2 className="text-xl font-bold mb-5">

{
editId ? "Edit Blog" : "Add New Blog"
}

</h2>



<form 
onSubmit={handleSubmit}
className="space-y-4"
>



<input

type="text"

name="title"

placeholder="Blog Title"

value={form.title}

onChange={handleChange}

className="w-full border p-3 rounded"

/>




<input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full border p-3 rounded"
/>




<textarea

name="description"

placeholder="Blog Description"

value={form.description}

onChange={handleChange}

rows="5"

className="w-full border p-3 rounded"

/>


<textarea
  name="content"
  placeholder="Blog Content"
  rows={8}
  value={form.content}
  onChange={handleChange}
  className="w-full border p-3 rounded"
/>







<button

className="bg-indigo-600 text-white px-6 py-3 rounded"

>

{
editId ? "Update Blog":"Create Blog"
}

</button>



</form>


</div>







{/* BLOG LIST */}


<div className="bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-5">

All Blogs ({blogs.length})

</h2>



<div className="overflow-x-auto">


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
Content
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
className="border-b hover:bg-gray-50"
>


<td className="p-3">


<img
  src={blog.coverImage?.url}
  alt={blog.title}
  className="w-16 h-16 rounded object-cover"
/>

</td>



<td>

{blog.title}

</td>



<td>

{blog.content}

</td>




<td>


<button

onClick={()=>editBlog(blog)}

className="bg-blue-600 text-white px-3 py-1 rounded"

>

Edit

</button>





<button

onClick={()=>deleteBlog(blog._id)}

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


);


};


export default Blog;