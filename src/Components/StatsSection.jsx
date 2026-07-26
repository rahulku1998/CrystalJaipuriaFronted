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



<section className="
bg-indigo-50
py-10
sm:py-14
lg:py-20
overflow-hidden
">





<div className="
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8
">





<div className="
grid

grid-cols-2

md:grid-cols-2

lg:grid-cols-4

gap-4

sm:gap-6

lg:gap-8

">





{

stats.map((item,index)=>(



<div

key={index}

className="
bg-white
rounded-2xl
sm:rounded-3xl
p-4
sm:p-6
lg:p-8
shadow-md
hover:shadow-xl
transition
text-center
"

>



<h2 className="
text-3xl
sm:text-4xl
lg:text-5xl
font-bold
text-indigo-600
">

<Counter

number={item.number}

suffix={item.suffix}

/>


</h2>





<p className="
mt-2
sm:mt-4
text-gray-700
font-medium
text-sm
sm:text-base
lg:text-lg
leading-tight
">

{item.title}

</p>




</div>



))

}





</div>





</div>





</section>



)


}



export default StatsSection;