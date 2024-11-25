import React from 'react';
import Editor from '@/app/components/notes/noteEditor/editor';

const page = ({params} : {params : {id : string}}) => {
  return (
    <>
      <Editor initialContent={''} noteId={''} folderId={params.id} editable={true}/>
    </>
  )
}

export default page
