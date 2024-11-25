import React from 'react';
import { getFolder } from '@/actions/folders';
import { getNoteByFolderId } from '@/actions/notes';
import NotesViewer from '@/app/components/notes/notesViewer';


const Page = async ({ params } : { params : {id : string} }) => {

  const folder = await getFolder(params.id)
  return (
    <>
      <NotesViewer title={'folders'} fetchNotes={getNoteByFolderId} folderName={folder.name} folderId={params.id} />
    </>
  )
}

export default Page