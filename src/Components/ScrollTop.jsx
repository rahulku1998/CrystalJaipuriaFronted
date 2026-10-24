import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const { pathname } = useLocation();
  const isFirstMount = useRef(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    // Skip first mount as index.html Meta Pixel snippet already tracks initial PageView
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Fire Meta Pixel PageView on SPA client-side route navigation
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
};

export default ScrollTop;