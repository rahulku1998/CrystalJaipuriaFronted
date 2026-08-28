import React from "react";
import {
  FaGem,
  FaGlobeAmericas,
  FaShieldAlt,
  FaTag,
  FaHeadset,
  FaWhatsapp,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Responsibly Manufactured",
    icon: <FaGem className="text-xl text-stone-800 group-hover:text-indigo-600 transition-colors" aria-hidden="true" />,
  },
  {
    id: 2,
    title: "Worldwide Shipping",
    icon: <FaGlobeAmericas className="text-xl text-stone-800 group-hover:text-indigo-600 transition-colors" aria-hidden="true" />,
  },
  {
    id: 3,
    title: "Secure Payments",
    icon: <FaShieldAlt className="text-xl text-stone-800 group-hover:text-indigo-600 transition-colors" aria-hidden="true" />,
  },
  {
    id: 4,
    title: "Exclusive Pricing",
    icon: <FaTag className="text-xl text-stone-800 group-hover:text-indigo-600 transition-colors" aria-hidden="true" />,
  },
  {
    id: 5,
    title: "Expert Advice",
    icon: <FaHeadset className="text-xl text-stone-800 group-hover:text-indigo-600 transition-colors" aria-hidden="true" />,
  },
  {
    id: 6,
    title: "WhatsApp Customer Support",
    icon: <FaWhatsapp className="text-xl text-emerald-600 group-hover:scale-110 transition-transform" aria-hidden="true" />,
    link: "https://api.whatsapp.com/send?phone=918955613237&text=Hello%20Crystal%20Jaipuria,%20I%20have%20an%20inquiry.",
  },
];

export default function FeaturesBar() {
  return (
    <section 
      aria-label="Crystal Jaipuria Value Propositions"
      className="w-full bg-[#fcfbf9] border-y border-stone-200/80 py-6 sm:py-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 items-stretch">
          {features.map((item) => {
            const cardContent = (
              <div className="group h-full flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 cursor-default">
                {/* Icon Container */}
                <div 
                  className="h-11 w-11 flex items-center justify-center rounded-xl bg-stone-50 border border-stone-100 mb-2.5 transition-all duration-300 group-hover:bg-indigo-50 group-hover:border-indigo-200 shadow-xs"
                  aria-hidden="true"
                >
                  {item.icon}
                </div>

                {/* Title */}
                <span className="text-xs sm:text-[13px] font-medium text-stone-700 leading-snug group-hover:text-indigo-700 transition-colors">
                  {item.title}
                </span>
              </div>
            );

            if (item.link) {
              return (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Crystal Jaipuria on WhatsApp for Customer Support"
                  className="block h-full cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500 rounded-2xl"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={item.id} className="h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
