import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';
import { haptics } from '../../utils/haptics';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'compact' | 'default' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'default', loading = false, disabled, icon, children, onClick, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium select-none transition-all duration-fast ease-apple focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] rounded-md';

    const sizeStyles = {
      compact: 'h-8 px-3 text-[13px] gap-1.5',
      default: 'h-9 px-4 text-[14px] gap-2',
      large: 'h-11 px-5 text-[15px] gap-2.5',
    };

    const variantStyles = {
      primary: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-active shadow-sm',
      secondary: 'glass-subtle text-text-primary hover:bg-surface-elevated hover:border-border-strong border border-border',
      tertiary: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-subtle border border-transparent',
      danger: 'bg-semantic-danger text-white hover:opacity-90 active:opacity-80 shadow-sm',
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === 'danger') {
        haptics.warning();
      } else if (variant === 'primary') {
        haptics.medium();
      } else {
        haptics.light();
      }
      if (onClick) onClick(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
