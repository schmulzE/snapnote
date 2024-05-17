"use client"

import React from 'react'
import { Button } from '@nextui-org/react';
import Popover from '@/app/(components)/ui/popover';
import { Listbox,  ListboxSection,  ListboxItem } from "@nextui-org/listbox";
import ListboxWrapper from '@/app/(components)/list-box-wrapper';


export function content({deleteNote} : {deleteNote: () => void}) {
  return (
    <ListboxWrapper>
      <Listbox
        aria-label="Actions"
        onAction={(key) => alert(key)}
      >
        <ListboxItem key="favourites">Add to favourites</ListboxItem>
        <ListboxItem key="delete" className="text-danger" color="danger">
          Delete note
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

const Toolbar = ({deleteHandler, title} : {title: string, deleteHandler : () => void}) => {
  return (
    <>
    <div className="flex justify-between px-4 items-center capitalize">
      <h1 className='text-4xl font-bold'>{title}</h1>
      <div className='space-x-3'>
        <Popover button={<button><i className="ri-more-2-fill"></i></button>} content={content}/>
        <Button color="primary" className='rounded-none'>
          Share
        </Button>
      </div>
    </div>
    </>
  )
}

export default Toolbar