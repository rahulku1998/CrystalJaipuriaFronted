import React from "react";
import TopBar from "./TopBar";
import CategoryBar from "./CategoryBar";

const Navbar = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-white shadow-md">
      {/* Top Section */}
      <TopBar />
 <CategoryBar />
    </header>
  );
};

export default Navbar;