import { useState } from "react";
import faqs from "../data/faqs";
import { Link } from "react-router-dom";
const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 md:px-6">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="w-8 h-px bg-saffron" />
            <p className="text-saffron text-xs tracking-[0.3em] uppercase font-inter">
              Help
            </p>
            <div className="w-8 h-px bg-saffron" />
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl text-primary font-bold mb-4">
            Travel Essentials
          </h2>
          <p className="text-primary/50 font-inter text-sm md:text-base max-w-xl mx-auto">
            Mukteshwar jaane se pehle — ye sawaal zaroor pooche jaate hain!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300
                  ${isOpen
                    ? "border-saffron/40 shadow-md"
                    : "border-primary/10 shadow-sm"
                  }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between px-5 md:px-7 py-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    {/* Active indicator */}
                    <div
                      className={`w-1 h-6 rounded-full transition-all duration-300
                        ${isOpen ? "bg-saffron" : "bg-primary/20"}`}
                    />
                    <span className={`font-inter text-sm md:text-base font-medium transition-colors duration-300
                      ${isOpen ? "text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                      {faq.question}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300
                      ${isOpen
                        ? "bg-saffron text-primary rotate-45"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                      }`}
                  >
                    <span className="text-sm font-bold leading-none">+</span>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="px-5 md:px-7 pb-6 ml-5">
                    <div className="w-full h-px bg-primary/5 mb-4" />
                    <p className="text-primary/60 font-inter text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
      {/* Bottom CTA */}
<div className="text-center mt-12">
  <p className="text-primary/40 font-inter text-sm mb-4">
    Aur sawaal hain? Hum yahan hain!
  </p>
  <Link
    to="/contact"
    className="inline-flex items-center gap-2 border border-primary/20 text-primary font-inter text-sm font-medium px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
  >
    Contact Us →
  </Link>
</div>

      </div>
    </section>
  );
};

export default FAQSection;