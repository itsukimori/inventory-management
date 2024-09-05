import GuestLoginButton from "@/app/components/auth/guest-signin-button";
import {
  Text,
  Paper,
  Stack,
  Box,
  Center,
  Button,
  Group,
  Avatar,
  Tooltip,
  Divider,
} from '@mantine/core';

export default async function Home() {
  /**
   * UbuntuのNginxでSSL化の不具合で保留。sessionをfalse
   */
  // const session = await auth();
  let session = false;
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
          <Box mb={32}>
            <Text 
              size="xl"
              m={16}
              fw={700}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              在庫管理システム
            </Text>
            { session ? (
              <>
                <Button 
                  variant="default"
                  color="gray"
                  radius="md"
                  size="md"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <a href="/dashboard">管理画面へ進む</a>
                </Button>
              </>
            ) : (
              <>
                <Stack>
                  <Box
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <GuestLoginButton />
                  </Box>
                  {
                  /**
                   * UbuntuのNginxでSSL化の不具合で保留
                   */
                  // <Box
                  //   style={{ display: 'flex', justifyContent: 'center' }}
                  // >
                  //   <SignIn />
                  // </Box>
                  }
                  <Box
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                        <Group>
                          <a
                            href="/login"
                          >
                            ログイン
                          </a>
                          <Divider orientation="vertical" />
                          <a
                            href="/register"
                          >
                            新規登録
                          </a>
                        </Group>
                    {/* <Divider
                      my="xs"
                      label={
                        <Anchor href="/register" target="_blank" inherit>
                          新規登録
                        </Anchor>
                      }
                    /> */}
                    {/* <Button color="gray" variant="default" radius="md" size="md">
                      <a href="/register">新規登録</a>
                    </Button> */}
                  </Box>
                </Stack>
              </>
            )}
          </Box>
          <Divider my="xs" label="使用技術" labelPosition="center" />
          <Text size="xs">
            - frontend -
          </Text>
          <Text mb={4} size="xs">
            Next.js, React, Mantine
          </Text>
            <Group mb={16}>
              <Tooltip
                label="Next.js"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/next-js.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="React"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/react.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="Mantine"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/mantine.svg" size="1.5rem" />
              </Tooltip>
          </Group>
          <Text size="xs">
            - backend -
          </Text>
          <Text  size="xs">
            Next.js, Prisma, MySQL, Docker, Auth.js, JWT
          </Text>
          <Text mb={8} size="xs">
            Nginx, Ubuntu
          </Text>
            <Group>
              <Tooltip
                label="Next.js"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/next-js.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="Prisma"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/prisma.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="MySQL"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/mysql.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="Docker"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/docker.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="Auth.js"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/auth-js.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="JWT"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/jwt.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="Nginx"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/nginx.svg" size="1.5rem" />
              </Tooltip>
              <Tooltip
                label="Ubuntu"
                transitionProps={{ transition: 'skew-up', duration: 300 }}
              >
                <Avatar src="icons/ubuntu.svg" size="1.5rem" />
              </Tooltip>
          </Group>
        </Paper>
      </Center>
    </main>
  );
}
