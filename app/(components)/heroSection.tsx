import React from 'react';
import NotePage from "@/public/Notes Page.png";
import logo from '@/public/logo-black.svg';
import { Divider } from "@nextui-org/react";
import Image from "next/image";


const HeroSection = () => {
  return (
    <>
      <div className="relative w-full flex justify-center py-0 px-[60px] mt-16">
        <div className="relative max-w-[900px]">
          <div className="flex flex-col content-center items-center justify-center gap-y-24">
            <Image src={logo} alt={'snapnote logo'} width={600} className='rounded-xl'/>
            <div className="flex h-5 items-center space-x-4 text-small max-w-[600px]">
              <div className="text-right">Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
              <Divider orientation="vertical" />
              <div className="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
            </div>
          </div>
          <Image src={NotePage} width={1200} height={500} alt={"screenshot of the notepage"} className="mt-16 shadow-lg"/>
        </div>
      </div>

      <div className="blob w-[800px] h-[800px] rounded-[999px] absolute top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
      <div className="blob w-[1000px] h-[1000px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-red-200 via-gray-100 to-blue-100"></div>
      <div className="blob w-[600px] h-[600px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-slate-100 via-teal-100 to-blue-100"></div>
      <div className="blob w-[300px] h-[300px] rounded-[999px] absolute bottom-[-10px] left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-green-200 via-cyan-200 to-Fuchsia-300"></div>
    </>
  )
}

export default HeroSection