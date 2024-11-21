"use client"

import React from 'react';
import AddTag from '../tags/addTag';
import { Tag } from '@/models/tag';
import TagList from '../tags/tagList';

export const Tags = ({ tags }: { tags: Tag[]}) => {
  return(
    <>
      <TagList tags={tags}/>
      <AddTag/>
    </>
  )
}

export default Tags;