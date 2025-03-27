import { Home, BookOpen, List, Mail, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-[#F9EAE1] py-5 px-6 flex justify-between items-center">
      {/* Logo with Bungee Shade font */}
      <div
        className="text-4xl font-bold text-[#2F2F2F]"
        style={{ fontFamily: "VT323" }}
      >
        Bakdient
      </div>

      {/* Navigation Links with Montserrat Alternates */}
      <div
        className="flex space-x-6"
        style={{ fontFamily: "Montserrat Alternates" }}
      >
        <button className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition mx-3">
          <Home className="w-5 h-5 mr-1" /> Home
        </button>
        <button className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition mx-3">
          <BookOpen className="w-5 h-5 mr-1" /> Recipes
        </button>
        <button className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition mx-3">
          <List className="w-5 h-5 mr-1" /> Features
        </button>
        <button className="flex items-center text-[#2F2F2F] hover:text-gray-600 transition mx-3">
          <Mail className="w-5 h-5 mr-1" /> Contact
        </button>
      </div>

      {/* Sign In / Sign Out Buttons */}
      <div
        className="flex space-x-3"
        style={{ fontFamily: "Montserrat Alternates" }}
      >
        <button className="flex items-center justify-center px-5 h-10 border border-gray-500 rounded-full hover:bg-gray-200 transition">
          <LogIn className="w-5 h-5 mr-1.5" /> Sign In
        </button>

        <button className="flex items-center justify-center px-5 h-10 bg-[#DC7F9B] text-white rounded-full hover:bg-[#c96e8a] transition">
          <LogOut className="w-5 h-5 mr-1.5" /> Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
