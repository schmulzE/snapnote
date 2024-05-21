"use client"

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import parse from 'html-react-parser';
import generateColorFromText from '@/utils/generateColorFromText';

const NoteList = ({ notes, folderId }: { notes: any, folderId : string | undefined}) => {
  const pathname = usePathname();

  return (
    <ul className='flex flex-wrap gap-4'>
      {notes.map((note: any, index: number) => (
        <li 
        style={{ backgroundColor : generateColorFromText(note._id)}} 
        key={index} 
        className='text-left cursor-pointer w-72 h-72 rounded-md relative'
        >
          {note.favourite && <i className='ri-star-fill text-black absolute bottom-4 right-4'></i>}
          <Link href={`/notes/${note._id}`} className={`block p-2 w-full h-full ${pathname === `/notes/${note._id}` ? 'bg-gray-200 p-1 rounded' : ''}`}>
            <div className='text-xs mt-4 h- w-full line-clamp-6'>{note.content ? parse(`${note.content}`) : ""}</div>
          </Link>
        </li>
      ))}
      <Link href={folderId ? `/folders/${folderId}/create`:  '/notes/create'} className='w-72 h-72 bg-gray-300 flex flex-col items-center justify-center rounded-md'>
        <i className="ri-add-fill text-7xl text-gray-500"></i>
      </Link>
    </ul>
  )
}


const Notes = ({ notes, id, folderId }: {notes: any, id?: string, folderId?: string}) => {
  const [note, setNote] = useState<any>({});

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

    if(id) {
      fetchSingleNote(id)
    }
  }, [id])

  return (
    <> 
      <div className='w-full h-screen'>
        <div className='flex items-center gap-2 my-2 mb-8'>  
          <h1 className='text-4xl font-medium'>Notes</h1>
        </div>
        <NoteList notes={notes} folderId={folderId}/>
      </div>
    </>
  )
}

export default Notes