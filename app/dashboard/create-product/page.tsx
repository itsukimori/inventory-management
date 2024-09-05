import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/app/lib/auth";
import MainLayout from "@/app/components/layouts/main-layout";
import CreateProductForm from "@/app/components/product/CreateProductForm";

export default async function CreateProduct() {
    const decodedValue = await getAuthenticatedUser();
    if(!decodedValue) {
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
