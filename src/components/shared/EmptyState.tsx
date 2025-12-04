/**
 * Reusable Empty State Component
 * Single Responsibility: Display empty data states
 */

import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon: Icon,
  title,
  message,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center ${className}`}>
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg font-bold"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}