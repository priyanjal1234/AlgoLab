import React from "react";

const CTA = () => {
  return (
    <section id="cta" className="py-20 px-4 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Join our community of developers and start solving problems today.
          Your dream job is just a few problems away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
            Start Free Trial
          </button>
          <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg transition-all duration-300 hover:bg-gray-900">
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
