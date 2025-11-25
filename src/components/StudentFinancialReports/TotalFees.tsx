import React from 'react';

interface TotalFeesProps {
    name: string;
    amount: number;  
}

const TotalFees = ({ amount, name }: TotalFeesProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <h2 className="text-base font-medium text-gray-600 mb-3">{name}</h2>
      <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
        ₪{amount.toLocaleString()}
      </div>
    </div>
  );
};

export default TotalFees;