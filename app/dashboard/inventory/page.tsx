import MainLayout from "@/app/components/layouts/main-layout";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/app/lib/auth";
import InventoryTable from "@/app/components/inventory/InventoryTable";

export default async function Inventory() {
    const decodedValue = await getAuthenticatedUser();
    if(!decodedValue) {
        return redirect("/");
    }

    return (
        <MainLayout>
            <InventoryTable />
        </MainLayout>
    );
}