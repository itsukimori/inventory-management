import React, { ReactNode } from 'react';
import { Flex } from '@mantine/core';
import { Navbar } from "@/app/components/ui/nav-bar/NavBar";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Flex>
            <Navbar />
            <main  style={{ flex: 1, padding: '20px' }}>
                {children}
            </main>
        </Flex>
    );
};

export default MainLayout;