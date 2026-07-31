# 剧梭短剧 — ShuttleAI

> **产品品牌名**: 剧梭短剧 | Shuttle AI  
> **项目/工程名**: ShuttleAI  
> *"一句话，穿梭成剧"*

---

## 📚 文档清单

| 文档 | 说明 | 适用人群 |
|------|------|---------|
| [TECH_STACK.md](./TECH_STACK.md) | 技术栈精确锁定（框架/版本/依赖） | 全栈开发 |
| [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) | 视觉规范与样式令牌（色彩/字体/间距/动画） | 前端设计 |
| [FRONTEND_COMPONENTS.md](./FRONTEND_COMPONENTS.md) | 页面组件树与路由表（每个页面的完整结构） | 前端开发 |
| [API_SPEC.md](./API_SPEC.md) | RESTful API契约 + Mock数据策略 | 前后端协作 |
| [DEVELOPMENT_SCHEDULE.md](./DEVELOPMENT_SCHEDULE.md) | 15周开发排期（按天拆解） | PM / 开发 |
| [PRD_ORIGINAL.md](./PRD_ORIGINAL.md) | 原始产品需求书（业务参考） | 产品经理 |

---

## 🎯 快速开始

### 第一步：搭建项目骨架（Day 1）

```bash
# 创建Next.js项目
npx create-next-app@latest ShuttleAI \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

cd ShuttleAI

# 安装所有核心依赖
npm install zustand @tanstack/react-query axios framer-motion lucide-react react-dropzone recharts @dnd-kit/core
npm install react-hook-form zod @hookform/resolvers

# 初始化 shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog dropdown-menu input label select textarea toast navigation-menu scroll-area tabs table badge avatar separator progress

# 启动dev server
npm run dev
```

### 第二步：复制文档

将本目录下的所有 `.md` 文档复制到项目中作为开发参考。

### 第三步：按照 FRONTEND_COMPONENTS.md 实现首页

从 `/` (Landing Page) 开始，按组件树逐块实现。Mock数据在 `src/mocks/data.ts` 中预定义。

---

## 🔑 核心设计理念

1. **暗色主题** — 全局深色背景 (#0A0A0C) + 暖橙红强调色 (#FF6A3D)
2. **全屏工作台模式** — 创作界面使用全屏覆盖式布局
3. **Mock优先** — 先做完整前端交互，后端渐进替换真实AI服务
4. **响应式** — Mobile → Tablet → Desktop 三断点适配
5. **流畅动效** — Framer Motion 驱动页面过渡和微交互

---

## 📊 技术栈速查

| 领域 | 技术 |
|------|------|
| 前端框架 | Next.js 14 App Router + React 18 + TypeScript |
| 样式 | Tailwind CSS 3.4 + CSS Custom Properties |
| UI库 | shadcn/ui (Radix UI) |
| 状态管理 | Zustand (client) + TanStack Query (server) |
| 动画 | Framer Motion 11 |
| 表单 | react-hook-form + zod |
| 拖拽 | @dnd-kit/core |
| 图表 | Recharts 2 |
| 后端 | Express.js + Prisma + PostgreSQL |
| 缓存 | Redis |
| 容器化 | Docker Compose |
| 部署 | Vercel (推荐) / Docker |

---

## ⏰ 里程碑速览

| # | 里程碑 | 时间 | 交付物 |
|---|--------|------|--------|
| M1 | Landing Page可用 | W2末 | 首页可浏览+注册功能 |
| M2 | 工作台可用 | W4末 | 项目管理+Mock数据层 |
| M3 | 全流程Demo | W10末 | 创意→剧本→分镜→生成视频(全Mock) |
| M4 | Beta版本 | W13末 | 前后端联调完毕 |
| M5 | 正式上线 | W14末 | 部署上线+SEO优化 |
