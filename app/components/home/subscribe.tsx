import React from 'react';
import { Button, Input } from '@nextui-org/react';

const Subscribe = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-500 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
            <p className="mx-auto max-w-[600px] md:text-xl">
              Join thousands of users and start organizing your thoughts today.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input className="flex-1 bg-white text-black" placeholder="Enter your email" type="email" />
              <Button type="submit" className="bg-white text-purple-600 hover:bg-gray-100 rounded-sm">Sign Up</Button>
            </form>
            <p className="text-xs">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe