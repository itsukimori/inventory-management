import MainLayout from "@/app/components/layouts/main-layout";
import { redirect } from "next/navigation";
import { getCookieValue } from "@/app/lib/session";
import jwt from 'jsonwebtoken';
import { auth } from "@/auth";
import InventoryTable from "@/app/components/inventory/InventoryTable";

type DecodedValue = {
    name?: string;
    email?: string;
}

export default async function Inventory() {
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
            <InventoryTable />
        </MainLayout>
    );
}