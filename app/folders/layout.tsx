"use client"

import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import TagList from '../(components)/tag-list';


interface Tag {
  _id: string;
  name: string;
}

function generateColorFromText(text: string) {
  let hash = 0;

  // Convert the input text to a unique hash value
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate a color value based on the hash value
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}

const Layout = ({children} : {children : ReactNode}) => {
  const pathname = usePathname()
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    async function getTags() {
      try {
        const res = await fetch(`http://localhost:3000/api/tags`,  {
          cache: "no-store",
        });
       
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
       
        const data = await res.json()
        setTags(data.tags)
        
      } catch (error) {
        console.log(error)
      }
    }
    getTags()
  }, [])
  return (
    <div className='flex h-screen w-full z-50 overflow-hidden'>
      <div className='flex flex-col justify-between px-2 capitalize sticky top-0 w-96 pt-2 m-2 rounded-md z-50 text-sm bg-gray-100'>
        <div className='space-y-4 w-full'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-medium'>Menu</h1>
            <Button isIconOnly className='bg-transparent'>
              <i className='ri-menu-fill text-xl'></i>
            </Button>
          </div>

          <Input
            size="sm"
            placeholder='search'
            type="text"
            className="w-full"
            startContent={
              <i className="ri-search-line text-xl"/>
            }
          />
          <div className='space-y-2 flex-col flex'>
            <Link href="/notes" className={`items-center flex gap-x-2 p-1 ${pathname === '/notes' || pathname === `/notes/:id` ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-file-3-line text-xl"></i>
              <span>note</span>
            </Link>
            <Link href="/todos" className={`items-center flex gap-x-2 p-1 ${pathname === '/todos' ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-list-unordered text-xl"></i>
              <>todos</>
            </Link>
            <Link href="/folders" className={`items-center flex gap-x-2 p-1 ${pathname === '/folders' ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-folders-line text-xl"></i>
              <span>folders</span>
            </Link>
            <Link href="/favourites" className={`items-center flex gap-x-2 p-1 ${pathname === '/favourites' ? 'bg-gray-200 rounded' : ''}`}>
              <i className="ri-star-line text-xl"></i>
              <span>favourites</span>
            </Link>
          </div>

          <div className='space-y-2 flex flex-col'>
            <h3 className='uppercase font-medium'>tags</h3>
            {
              tags.map((tag: any) => (
                <Link key={tag._id} href={'/tag/' + tag.name} className={`items-center flex gap-x-2 p-1 ${pathname === '/tags/' + tag.name ? 'bg-gray-200 rounded' : ''}`}>
                  <i style={{ color: generateColorFromText(tag.name)}} className={`ri-bookmark-fill text-xl`}></i>
                  <span>{tag.name}</span>
                </Link>
              ))
            }
          </div>   
        </div>

        <div className='space-y-4 flex flex-col text-md'>
          <Link href="/faq" className={`link items-center flex gap-x-2 ${pathname === '/faq' ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <i className="ri-logout-box-r-line text-xl"></i>
            <span>logout</span>
          </Link>
          <Link href="/settings" className={`link items-center flex gap-x-2 ${pathname === '/settings' ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <i className="ri-settings-3-line text-xl"></i>
            <span>settings</span>
          </Link>
        </div>
      </div>
      <div className='w-full px-4 overflow-auto'>
        {children}
      </div>
    </div>
  )
}

export default Layout
