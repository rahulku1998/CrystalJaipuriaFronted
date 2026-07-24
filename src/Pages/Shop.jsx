import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";

const Shop = () => {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {

    try {

      const res = await API.get("/products");

      console.log("Products:", res.data);

      setProducts(res.data.products || res.data);

    } catch (error) {

      console.log("Product fetch error", error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchProducts();

  }, []);



  // Search by product name

  const filteredProducts = products.filter((product)=>{

    return product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

  });



  if(loading){

    return (

      <div className="min-h-screen flex justify-center items-center">

        <h2 className="text-xl">
          Loading Products...
        </h2>

      </div>

    )

  }



  return (

    <div className="bg-gray-50 min-h-screen py-10">


      <div className="max-w-7xl mx-auto px-4">



        {/* Heading */}

       



        {/* Search */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">


  <h1 className="text-3xl font-bold">
    Shop All Products
  </h1>


  <div className="w-full md:w-96">

    <input

      type="text"

      placeholder="Search products..."

      value={search}

      onChange={(e)=>setSearch(e.target.value)}

      className="
        w-full
        border
        p-3
        rounded-lg
        outline-none
        focus:ring-2
        focus:ring-indigo-500
      "

    />

  </div>


</div>




        {/* Product Grid */}


        {

          filteredProducts.length === 0 ? (


            <div className="text-center text-gray-600">

              No Products Found

            </div>


          ) : (


            <div className="
              grid 
              grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-6
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



      </div>


    </div>

  )

}


export default Shop;