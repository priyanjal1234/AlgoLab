import { ArrowRight, Code, Menu, X } from "lucide-react";
import React from "react";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold">AlgoLab</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#problems"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Problems
            </a>
            <a
              href="#contests"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contests
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <button className="text-gray-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-2 rounded-lg transition-all duration-300 transform  flex items-center space-x-2 group">
              <span>Start Solving</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Features
            </a>
            <a
              href="#problems"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Problems
            </a>
            <a
              href="#contests"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Contests
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Pricing
            </a>
            <button className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
              Sign In
            </button>
            <button className="block w-full bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg transition-colors mt-2">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
