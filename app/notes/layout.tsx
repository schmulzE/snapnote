"use client"

import React, { ReactNode } from 'react';
import { Input } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NoteLayout = ({children} : {children : ReactNode}) => {
  const pathname = usePathname()
  return (
    <div className=' h-screen overflow-hidden'>
      <div className='border-b'>
        <div className='flex max-w-sm justify-between p-2 items-center gap-x-2'>
          <p>tab</p>
          <Input
            size="sm"
            placeholder='search'
            type="text"
            className=" w-48"
            startContent={
              <i className="ri-search-line text-xl"/>
            }
          />
          <div className='flex items-center gap-3'>
            <i className="ri-folder-add-line"></i>
            <i className="ri-archive-line"></i>
            <i className="ri-delete-bin-7-line"></i>
          </div>
          </div>
      </div>
      <div className='flex h-screen w-full'>
        <div className='border-r flex flex-col justify-between items-center sticky top-0 w-16 pt-2 pb-14'>
          <div className='space-y-4 flex-col flex'>
          <Link href="/notes" className={`link ${pathname === '/notes' ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <i className="ri-file-3-line text-xl"></i>
          </Link>
          <Link href="/todos" className={`link ${pathname === '/todo' ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <i className="ri-list-unordered text-xl"></i>
          </Link>
          <Link href="/folders" className={`link ${pathname === '/folder' ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <i className="ri-folders-line text-xl"></i>
          </Link>
          <Link href="/bookmarks" className={`link ${pathname === '/bookmark' ? 'bg-gray-200 p-1 rounded' : ''}`}>
          <i className="ri-bookmark-line text-xl"></i>
          </Link>
          </div>
          <div className='space-y-4 flex flex-col' >
            <Link href="/faq" className={`link ${pathname === '/faq' ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <i className="ri-question-line text-2xl"></i>
            </Link>
            <Link href="/settings" className={`link ${pathname === '/settings' ? 'bg-gray-200 p-1 rounded' : ''}`}>
              <i className="ri-settings-3-line text-2xl"></i>
            </Link>
          </div>
        </div>
        <div className='w-full'>
        {children}
        </div>
      </div>
    </div>
  )
}

export default NoteLayout
