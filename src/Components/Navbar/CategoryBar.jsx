import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaShoppingBag,
  FaInfoCircle,
  FaPhone,
  FaRegNewspaper,
} from "react-icons/fa";

import API from "../../api/axios";


const CategoryBar = () => {


  const navigate = useNavigate();
  const location = useLocation();


  const [categories,setCategories] = useState([]);
  const [openMenu,setOpenMenu] = useState(false);



  const staticMenu = [

    {
      name:"Home",
      path:"/",
      icon:<FaHome/>
    },

    {
      name:"Shop",
      path:"/shop",
      icon:<FaShoppingBag/>
    },

    {
      name:"Blog",
      path:"/blog",
      icon:<FaRegNewspaper/>
    },

    {
      name:"About",
      path:"/about",
      icon:<FaInfoCircle/>
    },

    {
      name:"Contact",
      path:"/contact",
      icon:<FaPhone/>
    }

  ];





  useEffect(()=>{

    fetchCategories();

  },[]);





  const fetchCategories = async()=>{


    try{


      const res = await API.get("/categories");


      const data = (res.data.categories || []).map(cat=>({

        name:cat.name,

        path:`/${cat.slug}`,

        icon:<FaShoppingBag/>

      }));


      setCategories(data);



    }
    catch(err){

      console.log("Category Error:",err);

    }


  };





  const allMenu = [

    ...staticMenu.slice(0,2),

    ...categories,

    ...staticMenu.slice(2)

  ];





  return (

    <div className="
    w-full
bg-white
border-t
border-gray-100
border-b
border-gray-200
    ">





      {/* ================= PC NAVBAR ================= */}


      {/* ================= PC NAVBAR ================= */}

<div className="hidden lg:block w-full">


<div
className="
w-full
px-4
"
>


<div
className="
flex
items-center
justify-center
gap-0
flex-wrap
"
>


{
allMenu.map(item=>(


<button

key={item.path}

onClick={()=>navigate(item.path)}

className={`
flex-1
text-center
cursor-pointer
py-3
text-sm
font-medium
whitespace-nowrap
transition

${
location.pathname===item.path
?
"text-indigo-600"
:
"text-gray-700 hover:text-indigo-600"
}

`}

>

{item.name}

</button>


))

}


</div>


</div>


</div>









      {/* ================= MOBILE + TABLET ================= */}



      <div className="lg:hidden">





        {/* TOP MENU */}


        <div className="
        flex
        items-center
        px-4
        py-3
        border-b
        ">


          <button

          onClick={()=>setOpenMenu(true)}

          className="
          text-xl
          text-gray-700
          ">

            <FaBars/>

          </button>



          <h3 className="
          mx-auto
          font-semibold
          text-indigo-600
          ">

            Explore Collection

          </h3>
          <button
            onClick={() => navigate("/shop")}
            className="text-xl text-gray-700 hover:text-indigo-600 transition cursor-pointer"
            aria-label="Shop"
          >
            <FaShoppingBag />
          </button>

        </div>









        {/* SIDE DRAWER */}



        {
        openMenu &&

        <div className="
        fixed
        inset-0
        bg-black/40
        z-50
        ">


          <div className="
          w-72
          h-full
          bg-white
          p-5
          shadow-xl
          ">



            <button

            onClick={()=>setOpenMenu(false)}

            className="
            text-xl
            mb-5
            ">

              ✕

            </button>





            {

            allMenu.map(item=>(


              <button

              key={item.path}


              onClick={()=>{

                navigate(item.path);

                setOpenMenu(false);

              }}


              className="
              flex
              items-center
              gap-3
              w-full
              py-3
              border-b
              text-left
              text-sm
              ">


                <span>

                  {item.icon}

                </span>


                {item.name}


              </button>


            ))

            }




          </div>


        </div>


        }









        {/* MOBILE BOTTOM CATEGORY */}



        {/* ================= MOBILE STATIC BOTTOM NAVBAR ================= */}

<div
className="
fixed
bottom-0
left-0
right-0
bg-white
border-t
shadow-lg
z-40
md:hidden
"
>

<div
className="
flex
justify-around
items-center
py-2
"
>


{
staticMenu.map(item=>(


<button

key={item.path}

onClick={()=>navigate(item.path)}

className={`
flex
flex-col
items-center
justify-center
text-xs
gap-1

${
location.pathname===item.path
?
"text-indigo-600"
:
"text-gray-600"
}

`}

>


<span className="text-lg">

{item.icon}

</span>


<span>

{item.name}

</span>


</button>


))
}


</div>

</div>





      </div>





    </div>

  );


};


export default CategoryBar;