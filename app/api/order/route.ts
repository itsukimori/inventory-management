import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";
import { getCookieValue } from "@/app/lib/session";
import { auth } from "@/auth";
import { Prisma } from '@prisma/client';

type DecodedValue = {
    name: string;
    email: string;
}

export async function POST(req: NextRequest) {
    const cookieName = 'guest-session';
    const cookieValue = await getCookieValue(cookieName);
    const session = await auth();

    let decodedValue: DecodedValue;
    if(cookieValue) {
        const decoded = jwt.verify(cookieValue, process.env.AUTH_SECRET!) as DecodedValue;
        decodedValue = decoded;
    }

    if(!session && !cookieValue) {
        return redirect("/");
    }

    try {
        const body = await req.json();
        await prisma.$transaction(async (tx) => {
            const products = await tx.product.findMany({
                where: {
                    name: body.name,
                },
            });

            if (products.length === 0) {
                throw new Error('製品が見つかりません');
            }

            await tx.product.update({
                where: {
                    name: body.name,
                },
                data: {
                    stock: {
                        decrement: body.quantity,
                    },
                },
            });
    
            await tx.order.create({
                data: {
                    staffEmail: 
                        session ? session.user?.email as string
                                : decodedValue?.email as string,
                    storeName: body.storeName,
                    productName: body.name,
                    productQuantity: body.quantity,
                    productPrice: body.price,
                }
            });
        }, {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        });
        return NextResponse.json({ status: 200, message: '注文が正常に処理されました' });
    } catch (error) {
        return new NextResponse(JSON.stringify({ status: 500, message: '注文に失敗しました' }), { status: 500 });
    }
}