import { Suspense } from 'react';
import { getNotes } from '@/actions/notes';
import { Spinner } from '@nextui-org/react';
import NoteViewer from '@/app/components/notes/notesViewer';

const Page = async () => {

  return (
    <>
      <Suspense fallback={
        <div className='flex justify-center content-center'>
          <Spinner label="Default" color="default" labelColor="foreground"/>
        </div>
      }>
        <NoteViewer fetchNotes={getNotes} title={'notes'} />
      </Suspense>
    </>
  )
}
 
export default Page;