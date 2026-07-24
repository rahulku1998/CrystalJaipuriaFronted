import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../Components/ProductCard";

const Shop = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
    try {

      const res = await API.get("/products");

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

        <h1 className="text-3xl font-bold text-center mb-8">
          Shop All Products
        </h1>


        {/* Product Grid */}

        {
          products.length === 0 ? (

            <div className="text-center">
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
              products.map((product)=>(

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