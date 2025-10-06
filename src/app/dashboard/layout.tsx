// app/dashboard/layout.tsx
"use client";

import React, { ReactNode, useState } from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Toaster } from "react-hot-toast";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <DashboardNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
      {/* Toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DashboardLayout;
