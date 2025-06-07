import { Suspense } from 'react';
import { getNotesByTag } from '@/actions/notes';
import NotesFetcher from '@/app/components/notes/notesFetcher';


const Page = async ({ params } : { params: { slug: string } }) => {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NotesFetcher fetchFunction={getNotesByTag} title={`${params.slug} tag`} tagSlug={params.slug} />
      </Suspense>
    </>
  )
}
 
export default Page