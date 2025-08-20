
"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const initAnimations = () => {
      // Clear existing animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Form animation
      if (formContainerRef.current) {
        gsap.from(formContainerRef.current, {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Contact info animations
      contactRefs.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          });
        }
      });
    };

    // Initialize with small delay to ensure DOM is ready
    const timer = setTimeout(initAnimations, 50);
    
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pathname]); // Re-run when route changes

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) contactRefs.current[index] = el;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    setIsSubmitted(true);
  };

  return (
    <div className="bg-amber-50">
      <div className="container py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Share Your Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value your experience with our oils. Let us know how we can improve!
          </p>
        </div>

        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2">
          {/* Feedback Form */}
          <div 
            ref={formContainerRef}
            className="bg-white p-8 md:p-10 rounded-xl shadow-lg"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h2>
                <p className="text-gray-600">
                  We&apos;ve received your feedback and appreciate your time.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-amber-700 hover:bg-amber-800"
                >
                  Submit Another Feedback
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Feedback Form
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                      Which product did you try?
                    </label>
                    <Input id="product" placeholder="Groundnut oil, Coconut oil, etc." />
                  </div>

                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                      How would you rate your experience?
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center"
                        >
                          {star}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Feedback
                    </label>
                    <Textarea 
                      id="feedback" 
                      rows={4} 
                      placeholder="What did you like? How can we improve?" 
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-amber-700 hover:bg-amber-800 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </Button>
                </form>
              </>
            )}
          </div>

          {/* Contact Information - Remains the same */}
          <div className="space-y-8">
                <div 
              ref={el => addToRefs(el, 0)}
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Visit Our Farm
              </h3>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 text-amber-800 rounded-full">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-600">123 Oil Press Road</p>
                  <p className="text-gray-600">Kochi, Kerala 682001</p>
                  <p className="text-gray-600 mt-4">Open: Mon-Sat, 9AM-5PM</p>
                </div>
              </div>
            </div>

            <div 
              ref={el => addToRefs(el, 1)}
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 text-amber-800 rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-600">info@pureoils.com</p>
                    <p className="text-sm text-gray-500">Email response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 text-amber-800 rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-5PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div 
              ref={el => addToRefs(el, 2)}
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Wholesale Inquiries
              </h3>
              <p className="text-gray-600 mb-4">
                Interested in carrying our oils in your store? Contact our sales team for wholesale pricing.
              </p>
              <Button variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-50">
                Request Wholesale Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}