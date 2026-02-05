"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import OilProductCard from "@/components/OilProductCard";
import Header from "@/components/Header";
import Cart from "@/components/Cart";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  desc: string;
  quantity: number;
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pathname = usePathname();
  
  // Cart state
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const oils = [
    { 
      id: "1",
      name: "Extra Virgin Olive Oil", 
      price: "$12", 
      desc: "First cold-press, high polyphenols",
      image: "/images/image1.png",
      features: ["Cold extracted", "Rich in antioxidants", "500ml bottle"]
    },
    { 
      id: "2",
      name: "Coconut Oil", 
      price: "$10", 
      desc: "Unrefined, great for cooking",
      image: "/images/image2.png",
      features: ["100% organic", "No chemicals", "Multi-purpose use"]
    },
    { 
      id: "3",
      name: "Sesame Oil", 
      price: "$11", 
      desc: "Rich aroma, traditional extraction",
      image: "/images/image3.png",
      features: ["Traditional method", "Nutty flavor", "High smoke point"]
    },
  ];

  // Cart functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculate total cart items count
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
              markers: false
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
    <>
      <Header 
        cartItemsCount={cartItemsCount}
        onCartClick={() => setCartOpen(true)}
      />
      
      <div ref={sectionRef} className="container py-12 md:py-20">
        <h1 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center text-primary mb-8 md:mb-12">
          Premium Handcrafted Oils
        </h1>
        
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {oils.map((oil, i) => (
            <div 
              key={oil.id}
              ref={el => addToRefs(el, i)}
              className="w-full"
            >
              <OilProductCard 
                id={oil.id}
                name={oil.name}
                price={oil.price}
                desc={oil.desc}
                image={oil.image}
                features={oil.features}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>
      </div>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
  );
}