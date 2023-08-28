import React, {type ReactNode} from "react";
import {Analytics} from '@vercel/analytics/react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
            <header className="text-center py-4 border-b">
                <h1 className="text-xl">Create Character Screen</h1>
            </header>
            <main className="w-full max-w-md p-4 rounded-lg shadow-md bg-white">
                {children}
                <Analytics/>
            </main>
            <footer className="text-center py-4 border-t">
                <p>© {new Date().getFullYear()} Nadia Enhaili</p>
            </footer>
        </div>
    );
};

export default Layout;
