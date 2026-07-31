# 剧梭短剧 / Shuttle AI — 视觉设计规范与样式令牌

> **参考对象**: juhuo.cn | **主题**: 暗色深色 + 暖橙红强调色

---

## 一、色彩体系

### 基础色板

```css
/* ========== 颜色变量 (CSS Custom Properties) ========== */
:root {
  /* ---- 背景色 ---- */
  --bg-primary:      #0A0A0C;   /* 页面主背景 - 近黑色 */
  --bg-secondary:    #111114;   /* 卡片/面板背景 */
  --bg-tertiary:     #1A1A1F;   /* 次级元素（输入框、标签） */
  --bg-overlay:      rgba(10, 10, 12, 0.85); /* 模态遮罩 */

  /* ---- 文本色 ---- */
  --text-primary:    #FFFFFF;   /* 主标题、正文 */
  --text-secondary:  rgba(255, 255, 255, 0.65);   /* 副标题、描述 */
  --text-muted:      rgba(255, 255, 255, 0.35);   /* 占位符、禁用文字 */
  --text-inverse:    #0A0A0C;   /* 反色按钮上的文字 */

  /* ---- 强调色（暖橙红色系）---- */
  --accent-primary:  #FF6A3D;   /* 主强调色 - 按钮、链接、高亮 */
  --accent-hover:    rgba(255, 106, 61, 0.25);   /* hover状态背景 */
  --accent-border:   rgba(255, 106, 61, 0.35);   /* 边框光晕 */
  --accent-glow:     rgba(255, 106, 61, 0.12);   /* 柔和发光效果 */
  --accent-gradient: linear-gradient(135deg, #FF6A3D 0%, #FF8C61 100%);  /* 渐变色 */

  /* ---- 功能色 ---- */
  --success:         #22C55E;
  --warning:         #F59E0B;
  --error:           #EF4444;
  --info:            #3B82F6;

  /* ---- 分割线 ---- */
  --border-subtle:   rgba(255, 255, 255, 0.08);  /* 极细分割线 */
  --border-default:  rgba(255, 255, 255, 0.12);  /* 默认边框 */
  --border-strong:   rgba(255, 255, 255, 0.20);  /* 强边框 */
}
```

### Tailwind 配置 (`tailwind.config.ts`)

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0C',
          secondary: '#111114',
          tertiary: '#1A1A1F',
        },
        accent: {
          DEFAULT: '#FF6A3D',
          light: '#FF8C61',
          glow: 'rgba(255, 106, 61, 0.15)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.65)',
          muted: 'rgba(255, 255, 255, 0.35)',
        },
      },
      fontFamily: {
        sans: ['PingFang SC', 'Microsoft YaHei', '-apple-system', 'sans-serif'],
      },
    },
  },
}
```

---

## 二、字体系统

| 用途 | 类名 | 大小 | 字重 | 行高 |
|------|------|------|------|------|
| **超大展示** | `text-display` | sm:6rem / mobile:4rem | font-bold | tight |
| **页面标题** | `text-heading-xl` | text-5xl (48px) | font-semibold | tight |
| **章节标题** | `text-heading-md` | text-3xl (30px) | font-semibold | tight |
| **卡片标题** | `text-heading-sm` | text-xl (20px) | font-semibold | normal |
| **正文** | `text-body` | text-base (16px) | font-normal | leading-relaxed |
| **辅助说明** | `text-caption` | text-sm (14px) | font-normal | normal |
| **元数据** | `text-meta` | text-xs (12px) | font-normal | normal |

### 中文字体栈

```css
font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 
             'WenQuanYi Micro Hei', sans-serif;
