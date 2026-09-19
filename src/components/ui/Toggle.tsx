import React from 'react';
import { cn } from '../../utils/cn';
import { haptics } from '../../utils/haptics';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
  id,
  'aria-label': ariaLabel,
}) => {
  const handleClick = () => {
    if (!disabled) {
      haptics.light();
      onChange(!checked);
    }
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-fast ease-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-40',
        checked ? 'bg-accent' : 'bg-surface-subtle border-border',
        className
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0',
          'transition-transform duration-fast ease-apple',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
};
