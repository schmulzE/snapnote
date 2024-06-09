"use server"
import { z } from 'zod';
import NoteModel, { Note } from '@/models/note';
import { connectMongoDB } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function createNote(prevState: any, formData : Note) {
  const schema = z.object({
    content: z.string().min(3).optional(),
    createdBy: z.string().min(1).optional(),
    folder: z.string().min(1).optional(),
    favourite: z.boolean().optional(),
    image: z.string().optional(),
  })

  const parse = schema.safeParse({
    content : formData.content,
    image : formData.image,
    createdBy: formData.createdBy,
    folder: formData.folder,
    favourite: formData.favourite
  })

  if(!parse.success) {
    console.log(parse.error)
    return { message: 'data is not valid' };
  }
  const data = parse.data;
  // console.log('data:', data);
  try {
    await connectMongoDB();
    await NoteModel.create(data);
    return { message: 'Note created successfully' }
  } catch (error) {
    return { message: 'failed to create note' };
  }
}

export async function editNote(formData: Note, id: string) {
  const schema = z.object({
    content: z.string().min(3).optional(),
    createdBy: z.string().min(1).optional(),
    folder: z.string().min(1).optional(),
    favourite: z.boolean().optional(),
    image: z.string().optional(),
  })

  const parse = schema.safeParse({
    content : formData.content,
    image : formData.image,
    createdBy: formData.createdBy,
    folder: formData.folder,
    favourite: formData.favourite
  })

  if(!parse.success) {
    console.log(parse.error)
    return { message: 'data is not valid' };
  }

  const data = parse.data;
  try {
    await connectMongoDB();
    const note = await NoteModel.findByIdAndUpdate(id, {
      ...data,
    });
    revalidatePath(`/notes/${id}`);
  } catch (error) {
    return { message: 'failed to create note' };
  }
}

export async function getNote(id: string) {
  await connectMongoDB();
  const data = (await NoteModel.findOne({ _id: id }));
  const folder = JSON.parse(JSON.stringify(data)) as Note;
  
  if (data.hasOwnProperty("error")) {
    throw new Error(data.error);
  }
  return folder;
}

export const deleteNote = async(id: string) => {
  try { 
  await connectMongoDB();
  const note = await NoteModel.findById(id);
  if (note) {
    await NoteModel.findByIdAndDelete(id);
  }
  revalidatePath('/notes');

  } catch (error) {
    return { message: 'failed to delete note' };
  }
}


export const addNoteToFavourite = async(id: string, favourite: boolean) => {
  const schema = z.object({
    isFavourite: z.boolean().optional(),
  })

  const parse = schema.safeParse({
    isFavourite: favourite
  })

  if(!parse.success) {
    console.log(parse.error)
    return { message: 'data is not valid' };
  }

  const data = parse.data;
  console.log('data', data);
  try {
    await connectMongoDB();
    const folder = await NoteModel.findByIdAndUpdate(id, {
      ...data,
    });
    revalidatePath('notes');
  } catch (error) {
    return { message: 'failed to create folder' };
  }
}