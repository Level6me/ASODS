import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'surface',
  padding = 'md',
  hoverable = false,
  children,
  ...props
}) => {
  const variantStyles = {
    surface: 'bg-surface border border-border text-text-primary shadow-xs',
    elevated: 'bg-surface-elevated border border-border text-text-primary shadow-glass-sm',
    glass: 'glass-standard text-text-primary',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5',
    lg: 'p-5 sm:p-6',
  };

  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-normal ease-apple',
        variantStyles[variant],
        paddingStyles[padding],
        hoverable && 'hover:border-border-strong hover:shadow-glass-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
