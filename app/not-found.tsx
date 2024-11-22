import Image from 'next/image'
import Link from 'next/link'
import EmptyFolder from '@/public/no-results.png';
import Navbar from "@/app/components/shared/navbar";
import Footer from "@/app/components/shared/footer";

export default function NotFound() {
  return (
    <>
      <Navbar/>
      <div className='flex flex-col justify-center content-center items-center gap-y-4 my-28'>
        <Image src={EmptyFolder} width={200} alt='image of an empty folder'/>
        <h1 className='text-3xl'>Page Not Found</h1>
        <p>Could not find requested resource</p>
        <Link href="/" className='bg-gray-900 text-white p-2'>Return Home</Link>
      </div>
      <Footer/>
    </>
  )
}