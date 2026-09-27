import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: { default: "Fresh & Pure | Cold-Pressed Oils", template: "%s | Fresh & Pure" }, description: "Traceable, cold-pressed sesame, coconut and groundnut oils from Kerala.", keywords: ["cold pressed oil", "sesame oil", "coconut oil", "groundnut oil", "Kerala"], openGraph: { title: "Fresh & Pure Cold-Pressed Oils", description: "Good seeds. Slow pressing. Better everyday cooking.", type: "website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Header />{children}<Footer /></body></html>; }
