"use client" 

import React from 'react';
import TagItem from './tagItem';
import { Tag } from '@/models/tag';
import Dropdown from '../ui/dropdown';


export const TagList = ({ tags }: { tags: Tag[]}) => {

  return (
    <>
      <h3 className='uppercase font-medium mb-0 pb-0'>tags</h3>
      <ul className='space-y-1 flex flex-col mb-0'>
        {
          tags.slice(0, 2).map((tag: Tag) => (
            <TagItem key={tag._id} tag={tag}/>
          ))
        }
        { tags.slice(2).length > 0 && (<Dropdown 
          variant={'flat'} 
          isIconOnly={true} 
          tags={tags.slice(2)} 
          buttonClass='bg-transparent' 
          buttonIcon={<i className="ri-more-fill text-xl"></i>}/>
        )}
      </ul>
    </>
  )
}

export default TagList