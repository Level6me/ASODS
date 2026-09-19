import React from 'react';
import { cn } from '../../utils/cn';

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        'inline-flex items-center p-1 bg-surface-subtle/80 border border-border rounded-md gap-1 select-none',
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'relative flex items-center justify-center font-medium rounded-sm transition-all duration-fast ease-apple',
              size === 'sm' ? 'px-2.5 py-1 text-[12px] gap-1.5' : 'px-3.5 py-1.5 text-[13px] gap-2',
              isActive
                ? 'bg-surface text-text-primary shadow-xs border border-border/50'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface/40'
            )}
          >
            {option.icon && <span className="shrink-0">{option.icon}</span>}
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.2 text-[10px] font-mono rounded-full',
                  isActive ? 'bg-accent/15 text-accent' : 'bg-surface text-text-tertiary'
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
