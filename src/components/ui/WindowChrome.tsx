import React from 'react';
import { cn } from '../../utils/cn';
import { haptics } from '../../utils/haptics';

export interface WindowChromeProps {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const WindowChrome: React.FC<WindowChromeProps> = ({
  title,
  subtitle,
  onClose,
  onMinimize,
  onZoom,
  actions,
  children,
  className,
}) => {
  const handleAction = (cb?: () => void) => {
    haptics.light();
    if (cb) cb();
  };

  return (
    <div className={cn('rounded-xl glass-standard border border-glass-border overflow-hidden shadow-glass-md', className)}>
      {/* macOS Window Titlebar */}
      <div className="h-10 px-3.5 flex items-center justify-between border-b border-border-subtle select-none bg-surface/30">
        {/* Left: Traffic Lights */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleAction(onClose)}
            aria-label="关闭窗口"
            className="traffic-light traffic-light-close hover:opacity-80 active:opacity-60 cursor-pointer"
          />
          <button
            type="button"
            onClick={() => handleAction(onMinimize)}
            aria-label="最小化窗口"
            className="traffic-light traffic-light-minimize hover:opacity-80 active:opacity-60 cursor-pointer"
          />
          <button
            type="button"
            onClick={() => handleAction(onZoom)}
            aria-label="最大化窗口"
            className="traffic-light traffic-light-zoom hover:opacity-80 active:opacity-60 cursor-pointer"
          />
        </div>

        {/* Center: Title */}
        {title && (
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-text-primary">
            <span>{title}</span>
            {subtitle && <span className="text-[11px] text-text-tertiary">· {subtitle}</span>}
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">{actions}</div>
      </div>

      {/* Body Content */}
      {children && <div className="p-4 sm:p-5">{children}</div>}
    </div>
  );
};
