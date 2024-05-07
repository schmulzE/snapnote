"use client"

import React, {useEffect, useState} from 'react'
import { Button, useDisclosure, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Modal from './modal'
import Tab from '@/app/(components)/tab';
import NoteForm from './note-form';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import RichTextEditor from './rich-text-editor';

const Notes = ({ notes, id }: {notes: any, id?: string}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [note, setNote] = useState<any>({});
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchSingleNote(id: string | undefined) {
      try {
        const res = await fetch(`http://localhost:3000/api/notes/${id}`,  {
          cache: "no-store",
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const data = await res.json()
        setNote(data?.note)
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleNote(id)
  }, [id])

  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full max-w-xs border-r p-2 space-y-6'>
          <div className="flex justify-between items-center">
            <h2 className='text-xl capitalize'>your notes</h2>
            <Button className='bg-transparent' isIconOnly onPress={onOpen}>
              <i className="ri-file-add-line text-xl"></i>
            </Button> 
          </div>
          <ul className='space-y-2'>
            {notes.map((note: any, index: number) => (
              <li key={index} className='w-full cursor-pointer'>
                <Link href={`/notes/${note._id}`} className={`link block py-2 w-full hover:bg-gray-300 ${pathname === `/notes/${note._id}` ? 'bg-gray-200 p-1 rounded' : ''}`}>{note.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full max-w-screen-lg p-4">
          <div className="flex justify-between px-8 items-center">
            <div></div>
            <Breadcrumbs>
              <BreadcrumbItem startContent={note.folder ? <i className="ri-folder-line"/> : <i className="ri-file-line"/>} endContent={note.folder && <i className="ri-arrow-right-s-line"></i>}>
                {note.folder ? <span>{note.folder}</span> :  <span>{note.title}</span>}
              </BreadcrumbItem>
            </Breadcrumbs>
            <div className='space-x-3'>
              <button><i className="ri-tools-fill"></i></button>
              <button><i className="ri-more-2-fill"></i></button>
              <Button color="primary" className='rounded-none'>
                Share
              </Button>
            </div>
          </div>
        <h1 className='text-4xl font-bold capitalize my-8'>{note.title}</h1>
          <RichTextEditor initialContent={note.content} noteId={note._id}/>
        </div>
      </div>
      <Modal onClose={onClose} isOpen={isOpen} title='Create Note'>
        <NoteForm onClose={onClose}/>
      </Modal>
    </>
  )
}

export default Notes