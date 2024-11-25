import Editor from '@/app/components/notes/noteEditor/editor';

const Page = async ({ params } : { params: { id: string } }) => {

  return (
    <>
      <div className="w-full max-w-screen-lg p-4 space-y-8">
        <Editor initialContent={''} noteId={params.id} editable={true}/>
      </div>
    </>
  )
}
 
export default Page