"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedText() {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.3,
    });
  });

  return (
    <h1 ref={textRef} className="text-5xl font-bold md:text-7xl">
      Transform Your Business
    </h1>
  );
}