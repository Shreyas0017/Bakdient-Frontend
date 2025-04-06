import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  BookOpen,
  List,
  Mail,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#F9EAE1] py-4 px-4 md:py-5 md:px-6">
      <div className="flex justify-between items-center">
        {/* Logo - Now wrapped in Link */}
        <Link to="/" className="no-underline">
          <div
            className="text-3xl md:text-4xl font-bold text-[#2F2F2F] cursor-pointer"
            style={{ fontFamily: "VT323" }}
          >
            Bakdient
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#2F2F2F] focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex space-x-6"
          style={{ fontFamily: "Montserrat Alternates" }}
        >
          <Link
            to="/"
            className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition mx-3"
          >
            <Home className="w-5 h-5 mr-1" /> Home
          </Link>
          <Link
            to="/recipes"
            className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition mx-3"
          >
            <BookOpen className="w-5 h-5 mr-1" /> Recipes
          </Link>
          <Link
            to="/features"
            className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition mx-3"
          >
            <List className="w-5 h-5 mr-1" /> Features
          </Link>
        </div>

        {/* Desktop Sign In / Sign Out Buttons */}
        <div
          className="hidden md:flex space-x-3"
          style={{ fontFamily: "Montserrat Alternates" }}
        >
          <button className="flex items-center justify-center px-5 h-10 border border-gray-500 rounded-full hover:bg-gray-200 transition">
            <LogIn className="w-5 h-5 mr-1.5" /> Sign In
          </button>
          <button className="flex items-center justify-center px-5 h-10 bg-[#DC7F9B] text-white rounded-full hover:bg-[#c96e8a] transition">
            <LogOut className="w-5 h-5 mr-1.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fadeIn"
          style={{ fontFamily: "Montserrat Alternates" }}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition py-2"
            >
              <Home className="w-5 h-5 mr-2" /> Home
            </Link>
            <Link
              to="/recipes"
              className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition py-2"
            >
              <BookOpen className="w-5 h-5 mr-2" /> Recipes
            </Link>
            <Link
              to="/features"
              className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition py-2"
            >
              <List className="w-5 h-5 mr-2" /> Features
            </Link>
          </div>
          <div className="flex space-x-3 mt-6">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-500 rounded-full hover:bg-gray-200 transition">
              <LogIn className="w-5 h-5 mr-1.5" /> Sign In
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-[#DC7F9B] text-white rounded-full hover:bg-[#c96e8a] transition">
              <LogOut className="w-5 h-5 mr-1.5" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
