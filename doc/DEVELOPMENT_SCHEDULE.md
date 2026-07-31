# ShuttleAI — 开发排期（前端优先策略）

> **产品**: 剧梭短剧 / Shuttle AI | **项目名**: ShuttleAI  
> **核心策略**: 先做完整前端交互界面（Mock数据），后端渐进替换为真实服务。  
> **假设**: 1名全栈开发者 + AI辅助编码工具（Cursor/Claude Code等）  
> **总计**: 约14周 ≈ 3.5个月

---

## 排期总览

```
Week 1-2     ██████████████████████████  基础设施 + 认证 + Landing Page
Week 3-4     ██████████████████████████  工作台仪表盘 + Mock数据层
Week 5-6     ██████████████████████████  新建项目向导（全步骤）
Week 7-8     ██████████████████████████  项目编辑器（剧本+分镜）
Week 9-10    ██████████████████████████  资产管理 + 虚拟演员库
Week 11-12   ██████████████████████████  渲染队列 + 导出 + 配音
Week 13-14   ██████████████████████████  Showcase页 + 定价页 + 联调优化
```

---

## Phase 1: 基础设施与着陆页（第1-2周）

### Week 1 — 项目启动

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D1 | 创建Next.js项目、安装依赖、配置TypeScript/Tailwind | 可运行的项目骨架 | 3h |
| D1 | 配置ESLint+Prettier、Git初始化、提交模板 | .gitignore, eslint.config | 1h |
| D2 | Docker Compose环境 (PostgreSQL + Redis) | docker-compose.yml | 2h |
| D2 | 搭建Prisma ORM，定义User/Project模型并迁移 | prisma/schema.prisma | 3h |
| D3 | 搭建Express API骨架 + JWT认证中间件 | server/index.ts, auth middleware | 4h |
| D3 | Auth API实现 + Mock端点 | POST /api/auth/login/register/send-code | 2h |
| D4 | 设计Token系统 - DESIGN_TOKENS.md全部CSS变量和Tailwind扩展 | src/app/globals.css | 2h |
| D4 | 全局布局组件 - DarkLayout, NavBar, Footer | components/layout/*.tsx | 4h |
| D5 | UI组件库初始化（shadcn/ui添加所有基础组件） | 15+ shadcn组件 | 3h |

**Day 5验收**: `npm run dev` 能启动，无报错，登录页面空白可跑

### Week 2 — Landing Page 首页

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D6 | Hero Section — 标题、副标题、输入框、按钮 | pages/LandingPage.tsx Hero区 | 4h |
| D6 | Hero背景装饰动画（浮动光球+火焰变形CSS） | BackgroundDecorations组件 | 2h |
| D7 | Features Grid — 6个功能卡片，悬停动效 | FeaturesGrid组件 | 3h |
| D7 | How It Works — 三步流程展示 | ProcessSection组件 | 2h |
| D8 | Two Tracks对比区 — 漫剧vs仿真人剧 | TracksComparison组件 | 2h |
| D8 | Comparison Table — 六维对比表格 | ComparisonTable组件 | 3h |
| D9 | Why Choose Us — 6大优势列表 | WhyChooseUs组件 | 1h |
| D9 | FAQ Accordion — 手风琴展开折叠 | FAQAccordion组件(复用shadcn) | 2h |
| D10 | Final CTA + 完整Footer | 底部CTA区域 + Footer | 2h |
| D10 | 响应式适配（Mobile/Tablet/Desktop三断点） | 全页面测试通过 | 3h |

**Day 10验收**: Landing Page视觉效果接近juhuo.cn，三端可正常浏览

---

## Phase 2: 工作台框架与Mock数据层（第3-4周）

### Week 3 — 工作台基础设施

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D11 | Studio Layout — 顶部Bar + 左侧Sidebar | layouts/StudioLayout.tsx | 4h |
| D11 | 路由守卫（需要登录才能访问/studio） | middleware/route-guards.ts | 2h |
| D12 | Zustand Store设计 — userStore, projectStore, uiStore | stores/*.ts | 3h |
| D12 | TanStack Query配置 — QueryClientProvider, axios实例 | lib/api-client.ts | 2h |
| D13 | 项目列表API对接（Mock数据） | GET /api/projects mock handler | 3h |
| D13 | Studio Dashboard页面 — 空状态 + 项目卡片网格 | pages/studio/index.tsx | 4h |
| D14 | 项目创建表单（Step 1: 创意输入） | CreateWizard Step 1 | 4h |
| D14 | 创建项目的API调用（Mock POST /api/projects） | projectStore.create() | 2h |
| D15 | Toast通知系统集成（成功/失败提示） | ToastProvider + useToast | 1h |
| D15 | Sidebar RecentProjects列表 + 搜索 | StudioSidebar.tsx | 2h |

**Day 15验收**: 登录后进入工作台，可以看到空状态或示例项目，可以创建新项目

### Week 4 — Mock数据层（核心基建）

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D16 | MOCK_SCRIPT完整数据结构 — 大纲+角色+3集完整剧本 | mocks/data/script.ts | 3h |
| D16 | MOCK_SHOTS结构 — 50个分镜对象（各种景别类型） | mocks/data/storyboards.ts | 2h |
| D17 | MOCK_ACTORS — 20+虚拟演员数据 | mocks/data/actors.ts | 2h |
| D17 | MOCK生成模拟函数 — generateScriptMock(), generateShotsMock() | mocks/generators.ts | 3h |
| D18 | Mock API Route代理 — 覆盖所有AI相关接口 | app/api/mock/*/*.ts | 6h |
| D19 | SSE流式响应Mock — simulateStreamingResponse() helper | mocks/streaming.ts | 3h |
| D19 | Mock视频生成队列 — simulateVideoGeneration() | mocks/video-gen.ts | 2h |
| D20 | API客户端统一拦截器 — USE_MOCK开关切换 | lib/api-client.ts 改造 | 2h |
| D20 | Storybook搭建 — 所有组件的可交互文档 | storybook配置+Story文件 | 4h |

