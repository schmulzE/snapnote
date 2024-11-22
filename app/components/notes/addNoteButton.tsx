'use client'

import React from 'react';
import Link from 'next/link'

const AddNoteButton = ({folderId}: { folderId?: string}) => {
  
  return (
    <Link 
      href={folderId ? `/folders/${folderId}/create` : '/notes/create'} 
      className='w-24 fixed bottom-4 left-[35%] rounded-full p-1 md:h-52 md:shadow-none md:relative md:bottom-0 md:left-0 md:w-52 md:bg-content1 md:flex md:flex-col md:items-center md:justify-center md:rounded-md lg:p-0 shadow-lg lg:shadow-none lg:relative lg:bottom-0 lg:w-80 lg:h-52 bg-background lg:bg-content2 flex flex-col items-center justify-center lg:rounded-md'
      >
        <i className="ri-add-fill text-md text-blue-500 md:text-4xl md:text-gray-500 lg:text-5xl lg:text-gray-500"></i>
        <span className="block text-sm md:hidden lg:hidden">New note</span>
    </Link>
  )
}

export default AddNoteButton;