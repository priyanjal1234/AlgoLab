import React from 'react'

const Features = ({features}) => {
  return (
    <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose CodeArena?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to become a better programmer and land your dream job
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 border border-gray-800 hover:border-gray-700"
              >
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Features