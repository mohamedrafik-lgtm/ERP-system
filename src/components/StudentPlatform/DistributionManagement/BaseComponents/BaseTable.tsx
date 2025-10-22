// Base Table Component following LSP
import React from 'react';

export interface BaseTableProps {
  children: React.ReactNode;
  className?: string;
  striped?: boolean;
  hover?: boolean;
}

export const BaseTable: React.FC<BaseTableProps> = ({ 
  children, 
  className = '', 
  striped = true,
  hover = true 
}) => {
  const baseClasses = "w-full";
  const stripedClasses = striped ? "divide-y divide-gray-200" : "";
  const hoverClasses = hover ? "hover:bg-gray-50" : "";
  
  return (
    <div className="overflow-x-auto">
      <table className={`${baseClasses} ${className}`}>
        <tbody className={`${stripedClasses} ${hoverClasses}`}>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export interface BaseTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const BaseTableHeader: React.FC<BaseTableHeaderProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <thead className={`bg-gray-50 border-b border-gray-200 ${className}`}>
      <tr>
        {children}
      </tr>
    </thead>
  );
};

export interface BaseTableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const BaseTableRow: React.FC<BaseTableRowProps> = ({ 
  children, 
  className = '',
  onClick 
}) => {
  const clickableClasses = onClick ? "cursor-pointer" : "";
  
  return (
    <tr 
      className={`${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

