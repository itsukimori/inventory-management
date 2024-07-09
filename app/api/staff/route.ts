import {  NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest): Promise<Response> {
    try {
        if (!req.body) {
            return NextResponse.json({
                message: "リクエストデータがありません"
            });
        }
        const body = await req.json();
        const staff = await prisma.staff.upsert({
            where: {
                email: body.user.email
            },
            update: {
                name: body.user.name,
                email: body.user.email
            },
            create: {
                name: body.user.name,
                email: body.user.email
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
