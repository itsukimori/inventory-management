'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Group } from '@mantine/core';
import {
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconUser
} from '@tabler/icons-react';
import classes from '@/app/mantine-css-modules/NavBar.module.css';
import React from 'react';


const data = [
  { link: '/dashboard', label: 'マイページ', icon: IconUser },
  { link: '/dashboard/inventory', label: '在庫一覧', icon: IconDatabaseImport },
];

export function Navbar() {
    const [active, setActive] = useState<string>('マイページ');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const currentItem = data.find(item => item.link === pathname);
        if (currentItem) {
            setActive(currentItem.label);
        }
    }, [pathname]);

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            key={item.label}
            onClick={(event) => {
            event.preventDefault();
            setActive(item.label);
            router.push(item.link);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    const handleSignOut = async () => {
        const response = await fetch('/api/signout', {
            method: 'POST',
        });
        router.push('/');
    };

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between"></Group>
                    {links}
            </div>
            <div className={classes.footer}>
                {/* <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a> */}
                <a href="/" className={classes.link} onClick={handleSignOut}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>ログアウト</span>
                </a>
            </div>
        </nav>
    );
}
