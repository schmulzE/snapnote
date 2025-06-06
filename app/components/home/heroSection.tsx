import Link from 'next/link';
import { Badge } from '../ui/badge';
import React, { useEffect, useState } from 'react';
import { Zap, ArrowRight, Tag, Heart, CheckSquare, Star, FolderOpen, Plus } from 'lucide-react';


const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Badge
                variant="secondary"
                className="mb-6 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 hover:scale-105 transition-transform duration-200"
              >
                <Zap className="w-4 h-4 mr-2" />
                Supercharge Your Productivity
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Your thoughts,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  organized
                </span>{" "}
                and{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  actionable
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                The ultimate note-taking app that transforms your ideas into organized knowledge. Create, tag, organize,
                and turn notes into todos seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href="/login"
                  className="bg-gradient-to-r flex rounded from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Taking Notes
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="#pricing"
                  className="px-8 py-3 text-lg hover:scale-105 transition-all duration-200 border rounded"
                >
                  Watch Demo
                </Link>
              </div>

              {/* Floating Elements */}
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -top-10 -right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Cards Preview */}
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 mt-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Note Card */}
            <div className="group hover:scale-105 shadow-md transition-all duration-300 hover:shadow-xl border-0 bg-white/60 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    <Tag className="w-3 h-3 mr-1" />
                    Ideas
                  </Badge>
                  <Heart className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors duration-200" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Project Brainstorm</h3>
                <p className="text-sm text-slate-600 mb-4">New app concept for productivity...</p>
                <div className="flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-slate-500">2 todos created</span>
                </div>
              </div>
            </div>

            {/* Todo Card */}
            <div className="group hover:scale-105 shadow-md transition-all duration-300 hover:shadow-xl border-0 bg-white/60 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <CheckSquare className="w-3 h-3 mr-1" />
                    Todo
                  </Badge>
                  <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Weekly Review</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-sm text-slate-600 line-through">Review last week</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-slate-300 rounded-sm"></div>
                    <span className="text-sm text-slate-600">Plan next week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Folder Card */}
            <div className="group hover:scale-105 shadow-md transition-all duration-300 hover:shadow-xl border-0 bg-white/60 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <FolderOpen className="w-6 h-6 text-orange-500" />
                  <Plus className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors duration-200" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Work Projects</h3>
                <p className="text-sm text-slate-600 mb-4">12 notes • 5 todos</p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    meetings
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    deadlines
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    +3
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection