// ─── Newsletter.jsx ───────────────────────────────────────

import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    setStatus("success");
    setEmail("");
    setAgreed(false);
  };

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left — Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-saffron" />
              <p className="text-saffron text-xs tracking-[0.3em] uppercase font-inter">
                Stay Connected
              </p>
            </div>

            <h2 className="font-playfair text-3xl md:text-5xl text-white font-bold leading-tight mb-4">
              Stay Inspired <br />
              <span className="text-saffron italic">by the Himalayas</span>
            </h2>

            <p className="text-white/50 font-inter text-sm md:text-base leading-relaxed max-w-md">
              Discover travel stories, hidden places, and local experiences 
              from Mukteshwar and the beautiful Kumaon hills — delivered 
              directly to your inbox. No spam, only meaningful travel inspiration.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3">
              {[
                "Weekly travel stories from the Himalayas",
                "Hidden gems and local travel tips",
                "Seasonal guides for the best travel experiences",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-saffron rounded-full" />
                  <p className="text-white/60 font-inter text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Glassmorphism Form */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">

            <h3 className="font-playfair text-xl text-white font-bold mb-2">
              Join Our Travel Community
            </h3>

            <p className="text-white/40 font-inter text-sm mb-6">
              Join 1,200+ explorers who love the mountains.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="text-white/50 text-xs font-inter uppercase tracking-widest mb-2 block">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 font-inter text-sm focus:outline-none focus:border-saffron transition-colors"
                />
              </div>

              {/* Privacy Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 accent-saffron cursor-pointer"
                />

                <label
                  htmlFor="privacy"
                  className="text-white/40 font-inter text-xs leading-relaxed cursor-pointer"
                >
                  I agree to receive travel updates, stories, and guides 
                  from Chitranchal. You can unsubscribe anytime.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!agreed}
                className="w-full bg-saffron text-primary font-inter font-semibold py-4 rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Subscribe to Updates →
              </button>

              {/* Success */}
              {status === "success" && (
                <p className="text-center text-softgreen text-sm font-inter">
                  ✅ You're subscribed! Get ready for Himalayan travel inspiration.
                </p>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;