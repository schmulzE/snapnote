import { Suspense } from 'react';
import { getNotes } from '@/actions/notes';
import { Spinner } from '@nextui-org/react';
import NoteViewer from '@/app/components/notes/notesViewer';

const Page = async () => {

  return (
    <>
      <Suspense fallback={
        <div className='flex justify-center h-full content-center'>
          <Spinner label="Loading..." color="default" labelColor="foreground"/>
        </div>
      }>
        <NoteViewer fetchNotes={getNotes} title={'notes'} />
      </Suspense>
    </>
  )
}
 
export default Page;