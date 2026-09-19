import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps {
  value: number; // 0 ~ 100
  max?: number;
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'auto';
  size?: 'sm' | 'md';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'auto',
  size = 'md',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  let colorClass = 'bg-accent';
  if (variant === 'auto') {
    if (percentage > 85) colorClass = 'bg-semantic-danger';
    else if (percentage > 70) colorClass = 'bg-semantic-warning';
    else colorClass = 'bg-accent';
  } else {
    const colorMap = {
      accent: 'bg-accent',
      success: 'bg-semantic-success',
      warning: 'bg-semantic-warning',
      danger: 'bg-semantic-danger',
    };
    colorClass = colorMap[variant];
  }

  const heightClass = size === 'sm' ? 'h-1' : 'h-1.5';

  return (
    <div className={cn('w-full bg-surface-subtle rounded-full overflow-hidden', heightClass, className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-normal ease-apple', colorClass)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
