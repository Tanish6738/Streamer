import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/User";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await UserService.getCurrentUser();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSignIn = () => navigate("/auth");
  const handleSignUp = () => navigate("/auth");
  const handleProfile = () => navigate("/profile");
  const handleLogout = async () => {
    await UserService.logoutUser();
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#181A20] bg-opacity-95 px-6 py-3 flex items-center justify-between shadow-md border-b border-[#23272F]">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}> 
        <span className="text-2xl font-bold text-white tracking-tight transition-transform duration-300 hover:scale-110 hover:-translate-y-1">
          Streamio
        </span>
      </div>
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-[#C7C9D3] font-medium text-base">
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer" onClick={() => navigate("/home")}>Home</li>
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer">Browse</li>
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer">Live</li>
        <li className="hover:text-[#ff512f] transition-colors cursor-pointer">Pricing</li>
      </ul>
      {/* Auth/User Buttons */}
      <div className="hidden md:flex gap-3 items-center">
        {loading ? null : user ? (
          <>
            <button onClick={handleProfile} className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-[#353945] text-[#C7C9D3] font-medium hover:bg-[#23272F] hover:text-white transition-colors">
              <img src={user.avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover border border-[#ff512f]" />
              <span>{user.fullName}</span>
            </button>
            <button onClick={handleLogout} className="px-4 py-1.5 rounded-full bg-[#ff512f] text-white font-medium hover:bg-[#dd2476] transition-colors">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={handleSignIn} className="px-4 py-1.5 rounded-full bg-transparent border border-[#353945] text-[#C7C9D3] font-medium hover:bg-[#23272F] hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={handleSignUp} className="px-4 py-1.5 rounded-full bg-[#ff512f] text-white font-medium hover:bg-[#dd2476] transition-colors">
              Sign Up
            </button>
          </>
        )}
      </div>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-7 h-1 bg-[#C7C9D3] rounded transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        ></span>
        <span
          className={`block w-7 h-1 bg-[#C7C9D3] rounded transition-all ${menuOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block w-7 h-1 bg-[#C7C9D3] rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        ></span>
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#181A20] bg-opacity-98 flex flex-col items-center gap-6 py-6 md:hidden shadow-lg border-b border-[#23272F] animate-fade-in">
          <ul className="flex flex-col gap-4 text-[#C7C9D3] font-medium text-base">
            <li className="hover:text-[#ff512f] transition-colors cursor-pointer" onClick={() => {navigate("/home"); setMenuOpen(false);}}>Home</li>
            <li className="hover:text-[#ff512f] transition-colors cursor-pointer">Browse</li>
            <li className="hover:text-[#ff512f] transition-colors cursor-pointer">Live</li>
            <li className="hover:text-[#ff512f] transition-colors cursor-pointer">Pricing</li>
          </ul>
          <div className="flex gap-3 mt-2">
            {loading ? null : user ? (
              <>
                <button onClick={() => {handleProfile(); setMenuOpen(false);}} className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-[#353945] text-[#C7C9D3] font-medium hover:bg-[#23272F] hover:text-white transition-colors">
                  <img src={user.avatar} alt="avatar" className="w-7 h-7 rounded-full object-cover border border-[#ff512f]" />
                  <span>{user.fullName}</span>
                </button>
                <button onClick={() => {handleLogout(); setMenuOpen(false);}} className="px-4 py-1.5 rounded-full bg-[#ff512f] text-white font-medium hover:bg-[#dd2476] transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => {handleSignIn(); setMenuOpen(false);}} className="px-4 py-1.5 rounded-full bg-transparent border border-[#353945] text-[#C7C9D3] font-medium hover:bg-[#23272F] hover:text-white transition-colors">
                  Sign In
                </button>
                <button onClick={() => {handleSignUp(); setMenuOpen(false);}} className="px-4 py-1.5 rounded-full bg-[#ff512f] text-white font-medium hover:bg-[#dd2476] transition-colors">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
