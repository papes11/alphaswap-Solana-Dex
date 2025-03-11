"use client";

import { useState } from "react";
import { Rocket, Bell, RefreshCw, Zap, RotateCcw } from "lucide-react";
import TokenSelector from "./token-selector";

interface SwapInterfaceProps {
  connected: boolean;
  onConnect: () => void;
}

export default function SwapInterface({
  connected,
  onConnect,
}: SwapInterfaceProps) {
  const [sellToken, setSellToken] = useState("USDC");
  const [buyToken, setBuyToken] = useState("SOL");
  const [amount, setAmount] = useState("");

  return (
    <div className="card-glass rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10">
        <div className="flex border-b border-[rgba(255,255,255,0.1)]">
          <button className="flex-1 py-3 flex items-center justify-center space-x-2 text-white">
            <Rocket className="h-4 w-4" />
            <span>INSTANT SWAP</span>
            <Rocket className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-full text-xs bg-white/10 text-white">
                APLHA AUTO
              </button>
            </div>

            <button className="text-gray-400 hover:text-white transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-400 px-2">Selling</div>
            <div className="bg-black/30 rounded-full p-3 flex items-center justify-between border border-white/5">
              <div className="rounded-full overflow-hidden">
                <TokenSelector token={sellToken} onChange={setSellToken} />
              </div>
              <div className="text-right">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-right text-2xl text-white w-full focus:outline-none"
                />
                <div className="text-xs text-gray-400">$0</div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <button className="absolute -top-1 bg-white/5 rounded-full p-1 border border-white/10">
                <div className="bg-black rounded-full p-1.5">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white rotate-90"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </button>
            </div>

            <div className="text-xs text-gray-400 px-2">Buying</div>
            <div className="bg-black/30 rounded-full p-3 flex items-center justify-between border border-white/5">
              <div className="rounded-full overflow-hidden">
                <TokenSelector token={buyToken} onChange={setBuyToken} />
              </div>
              <div className="text-right">
                <div className="text-2xl text-white">0.00</div>
                <div className="text-xs text-gray-400">$0</div>
              </div>
            </div>
          </div>

          <div className="flex mt-2">
            <span className="bg-white/10 text-white px-2 py-0.5 rounded-full text-[10px] mr-1">
              FAST
            </span>
            <Zap className="h-4 w-4" />
          </div>

          <div className="mt-4">
            {!connected ? (
              <button
                onClick={onConnect}
                className="sparkle-button w-full bg-white text-black py-3 rounded-full font-medium transition-colors hover:bg-white/90 button-glow"
              >
                Connect Wallet
              </button>
            ) : (
              <button className="sparkle-button w-full bg-white text-black py-3 rounded-full font-medium transition-colors hover:bg-white/90 button-glow">
                Enter an amount
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}