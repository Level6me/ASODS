import React from 'react';
import { ShieldCheck, AlertOctagon, Network, Cpu, HardDrive, ArrowUpRight } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';

export const MetricsOverview: React.FC = () => {
  const { summary, systemHealth } = useSecurity();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {/* Metric 1: Blocked Today */}
      <Card variant="surface" padding="md" hoverable className="col-span-1">
        <div className="flex items-center justify-between text-text-tertiary mb-2">
          <span className="text-[12px] font-medium uppercase tracking-wider">今日拦截攻击</span>
          <ShieldCheck className="w-4 h-4 text-semantic-success" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[24px] sm:text-[26px] font-bold tracking-tight text-text-primary">
            {summary.blockedToday.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-semantic-success mt-1.5 font-medium">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+{summary.blockedChangePercent}% 较昨日</span>
        </div>
      </Card>

      {/* Metric 2: Active Threats */}
      <Card variant="surface" padding="md" hoverable className="col-span-1">
        <div className="flex items-center justify-between text-text-tertiary mb-2">
          <span className="text-[12px] font-medium uppercase tracking-wider">活跃威胁源</span>
          <AlertOctagon className="w-4 h-4 text-semantic-warning" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[24px] sm:text-[26px] font-bold tracking-tight text-text-primary">
            {summary.activeThreats}
          </span>
          <span className="text-[11px] text-text-tertiary font-mono">IPs</span>
        </div>
        <div className="text-[11px] text-text-secondary mt-1.5 truncate">
          包含 2 个高频扫描器
        </div>
      </Card>

      {/* Metric 3: Protected Ports */}
      <Card variant="surface" padding="md" hoverable className="col-span-1">
        <div className="flex items-center justify-between text-text-tertiary mb-2">
          <span className="text-[12px] font-medium uppercase tracking-wider">受护核心端口</span>
          <Network className="w-4 h-4 text-accent" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[24px] sm:text-[26px] font-bold tracking-tight text-text-primary">
            {summary.protectedPorts}
          </span>
          <span className="text-[11px] text-text-tertiary font-mono">Ports</span>
        </div>
        <div className="text-[11px] text-text-secondary mt-1.5 font-mono truncate">
          22, 80, 443, 3306, 6379...
        </div>
      </Card>

      {/* Metric 4: 24h Total Events */}
      <Card variant="surface" padding="md" hoverable className="col-span-1">
        <div className="flex items-center justify-between text-text-tertiary mb-2">
          <span className="text-[12px] font-medium uppercase tracking-wider">24H 监控事件流</span>
          <Cpu className="w-4 h-4 text-text-secondary" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[24px] sm:text-[26px] font-bold tracking-tight text-text-primary">
            {summary.totalEvents24h.toLocaleString()}
          </span>
        </div>
        <div className="text-[11px] text-text-tertiary mt-1.5 font-mono">
          均速 {summary.qps} req/s
        </div>
      </Card>

      {/* Metric 5: Server Health (Integrated Mini Console) */}
      <Card variant="surface" padding="md" hoverable className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1">
        <div className="flex items-center justify-between text-text-tertiary mb-2">
          <span className="text-[12px] font-medium uppercase tracking-wider">节点负载健康</span>
          <HardDrive className="w-4 h-4 text-text-tertiary" />
        </div>
        <div className="space-y-2 mt-1">
          <div>
            <div className="flex justify-between text-[11px] font-mono mb-0.5">
              <span className="text-text-secondary">CPU</span>
              <span className="text-text-primary">{systemHealth.cpuUsage}%</span>
            </div>
            <ProgressBar value={systemHealth.cpuUsage} size="sm" variant="auto" />
          </div>
          <div>
            <div className="flex justify-between text-[11px] font-mono mb-0.5">
              <span className="text-text-secondary">内存</span>
              <span className="text-text-primary">{systemHealth.memoryUsage}%</span>
            </div>
            <ProgressBar value={systemHealth.memoryUsage} size="sm" variant="auto" />
          </div>
        </div>
      </Card>
    </div>
  );
};
