import { type NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Note from '@/models/note';

export async function GET() {
  try {
    await connectMongoDB();
    const notes = await Note.find({ favourite: true });
    return Response.json({ notes }, { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}