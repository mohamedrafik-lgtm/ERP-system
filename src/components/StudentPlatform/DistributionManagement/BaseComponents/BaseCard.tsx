// Base Card Component following LSP
import React from 'react';

export interface BaseCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const BaseCard: React.FC<BaseCardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hover = true 
}) => {
  const baseClasses = "bg-white rounded-xl shadow-sm border border-gray-200 p-6";
  const hoverClasses = hover ? "hover:shadow-md transition-shadow duration-200" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

