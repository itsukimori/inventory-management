import { redirect } from "next/navigation";
import { getCookieValue } from "@/app/lib/session";
import jwt from 'jsonwebtoken';
import { auth } from "@/auth";
import React from 'react';

type DecodedValue = {
    name?: string;
    email?: string;
}

interface AuthProps {
    session: any;
    decodedValue: DecodedValue | null;
}

export function withAuth<P extends AuthProps>(Component: React.ComponentType<P>) {
    return async function AuthenticatedComponent(props: Omit<P, keyof AuthProps>) {
        const cookieName = 'guest-session';
        const cookieValue = await getCookieValue(cookieName);
        const session = await auth();

        let decodedValue: DecodedValue | null = null;
        if (cookieValue) {
            const decoded = jwt.verify(cookieValue, process.env.AUTH_SECRET!) as DecodedValue;
            decodedValue = decoded;
        }

        if (!session && !cookieValue) {
            return redirect("/");
        }

        return <Component {...props as P} session={session} decodedValue={decodedValue} />;
    };
}