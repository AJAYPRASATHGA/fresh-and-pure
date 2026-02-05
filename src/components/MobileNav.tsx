"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.from(mobileNavRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(mobileNavRef.current, {
        x: "100%",
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={mobileNavRef}
      className="fixed inset-0 z-40 pt-20 bg-white md:hidden"
      style={{ transform: "translateX(100%)" }}
    >
      <div className="container flex flex-col gap-6 p-4 text-lg">
        <Link href="/" onClick={onClose}>Home</Link>
        <Link href="/about" onClick={onClose}>About</Link>
        <Link href="/services" onClick={onClose}>Services</Link>
        <Link href="/contact" onClick={onClose}>Contact</Link>
        <Button className="w-full mt-4">Get Started</Button>
      </div>
    </div>
  );
}