**Day 20验收**: 所有API请求都被Mock拦截，前端完全不需要真实后端即可运行和演示。UI组件有Storybook可手动测试。

---

## Phase 3: 核心创作流程（第5-7周）

### Week 5 — 新建项目向导 Step 2 & 3

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D21 | Wizard组件 — 步骤条进度指示器 + 导航逻辑 | components/CreateWizard.tsx | 4h |
| D22 | Step 2: 剧本编辑器左面板（大纲+角色卡） | ScriptEditor LeftPanel | 4h |
| D23 | Step 2: 剧本编辑器右面板（分集标签+场景块） | ScriptEditor RightPanel | 5h |
| D24 | Step 2: AI对话聊天窗口（消息气泡+输入框） | ScriptEditor ChatPanel | 3h |
| D25 | Step 3: 视觉风格选择器（8种风格的预览卡片网格） | VisualStylePicker | 3h |
| D25 | Step 3: 语音配置 + 字幕样式预览 | AudioConfig section | 2h |
| D25 | 从创建页跳转到项目编辑器的路由打通 | 完整导航链路 | 1h |

### Week 6 — 项目编辑器：剧本Tab

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D26 | Project Workspace Layout — Tab导航系统 | tabs/[tabName] 路由 + layout | 3h |
| D26 | Stage Stepper组件（6阶段状态指示器） | components/StageStepper.tsx | 2h |
| D27 | 剧本Tab — 加载并显示完整剧本数据 | TabScript内容 | 4h |
| D28 | 剧本Tab — 行内编辑（dialogue文本直接编辑） | inline-editable text | 3h |
| D29 | 剧本Tab — AI审查触发与结果展示 | ReviewResultPanel | 4h |
| D30 | 剧本Tab — 情绪曲线可视化图表(Recharts) | EmotionalCurveChart | 2h |
| D30 | PATCH脚本更新API对接（Mock） | API patch endpoint | 1h |

**Day 30验收**: 用户可以进入项目编辑器，看到完整的剧本内容，可以编辑对白，触发"审查"后看到Mock的审查报告

