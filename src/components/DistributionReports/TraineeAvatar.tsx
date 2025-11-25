"use client";

import React, { useState } from 'react';
import { User } from 'lucide-react';

interface TraineeAvatarProps {
  photoUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TraineeAvatar: React.FC<TraineeAvatarProps> = ({ 
  photoUrl, 
  name, 
  size = 'md' 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const handleImageError = () => {
    console.log('Image failed to load:', photoUrl);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', photoUrl);
    setImageError(false);
    setImageLoading(false);
  };

  // Check if photoUrl is valid
  const isValidUrl = (url?: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {photoUrl && isValidUrl(photoUrl) && !imageError && (
        <img 
          src={photoUrl} 
          alt={name} 
          className={`${sizeClasses[size]} rounded-full object-cover`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
      
      {(imageError || !photoUrl || !isValidUrl(photoUrl) || imageLoading) && (
        <div className={`${sizeClasses[size]} bg-gray-200 rounded-full flex items-center justify-center`}>
          {imageLoading && photoUrl && isValidUrl(photoUrl) && !imageError ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          ) : (
            <User className={`${iconSizes[size]} text-gray-500`} />
          )}
        </div>
      )}
    </div>
  );
};


