import { NextRequest, NextResponse } from 'next/server';
import { signOut } from '@/auth';
import { GuestSignOut } from '@/auth';

export async function POST(req: NextRequest) {
    try {
        await GuestSignOut();
        await signOut({ redirect: false });
        return NextResponse.json({ message: 'Signed out' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error signing out' }, { status: 500 });
    }
}