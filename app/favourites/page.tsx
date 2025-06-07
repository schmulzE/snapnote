export const dynamic = 'force-dynamic';
import React, { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';
import { getFavouriteNotes } from '@/actions/notes';
import NotesFetcher from '../components/notes/notesFetcher';

const pages = async() => {

  return (
    <>
      <Suspense 
        fallback={
        <div className='flex justify-center content-center h-screen'>
          <Spinner label="Default" size='lg' color="default" labelColor="foreground"/>
        </div>
        }
      >
        <NotesFetcher fetchFunction={getFavouriteNotes} title={'favourites'}/>
      </Suspense>
    </>
  )
}

export default pages
