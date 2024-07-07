import SignIn from "@/app/components/auth/signin-button";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if(session) {
    return redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Home</div>
      <SignIn />
    </main>
  );
}
