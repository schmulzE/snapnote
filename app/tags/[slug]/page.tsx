import { Suspense } from 'react';
import { getTaggedNotes } from '@/actions/notes';
import NoteViewer from '@/app/components/notes/notesViewer';


const Page = async ({ params } : { params: { slug: string } }) => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NoteViewer fetchNotes={getTaggedNotes} tagSlug={params.slug} title={`${params.slug} tag`}/>
      </Suspense>
    </>
  )
}
 
export default Page