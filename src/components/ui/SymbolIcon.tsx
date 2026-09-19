import React from 'react';
import { cn } from '../../utils/cn';

export interface SymbolIconProps {
  icon: React.ComponentType<{ className?: string }>;
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  hierarchical?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const SymbolIcon: React.FC<SymbolIconProps> = ({
  icon: Icon,
  variant = 'accent',
  hierarchical = true,
  size = 'md',
  className,
}) => {
  const sizeMap = {
    sm: 'w-6 h-6 p-1 rounded-sm text-[12px]',
    md: 'w-8 h-8 p-1.5 rounded-md text-[14px]',
    lg: 'w-10 h-10 p-2 rounded-lg text-[18px]',
    xl: 'w-12 h-12 p-2.5 rounded-xl text-[22px]',
  };

  const iconSizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const colorVariants = {
    accent: {
      bg: 'bg-accent/15 text-accent border-accent/20',
      text: 'text-accent',
    },
    success: {
      bg: 'bg-semantic-success/15 text-semantic-success border-semantic-success/20',
      text: 'text-semantic-success',
    },
    warning: {
      bg: 'bg-semantic-warning/15 text-semantic-warning border-semantic-warning/20',
      text: 'text-semantic-warning',
    },
    danger: {
      bg: 'bg-semantic-danger/15 text-semantic-danger border-semantic-danger/20',
      text: 'text-semantic-danger',
    },
    info: {
      bg: 'bg-semantic-info/15 text-semantic-info border-semantic-info/20',
      text: 'text-semantic-info',
    },
    neutral: {
      bg: 'bg-surface-subtle text-text-secondary border-border',
      text: 'text-text-secondary',
    },
  };

  if (!hierarchical) {
    return <Icon className={cn(iconSizeMap[size], colorVariants[variant].text, className)} />;
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center shrink-0 border transition-all duration-fast select-none',
        sizeMap[size],
        colorVariants[variant].bg,
        className
      )}
    >
      <Icon className={iconSizeMap[size]} />
    </div>
  );
};