### Week 7 — 项目编辑器：分镜Tab

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D31 | 分镜Tab Layout — 上方操作栏 + 网格/列表视图切换 | TabStoryboard | 4h |
| D32 | ShotCard组件 — 缩略图+元信息+拖拽手柄 | components/ShotCard.tsx | 3h |
| D33 | @dnd-kit集成 — 分镜卡片拖拽排序 | dnd dropzone integration | 4h |
| D34 | TimelineStrip底部缩略图滚动条 | TimelineStrip组件 | 2h |
| D35 | 分镜详情页 — 点击ShotCard弹出全屏预览Dialog | ShotPreviewDialog | 4h |
| D35 | 分镜参数编辑 — shotType/camera/duration inline edit | inline editor fields | 2h |

---

## Phase 4: 资产与渲染（第8-10周）

### Week 8 — 资产管理Tab

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D36 | 资产管理Tab Layout — Character/Scene/Props子Tab | TabAssets | 3h |
| D37 | 角色卡片组件 — 圆形肖像+名称+声音标签 | CharacterCard | 3h |
| D38 | 场景卡片组件 — 背景图+位置名+氛围标签 | SceneCard | 2h |
| D39 | 道具卡片组件 | PropCard | 2h |
| D40 | Canvas画板 — 可拖拽的视觉资产工作台 | AssetCanvasBoard | 4h |

### Week 9 — 虚拟演员库页面 + 音频Tab

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D41 | Actors页面 — 搜索+筛选+网格布局 | pages/actors.tsx | 4h |
| D42 | ActorCard组件 — 肖像+标签+选择按钮 | ActorCard | 2h |
| D42 | 为角色分配演员的功能（弹窗选择） | AssignActorModal | 3h |
| D43 | 音频Tab — 音色分配表 | AudioTab VoiceAssignments | 2h |
| D44 | 音频Tab — BGM配置面板 | AudioTab BGMConfig | 3h |
| D44 | 音频Tab — 音频时间轴波形可视化（mock） | AudioTimeline | 3h |
| D45 | "一键生成"功能触发Mock视频生成队列 | GenerateAllButton → queue | 3h |

### Week 10 — 渲染队列Tab

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D46 | 渲染队列Tab — BatchProgressSummary环形进度条 | RenderTab ProgressSummary | 3h |
| D47 | QueueItem组件 — 进度条+ETA+重试按钮 | QueueItem | 4h |
| D48 | 轮询查询生成进度（每5秒刷新） | polling hook | 2h |
| D48 | Mock视频生成模拟（逐步完成每个镜头） | mock generator logic | 2h |
| D49 | 生成的视频缩略图渐显效果 | image progress loader | 2h |
| D50 | 整体项目渲染进度概览 | OverallProgressRing | 2h |

**Day 50验收**: 从创意输入→生成剧本→分镜→分配角色→配置音频→一键生成视频，整个完整流程可以走通（虽然都是Mock数据）

---

## Phase 5: 收尾与优化（第11-14周）

### Week 11 — 导出页 + 作品集页

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D51 | 导出Tab — 视频播放器（带集数选择器） | ExportTab VideoPlayer | 4h |
| D51 | 导出选项面板 — 格式/分辨率/比例下拉 | ExportOptionsPanel | 2h |
| D52 | 下载按钮 + 批量下载动画 | DownloadActions | 2h |
| D53 | Showcase页面 — 作品瀑布流网格 | pages/showcase.tsx | 4h |
| D54 | 作品卡片 — 缩略图+播放遮罩+分类标签 | ShowCaseCard | 3h |
| D54 | 筛选器和排序控件 | FilterBar | 2h |
| D55 | InfiniteScroll加载更多（Mock） | PaginationComponent | 2h |

