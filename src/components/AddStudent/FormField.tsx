"use client";

import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  children: ReactNode;
}

const FormField = ({ 
  label, 
  error, 
  className = "", 
  required, 
  children 
}: FormFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;