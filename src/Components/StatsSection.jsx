import { useEffect, useRef, useState } from "react";


const Counter = ({ number, suffix }) => {

  const [count, setCount] = useState(0);
  const ref = useRef(null);


  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          let start = 0;

          const duration = 2000;
          const increment = number / (duration / 16);


          const timer = setInterval(() => {

            start += increment;


            if (start >= number) {

              setCount(number);
              clearInterval(timer);

            } else {

              setCount(Math.floor(start));

            }


          }, 16);


          observer.disconnect();

        }

      },
      {
        threshold: 0.3
      }
    );


    if(ref.current){
      observer.observe(ref.current);
    }


    return () => observer.disconnect();


  }, [number]);



  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );

};




const StatsSection = () => {


const stats = [
  {
    number:25,
    suffix:"+",
    title:"Years Experience"
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
    title:"Handcrafted Quality"
  }
];



return (

<section className="bg-indigo-50 py-20">

<div className="container mx-auto px-5">

<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">


{
stats.map((item,index)=>(

<div
key={index}
className="
text-center
bg-white
rounded-3xl
p-8
shadow-md
"
>

<h2 className="
text-5xl
font-bold
text-indigo-600
">

<Counter
number={item.number}
suffix={item.suffix}
/>

</h2>


<p className="
mt-4
text-gray-700
font-medium
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