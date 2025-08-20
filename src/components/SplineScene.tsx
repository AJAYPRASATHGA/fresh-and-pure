"use client";
import dynamic from "next/dynamic";

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div>Loading 3D...</div>,
});

export default function SplineScene() {
  return (
    <Spline 
      scene="https://prod.spline.design/your-scene-id" 
      className="w-full h-full" 
    />
  );
}