import React, { useState } from 'react';
import {
  Globe,
  Radio,
  Clock,
  ShieldBan,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export const IpDetailDrawer: React.FC = () => {
  const {
    activeIpDetail,
    selectedEventForDetail,
    closeIpDetail,
    triggerDangerousAction,
    blockIp,
    unblockIp,
    rules,
    addToast,
  } = useSecurity();

  const [copied, setCopied] = useState(false);

  if (!activeIpDetail) return null;

  const isBlocked = rules.some((r) => r.ipOrCidr.includes(activeIpDetail));

  const handleCopy = () => {
    navigator.clipboard.writeText(activeIpDetail);
    setCopied(true);
    addToast('info', `已复制 IP 地址: ${activeIpDetail}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBlockAction = () => {
    triggerDangerousAction(
      '封禁此 IP 地址',
      `确定对 ${activeIpDetail} 下发底层防火墙拦截规则吗？后续所有流量将被立即丢弃。`,
      activeIpDetail,
      'block',
      () => blockIp(activeIpDetail, '管理员从 IP 详情页手动封禁')
    );
  };

  const handleUnblockAction = () => {
    triggerDangerousAction(
      '解除对该 IP 的封禁',
      `确定移除针对 ${activeIpDetail} 的拦截规则并允许流量通过吗？`,
      activeIpDetail,
      'unblock',
      () => unblockIp(activeIpDetail)
    );
  };

  const handleExportReport = () => {
    addToast('success', `已生成取证数据报告: ${activeIpDetail}.json`, '安全态势与特征签名数据导出成功');
  };

  return (
    <Drawer
      isOpen={Boolean(activeIpDetail)}
      onClose={closeIpDetail}
      title="安全情报与威胁取证"
      description="来源 IP 网络归属、行为指纹与关联策略"
      width="lg"
    >
      <div className="space-y-4">
        {/* IP Header Card */}
        <div className="p-4 rounded-xl bg-surface/80 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">TARGET IP ADDRESS</span>
            <Badge variant={isBlocked ? 'danger' : 'warning'} dot size="sm">
              {isBlocked ? 'Blocked in Firewall' : 'Detected Threat'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-[22px] font-bold tracking-tight text-text-primary">
              {activeIpDetail}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md bg-surface-subtle hover:bg-surface border border-border text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 text-[12px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-semantic-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制' : '复制'}</span>
            </button>
          </div>

          {/* Quick Geo & ASN Info */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-subtle text-[12px]">
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Globe className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="truncate">{selectedEventForDetail?.location || 'Frankfurt, Germany'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Radio className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
              <span className="font-mono truncate">{selectedEventForDetail?.asn || 'AS202425'}</span>
            </div>
          </div>
        </div>

        {/* Threat Summary Details */}
        <Card variant="surface" padding="md" className="space-y-3">
          <h4 className="text-[13px] font-semibold text-text-primary flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-semantic-warning" />
            <span>检测到的攻击行为与特征</span>
          </h4>

          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between py-1.5 border-b border-border-subtle">
              <span className="text-text-secondary">威胁类型</span>
              <span className="font-medium text-text-primary">{selectedEventForDetail?.eventType || 'SSH Brute-Force'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border-subtle">
              <span className="text-text-secondary">风险等级</span>
              <span className="font-mono font-bold text-semantic-danger">
                {selectedEventForDetail?.severity.toUpperCase() || 'CRITICAL'}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border-subtle">
              <span className="text-text-secondary">目标服务 / 端口</span>
              <span className="font-mono text-text-primary">
                Port {selectedEventForDetail?.targetPort || 22} ({selectedEventForDetail?.protocol || 'TCP'})
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-text-secondary">最近探测时间</span>
              <span className="font-mono text-text-secondary">{selectedEventForDetail?.timestamp || '14:08:42'}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-md bg-surface-subtle border border-border text-[12px] text-text-secondary font-mono leading-relaxed">
            <span className="text-text-tertiary block text-[10px] mb-0.5 uppercase">Audit Payload Details</span>
            {selectedEventForDetail?.details || 'Exceeded max failed auth attempts in short window. High risk automated botnet fingerprint.'}
          </div>
        </Card>

        {/* Timeline of Observed Activity */}
        <Card variant="surface" padding="md" className="space-y-2.5">
          <h4 className="text-[13px] font-semibold text-text-primary flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-text-tertiary" />
            <span>观测时间轴</span>
          </h4>

          <div className="space-y-3 pl-2 border-l-2 border-border ml-1 text-[12px]">
            <div className="relative pl-3">
              <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-semantic-danger border-2 border-surface" />
              <div className="font-mono text-text-tertiary text-[11px]">14:08:42</div>
              <div className="font-medium text-text-primary">高频爆破触发内核 eBPF 自动拦截规则</div>
            </div>
            <div className="relative pl-3">
              <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-semantic-warning border-2 border-surface" />
              <div className="font-mono text-text-tertiary text-[11px]">14:08:12</div>
              <div className="font-medium text-text-primary">发起连续 18 次非法身份凭据尝试</div>
            </div>
            <div className="relative pl-3">
              <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-surface" />
              <div className="font-mono text-text-tertiary text-[11px]">14:07:30</div>
              <div className="font-medium text-text-primary">首次建立 TCP SYN 握手探测</div>
            </div>
          </div>
        </Card>

        {/* Action Controls */}
        <div className="pt-2 space-y-2">
          {isBlocked ? (
            <Button
              variant="secondary"
              size="large"
              className="w-full text-semantic-success hover:border-semantic-success/30"
              icon={<ShieldCheck className="w-4 h-4" />}
              onClick={handleUnblockAction}
            >
              解除防火墙封禁 (Unblock)
            </Button>
          ) : (
            <Button
              variant="danger"
              size="large"
              className="w-full"
              icon={<ShieldBan className="w-4 h-4" />}
              onClick={handleBlockAction}
            >
              一键拦截并封禁此来源 (Block IP)
            </Button>
          )}

          <Button
            variant="tertiary"
            size="default"
            className="w-full text-text-secondary"
            icon={<FileText className="w-4 h-4" />}
            onClick={handleExportReport}
          >
            导出此 IP 威胁审计报告 (JSON)
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
