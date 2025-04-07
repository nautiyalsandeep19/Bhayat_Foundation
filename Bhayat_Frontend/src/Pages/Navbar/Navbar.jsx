import { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShareAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import { AuthContext } from "../context/AuthContext";
import { assets } from "../../myassets";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [shareDropdown, setShareDropdown] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const shareUrl = window.location.href;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/Programs" },
    { name: "About Us", path: "/about" },
    { name: "Certifications", path: "/Certifcation" },
    { name: "Fund Raise", path: "/fundraise" },
    { name: "Donate Now", path: "/donate", isButton: true },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/");
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between py-3 flex-wrap gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={assets.logo} alt="Logo" className="h-12 sm:h-14 w-auto" />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-4">
            {navItems.map((item) =>
              item.isButton ? (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {item.name}
                </NavLink>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `py-2 text-sm font-medium ${
                      isActive
                        ? "text-red-800 border-b-2 border-red-800"
                        : "text-gray-700 hover:text-red-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              )
            )}
          </nav>

          {/* Icons Section */}
          <div className="flex items-center gap-4 ">

            {/* User Icon with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setUserDropdown(true)}
              onMouseLeave={() => setUserDropdown(false)}
            >
              <CiUser className="text-3xl text-gray-700 hover:text-red-800 cursor-pointer" />
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-1 z-50 border top-0">
                  {!user ? (
                    <>
                      <Link to="/signupLogin" className="block px-4 py-2 text-sm hover:bg-gray-100">Login / Sign Up</Link>
                      <Link to="/Volunteer" className="block px-4 py-2 text-sm hover:bg-gray-100">Join Us</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/Profile" className="block px-4 py-2 text-sm hover:bg-gray-100">My Profile</Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 bg-white text-black text-sm hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white bg-black p-2 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-[80px] left-0 w-[300px] h-full bg-white z-40 shadow-md transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-16 space-y-6 text-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block ${
                  item.isButton
                    ? "bg-red-800 hover:bg-red-900 text-white text-center py-3 rounded-full font-medium"
                    : isActive
                    ? "text-red-800 font-medium"
                    : "text-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Share section for mobile */}
          <div>
            <p className="text-sm mb-2">Share:</p>
            <div className="flex gap-4">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                  alt="Instagram"
                  className="w-8 h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
