import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { deleteCookie } from "./app/lib/session";
import { NextResponse } from "next/server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
});

export const cookieDelete = async () => {
  const cookieName = 'guest-session';
  await deleteCookie(cookieName);
  return NextResponse.json({ message: 'Signed out' });
}
