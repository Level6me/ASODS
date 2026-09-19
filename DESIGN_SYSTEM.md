# Apple Frosted Glass UI Design System (ASODS) 规范手册

## 0. 规范总则 (Design Identity)

本规范为一套**通用、统一、开箱即用**的前端 UI 设计系统（Design System），旨在帮助任何 Web 应用、SaaS 产品、数据控制台与工具软件快速构建出接近 macOS / iOS 原生质感的现代化界面。

- **核心风格**：Apple-inspired Frosted Glass Utility UI
- **视觉目标**：像一个精心设计的 macOS / iOS 原生应用，杜绝传统模板网站与 AI SaaS 渐变紫色堆砌感。
- **核心关键词**：`Apple-inspired`, `Frosted Glass`, `Translucent Surface`, `Soft`, `Minimal`, `Information Dense`, `Low Visual Noise`, `Native App Feeling`

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

### 1.3 Native App Feeling (原生应用体感)
- 采用 **App Shell + Floating Controls + System Modal + Compact Toolbar + Floating Dock** 的结构。
- 按钮带有微小缩放反馈（`scale(0.98)`），过渡时间严格控制在 `150ms ~ 200ms`。

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

> **关键规则**：项目默认只保留一个主 Accent（如 Apple Blue），语义颜色严禁作为大面积背景装饰，仅用于表达状态指示点与 Badge。

### 2.2 三级毛玻璃材质体系 (Glass Levels)

毛玻璃材质不是简单的半透明，而是由 **透明度 + 背景模糊 + 细边框 + 环境光投影 + 表面色调** 共同构成：

1. **Glass Level 1 — Subtle (次级浮层)**
   - **适用**：次级工具栏、小标签、次级浮动组件
   - **参数**：`background: rgba(..., 0.45~0.55)`，`backdrop-filter: blur(12px) saturate(150%)`，`border: 1px solid rgba(..., 0.06)`
2. **Glass Level 2 — Standard (标准主浮层)**
   - **适用**：顶部 App Shell 导航栏、底部悬浮 Dock、分段控制器
   - **参数**：`background: rgba(..., 0.65~0.70)`，`backdrop-filter: blur(20px) saturate(160%)`，`border: 1px solid rgba(..., 0.10)`
3. **Glass Level 3 — Elevated (提升系统浮层)**
   - **适用**：系统级 Modal Sheet、侧边抽屉 (Drawer)、浮动 Toast
   - **参数**：`background: rgba(..., 0.80~0.85)`，`backdrop-filter: blur(28px) saturate(180%)`，`border: 1px solid rgba(..., 0.15)`

> **关键规则**：普通卡片、表格、表单必须使用普通 Surface 表面，毛玻璃仅用于浮层与导航，避免全屏滥用变成“特效展示网站”。

### 2.3 字阶与排版体系 (Typography Scale)

| 级别 (Level) | 字号 (Size) | 字重 (Weight) | 字间距 (Letter-spacing) | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 32px | 700 (Bold) | -0.03em | 少数重点主视觉标语 |
| **Page Title** | 26px | 700 (Bold) | -0.02em | 页面主标题 |
| **Section Title** | 20px | 600 (Semibold) | -0.02em | 模块区域标题 |
| **Card Title** | 16px | 600 (Semibold) | -0.01em | 卡片与组件标题 |
| **Body** | 15px | 400 (Regular) | normal | 标准正文 |
| **Small** | 13px | 400 (Regular) | normal | 辅助说明、表格内容 |
| **Caption** | 12px | 400 (Regular) | normal | 时间戳、底部标签 |
| **Technical Mono**| 12~14px | 400~600 | `ui-monospace` | IP、端口、哈希、UUID、时间戳 |

### 2.4 圆角与间距规范 (Radius & Spacing)

- **XS (6px)**：微型指示器、代码内嵌标签
- **SM (8px)**：次级小按钮、紧凑输入框
- **MD (10px)**：标准按钮（36~40px）、主输入框、分段控制器
- **LG (14px)**：标准内容卡片容器
- **XL (18px)**：弹出卡片、列表容器
- **2XL (22px)**：系统模态窗（Modal Sheet）
- **Dock (24px)**：底部悬浮 Dock 导航栏
- **Pill (9999px)**：状态徽章与进度条

---

## 3. 跨项目组件交互规范 (Component Guidelines)

1. **按钮体系 (Buttons)**：
   - Primary（实心 Accent）、Secondary（毛玻璃/中性表面）、Tertiary（透明悬停高亮）、Danger（克制红色）。
   - 点击带有 `transform: scale(0.98)` 微小物理反馈。
2. **输入框与快捷检索 (Search & Inputs)**：
   - 40~44px 高度，聚焦时采用柔和 Accent 环（Focus Ring），集成 `⌘K` 快捷键提示。
3. **数据表格与高信息密度 (Tables & Lists)**：
   - 桌面端行高 `48~52px`，支持等宽字体精确对齐，悬停微高亮；
   - 移动端自动转换为卡片流与主次信息拆解，保证触控与阅读体验。
4. **侧边保留上下文抽屉 (Detail Drawer / Sheet)**：
   - 复杂数据查看时优先采用侧边 Glass Sheet，使用户始终能感知背景列表。
5. **危险操作二次确认 (Confirmation Guard)**：
   - 明确告知“将发生什么”、“影响范围”与“是否可撤销”，采用中性界面 + 结构化提示，严禁全盘大红大紫。
