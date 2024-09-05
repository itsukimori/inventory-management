import { getCookieValue } from "@/app/lib/session";
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";

type AuthenticatedUser = {
    name: string;
    email: string;
    imageUrl: string;
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser>{
    const guestCookieName = 'guest-session';
    const guestCookieValue = await getCookieValue(guestCookieName);
    const userCookieName = 'user-session';
    const userCookieValue = await getCookieValue(userCookieName);

    if (!userCookieValue && !guestCookieValue) {
        redirect("/");
    }

    let decoded: AuthenticatedUser;
    if (userCookieValue) {
        decoded = jwt.verify(userCookieValue, process.env.AUTH_SECRET!) as AuthenticatedUser;
    } else if (guestCookieValue) {
        decoded = jwt.verify(guestCookieValue, process.env.AUTH_SECRET!) as AuthenticatedUser;
    }

    return decoded!;
}
