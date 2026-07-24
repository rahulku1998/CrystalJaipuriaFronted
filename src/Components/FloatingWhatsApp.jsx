import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  const phoneNumber = "918306317032"; 
  const message = encodeURIComponent(
    "Hi Rahul, I found your website and need some help."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 animate-bounce"
    >
      <FaWhatsapp className="text-3xl" />
      
    </a>
  );
};

export default FloatingWhatsApp;