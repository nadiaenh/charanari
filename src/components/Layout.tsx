import React, {type ReactNode} from "react";
import {Analytics} from '@vercel/analytics/react';
import {UserButton} from "@clerk/nextjs";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen bg-pink-50 relative">
            <header className="w-full flex justify-between items-center p-4 absolute top-0 right-0">
                <h1 className="text-xl">Create Character Screen</h1>
                <UserButton afterSignOutUrl="/" />
            </header>
            <main className="flex-grow flex flex-col items-center justify-center">
                {children}
                <Analytics />
            </main>
            <footer className="p-4 absolute bottom-0 left-0 right-0 flex justify-center">
                <p>© {new Date().getFullYear()} Charanari</p>
            </footer>
        </div>
    );
};

export default Layout;
