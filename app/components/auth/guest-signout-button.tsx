import { GuestSignOut } from "@/auth";

export default function GuestSignOutButton() {
    return (
        <form action={async () => {
            "use server";
            await GuestSignOut();
        }}>
            <button type="submit">ログアウト</button>
        </form>
    )
}
  