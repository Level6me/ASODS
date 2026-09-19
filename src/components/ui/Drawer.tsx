import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  width?: 'md' | 'lg' | 'xl';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  width = 'md',
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthMap = {
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dim / Blur Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-normal"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Desktop Side Drawer / Mobile Full Sheet (Glass 3 Elevated) */}
        <div
          className={cn(
            'w-screen relative glass-elevated border-l border-glass-border',
            'p-6 text-text-primary shadow-glass-modal flex flex-col justify-between overflow-y-auto animate-drawer-in',
            widthMap[width],
            className
          )}
        >
          {/* Mobile Drag Handle Indicator */}
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-3 sm:hidden" />

          {/* Header */}
          <div className="flex items-start justify-between pb-4 mb-4 border-b border-border">
            <div>
              {title && <h3 className="font-card-title text-text-primary text-[17px]">{title}</h3>}
              {description && <p className="font-caption text-text-secondary mt-1">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-subtle transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
