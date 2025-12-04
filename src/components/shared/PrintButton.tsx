"use client";

/**
 * Reusable Print Button Component
 * Single Responsibility: Handle print functionality
 */

import { Printer } from "lucide-react";

interface PrintButtonProps {
  label?: string;
  position?: 'fixed' | 'inline';
  className?: string;
}

export function PrintButton({ 
  label = "طباعة",
  position = 'fixed',
  className = ''
}: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };
  
  const baseClasses = "flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold print:hidden";
  const positionClasses = position === 'fixed' ? 'fixed top-4 left-4 z-50 shadow-lg' : '';
  
  return (
    <button
      onClick={handlePrint}
      className={`${baseClasses} ${positionClasses} ${className}`}
    >
      <Printer className="w-5 h-5" />
      {label}
    </button>
  );
}