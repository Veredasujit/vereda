// app/dashboard/layout.tsx (server layout)
import React, { ReactNode } from "react";
import DashboardClientLayout from "./DashboardClientLayout";

export const metadata = {
  title: "Dashboard - Vereda",
  description: "User dashboard Vereda",
};

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
