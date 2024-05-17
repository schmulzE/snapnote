import RichTextEditor from '@/app/(components)/rich-text-editor';
import Toolbar from '@/app/(components)/toolbar';

interface Note {
  _id? : string;
  title?: string;
  content?: string;
  folder?: string;
}

const Page = async ({ params } : { params: { id: string } }) => {

  return (
    <>
      <div className="w-full max-w-screen-lg p-4 space-y-8">
        {/* <Toolbar title={'note'} deleteHandler={deleteNoteHandler}/> */}
        <RichTextEditor initialContent={''} noteId={''}/>
      </div>
    </>
  )
}
 
export default Page