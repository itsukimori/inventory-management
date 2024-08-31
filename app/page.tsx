import SignIn from "@/app/components/auth/signin-button";
import { auth } from "@/auth";
import GuestLoginButton from "@/app/components/auth/guest-signin-button";
import {
  Text,
  Paper,
  Stack,
  Box,
  Center,
  Button,
} from '@mantine/core';

export default async function Home() {

  const session = await auth();
  if(session) {
    try {
      await fetch(`${process.env.BASE_URL}/api/staff`, {
        method: 'POST',
        body: JSON.stringify(session)
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <Center style={{ height: '100vh' }}>
        <Paper shadow="xl" radius="md" p="xl">
        <Text size="lg" m={16} fw={500}>
          在庫管理システム
        </Text>
        { session ? (
          <>
            <Button 
              variant="default"
              color="gray"
              radius="md"
              size="md">
              <a href="/dashboard">管理画面へ進む</a>
            </Button>
          </>
        ) : (
          <>
            <Stack>
              <Box>
                <GuestLoginButton />
              </Box>
              <Box>
                <SignIn />
              </Box>
            </Stack>
          </>
        )}
        </Paper>
      </Center>
    </main>
  );
}
