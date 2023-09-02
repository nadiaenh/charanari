import React, {type ReactNode} from "react";
import {Analytics} from '@vercel/analytics/react';
import {UserButton} from "@clerk/nextjs";
import { ThemeProvider } from "~/components/theme-provider";

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen relative bg-pink-50 dark:bg-gray-900">
                <header className="w-full flex justify-between items-center p-4 absolute top-0 right-0">
                    {/* CLERK USER ACCOUNT BUTTON */}
                    <UserButton afterSignOutUrl="/" />

                    <h1 className="text-xl">Create Character Screen</h1>

                    {/* LIGHT/DARK MODE TOGGLE */}
                    <ModeToggle />
                </header>

                <main className="flex-grow flex flex-col items-center justify-center">
                    {children}
                    <Analytics />
                </main>

                <footer className="p-4 absolute bottom-0 left-0 right-0 flex justify-center">
                    <p>© {new Date().getFullYear()} Charanari</p>
                </footer>
            </div>
        </ThemeProvider>
    );
};

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Layout;
