import React from 'react';
import {
  ShieldAlert,
  Sliders,
  Bell,
  HardDrive,
  Cpu,
  Database,
  RefreshCw,
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { SegmentedControl } from '../ui/SegmentedControl';
import { Button } from '../ui/Button';

export const DefenseConfigView: React.FC = () => {
  const { settings, updateSettings, addToast } = useSecurity();

  const handleTestAlert = () => {
    addToast('info', '已向配置的通知通道发送测试探测消息', 'Telegram Bot 与 Syslog 正常接收响应');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-3 border-b border-border">
        <h2 className="font-page-title text-text-primary text-[20px] sm:text-[22px]">主动防御与安全引擎策略配置</h2>
        <p className="font-caption text-text-secondary mt-0.5">
          配置主机入侵检测、动态拦截灵敏度与告警同步策略
        </p>
      </div>

      {/* Group 1: Automated Defense Policies */}
      <div className="space-y-2">
        <h3 className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider px-1">
          自动化拦截与清洗策略
        </h3>
        <Card variant="surface" padding="none" className="divide-y divide-border overflow-hidden">
          {/* Item 1 */}
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-medium text-text-primary text-[14px]">高频扫描源自动封禁 (Auto-Jail)</div>
              <div className="text-[12px] text-text-secondary">
                当同一 IP 在 30 秒内触发超过设定次数的未开放端口探测时，由 eBPF 直接下发丢弃规则。
              </div>
            </div>
            <Toggle
              checked={settings.autoBlockScanners}
              onChange={(checked) => updateSettings({ autoBlockScanners: checked })}
            />
          </div>

          {/* Item 2: Scan Sensitivity */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-medium text-text-primary text-[14px]">端口扫描探针检测灵敏度</div>
              <div className="text-[12px] text-text-secondary">
                调整 TCP SYN / FIN / NULL 异常报文指纹特征的判定阈值。
              </div>
            </div>
            <SegmentedControl
              size="sm"
              value={settings.portScanSensitivity}
              onChange={(val) => updateSettings({ portScanSensitivity: val as any })}
              options={[
                { value: 'low', label: '低 (宽松)' },
                { value: 'medium', label: '标准' },
                { value: 'high', label: '高灵敏' },
              ]}
            />
          </div>

          {/* Item 3: DDoS Shield */}
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-medium text-text-primary text-[14px]">DDoS SYN-Flood 硬件过滤防护</div>
              <div className="text-[12px] text-text-secondary">
                启用 SYN Cookies 与动态连接速率限制，防止握手队列耗尽导致拒绝服务。
              </div>
            </div>
            <Toggle
              checked={settings.ddosShield}
              onChange={(checked) => updateSettings({ ddosShield: checked })}
            />
          </div>
        </Card>
      </div>

      {/* Group 2: Threat Intelligence & Feeds */}
      <div className="space-y-2">
        <h3 className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider px-1">
          威胁情报与云端协同
        </h3>
        <Card variant="surface" padding="none" className="divide-y divide-border overflow-hidden">
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-medium text-text-primary text-[14px]">全球恶意 IP 情报库实时同步</div>
              <div className="text-[12px] text-text-secondary">
                自动拉取 Tor 出口节点、已知僵尸网络 C2、开放代理与数据中心扫描源黑名单。
              </div>
            </div>
            <Toggle
              checked={settings.threatIntelligenceSync}
              onChange={(checked) => updateSettings({ threatIntelligenceSync: checked })}
            />
          </div>

          <div className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-medium text-text-primary text-[14px]">安全事件持久化审计与归档</div>
              <div className="text-[12px] text-text-secondary">
                保留完整的 TCP/UDP 数据包头取证哈希与源地理元数据（保存期 90 天）。
              </div>
            </div>
            <Toggle
              checked={settings.auditLogging}
              onChange={(checked) => updateSettings({ auditLogging: checked })}
            />
          </div>
        </Card>
      </div>

      {/* Group 3: Notifications & Alerting */}
      <div className="space-y-2">
        <h3 className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider px-1">
          即时告警与系统推送
        </h3>
        <Card variant="surface" padding="none" className="divide-y divide-border overflow-hidden">
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-medium text-text-primary text-[14px]">紧急高危威胁即时推送 (Telegram / Webhook)</div>
              <div className="text-[12px] text-text-secondary">
                当检测到 CRITICAL 级别漏洞利用或暴力破解成功时第一时间发送卡片告警。
              </div>
            </div>
            <Toggle
              checked={settings.telegramAlerts}
              onChange={(checked) => updateSettings({ telegramAlerts: checked })}
            />
          </div>

          <div className="p-4 flex items-center justify-between gap-4 bg-surface-subtle/30">
            <div className="text-[12px] text-text-secondary">
              当前推送目标: <span className="font-mono text-text-primary">ASODS-Ops-AlertBot (Online)</span>
            </div>
            <Button variant="secondary" size="compact" icon={<Bell className="w-3.5 h-3.5" />} onClick={handleTestAlert}>
              发送测试告警
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
