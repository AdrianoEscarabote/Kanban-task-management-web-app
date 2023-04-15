// Layout.tsx
import React from "react";
import { LayoutProps } from "./LayoutProps";
import Header from "../Header/Header";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header open={false} />
      {children}
    </>
  );
};

export default Layout;