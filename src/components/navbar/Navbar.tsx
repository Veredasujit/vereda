"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLogoutMutation } from "../../Redux/api/authApi"; // adjust path
import { useDispatch } from "react-redux";
import { logout as logoutSlice } from "../../Redux/slices/authSlice"; // adjust path
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  // Check localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("user"); // assuming you store Redux user here
    if (userData) {
      const parsed = JSON.parse(userData);
      setUserName(parsed.name);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap(); // call RTK Query logout
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // Clear Redux store and localStorage
      dispatch(logoutSlice());
      setUserName(null);
      router.push("/login");
    }
  };

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="logo image"
              width={160}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/view-courses" className="hover:text-blue-600">Courses</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>

            {userName ? (
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
                       text-white flex items-center justify-center font-semibold 
                       shadow-sm hover:scale-105 transition-transform duration-150"
            title={userName}
          >
            {userName.charAt(0).toUpperCase()}
          </div>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm font-medium 
                       text-gray-700 hover:text-blue-600 transition-colors duration-150"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1 cursor-pointer text-sm text-gray-700 hover:text-red-600 transition-colors"
          >
            
            Logout
          </Button>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium 
                     hover:bg-blue-700 transition-colors duration-150 cursor-pointer"
        >
          Login
        </Link>
      )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-inner">
          <Link href="/" className="block hover:text-blue-600">Home</Link>
          <Link href="/courses" className="block hover:text-blue-600">Courses</Link>
          <Link href="/contact" className="block hover:text-blue-600">Contact</Link>

               {userName ? (
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 
                       text-white flex items-center justify-center font-semibold 
                       shadow-sm hover:scale-105 transition-transform duration-150"
            title={userName}
          >
            {userName.charAt(0).toUpperCase()}
          </div>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm font-medium 
                       text-gray-700 hover:text-blue-600 transition-colors duration-150"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1 cursor-pointer text-sm text-gray-700 hover:text-red-600 transition-colors"
          >
            
            Logout
          </Button>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium 
                     hover:bg-blue-700 transition-colors duration-150 cursor-pointer"
        >
          Login
        </Link>
      )}
        </div>
      )}
    </nav>
  );
}
