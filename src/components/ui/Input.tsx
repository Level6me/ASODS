import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefixIcon, suffixIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {prefixIcon && (
          <span className="absolute left-3 text-text-tertiary pointer-events-none flex items-center justify-center">
            {prefixIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-9 bg-surface-subtle/80 text-text-primary placeholder:text-text-tertiary text-[14px]',
            'rounded-md border border-border transition-all duration-fast ease-apple',
            'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 focus:bg-surface',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            prefixIcon ? 'pl-9' : 'pl-3',
            suffixIcon ? 'pr-9' : 'pr-3',
            className
          )}
          {...props}
        />
        {suffixIcon && (
          <span className="absolute right-3 text-text-tertiary flex items-center justify-center">
            {suffixIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
