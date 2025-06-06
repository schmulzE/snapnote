import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
  return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Ready to transform your note-taking?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Join thousands of users who have revolutionized their productivity with snapnote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="max-w-sm focus:ring-2 outline-none border focus:ring-blue-500 transition-all duration-200 p-2 rounded"
              />
              <Link
                href={'/register'}
                className="bg-gradient-to-r p-2 flex text-white rounded from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-slate-500 mt-4">No credit card required • Free 14-day trial • Cancel anytime</p>
          </div>
        </div>
      </section>
  )
}

export default CallToAction