'use client'
import { Avatar, Text, Group, Paper } from '@mantine/core';
import { IconAt, IconLogout } from '@tabler/icons-react';
import classes from '@/app/mantine-css-modules/UserInfo.module.css';
import { useRouter } from 'next/navigation';

export function UserInfo(
    { name, email, imageUrl }:
    { 
        name: string | null | undefined,
        email: string | null | undefined,
        imageUrl: string | null | undefined
    }
) {
    const router = useRouter();
    const handleSignOut = async () => {
        await fetch('/api/signout', {
            method: 'POST',
        });
        router.push('/');
    };
  return (
    <div>
        <Paper shadow="xl" radius="xl" p="xl">
            <Group wrap="nowrap">
                <Avatar
                    src={imageUrl}
                    size={94}
                    radius="md"
                />
                <div>
                    <Text fz="lg" fw={500} className={classes.name}>
                        {name}
                    </Text>
                    <Group wrap="nowrap" gap={10} mt={3}>
                        <IconAt stroke={1.5} size="1rem" />
                        <Text fz="xs" c="dimmed">
                            {email}
                        </Text>
                    </Group>
                </div>
                <a href="/" className={classes.link} onClick={handleSignOut}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                </a>
            </Group>
        </Paper>
    </div>
  );
}