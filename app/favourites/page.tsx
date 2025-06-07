import React from 'react';
import { getFavouriteNotes } from '@/actions/notes';
import NotesFetcher from '../components/notes/notesFetcher';

const pages = async() => {

  return (
    <>
      <NotesFetcher fetchFunction={getFavouriteNotes} title={'favourites'}/>
    </>
  )
}

export default pages
