import { Wallet } from 'lucide-react'; // أو أي SVG محفظة عندك

interface AccountCardProps {
  name: string;
  description: string;
  balance: number;
  currency: string;
}

export function AccountCard({ name, description, balance, currency }: AccountCardProps) {
  return (
    <div className="border border-blue-200 rounded-md p-4 flex items-center justify-between bg-blue-50 max-w-xl">
      {/* المبلغ */}
      <div className="text-blue-700 text-lg font-bold">
        {balance} {currency}
      </div>

      {/* النص */}
      <div className="flex flex-col text-right flex-1 pr-4">
        <span className="text-sm text-gray-700 font-semibold">{name}</span>
        <span className="text-xs text-gray-400">{description}</span>
      </div>

      {/* الأيقونة */}
      <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
        <Wallet className="w-5 h-5" />
      </div>
    </div>
  );
}
