import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { connectMongoDB } from '@/lib/mongodb';
import Favourite from '@/models/favourite';
// import { CreateProductDto } from '@/dto/create-product.dto';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const data = body.formData;

    await Favourite.create(data);

    return NextResponse.json({ message: "Favourite Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const favourites = await Favourite.find();
    return NextResponse.json({ favourites }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}