import { connectMongoDB } from "@/lib/mongodb";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse){
  try {
    const { query } = await req.json();
    await connectMongoDB();

    const notes = await Note.aggregate([
      {
        '$search': {
          'index': 'searchNotes',
          'text': {
            'query': query,
            'path': {
              'wildcard': '*'
            },
            'fuzzy': {}
          }
        }
      }
    ])

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}