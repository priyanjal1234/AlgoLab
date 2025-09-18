import { ArrowRight, Target } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 border border-gray-700 mb-6">
            <Target className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm text-gray-300">
              New: AI-powered coding hints available
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Master Coding
            <br />
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              One Problem at a Time
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who are sharpening their coding skills
            with our comprehensive platform. From algorithms to system design,
            we've got everything you need to ace your next interview.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/problems")}
              className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg transition-all duration-300 hover:bg-gray-900"
            >
              View Problems
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
