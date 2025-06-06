"use client"

import React from 'react';
import Link from 'next/link';
import { Tag } from '@/models/tag';
import { Button } from '@nextui-org/react';
import { deleteTag } from '@/actions/tags';
import { usePathname, useRouter } from 'next/navigation';
import generateColorFromText from '@/utils/generateColorFromText';

const TagItem = ({tag} : {tag: Tag}) => {
  const router = useRouter()
  const pathname = usePathname();

  const deleteTagHandler = async(id: string) => {
    if(confirm('Are you sure you want to delete this tag') === true){
      await deleteTag(id);
      router.refresh()
    }
  }

  return (
    <li 
    key={tag._id} 
    className='flex items-center justify-between group font-mono' 
    >
      <Link 
      href={'/tags/' + tag.name} 
      className={`items-center flex flex-1 gap-x-2 p-1.5 ${pathname === `tags/${tag.name}` ? 'bg-gray-200 rounded' : ''}`}
      >
        <i 
        style={{ color: generateColorFromText(tag.name)}} 
        className={`ri-bookmark-fill text-xl`}
        >  
        </i>
        <span className=''>{tag.name}</span>
      </Link>
    <Button
    onClick={() => deleteTagHandler(tag._id!)} 
    isIconOnly 
    className={tag.createdBy ? 'bg-transparent hidden group-hover:block' : 'hidden'}
    >
      <i className="ri-delete-bin-line text-base text-foreground"></i>
    </Button>
    </li>
  )
}

export default TagItem
