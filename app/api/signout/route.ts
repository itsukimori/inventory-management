import { NextRequest, NextResponse } from 'next/server';
import { signOut } from '@/auth';
import { cookieDelete } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        /**
         * ゲストの場合はCookieを削除することでログアウト状態にする
         */
        await cookieDelete();
        await signOut();

        return NextResponse.redirect('/');
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error signing out' }, { status: 500 });
    }
}