import { useState, useEffect } from "react";
import API from "../api/axios";
import RichTextEditor from "../Components/RichTextEditor";
import { FaCloudUploadAlt, FaTimes, FaTrashAlt, FaImages } from "react-icons/fa";

const AddProduct = () => {

  const [form,setForm] = useState({
    name:"",
    description:"",
    price:"",
    discountPrice:"",
    categoryId:"",
    subCategoryId:"",
    stock:"",
    additionalInfo:"",
    detail:"",
    weight:"",
    pricePerGram:"",
    pricePerCarat:"",
    size:""
  });

const [categories,setCategories] = useState([]);
const [subCategories,setSubCategories] = useState([]);
  const [images,setImages] = useState([]);
  const [preview,setPreview] = useState([]);
  const [loading,setLoading] = useState(false);

useEffect(()=>{
  fetchCategories();
},[]);

const fetchCategories = async()=>{

  try{

    const res = await API.get("/categories");

    setCategories(res.data.categories);

  }catch(err){

    console.log(err);

  }

};
const handleCategoryChange = async (e) => {

  const categoryId = e.target.value;


  setForm({
    ...form,
    categoryId,
    subCategoryId:""
  });


  if(categoryId){

    try{

      const res = await API.get(
        `/subcategories/category/${categoryId}`
      );


      setSubCategories(
        res.data.subCategories
      );


    }catch(err){

      console.log(err);

    }

  }else{

    setSubCategories([]);

  }

};



  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };



  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreview((prev) => {
      if (prev[indexToRemove]) URL.revokeObjectURL(prev[indexToRemove]);
      return prev.filter((_, i) => i !== indexToRemove);
    });
  };

  const handleClearAllImages = () => {
    preview.forEach((url) => URL.revokeObjectURL(url));
    setImages([]);
    setPreview([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least 1 product image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key] !== "" && form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });

      images.forEach((img) => {
        formData.append("images", img);
      });

      await API.post(
        "/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Product Added Successfully");

      setForm({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        categoryId: "",
        subCategoryId: "",
        stock: "",
        additionalInfo: "",
        detail: "",
        weight: "",
        pricePerGram: "",
        pricePerCarat: "",
        size: ""
      });

      setImages([]);
      setPreview([]);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );

    }
    finally{

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <div className="max-w-6xl mx-auto">


        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Add New Product
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage your store products
          </p>

        </div>



        <div className="bg-white rounded-3xl shadow-xl p-8">


          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >


            <Input
               label={
    <>
      Product Name <span className="text-red-500">*</span>
    </>
  }
              name="name"
              value={form.name}
              required
              onChange={handleChange}
              placeholder="Enter product name"
            />

           <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Details
              </label>


              <textarea

                name="detail"

                value={form.detail}

                onChange={handleChange}

                rows="5"

                className="
                w-full
                rounded-xl
                border
                px-5
                py-4
                bg-gray-50
                outline-none
                focus:bg-white
                focus:ring-2
                focus:ring-gray-300
                "

                placeholder="Enter detail about product"

              />

            </div>
            


            <div>
              <RichTextEditor
                label={
                  <>
                    Description <span className="text-red-500">*</span>
                  </>
                }
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                placeholder="Enter description..."
              />
            </div>



            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label={
                  <>
                    Price <span className="text-red-500">*</span>
                  </>
                }
                name="price"
                type="text"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 1000, 6/GRAM, 500/carat"
              />


                  <Input
                label="Weight"
                name="weight"
                type="text"
                value={form.weight}
                onChange={handleChange}
              />
                  <Input
                label="Size"
                name="size"
                type="text"
                value={form.size}
                onChange={handleChange}
              />




              <select name="categoryId" value={form.categoryId} onChange={handleCategoryChange} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300">

<option value="">Select Category</option>

{
categories.map((cat)=>(
<option key={cat._id} value={cat._id}>
{cat.name}
</option>
))
}

</select>

<select name="subCategoryId" value={form.subCategoryId} onChange={handleChange} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-gray-300">

<option value="">Select Sub Category</option>

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
              />


            </div>




            <div>
              <RichTextEditor
                label="Additional Information"
                name="additionalInfo"
                value={form.additionalInfo}
                onChange={handleChange}
                rows={4}
                placeholder="Enter additional specifications or details..."
              />
            </div>




            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaImages className="text-indigo-600" />
                  <span>Product Images (Multiple Supported)</span>
                </label>
                {preview.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                      {preview.length} {preview.length === 1 ? "Image" : "Images"} Selected
                    </span>
                    <button
                      type="button"
                      onClick={handleClearAllImages}
                      className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <FaTrashAlt className="text-xs" />
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* Upload Drop Area */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/80 rounded-2xl p-6 cursor-pointer transition-all duration-200 group">
                <FaCloudUploadAlt className="text-4xl text-indigo-500 group-hover:scale-110 duration-200 mb-2" />
                <span className="font-semibold text-indigo-900 text-sm sm:text-base">
                  Click to select multiple images
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP • You can select multiple images or add them one by one
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* Image Previews Grid */}
              {preview.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-5">
                  {preview.map((img, index) => (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white aspect-square"
                    >
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                        #{index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
                        title="Remove image"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>




            <button

              disabled={loading}

              className="
              w-full
              bg-black
              text-white
              py-4
              rounded-xl
              font-semibold
              hover:bg-gray-800
              "

            >

              {
                loading
                ?
                "Adding..."
                :
                "Add Product"
              }


            </button>



          </form>


        </div>


      </div>

    </div>

  );

};




// Input Component

const Input = ({label,...props}) => (

  <div>

    <label className="block mb-2 font-semibold text-gray-700">
      {label}
    </label>


    <input

      {...props}

      className="
      w-full
      rounded-xl
      border
      border-gray-200
      bg-gray-50
      px-5
      py-4
      outline-none
      focus:bg-white
      focus:ring-2
      focus:ring-gray-300
      "

    />

  </div>

);



export default AddProduct;