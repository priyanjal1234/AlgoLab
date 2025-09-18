import { ArrowLeft, Code, Filter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ProblemsNavbar = ({showFilters,setShowFilters}) => {
  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">Problems</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProblemsNavbar;
