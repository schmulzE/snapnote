"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import generateColorFromText from '@/utils/generateColorFromText';

interface Tag {
  _id: string;
  name: string;
}


export const TagList = () => {
  const [tags, setTags] = useState<Tag[]>([])
  const pathname = usePathname()
  
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
    <ul className='space-y-2 flex flex-col'>
      {
        tags.map((tag: any) => (
          <Link key={tag._id} href={'/tag/' + tag.name} className={`items-center flex gap-x-2 p-1 ${pathname === '/tags/' + tag.name ? 'bg-gray-200 rounded' : ''}`}>
          <i 
          style={{ color: generateColorFromText(tag.name)}} 
          className={`ri-bookmark-fill text-xl`}></i>
            <span>{tag.name}</span>
          </Link>
        ))
      }
    </ul>
  )
}

export const Tags = () => {
  return(
    <>
      <h3 className='uppercase font-medium'>tags</h3>
      <TagList/>
    </>
  )
}

export default Tags;