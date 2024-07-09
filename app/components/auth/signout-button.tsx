import { signOut } from "@/auth";
import { IconLogout } from "@tabler/icons-react";

export default function SignOut() {
  return (
    <form action={async () => {
        "use server";
        await signOut();
    }}>
      <button type="submit">
        <IconLogout stroke={1.5} />
      </button>
    </form>
  )
}
