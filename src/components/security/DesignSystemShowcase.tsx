import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Palette,
  Type,
  Maximize2,
  Sliders,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Info,
  ExternalLink,
  Vibrate,
  Radio,
  Eye,
  AppWindow,
  Zap,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Search } from '../ui/Search';
import { Toggle } from '../ui/Toggle';
import { SegmentedControl } from '../ui/SegmentedControl';
import { ProgressBar } from '../ui/ProgressBar';
import { SymbolIcon } from '../ui/SymbolIcon';
import { WindowChrome } from '../ui/WindowChrome';
import { DynamicIsland } from '../ui/DynamicIsland';
import { useSecurity } from '../../context/SecurityContext';
import { haptics } from '../../utils/haptics';

export const DesignSystemShowcase: React.FC = () => {
  const { addToast } = useSecurity();
  const [toggleState, setToggleState] = useState(true);
  const [segmentVal, setSegmentVal] = useState('standard');
  const [inputVal, setInputVal] = useState('');
  const [showDemoIsland, setShowDemoIsland] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Dynamic Island Demo Instance */}
      {showDemoIsland && (
        <DynamicIsland
          statusText="Live Task: 自动化流量深度分析中"
          subText="已匹配 1,420 条安全规则，正在校验 eBPF 零拷贝队列"
          progress={78}
          expandedContent={
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="compact" onClick={() => setShowDemoIsland(false)}>
                收起胶囊
              </Button>
            </div>
          }
        />
      )}

      {/* Design System Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl glass-standard border border-glass-border space-y-3">
        <div className="flex items-center gap-2 text-accent">
          <Sparkles className="w-5 h-5" />
          <span className="text-[12px] font-mono uppercase tracking-widest font-semibold">Apple HIG Advanced Design System</span>
        </div>
        <h1 className="font-display text-[26px] sm:text-[30px] text-text-primary">
          Apple Frosted Glass & Advanced HIG Design System
        </h1>
        <p className="text-[14px] text-text-secondary max-w-2xl leading-relaxed">
          一套通用、统一、开箱即用的前端设计系统。融合 macOS / iOS 极简毛玻璃材质、物理弹簧阻尼动效、SF Symbols 层级染色与灵动胶囊交互。
        </p>
      </div>

      {/* NEW SECTION: 6 Advanced HIG Enhancements */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          <h2 className="font-section-title text-[18px] text-text-primary">Apple HIG 进阶原生特性 (Advanced HIG Standards)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. SF Symbols Hierarchical Rendering */}
          <Card variant="surface" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-card-title text-[15px] text-text-primary">1. SF Symbols 层级染色 (Hierarchical)</h3>
              <Badge variant="accent" size="sm">SF Style</Badge>
            </div>
            <p className="text-[12px] text-text-secondary">
              主路径采用 100% 强调色，底层填充 15%~25% 低不透明度同色系，赋予图标原生层次感：
            </p>
            <div className="flex items-center gap-3 pt-1">
              <SymbolIcon icon={Shield} variant="accent" size="lg" />
              <SymbolIcon icon={CheckCircle2} variant="success" size="lg" />
              <SymbolIcon icon={AlertTriangle} variant="warning" size="lg" />
              <SymbolIcon icon={Flame} variant="danger" size="lg" />
              <SymbolIcon icon={Radio} variant="info" size="lg" />
            </div>
          </Card>

          {/* 2. Web Haptics 微震动反馈 */}
          <Card variant="surface" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-card-title text-[15px] text-text-primary">2. 触觉震动反馈 (Web Haptics)</h3>
              <Badge variant="success" size="sm">Vibration API</Badge>
            </div>
            <p className="text-[12px] text-text-secondary">
              在支持触觉反馈的设备（iOS / Android / 触控板）上触发极微小原生物理震感：
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button variant="secondary" size="compact" onClick={() => { haptics.light(); addToast('info', '触发 Light 触觉反馈 (10ms)'); }}>
                Light (开关/微调)
              </Button>
              <Button variant="secondary" size="compact" onClick={() => { haptics.medium(); addToast('info', '触发 Medium 触觉反馈 (18ms)'); }}>
                Medium (常规点击)
              </Button>
              <Button variant="danger" size="compact" onClick={() => { haptics.warning(); addToast('warning', '触发 Warning 触觉反馈 (双击震感)'); }}>
                Warning (危险动作)
              </Button>
            </div>
          </Card>

          {/* 3. macOS Window Chrome & Traffic Lights */}
          <div className="col-span-1 md:col-span-2">
            <WindowChrome
              title="macOS 沉浸式窗口栏与交通灯控制区"
              subtitle="Unified Window Chrome"
              onClose={() => addToast('info', '点击了关闭红灯')}
              onMinimize={() => addToast('info', '点击了最小化黄灯')}
              onZoom={() => addToast('info', '点击了缩放绿灯')}
              actions={
                <Button
                  variant="primary"
                  size="compact"
                  onClick={() => setShowDemoIsland((prev) => !prev)}
                >
                  {showDemoIsland ? '关闭顶部灵动胶囊' : '展开顶部灵动胶囊 (Dynamic Island)'}
                </Button>
              }
            >
              <div className="space-y-2 text-[13px] text-text-secondary">
                <p>
                  实现了 macOS 标志性一体化标题栏、红黄绿 Traffic Lights 与物理弹簧阻尼转场动效（Spring Physics）。
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-surface-subtle font-mono text-[11px] border border-border">
                    prefers-reduced-transparency 降级纯色
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-subtle font-mono text-[11px] border border-border">
                    prefers-contrast: more 高对比度加粗
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-subtle font-mono text-[11px] border border-border">
                    Spring Easing: cubic-bezier(0.16, 1, 0.3, 1)
                  </span>
                </div>
              </div>
            </WindowChrome>
          </div>
        </div>
      </section>

      {/* 1. Frosted Glass Material Hierarchy (3 Levels) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent" />
          <h2 className="font-section-title text-[18px] text-text-primary">三级毛玻璃材质系统 (Three Glass Levels)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-subtle p-5 rounded-xl border border-glass-border-subtle space-y-2">
            <Badge variant="neutral" size="sm">Level 1 · Subtle</Badge>
            <h3 className="font-card-title text-[15px] text-text-primary">次级浮层与工具栏</h3>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              用于次级小部件、标签栏与辅助浮动组件。
            </p>
            <div className="font-mono text-[11px] text-text-tertiary bg-surface/40 p-2 rounded border border-border-subtle">
              blur(12px) · saturate(150%)
            </div>
          </div>

          <div className="glass-standard p-5 rounded-xl border border-glass-border space-y-2">
            <Badge variant="accent" size="sm">Level 2 · Standard</Badge>
            <h3 className="font-card-title text-[15px] text-text-primary">导航与底部 Dock</h3>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              用于顶部 App Shell、Floating Dock 与主控制栏。
            </p>
            <div className="font-mono text-[11px] text-text-tertiary bg-surface/40 p-2 rounded border border-border-subtle">
              blur(20px) · saturate(160%)
            </div>
          </div>

          <div className="glass-elevated p-5 rounded-xl border border-glass-border space-y-2">
            <Badge variant="success" size="sm">Level 3 · Elevated</Badge>
            <h3 className="font-card-title text-[15px] text-text-primary">系统级 Modal & Sheet</h3>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              用于二次确认模态窗、侧边取证抽屉与 Toast。
            </p>
            <div className="font-mono text-[11px] text-text-tertiary bg-surface/40 p-2 rounded border border-border-subtle">
              blur(28px) · saturate(180%)
            </div>
          </div>
        </div>
      </section>

      {/* 2. Color System & Semantic Palette */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-accent" />
          <h2 className="font-section-title text-[18px] text-text-primary">色彩系统与状态语义 Tokens</h2>
        </div>
        <Card variant="surface" padding="md" className="space-y-4">
          <p className="text-[13px] text-text-secondary">
            全系统严格保持克制：默认仅保留一个 Apple Blue 主色，颜色仅承担状态沟通（Status Communication）。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-3 rounded-lg bg-surface-subtle border border-border space-y-1.5">
              <div className="w-full h-8 rounded-md bg-accent flex items-center justify-center text-white text-[11px] font-mono font-bold">#007AFF</div>
              <div className="text-[12px] font-medium text-text-primary">Accent Blue</div>
              <div className="text-[10px] text-text-tertiary">主操作 / 选中状态</div>
            </div>

            <div className="p-3 rounded-lg bg-surface-subtle border border-border space-y-1.5">
              <div className="w-full h-8 rounded-md bg-semantic-success flex items-center justify-center text-white text-[11px] font-mono font-bold">#34C759</div>
              <div className="text-[12px] font-medium text-text-primary">Success</div>
              <div className="text-[10px] text-text-tertiary">正常 / Protected</div>
            </div>

            <div className="p-3 rounded-lg bg-surface-subtle border border-border space-y-1.5">
              <div className="w-full h-8 rounded-md bg-semantic-warning flex items-center justify-center text-white text-[11px] font-mono font-bold">#FF9F0A</div>
              <div className="text-[12px] font-medium text-text-primary">Warning</div>
              <div className="text-[10px] text-text-tertiary">告警 / 隔离探测</div>
            </div>

            <div className="p-3 rounded-lg bg-surface-subtle border border-border space-y-1.5">
              <div className="w-full h-8 rounded-md bg-semantic-danger flex items-center justify-center text-white text-[11px] font-mono font-bold">#FF3B30</div>
              <div className="text-[12px] font-medium text-text-primary">Danger</div>
              <div className="text-[10px] text-text-tertiary">高危 / Blocked</div>
            </div>

            <div className="p-3 rounded-lg bg-surface-subtle border border-border space-y-1.5">
              <div className="w-full h-8 rounded-md bg-surface-elevated border border-border flex items-center justify-center text-text-primary text-[11px] font-mono font-bold">Surface</div>
              <div className="text-[12px] font-medium text-text-primary">Backgrounds</div>
              <div className="text-[10px] text-text-tertiary">多级深灰层级</div>
            </div>

            <div className="p-3 rounded-lg bg-surface-subtle border border-border space-y-1.5">
              <div className="w-full h-8 rounded-md bg-text-primary flex items-center justify-center text-bg text-[11px] font-mono font-bold">Text</div>
              <div className="text-[12px] font-medium text-text-primary">Typography</div>
              <div className="text-[10px] text-text-tertiary">Primary / Secondary</div>
            </div>
          </div>
        </Card>
      </section>

      {/* 3. Component Matrix */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-accent" />
          <h2 className="font-section-title text-[18px] text-text-primary">核心原子组件交互展厅</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="surface" padding="md" className="space-y-3">
            <h3 className="font-card-title text-[15px] text-text-primary">按钮系统 (Buttons)</h3>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="primary" size="default" onClick={() => addToast('success', '点击了 Primary Action')}>Primary</Button>
              <Button variant="secondary" size="default" onClick={() => addToast('info', '点击了 Secondary Action')}>Secondary</Button>
              <Button variant="tertiary" size="default">Tertiary</Button>
              <Button variant="danger" size="default">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-border-subtle">
              <Button variant="primary" size="compact">Compact (32px)</Button>
              <Button variant="secondary" size="default">Default (36px)</Button>
              <Button variant="secondary" size="large">Large (44px)</Button>
            </div>
          </Card>

          <Card variant="surface" padding="md" className="space-y-3">
            <h3 className="font-card-title text-[15px] text-text-primary">状态指示徽章与进度条</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success" dot>Protected</Badge>
              <Badge variant="info" dot>Monitoring</Badge>
              <Badge variant="warning" dot>Warning</Badge>
              <Badge variant="danger" dot>Blocked</Badge>
              <Badge variant="neutral">Offline</Badge>
              <Badge variant="accent">Rule Active</Badge>
            </div>
            <div className="pt-2 border-t border-border-subtle">
              <div className="text-[12px] text-text-secondary mb-1">细线进度条 (Progress Bar 4-6px):</div>
              <ProgressBar value={72} variant="auto" />
            </div>
          </Card>

          <Card variant="surface" padding="md" className="space-y-3">
            <h3 className="font-card-title text-[15px] text-text-primary">输入框与原生 iOS Toggle</h3>
            <div className="space-y-2.5">
              <Search
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onClear={() => setInputVal('')}
                placeholder="测试 ⌘K 搜索组件..."
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[13px] text-text-secondary">iOS 原生滑动开关 (带 Haptic 震动)</span>
                <Toggle checked={toggleState} onChange={setToggleState} />
              </div>
            </div>
          </Card>

          <Card variant="surface" padding="md" className="space-y-3">
            <h3 className="font-card-title text-[15px] text-text-primary">分段控制器 (Segmented Control)</h3>
            <div className="space-y-3">
              <SegmentedControl
                value={segmentVal}
                onChange={setSegmentVal}
                options={[
                  { value: 'compact', label: '紧凑视图', count: 12 },
                  { value: 'standard', label: '标准控制台', count: 48 },
                  { value: 'analytics', label: '高级分析' },
                ]}
              />
              <div className="text-[12px] text-text-secondary">
                当前选中: <span className="font-mono text-accent">{segmentVal}</span>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
