'use client'

import { PenTool, CheckSquare, Heart, Tag, FolderOpen, Search } from "lucide-react"
import { Badge } from "../ui/badge"

const Features = () => {
  
    const features = [
      {
        icon: PenTool,
        title: "Smart Note Taking",
        description: "Create rich, formatted notes with our intuitive editor. Support for markdown, images, and more.",
        color: "bg-blue-500",
      },
      {
        icon: CheckSquare,
        title: "Todo Integration",
        description: "Transform any note into actionable todos. Track progress and never miss a deadline.",
        color: "bg-green-500",
      },
      {
        icon: Heart,
        title: "Favorite Notes",
        description: "Mark important notes as favorites for quick access. Your most valuable content, always at hand.",
        color: "bg-red-500",
      },
      {
        icon: Tag,
        title: "Custom Tags",
        description: "Create personalized tags to categorize and find your notes instantly. Your system, your way.",
        color: "bg-purple-500",
      },
      {
        icon: FolderOpen,
        title: "Smart Folders",
        description: "Organize notes into folders and subfolders. Drag, drop, and structure your knowledge.",
        color: "bg-orange-500",
      },
      {
        icon: Search,
        title: "Powerful Search",
        description: "Find any note, tag, or todo in seconds with our advanced search capabilities.",
        color: "bg-teal-500",
      },
    ]
      
  return (
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0"
            >
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to transform how you capture, organize, and act on your ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-white to-slate-50"
                >
                  <div className="p-8">
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
  )
}

export default Features
