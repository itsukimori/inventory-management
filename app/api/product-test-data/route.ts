import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { faker } from '@faker-js/faker';

export async function POST(req: NextRequest) {
    try {
        const productsCount = 1000; // 作成する製品の数

        for (let i = 0; i < productsCount; i++) {
            console.log(`======== ${i} =======`);
            await prisma.product.create({
                data: {
                    name: `${faker.commerce.productName()}製品${i}`,
                    // staffEmail: staff.email,
                    category: `${faker.commerce.department()}${i}`,
                    price: faker.number.int({ min: 100, max: 100000 }),
                    stock: faker.number.int({ min: 10, max: 100000 }),
                },
            });
        }

        console.log(`${productsCount}個の製品データを作成しました。`);
        return NextResponse.json({ status: 200, message: '製品データが正常に作成されました' });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ status: 500, message: 'データ作成に失敗しました' }), { status: 500 });
    }
}