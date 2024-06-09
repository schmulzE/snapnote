"use server"
import { z } from 'zod';
import FolderModel, { Folder } from '@/models/folder';
import { connectMongoDB } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function createFolder(formData : FormData) {
  const session = await getServerSession(authOptions);
  const schema = z.object({
    name: z.string().min(3),
    tag: z.string().min(1).optional(),
    createdBy: z.string().min(1)
  })

  const parse = schema.safeParse({
    name : formData.get('name'),
    tag : formData.get('tag'),
    createdBy: session!.user.id
  })

  if(!parse.success) {
    console.log(parse.error)
    return { message: 'data is not valid' };
  }
  const data = parse.data;
  console.log('data', data);
  try {
    await connectMongoDB();
    await FolderModel.create(data);
    return { message: 'Folder created successfully' }
  } catch (error) {
    return { message: 'failed to create folder' };
  }
}

export async function editFolder(id: string, formData: FormData ) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    name: z.string().min(3),
    createdBy: z.string().min(1),
    tag: z.string().min(1).optional(),
  })

  const parse = schema.safeParse({
    name : formData.get('name'),
    tag : formData.get('tag'),
    createdBy: session!.user.id
  })

  if(!parse.success) {
    console.log(parse.error)
    return { message: 'data is not valid' };
  }

  const data = parse.data;
  try {
    await connectMongoDB();
    const folder = await FolderModel.findByIdAndUpdate(id, {
      ...data,
    });
    revalidatePath(`/folders/${id}`);
  } catch (error) {
    return { message: 'failed to create folder' };
  }
}

export async function getFolder(id: string) {
  await connectMongoDB();
  const data = (await FolderModel.findOne({ _id: id }));
  const folder = JSON.parse(JSON.stringify(data)) as Folder;
  
  if (data.hasOwnProperty("error")) {
    throw new Error(data.error);
  }
  return folder;
}

export const deleteFolder = async(id: string) => {
  try { 
  await connectMongoDB();
  const folder = await FolderModel.findById(id);
  if (folder) {
    await FolderModel.findByIdAndDelete(id);
  }
  revalidatePath('/folders');

  } catch (error) {
    return { message: 'failed to delete folder' };
  }
}

export const addFolderToFavourite = async(id: string, favourite: boolean) => {
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
    const folder = await FolderModel.findByIdAndUpdate(id, {
      ...data,
    });
    revalidatePath('folders');
  } catch (error) {
    return { message: 'failed to create folder' };
  }
}


export async function handleFolder(formData: FormData, id?: string) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    name: z.string().min(3),
    tag: z.string().min(1).optional(),
    createdBy: z.string().min(1),
  });

  const parse = schema.safeParse({
    name: formData.get('name'),
    tag: formData.get('tag'),
    createdBy: session!.user.id,
  });

  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Data is not valid' };
  }

  const data = parse.data;
  console.log('data', data);

  // try {
  //   await connectMongoDB();

  //   if (id) {
  //     await FolderModel.findByIdAndUpdate(id, data);
  //     revalidatePath(`/folders/${id}`);
  //   } else {
  //     await FolderModel.create(data);
  //   }

  //   return { message: id ? 'Folder updated successfully' : 'Folder created successfully' };
  // } catch (error) {
  //   return { message: 'Failed to process the request' };
  // }
}