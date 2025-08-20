"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import OilProductCard from "@/components/OilProductCard";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pathname = usePathname();

  const oils = [
    { 
      name: "Extra Virgin Olive Oil", 
      price: "$12", 
      desc: "First cold-press, high polyphenols",
      features: ["Cold extracted", "Rich in antioxidants", "500ml bottle"]
    },
    { 
      name: "Coconut Oil", 
      price: "$10", 
      desc: "Unrefined, great for cooking",
      features: ["100% organic", "No chemicals", "Multi-purpose use"]
    },
    { 
      name: "Sesame Oil", 
      price: "$11", 
      desc: "Rich aroma, traditional extraction",
      features: ["Traditional method", "Nutty flavor", "High smoke point"]
    },
  ];

  useEffect(() => {
    // Initialize animations only after component mounts
    const initAnimations = () => {
      const animations: gsap.core.Tween[] = [];
      const scrollTriggers: ScrollTrigger[] = [];

      // Heading animation
      if (headingRef.current) {
        const headingAnim = gsap.from(headingRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out"
        });
        animations.push(headingAnim);
      }

      // Card animations
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardAnim = gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
              markers:false // Helpful for debugging
            }
          });
          
          animations.push(cardAnim);
          if (cardAnim.scrollTrigger) {
            scrollTriggers.push(cardAnim.scrollTrigger);
          }
        }
      });

      return () => {
        animations.forEach(anim => anim.kill());
        scrollTriggers.forEach(st => st.kill());
      };
    };

    // Delay initialization slightly to ensure DOM is ready
    const timer = setTimeout(initAnimations, 50);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.refresh();
    };
  }, [pathname]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardRefs.current[index] = el;
    }
  };

  return (
    <div ref={sectionRef} className="container py-12 md:py-20">
      <h1 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center text-primary mb-8 md:mb-12">
        Premium Handcrafted Oils
      </h1>
      
      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {oils.map((oil, i) => (
          <div 
            key={i}
            ref={el => addToRefs(el, i)}
            className="w-full"
          >
            <OilProductCard {...oil} />
          </div>
        ))}
      </div>
    </div>
  );
}