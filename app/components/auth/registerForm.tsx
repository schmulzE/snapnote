'use client'

import { toast } from 'sonner';
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { createUser } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import SubmitButton from '../ui/submitButton'
import { Card, CardBody, CardHeader, Input, Link } from "@nextui-org/react"

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const router = useRouter();
  
  const handleCreateUser = async (prevState: any, formData: FormData) => {
    const result = await createUser(prevState, formData)
    if (result.success) {
      router.push('/')
    }
    return result
  }

  const [state, formAction] = useFormState(handleCreateUser, null)

  useEffect(() => {
    if (!state) return;
    if(state.success) {
      toast.success(state.message)
    }else {
      toast.error(state.message)
    }
  }, [state, state?.message, state?.success]);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <Card className="w-full max-w-md bg-background">
        <CardHeader className="flex flex-col items-center pb-0">
          <h2 className="text-2xl font-bold text-center">Create your account</h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <form action={formAction} className="space-y-8">
            <Input
              type="text"
              label="Full Name"
              name='name'
              placeholder="Enter your full name"
              labelPlacement="outside"
            />
            <Input
              type="email"
              name='email'
              label="Email"
              placeholder="Enter your email"
              labelPlacement="outside"
              />
            <Input
              label="Password"
              name='password'
              placeholder="Create a password"
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
            <SubmitButton 
            text='Sign up' 
            color={undefined} 
            className="w-full font-bold cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            />
          </form>
        </CardBody>
        <p className="my-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  )
}
