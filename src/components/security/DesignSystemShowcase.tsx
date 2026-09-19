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
import { useSecurity } from '../../context/SecurityContext';

export const DesignSystemShowcase: React.FC = () => {
  const { addToast } = useSecurity();
  const [toggleState, setToggleState] = useState(true);
  const [segmentVal, setSegmentVal] = useState('standard');
  const [inputVal, setInputVal] = useState('');

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Design System Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl glass-standard border border-glass-border space-y-3">
        <div className="flex items-center gap-2 text-accent">
          <Sparkles className="w-5 h-5" />
          <span className="text-[12px] font-mono uppercase tracking-widest font-semibold">ASODS Design Token Specification</span>
        </div>
        <h1 className="font-display text-[26px] sm:text-[30px] text-text-primary">
          Apple Frosted Glass & Security Operations UI
        </h1>
        <p className="text-[14px] text-text-secondary max-w-2xl leading-relaxed">
          融合 Apple 极简毛玻璃材质语言与高信息密度专业安全控制台架构。强调 Content First、Less UI More Information、原生 macOS/iOS 工具质感。
        </p>
      </div>

      {/* 1. Frosted Glass Material Hierarchy (3 Levels) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent" />
          <h2 className="font-section-title text-[18px] text-text-primary">1. 毛玻璃材质系统 (Three Glass Levels)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Glass 1 */}
          <div className="glass-subtle p-5 rounded-xl border border-glass-border-subtle space-y-2">
            <Badge variant="neutral" size="sm">Level 1 · Subtle</Badge>
            <h3 className="font-card-title text-[15px] text-text-primary">次级浮层与工具栏</h3>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              用于次级小部件、标签栏与辅助浮动组件。
            </p>
            <div className="font-mono text-[11px] text-text-tertiary bg-surface/40 p-2 rounded border border-border-subtle">
              blur(12px) · saturate(150%)<br />
              bg: rgba(..., 0.45~0.55)
            </div>
          </div>

          {/* Glass 2 */}
          <div className="glass-standard p-5 rounded-xl border border-glass-border space-y-2">
            <Badge variant="accent" size="sm">Level 2 · Standard</Badge>
            <h3 className="font-card-title text-[15px] text-text-primary">导航与底部 Dock</h3>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              用于顶部 App Shell、Floating Dock 与主控制栏。
            </p>
            <div className="font-mono text-[11px] text-text-tertiary bg-surface/40 p-2 rounded border border-border-subtle">
              blur(20px) · saturate(160%)<br />
              bg: rgba(..., 0.65~0.70)
            </div>
          </div>

          {/* Glass 3 */}
          <div className="glass-elevated p-5 rounded-xl border border-glass-border space-y-2">
            <Badge variant="success" size="sm">Level 3 · Elevated</Badge>
            <h3 className="font-card-title text-[15px] text-text-primary">系统级 Modal & Sheet</h3>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              用于二次确认模态窗、侧边取证抽屉与 Toast。
            </p>
            <div className="font-mono text-[11px] text-text-tertiary bg-surface/40 p-2 rounded border border-border-subtle">
              blur(28px) · saturate(180%)<br />
              bg: rgba(..., 0.80~0.85)
            </div>
          </div>
        </div>
      </section>

      {/* 2. Color System & Semantic Palette */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-accent" />
          <h2 className="font-section-title text-[18px] text-text-primary">2. 色彩系统与状态语义 Tokens</h2>
        </div>
        <Card variant="surface" padding="md" className="space-y-4">
          <p className="text-[13px] text-text-secondary">
            全系统严格保持克制：默认仅保留一个 Apple Blue 主色，颜色仅承担状态沟通（Status Communication），绝不作为纯装饰炫光。
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

      {/* 3. Typography & Technical Monospace Scales */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-accent" />
          <h2 className="font-section-title text-[18px] text-text-primary">3. 字阶比例与排版体系 (Typography Scales)</h2>
        </div>
        <Card variant="surface" padding="none" className="divide-y divide-border overflow-hidden">
          <div className="p-4 flex items-baseline justify-between gap-4">
            <span className="font-display text-text-primary">Display 32px</span>
            <span className="text-[12px] font-mono text-text-tertiary">font-size: 32px / 700 / -0.03em</span>
          </div>
          <div className="p-4 flex items-baseline justify-between gap-4">
            <span className="font-page-title text-text-primary">Page Title 26px</span>
            <span className="text-[12px] font-mono text-text-tertiary">font-size: 26px / 700 / -0.02em</span>
          </div>
          <div className="p-4 flex items-baseline justify-between gap-4">
            <span className="font-section-title text-text-primary">Section Title 20px</span>
            <span className="text-[12px] font-mono text-text-tertiary">font-size: 20px / 600 / -0.02em</span>
          </div>
          <div className="p-4 flex items-baseline justify-between gap-4">
            <span className="font-card-title text-text-primary">Card Title 16px</span>
            <span className="text-[12px] font-mono text-text-tertiary">font-size: 16px / 600 / -0.01em</span>
          </div>
          <div className="p-4 flex items-baseline justify-between gap-4">
            <span className="font-body text-text-primary">Body 15px · 正文高可读性文本排版</span>
            <span className="text-[12px] font-mono text-text-tertiary">font-size: 15px / 400</span>
          </div>
          <div className="p-4 flex items-baseline justify-between gap-4">
            <span className="font-mono text-accent text-[14px]">185.220.101.42 · PORT 22 · SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
            <span className="text-[12px] font-mono text-text-tertiary">ui-monospace / tnum on</span>
          </div>
        </Card>
      </section>

      {/* 4. Component Library Matrix */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-accent" />
          <h2 className="font-section-title text-[18px] text-text-primary">4. 核心原子组件交互展厅 (Interactive Components)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Button System */}
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

          {/* Badges & Status Indicators */}
          <Card variant="surface" padding="md" className="space-y-3">
            <h3 className="font-card-title text-[15px] text-text-primary">状态指示徽章 (Status Badges)</h3>
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

          {/* Form & Controls */}
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
                <span className="text-[13px] text-text-secondary">iOS 原生风格滑动开关</span>
                <Toggle checked={toggleState} onChange={setToggleState} />
              </div>
            </div>
          </Card>

          {/* Segmented Controls */}
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

      {/* 5. Quality Gate Checklist */}
      <section className="p-6 rounded-xl bg-surface-subtle/80 border border-border space-y-3">
        <h3 className="font-card-title text-[16px] text-text-primary flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-semantic-success" />
          <span>ASODS 质量守则与视觉标准 (Quality Gate)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[12px] text-text-secondary">
          <div className="p-2.5 rounded bg-surface border border-border">
            <span className="font-semibold text-text-primary block mb-0.5">✓ Apple Frosted Glass</span>
            分层毛玻璃质感，避免全盘滥用
          </div>
          <div className="p-2.5 rounded bg-surface border border-border">
            <span className="font-semibold text-text-primary block mb-0.5">✓ Content First</span>
            服务安全信息，严禁霓虹渐变噪点
          </div>
          <div className="p-2.5 rounded bg-surface border border-border">
            <span className="font-semibold text-text-primary block mb-0.5">✓ Monospace Technical Data</span>
            IP、端口、时间戳与 Hash 等宽排版
          </div>
          <div className="p-2.5 rounded bg-surface border border-border">
            <span className="font-semibold text-text-primary block mb-0.5">✓ Confirmation Guard</span>
            危险操作严谨弹窗确认
          </div>
          <div className="p-2.5 rounded bg-surface border border-border">
            <span className="font-semibold text-text-primary block mb-0.5">✓ Responsive Sheet / Drawer</span>
            桌面抽屉 + 移动端卡片式自适应
          </div>
          <div className="p-2.5 rounded bg-surface border border-border">
            <span className="font-semibold text-text-primary block mb-0.5">✓ Light & Dark Precision</span>
            严格校准深灰层级与高对比度
          </div>
        </div>
      </section>
    </div>
  );
};
