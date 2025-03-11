import { ChevronDown } from "lucide-react"

interface TokenSelectorProps {
  token: string
  onChange: (token: string) => void
}

export default function TokenSelector({ token, onChange }: TokenSelectorProps) {
  return (
    <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 rounded-full px-3 py-2 transition-colors border border-white/5">
      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
        {token === "USDC" && "$"}
        {token === "SOL" && "S"}
      </div>
      <span className="text-white">{token}</span>
      <ChevronDown className="h-4 w-4 text-gray-400" />
    </button>
  )
}

