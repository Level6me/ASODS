import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const variantStyles = {
    neutral: 'bg-surface-subtle text-text-secondary border-border',
    success: 'bg-semantic-success-subtle text-semantic-success border-semantic-success/20',
    warning: 'bg-semantic-warning-subtle text-semantic-warning border-semantic-warning/20',
    danger: 'bg-semantic-danger-subtle text-semantic-danger border-semantic-danger/20',
    info: 'bg-semantic-info-subtle text-semantic-info border-semantic-info/20',
    accent: 'bg-accent-subtle text-accent border-accent/20',
  };

  const dotColor = {
    neutral: 'bg-text-tertiary',
    success: 'bg-semantic-success',
    warning: 'bg-semantic-warning',
    danger: 'bg-semantic-danger',
    info: 'bg-semantic-info',
    accent: 'bg-accent',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-[12px] px-2.5 py-0.5 gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border rounded-full select-none leading-none',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotColor[variant])} />}
      {children}
    </span>
  );
};
