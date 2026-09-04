import aboutBanner from "../assets/about/About-Us.webp";
import workshop from "../assets/about/workshop.webp";
import StatsSection from "../Components/StatsSection";
import SEO from "../Components/SEO";

const About = () => {
  return (
    <>
      <SEO
        title="About Crystal Jaipuria | Gemstone & Handicraft Manufacturer"
        description="Learn about Crystal Jaipuria, a Jaipur-based gemstone, crystal and handicraft manufacturer with over 35 years of experience in manufacturing and wholesale trading."
        canonical="https://www.crystaljaipuria.com/about"
        ogTitle="About Crystal Jaipuria | Gemstone & Handicraft Manufacturer"
        ogDescription="Discover the story of Crystal Jaipuria, a Jaipur-based gemstone and handicraft manufacturer with over 35 years of experience in manufacturing and wholesale trading."
        twitterTitle="About Crystal Jaipuria | Gemstone & Handicraft Manufacturer"
        twitterDescription="Discover the story of Crystal Jaipuria, a Jaipur-based gemstone and handicraft manufacturer with over 35 years of experience in manufacturing and wholesale trading."
        image="https://www.crystaljaipuria.com/logo.png"
        type="website"
      />
      <div className="bg-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-[350px] sm:h-[400px] md:h-[450px] w-full">

        <img
          src={aboutBanner}
          alt="Crystal Jaipuria - 35+ Years Handcrafted Gemstone & Crystal Statues Manufacturer in Jaipur"
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">

          <div className="text-center text-white max-w-3xl">

            <h1 className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              leading-tight
            ">
              About Crystal Jaipuria
            </h1>


            <p className="
              mt-4
              text-sm
              sm:text-base
              md:text-lg
              leading-7
            ">
              Bringing the beauty of Jaipur's craftsmanship and the positive
              energy of natural crystals to homes across India.
            </p>

          </div>

        </div>

      </section>



      {/* Our Story */}

      <section className="
        max-w-7xl 
        mx-auto 
        px-4 
        sm:px-6 
        py-12 
        sm:py-16
      ">


        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-8 
          lg:gap-10 
          items-center
        ">


          <div>

            <img
              src={workshop}
              alt="Crystal Jaipuria Artisan Workshop & Hand Carved Gemstone Manufacturing Facility Jaipur"
              className="
                rounded-xl
                shadow-lg
                w-full
                h-[280px]
                sm:h-[350px]
                md:h-[450px]
                object-cover
              "
            />

          </div>



          <div>

            <h2 className="
              text-2xl
              sm:text-3xl
              font-bold
              text-gray-800
              mb-5
            ">
              Our Story
            </h2>



            <p className="
              text-gray-600
              text-sm
              sm:text-base
              leading-7
              sm:leading-8
              mb-4
            ">

              Established in 1989, Crystal Jaipuria has emerged as a trusted
              name in the gemstone, crystal, spiritual, and handicraft
              industry. Rooted in the heritage city of Jaipur, Rajasthan, we
              blend traditional Indian craftsmanship with contemporary design
              sensibilities to create products that radiate beauty, positivity,
              and elegance.

            </p>



            <p className="
              text-gray-600
              text-sm
              sm:text-base
              leading-7
              sm:leading-8
              mb-4
            ">
              Founded by{" "}
              <span className="text-indigo-600 font-medium">
                Kailash Kumawat
              </span>{" "}
              and headquartered at Bajni Talai, Plot No. 03 West Part, Prabha, Mangal Vihar, Sanganer, Jaipur (PIN:
              302029), Crystal Jaipuria has built a strong legacy of over
              <strong> 35 years</strong> in manufacturing and wholesale
              trading. Under the leadership of{" "}
              <span className="text-indigo-600 font-medium">
                CEO Krishan Kumawat
              </span>
              , we specialize in semi-precious stone statues, gemstone
              carvings, deity figures, and handcrafted artistic creations.
            </p>




            <p className="
              text-gray-600
              text-sm
              sm:text-base
              leading-7
              sm:leading-8
            ">

              Every creation at Crystal Jaipuria is crafted with precision,
              authenticity, and care. From spiritual idols and healing crystals
              to handcrafted jewellery and puja essentials, our products are
              designed to bring harmony, beauty, and positive energy into
              everyday life.

            </p>


          </div>


        </div>


      </section>




      {/* Core Values */}


      <section className="
        py-12
        sm:py-16
        bg-white
      ">


        <div className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
        ">


          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-center
            mb-10
          ">
            Our Core Values
          </h2>



          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-6
            sm:gap-8
          ">



            <div className="
              border
              rounded-xl
              p-6
              sm:p-8
              text-center
            ">

              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Quality
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                Every product is carefully inspected to ensure premium quality
                and customer satisfaction.
              </p>

            </div>




            <div className="
              border
              rounded-xl
              p-6
              sm:p-8
              text-center
            ">

              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Authenticity
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                We believe in providing genuine gemstones, crystals, and
                handcrafted spiritual products.
              </p>

            </div>





            <div className="
              border
              rounded-xl
              p-6
              sm:p-8
              text-center
            ">

              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Trust
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                Building long-term relationships through honest service and
                reliable customer support.
              </p>

            </div>



          </div>


        </div>


      </section>



      <StatsSection />
            {/* About Our Products */}

      <section className="
        bg-white
        py-12
        sm:py-16
      ">


        <div className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
        ">


          <div className="text-center mb-10 sm:mb-12">


            <h2 className="
              text-2xl
              sm:text-3xl
              font-bold
              text-gray-800
            ">
              About Our Products
            </h2>


            <p className="
              mt-4
              text-gray-600
              text-sm
              sm:text-base
              leading-7
              max-w-3xl
              mx-auto
            ">
              At Crystal Jaipuria, we proudly offer a premium collection of
              handcrafted gemstone products that combine traditional
              craftsmanship with timeless beauty. Every creation reflects
              authenticity, precision, and artistic excellence.
            </p>


          </div>




          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            sm:gap-8
          ">



            <div className="
              bg-gray-50
              p-5
              sm:p-6
              rounded-xl
              shadow-sm
            ">

              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                💎 Semi-Precious Stone Statues
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                Beautiful hand-carved statues crafted from carefully selected
                semi-precious gemstones, showcasing exceptional artistry and
                elegance.
              </p>

            </div>





            <div className="
              bg-gray-50
              p-5
              sm:p-6
              rounded-xl
              shadow-sm
            ">

              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                🛕 God Statues
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                Finely crafted spiritual idols and divine figures made from
                natural gemstones, designed with intricate detailing and
                devotion.
              </p>

            </div>





            <div className="
              bg-gray-50
              p-5
              sm:p-6
              rounded-xl
              shadow-sm
            ">

              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                ✨ Gemstone Carvings & Figures
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                Artistic gemstone carvings and decorative figures that
                beautifully showcase creativity, craftsmanship, and natural
                stone beauty.
              </p>

            </div>





            <div className="
              bg-gray-50
              p-5
              sm:p-6
              rounded-xl
              shadow-sm
            ">

              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                🎨 Craft & Handicraft Items
              </h3>

              <p className="text-gray-600 text-sm sm:text-base">
                A unique collection of handcrafted gemstone décor and
                traditional handicraft products that bring elegance and positive
                energy to every space.
              </p>

            </div>



          </div>


        </div>


      </section>





      {/* Global Presence */}


      <section className="
        bg-gray-50
        py-12
        sm:py-16
      ">


        <div className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
        ">


          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-center
            text-gray-800
            mb-6
            sm:mb-8
          ">
            Our Global Presence
          </h2>


          <p className="
            text-gray-600
            text-sm
            sm:text-base
            leading-7
            sm:leading-8
            text-center
            max-w-5xl
            mx-auto
          ">

            Crystal Jaipuria proudly serves customers across international
            markets, offering premium gemstone and handicraft products to
            wholesalers, retailers, collectors, interior designers, and
            spiritual organizations. Our commitment to quality, authenticity,
            and ethical sourcing has earned us the trust of customers around
            the world.

          </p>


        </div>


      </section>





      {/* Experience */}


      <section className="
        py-12
        sm:py-16
      ">


        <div className="
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
        ">


          <div className="
            bg-indigo-600
            rounded-2xl
            text-white
            p-6
            sm:p-10
            text-center
          ">


            <h2 className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-bold
              mb-4
            ">
              35+ Years of Excellence
            </h2>


            <p className="
              text-sm
              sm:text-base
              leading-7
              sm:leading-8
              max-w-4xl
              mx-auto
            ">

              With over <strong>35 years of experience</strong>, Crystal
              Jaipuria has established itself as a trusted name in gemstone
              artistry and handicrafts. Our expertise lies in creating
              exquisite gemstone figures, spiritual god statues, semi-precious
              stone sculptures, and exclusive handcrafted masterpieces.

            </p>


          </div>


        </div>


      </section>





      {/* Why Choose Us */}


      <section className="
        bg-gray-50
        py-12
        sm:py-16
      ">


        <div className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
        ">


          <h2 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-center
            mb-10
          ">
            Why Choose Us?
          </h2>




          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          ">



            <div className="
              bg-white
              p-6
              rounded-xl
              shadow
              text-center
            ">

              <div className="text-4xl mb-4">
                💎
              </div>

              <h3 className="font-semibold text-lg">
                Premium Quality
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                Carefully selected crystals, gemstones and handcrafted
                products.
              </p>

            </div>





            <div className="
              bg-white
              p-6
              rounded-xl
              shadow
              text-center
            ">

              <div className="text-4xl mb-4">
                🛕
              </div>

              <h3 className="font-semibold text-lg">
                Authentic Collection
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                Wide range of spiritual idols, yantras and puja essentials.
              </p>

            </div>





            <div className="
              bg-white
              p-6
              rounded-xl
              shadow
              text-center
            ">

              <div className="text-4xl mb-4">
                🚚
              </div>

              <h3 className="font-semibold text-lg">
                Fast Delivery
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                Safe packaging and reliable delivery across India.
              </p>

            </div>





            <div className="
              bg-white
              p-6
              rounded-xl
              shadow
              text-center
            ">

              <div className="text-4xl mb-4">
                🤝
              </div>

              <h3 className="font-semibold text-lg">
                Customer First
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                Dedicated support with a focus on customer satisfaction.
              </p>

            </div>



          </div>


        </div>


      </section>





      {/* Mission */}


      <section className="
        max-w-5xl
        mx-auto
        px-4
        sm:px-6
        py-12
        sm:py-16
        text-center
      ">


        <h2 className="
          text-2xl
          sm:text-3xl
          font-bold
          mb-5
          sm:mb-6
        ">
          Our Mission
        </h2>


        <p className="
          text-gray-600
          text-sm
          sm:text-base
          leading-7
          sm:leading-8
        ">

          Our mission is to make authentic gemstones, healing crystals,
          handcrafted jewellery, spiritual idols, and traditional handicrafts
          accessible to every home while preserving the rich heritage of
          Jaipur's artisans. We believe every product should reflect quality,
          trust, and positive energy.

        </p>


      </section>


      </div>
    </>
  );
};

export default About;