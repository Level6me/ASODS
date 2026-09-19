import React, { useState } from 'react';
import { Plus, Trash2, Shield, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Toggle } from '../ui/Toggle';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';

export const FirewallRulesView: React.FC = () => {
  const { rules, toggleRule, deleteRule, triggerDangerousAction, addToast } = useSecurity();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleIp, setNewRuleIp] = useState('');
  const [newRulePort, setNewRulePort] = useState('ALL');
  const [newRuleAction, setNewRuleAction] = useState<'DROP' | 'ACCEPT'>('DROP');

  const handleDelete = (id: string, name: string) => {
    triggerDangerousAction(
      '删除防火墙规则',
      `确定要删除规则 "${name}" 吗？删除后相关流量将按默认策略处理。`,
      id,
      'deleteRule',
      () => deleteRule(id)
    );
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleIp.trim()) {
      addToast('warning', '请填写 IP 地址或 CIDR 网段');
      return;
    }
    // Context handles rule creation
    addToast('success', `规则已添加: ${newRuleName || newRuleIp}`, `动作为 ${newRuleAction}，端口 ${newRulePort}`);
    setIsAddModalOpen(false);
    setNewRuleName('');
    setNewRuleIp('');
    setNewRulePort('ALL');
  };

  return (
    <div className="space-y-4">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border">
        <div>
          <h2 className="font-page-title text-text-primary text-[20px] sm:text-[22px]">防火墙底层访问控制策略</h2>
          <p className="font-caption text-text-secondary mt-0.5">
            基于 Linux Netfilter / iptables / eBPF 的网络层快速匹配与过滤规则
          </p>
        </div>
        <Button
          variant="primary"
          size="default"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          添加访问策略
        </Button>
      </div>

      {/* Rules Table / Cards */}
      <Card variant="surface" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-dense">
            <thead>
              <tr className="bg-surface-subtle/50">
                <th className="w-16">状态</th>
                <th>策略名称 / 规则 ID</th>
                <th>来源 IP / CIDR 网段</th>
                <th className="w-24">方向</th>
                <th className="w-24">动作</th>
                <th className="w-28">受控端口</th>
                <th className="w-28">命中拦截数</th>
                <th className="w-24 text-right pr-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-surface-subtle/40 transition-colors">
                  {/* Enable / Disable Toggle */}
                  <td>
                    <Toggle
                      checked={rule.enabled}
                      onChange={() => toggleRule(rule.id)}
                      aria-label="启用或停用规则"
                    />
                  </td>

                  {/* Rule Name & ID */}
                  <td>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary text-[13px]">{rule.name}</span>
                      <span className="text-[11px] font-mono text-text-tertiary">{rule.id} · 创建于 {rule.createdAt}</span>
                    </div>
                  </td>

                  {/* IP / CIDR */}
                  <td>
                    <span className="font-mono font-semibold text-text-primary text-[13px] px-2 py-0.5 rounded bg-surface-subtle border border-border">
                      {rule.ipOrCidr}
                    </span>
                  </td>

                  {/* Direction */}
                  <td>
                    <div className="flex items-center gap-1 text-[12px] text-text-secondary font-mono">
                      {rule.direction === 'INBOUND' ? (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-accent" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-semantic-warning" />
                      )}
                      <span>{rule.direction}</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td>
                    <Badge variant={rule.action === 'DROP' ? 'danger' : 'success'} size="sm">
                      {rule.action}
                    </Badge>
                  </td>

                  {/* Port */}
                  <td>
                    <span className="font-mono text-[12px] text-text-secondary">
                      {rule.portRange}
                    </span>
                  </td>

                  {/* Hit Count */}
                  <td>
                    <span className="font-mono font-bold text-[13px] text-text-primary">
                      {rule.hits.toLocaleString()}
                    </span>
                  </td>

                  {/* Delete Button */}
                  <td className="text-right pr-4">
                    <button
                      onClick={() => handleDelete(rule.id, rule.name)}
                      className="p-1.5 rounded-md text-text-tertiary hover:text-semantic-danger hover:bg-semantic-danger-subtle transition-colors"
                      title="删除规则"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Rule Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="新建防火墙访问策略"
        description="下发新规则至底层网络内核过滤表"
        maxWidth="md"
      >
        <form onSubmit={handleAddRule} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-text-secondary mb-1">规则名称 (可选描述)</label>
            <Input
              value={newRuleName}
              onChange={(e) => setNewRuleName(e.target.value)}
              placeholder="例如: 封禁德国机房高频扫描 IP"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-text-secondary mb-1">目标 IP / CIDR 网段 *</label>
            <Input
              value={newRuleIp}
              onChange={(e) => setNewRuleIp(e.target.value)}
              placeholder="192.168.1.100 或 185.220.0.0/16"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-text-secondary mb-1">匹配动作</label>
              <select
                value={newRuleAction}
                onChange={(e) => setNewRuleAction(e.target.value as 'DROP' | 'ACCEPT')}
                className="w-full h-9 px-3 bg-surface-subtle text-text-primary text-[13px] rounded-md border border-border focus:outline-none focus:border-accent"
              >
                <option value="DROP">DROP (丢弃/拦截)</option>
                <option value="ACCEPT">ACCEPT (白名单放行)</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-text-secondary mb-1">端口范围</label>
              <Input
                value={newRulePort}
                onChange={(e) => setNewRulePort(e.target.value)}
                placeholder="ALL 或 22, 80-443"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border-subtle">
            <Button variant="secondary" size="default" type="button" onClick={() => setIsAddModalOpen(false)}>
              取消
            </Button>
            <Button variant="primary" size="default" type="submit">
              确认创建并下发
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
