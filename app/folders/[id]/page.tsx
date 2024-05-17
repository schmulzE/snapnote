import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react';
import React from 'react';
import Notes from '@/app/(components)/notes';
import Breadcrumb from '@/app/(components)/ui/breadcrumb';

async function getSingleFolder(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/folders/${id}`,  {
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


const Page = async ({ params } : { params : {id : string} }) => {
  const data = await getSingleFolder(params.id);

  if (!data?.folder) {
    return <p>No Folder.</p>;
  }

  const folder = data.folder;
  return (
    <div className="w-full max-w-screen-lg p-4">
      <div className="flex justify-between px-4 items-center capitalize">
        <div></div>
        <Breadcrumb folderName={folder.name}/>

        <div className='space-x-3'>
          <button><i className="ri-tools-fill"></i></button>
          <button><i className="ri-more-2-fill"></i></button>
          <Button color="primary" className='rounded-none'>
            Share
          </Button>
        </div>
      </div>
      <Notes notes={folder.notes} folderId={params.id} />
    </div>
  )
}

export default Page