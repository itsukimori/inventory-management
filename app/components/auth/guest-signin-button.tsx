'use client'
import { useRouter } from 'next/navigation';

export default function GuestLoginButton() {
    const router = useRouter();

    const handleGuestLogin = async () => {
        try {
            const response = await fetch("/api/guest-login", { method: "POST" });
            if (response.ok) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <button onClick={handleGuestLogin}>ゲストとしてログイン</button>
        </div>
    )
}