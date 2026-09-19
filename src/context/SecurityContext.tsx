import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SecurityEvent,
  SecuritySummary,
  SystemHealthMetrics,
  FirewallRule,
  DefenseSettings,
} from '../types/security';

interface ToastItem {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  message: string;
  subMessage?: string;
}

interface SecurityContextType {
  summary: SecuritySummary;
  systemHealth: SystemHealthMetrics;
  events: SecurityEvent[];
  rules: FirewallRule[];
  settings: DefenseSettings;
  activeIpDetail: string | null;
  selectedEventForDetail: SecurityEvent | null;
  confirmAction: {
    isOpen: boolean;
    title: string;
    description: string;
    target: string;
    actionType: 'block' | 'unblock' | 'deleteRule' | 'clearLogs';
    onConfirm: () => void;
  } | null;
  toasts: ToastItem[];
  addToast: (type: ToastItem['type'], message: string, subMessage?: string) => void;
  removeToast: (id: string) => void;
  openIpDetail: (ip: string) => void;
  closeIpDetail: () => void;
  triggerDangerousAction: (
    title: string,
    description: string,
    target: string,
    actionType: 'block' | 'unblock' | 'deleteRule' | 'clearLogs',
    onConfirm: () => void
  ) => void;
  closeConfirmModal: () => void;
  blockIp: (ip: string, reason?: string) => void;
  unblockIp: (ip: string) => void;
  toggleRule: (ruleId: string) => void;
  deleteRule: (ruleId: string) => void;
  updateSettings: (newSettings: Partial<DefenseSettings>) => void;
}

const initialEvents: SecurityEvent[] = [
  {
    id: 'evt-1094',
    timestamp: '14:08:42',
    sourceIp: '185.220.101.42',
    location: 'Frankfurt, Germany',
    countryCode: 'DE',
    asn: 'AS202425 (Tor Exit)',
    eventType: 'SSH Brute-Force',
    targetPort: 22,
    protocol: 'SSH',
    severity: 'critical',
    action: 'blocked',
    details: 'Exceeded max failed auth attempts (18 attempts in 30s)',
  },
  {
    id: 'evt-1093',
    timestamp: '14:07:15',
    sourceIp: '45.154.255.89',
    location: 'Amsterdam, Netherlands',
    countryCode: 'NL',
    asn: 'AS51852 (Private Layer)',
    eventType: 'Port Sweep Scan',
    targetPort: 8080,
    protocol: 'TCP',
    severity: 'high',
    action: 'blocked',
    details: 'SYN packet scan across 64 sequential ports',
  },
  {
    id: 'evt-1092',
    timestamp: '14:05:59',
    sourceIp: '194.26.29.112',
    location: 'London, United Kingdom',
    countryCode: 'GB',
    asn: 'AS208044',
    eventType: 'SQLi Probe',
    targetPort: 443,
    protocol: 'HTTP',
    severity: 'medium',
    action: 'quarantined',
    details: 'Detected UNION SELECT in query parameters',
  },
  {
    id: 'evt-1091',
    timestamp: '14:03:22',
    sourceIp: '103.149.28.14',
    location: 'Tokyo, Japan',
    countryCode: 'JP',
    asn: 'AS138407',
    eventType: 'RDP Scan Probe',
    targetPort: 3389,
    protocol: 'TCP',
    severity: 'low',
    action: 'monitored',
    details: 'Standard TLS handshake probe on closed port',
  },
  {
    id: 'evt-1090',
    timestamp: '13:58:10',
    sourceIp: '198.54.133.55',
    location: 'New York, United States',
    countryCode: 'US',
    asn: 'AS22612 (Namecheap)',
    eventType: 'Dir Traversal Attempt',
    targetPort: 443,
    protocol: 'HTTP',
    severity: 'high',
    action: 'blocked',
    details: 'Pattern ../../etc/passwd in request path',
  },
  {
    id: 'evt-1089',
    timestamp: '13:54:02',
    sourceIp: '218.92.0.188',
    location: 'Lianyungang, China',
    countryCode: 'CN',
    asn: 'AS4134 (Chinanet)',
    eventType: 'Redis Unauthorized Probe',
    targetPort: 6379,
    protocol: 'TCP',
    severity: 'medium',
    action: 'blocked',
    details: 'Raw socket connection attempt to Redis default port',
  },
];

