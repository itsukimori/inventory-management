import {  NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from 'bcrypt';

export async function createStaff(req: NextRequest, res: NextResponse) {
    try {
        const staff = await prisma.staff.create({
            data: {
                name: "スタッフ",
                email: "john.doe@example.com",
                password: await bcrypt.hash('password', 10),
            }
        })

        return NextResponse.json({
            message: "スタッフが登録されました",
            staff,
        });
    } catch (error) {
        return NextResponse.json({
            message: "エラーが発生しました"
        })
    }
}
