import SignOut from "@/app/components/auth/signout-button";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function Dashboard() {
    const session = await auth();

    if(!session) {
        return redirect("/");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>Dashboard</div>
            <p>
                {session.user?.name}, {session.user?.email}
            </p>
            <SignOut />
        </main>
    );
}