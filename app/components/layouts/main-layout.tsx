import React, { ReactNode } from 'react';
import { HeaderMenu } from "@/app/components/ui/header-menu/HeaderMenu";
interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <HeaderMenu />
            <main  style={{ flex: 1, padding: '20px' }}>
                {children}
            </main>
        </>
    );
};

export default MainLayout;