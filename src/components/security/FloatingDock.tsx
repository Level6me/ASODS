import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  Flame,
  Sliders,
  Palette,
} from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FloatingDockProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  threatCount?: number;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeTab,
  onChangeTab,
  threatCount = 0,
}) => {
  const dockItems = [
    {
      id: 'overview',
      label: '安全总览',
      icon: LayoutDashboard,
    },
    {
      id: 'threats',
      label: '威胁事件',
      icon: ShieldAlert,
      badge: threatCount > 0 ? threatCount : undefined,
    },
    {
      id: 'firewall',
      label: '防火墙',
      icon: Flame,
    },
    {
      id: 'settings',
      label: '防御配置',
      icon: Sliders,
    },
    {
      id: 'design-system',
      label: '设计体系',
      icon: Palette,
    },
  ];

  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <div className="glass-dock px-2 py-1.5 flex items-center gap-1 sm:gap-1.5 transition-all">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={cn(
                'relative flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-fast select-none active:scale-[0.96]',
                isActive
                  ? 'bg-surface/90 text-text-primary shadow-xs border border-border'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface/40'
              )}
            >
              <Icon className={cn('w-4 h-4 shrink-0 transition-colors', isActive ? 'text-accent' : 'text-current')} />
              <span className="hidden sm:inline-block">{item.label}</span>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-semantic-danger/15 text-semantic-danger border border-semantic-danger/30 rounded-full leading-tight">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
