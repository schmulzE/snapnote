import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LoginForm from "@/app/components/auth/loginForm";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function Home() {
  const session = await getServerSession(authOptions as any);

  if (session) redirect("/notes");

  return (
    <main className="overflow-hidden">
      <LoginForm />
    </main>
  );
}