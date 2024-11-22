import React from 'react';
import { getFavouriteNotes } from '@/actions/notes';
import NoteViewer from '@/app/components/notes/notesViewer';

const pages = async() => {

  return (
    <>
      <NoteViewer fetchNotes={getFavouriteNotes} title={'favourites'}/>
    </>
  )
}

export default pages
