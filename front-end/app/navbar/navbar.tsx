'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Buttons from "../components/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/doctors", label: "Doctors" },
  { href: "/my-appointments", label: "My Appointments" },
];

const navLinkClass =
  "inline-block text-[15px] text-black drop-shadow font-normal transition duration-200 hover:bg-[linear-gradient(135deg,#0E82FD_0%,#06AED4_100%)] hover:text-transparent hover:bg-clip-text";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-30 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/images/navHero/Background.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-sm object-cover w-10 h-10 sm:w-12 sm:h-12"
          />
          <Image
            src="/images/logo/Logo.png"
            alt="Doctor Logo"
            width={98}
            height={48}
            className="rounded-sm object-cover w-16 sm:w-24"
            style={{ height: "auto" }}
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} className={navLinkClass} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex gap-3 lg:gap-4 items-center">
          <Link className="text-[13px] lg:text-[15px] text-black drop-shadow font-normal" href="#">
            Contact: +92 123 456 789
          </Link>
          <Buttons title="Login / Sign up" href="/auth" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-black focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <Menu className="w-6 h-6 stroke-[2.5]" />
          )}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 top-0"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Side Slide */}
      <div
        className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-6 h-full overflow-y-auto flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-black hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="space-y-2 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[15px] text-black font-medium pt-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Footer Section */}
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <p className="text-[12px] text-slate-600 px-4 mb-4">Contact: +92 123 456 789</p>
            <div className="px-4">
              <Buttons title="Login / Sign up" href="/auth" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