```

---

## 三、间距系统

基于 4px 基数，使用 Tailwind 默认刻度：

```
4px → 0.25rem → xs (内边距最小单位)
8px → 0.5rem  → sm (图标间距)
12px→ 0.75rem → (标签间距)
16px→ 1rem    → base (组件内间距)
20px→ 1.25rem → (卡片间距)
24px→ 1.5rem  → md (区块间距)
32px→ 2rem    → lg (Section间距)
48px→ 3rem    → xl (大Section间距)
64px→ 4rem    → (Hero区高度基准)
```

---

## 四、圆角规范

| 场景 | 圆角 | 示例 |
|------|------|------|
| **胶囊按钮** | `rounded-full` | 主要CTA按钮 |
| **卡片/面板** | `rounded-2xl` (16px) | 功能卡片、内容卡 |
| **输入框** | `rounded-xl` (12px) | 表单输入框 |
| **头像** | `rounded-full` | 用户头像 |
| **小标签** | `rounded-lg` (8px) | 类型标签、徽章 |
| **分镜缩略图** | `rounded-lg` (8px) | 视频缩略图 |

---

## 五、阴影与发光效果

```css
/* 卡片悬浮阴影 */
.card-hover-shadow {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s ease;
}
.card-hover-shadow:hover {
  box-shadow: 0 8px 40px rgba(255, 106, 61, 0.08),
              0 4px 24px rgba(0, 0, 0, 0.3);
}

/* 按钮发光环 */
.btn-glow-ring {
  border: 1px solid rgba(255, 106, 61, 0.35);
  box-shadow: 0 0 12px rgba(255, 106, 61, 0.15);
}

/* 背景模糊毛玻璃 */
.glass-effect {
  backdrop-filter: blur(12px);
  background: rgba(17, 17, 20, 0.7);
}
```

---

## 六、动画库 (Framer Motion + CSS Keyframes)

### 预定义缓动曲线

```typescript
// easing.ts
export const easings = {
  // Framer Motion preset
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  // CSS duration presets
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',   // juhuo.cn 标准
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
}
```

### 常用动画效果

| 动画名 | 触发场景 | 参数 |
|--------|---------|------|
| **fadeIn** | 页面/组件进入 | opacity: 0→1, duration: 200ms |
| **slideUp** | 导航栏、工具栏出现 | translateY(20px)→0, opacity 0→1 |
| **modalRiseIn** | 全屏工作台弹出 | translateY(56px)→0, duration: 300ms |
| **menuFadeIn** | 下拉菜单展开 | translateY(4px)→0, duration: 150ms |
| **popupSlideIn** | 侧边面板滑入 | translateX(-10px)→0, opacity 0→1 |
| **floatOrbs** | 背景装饰浮动 | 无周期循环，多节点贝塞尔 |
| **morphFire** | Hero区火焰装饰变形 | border-radius morph + scale + rotate |
| **staggerChildren** | 列表项依次出现 | delay children by 50ms each |

---

## 七、响应式断点

```
Mobile       < 640px  (sm)  - 手机竖屏
Tablet       640px+   (md)  - 平板横屏
Desktop      1024px+  (lg)  - 笔记本
Large Desktop 1280px+ (xl)  - 桌面显示器
```

### 关键布局策略

| 屏幕尺寸 | Hero区标题 | 功能卡片 | CTA输入框 | 侧边导航 |
|----------|-----------|---------|----------|---------|
| Mobile (<640) | 缩小至2rem，单列排列 | 垂直堆叠1列 | 全宽 | 底部TabBar |
| Tablet (640-1024) | 3rem，双列卡片 | 水平2列 | 全宽 | 收起为图标条 |
| Desktop (1024+) | 6rem，完整展示 | 水平3-4列 | 600px居中 | 左侧完整导航 |

---

## 八、juhuo.cn 特有设计还原要点

### 1. 背景装饰

juhuo.cn 在Hero区域有动态的装饰元素：
- **浮动光球 (Float Orbs)** — 半透明渐变圆形缓慢漂浮
- **火焰形态 (Morph Fire)** — CSS border-radius变形模拟火焰跳动
- **实现方案**: 绝对定位div + `mix-blend-mode: screen` + CSS animation

### 2. 全屏工作台模式

```
.juhuo-fullscreen-modal {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: #0A0505;         /* 比主页稍暖的黑色 */
  z-index: 100;
  animation: modalRiseIn 0.3s ease forwards;
}
```

这是核心交互模式 —— 从首页点击"立即创作"后，整个网站切换为暗色调工作台界面。

### 3. 滚动优化

```css
/* 隐藏Chrome/Edge的滚动条但保留滚动 */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

### 4. Navbar 固定与模糊

```css
.navbar-fixed {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  background: rgba(10, 10, 12, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```
