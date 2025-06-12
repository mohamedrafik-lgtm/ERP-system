import React from 'react';
interface TotalFeesProps {
    name:string,
    amount: number;  
}

const TotalFees = ({ amount, name} :TotalFeesProps) => {
  return (
    <div className="text-center p-5 rounded-lg bg-orange-600 w-96">
      <h2 className="text-lg text-white mb-2 font-medium text-start">{name}</h2>
      <div className="text-2xl font-bold text-white text-start">
        ${amount.toLocaleString()}
      </div>
    </div>
  );
};

export default TotalFees;