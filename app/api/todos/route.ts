import { NextRequest, NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import { connectMongoDB } from '@/lib/mongodb';
import Todo from '@/models/todo';
// import { CreateProductDto } from '@/dto/create-product.dto';

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const data = body.formData;

    await Todo.create(data);

    return NextResponse.json({ message: "Todo Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const todos = await Todo.find();
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}