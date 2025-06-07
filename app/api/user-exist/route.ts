import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    // Check if request has a body
    if (!req.body) {
      return Response.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    try {
      await connectMongoDB();
    } catch (error) {
      return Response.json(
        { error: "Failed to connect to database" },
        { status: 500 }
      );
    }

    // Parse request body
    let email;
    try {
      const body = await req.json();
      email = body.email;
    } catch (error) {
      return Response.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || typeof email !== 'string') {
      return Response.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Find user
    try {
      const user = await User.findOne({ email }).select("_id");
      
      if (!user) {
        return Response.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      return Response.json({ user }, { status: 200 });
    } catch (error) {
      return Response.json(
        { error: "Failed to fetch user data" },
        { status: 500 }
      );
    }

  } catch (error) {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
