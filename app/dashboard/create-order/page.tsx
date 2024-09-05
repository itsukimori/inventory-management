import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/app/lib/auth";
import MainLayout from "@/app/components/layouts/main-layout";
import { OrderProductFormTable } from "@/app/components/order/OrderProductFormTable";

export default async function CreateOrder() {
    const decodedValue = await getAuthenticatedUser();
    if(!decodedValue) {
        return redirect("/");
    }

    return (
        <MainLayout>
            <>
                <div>
                    <OrderProductFormTable />
                </div>       
            </>
        </MainLayout>
    );
}
