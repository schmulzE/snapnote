import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { connectMongoDB } from '@/lib/mongodb';
import Note from '@/models/note';
// import { CreateProductDto } from '@/dto/create-product.dto';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const { formData } = body;
    if (formData.title) {
      const note = await Note.create(formData);
      return NextResponse.json(
        { note, message: 'Your note has been created' },
        { status: HttpStatusCode.Created },
      );
    }
    return NextResponse.json({ message: 'note title is missing' }, { status: HttpStatusCode.BadRequest });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const notes = await Note.find();
    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}