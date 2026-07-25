import { useState } from "react";

const Contact = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      message
    } = form;


    const whatsappMessage = `
New Inquiry

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
`;


    const whatsappURL =
      `https://wa.me/918306317032?text=${encodeURIComponent(whatsappMessage)}`;


    window.open(whatsappURL, "_blank");

  };



  return (

    <div className="bg-white overflow-hidden">


      {/* Header */}

      <section className="
        bg-gray-100
        py-10
        sm:py-12
        text-center
        px-4
      ">

        <h1 className="
          text-3xl
          sm:text-4xl
          font-bold
          text-indigo-600
        ">
          Contact Us
        </h1>


        <p className="
          text-gray-600
          mt-3
          text-sm
          sm:text-base
        ">
          We are here to help you. Get in touch with Crystal Jaipuria.
        </p>


      </section>





      {/* Contact Section */}


      <section className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-10
        sm:py-12
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
        lg:gap-10
      ">



        {/* FORM */}


        <div className="
          bg-white
          shadow-lg
          p-5
          sm:p-6
          rounded-xl
          border
        ">


          <h2 className="
            text-xl
            sm:text-2xl
            font-semibold
            mb-5
          ">
            Send Message
          </h2>



          <form 
          onSubmit={handleSubmit}
          className="space-y-4"
          >


            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-lg
                text-sm
                sm:text-base
              "
              required
            />



            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-lg
                text-sm
                sm:text-base
              "
              required
            />



            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-lg
                text-sm
                sm:text-base
              "
              required
            />



            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="
                w-full
                border
                p-3
                rounded-lg
                text-sm
                sm:text-base
              "
              required
            />



            <button
              type="submit"
              className="
                w-full
                cursor-pointer
                bg-indigo-600
                text-white
                py-3
                rounded-lg
                hover:bg-indigo-700
              "
            >
              Send Message
            </button>



          </form>


        </div>






        {/* CONTACT INFO */}



        <div className="space-y-5">



          <div className="
            bg-gray-50
            p-5
            sm:p-6
            rounded-xl
            shadow
          ">

            <h3 className="
              text-lg
              sm:text-xl
              font-semibold
              mb-2
            ">
              📍 Address
            </h3>

            <p className="
              text-gray-600
              text-sm
              sm:text-base
              leading-7
            ">
              Bajni talai, Crystal Jaipuria, Plot No.03 West Part, Prabha,
              Mangal Vihar, Sanganer, Jaipur, Rajasthan 302029
            </p>

          </div>





          <div className="
            bg-gray-50
            p-5
            sm:p-6
            rounded-xl
            shadow
          ">

            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              📞 Call Us
            </h3>


            <a
              href="tel:+918306317032"
              className="text-indigo-600 font-medium"
            >
              +91 8306317032
            </a>


          </div>





          <div className="
            bg-gray-50
            p-5
            sm:p-6
            rounded-xl
            shadow
          ">

            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              📧 Email
            </h3>


            <a
              href="mailto:crystaljaipurya@gmail.com"
              className="
                text-indigo-600
                font-medium
                break-all
              "
            >
              crystaljaipurya@gmail.com
            </a>


          </div>





          {/* Buttons */}


          <div className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-3
          ">


            <a
              href="tel:+918955613237"
              className="
                bg-green-500
                text-white
                text-center
                py-3
                rounded-lg
              "
            >
              Call
            </a>



            <a
              href="https://wa.me/918955613237"
              target="_blank"
              className="
                bg-green-600
                text-white
                text-center
                py-3
                rounded-lg
              "
            >
              WhatsApp
            </a>




            <a
              href="mailto:crystaljaipurya@gmail.com"
              className="
                bg-indigo-600
                text-white
                text-center
                py-3
                rounded-lg
              "
            >
              Email
            </a>



          </div>



        </div>



      </section>






      {/* MAP */}



      <section className="
        w-full
        px-4
        sm:px-6
        pb-10
        sm:pb-12
      ">


        <div className="max-w-7xl mx-auto">


          <h2 className="
            text-xl
            sm:text-2xl
            font-bold
            mb-4
          ">
            Our Location
          </h2>



          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.31382765867!2d75.77720027463833!3d26.7981342650067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dcb5b941638d5%3A0xdc6c82ae60c2c87d!2sCrystal%20Jaipuria%20%E2%80%93%20Gemstone%20God%20Statues%20%26%20Crystal%20Carvings%20Manufacturer!5e0!3m2!1sen!2sin!4v1784950594965!5m2!1sen!2sin" 
            width="100%"
            height="400"
            className="
              rounded-xl
              border
              h-[300px]
              sm:h-[400px]
            "
            loading="lazy"
          ></iframe>



        </div>


      </section>



    </div>

  );
};


export default Contact;