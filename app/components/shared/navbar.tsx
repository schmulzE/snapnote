'use client'

import React from 'react'
import Link from 'next/link';
import { Menu, PenTool, X } from 'lucide-react';

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                snapnote
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                Features
              </Link>
              <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                How it Works
              </Link>
              <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                Pricing
              </Link>
              <Link href="/login" className="hover:scale-105 transition-transform duration-200">
                Sign In
              </Link>
              <Link href="/register" className="bg-gradient-to-r text-white from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-1.5 rounded hover:scale-105 transition-all duration-200">
                Get Started
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col space-y-4">
                <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  How it Works
                </Link>
                <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                  Pricing
                </Link>
                <div className="flex flex-col space-y-2 pt-4">
                  <Link href="/login">Sign In</Link>
                  <Link href="/register" className="bg-gradient-to-r p-1 rounded text-white from-blue-500 to-purple-600">Get Started</Link>
                </div>
              </nav>
            </div>
          )}
        </div>
    </header>
  )
}