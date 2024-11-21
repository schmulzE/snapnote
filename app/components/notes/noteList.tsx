"use client"

import { Note } from '@/models/note';
import NoteItem from './noteItem';
import { usePathname } from 'next/navigation';
import SearchInput from '../shared/searchInput';
import { useSidebar } from '@/app/sidebarProvider';
import AddNoteButton from './addNoteButton';

interface NoteListProps{ 
  notes: Note[], 
  folderId : string | undefined, 
  deleteNoteHandler: (id: string) => void, 
  toggleFavouriteNote: (id : string) => void, 
  lastNoteElementRef: (node: HTMLLIElement | null) => void 
}

const NoteList = ({ notes, folderId, lastNoteElementRef, deleteNoteHandler, toggleFavouriteNote }: NoteListProps) => {
  const pathname = usePathname();
  const {isMobile} = useSidebar()

  return (
    <>
    {isMobile && <SearchInput/>}
      <ul className='flex flex-wrap gap-y-4 gap-x-6 lg:gap-x-2 p-2 lg:p-4 mt-2 lg:mt-0'>
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
    </>
  )
}

export default NoteList