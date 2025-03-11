"use client";

import { Search, Settings } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onConnect: () => void;
  connected: boolean;
}

export default function Navbar({ onConnect, connected }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between py-2 px-6">
      <div className="flex items-center">
        <Link href="/" className="flex items-center mr-8">
          <div className="w-20 h-20">
            <img src="/aa.jpg" alt="Logo" />
          </div>
          <span className="font-semibold text-white text-glow">ALPHASWAP</span>
        </Link>

        <div className="space-x-6">
          <Link
            href="#"
            className="text-white font-medium border-b border-white pb-1"
          >
            Swap
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Alpha
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Telegram
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Website
          </Link>
          <Link
            href="#"
            className="text-white transition-colors relative 
             before:absolute before:inset-1 before:bg-white before:blur-xl 
             before:opacity-100 before:animate-pulse drop-shadow-2xl"
          >
            Airdrop
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search token or address"
            className="bg-white/5 text-white rounded-full pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 border border-white/5"
          />
        </div>
        <button
          onClick={onConnect}
          className="sparkle-button rounded-full bg-white text-black px-4 py-2 font-medium text-sm transition-colors hover:bg-white/90 button-glow"
        >
          {connected ? "Disconnect" : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}
