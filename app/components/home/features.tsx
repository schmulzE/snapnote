'use client'

const Features = () => {
  return (
    <>
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className='bg-background shadow-sm bordered bordered-content1 p-4 rounded-md space-y-4'>
              <h1 className='text-xl font-bold'>
                <i className="ri-task-line text-xl mr-2"></i>
                Todo Integration
              </h1>
              <p className='text-md'>Seamlessly integrate todo lists within your notes for enhanced productivity.</p>
            </div>
            <div className='bg-background shadow-sm bordered p-4 rounded-md space-y-4'>
              <h1 className='text-xl font-bold'>
                <i className="ri-star-line text-xl mr-2"></i>
                Favourite Notes
              </h1>
              <p className='text-md'>Mark and easily access your most important notes with our favorite feature.</p>
            </div>
            <div className='bg-background shadow-sm bordered p-4 rounded-md space-y-4'>
              <h1 className='text-xl font-bold'>
                <i className="ri-price-tag-line text-xl mr-2"></i>
                Personalized Tags
              </h1>
              <p className='text-md'>Create custom tags to categorize and quickly find your notes.</p>
            </div>
            <div className='bg-background shadow-sm bordered p-4 rounded-md space-y-4'>
              <h1 className='text-xl font-bold'>
                <i className="ri-folder-line text-xl mr-2"></i>
                Folder Organization
              </h1>
              <p className='text-md'>Keep your notes neatly organized in customizable folders.</p>
            </div>
            <div className='bg-background shadow-sm bordered p-4 rounded-md space-y-4'>
              <h1 className='text-xl font-bold'>
                <i className="ri-search-line text-xl mr-2"></i>
                Powerful Search
              </h1>
              <p className='text-md'>Find any note instantly with our advanced search functionality.</p>
            </div>
            <div className='bg-background shadow-sm bordered p-4 rounded-md space-y-4'>
              <h1 className='text-xl font-bold'>
                <i className="ri-cloud-line text-xl mr-2"></i>
                Cloud Sync
              </h1>
              <p className='text-md'>Access your notes from any device with seamless cloud synchronization.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Features
