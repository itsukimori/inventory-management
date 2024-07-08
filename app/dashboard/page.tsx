import SignOut from "@/app/components/auth/signout-button";
import { redirect } from "next/navigation";
import { getCookieValue } from "@/app/lib/session";
import jwt from 'jsonwebtoken';
import { auth } from "@/auth";
import GuestSignOut from "@/app/components/auth/guest-signout-button";

type DecodedValue = {
    name?: string;
    email?: string;
}

export default async function Dashboard() {
    
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
        <main className="">
            <div>Dashboard</div>
            <div>
                {
                    session ?
                    <>
                        <p>
                            {`${session.user?.name}, ${session.user?.email}`}
                        </p>
                        
                        <SignOut />
                    </>
                     :
                    <>
                        <p>
                            {`${decodedValue?.name}, ${decodedValue?.email}`}
                        </p>
                        <GuestSignOut />
                    </>
                }   
            </div>
            
        </main>
    );
}