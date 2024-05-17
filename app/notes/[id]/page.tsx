import RichTextEditor from '@/app/(components)/rich-text-editor';
import Toolbar from '@/app/(components)/toolbar';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
interface Note {
  _id? : string;
  title?: string;
  content?: string;
  folder?: string;
}

async function fetchSingleNote(id: string) { 
  try {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`,  {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    
    return res.json()
    
  } catch (error) {
    console.log(error)
  }
}

const deleteNote = async (id: string) => {
  "use server"; 
  try {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`,  {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch data...')
    }
    
    // return res.json()
  } catch (error) {
    console.log(error)
  }
}
const Page = async ({ params } : { params: { id: string } }) => {
  // const router = useRouter();
  const data = await fetchSingleNote(params.id);
  // Make sure we have tickets needed for production build.
  if (!data?.note) {
    return <p>No Note.</p>;
  }

  const note = data.note;

  const deleteNoteHandler = async() => {
    "use server"

    await deleteNote(params.id);
    console.log('hey!')
    revalidatePath('/notes') // Update cached posts
    redirect('/notes')
  }


  return (
    <>
      <div className="w-full max-w-screen-lg p-4 space-y-8">
        <Toolbar title={'note'} deleteHandler={deleteNoteHandler}/>
        {/* <h1 className='text-4xl font-bold capitalize my-8'>{note.title}</h1> */}
        <RichTextEditor initialContent={note?.content} noteId={note?._id}/>
      </div>
    </>
  )
}
 
export default Page