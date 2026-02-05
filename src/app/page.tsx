"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Leaf, Award, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const benefitCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const oilImageRef = useRef<HTMLDivElement>(null);
  const benefitsSectionRef = useRef<HTMLDivElement>(null);
  const oilHighlightRef = useRef<HTMLDivElement>(null);
  const benefitItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP Animations
  useEffect(() => {
    // Hero section animation
    gsap.fromTo(
      [titleRef.current, subtitleRef.current, buttonRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
      }
    );

    // Benefit cards animation with oil image
    gsap.fromTo(
      [...benefitCardsRef.current.filter(Boolean), oilImageRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".benefits-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Floating animation for oil image
    gsap.to(oilImageRef.current, {
      y: 15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

     gsap.fromTo(
      oilHighlightRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: benefitsSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      benefitItemsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: benefitsSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );

    // Floating animation for oil image
    gsap.to(oilHighlightRef.current, {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  // Helper function to add refs to array
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      benefitCardsRef.current[index] = el;
    }
  };

  return (
    <>
      {/* Hero Section with Fixed Background */}
      <section 
        ref={heroRef}
        className="relative h-screen bg-[url('/images/oil-background.png')] bg-cover bg-center bg-no-repeat bg-fixed"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 flex flex-col items-center justify-center h-full px-4">
          <div className="grid items-center w-full grid-cols-1 gap-8 text-center lg:grid-cols-2 lg:text-left">
            {/* Text Content */}
            <div>
              <h1 ref={titleRef} className="text-4xl font-bold text-white md:text-6xl">
                Pure, Handcrafted Oils
              </h1>
              <p ref={subtitleRef} className="mt-4 text-xl text-white max-w-2xl">
                Cold-pressed, organic oils for health and wellness
              </p>

              <Button 
                ref={buttonRef}
                size="lg" 
                className="mt-8 gap-2 bg-amber-800 hover:bg-amber-900"
              >
                 <Link className="flex items-center gap-2"  href="/products">
                <Leaf className="w-5 h-5" /> Shop Now
                 </Link>
              </Button>
            </div>

            {/* Oil Bottle Image */}
            {/* <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src="/images/cooking_oil.png"
                alt="Premium Oil Bottle"
                fill
                className="object-contain"
                priority
                quality={85}
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
     <section 
        ref={benefitsSectionRef} 
        className="py-20 bg-gradient-to-b from-amber-50 to-white"
      >
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16 text-amber-800">
            Why Choose Our Oils
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Highlighted Oil Image */}
            <div 
              ref={oilHighlightRef}
              className="relative w-full max-w-md h-96 lg:h-[500px] lg:flex-1"
            >
            <Image
              src="/images/cooking_oil.webp"
             alt="Premium Oil"
  width={500}
  height={700}
  className="object-contain drop-shadow-2xl"
  quality={100}
  priority
/>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-50/30 rounded-full" />
            </div>

            {/* Benefits List */}
            <div className="lg:flex-1 space-y-8">
              {[
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Award-Winning Quality",
                  desc: "Recognized internationally for our purity standards and artisanal production methods"
                },
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: "100% Organic",
                  desc: "Sourced from certified organic farms with no artificial additives or preservatives"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Traditional Cold-Pressed",
                  desc: "Using centuries-old techniques to preserve nutrients and authentic flavor"
                }
              ].map((item, i) => (
                <div
                  key={i}
                  ref={(el) => addToRefs(el,i)}
                  className="p-6 bg-white rounded-xl shadow-lg border border-amber-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-100 rounded-full text-amber-700">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-900">{item.title}</h3>
                      <p className="mt-2 text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center">Loved by Families</h2>
          <div className="grid gap-6 mt-8 md:grid-cols-2">
            {/* Add testimonial components here */}
          </div>
        </div>
      </section>
    </>
  );
}