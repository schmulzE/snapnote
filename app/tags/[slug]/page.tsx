import Notes from '@/app/(components)/notes';
import { connectMongoDB } from '@/lib/mongodb';
import Note from '@/models/note';
import Tag from '@/models/tag';
import { Suspense } from 'react';

const getNotesByTags = async (name: string) => {
  const res = await fetch(`http://localhost:3000/api/tags/${name}`);
  return res.json();
}


const Page = async ({ params } : { params: { slug: string } }) => {
  const data = await getNotesByTags(params.slug);
  const { notes } = await data;

  // await connectMongoDB();
  // const tag = await Tag.findOne({ name: params.slug });
  // const notes = await Note.find({ tags: tag._id }).populate('tags');


  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Notes notes={notes} title={'Search Result'} />
      </Suspense>
    </>
  )
}
 
export default Page