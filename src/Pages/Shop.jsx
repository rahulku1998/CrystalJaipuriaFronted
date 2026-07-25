import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";

const Shop = () => {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {

  try {

    const res = await API.get(`/shop?page=${page}&limit=10`);

    console.log("Products:", res.data);

    setProducts(res.data.products);
    setTotalPages(res.data.totalPages);

  } catch (error) {

    console.log("Product fetch error", error);

  } finally {

    setLoading(false);

  }

};


useEffect(() => {

  fetchProducts();

}, [page]);



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


{/* Pagination */}

<div className="flex justify-center items-center gap-3 mt-10">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="
      px-4
      py-2
      cursor-pointer
      rounded-lg
      bg-gray-200
      disabled:opacity-50
    "
  >
    Prev
  </button>


  {
    Array.from({ length: totalPages }, (_, index) => (

      <button

        key={index}

        onClick={() => setPage(index + 1)}

        className={`
          px-4
          py-2
           cursor-pointer
          rounded-lg
          ${
            page === index + 1
            ? "bg-indigo-600 text-white"
            : "bg-gray-200"
          }
        `}
      >

        {index + 1}

      </button>

    ))
  }



  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="
      px-4
      py-2
      cursor-pointer
      rounded-lg
      bg-gray-200
      disabled:opacity-50
    "
  >
    Next
  </button>


</div>
      </div>


    </div>

  )

}


export default Shop;