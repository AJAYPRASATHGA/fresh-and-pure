"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface OilProductCardProps {
  id: string;
  name: string;
  price: string;
  desc: string;
  image: string;
  features?: string[];
  onAddToCart: (product: unknown) => void;
}

export default function OilProductCard({
  id,
  name,
  price,
  desc,
  image,
  features = [],
  onAddToCart
}: OilProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const product = { id, name, price, image, desc };
    await onAddToCart(product);
    setIsAdding(false);
  };

  return (
    <motion.div 
       whileHover={{ y: -6 }}
  transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Product Image */}
{/* Product Image */}
<div className="relative h-72 md:h-80 bg-white flex items-center justify-center">
  
  {/* Bottle shadow */}
  <div className="absolute bottom-6 w-24 h-4 bg-black/10 blur-lg rounded-full z-0" />
    <Image
    src={image}
    alt={name}
    fill
    className="object-contain p-6"
    sizes="(max-width: 768px) 100vw, 33vw"
    priority
  />
</div>

      
      {/* Product Info */}
      <div className="p-5 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <span className="text-lg font-semibold text-primary">{price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{desc}</p>
        
        {/* Features List */}
        {features.length > 0 && (
          <ul className="mb-4 space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-4 h-4 mt-1 mr-2 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* Add to Cart Button */}
        <Button 
          className="w-full bg-amber-800 hover:bg-amber-900 gap-2"
          size="lg"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <ShoppingCart className="w-4 h-4" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
}