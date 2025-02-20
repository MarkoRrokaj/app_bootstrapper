"use client";

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-200 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

      {/* Contact Form */}
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Your Message"
          className="textarea textarea-bordered w-full"
          rows="4"
        ></textarea>
        <button className="btn btn-primary w-full">Send Message</button>
      </form>

      {/* Contact Details */}
      <div className="mt-6 p-4 bg-base-100 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold">Get in Touch</h3>
        <p className="mt-2">📧 Email: contact@yourcompany.com</p>
        <p>📞 Phone: +123 456 7890</p>
        <p>📞 Support: +987 654 3210</p>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 flex justify-center gap-4">
        <a href="https://instagram.com" className="btn btn-outline btn-accent">
          Instagram
        </a>
        <a href="https://twitter.com" className="btn btn-outline btn-info">
          Twitter
        </a>
        <a href="https://linkedin.com" className="btn btn-outline btn-primary">
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Contact;
