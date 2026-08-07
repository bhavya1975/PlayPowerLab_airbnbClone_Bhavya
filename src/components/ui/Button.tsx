import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary: 'bg-[#FF385C] text-white hover:bg-[#E00B41] shadow-sm',
      secondary: 'bg-[#222222] text-white hover:bg-black shadow-sm',
      outline: 'bg-white border border-[#DDDDDD] text-[#222222] hover:border-black hover:bg-white',
      ghost: 'bg-transparent text-[#222222] hover:bg-[#F7F7F7]',
      icon: 'bg-transparent text-[#222222] hover:bg-[#F7F7F7] rounded-full p-2',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-md',
      md: 'text-sm px-4 py-2.5 rounded-lg',
      lg: 'text-base px-6 py-3.5 rounded-xl',
    };

    const combinedClassName = twMerge(
      clsx(
        baseStyles,
        variants[variant],
        variant !== 'icon' && sizes[size],
        fullWidth && 'w-full',
        className
      )
    );

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
