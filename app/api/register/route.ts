import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        try {
            const findEmail = await prisma.staff.findUnique({
                where: {
                    email: body.email,
                },
            });

            if(findEmail) {
                return new NextResponse(JSON.stringify({ status: 400, message: '既に登録されているメールアドレスです' }));
            }
        } catch (error) {
            console.log(error);
        }

        const user = await prisma.staff.create({
            data: {
                name: body.name,
                email: body.email,
                imageUrl: body.imageUrl,
                password: await bcrypt.hash(body.password, 10),
            },
        });

        // JWTを生成
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, imageUrl: user.imageUrl }, process.env.AUTH_SECRET!, {
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

        return new NextResponse(JSON.stringify({ status: 200, message: `${body.email}で登録しました` }),{ headers: headers });
    } catch (error) {
        return new NextResponse('Invalid JSON', { status: 400 });
    }
}