import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ initials, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div
      className={cn(
        'rounded-full bg-primary-600 text-white flex items-center justify-center font-medium',
        sizeClasses[size],
        className
      )}
    >
      {initials.slice(0, 2)}
    </div>
  );
}