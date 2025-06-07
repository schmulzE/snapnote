"use server";
export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import { getNotes } from '@/actions/notes';
import { Spinner } from '@nextui-org/react';
import NotesFetcher from '@/app/components/notes/notesFetcher'

const Page = async () => {

  return (
    <>
      <Suspense fallback={
        <div className='flex justify-center h-full content-center'>
          <Spinner label="Loading..." color="default" labelColor="foreground"/>
        </div>
      }>
        <NotesFetcher 
          fetchFunction={getNotes}
          title={'notes'} 
        />
      </Suspense>
    </>
  )
}
 
export default Page;