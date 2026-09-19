import React from 'react';
import { cn } from '../../utils/cn';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center p-8 sm:p-12', className)}>
      {icon && (
        <div className="w-12 h-12 rounded-full bg-surface-subtle flex items-center justify-center text-text-tertiary mb-3 border border-border">
          {icon}
        </div>
      )}
      <h4 className="text-[15px] font-semibold text-text-primary mb-1">{title}</h4>
      {description && <p className="text-[13px] text-text-secondary max-w-sm mb-4 leading-relaxed">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn('animate-pulse bg-surface-subtle/80 rounded-md', className)} />;
};
