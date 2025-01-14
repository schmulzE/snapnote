import React from 'react';
import { connectMongoDB } from '@/lib/mongodb';
import SharedLinkModel, { SharedLink } from '@/models/sharedLink';
import Editor from '@/app/components/notes/noteEditor/editor';
import NoteModel, { Note } from '@/models/note';

const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

const BASE_URL = isDevelopment
  ? process.env.NEXT_PUBLIC_DEV_BASE_URL || 'http://localhost:3000'
  : process.env.NEXT_PUBLIC_PROD_BASE_URL || 'https://your-production-domain.com';

const page = async({ params } : { params: { link: string } }) => {
  const url = BASE_URL + '/share/' + params.link;
  await connectMongoDB();
  const sharedLink = await SharedLinkModel.findOne({ url }) as SharedLink;
  const note = await NoteModel.findById( { _id: sharedLink.noteId }) as Note
  const content = note.title ? note.title + note.content : note.content;

  return (
    <>
      <Editor editable={false} initialContent={content} noteId={undefined}/>
    </>
  )
}

export default page
