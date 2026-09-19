import React, { useRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  shortcut?: string;
  variant?: 'glass' | 'subtle';
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, value, onChange, onClear, shortcut = '⌘K', variant = 'glass', placeholder = '搜索 IP、端口、ASN 或事件...', ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClear = () => {
      if (onClear) onClear();
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    };

    return (
      <div className="relative flex items-center w-full group">
        <SearchIcon className="absolute left-3 w-4 h-4 text-text-tertiary group-focus-within:text-accent transition-colors" />
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full h-9 pl-9 pr-16 text-[13px] text-text-primary placeholder:text-text-tertiary',
            'rounded-md border transition-all duration-fast ease-apple focus:outline-none',
            variant === 'glass' 
              ? 'glass-subtle focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/15'
              : 'bg-surface-subtle border-border focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/15',
            className
          )}
          {...props}
        />
        <div className="absolute right-2.5 flex items-center gap-1.5 pointer-events-none">
          {value ? (
            <button
              type="button"
              onClick={handleClear}
              className="pointer-events-auto p-0.5 text-text-tertiary hover:text-text-primary rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : shortcut ? (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-text-tertiary bg-surface border border-border rounded shadow-2xs">
              {shortcut}
            </kbd>
          ) : null}
        </div>
      </div>
    );
  }
);

Search.displayName = 'Search';
