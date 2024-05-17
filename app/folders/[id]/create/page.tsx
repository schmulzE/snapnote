import RichTextEditor from '@/app/(components)/rich-text-editor'
import React from 'react'

const page = ({params} : {params : {id : string}}) => {
  console.log(params.id)
  return (
    <div>
       <RichTextEditor initialContent={''} noteId={''} folderId={params.id}/>
    </div>
  )
}

export default page
