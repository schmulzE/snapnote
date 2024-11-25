import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Session, AuthOptions, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string,
          password: string
        };

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token, user }: { session: Session; token: JWT; user: AdapterUser }) {
      if (session?.user?.email) {
        await connectMongoDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }
      return session as Session | DefaultSession;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };