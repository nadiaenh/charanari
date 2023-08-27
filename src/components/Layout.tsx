import React, {type ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div>
            <header>
                <h1>Create Character Screen</h1>
            </header>
            <main className={"flex justify-center items-center h-screen"}>
                {children}
            </main>
            <footer>
                <p>© {new Date().getFullYear()} Nadia Enhaili</p>
            </footer>
        </div>
    );
};

export default Layout;
