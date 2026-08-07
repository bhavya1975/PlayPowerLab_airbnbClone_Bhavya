import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'guest-favorite';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className,
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold';

  const variants = {
    primary: 'bg-[#FF385C] text-white',
    secondary: 'bg-[#F7F7F7] text-[#222222] border border-[#DDDDDD]',
    outline: 'bg-white text-[#222222] border border-[#222222]',
    'guest-favorite': 'bg-white text-[#222222] border border-[#DDDDDD] shadow-sm font-bold text-[11px] px-3 py-1',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], className))}>
      {children}
    </span>
  );
};
