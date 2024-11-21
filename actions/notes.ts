"use server"

import { z } from 'zod';
import TagModel from '@/models/tag';
import UserModel from '@/models/user';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { connectMongoDB } from '@/lib/mongodb';
import NoteModel, { Note } from '@/models/note';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function createNote(prevState: any, formData : Note) {
  const schema = z.object({
    title: z.string().optional(),
    content: z.string().min(3).optional(),
    createdBy: z.string().min(1).optional(),
    folder: z.string().min(1).optional(),
    favourite: z.boolean().optional(),
    image: z.string().optional(),
  })
  
  // Match any header tag from <h1> to <h6> as title
  const titleMatch = formData.content?.match(/<(h[1-6])[^>]*>.*?<\/\1>/);
  const noteTitle = titleMatch ? titleMatch[0] : '';
  
  // Match all content elements such as <p>, <ul>, <ol>, <a>, etc.
  const contentMatch = formData.content?.match(/<(p|ul|ol|a)[^>]*>.*?<\/\1>/g);
  const noteContent = contentMatch ? contentMatch?.join("") : '';

  const parse = schema.safeParse({
    title: noteTitle,
    content : noteContent,
    image : formData.image,
    createdBy: formData.createdBy,
    folder: formData.folder,
    favourite: formData.favourite
  })

  if(!parse.success) {
    return { success: false, message: 'Data is not valid' }
    // return { message: 'data is not valid' };
  }
  const data = parse.data;
  try {
    await connectMongoDB();
    await NoteModel.create(data);
    revalidatePath('/notes')
    redirect('/notes')
    // return { message: 'Note created successfully' }
  } catch (error) {
    return { success: false, message: 'Failed to edit note' }
  }
}

export async function editNote(formData: Note, id: string) {

  const schema = z.object({
    title: z.string().optional(),
    content: z.string().min(3).optional(),
    createdBy: z.string().min(1).optional(),
    folder: z.string().min(1).optional(),
    favourite: z.boolean().optional(),
    image: z.string().optional(),
  })

  
  // Match any header tag from <h1> to <h6> as title
  const titleMatch = formData.content?.match(/<(h[1-6])[^>]*>.*?<\/\1>/);
  const noteTitle = titleMatch ? titleMatch[0] : '';
  
  // Match all content elements such as <p>, <ul>, <ol>, <a>, etc.
  const contentMatch = formData.content?.match(/<(p|ul|ol|a)[^>]*>.*?<\/\1>/g);
  const noteContent = contentMatch ? contentMatch?.join("") : '';


  const parse = schema.safeParse({
    title: noteTitle,
    content : noteContent,
    image : formData.image,
    createdBy: formData.createdBy,
    folder: formData.folder,
    favourite: formData.favourite
  })

  if(!parse.success) {
    return { message: 'data is not valid' };
  }

  const data = parse.data;
  try {
    await connectMongoDB();
    const note = await NoteModel.findByIdAndUpdate(id, {
      ...data,
    });
    revalidatePath(`/notes/${id}`);
    redirect(`/notes/${id}`)
  } catch (error) {
    return { message: 'failed to create note' };
  }
}

export async function getNotes(page: number = 1, limit: number = 9) {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    
    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }
    
    const skip = (page - 1) * limit
    const notes = await NoteModel
    .find({ createdBy: session.user.id })
    .populate({
      path: 'tag',
      model: 'Tag'
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const totalNotes = await NoteModel.countDocuments({ createdBy: session.user.id })

    return {
      notes: JSON.parse(JSON.stringify(notes)),
      hasMore: totalNotes > skip + notes.length,
      totalNotes
    }

  } catch (error: any) {
    throw new Error(`Failed to fetch notes: ${error.message}`);
  }
}

export async function getNote(id: string) {
  await connectMongoDB();
  const data = (await NoteModel.findOne({ _id: id }));
  const folder = JSON.parse(JSON.stringify(data)) as Note;
  
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


export const addNoteToFavourite = async(id: string, isFavourite: boolean) => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    throw new Error("Unauthorized user");
  }

  const schema = z.object({
    favourite: z.boolean().optional(),
  })

  const parse = schema.safeParse({
    favourite: isFavourite
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
    revalidatePath('/notes');
  } catch (error) {
    return { message: 'failed to add note to favourite' };
  }
}

export async function shareNote(formData: FormData, noteId: string) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    email : z.string().email(),
    createdBy: z.string().min(1),
  });

  const parse = schema.safeParse({
    email : formData.get('email'),
    createdBy: session!.user.id,
  });

  if (!parse.success) {
    return { message: 'Data is not valid' };
  }

  const data = parse.data;

  try {
    // Verify that the user to share with exists
    const userToShare = await UserModel.findOne({ email: data.email });
    if (!userToShare) {
      return { message: 'User not found' };
    }

    // Find the folder and verify the current user is the owner
    const note = await NoteModel.findById(noteId);
    if (!note) {
      return { message: 'Note not found' };
    }
    if (!note.owner.equals(session!.user.id)) {
      return { message: 'Not authorized to share this note' };
    }

    // Add the user to the sharedWith array
    note.sharedWith.push(userToShare._id);
    await note.save();

    return { message: 'Note shared successfully' };
  } catch (error) {
    return { message: 'An error occurred', error };
  }
}


export const selectNoteTag = async(id: string, formData: FormData) => {
  const schema = z.object({
    tag : z.string(),
  })

  const parse = schema.safeParse({
    tag: formData.get('tag')
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
    revalidatePath('folders');
  } catch (error) {
    return { message: 'failed to create folder' };
  }
}

export const deleteAllNotes = async() => {
  await connectMongoDB();
  try {
    await NoteModel.deleteMany({});
    revalidatePath('/settings');

    return { message: 'Notes deleted successfully' };
  } catch (err) {
    return{ error: 'Something went wrong' };
  }
}

export async function getFavouriteNotes(page: number = 1, limit: number = 9) {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    
    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }
    
    const skip = (page - 1) * limit
    const notes = await NoteModel
    .find({ createdBy: session.user.id, favourite: true })
    .populate({
      path: 'tag',
      model: 'Tag'
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const totalNotes = await NoteModel.countDocuments({ createdBy: session.user.id })

    return {
      notes: JSON.parse(JSON.stringify(notes)),
      hasMore: totalNotes > skip + notes.length,
      totalNotes
    }

  } catch (error: any) {
    throw new Error(`Failed to fetch notes: ${error.message}`);
  }
}

export const getTaggedNotes = async( page: number = 1, limit: number = 9, params?: string) => {

  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    
    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }
    
    const skip = (page - 1) * limit
    const tag = await TagModel.findOne({ name: params });
    const notes = await NoteModel
    .find({ createdBy: session.user.id, tags: tag._id })
    .populate({
      path: 'tag',
      model: 'Tag'
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

    const totalNotes = await NoteModel.countDocuments({ createdBy: session.user.id })

    return {
      notes: JSON.parse(JSON.stringify(notes)),
      hasMore: totalNotes > skip + notes.length,
      totalNotes
    }

  } catch (error: any) {
    throw new Error(`Failed to fetch notes: ${error.message}`);
  }
}