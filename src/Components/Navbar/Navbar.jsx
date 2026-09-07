import React, { useState } from "react";
import TopBar from "./TopBar";
import CategoryBar from "./CategoryBar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-white">
      {/* Top Section */}
      <TopBar onOpenMenu={() => setMobileMenuOpen(true)} />
      <CategoryBar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
};

export default Navbar;