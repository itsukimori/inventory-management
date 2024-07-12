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

export async function POST(req: NextRequest) {
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
        const body = await req.json();
        if (session) {
            await prisma.product.create({
                data: {
                    staffEmail: session.user?.email,
                    name: body.name,
                    category: body.category,
                    price: body.price,
                    stock: body.stock,
                }
            })
        } else {
            await prisma.product.create({
                data: {
                    staffEmail: decodedValue?.email,
                    name: body.name,
                    category: body.category,
                    price: body.price,
                    stock: body.stock,
                }
            });
        }
        
        return new NextResponse(JSON.stringify({ message: body }));
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return new NextResponse('Invalid JSON', { status: 400 });
    }
}
