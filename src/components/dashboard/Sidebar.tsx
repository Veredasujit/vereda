"use client";
import React from "react";
import { Menu, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Dashboard", icon: "📊", href: "/dashboard" },
    { name: "My Courses", icon: "🎓", href: "/dashboard/courses" },
    { name: "Progress", icon: "📈", href: "/dashboard/progress" },
    { name: "Settings", icon: "⚙️", href: "/dashboard/settings" },
    { name: "Billing", icon: "💳", href: "/dashboard/billing" },
  ];

  return (
    <>
      {/* 📋 Sidebar (Desktop + Mobile) */}
      <aside
        className={`fixed bg-white shadow-sm border-r mt-[70px] border-gray-200 z-40 transform transition-transform duration-300
        lg:translate-x-0 lg:static lg:w-64 lg:top-0
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
        top-[64px] h-[calc(100%-64px)] lg:h-full`}
      >
        <div className="p-6 overflow-y-auto h-full">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center space-x-3 px-3 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Courses</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours</span>
                <span className="font-semibold">45h</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 🔲 Overlay */}
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
