import { useState,useEffect } from "react";
import API from "../api/axios";

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



  const handleImageChange=(e)=>{

    const files = Array.from(e.target.files);

    setImages(files);

    setPreview(
      files.map(file=>URL.createObjectURL(file))
    );

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      const formData = new FormData();


      Object.keys(form).forEach(key=>{
        formData.append(key,form[key]);
      });



      images.forEach(img=>{
        formData.append("images",img);
      });



      await API.post(
        "/products",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );



      alert("Product Added Successfully");


      setForm({
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
        size:""
      });


      setImages([]);
      setPreview([]);



    }catch(err){

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
              label="Product Name"
              name="name"
              value={form.name}
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

              <label className="block mb-2 font-semibold text-gray-700">
                Description
              </label>


              <textarea

                name="description"

                value={form.description}

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

                placeholder="Enter description"

              />

            </div>



            <div className="grid md:grid-cols-2 gap-6">


              <Input
                label="Price"
                name="price"
                type="text"
                value={form.price}
                onChange={handleChange}
              />


              <Input
                label="Discount Price"
                name="discountPrice"
                type="text"
                value={form.discountPrice}
                onChange={handleChange}
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

              <label className="block mb-2 font-semibold text-gray-700">
                Additional Information
              </label>


              <textarea

                name="additionalInfo"

                value={form.additionalInfo}

                onChange={handleChange}

                rows="3"

                className="
                w-full
                rounded-xl
                border
                px-5
                py-4
                bg-gray-50
                "

              />

            </div>




            <div>


              <label className="block mb-3 font-semibold">
                Product Images
              </label>


              <input

                type="file"

                multiple

                onChange={handleImageChange}

                className="border p-3 rounded-xl w-full"

              />


              <div className="flex gap-5 flex-wrap mt-5">


                {
                  preview.map((img,index)=>(

                    <img

                      key={index}

                      src={img}

                      className="
                      w-28
                      h-28
                      rounded-xl
                      object-cover
                      shadow
                      "

                    />

                  ))
                }


              </div>


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