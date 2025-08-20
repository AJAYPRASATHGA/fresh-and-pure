
"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Factory, Sprout, HeartHandshake, Leaf, Sun, Nut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function About() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const animationRefs = useRef<gsap.core.Tween[]>([]);
  const scrollTriggers = useRef<ScrollTrigger[]>([]);

  // Initialize animations
  const initAnimations = () => {
    // Clear existing animations
    animationRefs.current.forEach(anim => anim.kill());
    scrollTriggers.current.forEach(st => st.kill());
    animationRefs.current = [];
    scrollTriggers.current = [];

    // Hero animation
    const heroAnim = gsap.from(".about-hero", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
    animationRefs.current.push(heroAnim);

    // Image animation
    if (imageRef.current) {
      const imgAnim = gsap.from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
      });
      animationRefs.current.push(imgAnim);
    }

    // Process steps animation - SINGLE ScrollTrigger for all cards
    if (processRef.current) {
      const cards = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
      const processAnim = gsap.from(cards, {
        opacity: 100,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 80%",
          markers: false,
          toggleActions: "play none none none"
        }
      });
      animationRefs.current.push(processAnim);
      if (processAnim.scrollTrigger) {
        scrollTriggers.current.push(processAnim.scrollTrigger);
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      animationRefs.current.forEach(anim => anim.kill());
      scrollTriggers.current.forEach(st => st.kill());
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => {
        initAnimations();
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) sectionRefs.current[index] = el;
  };


  return (
    <div className="overflow-hidden">
      {/* Hero Section - Always visible */}
      <div className="container py-12 md:py-20 about-hero">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
          Crafting Nature&apos;s Golden Elixirs
        </h1>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
          For three generations, we&apos;ve perfected the art of extracting pure, flavorful oils 
          using traditional methods that honor both nature and nutrition.
        </p>
      </div>
      {/* Farm to Bottle */}
      <div className="container grid gap-8 md:gap-12 mt-12 mx-3 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            From Seed to Bottle
          </h2>
          <p className="mt-4 text-gray-700">
            We partner directly with local farmers to source the finest groundnuts, 
            sunflower seeds, and coconuts. Our small-batch process ensures each drop 
            of oil retains its natural goodness and authentic flavor.
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: <Leaf className="w-6 h-6" />, text: "Cold-pressed" },
              { icon: <Sun className="w-6 h-6" />, text: "Sun-dried" },
              { icon: <Nut className="w-6 h-6" />, text: "No additives" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 text-amber-800">
                  {item.icon}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          ref={imageRef}
          className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="absolute inset-0 bg-[url('/oil-farm.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-sm font-medium">Our family farm in Kerala</p>
          </div>
        </div>
      </div>

      {/* Process Steps */}
     <div ref={processRef} className="container py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          Our Time-Honored Process
        </h2>
        
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {[
            { 
              icon: <Sprout className="w-8 h-8" />, 
              title: "Organic Cultivation", 
              desc: "We use only pesticide-free groundnuts and sunflower seeds grown in mineral-rich soil"
            },
            { 
              icon: <Factory className="w-8 h-8" />, 
              title: "Slow Cold-Pressing", 
              desc: "Our wooden presses extract oil at low temperatures to preserve nutrients"
            },
            { 
              icon: <HeartHandshake className="w-8 h-8" />, 
              title: "Community First", 
              desc: "Every purchase supports 50+ local farming families"
            },
          ].map((item, i) => (
            <div 
              key={i}
              ref={el => addToRefs(el, i)}
              className="p-6 md:p-8 border border-gray-200 rounded-xl hover:shadow-md transition-all bg-white"
            >
              <div className="p-3 rounded-full bg-amber-100 text-amber-800 w-max">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-amber-50 py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <blockquote className="text-xl md:text-2xl font-medium italic text-gray-800">
            &quot;The difference in flavor between mass-produced oils and their small-batch 
            cold-pressed groundnut oil is night and day. You can taste the care in every drop.&quot;
          </blockquote>
          <p className="mt-6 font-medium text-amber-800">- Chef Ramesh, Kochi</p>
        </div>
      </div>

    </div>
  );
}