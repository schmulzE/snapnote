import React from 'react'

const Stats = () => {
  return (
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                10M+
              </div>
              <div className="text-blue-100">Notes Created</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                500K+
              </div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Stats