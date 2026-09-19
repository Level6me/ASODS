import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  ExternalLink,
  ShieldBan,
  Filter,
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { SecurityEvent } from '../../types/security';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SegmentedControl } from '../ui/SegmentedControl';

interface SecurityEventTableProps {
  externalFilter?: string;
}

export const SecurityEventTable: React.FC<SecurityEventTableProps> = ({ externalFilter = '' }) => {
  const { events, openIpDetail, triggerDangerousAction, blockIp, addToast } = useSecurity();
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleCopyIp = (e: React.MouseEvent, ip: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    addToast('info', `已复制 IP 地址: ${ip}`);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const handleQuickBlock = (e: React.MouseEvent, event: SecurityEvent) => {
    e.stopPropagation();
    triggerDangerousAction(
      '封禁威胁源 IP',
      `您确定要将来源 ${event.sourceIp} 加入防火墙 DROP 黑名单吗？`,
      event.sourceIp,
      'block',
      () => blockIp(event.sourceIp, `由于检测到 ${event.eventType} 行为被封禁`)
    );
  };

  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      // Status filter
      if (statusFilter === 'blocked' && item.action !== 'blocked') return false;
      if (statusFilter === 'quarantined' && item.action !== 'quarantined') return false;
      if (statusFilter === 'monitored' && item.action !== 'monitored') return false;

      // External search query
      if (externalFilter) {
        const q = externalFilter.toLowerCase();
        const matchIp = item.sourceIp.toLowerCase().includes(q);
        const matchLocation = item.location.toLowerCase().includes(q);
        const matchAsn = item.asn.toLowerCase().includes(q);
        const matchType = item.eventType.toLowerCase().includes(q);
        const matchPort = item.targetPort.toString().includes(q);
        if (!matchIp && !matchLocation && !matchAsn && !matchType && !matchPort) {
          return false;
        }
      }
      return true;
    });
  }, [events, statusFilter, externalFilter]);

  const getActionBadge = (action: SecurityEvent['action']) => {
    switch (action) {
      case 'blocked':
        return <Badge variant="danger" dot size="sm">Blocked</Badge>;
      case 'quarantined':
        return <Badge variant="warning" dot size="sm">Quarantined</Badge>;
      case 'monitored':
        return <Badge variant="info" dot size="sm">Monitored</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Detected</Badge>;
    }
  };

  const getSeverityBadge = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return <span className="text-semantic-danger font-semibold font-mono text-[11px]">CRIT</span>;
      case 'high':
        return <span className="text-semantic-warning font-semibold font-mono text-[11px]">HIGH</span>;
      case 'medium':
        return <span className="text-accent font-medium font-mono text-[11px]">MED</span>;
      case 'low':
        return <span className="text-text-tertiary font-normal font-mono text-[11px]">LOW</span>;
    }
  };

  return (
    <Card variant="surface" padding="none" className="overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface/50">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-card-title text-text-primary text-[15px]">实时安全事件审计日志</h3>
            <span className="font-mono text-[12px] px-2 py-0.5 rounded-full bg-surface-subtle text-text-secondary border border-border">
              {filteredEvents.length} 条记录
            </span>
          </div>
          <p className="font-caption text-text-secondary mt-0.5">
            实时捕获的网络入侵探针、异常握手与策略响应
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <SegmentedControl
            size="sm"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: '全部事件' },
              { value: 'blocked', label: '已拦截' },
              { value: 'quarantined', label: '已隔离' },
              { value: 'monitored', label: '监控中' },
            ]}
          />
        </div>
      </div>

      {/* Desktop Table (High Information Density) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left table-dense">
          <thead>
            <tr className="bg-surface-subtle/50">
              <th className="w-20">时间</th>
              <th className="w-20">风险等级</th>
              <th>源 IP / 归属 ASN</th>
              <th>威胁类型与特征</th>
              <th className="w-28">目标端口 / 协议</th>
              <th className="w-28">当前处置状态</th>
              <th className="w-28 text-right pr-4">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-text-tertiary">
                  未检索到符合条件的威胁事件
                </td>
              </tr>
            ) : (
              filteredEvents.map((evt) => (
                <tr
                  key={evt.id}
                  onClick={() => openIpDetail(evt.sourceIp)}
                  className="cursor-pointer group hover:bg-accent-subtle/40 transition-colors"
                >
                  {/* Timestamp */}
                  <td className="font-mono text-text-secondary text-[12px] whitespace-nowrap">
                    {evt.timestamp}
                  </td>

                  {/* Severity */}
                  <td>{getSeverityBadge(evt.severity)}</td>

                  {/* Source IP + ASN + Location */}
                  <td>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-semibold text-text-primary text-[13px] group-hover:text-accent transition-colors">
                          {evt.sourceIp}
                        </span>
                        <button
                          onClick={(e) => handleCopyIp(e, evt.sourceIp)}
                          title="复制 IP"
                          className="p-0.5 rounded text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
                        >
                          {copiedIp === evt.sourceIp ? (
                            <Check className="w-3 h-3 text-semantic-success" />
                          ) : (
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>
                      </div>
                      <span className="text-[11px] text-text-secondary truncate max-w-xs">
                        {evt.location} · {evt.asn}
                      </span>
                    </div>
                  </td>

                  {/* Event Type & Details */}
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary text-[13px]">{evt.eventType}</span>
                      <span className="text-[11px] text-text-tertiary truncate max-w-sm">
                        {evt.details}
                      </span>
                    </div>
                  </td>

                  {/* Target Port & Protocol */}
                  <td>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-subtle border border-border text-[11px] font-mono">
                      <span className="font-semibold text-text-primary">Port {evt.targetPort}</span>
                      <span className="text-text-tertiary">/</span>
                      <span className="text-accent">{evt.protocol}</span>
                    </div>
                  </td>

                  {/* Action Status */}
                  <td>{getActionBadge(evt.action)}</td>

                  {/* Row Actions */}
                  <td className="text-right pr-4">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openIpDetail(evt.sourceIp)}
                        className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface border border-transparent hover:border-border transition-all"
                        title="查看安全详情 Sheet"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      {evt.action !== 'blocked' && (
                        <button
                          onClick={(e) => handleQuickBlock(e, evt)}
                          className="p-1.5 rounded-md text-semantic-danger hover:bg-semantic-danger-subtle border border-transparent hover:border-semantic-danger/20 transition-all"
                          title="加入防火墙黑名单"
                        >
                          <ShieldBan className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (According to Rule 30 & 109) */}
      <div className="md:hidden divide-y divide-border">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-10 text-text-tertiary text-[13px]">
            未检索到威胁事件
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => openIpDetail(evt.sourceIp)}
              className="p-3.5 space-y-2 active:bg-surface-subtle transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getActionBadge(evt.action)}
                  <span className="font-mono text-[11px] text-text-tertiary">{evt.timestamp}</span>
                </div>
                {getSeverityBadge(evt.severity)}
              </div>

              <div className="flex items-baseline justify-between">
                <span className="font-mono font-bold text-text-primary text-[14px]">{evt.sourceIp}</span>
                <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-subtle text-text-secondary">
                  Port {evt.targetPort} ({evt.protocol})
                </span>
              </div>

              <div className="text-[12px] text-text-secondary flex justify-between items-center">
                <span>{evt.eventType}</span>
                <span className="text-[11px] text-text-tertiary">{evt.location}</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border-subtle">
                <span className="text-[11px] text-text-tertiary truncate max-w-[200px]">{evt.details}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-accent">详情 →</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
