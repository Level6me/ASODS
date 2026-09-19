import React, { useState, useEffect } from 'react';
import { Shield, Sun, Moon, Sparkles, Activity, Search as SearchIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSecurity } from '../../context/SecurityContext';
import { Badge } from '../ui/Badge';
import { IconButton } from '../ui/IconButton';
import { Search } from '../ui/Search';

interface SecurityHeaderProps {
  onOpenSearchModal?: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const SecurityHeader: React.FC<SecurityHeaderProps> = ({
  searchQuery,
  onSearchChange,
  currentTab,
  onTabChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { summary } = useSecurity();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('zh-CN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const statusMap = {
    protected: { label: 'Protected', variant: 'success' as const },
    monitoring: { label: 'Monitoring', variant: 'info' as const },
    warning: { label: 'Warning', variant: 'warning' as const },
    critical: { label: 'Critical', variant: 'danger' as const },
    offline: { label: 'Offline', variant: 'neutral' as const },
  };

  const curStatus = statusMap[summary.status];

  return (
    <header className="sticky top-0 z-40 w-full glass-standard border-b border-glass-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between gap-4">
        {/* Left: Brand Identity & Live Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-white shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[15px] tracking-tight text-text-primary">ASODS</span>
                <span className="hidden sm:inline-block text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface-subtle text-text-tertiary border border-border">v2.4.0</span>
              </div>
              <p className="hidden md:block text-[10px] text-text-tertiary tracking-wide uppercase">Apple Security Operations</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center pl-2 border-l border-border">
            <Badge variant={curStatus.variant} dot size="sm">
              {curStatus.label}
            </Badge>
          </div>
        </div>

        {/* Center: Search Tool with ⌘K */}
        <div className="flex-1 max-w-md hidden md:block">
          <Search
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange('')}
            placeholder="快速检索 IP、端口 22/443、ASN、威胁特征..."
          />
        </div>

        {/* Right: Telemetry Time, Showcase Toggle, Theme Switch */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Engine Heartbeat & Time */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-subtle/70 border border-border text-[12px] font-mono text-text-secondary">
            <Activity className="w-3.5 h-3.5 text-semantic-success animate-pulse" />
            <span>{timeStr || '14:09:55'}</span>
            <span className="text-text-tertiary">|</span>
            <span className="text-[11px] text-text-tertiary">QPS {summary.qps}</span>
          </div>

          {/* Quick Design System Showcase Button */}
          <button
            onClick={() => onTabChange(currentTab === 'design-system' ? 'overview' : 'design-system')}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-all duration-fast ${
              currentTab === 'design-system'
                ? 'bg-accent/15 text-accent border border-accent/30'
                : 'glass-subtle text-text-secondary hover:text-text-primary border border-border'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>设计系统规范</span>
          </button>

          {/* Theme Switcher */}
          <IconButton
            variant="glass"
            size="default"
            onClick={toggleTheme}
            aria-label="切换浅色/深色主题"
            title={theme === 'dark' ? '切换至浅色模式' : '切换至深色模式'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-semantic-warning" /> : <Moon className="w-4 h-4 text-text-primary" />}
          </IconButton>
        </div>
      </div>
    </header>
  );
};
