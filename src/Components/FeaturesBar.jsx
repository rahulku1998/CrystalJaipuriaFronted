import React from "react";
import {
  FaGlobeAmericas,
  FaShieldAlt,
  FaSlidersH,
  FaTag,
  FaHeadset,
  FaWhatsapp,
} from "react-icons/fa";
import { GiNecklaceDisplay } from "react-icons/gi";

const features = [
  {
    id: 1,
    title: "Responsibly Manufactured",
    icon: <GiNecklaceDisplay className="text-3xl text-stone-800 transition-transform group-hover:scale-110 group-hover:text-indigo-600" />,
  },
  {
    id: 2,
    title: "Worldwide Shipping",
    icon: <FaGlobeAmericas className="text-3xl text-stone-800 transition-transform group-hover:scale-110 group-hover:text-indigo-600" />,
  },
  {
    id: 3,
    title: "Secure Payments",
    icon: <FaShieldAlt className="text-3xl text-stone-800 transition-transform group-hover:scale-110 group-hover:text-indigo-600" />,
  },
  {
    id: 4,
    title: "Custom Cut",
    icon: <FaSlidersH className="text-3xl text-stone-800 transition-transform group-hover:scale-110 group-hover:text-indigo-600" />,
  },
  {
    id: 5,
    title: "Exclusive Pricing",
    icon: <FaTag className="text-3xl text-stone-800 transition-transform group-hover:scale-110 group-hover:text-indigo-600" />,
  },
  {
    id: 6,
    title: "Expert Advice",
    icon: <FaHeadset className="text-3xl text-stone-800 transition-transform group-hover:scale-110 group-hover:text-indigo-600" />,
  },
  {
    id: 7,
    title: "WhatsApp Customer Support",
    icon: <FaWhatsapp className="text-3xl text-stone-800 transition-transform group-hover:scale-110 group-hover:text-indigo-600" />,
    link: "https://api.whatsapp.com/send?phone=918955613237&text=Hello%20Crystal%20Jaipuria,%20I%20have%20an%20inquiry.",
  },
];

export default function FeaturesBar() {
  return (
    <section className="w-full bg-white border-y border-stone-200/90 py-5 sm:py-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: 7 columns grid / Mobile: Responsive 2-column or flex */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-4 items-start">
          {features.map((item) => {
            const content = (
              <div className="group flex flex-col items-center text-center cursor-default transition-all">
                <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-stone-50 border border-stone-100 shadow-xs mb-2.5 transition-colors group-hover:bg-indigo-50 group-hover:border-indigo-200">
                  {item.icon}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h4>
              </div>
            );

            if (item.link) {
              return (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block col-span-2 sm:col-span-1 lg:col-span-1"
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={item.id} className="col-span-1">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
