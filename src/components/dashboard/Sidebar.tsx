"use client";

import React from "react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Dashboard", icon: "📊", href: "/dashboard" },
    { name: "My Courses", icon: "🎓", href: "/dashboard/courses" },
    { name: "Settings", icon: "⚙️", href: "/dashboard/settings" },
    { name: "Billing", icon: "💳", href: "/dashboard/billing" },
  ];

  return (
    <>
      {/* 📋 Sidebar (Desktop + Mobile) */}
      <aside
        className={`fixed top-[64px] mt-[64px] left-0 z-40 bg-white shadow-sm border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-64
          w-64 h-[calc(100vh-64px)] overflow-y-auto`}
      >
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* 🔲 Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
