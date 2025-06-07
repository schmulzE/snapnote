import React from 'react';
import { getFolder } from '@/actions/folders';
import { getNotesByFolderId } from '@/actions/notes';
import NotesFetcher from '@/app/components/notes/notesFetcher';


const Page = async ({ params } : { params : {id : string} }) => {

  const folder = await getFolder(params.id);
  return (
    <>
      <NotesFetcher title={'folders'} fetchFunction={getNotesByFolderId} folderName={folder.name} folderId={params.id} />
    </>
  )
}

export default Page