'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PenTool } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardBody } from "@nextui-org/react"

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault()
      try {
        setLoading(true);
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false, // Disable automatic redirect
        });

        if (res?.error) {
          // Show specific error messages based on the error
          if (res.error === "Email not found") {
            toast.error("Email not found. Please check your email or sign up.");
          } else if (res.error === "Incorrect password") {
            toast.error("Incorrect password. Please try again.");
          } else {
            toast.error("Invalid credentials. Please try again.");
          }
          setLoading(false);
          return;
        }

        // If no error, redirect manually
        setLoading(false);
        router.replace("notes");
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8 font-mono">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex-col">
          {/* <div className="flex items-center justify-center">
            <Image src={logo} alt={'snapnote logo'} width={100}/>
          </div> */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              snapnote
            </span>
          </div>
          <h2 className="text-2xl font-bold text-center">Log in to SnapNote</h2>
          <div className="text-center text-xs">
            Enter your email and password to access your account
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Email"
                placeholder="Enter your email"
                labelPlacement="outside"
              />
            </div>
            <div className="space-y-2">
            <Input
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              labelPlacement="outside"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <i className="ri-eye-line text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <i className=" ri-eye-off-line text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            </div>
            <Button 
            type="submit" 
            isLoading={loading} 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-white "
            >Log in
            </Button>
          </form>
        </CardBody>
          <div className="text-sm text-center my-4">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </div>
      </Card>
    </div>
  )
}
