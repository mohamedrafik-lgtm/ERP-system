/**
 * Reusable Loading Spinner Component
 * Single Responsibility: Display loading state
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 border-2',
  md: 'h-12 w-12 border-3',
  lg: 'h-16 w-16 border-4'
};

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className={`animate-spin rounded-full border-blue-500 border-t-transparent ${sizeClasses[size]}`}></div>
    </div>
  );
}