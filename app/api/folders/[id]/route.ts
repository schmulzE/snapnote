import { NextRequest, NextResponse } from 'next/server';
import Folder from '@/models/folder';
import { connectMongoDB } from '@/lib/mongodb';
import { HttpStatusCode } from 'axios';
import mongoose from 'mongoose';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    // const folder = await Folder.findOne({ _id: params.id });
    const folderDetail = await Folder.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(params.id) },
      },
      {
        $lookup: {
          from: 'notes',
          localField: '_id',
          foreignField: 'folder',
          as: 'notes',
        },
      },
    ]);
    const folder = folderDetail[0]
    if (folder) {
      return NextResponse.json({ folder });
    }
    return NextResponse.json({ message: `folder ${params.id} not found` }, { status: HttpStatusCode.NotFound });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const folder = await Folder.findById(params.id);
    if (folder) {
      await Folder.findByIdAndDelete(folder._id);
      return NextResponse.json({ message: `folder ${params.id} has been deleted` });
    }
    return NextResponse.json({ message: `folder ${params.id} not found` }, { status: HttpStatusCode.NotFound });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}