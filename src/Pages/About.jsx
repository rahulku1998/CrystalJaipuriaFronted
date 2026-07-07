import aboutBanner from "../assets/about/About-Us.webp";
import workshop from "../assets/about/workshop.webp";
const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
     <section className="relative h-[450px] w-full overflow-hidden ">
  <img
    src={aboutBanner}
    alt="About Crystal Jaipuria"
    className="w-full h-full object-cover object-center"
  />

  <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
    <div className="text-center text-white max-w-3xl">
      <h1 className="text-5xl font-bold leading-tight ">
        About Crystal Jaipuria
      </h1>

      <p className="mt-4 text-lg">
        Bringing the beauty of Jaipur's craftsmanship and the positive energy of
        natural crystals to homes across India.
      </p>
    </div>
  </div>
</section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
  src={workshop}
  alt="Crystal Jaipuria Workshop"
  className="rounded-xl shadow-lg w-full h-[450px] object-cover"
/>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Story
            </h2>
<p className="text-gray-600 leading-8 mb-4">
  Established in 1999, Crystal Jaipuria has emerged as a trusted name in the gemstone, crystal, spiritual, and handicraft industry. Rooted in the heritage city of Jaipur, Rajasthan, we blend traditional Indian craftsmanship with contemporary design sensibilities to create products that radiate beauty, positivity, and elegance.
</p>

<p className="text-gray-600 leading-8 mb-4">
  Founded by <span className="text-indigo-600 font-medium">Kailash Kumawat</span> and headquartered at Malpura Gate, Sanganer, Jaipur (PIN: 302029), Crystal Jaipuria has built a strong legacy of over <strong>25 years</strong> in manufacturing and wholesale trading. Under the leadership of <span className="text-indigo-600 font-medium">CEO Krishan Kumawat</span>, we specialize in semi-precious stone statues, gemstone carvings, deity figures, and a wide range of handcrafted artistic creations. Our commitment to excellence has made us a trusted supplier in both domestic and international markets.
</p>

<p className="text-gray-600 leading-8">
  Every creation at Crystal Jaipuria is crafted with precision, authenticity, and care. From spiritual idols and healing crystals to handcrafted jewellery and puja essentials, our products are designed to bring harmony, beauty, and positive energy into everyday life.
</p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-12">
      Our Core Values
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="border rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold mb-3">Quality</h3>
        <p className="text-gray-600">
          Every product is carefully inspected to ensure premium quality and
          customer satisfaction.
        </p>
      </div>

      <div className="border rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
        <p className="text-gray-600">
          We believe in providing genuine gemstones, crystals, and handcrafted
          spiritual products.
        </p>
      </div>

      <div className="border rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold mb-3">Trust</h3>
        <p className="text-gray-600">
          Building long-term relationships through honest service and reliable
          customer support.
        </p>
      </div>

    </div>
  </div>
</section>
<section className="bg-indigo-600 py-16">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
      <div>
        <h2 className="text-4xl font-bold">25+</h2>
        <p>Years Experience</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold">1000+</h2>
        <p>Happy Customers</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold">500+</h2>
        <p>Products</p>
      </div>

      <div>
        <h2 className="text-4xl font-bold">100%</h2>
        <p>Customer Satisfaction</p>
      </div>

    </div>
  </div>
</section>

{/* About Our Products */}
<section className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800">
        About Our Products
      </h2>
      <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
        At Crystal Jaipuria, we proudly offer a premium collection of handcrafted
        gemstone products that combine traditional craftsmanship with timeless
        beauty. Every creation reflects authenticity, precision, and artistic
        excellence.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">

      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-3">
          💎 Semi-Precious Stone Statues
        </h3>
        <p className="text-gray-600">
          Beautiful hand-carved statues crafted from carefully selected
          semi-precious gemstones, showcasing exceptional artistry and elegance.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-3">
          🛕 God Statues
        </h3>
        <p className="text-gray-600">
          Finely crafted spiritual idols and divine figures made from natural
          gemstones, designed with intricate detailing and devotion.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-3">
          ✨ Gemstone Carvings & Figures
        </h3>
        <p className="text-gray-600">
          Artistic gemstone carvings and decorative figures that beautifully
          showcase creativity, craftsmanship, and natural stone beauty.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-3">
          🎨 Craft & Handicraft Items
        </h3>
        <p className="text-gray-600">
          A unique collection of handcrafted gemstone décor and traditional
          handicraft products that bring elegance and positive energy to every
          space.
        </p>
      </div>

    </div>
  </div>
</section>

{/* Target Market */}
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
      Our Global Presence
    </h2>

    <p className="text-gray-600 leading-8 text-center max-w-5xl mx-auto">
      Crystal Jaipuria proudly serves customers across international markets,
      offering premium gemstone and handicraft products to wholesalers,
      retailers, collectors, interior designers, and spiritual organizations.
      Our commitment to quality, authenticity, and ethical sourcing has earned
      us the trust of customers around the world.
    </p>

  </div>
</section>

{/* Experience */}
<section className="py-16">
  <div className="max-w-6xl mx-auto px-6">

    <div className="bg-indigo-600 rounded-2xl text-white p-10 text-center">

      <h2 className="text-4xl font-bold mb-4">
        25+ Years of Excellence
      </h2>

      <p className="leading-8 max-w-4xl mx-auto">
        With over <strong>25 years of experience</strong>, Crystal Jaipuria has
        established itself as a trusted name in gemstone artistry and
        handicrafts. Our expertise lies in creating exquisite gemstone figures,
        spiritual god statues, semi-precious stone sculptures, and exclusive
        handcrafted masterpieces. Every product reflects our dedication to
        superior craftsmanship, authenticity, and customer satisfaction.
      </p>

    </div>

  </div>
</section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="font-semibold text-lg">Premium Quality</h3>
              <p className="text-gray-600 mt-2">
                Carefully selected crystals, gemstones and handcrafted products.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-4xl mb-4">🛕</div>
              <h3 className="font-semibold text-lg">Authentic Collection</h3>
              <p className="text-gray-600 mt-2">
                Wide range of spiritual idols, yantras and puja essentials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold text-lg">Fast Delivery</h3>
              <p className="text-gray-600 mt-2">
                Safe packaging and reliable delivery across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-semibold text-lg">Customer First</h3>
              <p className="text-gray-600 mt-2">
                Dedicated support with a focus on customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>

        <p className="text-gray-600 leading-8">
          Our mission is to make authentic gemstones, healing crystals,
          handcrafted jewellery, spiritual idols, and traditional handicrafts
          accessible to every home while preserving the rich heritage of Jaipur's
          artisans. We believe every product should reflect quality, trust, and
          positive energy.
        </p>
      </section>
    </div>
  );
};

export default About;