import React from 'react'
import { Badge } from '../ui/badge';

const HowItWorks = () => {

  const steps = [
    {
      step: "01",
      title: "Create & Write",
      description: "Start writing your thoughts, ideas, and plans in our beautiful editor.",
    },
    {
      step: "02",
      title: "Organize & Tag",
      description: "Use custom tags and folders to structure your notes exactly how you want.",
    },
    {
      step: "03",
      title: "Track & Complete",
      description: "Convert notes to todos, mark favorites, and watch your productivity soar.",
    },
  ];

  return (
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 border-0"
            >
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Simple steps to productivity</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get started in minutes and see immediate results in your productivity and organization.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center mb-12 last:mb-0">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-full h-px bg-gradient-to-r from-blue-200 to-purple-200 my-8 md:my-0 md:w-px md:h-20 md:mx-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default HowItWorks