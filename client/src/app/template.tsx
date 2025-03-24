"use client";

import { UserProvider } from "@/context/userContext";
import React from "react";
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <UserProvider>
      <main className="flex-1">{children}</main>
      <Toaster />
    </UserProvider>
  );
};

export default Layout;
