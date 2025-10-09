"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLogoutMutation } from "../../Redux/api/authApi"; // adjust path
import { useDispatch } from "react-redux";
import { logout as logoutSlice } from "../../Redux/slices/authSlice"; // adjust path
import { useRouter } from "next/navigation";

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
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-600 font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="block hover:text-blue-600">Login</Link>
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="hover:text-red-600 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="block hover:text-blue-600">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
