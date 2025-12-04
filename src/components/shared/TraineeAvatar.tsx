"use client";

import { User } from "lucide-react";
import { useState } from "react";
import { getValidImageUrl } from "@/utils/imageHelpers";

interface TraineeAvatarProps {
  photoUrl: unknown;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showFallbackText?: boolean;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32'
};

const iconSizes = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

export function TraineeAvatar({ 
  photoUrl, 
  name, 
  size = 'md',
  className = '',
  showFallbackText = false
}: TraineeAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const validUrl = getValidImageUrl(photoUrl);
  
  const shouldShowImage = validUrl && !imageError;
  
  if (shouldShowImage) {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <img
          src={validUrl}
          alt={name}
          className={`${sizeClasses[size]} rounded-2xl object-cover border-3 border-white shadow-lg`}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }
  
  return (
    <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center border-3 border-white shadow-lg ${className}`}>
      <User className={`${iconSizes[size]} text-blue-600`} />
      {showFallbackText && (
        <p className="text-xs text-gray-500 mt-1">لا توجد صورة</p>
      )}
    </div>
  );
}