import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="bg-white">

      {/* Header */}
      <section className="bg-gray-100 py-12 text-center">
        <h1 className="text-4xl font-bold text-indigo-600 ">Contact Us</h1>
        <p className="text-gray-600 mt-3">
          We are here to help you. Get in touch with Crystal Jaipuria.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <div className="bg-white shadow-lg p-6 rounded-xl border">
          <h2 className="text-2xl font-semibold mb-6">Send Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full border p-3 rounded-lg"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* CONTACT INFO */}
        <div className="space-y-6">

          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">📍 Address</h3>
            <p className="text-gray-600">
              Malpura Gate, Hanuman Nagar, Kishan Colony, Sanganer, Jaipur, Rajasthan
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">📞 Call Us</h3>
            <a href="tel:+918955613237" className="text-indigo-600 font-medium">
              +91 8955613237
            </a>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">📧 Email</h3>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=crystaljaipurya@gmail.com" className="text-indigo-600 font-medium" target="_blank" rel="noopener noreferrer">
              crystaljaipurya@gmail.com
            </a>
          </div>

          <div className="flex gap-4">
            <a
              href="tel:+918955613237"
              className="flex-1 bg-green-500 text-white text-center py-3 rounded-lg"
            >
              Call
            </a>

            <a
              href="https://wa.me/918955613237"
              target="_blank"
              className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg"
            >
              WhatsApp
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=crystaljaipurya@gmail.com"
              target="_blank"
              className="flex-1 bg-indigo-600 text-white text-center py-3 rounded-lg"
            >
              Email
            </a>
          </div>

        </div>
      </section>

      {/* MAP */}
      <section className="w-full px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Our Location</h2> 
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3560.882410774894!2d75.77853122463885!3d26.811872564418394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sMalpura%20gate%2C%20hanuman%20nagar%2C%20kishan%20colony%2C%20Sanganer%2C%20Jaipur%2C%20Rajasthan%20302029!5e0!3m2!1sen!2sus!4v1783082798687!5m2!1sen!2sus"
            width="100%"
            height="400"
            className="rounded-xl border"
            loading="lazy"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Contact;