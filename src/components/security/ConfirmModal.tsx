import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const ConfirmModal: React.FC = () => {
  const { confirmAction, closeConfirmModal } = useSecurity();

  if (!confirmAction || !confirmAction.isOpen) return null;

  const handleConfirm = () => {
    confirmAction.onConfirm();
    closeConfirmModal();
  };

  const isDanger = confirmAction.actionType === 'block' || confirmAction.actionType === 'deleteRule' || confirmAction.actionType === 'clearLogs';

  return (
    <Modal
      isOpen={confirmAction.isOpen}
      onClose={closeConfirmModal}
      maxWidth="sm"
      title={confirmAction.title}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-surface-subtle/80 rounded-md border border-border">
          <div className="p-2 rounded-md bg-surface text-semantic-warning shrink-0 border border-border">
            {isDanger ? <ShieldAlert className="w-5 h-5 text-semantic-danger" /> : <AlertCircle className="w-5 h-5 text-accent" />}
          </div>
          <div className="text-[13px] text-text-secondary leading-relaxed">
            <p className="font-medium text-text-primary mb-1">目标对象: <span className="font-mono text-accent">{confirmAction.target}</span></p>
            <p>{confirmAction.description}</p>
          </div>
        </div>

        <div className="bg-surface-elevated/60 p-3 rounded-md border border-border-subtle text-[12px] text-text-tertiary">
          <p className="font-medium text-text-secondary mb-0.5">操作影响声明：</p>
          {confirmAction.actionType === 'block' && (
            <ul className="list-disc list-inside space-y-0.5">
              <li>该来源 IP 的全部入站网络连接将在内核级立即丢弃 (DROP)。</li>
              <li>此动作已记录至安全审计日志，随时可在防火墙策略中解除。</li>
            </ul>
          )}
          {confirmAction.actionType === 'deleteRule' && (
            <ul className="list-disc list-inside space-y-0.5">
              <li>此防火墙规则将被物理移除，对应 IP/网段将恢复默认策略。</li>
            </ul>
          )}
          {confirmAction.actionType === 'unblock' && (
            <ul className="list-disc list-inside space-y-0.5">
              <li>将解除针对该 IP 的封禁策略，允许正常流量握手。</li>
            </ul>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <Button variant="secondary" size="default" onClick={closeConfirmModal}>
            取消
          </Button>
          <Button
            variant={isDanger ? 'danger' : 'primary'}
            size="default"
            onClick={handleConfirm}
          >
            {confirmAction.actionType === 'block' ? '确认拦截 IP' : confirmAction.actionType === 'deleteRule' ? '确认删除' : '确认执行'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