### Week 12 — 定价页 + 用户中心 + 支付UI

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D56 | Pricing页面 — 积分套餐4列卡片 | pages/pricing.tsx | 4h |
| D56 | 积分计算器 — 滑动条+实时计算结果 | CreditCalculator | 3h |
| D57 | CostBreakdown消耗参考表 | 成本明细表 | 1h |
| D57 | PartnerPlanBanner (伙剧计划横幅) | Banner组件 | 1h |
| D58 | 用户中心页面 — 账户信息/订单记录 | pages/account.tsx | 3h |
| D58 | 积分充值弹窗 — 选择套餐+支付按钮 | RechargeModal | 3h |
| D59 | 微信支付Mock — 二维码弹窗 | WeChatPayMockQR | 2h |
| D60 | 管理后台骨架 — 仪表盘/用户管理/订单审核 | pages/admin/**/*.tsx | 4h |

### Week 13 — 全面联调与优化

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D61 | 将所有Mock数据切换至真实API端点 | USE_MOCK toggle | 2h |
| D61 | Express服务器 — 实现核心CRUD API | server routes CRUD | 4h |
| D62 | Prisma数据库 — 完善Schema（所有实体+关系） | prisma/schema.prisma 完成版 | 4h |
| D63 | Auth完整实现 — register/login/logout/JWT refresh | server auth routes | 3h |
| D63 | 项目CRUD API — create/list/update/delete | server project routes | 3h |
| D64 | 分页/排序/过滤的Query参数处理 | query params handling | 2h |
| D64 | 图片上传/OSS集成（MockOSS或直接阿里云） | UploadService | 2h |
| D65 | Bug修复 + 错误边界处理 | ErrorBoundary components | 2h |

### Week 14 — 细节打磨 + 部署

| Day | 任务 | 交付物 | 预计工时 |
|-----|------|--------|---------|
| D66 | 全站性能优化 — 图片懒加载、代码分割 | next.config optimization | 2h |
| D67 | SEO优化 — 每个页面的meta tags和title | metadata in layout files | 2h |
| D67 | Lighthouse评分优化 | Performance score > 80 | 2h |
| D68 | 移动端响应式最终调试 | 各断点visual check | 3h |
| D69 | 浏览器兼容性测试 (Chrome/Safari/Edge/Firefox) | Cross-browser test report | 2h |
| D70 | Vercel/Docker部署配置 | vercel.json or Dockerfile | 2h |
| D70 | 域名配置 + HTTPS上线 | 生产环境上线 | 2h |

---

## 关键里程碑

| 里程碑 | 预计日期 | 说明 |
|-------|---------|------|
| **M1: Landing Page可用** | 第2周末 | 首页可浏览，无需登录，可注册 |
| **M2: 工作台可用** | 第4周末 | 登录后进入工作台，创建项目，看到项目列表 |
| **M3: 完整创作流程Demo** | 第10周末 | 一句话→剧本→分镜→资产→生成视频（Mock全流程） |
| **M4: Beta版本** | 第13周末 | 前后端都基本完成，可内部体验 |
| **M5: 正式上线** | 第14周末 | 部署上线，SEO优化完毕 |

---

## 每天推荐工作流

```bash
# 早上开工
1. git pull origin main              # 拉最新代码
2. git checkout -b feature/xxx       # 新建feature分支

# 上午: 专注写代码
3. npm run dev                        # 本地dev server (port 3000)
4. 使用 Cursor/Claude Code 辅助编码
5. 频繁提交小commit (每完成一个小功能就 commit)

# 下午: 验证+调整
6. npm run build                      # 确保能打包
7. 在浏览器中打开 http://localhost:3000 手动验证
8. git push origin feature/xxx
9. git merge --squash to main        # 合并到main
```

---

## 风险与缓冲

| 风险 | 应对 | 缓冲时间 |
|------|------|---------|
| AI生成API接入延迟 | Mock先行，预留后2周给API对接 | +1周 |
| 视频生成模型价格变化 | 多模型适配层设计，随时切换 | 已考虑在设计中 |
| 角色一致性技术难度 | MVP先用基础方案，后期优化 | +1周缓冲 |
| 移动端适配工作量 | 第一优先级PC端，移动端次之 | 已在排期中包含 |
| **合计缓冲** | | **+1周**（总排期15周含缓冲）|
