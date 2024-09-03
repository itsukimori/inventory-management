import { NextRequest, NextResponse } from 'next/server';
import { cookieDelete } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        /**
         * ゲストの場合はCookieを削除することでログアウト状態にする
         */
        await cookieDelete();

        return NextResponse.json({ message: 'Signed out successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error signing out' }, { status: 500 });
    }
}