import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {

    let guestCount: number = await prisma.staff.count();
    if (guestCount == 0) {
        guestCount += 1;
    }

    const guest = await prisma.staff.create({
        data: {
            name: `ゲスト${guestCount + 1}`,
            email: `guest${guestCount + 1}@example.com`,
            password: await bcrypt.hash('password', 10),
        },
    });

    // JWTを生成
    const token = jwt.sign({ id: guest.id, name: guest.name, email: guest.email }, process.env.AUTH_SECRET!, {
        expiresIn: '1h',
    });

    const cookie = serialize('guest-session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1h
        path: '/',
    });

    const headers = new Headers();
    headers.set('Set-Cookie', cookie);

    return new NextResponse(JSON.stringify({ message: 'ゲストとしてログインしました', token }), { headers });
}
