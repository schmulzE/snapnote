"use client"

import NoteItem from './noteItem';
import { Note } from '@/models/note';
import { Spinner } from '@nextui-org/react';
import AddNoteButton from './addNoteButton';
import { usePathname } from 'next/navigation';
import SearchInput from '../shared/searchInput';
import { useSidebar } from '@/app/sidebarProvider';

interface NoteListProps{ 
  notes: Note[],
  isLoading: boolean,
  folderId : string | undefined, 
  deleteNoteHandler: (id: string) => void, 
  toggleFavouriteNote: (id : string) => void, 
  lastNoteElementRef: (node: HTMLLIElement | null) => void 
}

const NoteList = ({ notes, folderId, lastNoteElementRef, deleteNoteHandler, toggleFavouriteNote, isLoading }: NoteListProps) => {
  const pathname = usePathname();
  const {isMobile} = useSidebar()

  return (
    <>
    {isMobile && <SearchInput/>}
      <ul className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-4 gap-x-6 lg:gap-x-2 p-2 lg:p-4 mt-2 lg:mt-0'>
        {notes.map((note, index) => (
          <NoteItem 
          key={note._id} 
          ref={index === notes.length - 1 ? lastNoteElementRef : null} 
          note={note} 
          isActive={pathname === `/notes/${note._id}`}
          deleteNoteHandler={deleteNoteHandler}
          toggleFavouriteNote={toggleFavouriteNote}
          />
        ))}
        <AddNoteButton folderId={folderId}/>
      </ul>
      {isLoading ??
      <div className='flex justify-center content-center'>
        <Spinner color="default" labelColor="foreground"/>
      </div>
      }
    </>
  )
}

export default NoteList