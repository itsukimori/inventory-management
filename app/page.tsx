import SignIn from "@/app/components/auth/signin-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GuestLoginButton from "@/app/components/auth/guest-signin-button";
import { getCookieValue } from "@/app/lib/session";

export default async function Home() {
  
  const cookieName = 'guest-session';
  const cookieValue = await getCookieValue(cookieName); 
  const session = await auth();
  
  if(session || cookieValue) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Home</div>
      <GuestLoginButton />
      <SignIn />
    </main>
  );
}
