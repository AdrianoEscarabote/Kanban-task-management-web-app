// Layout.tsx
import React from "react";
import { LayoutProps } from "./LayoutProps";
import Header from "../Header";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;