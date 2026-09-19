import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ToastProps {
  id: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
  message: string;
  subMessage?: string;
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  message,
  subMessage,
  onClose,
  duration = 3500,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-semantic-success" />,
    warning: <AlertTriangle className="w-4 h-4 text-semantic-warning" />,
    danger: <AlertCircle className="w-4 h-4 text-semantic-danger" />,
    info: <Info className="w-4 h-4 text-semantic-info" />,
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-xl border border-glass-border',
        'glass-elevated shadow-glass-md text-text-primary animate-toast-in pointer-events-auto',
        'min-w-[280px] max-w-md select-none'
      )}
    >
      <span className="shrink-0">{iconMap[type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium leading-snug">{message}</p>
        {subMessage && <p className="text-[11px] text-text-secondary leading-tight mt-0.5">{subMessage}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="p-1 text-text-tertiary hover:text-text-primary rounded transition-colors shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
