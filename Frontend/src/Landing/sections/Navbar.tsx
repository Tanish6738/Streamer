import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#181A20] bg-opacity-95 px-6 py-3 flex items-center justify-between shadow-md border-b border-[#23272F]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-white tracking-tight transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
          Streamio
        </span>
      </div>
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-[#C7C9D3] font-medium text-base">
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer">
          Home
        </li>
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer">
          Browse
        </li>
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer">
          Live
        </li>
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer">
          Pricing
        </li>
      </ul>
      {/* Auth Buttons */}
      <div className="hidden md:flex gap-3">
        <button className="px-4 py-1.5 rounded-full bg-transparent border border-[#353945] text-[#C7C9D3] font-medium hover:bg-[#23272F] hover:text-white transition-colors">
          Sign In
        </button>
        <button className="px-4 py-1.5 rounded-full bg-[#ff512f] text-white font-medium hover:bg-[#dd2476] transition-colors">
          Sign Up
        </button>
      </div>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-7 h-1 bg-[#C7C9D3] rounded transition-all ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-1 bg-[#C7C9D3] rounded transition-all ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-1 bg-[#C7C9D3] rounded transition-all ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#181A20] bg-opacity-98 flex flex-col items-center gap-6 py-6 md:hidden shadow-lg border-b border-[#23272F] animate-fade-in">
          <ul className="flex flex-col gap-4 text-[#C7C9D3] font-medium text-base">
            <li className="hover:text-[#ff512f] transition-colors cursor-pointer">
              Home
            </li>
            <li className="hover:text-[#ff512f] transition-colors cursor-pointer">
              Browse
            </li>
            <li className="hover:text-[#ff512f] transition-colors cursor-pointer">
              Live
            </li>
            <li className="hover:text-[#ff512f] transition-colors cursor-pointer">
              Pricing
            </li>
          </ul>
          <div className="flex gap-3 mt-2">
            <button className="px-4 py-1.5 rounded-full bg-transparent border border-[#353945] text-[#C7C9D3] font-medium hover:bg-[#23272F] hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-4 py-1.5 rounded-full bg-[#ff512f] text-white font-medium hover:bg-[#dd2476] transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
