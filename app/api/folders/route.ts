import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { connectMongoDB } from '@/lib/mongodb';
import Folder from '@/models/folder';
// import { CreateProductDto } from '@/dto/create-product.dto';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const data = body.formData;

    await Folder.create(data);

    return NextResponse.json({ message: "Folder Created" }, { status: 201 });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    // const folders = await Folder.find();
    const folders = await Folder.aggregate([
      {
        $lookup: {
          from: 'notes',
          localField: '_id',
          foreignField: 'folder',
          as: 'notes',
        },
      },
      {
        $addFields: {
          totalNotes: { $size: '$notes' },
        },
      },
    ]);
    return NextResponse.json({ folders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}