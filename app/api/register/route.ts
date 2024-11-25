import bcrypt from "bcryptjs";
import User from "@/models/user";
import { type NextRequest } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ name, email, password: hashedPassword });

    return Response.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}