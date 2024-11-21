'use server'
import { connectMongoDB } from '@/lib/mongodb';
import SharedLinkModel, { SharedLink } from '@/models/sharedLink';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const isDevelopment = process.env.NODE_ENV === 'development';

const BASE_URL = isDevelopment
  ? process.env.DEV_BASE_URL || 'http://localhost:3000'
  : process.env.PROD_BASE_URL || 'https://your-production-domain.com';


  export const createShareLink = async(noteId: string) => {
    const session = await getServerSession(authOptions);
  
    const schema = z.object({
      url: z.string().min(3),
      createdBy: z.string().min(1),
      noteId: z.string().min(1),
    })
  
    const shareLink = nanoid(); // Generate a unique share link
    const generatedUrl = `${BASE_URL}/share/${shareLink}`;
  
    const parse = schema.safeParse({
      url: generatedUrl,
      createdBy: session!.user.id,
      noteId,
    })
  
    if(!parse.success) {
      return { error: 'data is not valid' };
    }
    const data = parse.data;
  
    try {
      await connectMongoDB();
      await SharedLinkModel.create(data) as SharedLink;
      revalidatePath(`notes/${noteId}`);
      return { 
        message: "Link created successfully", 
        url: generatedUrl  // Return the generated URL
      };
    } catch (err) {
      return { error: 'Something went wrong' };
    }
  }

export const getNoteLink = async(noteId: string) => {
  try {
    await connectMongoDB();
    const noteLink = await SharedLinkModel.findOne({ noteId }) as SharedLink;
    return JSON.parse(JSON.stringify(noteLink));
   
  } catch (err) {
    return{ error: 'Something went wrong' };
  }
}

export const getSharedLinks = async() => {
  try {
    await connectMongoDB();
    const sharedLinks = await SharedLinkModel.find() as SharedLink[];
    return sharedLinks;
  } catch (err) {
    return{ error: 'Something went wrong' };
  }
}

export const deleteShareLink = async(id: string) => {
  await connectMongoDB();
  try {
    const sharedLink = await SharedLinkModel.findById(id);
    if (sharedLink) {
      await SharedLinkModel.findByIdAndDelete(id);
    }
    revalidatePath('/settings');

    return { message: 'Share link deleted' };
  } catch (err) {
    return{ error: 'Something went wrong' };
  }
}

export const deleteAllLinks = async(id: string) => {
  await connectMongoDB();
  try {
    await SharedLinkModel.deleteMany({});
    revalidatePath('/settings');
    return { message: 'Share links deleted' };
  } catch (err) {
    return{ error: 'Something went wrong' };
  }
}