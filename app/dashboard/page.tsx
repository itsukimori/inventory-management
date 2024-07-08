import SignOut from "@/app/components/auth/signout-button";
import { redirect } from "next/navigation";
import { getCookieValue } from "@/app/lib/session";
import jwt from 'jsonwebtoken';
import { auth } from "@/auth";
import GuestSignOut from "@/app/components/auth/guest-signout-button";
import MainLayout from "@/app/components/layouts/main-layout";
import { Group, Avatar, Text } from "@mantine/core";

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
        <MainLayout>
            <div>Dashboard</div>
            {
                session ?
                <>
                   <Group>
                        <Avatar
                            src={session.user?.image!}
                            alt={session.user?.name!}
                            radius="xl"
                        />
                        <div>
                            <Text fz="sm">{session.user?.name}</Text>
                            <Text fz="xs" c="dimmed">
                                {session.user?.email}
                            </Text>
                        </div>
                        <SignOut />
                    </Group>
                </>
                :
                <>
                    <Group>
                        <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                            alt="Jacob Warnhalter"
                            radius="xl"
                        />
                        <div>
                            <Text fz="sm">{decodedValue?.name}</Text>
                            <Text fz="xs" c="dimmed">
                                {decodedValue?.email}
                            </Text>
                        </div>
                        <GuestSignOut />
                    </Group>
                </>
            }
        </MainLayout>
    );
}
