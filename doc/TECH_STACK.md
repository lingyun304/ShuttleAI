# ShuttleAI — 技术栈锁定文档

> **产品**: 剧梭短剧 / Shuttle AI | **项目名**: ShuttleAI  
> **版本**: v1.0 | **日期**: 2026-07-31

---

## 一、前端技术栈（精确到版本）

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **框架** | Next.js | 14.x (App Router) | SSR、路由、API路由 |
| **语言** | TypeScript | 5.3+ | 类型安全 |
| **运行时** | React | 18.3+ | UI组件库 |
| **样式** | Tailwind CSS | 3.4.x | 原子化CSS |
| **UI组件** | shadcn/ui | latest | 基于Radix的无头组件 |
| **状态管理(本地)** | Zustand | 4.5+ | Client-side全局状态 |
| **状态管理(服务端)** | TanStack Query | 5.x (React Query) | Server-state缓存与同步 |
| **表单处理** | react-hook-form + zod | 7.x / 0.x | 表单验证 |
| **动画** | Framer Motion | 11.x | 页面过渡和微交互 |
| **图标** | Lucide React | latest | SVG图标库 |
| **路由** | next/navigation | 内置 | App Router导航 |
| **HTTP客户端** | axios | 1.6+ 或 built-in fetch | API请求封装 |
| **富文本编辑器** | TipTap 2 | 2.x | 剧本编辑器的可选方案 |
| **视频播放器** | Video.js / native | — | 短剧预览播放 |
| **拖拽** | @dnd-kit/core | 6.x | 分镜排序、画板布局 |
| **图表** | Recharts | 2.x | 数据可视化仪表盘 |

### 为什么选这些？

- **Next.js App Router** — juhuo.cn 也用的这个框架，SSR对SEO友好，内置图片优化
- **shadcn/ui** — 不是传统UI库，而是复制即用的高质量组件代码，可完全自定义
- **Zustand** — 最轻量的状态管理，比Redux简单10倍
- **TanStack Query** — 自动缓存、自动重试、分页，减少大量样板代码

---

## 二、后端技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **运行时** | Node.js | 20 LTS | JS运行时 |
| **后端框架** | Express.js | 4.x | HTTP服务（MVP阶段轻量） |
| **数据库** | PostgreSQL | 16 | 主数据存储 |
| **ORM** | Prisma | 5.x | 类型安全的数据库操作 |
| **缓存** | Redis | 7.x | 会话存储、任务队列、限流 |
| **文件存储** | 阿里云 OSS | — | 用户上传文件、生成资源 |
| **消息队列** | BullMQ | 5.x | 异步任务调度（视频生成排队） |
| **认证** | JSON Web Token + bcrypt | — | JWT鉴权、密码加密 |
| **支付** | 微信支付 SDK / 支付宝 SDK | — | 积分充值 |
| **容器化** | Docker + Docker Compose | — | 本地开发环境一键启动 |
| **CI/CD** | GitHub Actions | — | 自动部署 |

### MVP阶段简化说明

**第一阶段先不需要的后端组件：**
- ~~NestJS~~ → 用Express即可，后期有复杂度再迁移
- ~~Kubernetes~~ → Docker Compose足够，单机部署
- ~~Elasticsearch~~ → 先用PostgreSQL全文搜索
- ~~GraphQL~~ → RESTful API更直接，方便AI编码

---

## 三、第三方AI服务集成清单

| 能力 | 备选方案A（首选） | 备选方案B | 集成方式 |
|------|------------------|----------|---------|
| **剧本生成LLM** | 通义千问 Qwen-Max | DeepSeek-V3 | API调用 |
| **小说解析** | 同左（同一LLM系统提示词不同） | — | — |
| **图像生成** | Stable Diffusion XL (Self-hosted) | Flux.1 | API / Docker部署 |
| **视频生成** | Seedance API（如开放）/ 可灵 API | Runway Gen-3 API | API调用 |
| **语音合成** | Fish-Speech（self-hosted） | CosyVoice | Docker部署 |
| **内容审核** | 阿里云内容安全API | — | API调用 |
| **人脸识别** | 百度AI开放平台 | — | API调用 |

> ⚠️ MVP阶段所有AI服务用 **Mock数据替代**，只保留接口契约

---

## 四、开发工具链

| 工具 | 用途 |
|------|------|
| VS Code | 主力编辑器 |
| ESLint + Prettier | 代码规范和格式化 |
| Husky + lint-staged | Git pre-commit钩子 |
| Jest | 单元测试 |
| Playwright | E2E测试 |
| Storybook | UI组件文档和手动测试 |
| tRPC（可选） | 前后端类型共享（也可用REST + OpenAPI生成） |

---

## 五、项目初始化命令

```bash
# 1. 创建项目
npx create-next-app@latest ShuttleAI \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# 2. 安装依赖
cd ShuttleAI
npm install zustand @tanstack/react-query axios framer-motion lucide-react react-dropzone recharts @dnd-kit/core
npm install react-hook-form zod @hookform/resolvers

# 3. 安装开发依赖
npm install -D @types/node @types/react @types/react-dom typescript eslint prettier jest @testing-library/react @testing-library/jest-dom playwright

# 4. 初始化 shadcn/ui
npx shadcn-ui@latest init

# 5. 添加基础组件
npx shadcn-ui@latest add button card dialog dropdown-menu input label select textarea toast navigation-menu scroll-area tabs table badge avatar separator progress
```

---

## 六、环境变量配置 (.env.local)

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/shuttleai"
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# 阿里云OSS
OSS_ACCESS_KEY_ID="your-access-key"
OSS_ACCESS_KEY_SECRET="your-secret-key"
OSS_BUCKET="shuttleai-assets"
OSS_REGION="oss-cn-hangzhou"
OSS_ENDPOINT="https://oss-cn-hangzhou.aliyuncs.com"

# LLM (通义千问)
QWEN_API_KEY="your-qwen-api-key"
QWEN_MODEL="qwen-max"

# 视频生成模型（待接入时填写）
# SEEDANCE_API_KEY=""
# KELING_API_KEY=""

# 微信支付
WECHAT_PAY_MCH_ID=""
WECHAT_PAY_API_KEY=""
WECHAT_PAY_NOTIFY_URL="https://shuttleai.cn/api/payment/wechat/notify"

# 支付宝
ALIPAY_APP_ID=""
ALIPAY_PRIVATE_KEY=""
ALIPAY_PUBLIC_KEY=""
ALIPAY_NOTIFY_URL="https://shuttleai.cn/api/payment/alipay/notify"
```
