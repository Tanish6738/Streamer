
const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#181A20] via-[#23272F] to-[#232526] overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0 transition-all duration-700" />
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl px-4 py-16 gap-10">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center text-[#F4F4F6] max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 text-white animate-fade-in-up">
            Stream. Connect. Enjoy.
          </h1>
          <p className="text-base md:text-xl font-normal mb-8 text-[#C7C9D3] animate-fade-in-up delay-100">
            Dive into a world of unlimited entertainment. Watch your favorite shows, movies, and live streams anytime, anywhere.
          </p>
          <button className="px-7 py-2.5 bg-[#ff512f] rounded-full text-base font-semibold text-white shadow-md hover:bg-[#dd2476] transition-colors duration-200 focus:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ff512f]/50 animate-pop-in">
            Start Watching
          </button>
        </div>
        {/* Hero Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-60 h-60 md:w-80 md:h-80 flex items-center justify-center group">
            {/* Device Mockup */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#232526] to-[#353945] shadow-xl border-2 border-[#23272F] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
              <svg
                width="100"
                height="100"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto animate-spin-slow group-hover:animate-none"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#ff512f"
                  strokeWidth="4"
                  fill="#232526"
                />
                <polygon points="54,45 85,60 54,75" fill="#ff512f" className="transition-transform duration-300 group-hover:scale-110" />
              </svg>
            </div>
            {/* Glow Effect */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[#ff512f]/20 to-[#dd2476]/10 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

/* Tailwind custom animations (add to your global CSS if not present):
.animate-fade-in-up { @apply opacity-0 translate-y-4 animate-[fadeInUp_0.7s_ease-out_forwards]; }
.animate-pop-in { @apply scale-95 opacity-0 animate-[popIn_0.5s_ease-out_forwards]; }
.animate-spin-slow { animation: spin 6s linear infinite; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes popIn { to { opacity: 1; transform: scale(1); } }
*/