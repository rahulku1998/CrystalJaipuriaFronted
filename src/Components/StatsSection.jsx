import { useEffect, useRef, useState } from "react";


const Counter = ({ number, suffix }) => {


const [count,setCount] = useState(0);

const ref = useRef(null);



useEffect(()=>{


const observer = new IntersectionObserver(

([entry])=>{


if(entry.isIntersecting){


let start = 0;


const duration = 2000;

const increment = number / (duration / 16);



const timer = setInterval(()=>{


start += increment;



if(start >= number){

setCount(number);

clearInterval(timer);

}

else{

setCount(Math.floor(start));

}


},16);



observer.disconnect();


}



},

{
threshold:0.3
}

);



if(ref.current){

observer.observe(ref.current);

}



return ()=>observer.disconnect();



},[number]);




return (

<span ref={ref}>

{count}{suffix}

</span>

)


};









const StatsSection = () => {



const stats = [

{
number:35,
suffix:"+",
title:"Manufacturing Excellence"
},

{
number:5000,
suffix:"+",
title:"Happy Customers"
},

{
number:10000,
suffix:"+",
title:"Products Sold"
},

{
number:100,
suffix:"%",
title:"Natural Crystals & Gemstones"
}


];




return (
  <section className="bg-[#fbfaf8] py-6 sm:py-8 lg:py-10 border-y border-stone-200/80 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-stone-200/80 shadow-2xs hover:shadow-xs transition text-center"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-600">
              <Counter number={item.number} suffix={item.suffix} />
            </p>
            <p className="mt-1.5 text-stone-700 font-medium text-xs sm:text-sm lg:text-[15px] leading-tight">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


}



export default StatsSection;