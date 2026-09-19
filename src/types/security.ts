export type SecurityStatus = 'protected' | 'monitoring' | 'warning' | 'critical' | 'offline';

export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

export type EventAction = 'blocked' | 'monitored' | 'alerted' | 'quarantined';

export interface SecurityEvent {
  id: string;
  timestamp: string;
  sourceIp: string;
  location: string;
  countryCode: string;
  asn: string;
  eventType: string;
  targetPort: number;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'SSH';
  severity: ThreatSeverity;
  action: EventAction;
  details: string;
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkThroughput: string;
  activeConnections: number;
  uptime: string;
}

export interface SecuritySummary {
  status: SecurityStatus;
  blockedToday: number;
  blockedChangePercent: number;
  activeThreats: number;
  protectedPorts: number;
  totalEvents24h: number;
  qps: number;
}

export interface FirewallRule {
  id: string;
  name: string;
  ipOrCidr: string;
  direction: 'INBOUND' | 'OUTBOUND';
  action: 'DROP' | 'ACCEPT' | 'REJECT';
  portRange: string;
  enabled: boolean;
  createdAt: string;
  hits: number;
}

export interface DefenseSettings {
  autoBlockScanners: boolean;
  bruteForceThreshold: number;
  portScanSensitivity: 'low' | 'medium' | 'high';
  threatIntelligenceSync: boolean;
  telegramAlerts: boolean;
  auditLogging: boolean;
  ddosShield: boolean;
}
