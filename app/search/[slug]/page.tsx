import { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';
import { getNotesBySearch } from '@/actions/notes';
import NotesFetcher from '@/app/components/notes/notesFetcher';

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
        <NotesFetcher fetchFunction={getNotesBySearch} title={'Search Result'} query={params.slug}/>
      </Suspense>
    </>
  )
}
 
export default Page