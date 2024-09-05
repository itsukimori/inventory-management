import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

type requestBody = {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: requestBody = await req.json();

        let findUser;

        try {
            findUser = await prisma.staff.findUnique({
                where: {
                    email: body.email,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    imageUrl: true,
                    password: true,
                },
            });
            if(!findUser) {
                return new NextResponse(JSON.stringify({ status: 400 }));
            }

            const passwordMatch = await bcrypt.compare(body.password, findUser.password as string);
            if(!passwordMatch) {
                return new NextResponse(JSON.stringify({ status: 400 }));
            }
        } catch (error) {
            console.log(error);
        }

        if(findUser) {
            // JWTを生成
            const token = jwt.sign({ 
                id: findUser.id,
                name: findUser.name, 
                email: findUser.email, 
                imageUrl: findUser.imageUrl 
            }, process.env.AUTH_SECRET!, {
                expiresIn: '7d',
            });

            const cookie = serialize('user-session', token, {
                httpOnly: true,
                /**
                 * ubuntu nginxの都合でsecureをfalseにする
                 */
                // secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 7日間
                path: '/',
            });
        
            const headers = new Headers();
            headers.set('Set-Cookie', cookie);

            return new NextResponse(JSON.stringify({ status: 200 }),{ headers: headers });
        } else {
            return new NextResponse(JSON.stringify({ status: 400 }));
        }
    } catch (error) {
        return new NextResponse('Invalid JSON', { status: 400 });
    }
}