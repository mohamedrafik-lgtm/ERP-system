'use client';

interface LockerHeaderProps {
  onAddTransaction: () => void;
  selectedLockerId: string | null;
  lockerName?: string;
}

export const LockerHeader = ({ onAddTransaction, selectedLockerId, lockerName }: LockerHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-gray-900">
          تفاصيل الخزينة {lockerName && `- ${lockerName}`}
        </h2>
        {selectedLockerId && (
          <p className="text-sm text-gray-500">رقم الخزينة: {selectedLockerId}</p>
        )}
      </div>
      <button 
        className={`
          inline-flex items-center gap-2
          px-4 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-200
          ${!selectedLockerId 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'}
        `}
        disabled={!selectedLockerId}
        onClick={onAddTransaction}
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        معاملة جديدة
      </button>
    </div>
  );
};
