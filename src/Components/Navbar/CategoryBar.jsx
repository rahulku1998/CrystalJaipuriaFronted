import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../api/axios";


const CategoryBar = () => {


  const navigate = useNavigate();
  const location = useLocation();


  const [categories, setCategories] = useState([]);

  const [visibleItems, setVisibleItems] = useState([]);

  const [hiddenItems, setHiddenItems] = useState([]);

  const [openMore, setOpenMore] = useState(false);







  const staticMenu = [

    {
      name:"Home",
      path:"/"
    },

    {
      name:"Shop",
      path:"/shop"
    },

    {
      name:"Blog",
      path:"/blog"
    },

    {
      name:"About",
      path:"/about"
    },

    {
      name:"Contact",
      path:"/contact"
    }

  ];









  useEffect(()=>{

    fetchCategories();

  },[]);









  const fetchCategories = async()=>{

    try{


      const res = await API.get("/categories");



      const data = res.data.categories.map(cat=>({

        name:cat.name,

        path:`/${cat.slug}`

      }));


      setCategories(data);



    }
    catch(err){

      console.log(err);

    }


  };









  useEffect(()=>{


    const handleMenu = ()=>{


      const allMenu = [

        ...staticMenu.slice(0,2),

        ...categories,

        ...staticMenu.slice(2)

      ];





      let width = window.innerWidth;






      // PC
      if(width >= 1024){


        setVisibleItems(allMenu);

        setHiddenItems([]);

        return;

      }





      // Mobile

      if(width < 640){


        setVisibleItems(
          allMenu.slice(0,2)
        );


        setHiddenItems(
          allMenu.slice(2)
        );


        return;

      }





      // Tablet

      setVisibleItems(
        allMenu.slice(0,5)
      );


      setHiddenItems(
        allMenu.slice(5)
      );



    };





    handleMenu();



    window.addEventListener(
      "resize",
      handleMenu
    );



    return ()=>{


      window.removeEventListener(
        "resize",
        handleMenu
      );


    }



  },[categories]);











  const menuClick = (item)=>{


    navigate(item.path);

    setOpenMore(false);


  };











return (

<div className="w-full bg-white border-b shadow-sm">


{/* PC NAVBAR */}


<div className="hidden lg:block w-full">


  <div className="
    max-w-7xl
    mx-auto
    px-6
  ">


    <div className="
      flex
      flex-wrap
      items-center
      justify-center
      gap-y-3
      py-3
    ">


      {
        [...staticMenu.slice(0,2), ...categories, ...staticMenu.slice(2)]
        .map((item)=>(


          <button

          key={item.path}

          onClick={()=>menuClick(item)}

          className={`
            flex-1
            min-w-fit
            text-center
            text-sm
            font-medium
            whitespace-nowrap
            cursor-pointer
            transition
            px-3
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






{/* MOBILE + TABLET */}

<div className="lg:hidden max-w-7xl mx-auto px-4">


<div className="flex items-center justify-center gap-5 py-3 flex-wrap">



{

visibleItems.map(item=>(


<button

key={item.path}

onClick={()=>menuClick(item)}

className={`text-sm font-medium whitespace-nowrap cursor-pointer ${
location.pathname===item.path
? "text-indigo-600"
: "text-gray-700 hover:text-indigo-600"
}`}

>

{item.name}

</button>


))


}






{

hiddenItems.length > 0 && (


<div className="relative">


<button

onClick={()=>setOpenMore(!openMore)}

className="text-sm font-semibold text-indigo-600 cursor-pointer"

>

☰ More

</button>




{

openMore && (


<div className="absolute right-0 top-8 bg-white border shadow-xl rounded-xl p-4 min-w-[180px] z-50 flex flex-col gap-3">


{

hiddenItems.map(item=>(


<button

key={item.path}

onClick={()=>menuClick(item)}

className="text-left text-sm cursor-pointer hover:text-indigo-600"

>

{item.name}

</button>


))


}


</div>


)


}



</div>


)


}



</div>


</div>



</div>

);


};


export default CategoryBar;