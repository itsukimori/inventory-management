import { GuestSignOut } from "@/auth";
import { IconLogout } from "@tabler/icons-react";

export default function GuestSignOutButton() {
    return (
        <form action={async () => {
            "use server";
            await GuestSignOut();
        }}>
            <button type="submit">
                <IconLogout stroke={1.5} />
            </button>
        </form>
    )
}
  
