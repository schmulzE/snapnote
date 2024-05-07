import Notes from '@/app/(components)/notes';

async function getNotes() {
  try {
    const res = await fetch(`http://localhost:3000/api/notes`,  {
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

const Page = async ({ params } : { params: { id: string } }) => {
  const data = await getNotes();
  // Make sure we have tickets needed for production build.
  if (!data?.notes) {
    return <p>No Notes.</p>;
  }

  const notes = data.notes;


  return (
    <>
      <Notes notes={notes}/>
    </>
  )
}
 
export default Page