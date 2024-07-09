import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { deleteCookie } from "./app/lib/session";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
});

export const GuestSignOut = async () => {
  const cookieName = 'guest-session';
  await deleteCookie(cookieName);
}
