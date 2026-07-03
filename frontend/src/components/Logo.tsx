import React from 'react';
// @ts-ignore
import brandLogo from '../assets/images/brand_logo_1780352271098.png';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'symbol' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', variant = 'full', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-12 sm:h-14',
    lg: 'h-16 sm:h-20',
    xl: 'h-24 sm:h-28',
  };

  return (
    <div
      id={`tf-logo-${variant}`}
      className={`inline-flex items-center justify-center select-none overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      <img
        src={brandLogo}
        alt="Till Failure Strength Logo"
        className="h-full w-auto object-contain max-h-full brightness-110 contrast-105"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
