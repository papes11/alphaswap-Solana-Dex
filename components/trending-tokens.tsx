import { useEffect, useState } from "react";
import { TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

export default function TrendingTokens() {
  const [trendingTokens, setTrendingTokens] = useState<
    { symbol: string; price: string; isIncrease: boolean }[]
  >([]);

  useEffect(() => {
    // Fetch trending coins from CoinGecko
    const fetchTrendingTokens = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        const data = await response.json();
        const coins = data.coins.slice(0, 10).map((coin: any) => ({
          symbol: coin.item.symbol.toUpperCase(),
          price: `$${coin.item.data.price.toFixed(4)}`, // Format price to 4 decimal places
          isIncrease: coin.item.data.price_change_percentage_24h.usd > 0, // Check if price increased
        }));
        setTrendingTokens(coins);
      } catch (error) {
        console.error("Failed to fetch trending tokens:", error);
        // Fallback to a default list if the API fails
        setTrendingTokens([
          { symbol: "TRUMP", price: "$0.00", isIncrease: true },
          { symbol: "MELANIA", price: "$0.00", isIncrease: false },
          { symbol: "Fartcoin", price: "$0.00", isIncrease: true },
          { symbol: "pwease", price: "$0.00", isIncrease: false },
          { symbol: "DOGEAI", price: "$0.00", isIncrease: true },
          { symbol: "GRF↑", price: "$0.00", isIncrease: false },
        ]);
      }
    };

    fetchTrendingTokens();
  }, []);

  return (
    <div className="relative flex items-center justify-center space-x-3 text-sm text-gray-300 mt-1 overflow-hidden w-full h-10">
      {/* Trending Icon & Title */}
      <div className="flex items-center shrink-0 text-sm">
        <TrendingUp className="h-5 w-5 font-bold text-white" />
        <span className="ml-1 font-bold">Trending</span>
      </div>

      {/* Marquee Container with Fade Effect */}
      <div className="relative w-full max-w-4xl overflow-hidden">
        {/* Gradient Fade Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>

        {/* Moving Banner */}
        <div className="flex space-x-2 animate-marquee">
          {trendingTokens.map((token, index) => (
            <button
              key={index}
              className="bg-white/10 text-white rounded-full hover:bg-white/20 px-4 py-1.5 transition-all border border-white/10 shrink-0 flex items-center space-x-2 text-sm"
            >
              <span className="font-medium">{token.symbol}</span>
              <span className="text-white">{token.price}</span>
              {token.isIncrease ? (
                <ArrowUp className="h-4 w-4 text-green-400" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
