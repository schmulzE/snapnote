import Editor from '@/app/components/notes/noteEditor/editor';
import Toolbar from '@/app/components/shared/toolbar';
import { connectMongoDB } from '@/lib/mongodb';
import NoteModel, { Note } from '@/models/note';
import SharedLinkModel, { SharedLink } from '@/models/sharedLink';

const Page = async ({ params } : { params: { id: string } }) => {
  await connectMongoDB();
  const data = (
    await NoteModel
    .findOne({ _id: params.id })
    .populate({
      path: 'tag',
      model: 'Tag'
    })
  );
  const note = JSON.parse(JSON.stringify(data));
  const noteLink = await SharedLinkModel.findOne({ noteId: params.id }) as SharedLink;
  const url = noteLink ? JSON.parse(JSON.stringify(noteLink.url)) : '';
  const content = note.title ? note.title + note.content : note.content;

  return (
    <>
      <Toolbar title={'notes'} id={params.id} url={url} isFavourite={note.favourite} noteTag={note.tag}/>
      <Editor editable={true} initialContent={content} noteId={note._id}/>
    </>
  )
}
 
export default Page