import { NextRequest, NextResponse } from 'next/server';
import Todo from '@/models/todo';
import { connectMongoDB } from '@/lib/mongodb';
import { HttpStatusCode } from 'axios';
// import { UpdateProductDto } from '@/keepCount/dto/update-product.dto';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const todo = await Todo.findOne({ _id: params.id });
    if (todo) {
      return NextResponse.json({ todo });
    }
    return NextResponse.json({ message: `todo ${params.id} not found` }, { status: HttpStatusCode.NotFound });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const body = await req.json();
    const todo = body.formData;

    const updateTodo = await Todo.findByIdAndUpdate(id, {
      ...todo,
    });

    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongoDB();
    const todo = await Todo.findById(params.id);
    if (todo) {
      await Todo.findByIdAndDelete(todo._id);
      return NextResponse.json({ message: `todo ${params.id} has been deleted` });
    }
    return NextResponse.json({ message: `todo ${params.id} not found` }, { status: HttpStatusCode.NotFound });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
  }
}