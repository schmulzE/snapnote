"use client"

import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import Popover from '@/app/(components)/ui/popover';
import { Listbox,  ListboxSection,  ListboxItem } from "@nextui-org/listbox";
import ListboxWrapper from '@/app/(components)/listBoxWrapper';
import { useRouter } from "next/navigation";


interface FormData {
  title?: string;
  content?: string;
  createdBy?: string | undefined;
  folder?: string | undefined;
  favourite?: boolean;
}

export function Content({deleteHandler, isFavourite, toggleFavourite} : {deleteHandler: () => void, isFavourite: boolean | undefined, toggleFavourite: () => void}) {

  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions">
        <ListboxItem key="favourites" onPress={toggleFavourite}>{isFavourite ? 'Remove from favourite' : 'Add to favourite'}</ListboxItem>
        <ListboxItem onPress={deleteHandler} key="delete" className="text-danger" color="danger">
          Delete note
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
}

const Toolbar = ({ title, id, isFavourite } : {title: string, id: string, isFavourite: boolean}) => {
  const [ formData , setFormData] = useState<FormData>({favourite: isFavourite})
  const router = useRouter();

  const deleteNote = async () => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
      router.push('/notes')
    }
  };

  const toggleFavourite = async() => {
    const updatedFormData = { ...formData, favourite: !formData.favourite };
    setFormData(updatedFormData);

    const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ formData: updatedFormData  })
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    console.log('added to favourite')
  }

  return (
    <>
    <div className="flex justify-between px-4 items-center capitalize">
      <h1 className='text-4xl font-bold'>{title}</h1>
      <div className='space-x-3'>
        <Popover button={<button><i className="ri-more-2-fill"></i></button>} content={<Content deleteHandler={deleteNote} toggleFavourite={toggleFavourite} isFavourite={formData.favourite}/>}/>
        <Button color="primary" className='rounded-none'>
          Share
        </Button>
      </div>
    </div>
    </>
  )
}

export default Toolbar