import RegisterForm from "@/app/(components)/register-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions as any);

  if (session) redirect("/notes");

  return <RegisterForm />;
}