import SignIn from "@/app/components/auth/signin-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import GuestLoginButton from "@/app/components/auth/guest-signin-button";
import { getCookieValue } from "@/app/lib/session";
import {
  Text,
  Paper,
  Group,
  Box,
  Center,
} from '@mantine/core';

export default async function Home() {
  
  const cookieName = 'guest-session';
  const cookieValue = await getCookieValue(cookieName); 
  const session = await auth();
  await (async () => {
    try {
      await fetch(`${process.env.BASE_URL}/api/staff`, {
        method: 'POST',
        body: JSON.stringify(session)
      })
    } catch (error) {
      console.error(error);
    } 
  })();
  
  // if(session || cookieValue) {
  //   return redirect("/dashboard");
  // }

  return (
    <main>
      <Center style={{ height: '100vh' }}>
        <Paper shadow="xl" radius="md" p="xl">
        <Text size="lg" fw={500}>
          在庫管理システム
        </Text>
        <Group>
          <Box>
            <GuestLoginButton />
          </Box>
          <Box>
            <SignIn />
          </Box>
        </Group>
        </Paper>
      </Center>
    </main>
  );
}
