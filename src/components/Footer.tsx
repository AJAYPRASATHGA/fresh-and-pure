import Link from "next/link";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#18352d] text-[#f6f2e9]">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div><p className="font-display text-3xl">Fresh & Pure</p><p className="mt-4 max-w-xs text-sm leading-7 text-[#c8d6c9]">Small-batch, cold-pressed oils made with the patience of tradition and the clarity of good ingredients.</p></div>
        <div><p className="eyebrow !text-[#e9a16a]">Explore</p><div className="mt-5 grid gap-3 text-sm text-[#d5e0d5]"><Link href="/products">Shop oils</Link><Link href="/about">Our story</Link><Link href="/contact">Talk to us</Link></div></div>
        <div><p className="eyebrow !text-[#e9a16a]">Visit</p><p className="mt-5 text-sm leading-7 text-[#d5e0d5]">Kochi, Kerala<br/>Mon–Sat · 9am–5pm<br/>+91 73058 01920</p></div>
        <div><p className="eyebrow !text-[#e9a16a]">Quick order</p><p className="mt-5 text-sm leading-7 text-[#d5e0d5]">Need a refill or a family-size tin?</p><a href="https://wa.me/917305801920" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#e9a16a] px-4 text-sm font-bold text-[#18352d]"><MessageCircle size={16}/> WhatsApp us <ArrowUpRight size={15}/></a></div>
      </div>
      <div className="border-t border-white/15"><div className="container flex flex-col justify-between gap-3 py-5 text-xs text-[#aec0b1] sm:flex-row"><span>© {new Date().getFullYear()} Fresh & Pure Oils</span><span className="flex items-center gap-4"><Instagram size={15}/> Crafted for everyday cooking.</span></div></div>
    </footer>
  );
}
