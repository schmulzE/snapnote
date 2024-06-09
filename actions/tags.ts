"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import TagModel, { Tag } from "@/models/tag";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function createTag(prevState: any, formData : FormData) {
  const session = await getServerSession(authOptions);
  const schema = z.object({
    name: z.string().min(3),
    createdBy: z.string().min(1)
  })

  const parse = schema.safeParse({
    name : formData.get('name'),
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
    await TagModel.create(data);
    return { message: 'Folder created successfully' }
  } catch (error) {
    return { message: 'failed to create folder' };
  }
}

export async function getTags(): Promise<Tag[]> {
  await connectMongoDB();
  const data = (await TagModel.find({}));
  const tags = JSON.parse(JSON.stringify(data)) as Tag[];
  return tags;
}