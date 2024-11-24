"use server" 
import { z } from 'zod';
import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/lib/mongodb';
import UserModel, { User } from '@/models/user';

export const createUser = async(prevState: any, formData: FormData) => {
  const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const parse = schema.safeParse({
    name : formData.get('name'),
    email : formData.get('email'),
    password: formData.get('password'),
  });

  if(!parse.success) {
    return { message: 'data is not valid' };
  }

  const data = parse.data;

  try {
    await connectMongoDB();
    const user = await userExist(data.email);

    if (user) {
      return { message: "User already exists.", success: false }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await UserModel.create({ ...data, password: hashedPassword });
    return { message: "User registered successfully!", success: true }
  } catch (error) {
    return { message: "An error occurred during registration.", success: false }
  }
}

export const userExist = async(email: string) => {
  await connectMongoDB();
  const user = await UserModel.findOne({ email }).select("_id") as User;
  return user;
}