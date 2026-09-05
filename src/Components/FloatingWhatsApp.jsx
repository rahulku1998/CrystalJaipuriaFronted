import { FaWhatsapp } from "react-icons/fa";
import { trackWhatsAppClick } from "../utils/analytics";

const FloatingWhatsApp = () => {
  const phoneNumber = "918306317032"; 
  const message = encodeURIComponent(
    "Hi Crystal Jaipuria, I found your website and need some help."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => trackWhatsAppClick("floating_whatsapp_widget")}
      className=" fixed
        bottom-20 sm:bottom-6
        right-6
        z-50
        flex
        items-center
        justify-center
        gap-3
        bg-green-500
        hover:bg-green-600
        text-white
        w-14 h-14
        rounded-full
        shadow-2xl
        transition-all
        duration-300
        animate-bounce
      "
    >
      <FaWhatsapp className="text-3xl" />
      
    </a>
  );
};

export default FloatingWhatsApp;