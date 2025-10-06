"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
           
            <Link href="/view-courses" className="hover:text-blue-600">Courses</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            <Link href="/login" className="hover:text-blue-900 text-blue-600">Login</Link>
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
          <Link href="/login" className="block hover:text-blue-600">Login</Link>
        </div>
      )}
    </nav>
  )
}
