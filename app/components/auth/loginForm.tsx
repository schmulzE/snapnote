'use client'

import { useState } from 'react'
import Link from 'next/link'
import logo from '@/public/logo-black.svg';
import Image from 'next/image';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardHeader, CardBody } from "@nextui-org/react"

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
      });

      if (res?.error) {
        setLoading(false);
        setError("Invalid Credentials");
        return;
      }

      setLoading(false);
      router.replace("notes");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex-col">
          <div className="flex items-center justify-center">
            <Image src={logo} alt={'snapnote logo'} width={100}/>
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
            <Button type="submit" isLoading={loading} className="w-full bg-black text-white ">Log in</Button>
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
