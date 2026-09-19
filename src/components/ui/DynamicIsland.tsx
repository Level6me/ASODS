import React, { useState } from 'react';
import { ChevronDown, X, Activity, ShieldCheck, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';
import { haptics } from '../../utils/haptics';

export interface DynamicIslandProps {
  statusText?: string;
  subText?: string;
  icon?: React.ReactNode;
  progress?: number;
  expandedContent?: React.ReactNode;
  className?: string;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  statusText = '内核防御引擎活跃中',
  subText = 'eBPF 零信任流量监听',
  icon,
  progress,
  expandedContent,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    haptics.medium();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={cn('fixed top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all duration-normal select-none', className)}>
      {!isExpanded ? (
        /* Compact Pill Mode */
        <button
          onClick={toggleExpand}
          className={cn(
            'flex items-center gap-2.5 px-3.5 py-1.5 rounded-full',
            'bg-black text-white dark:bg-surface-elevated dark:text-text-primary dark:border dark:border-glass-border',
            'shadow-lg hover:scale-105 active:scale-95 transition-all duration-fast cursor-pointer'
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-semantic-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-semantic-success" />
          </span>
          {icon || <ShieldCheck className="w-3.5 h-3.5 text-semantic-success" />}
          <span className="text-[12px] font-medium tracking-tight truncate max-w-[200px]">{statusText}</span>
          <ChevronDown className="w-3 h-3 text-white/50 dark:text-text-tertiary" />
        </button>
      ) : (
        /* Expanded Live Activity Card */
        <div
          className={cn(
            'w-[92vw] max-w-sm rounded-2xl glass-elevated border border-glass-border p-4 shadow-glass-modal animate-dynamic-island text-text-primary'
          )}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-semantic-success" />
              </span>
              <span className="text-[13px] font-semibold text-text-primary">{statusText}</span>
            </div>
            <button
              onClick={toggleExpand}
              className="p-1 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-subtle transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            <p className="text-[12px] text-text-secondary leading-relaxed">{subText}</p>
            {progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-text-tertiary">
                  <span>实时内存队列吞吐</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                  <div
                    className="h-full bg-semantic-success transition-all duration-normal"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            {expandedContent}
          </div>
        </div>
      )}
    </div>
  );
};
