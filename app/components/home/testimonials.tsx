import React from 'react'

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: "Alex Johnson", role: "Freelance Writer", quote: "NoteWorthy has revolutionized my writing process. The tagging system is a game-changer!" },
            { name: "Samantha Lee", role: "Project Manager", quote: "The todo integration within notes has significantly improved my team's productivity." },
            { name: "Michael Chen", role: "Student", quote: "I love how I can organize my study notes into folders. It makes exam preparation so much easier!" }
          ].map((testimonial, index) => (
            <div className='space-y-4 border border-content2 p-4 rounded-md' key={index}>
              <div>
                <h3 className='text-lg font-medium'>{testimonial.name}</h3>
                <p className='text-gray-400 text-md'>{testimonial.role}</p>
              </div>
              <div>
                <p>&quot;{testimonial.quote}&quot;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
