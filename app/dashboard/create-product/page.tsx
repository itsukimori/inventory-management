import { redirect } from "next/navigation";
import { getCookieValue } from "@/app/lib/session";
import jwt from 'jsonwebtoken';
import { auth } from "@/auth";
import MainLayout from "@/app/components/layouts/main-layout";
import CreateProductForm from "@/app/components/product/CreateProductForm";

type DecodedValue = {
    name?: string;
    email?: string;
}

export default async function CreateProduct() {
    const cookieName = 'guest-session';
    const cookieValue = await getCookieValue(cookieName);
    const session = await auth();

    let decodedValue: DecodedValue | null = null;
    if(cookieValue) {
        const decoded = jwt.verify(cookieValue, process.env.AUTH_SECRET!) as DecodedValue;
        decodedValue = decoded;
    }

    if(!session && !cookieValue) {
        return redirect("/");
    }

    return (
        <MainLayout>
            <>
                <CreateProductForm />
            </>
        </MainLayout>
    );
}
