import { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';
import { searchNotes } from '@/actions/notes';
import NotesViewer from '@/app/components/notes/notesViewer';

const Page = async ({ params } : { params: { slug: string } }) => {

  return (
    <>
      <Suspense 
      fallback={
      <div className='flex justify-center content-center h-screen'>
        <Spinner label="Default" size='lg' color="default" labelColor="foreground"/>
      </div>
      }
      >
        <NotesViewer fetchNotes={searchNotes} title={'Search Result'} query={params.slug}/>
      </Suspense>
    </>
  )
}
 
export default Page