# Apple-inspired Frosted Glass UI Design System (ASODS)

一套统一、完整、开箱即用、适用于**任何 Web 应用、管理后台、工具软件与控制台**的现代化前端设计系统（Design System）。

本项目提炼了 macOS / iOS 原生工具应用的视觉哲学，以 **“Less UI, More Information”** 和 **“Content First”** 为核心原则，为任何业务场景提供极低视觉噪音、高信息密度与纯正原生质感的用户界面。

---

## 💎 设计体系原则 (Design Philosophy)

1. **Content First（内容优先）**：
   - 视觉层级始终遵循：`Content` ↓ `Information Hierarchy` ↓ `Interaction` ↓ `Material` ↓ `Decoration`
   - 减少无意义的装饰大渐变、巨型 Hero、彩色卡片与炫技动画，将界面完全交还给有效信息。

2. **Native App Feeling（原生质感）**：
   - 包含 App Shell、Floating Controls、System-like Modal、Compact Toolbar、Native-feeling Buttons 与 Floating Dock。
   - 拒绝传统模板网站质感（如 Bootstrap Admin、AI SaaS 渐变紫色堆砌）。

3. **High Information Density（高信息密度）**：
   - 专为桌面端专业操作与移动端流畅可读性设计，支持等宽技术数据排版、48~52px 紧凑表格与侧边保留上下文抽屉（Drawer）。

4. **Multi-level Surface & Pure Dark Mode（多级表面与深色层级）**：
   - 深色模式采用精密的深灰层级（`#0B0B0D` → `#151517` → `#1C1C1E`），而非单调粗暴的 `#000` + `#fff`。

---

## 🪟 三级毛玻璃材质系统 (Three Glass Levels)

| 材质层级 | CSS 特征 | 适用组件与场景 |
| :--- | :--- | :--- |
| **Glass 1 — Subtle** | `blur(12px) saturate(150%)`<br>`border: 1px solid rgba(..., 0.06)` | 次级工具栏、辅助浮层、小标签、次级控制项 |
| **Glass 2 — Standard** | `blur(20px) saturate(160%)`<br>`border: 1px solid rgba(..., 0.10)` | 顶部导航栏 (App Shell Header)、底部悬浮 Dock、分段控制器 |
| **Glass 3 — Elevated** | `blur(28px) saturate(180%)`<br>`border: 1px solid rgba(..., 0.15)` | 系统级 Modal、侧边抽屉 (Drawer)、气泡菜单 (Popover)、Toast |

---

## 🎨 通用设计令牌 (Design Tokens)

系统所有颜色、间距、圆角与阴影均通过 CSS 变量集中管理，不硬编码任何具体像素值：

```css
:root {
  /* 基础表面与背景 */
  --color-background: #F5F5F7;
  --color-surface: #FFFFFF;
  --color-surface-elevated: #F9F9FA;
  --color-surface-subtle: #F0F0F2;

  /* 毛玻璃三级材质 */
  --color-glass-1: rgba(255, 255, 255, 0.45);
  --color-glass-2: rgba(255, 255, 255, 0.65);
  --color-glass-3: rgba(255, 255, 255, 0.80);
  --color-glass-border: rgba(255, 255, 255, 0.45);

  /* 品牌色（默认 Apple Blue）与语义状态色 */
  --color-accent: #007AFF;
  --color-success: #34C759;
  --color-warning: #FF9F0A;
  --color-danger: #FF3B30;
  --color-info: #007AFF;

  /* 柔和圆角体系 */
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-2xl: 22px;
  --radius-dock: 24px;
  --radius-full: 9999px;
}
```

---

## 📦 开箱即用的原子组件库 (Components)

适用于任何业务系统的基础组件：

- 🔘 **Button / IconButton**：Primary / Secondary / Tertiary / Danger，支持 32px / 36px / 44px 及微交互缩放。
- 🔍 **Search / Input**：集成快捷键提示（`⌘K` / `/`）、一键清除与聚焦光环。
- 🏷️ **Badge / Pill**：规范的状态圆点指示器与等宽数字徽章。
- 📊 **Table / List**：桌面端高密度表格（48~52px 行高）+ 移动端自适应卡片流。
- 📑 **Segmented Control**：原生 iOS 风格紧凑分段切换器。
- 🎚️ **iOS Toggle**：150~200ms 丝滑过渡的原生滑动开关。
- 🪟 **Modal & Drawer**：系统级 Sheet 模态窗、桌面侧边抽屉与移动端 Bottom Sheet。
- 🍞 **Floating Glass Toast**：浮动毛玻璃状态通知提示。
- 📈 **Apple-Style Charts**：极简细线、微型提示框与柔和渐变区域图表。
- 🛠️ **Grouped Settings**：类似系统设置的 Section 分组配置容器。

---

## 🚀 如何在任何项目中集成此设计系统

### 方案 A：直接引入 CSS Tokens（适用于任何前端框架）

将 `src/styles/` 目录下的样式文件复制到你的项目中并在主入口引入：
```css
@import './styles/tokens.css';
@import './styles/base.css';
@import './styles/glass.css';
@import './styles/components.css';
```

### 方案 B：使用 React + Tailwind 模板

1. **克隆项目并安装依赖**：
```bash
git clone https://github.com/Level6me/ASODS.git
cd ASODS
npm install
```

2. **启动组件展厅与示例应用**：
```bash
npm run dev
```

3. **生产构建**：
```bash
npm run build
```

---

## 📁 目录结构

```text
├── src/
│   ├── components/
│   │   ├── ui/             # 通用原子组件 (Button, Input, Modal, Drawer, Toast, Badge 等)
│   │   └── security/       # 高信息密度监控与控制台通用业务范例视图
│   ├── context/            # 全局明暗主题与状态管理 Context
│   ├── styles/             # Design Tokens、毛玻璃工具类与排版基础样式
│   │   ├── tokens.css      # CSS 变量定义（Light / Dark）
│   │   ├── glass.css       # 3 级毛玻璃材质与阴影类
│   │   ├── base.css        # 字体排版与系统重置
│   │   └── components.css  # 组件级微交互与动效
│   ├── App.tsx             # 综合示例入口与设计系统展厅
│   └── main.tsx
├── DESIGN_SYSTEM.md        # 完整详细的设计规范与准则手册
└── README.md
```

---

## 📄 开源许可证

MIT License
