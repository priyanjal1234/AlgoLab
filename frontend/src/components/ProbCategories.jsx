import { Award, BookOpen, Code, Target, TrendingUp, Zap } from "lucide-react";
import React from "react";

const ProbCategories = () => {
  return (
    <section id="topics" className="py-20 px-4 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Practice by Topics
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Structured learning paths to master specific algorithms and data
            structures
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Arrays & Strings",
              problems: 180,
              difficulty: "Easy to Hard",
              icon: BookOpen,
            },
            {
              name: "Dynamic Programming",
              problems: 120,
              difficulty: "Medium to Hard",
              icon: Zap,
            },
            {
              name: "Trees & Graphs",
              problems: 95,
              difficulty: "Easy to Hard",
              icon: Target,
            },
            {
              name: "System Design",
              problems: 45,
              difficulty: "Hard",
              icon: Award,
            },
            {
              name: "Linked Lists",
              problems: 65,
              difficulty: "Easy to Medium",
              icon: Code,
            },
            {
              name: "Recursion",
              problems: 85,
              difficulty: "Medium to Hard",
              icon: TrendingUp,
            },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-green-500 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <category.icon className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.difficulty}</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {category.problems} problems
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProbCategories;
