import { NextRequest, NextResponse } from "next/server";
import { getCookieValue } from "@/app/lib/session";;
import jwt from "jsonwebtoken";
import { auth } from "@/auth";

type DecodedValue = {
    name?: string;
    email?: string;
}

export async function GET(req: NextRequest) {
    const cookieName = 'guest-session';
    const cookieValue = await getCookieValue(cookieName);
    const session = await auth();

    let decodedValue: DecodedValue | null = null;

    if(session) {
        return new NextResponse(JSON.stringify({
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    if(cookieValue) {
        const decoded = jwt.verify(cookieValue, process.env.AUTH_SECRET!) as DecodedValue;
        decodedValue = decoded;

        return new NextResponse(JSON.stringify({
            name: decodedValue.name,
            email: decodedValue.email
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new NextResponse(JSON.stringify({
        name: null,
        email: null,
        image: null,
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}