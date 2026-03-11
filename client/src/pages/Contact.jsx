import React from "react";
import { useState } from "react";
import axios from "axios";

const contactInfo = [
  {
    icon: "📍",
    label: "Our Location",
    value: "Mukteshwar, Nainital District\nUttarakhand — 263138",
  },
  {
    icon: "📞",
    label: "Call Us",
    value: "+91 7830152963",
  },
  {
    icon: "✉️",
    label: "Email Us",
    value: "vikassinghbishtbisht@gmail.com",
  },
  {
    icon: "🕐",
    label: "Availability",
    value: "Mon – Sun: 9AM to 7PM",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await axios.post("http://localhost:5000/api/contact", form);

      setStatus("success");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-cream">

      {/* Hero Banner */}
      <div className="bg-darkbrown py-24 px-6 text-center">
        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-3">
          Plan Your Mountain Escape
        </p>

        <h1 className="font-playfair text-5xl text-white font-bold mb-4">
          Get In Touch With Us
        </h1>

        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Have questions about your stay or planning a trip to Mukteshwar?
          We're here to help you create a peaceful and memorable mountain experience.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left Side — Contact Info */}
          <div>

            <h2 className="font-playfair text-3xl text-primary font-bold mb-3">
              About Chitranchal Mukteshwar
            </h2>

            <p className="text-darkbrown/60 leading-relaxed mb-10">
              Welcome to Chitranchal Mukteshwar — a serene retreat nestled in the
              heart of the Kumaon Himalayas. Experience breathtaking mountain
              views, peaceful surroundings, and the authentic charm of Kumaoni
              culture.
              
              Whether you're seeking relaxation, adventure, or a quiet escape
              from city life, our homestay offers the perfect place to reconnect
              with nature.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-5">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm"
                >
                  <span className="text-2xl">{info.icon}</span>

                  <div>
                    <p className="text-accent text-xs tracking-widest uppercase font-medium mb-1">
                      {info.label}
                    </p>

                    <p className="text-primary text-sm leading-relaxed whitespace-pre-line">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 rounded-2xl overflow-hidden border border-accent/20">
  <iframe
    title="Chitranchal Mukteshwar Location"
    src="https://www.google.com/maps?q=Mukteshwar,Uttarakhand&output=embed"
    className="w-full h-full border-0"
    loading="lazy"
  ></iframe>
</div>
          </div>

          {/* Right Side — Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="font-playfair text-3xl text-primary font-bold mb-2">
              Start Planning Your Stay
            </h2>

            <p className="text-darkbrown/50 text-sm mb-8">
              Tell us about your travel plans and we’ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="text-xs text-darkbrown/50 uppercase tracking-widest mb-2 block">
                  Your Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full bg-cream border border-accent/30 rounded-xl px-5 py-3 text-sm text-primary placeholder-darkbrown/30 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-darkbrown/50 uppercase tracking-widest mb-2 block">
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-cream border border-accent/30 rounded-xl px-5 py-3 text-sm text-primary placeholder-darkbrown/30 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs text-darkbrown/50 uppercase tracking-widest mb-2 block">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full bg-cream border border-accent/30 rounded-xl px-5 py-3 text-sm text-primary placeholder-darkbrown/30 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-xs text-darkbrown/50 uppercase tracking-widest mb-2 block">
                  Your Message *
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel plans or questions"
                  required
                  rows={5}
                  className="w-full bg-cream border border-accent/30 rounded-xl px-5 py-3 text-sm text-primary placeholder-darkbrown/30 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-cream font-semibold py-4 rounded-xl hover:bg-darkbrown transition-colors duration-300 disabled:opacity-50"
              >
                {status === "loading"
                  ? "Sending your message... ✈️"
                  : "Plan My Stay →"}
              </button>

              {/* Status Messages */}

              {status === "success" && (
                <p className="text-softgreen text-center text-sm">
                  ✅ Thank you! We’ve received your message and will contact you soon.
                </p>
              )}

              {status === "error" && (
                <p className="text-red-400 text-center text-sm">
                  ❌ Something went wrong. Please try again.
                </p>
              )}

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;