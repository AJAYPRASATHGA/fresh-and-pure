"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCoffee} className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold">Fresh&Pure</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-primary transition-colors ${
                pathname === link.href ? "text-primary font-medium" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Fixed CTA Button */}
        <Button asChild variant="default" size="default" className="hidden md:flex gap-2">
          <Link href="/products">
            Shop Now
          </Link>
        </Button>

        {/* Mobile Menu Toggle */}
        <button 
          className="p-2 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md animate-in fade-in-50">
          <div className="container flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 hover:text-primary ${
                  pathname === link.href ? "text-primary font-medium" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="default" size="default" className="w-full">
              <Link href="/products">
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}