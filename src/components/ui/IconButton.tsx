import React from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'compact' | 'default' | 'large';
  variant?: 'glass' | 'subtle' | 'ghost';
  active?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'default', variant = 'ghost', active = false, children, ...props }, ref) => {
    const sizeMap = {
      compact: 'w-7 h-7 rounded-sm text-[14px]',
      default: 'w-8 h-8 rounded-md text-[16px]',
      large: 'w-10 h-10 rounded-md text-[18px]',
    };

    const variantMap = {
      glass: 'glass-subtle hover:bg-surface-elevated active:bg-surface-subtle border border-border text-text-primary',
      subtle: 'bg-surface-subtle hover:bg-surface-elevated text-text-primary border border-border-subtle',
      ghost: 'bg-transparent hover:bg-surface-subtle text-text-secondary hover:text-text-primary',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-fast ease-apple select-none active:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none',
          sizeMap[size],
          variantMap[variant],
          active && 'bg-accent/15 text-accent border-accent/30',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
