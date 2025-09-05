import { Wallet } from 'lucide-react'; // أو أي SVG محفظة عندك

interface AccountCardProps {
  name: string;
  description: string;
  balance: number;
  currency: string;
  isSelected?: boolean;
  onEdit?: () => void;
  safeId?: string;
}

export function AccountCard({ name, description, balance, currency, isSelected, onEdit, safeId }: AccountCardProps) {
  return (
    <div
      className={`border ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-blue-200'} 
      rounded-md p-4 flex items-center justify-between ${isSelected ? 'bg-blue-100' : 'bg-blue-50'} 
      max-w-xl cursor-pointer transition-all duration-200 hover:border-blue-400 group`}
    >
      {/* المبلغ */}
      <div className="text-blue-700 text-lg font-bold">
        {balance} {currency}
      </div>

      {/* النص */}
      <div className="flex flex-col text-right flex-1 pr-4">
        <span className="text-sm text-gray-700 font-semibold">{name}</span>
        <span className="text-xs text-gray-400">{description}</span>
      </div>

      {/* الأيقونات */}
      <div className="flex items-center gap-2">
        {/* زر التعديل */}
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-full bg-white hover:bg-gray-100 shadow-sm"
            title="تعديل الخزينة"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        
        {/* أيقونة المحفظة */}
        <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
          <Wallet className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
