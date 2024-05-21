import Notes from '@/app/(components)/notes';
// import { useSearch } from '@/context/searchContext';

async function searchNotes(query: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/search`,  {
      method: "POST",
      body: JSON.stringify({query})
    });
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
    
  } catch (error) {
    console.log(error)
  }
}

const Page = async ({ params } : { params: { slug: string } }) => {
  const data = await searchNotes(params.slug);
  // Make sure we have notes needed for production build.
  // if (!data?.notes) {
  //   return <p>No Notes.</p>;
  // }

  const notes = data.notes;
  // console.log('notes: ',data)


  return (
    <>
      <Notes notes={notes}/>
    </>
  )
}
 
export default Page