"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  Send,
  Shield,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [textbookDropdownOpen, setTextbookDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setCurrentUser(data.user);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-12 w-36 sm:h-14 sm:w-44 transition-transform group-hover:scale-105 duration-300">
                <Image
                  src="/images/logo.png"
                  alt="TextFix Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-blue-700 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            {/* Curriculum Explorer Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTextbookDropdownOpen(!textbookDropdownOpen)}
                onBlur={() => setTimeout(() => setTextbookDropdownOpen(false), 200)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/grades") || pathname === "/textbooks"
                    ? "text-blue-700 bg-blue-50/80 font-semibold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>Curriculum</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {textbookDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Ethiopian New Curriculum
                    </span>
                  </div>
                  <Link
                    href="/grades/grade-11/biology/unit-1"
                    className="flex items-start space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors group"
                  >
                    <span className="mt-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100 flex-shrink-0"></span>
                    <div>
                      <div className="text-sm font-medium text-slate-800 group-hover:text-blue-700">
                        Grade 11 Biology (Unit 1)
                      </div>
                      <div className="text-xs text-emerald-600 font-medium">
                        Active Launch &bull; Verified Corrections
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/textbooks"
                    className="flex items-center space-x-2 px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 border-t border-slate-100"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>View All High School Textbooks (Grades 9–12) &rarr;</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/search"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/search"
                  ? "text-blue-700 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search</span>
            </Link>

            <Link
              href="/methodology"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/methodology"
                  ? "text-blue-700 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              Methodology
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-blue-700 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              About
            </Link>

            <Link
              href="/submit"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/submit"
                  ? "text-emerald-800 bg-emerald-50 font-semibold"
                  : "text-emerald-700 hover:bg-emerald-50/80"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Error</span>
            </Link>
          </nav>

          {/* Right Action: Auth / User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                {currentUser.role === "admin" && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin Portal</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold text-xs border border-slate-200">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-slate-700 hidden lg:inline">
                    {currentUser.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Log Out"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="/grades/grade-11/biology/unit-1"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-blue-700 bg-blue-50"
          >
            Grade 11 Biology (Unit 1)
          </Link>
          <Link
            href="/textbooks"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            All High School Textbooks
          </Link>
          <Link
            href="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Global Search
          </Link>
          <Link
            href="/methodology"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Methodology
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            About Us
          </Link>
          <Link
            href="/submit"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-emerald-700 bg-emerald-50"
          >
            Submit an Error
          </Link>

          <div className="pt-4 border-t border-slate-200">
            {currentUser ? (
              <div className="space-y-2">
                {currentUser.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center px-4 py-2.5 rounded-lg bg-slate-100 text-rose-600 font-medium text-sm"
                >
                  Log Out ({currentUser.name})
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
