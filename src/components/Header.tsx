"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

export default function Header({ cartItemsCount = 0, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b shadow-sm' : 'bg-white/80 backdrop-blur-md border-b'
      }`}>
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

          {/* Right Side - Cart & Products Button */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button 
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Products Button */}
            <Button asChild variant="default" size="default" className="hidden md:flex gap-2">
              <Link href="/products">
                View Products
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
        </div>
      </header>

      
{mobileMenuOpen && (
  <div className="md:hidden">
    {/* Backdrop */}
    <div 
      className="fixed inset-0 bg-black/50 z-40"
      onClick={() => setMobileMenuOpen(false)}
    />
    
    {/* Mobile Menu */}
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
      <div className="p-4 space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors ${
              pathname === link.href ? "text-primary font-medium bg-primary/5" : "text-gray-700"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="pt-4 mt-4 border-t">
          <Button asChild variant="default" size="lg" className="w-full">
            <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
              View Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}