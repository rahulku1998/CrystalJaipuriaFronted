import React, { useEffect, useState } from "react";
import API from "../api/axios";
import CategorySection from "../Components/CategoryCard";

import homeImg from "../assets/images/mama5.png";
import StatsSection from "../Components/StatsSection";
import { Link } from "react-router-dom";
const Home = () => {

  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
const [categoryProducts,setCategoryProducts] = useState({});






  useEffect(() => {
  const fetchData = async () => {
    try {

      const res = await API.get("/home");

      setProducts(res.data.latestProducts);
      setCategories(res.data.categories);
      setCategoryProducts(res.data.categoryProducts);

    } catch (err) {
      console.log(err);
    }
  };

  fetchData();

}, []);



  return (
    <section className="w-full">


<div className="container mx-auto px-5 py-16">

  <div className="flex justify-between items-center mb-8">

    <h2 className="text-3xl font-bold text-gray-800">
      Our Products
    </h2>

    

  </div>


  <div className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    gap-6
  ">


  {
    products.slice(0,5).map((product)=>(


      <Link
        key={product._id}
        to={`/product/${product._id}`}
        className="
          group
          bg-white
          rounded-[30px]
          overflow-hidden
          shadow-md
          hover:shadow-xl
          transition-all
          duration-300
          cursor-pointer
          border
          border-gray-100
        "
      >


        {/* Image */}

        <div className="
          h-56
          bg-gray-50
          rounded-[30px]
          m-3
          overflow-hidden
          flex
          items-center
          justify-center
        ">

          <img
           loading="lazy"
           src={product.images[0]?.url}
            alt={product.name}
            className="
              w-full
              h-full
              object-contain
              p-5
              group-hover:scale-110
              transition-transform
              duration-300
            "
          />
          

        </div>



        {/* Name */}

        <div className="px-4 pb-5 text-center">

          <h3 className="
            text-lg
            font-semibold
            text-gray-800
            break-words
          ">
            {product.name} 
          </h3>
          <p className="mt-2 text-xl font-bold text-indigo-600">
      ₹ {product.price}
    </p>
    </div>


      </Link>


    ))
  }


  </div>

</div>


      {/* Banner */}
      <Link to='/shop'>
      <img
        src={homeImg}
        loading="eager"
        alt="Home Banner"
        className="block w-full h-screen object-cover"
      />
      </Link>
      



      

<div>


{
 categories.map((category)=>(

  <CategorySection

key={category._id}

title={category.name}

slug={category.slug}

products={categoryProducts[category._id] || []}

/>


 ))
}


</div>

<StatsSection />


<section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16">
  <div className="container mx-auto px-5">

    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10 text-center">

      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Get in Touch
      </h2>

      <p className="text-gray-600 text-lg mb-8">
        Looking for premium crystal products, customized gifts, or bulk
        orders? We'd love to hear from you. Contact our team today.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">

        <Link
          to="/contact"
          className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
        >
          Contact Us
        </Link>

        <a
          href="https://wa.me/918955613237"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-600 hover:text-white transition"
        >
          WhatsApp Us
        </a>
 <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=crystaljaipurya@gmail.com"
              target="_blank"
              className="flex-1 bg-indigo-600 text-white text-center py-3 rounded-lg"
            >
              Email
            </a>
      </div>

    </div>

  </div>
</section>

    </section>
  );
};


export default Home;