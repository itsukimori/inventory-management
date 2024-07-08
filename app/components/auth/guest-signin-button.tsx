'use client'
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';

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
        <Button
            onClick={handleGuestLogin}
            type="submit"
            variant="default"
            color="gray"
            radius="md"
            size="md"
        >
            ゲストとしてログイン
        </Button>
    )
}