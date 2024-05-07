import { NextRequest, NextResponse } from 'next/server';
import Note from '@/models/note';
import { connectMongoDB } from '@/lib/mongodb';
import { HttpStatusCode } from 'axios';
// import { UpdateProductDto } from '@/keepCount/dto/update-product.dto';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const note = await Note.findOne({ _id: params.id });
    if (note) {
      return NextResponse.json({ note });
    }
    return NextResponse.json({ message: `note ${params.id} not found` }, { status: HttpStatusCode.NotFound });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const note = await Note.findById(id);
    if (note) {
      const body = await req.json();
      if (body.title) {
        note.name = body.title;
      }
      if (body.content) {
        note.content = body.content;
      }
      if (body.folder) {
        note.folder = body.folder;
      }
      note.save();
      return NextResponse.json({ message: "Note updated" }, { status: 200 });
    }
    return NextResponse.json({ message: `note ${params.id} not found` }, { status: HttpStatusCode.NotFound });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const note = await Note.findById(params.id);
    if (note) {
      await Note.findByIdAndDelete(note._id);
      return NextResponse.json({ message: `note ${params.id} has been deleted` });
    }
    return NextResponse.json({ message: `note ${params.id} not found` }, { status: HttpStatusCode.NotFound });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}