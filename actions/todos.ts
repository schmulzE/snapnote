"use server"
import { z } from 'zod';
import TodoModel from '@/models/todo';
import { connectMongoDB } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

export async function createTodo(formData : FormData) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(1).optional(),
    tag: z.string().min(1).optional(),
    isCompleted: z.boolean().optional(),
    dueDate: z.string().min(1).optional(),
    createdBy: z.string().min(1),
  })

  const parse = schema.safeParse({
    title : formData.get('title'),
    description : formData.get('description'),
    tag: formData.get('tag'),
    dueDate: formData.get('dueDate'),
    createdBy: session!.user.id
  });

  if(!parse.success) {
    console.log(parse.error)
    return { message: 'data is not valid' };
  }

  const data = parse.data;

  try {
    await connectMongoDB();
    await TodoModel.create(data);
    revalidatePath('todos');
    return { message: 'Todo created successfully' }
  } catch (error) {
    //return { message: 'failed to create todo' };
    throw new Error('An error occured when creating todo. Please try again');
  }
}

export async function editTodo(id: string, formData: FormData ) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    title: z.string().min(3),
    description: z.string().min(1).optional(),
    tag: z.string().min(1).optional(),
    isCompleted: z.boolean().optional(),
    dueDate: z.string().min(1).optional(),
    createdBy: z.string().min(1),
  })

  const parse = schema.safeParse({
    title : formData.get('title'),
    description : formData.get('description'),
    tag: formData.get('tag'),
    dueDate: formData.get('dueDate'),
    createdBy: session!.user.id
  })

  if(!parse.success) {
    // return { message: 'data is not valid' };
    throw new Error('data is not valid');
  }

  const data = parse.data;
  try {
    await connectMongoDB();
    const todo = await TodoModel.findByIdAndUpdate(id, {
      ...data,
    });
    revalidatePath('todos');
  } catch (error) {
    // return { message: 'failed to edit todo' };
    throw new Error('An error occured when trying to edit todo');
  }
}

export async function toggleTodo(id: string, completed: boolean ) {

  const schema = z.object({
    isCompleted: z.boolean().optional(),
  })

  const parse = schema.safeParse({
    isCompleted: completed
  })

  if(!parse.success) {
    // return { message: 'data is not valid' };
    throw new Error('data is not valid');
  }

  const data = parse.data;
  try {
    await connectMongoDB();
    await TodoModel.findByIdAndUpdate(id, {
      ...data,
    });
    revalidatePath('todos');
  } catch (error) {
    // return { message: 'failed to toggle todo' };
    throw new Error('An error occured when trying to toggle todo');

  }
}

export const deleteTodo = async(id: string) => {
  try { 
  await connectMongoDB();
  const todo = await TodoModel.findById(id);
  if (todo) {
    await TodoModel.findByIdAndDelete(id);
  }
  revalidatePath('/todos');

  } catch (error) {
    // return { message: 'failed to delete todo' };
    throw new Error('An error occured while trying to delete todo');
  }
}