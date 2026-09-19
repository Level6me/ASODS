# Apple Frosted Glass UI Design System (ASODS) 规范手册

## 0. 规范总则 (Design Identity)

本规范为一套**通用、统一、开箱即用**的前端 UI 设计系统（Design System），旨在帮助任何 Web 应用、SaaS 产品、数据控制台与工具软件快速构建出接近 macOS / iOS 原生质感的现代化界面。

- **核心风格**：Apple-inspired Frosted Glass Utility UI
- **视觉目标**：像一个精心设计的 macOS / iOS 原生应用，杜绝传统模板网站与 AI SaaS 渐变紫色堆砌感。
- **核心关键词**：`Apple-inspired`, `Frosted Glass`, `Translucent Surface`, `Soft`, `Minimal`, `Information Dense`, `Low Visual Noise`, `Native App Feeling`, `Spring Physics`

---

## 1. 核心设计哲学 (Core Philosophy)

### 1.1 Less UI, More Information
- 减少纯装饰性元素（如大面积渐变、巨型 Hero 标题、无意义彩色卡片与炫技动画）。
- 增加有效信息承载能力。

### 1.2 Content First (内容优先)
视觉优先级规则：
```text
Content (内容)
   ↓
Information Hierarchy (信息层级)
   ↓
Interaction (交互反馈)
   ↓
Material (材质层级)
   ↓
Decoration (极简装饰)
```

---

## 2. 设计令牌规范 (Design Tokens)

### 2.1 颜色系统 (Color Palette)

| 语义 Token | 浅色模式 (Light) | 深色模式 (Dark) | 规范用途与限制 |
| :--- | :--- | :--- | :--- |
| `--color-background` | `#F5F5F7` | `#0B0B0D` | 应用底层背景，微灰阶，不使用纯白/纯黑 |
| `--color-surface` | `#FFFFFF` | `#151517` | 内容容器卡片与基础工作面 |
| `--color-surface-elevated` | `#F9F9FA` | `#1C1C1E` | 次级提升层级与悬浮区域 |
| `--color-surface-subtle` | `#F0F0F2` | `#242426` | 弱对比度辅助工作区与输入底色 |
| `--color-text-primary` | `#1D1D1F` | `rgba(255,255,255,0.92)` | 主标题与正文主要文字 |
| `--color-text-secondary` | `#6E6E73` | `rgba(255,255,255,0.60)` | 次要信息与说明文本 |
| `--color-text-tertiary` | `#8E8E93` | `rgba(255,255,255,0.38)` | 辅助元数据与未聚焦占位 |
| `--color-accent` | `#007AFF` | `#0A84FF` | Apple Blue 主色，全站唯一核心交互强调色 |
| `--color-success` | `#34C759` | `#30D158` | 状态表达：正常 / 放行 / 成功 |
| `--color-warning` | `#FF9F0A` | `#FF9F0A` | 状态表达：警告 / 隔离 / 待定 |
| `--color-danger` | `#FF3B30` | `#FF453A` | 状态表达：高危 / 拦截 / 错误 |

### 2.2 三级毛玻璃材质体系 (Glass Levels)

1. **Glass Level 1 — Subtle (次级浮层)**
   - `background: rgba(..., 0.45~0.55)`，`backdrop-filter: blur(12px) saturate(150%)`，`border: 1px solid rgba(..., 0.06)`
2. **Glass Level 2 — Standard (标准主浮层)**
   - `background: rgba(..., 0.65~0.70)`，`backdrop-filter: blur(20px) saturate(160%)`，`border: 1px solid rgba(..., 0.10)`
3. **Glass Level 3 — Elevated (提升系统浮层)**
   - `background: rgba(..., 0.80~0.85)`，`backdrop-filter: blur(28px) saturate(180%)`，`border: 1px solid rgba(..., 0.15)`

---

## 3. Apple HIG 进阶六大标准 (Advanced HIG Standards)

### 3.1 物理弹簧阻尼动效 (Spring Physics)
- 放弃生硬的匀速缓动，全面采用基于刚度与阻尼的物理弹簧转场曲线：
  `transition: cubic-bezier(0.16, 1, 0.3, 1)`（如 Modal 弹出带有 1.015 超调阻尼微回弹）。

### 3.2 SF Symbols 风格层级染色 (Hierarchical Symbols)
- 图标支持**双层染色模式**：主路径 100% 强调色，底层底托采用 15%~25% 低不透明度同色系，赋予图标原生深度与层次感。

### 3.3 macOS 窗口控制与交通灯 (Window Chrome & Traffic Lights)
- 桌面端模态与工作台支持 macOS 一体化窗口标题栏（红绿灯 Traffic Lights），提供优雅的关闭、最小化与缩放微交互。

### 3.4 辅助功能降级机制 (Accessibility Standards)
- **降低透明度 (`prefers-reduced-transparency: reduce`)**：自动将半透明毛玻璃退化为纯色 Surface，保证视障人群与低性能设备阅读顺畅；
- **高对比度模式 (`prefers-contrast: more`)**：自动增强 1.5px 边框与文字对比度。

### 3.5 顶部灵动胶囊 (Dynamic Island & Live Activity)
- 顶部常驻轻量化灵动胶囊，支持实时长耗时任务（如后台扫描、策略推送、网络监听）的微型呈现与弹簧平滑展开。

### 3.6 Web 原生触觉微震动 (Web Haptics)
- 封装 `haptics.light()`, `haptics.medium()`, `haptics.warning()` 等震动模式，在开关切换、弹窗触发与危险操作时带来真实的物理触觉反馈。
