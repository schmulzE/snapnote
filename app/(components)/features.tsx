import React from 'react';
import Image from 'next/image';
import FolderPage from "@/public/Folders Page.png";
import StickyNote from "@/public/stickynote.png";

const Features = () => {
  return (
    <>
      <div className="flex justify-between items-center mt-16 px-36">
        <div className='self-center'>
          <h4 className='text-gray-500'>Features</h4>
          <div className="flex items-center">
            <i className="ri-sticky-note-line text-3xl"></i>
            <h1 className='text-3xl font-bold capitalize flex items-center'>sticky notes</h1>
          </div>
          <p className='w-[300px] mt-4 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloribus nemo id vitae quos eum? Ex voluptate similique voluptas voluptatum!</p>
        </div>
        <div className='p-20 rounded-3xl bg-gray-100'>
          <Image src={StickyNote} width={300} alt={'an image of sticky notes'}/>
        </div>
      </div> 
      <div className="flex justify-between items-center mt-16 mb-16 px-36">
        <div className='pr-12 pt-12 rounded-3xl bg-gray-100'>
          <Image src={FolderPage} width={600} alt={'an image of sticky notes'}/>
        </div>
        <div className='self-center mx-auto'>
          <h4 className='text-gray-500'>Feature</h4>
          <h1 className='text-3xl font-bold capitalize flex items-center'>
            <i className="ri-folder-line text-3xl"></i>folders</h1>
          <p className='w-[300px] mt-4 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloribus nemo id vitae quos eum? Ex voluptate similique voluptas voluptatum!</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-16 mb-16 px-36">
        <div className='self-center mx-auto'>
          <h4 className='text-gray-500'>Feature</h4>
          <h1 className='text-3xl font-bold capitalize flex items-center'>
            <i className="ri-task-line text-3xl"></i>task</h1>
          <p className='w-[300px] mt-4 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est doloribus nemo id vitae quos eum? Ex voluptate similique voluptas voluptatum!</p>
        </div>
        <div className='pl-12 pt-12 rounded-3xl bg-gray-100'>
          <Image src={FolderPage} width={600} alt={'an image of sticky notes'} className=''/>
        </div>
      </div>
    </>
  )
}

export default Features
