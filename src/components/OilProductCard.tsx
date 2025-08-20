"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function OilProductCard({
  name,
  price,
  desc,
  features = []
}: {
  name: string;
  price: string;
  desc: string;
  features?: string[];
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="h-full border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white"
    >
      {/* Product Image Placeholder */}
      <div className="relative h-48 bg-primary-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10" />
      </div>
      
      {/* Product Info */}
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <span className="text-lg font-semibold text-primary">{price}</span>
        </div>
        
        <p className="mt-2 text-gray-600">{desc}</p>
        
        {/* Features List */}
        {features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-4 h-4 mt-1 mr-2 text-primary flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* CTA Button */}
        <Button 
          className="w-full mt-6 bg-primary hover:bg-primary-light gap-2"
          size="lg"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}