"use client";

import { useState } from "react";
import Navbar from "./navbar";
import TrendingTokens from "./trending-tokens";
import SwapInterface from "./swap-interface";
import TokenCharts from "./token-charts";
import { Eye } from "lucide-react";
import SparkleButton from "./sparkle-button";

export default function JupiterUI() {
  const [connected, setConnected] = useState(false);

  const handleConnectWallet = () => {
    setConnected(!connected);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto px-4">
      <Navbar onConnect={handleConnectWallet} connected={connected} />
      <div className="flex-1 flex flex-col items-center mt-2">
        <TrendingTokens />

        <div className="w-full flex justify-center mt-5">
          <div className="w-[420px] flex-shrink-0">
            <SwapInterface
              connected={connected}
              onConnect={handleConnectWallet}
            />
          </div>
        </div>

        <div className="w-full max-w-3xl mx-auto mt-6">
          <TokenCharts />
        </div>

        <div className="mt-8 mb-5 w-full max-w-md mx-auto flex justify-center">
          <button className="text-gray-400 hover:text-white text-sm transition-colors flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            View History
          </button>
        </div>

        {!connected && (
          <div className="mb-8 w-full max-w-md mx-auto">
            <SparkleButton
              onClick={handleConnectWallet}
              className="w-full bg-white text-black py-3 rounded-full font-medium transition-colors hover:bg-white/90 button-glow"
            >
              Connect Wallet
            </SparkleButton>
          </div>
        )}
      </div>
    </div>
  );
}
