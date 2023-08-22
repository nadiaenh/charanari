import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Fantasy Character Generator</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© {new Date().getFullYear()} Fantasy Character Generator</p>
      </footer>
    </div>
  );
};

export default Layout;
