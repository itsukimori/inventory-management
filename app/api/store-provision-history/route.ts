import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";
import { getCookieValue } from "@/app/lib/session";
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
    if(cookieValue) {
        const decoded = jwt.verify(cookieValue, process.env.AUTH_SECRET!) as DecodedValue;
        decodedValue = decoded;
    }

    if(!session && !cookieValue) {
        return redirect("/");
    }

    try {
        const storeProvisionHistory = await prisma.order.findMany({
            where: {
                staffEmail:
                    session ? session.user?.email as string
                            : decodedValue?.email as string,
            },
            select: {
                storeName: true,
                productName: true,
                productQuantity: true,
                productPrice: true,
                createdAt: true,
            },
        });
        return new NextResponse(JSON.stringify(storeProvisionHistory));
    } catch (error) {
        return new NextResponse('Invalid JSON', { status: 400 });
    }
}