import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#181A20] border-t border-[#23272F] py-8 px-4 flex flex-col items-center gap-4 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl font-bold text-white tracking-tight hover:scale-110 transition-transform cursor-pointer">Streamio</span>
        <span className="text-[#C7C9D3] text-sm">© {new Date().getFullYear()} All rights reserved.</span>
      </div>
      <div className="flex gap-5 mt-2">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-[#C7C9D3] hover:text-[#ff512f] transition-colors text-xl focus:scale-110 active:scale-95">
          <FaTwitter />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#C7C9D3] hover:text-[#ff512f] transition-colors text-xl focus:scale-110 active:scale-95">
          <FaYoutube />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#C7C9D3] hover:text-[#ff512f] transition-colors text-xl focus:scale-110 active:scale-95">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
