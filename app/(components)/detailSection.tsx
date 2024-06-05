import Image from 'next/image';
import React from 'react';

const DetailSection = () => {
  return (
    <div className='bg-white px-44 pt-[80px] flex-col justify-between gap-y-36'>
      <div>
        <h4 className='text-xl text-gray-500'>Introduction</h4>
        <h1 className='text-5xl font-bold'>what is <span className=' uppercase text-black bg-gray-100'>snapnote?</span></h1>
        <p className='w-[500px] mt-8 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloribus nemo id vitae quos eum? Ex voluptate similique voluptas voluptatum!</p>
      </div>
    </div>
  )
}

export default DetailSection