import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    categoryId: "",
    subCategoryId: "",
    stock: "",
    additionalInfo: "",
  });
const [categories,setCategories] = useState([]);
const [subCategories,setSubCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // file change
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  // fetch product
  const fetchProduct = async () => {
  try {
    setLoading(true);

    const res = await API.get(`/products/${id}`);

    const p = res.data.product;

    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      discountPrice: p.discountPrice || "",
      categoryId: p.categoryId?._id || "",
      subCategoryId: p.subCategoryId?._id || "",
      stock: p.stock || "",
      additionalInfo: p.additionalInfo || "",
    });

    setExistingImages(p.images || []);

    if(p.categoryId?._id){
      const subRes = await API.get(
        `/subcategories/category/${p.categoryId._id}`
      );

      setSubCategories(subRes.data.subCategories);
    }

    setLoading(false);

  } catch(err){
    console.log(err);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchCategories = async()=>{

const res = await API.get("/categories");

setCategories(res.data.categories);

};
const handleCategoryChange = async(e)=>{

const categoryId=e.target.value;


setForm({
...form,
categoryId,
subCategoryId:""
});


const res = await API.get(
`/subcategories/category/${categoryId}`
);


setSubCategories(
res.data.subCategories
);


};
  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== "") {
          formData.append(key, form[key]);
        }
      });

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await API.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product Updated Successfully");
      navigate("/admin/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };
  

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  return (

<div className="min-h-screen bg-gray-100 p-6 md:p-10">

<div className="max-w-5xl mx-auto">


<div className="mb-10">

<h1 className="text-4xl font-bold text-gray-800">
Edit Product
</h1>

<p className="text-gray-500 mt-2">
Update product information and images
</p>

</div>



<div className="bg-white rounded-3xl shadow-xl p-8">


<form
onSubmit={handleSubmit}
className="space-y-8"
>



<Input
label="Product Name"
name="name"
value={form.name}
onChange={handleChange}
placeholder="Enter product name"
/>





<div>

<label className="block mb-2 font-semibold text-gray-700">
Description
</label>

<textarea

name="description"

value={form.description}

onChange={handleChange}

rows="5"

placeholder="Enter product description"

className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"

></textarea>


</div>





<div className="grid md:grid-cols-2 gap-6">



<Input

label="Price"

name="price"

type="number"

value={form.price}

onChange={handleChange}

placeholder="Enter price"

/>




<Input

label="Discount Price"

name="discountPrice"

type="number"

value={form.discountPrice}

onChange={handleChange}

placeholder="Enter discount price"

/>



<select
name="categoryId"
value={form.categoryId}
onChange={handleCategoryChange}
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"
>

<option value="">
Select Category
</option>

{
categories.map((cat)=>(
<option key={cat._id} value={cat._id}>
{cat.name}
</option>
))
}

</select>



<select
name="subCategoryId"
value={form.subCategoryId}
onChange={handleChange}
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"
>

<option value="">
Select Sub Category
</option>

{
subCategories.map((sub)=>(
<option key={sub._id} value={sub._id}>
{sub.name}
</option>
))
}

</select>




<Input

label="Stock"

name="stock"

type="number"

value={form.stock}

onChange={handleChange}

placeholder="Available stock"

/>


</div>





<div>

<label className="block mb-2 font-semibold text-gray-700">
Additional Information
</label>


<textarea

name="additionalInfo"

value={form.additionalInfo}

onChange={handleChange}

rows="3"

placeholder="Material, size, color etc."

className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300"

/>


</div>







<div>


<h2 className="text-xl font-bold text-gray-800 mb-4">
Existing Images
</h2>


<div className="flex flex-wrap gap-5">


{
existingImages.map((img,index)=>(

<div
key={index}
className="rounded-xl overflow-hidden shadow border"
>


<img

src={img.url}

alt="product"

className="w-28 h-28 object-cover"

/>


</div>

))
}



</div>



</div>







<div>


<label className="block mb-3 font-semibold text-gray-700">
Upload New Images
</label>


<input

type="file"

multiple

onChange={handleImageChange}

className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50"

/>


</div>







<button

type="submit"

className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition shadow-lg"

>

Update Product

</button>





</form>



</div>


</div>


</div>

);

};
const Input = ({label,...props}) => (

  <div>

    <label className="block mb-2 font-semibold text-gray-700">
      {label}
    </label>


    <input

      {...props}

      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300 transition"

    />

  </div>

);



export default EditProduct;