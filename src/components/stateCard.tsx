'use client'
import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
  color?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, color = 'text-gray-800' }) => {
  return (
    
    <div className="bg-white/70 rounded-xl shadow p-6 text-center">
      <p className="">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
};

export default StatCard;
