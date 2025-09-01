'use client';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

interface LockerTransactionsProps {
  transactions?: Transaction[];
  isLoading?: boolean;
}

export const LockerTransactions = ({ transactions = [], isLoading }: LockerTransactionsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-sm">لا توجد معاملات حتى الآن</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className={`
              p-2 rounded-full
              ${transaction.type === 'إيداع' ? 'bg-green-100 text-green-600' : ''}
              ${transaction.type === 'سحب' ? 'bg-red-100 text-red-600' : ''}
              ${transaction.type === 'تحويل' ? 'bg-blue-100 text-blue-600' : ''}
            `}>
              {transaction.type === 'إيداع' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m0 0l-6-6m6 6l6-6" />
                </svg>
              )}
              {transaction.type === 'سحب' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20V4m0 0l-6 6m6-6l6 6" />
                </svg>
              )}
              {transaction.type === 'تحويل' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{transaction.type}</p>
              <p className="text-sm text-gray-500">{transaction.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-medium ${
              transaction.type === 'إيداع' ? 'text-green-600' : 
              transaction.type === 'سحب' ? 'text-red-600' : 
              'text-blue-600'
            }`}>
              {transaction.type === 'سحب' ? '-' : '+'}{transaction.amount} ج.م
            </p>
            <p className="text-xs text-gray-500">{transaction.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
