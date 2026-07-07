import React from "react";
import homeImg from "../assets/images/mama5.png"; // apni image lagao

const Home = () => {
  return (
    <section className="w-full flex justify-center items-center py-10">
      <img
        src={homeImg}
        alt="Home Banner"
        className="w-full h-[600px]  object-cover object-contain"
      />
    </section>
  );
};

export default Home;