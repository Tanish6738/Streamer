const About = () => {
  return (
    <section className="w-full flex items-center justify-center bg-gradient-to-b from-[#181A20] to-[#232526] py-20 px-4 border-t border-[#23272F]">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-14 md:gap-20">
        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-tr from-[#232526] to-[#353945] rounded-3xl flex items-center justify-center shadow-2xl border-2 border-[#23272F] relative group">
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
              <rect x="15" y="30" width="80" height="50" rx="12" fill="#232526" stroke="#ff512f" strokeWidth="4" />
              <rect x="30" y="45" width="50" height="20" rx="6" fill="#353945" />
              <circle cx="55" cy="55" r="10" fill="#ff512f" />
            </svg>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#ff512f]/20 to-[#dd2476]/10 blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
          </div>
        </div>
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center text-[#F4F4F6] animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white tracking-tight">About Streamio</h2>
          <p className="text-lg md:text-xl text-[#C7C9D3] mb-6 leading-relaxed">
            Streamio is your gateway to a universe of entertainment. Our platform brings together the best movies, TV shows, and live streams, all in one place. Enjoy seamless streaming, personalized recommendations, and a vibrant community—anytime, anywhere.
          </p>
          <ul className="list-none flex flex-col gap-3 mb-2 w-full">
            <li className="flex items-center gap-3 text-base md:text-lg text-[#C7C9D3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff512f] inline-block"></span>
              Unlimited access to top content
            </li>
            <li className="flex items-center gap-3 text-base md:text-lg text-[#C7C9D3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff512f] inline-block"></span>
              Personalized recommendations
            </li>
            <li className="flex items-center gap-3 text-base md:text-lg text-[#C7C9D3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff512f] inline-block"></span>
              Watch on any device
            </li>
            <li className="flex items-center gap-3 text-base md:text-lg text-[#C7C9D3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff512f] inline-block"></span>
              Connect with a global community
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;