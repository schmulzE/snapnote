/* eslint-disable react/display-name */
"use client"

import Link from 'next/link';
import parse from 'html-react-parser';
import React, { forwardRef } from 'react';
import { formatDate } from '@/utils/formatDate';
import generateColorFromText from '@/utils/generateColorFromText';

interface NoteItemProps {
  note: any;
  isActive: boolean;
  deleteNoteHandler: (id :string) => void
  toggleFavouriteNote: (id :string) => void
}

  const NoteItem = forwardRef<HTMLLIElement, NoteItemProps>((props, ref) => {
    const { note, isActive, deleteNoteHandler, toggleFavouriteNote } = props;
 
    let title = note.title?.replace(/<\/?h1[^>]*>/g, "");
    // Removes the <br> tag
    title = title.replace(/<br\s*\/?>/g, "");
  
  return (
    <li 
    ref={ref}
    className='text-left w-36 md:w-52 lg:w-80 h-52 rounded-md relative shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] bg-base-100 p-2'
    >
      <button className='absolute top-4 right-2 hidden lg:block'><i className='ri-pencil-line text-slate-500'></i></button>
      <Link href={`/notes/${note._id}`} className={`block p-2 space-y-2 w-full h-full ${isActive ? 'bg-gray-200 p-1 rounded' : ''}`}>
        <h6 className='text-md font-bold line-clamp-2'>{ title.trim() }</h6>
        <div className='text-xs'>{ formatDate(note.createdAt!) }</div>
        <div className="text-sm line-clamp-3">{ parse(note.content) }</div>
      </Link>
      <div className="flex absolute bottom-0 left-0 w-full justify-between px-4 py-2 text-slate-500 text-lg">
        <div className="flex gap-2">
          <button onClick={() => toggleFavouriteNote(note._id)}>
            {note.favourite ? <i className='ri-star-fill text-[#FFD700]'></i> : <i className='ri-star-line'></i>}
          </button>
          <div>
            {note.tag ? <i style={{ color: generateColorFromText(note.tag?.name)}} className='ri-bookmark-fill'></i> :
            <i className='ri-bookmark-line'></i> }
          </div>
        </div>
        <button onClick={() => deleteNoteHandler(note._id!)}>
          <i className='ri-delete-bin-line'></i>
        </button>
      </div>
    </li>
  );
});

export default NoteItem;