const initialRules: FirewallRule[] = [
  {
    id: 'rule-01',
    name: 'Auto-Defense SSH Jail',
    ipOrCidr: '185.220.101.0/24',
    direction: 'INBOUND',
    action: 'DROP',
    portRange: '22',
    enabled: true,
    createdAt: '2026-09-18 10:20',
    hits: 428,
  },
  {
    id: 'rule-02',
    name: 'Block Known Tor Scanners',
    ipOrCidr: '45.154.255.89/32',
    direction: 'INBOUND',
    action: 'DROP',
    portRange: 'ALL',
    enabled: true,
    createdAt: '2026-09-19 09:12',
    hits: 159,
  },
  {
    id: 'rule-03',
    name: 'Allow Admin Bastion',
    ipOrCidr: '10.0.0.0/8',
    direction: 'INBOUND',
    action: 'ACCEPT',
    portRange: 'ALL',
    enabled: true,
    createdAt: '2026-09-01 00:00',
    hits: 14820,
  },
];

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [summary, setSummary] = useState<SecuritySummary>({
    status: 'protected',
    blockedToday: 1284,
    blockedChangePercent: 12.4,
    activeThreats: 8,
    protectedPorts: 18,
    totalEvents24h: 8421,
    qps: 342,
  });

  const [systemHealth, setSystemHealth] = useState<SystemHealthMetrics>({
    cpuUsage: 28,
    memoryUsage: 44,
    diskUsage: 62,
    networkThroughput: '1.4 MB/s',
    activeConnections: 318,
    uptime: '14d 8h 22m',
  });

  const [events, setEvents] = useState<SecurityEvent[]>(initialEvents);
  const [rules, setRules] = useState<FirewallRule[]>(initialRules);
  const [activeIpDetail, setActiveIpDetail] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<SecurityContextType['confirmAction']>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [settings, setSettings] = useState<DefenseSettings>({
    autoBlockScanners: true,
    bruteForceThreshold: 10,
    portScanSensitivity: 'high',
    threatIntelligenceSync: true,
    telegramAlerts: true,
    auditLogging: true,
    ddosShield: true,
  });

  // Toast Dispatcher
  const addToast = (type: ToastItem['type'], message: string, subMessage?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, message, subMessage }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openIpDetail = (ip: string) => {
    setActiveIpDetail(ip);
  };

  const closeIpDetail = () => {
    setActiveIpDetail(null);
  };

  const triggerDangerousAction = (
    title: string,
    description: string,
    target: string,
    actionType: 'block' | 'unblock' | 'deleteRule' | 'clearLogs',
    onConfirm: () => void
  ) => {
    setConfirmAction({
      isOpen: true,
      title,
      description,
      target,
      actionType,
      onConfirm,
    });
  };

  const closeConfirmModal = () => {
    setConfirmAction(null);
  };

  const blockIp = (ip: string, reason?: string) => {
    // Add rule
    const newRule: FirewallRule = {
      id: `rule-${Date.now().toString().slice(-4)}`,
      name: `Manual Ban: ${ip}`,
      ipOrCidr: `${ip}/32`,
      direction: 'INBOUND',
      action: 'DROP',
      portRange: 'ALL',
      enabled: true,
      createdAt: 'Just now',
      hits: 1,
    };
    setRules((prev) => [newRule, ...prev]);
    setSummary((prev) => ({ ...prev, blockedToday: prev.blockedToday + 1 }));
    addToast('success', `已成功拦截源 IP: ${ip}`, reason || '该来源后续所有连接请求已被即时 DROP');
  };

  const unblockIp = (ip: string) => {
    setRules((prev) => prev.filter((r) => !r.ipOrCidr.includes(ip)));
    addToast('info', `已解除对 IP 的拦截: ${ip}`, '防火墙已移除对应的 DROP 规则');
  };

  const toggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
    const rule = rules.find((r) => r.id === ruleId);
    if (rule) {
      addToast('info', `规则状态已变更`, `${rule.name} 已${rule.enabled ? '停用' : '启用'}`);
    }
  };

  const deleteRule = (ruleId: string) => {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
    addToast('warning', `防火墙规则已删除`, `规则 ID: ${ruleId}`);
  };

  const updateSettings = (newSettings: Partial<DefenseSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('success', '安全配置已更新并生效');
  };

  // Subtle real-time stream simulation without visual noise
  useEffect(() => {
    const interval = setInterval(() => {
      // Small metric fluctuations
      setSummary((prev) => ({
        ...prev,
        qps: Math.floor(320 + Math.random() * 60),
      }));
      setSystemHealth((prev) => ({
        ...prev,
        cpuUsage: Math.floor(24 + Math.random() * 8),
        networkThroughput: `${(1.2 + Math.random() * 0.5).toFixed(1)} MB/s`,
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const selectedEventForDetail = events.find((e) => e.sourceIp === activeIpDetail) || null;

  return (
    <SecurityContext.Provider
      value={{
        summary,
        systemHealth,
        events,
        rules,
        settings,
        activeIpDetail,
        selectedEventForDetail,
        confirmAction,
        toasts,
        addToast,
        removeToast,
        openIpDetail,
        closeIpDetail,
        triggerDangerousAction,
        closeConfirmModal,
        blockIp,
        unblockIp,
        toggleRule,
        deleteRule,
        updateSettings,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
