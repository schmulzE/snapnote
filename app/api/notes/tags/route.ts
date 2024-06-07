import { type NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Note from '@/models/note';

export async function GET(req: NextRequest) {
  try {
    const { tagId } = await req.json();
    await connectMongoDB();
    const notes = await Note.find({ tags: tagId }).populate('tags');
    console.log('getbyTag', notes);
    return Response.json({ notes }, { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}