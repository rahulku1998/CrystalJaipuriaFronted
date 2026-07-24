import { useState } from "react";

const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);


  const copyLink = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };


  return (
    <div className="mt-10 border-t pt-8">

      <h3 className="text-xl font-semibold text-gray-800 mb-5">
        Share this Story
      </h3>


      <div className="flex flex-wrap gap-3">


        {/* WhatsApp */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://wa.me/?text=${title}%20${url}`}
          className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-5
          py-2
          rounded-lg
          transition
          "
        >
          WhatsApp
        </a>



        {/* Facebook */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          className="
          bg-blue-700
          hover:bg-blue-800
          text-white
          px-5
          py-2
          rounded-lg
          transition
          "
        >
          Facebook
        </a>



        {/* Twitter */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`}
          className="
          bg-black
          hover:bg-gray-800
          text-white
          px-5
          py-2
          rounded-lg
          transition
          "
        >
          X
        </a>



        {/* LinkedIn */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-2
          rounded-lg
          transition
          "
        >
          LinkedIn
        </a>



        {/* Copy Link */}
        <button
          onClick={copyLink}
          className="
          bg-orange-600
          hover:bg-orange-700
          text-white
          px-5
          py-2
          rounded-lg
          transition
          "
        >
          {copied ? "Copied ✓" : "Copy Link"}
        </button>


      </div>

    </div>
  );
};


export default ShareButtons;