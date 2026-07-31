# 剧梭短剧 / Shuttle AI — 前端页面与组件设计

> **基于 juhuo.cn 的交互流程重构** | **前端优先策略**

---

## 一、路由表

```
/public (无需登录)
├── /                    Landing Page（首页）
│   ├── Hero Section
│   ├── Features Grid（6个功能卡片）
│   ├── How It Works（3步流程）
│   ├── Two Tracks（漫剧/仿真人剧对比）
│   ├── Comparison Table（对比竞品）
│   ├── Why Choose Us（6大优势）
│   └── FAQ Accordion
├── /showcase            作品案例展示页
├── /pricing             积分套餐定价页
├── /auth/login          登录页
├── /auth/register       注册页
└── /help                帮助中心

/private (需要登录)
├── /studio              工作台仪表盘（项目列表）
├── /studio/create       新建项目向导
│   ├── Step 1: 创意输入
│   ├── Step 2: 剧本编辑
│   └── Step 3: 选择风格与导出
├── /studio/[id]         项目详情编辑器
│   ├── Tab: 剧本编辑器
│   ├── Tab: 分镜画板
│   ├── Tab: 资产管理
│   ├── Tab: 角色选择
│   ├── Tab: 音频配置
│   └── Tab: 预览导出
├── /account             用户中心
│   ├── 账户信息
│   ├── 积分充值
│   └── 订单记录
└── /actors              虚拟演员库（浏览器内）

/admin (管理员)
├── /admin/dashboard     管理仪表盘
├── /admin/users         用户管理
├── /admin/orders        订单管理
├── /admin/content       内容审核
└── /admin/settings      系统设置
```

---

## 二、页面组件树详解

### 2.1 Landing Page (`/`)

```
Layout/DarkTheme
└── MainContent (px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto)
    ├── NavBar Fixed
    │   ├── Logo ("Shuttle AI" text-link with accent color)
    │   ├── NavLinks (home / showcase / pricing / help)
    │   └── AuthButtons
    │       ├── LoginButton (ghost button)
    │       └── RegisterButton (accent filled pill)
    │
    ├── HeroSection (min-h-[85vh] flex items-center relative)
    │   ├── BackgroundDecorations
    │   │   ├── FloatOrbs x3 (animated circles)
    │   │   └── MorphFireShapes x2 (morphing blobs)
    │   ├── Headline h1
    │   │   Text: "AI编剧 + 导演，一人短剧工作室"
    │   │   Style: text-display tracking-tight text-white
    │   ├── Subtitle p
    │   │   Text: "一句话开始创作你的第一部AI短剧"
    │   │   Style: text-lg text-text-secondary mt-4
    │   ├── CTAInputCard (card rounded-2xl bg-bg-secondary p-6)
    │   │   ├── InputGroup
    │   │   │   ├── CreativeInput textarea
    │   │   │   │   placeholder: "描述你的故事创意..."
    │   │   │   │   rows: 3
    │   │   │   ├── FileUploadButton
    │   │   │   │   accepts: .txt,.docx,.md,.pdf
    │   │   │   │   label: "上传剧本文件"
    │   │   │   └── FormatHint text-meta
    │   │   ├── StyleSelector Row
    │   │   │   ├── GenreSelect
    │   │   │   │   options: [都市甜宠, 古装仙侠, 悬疑推理, 科幻未来, 职场逆袭, 豪门恩怨]
    │   │   │   ├── TrackSelect
    │   │   │   │   options: [🎨 AI漫剧, 🎬 AI仿真人剧]
    │   │   │   └── EpisodeConfig
    │   │   │       ├── episodes: number input
    │   │   │       └── durationPerEp: select [1min, 2min, 3min]
    │   │   └── SubmitButton
    │   │       text: "立即创作"
    │   │       variant: accent-filled
    │   │       onClick: navigate to /studio/create
    │   ├── SocialProof
    │   │   Text: "已为 10,000+ 创作者生成 50,000+ 集短剧"
    │   │   Style: text-sm text-text-muted mt-6
    │   └── ScrollIndicator (optional)
    │
    ├── FeaturesGrid (py-20)
    │   ├── SectionHeader
    │   │   ├── Title: "六大核心能力"
    │   │   └── Subtitle: "从灵感出品，一站式完成"
    │   └── FeatureCards (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6)
    │       ├── FeatureCard×6
    │       │   ├── Icon (Lucide icon, accent colored)
    │       │   ├── Title
    │       │   ├── Description
    │       │   └── Hover effect: border-accent + glow
    │       └── Cards: AI Agent / 全能画板 / AI视频 / AI图片 / 音色克隆 / 画质增强
    │
    ├── ProcessSection (py-20 bg-bg-secondary)
    │   ├── SectionHeader
    │   │   Title: "三步创作你的短剧"
    │   └── ProcessSteps (flex flex-col md:flex-row justify-between)
    │       ├── ProcessStep×3
    │       │   ├── StepNumber (text-8xl font-bold text-accent opacity-30)
    │       │   ├── StepIcon (large icon in circle)
    │       │   ├── StepTitle
    │       │   └── StepDescription
    │       └── Connectors (arrows between steps, only on desktop)
    │
    ├── TracksComparison (py-20)
    │   ├── SectionHeader
    │   │   Title: "两种创作模式"
    │   └── TwoColumns (grid grid-cols-1 md:grid-cols-2 gap-8)
    │       ├── TrackCard
    │       │   ├── PreviewImage/Video (mock thumbnail)
    │       │   ├── TrackType (badge: AI漫剧)
    │       │   ├── Title
    │       │   ├── Description
    │       │   └── UseCases (tags list)
    │       └── Same structure for AI仿真人剧
    │
    ├── ComparisonTable (py-20)
    │   ├── SectionHeader Title: "为什么选择剧梭短剧？"
    │   └── DataTable
    │       Columns: 能力维度 / 剧梭短剧 / 单点工具 / 传统制作
    │       Rows: ~10条能力对比
    │       Highlight: 剧梭短剧列用accent高亮
    │
    ├── WhyChooseUs (py-20)
    │   ├── SectionHeader
    │   └── AdvantagesGrid (grid-cols-2 md:grid-cols-3 gap-4)
    │       └── AdvantageItem×6
    │           ├── IconCheck (accent colored)
    │           └── Label
    │
    ├── FAQSection (py-20 bg-bg-secondary)
    │   ├── SectionHeader
    │   └── FAQAccordion (max-w-3xl mx-auto)
    │       └── FAQItem×8
    │           ├── Question (clickable, shows/hides answer)
    │           └── Answer (collapsible content)
    │
    └── FinalCTA (py-24 text-center)
        ├── Headline: "准备好创作你的第一部AI短剧了吗？"
        ├── CTAButton: "免费注册，立即体验"
        └── Footer
            ├── BottomNavLinks
            ├── CopyrightInfo
            └── ICPRecordNumbers
```

---

### 2.2 认证页面 (`/auth/login`, `/auth/register`)

```
AuthLayout (full-height, centered card)
└── AuthCard (max-w-md w-full bg-bg-secondary rounded-2xl p-8)
    ├── LogoLink (→ /)
    ├── Tabs or Header
    │   └── Title: "登录 / 注册"
    ├── LoginForm / RegisterForm
    │   ├── PhoneInput
    │   │   CountryCode: 中国 +86
    │   │   Number: 11位手机号
    │   ├── CaptchaInput (optional for register)
    │   ├── CodeInputGroup (register)
    │   │   ├── CodeInput (6-digit)
    │   │   └── SendCodeButton (disabled state + countdown)
    │   ├── PasswordInput
    │   │   type: password with show/hide toggle
    │   │   strength indicator (register only)
    │   └── SubmitButton
    │       label: "获取验证码" / "登录" / "注册"
    │       disabled states handled
    ├── Divider: "或者使用"
    ├── SocialLoginButtons
    │   ├── WeChatLoginButton
    │   └── DouyinLoginButton
    └── FooterLink (switch mode: "没有账号？去注册")
```

---

### 2.3 作品展示页 (`/showcase`)

```
ShowcasePage
└── MainContent
    ├── Header
    │   ├── Title: "Shuttle AI 片场"
    │   └── Subtitle: "来自创作者的真实作品"
    ├── FilterBar
    │   ├── GenreFilter (chips/tags)
    │   │   All / 都市甜宠 / 古装仙侠 / ...
    │   ├── TrackFilter (toggles)
    │   │   AI漫剧 / AI仿真人剧 / 全部
    │   └── SortSelect
    │       Newest / MostViewed / Recommended
    ├── VideoGrid (masonry/waterfall layout)
    │   └── VideoCard×N
    │       ├── ThumbnailContainer
    │       │   ├── ThumbnailImage
    │       │   └── PlayOverlay (circle play icon)
    │       │       hover: scale(1.05) + dark overlay
    │       ├── BadgeRow
    │       │   ├── GenreBadge
    │       │   └── TrackBadge
    │       ├── EpInfo
    │       │   Episodes count
    │       ├── Title (truncated)
    │       └── MetaRow
    │           ├── CreatorAvatar + Name
    │           └── ViewCount
    └── LoadMoreButton or InfiniteScrollTrigger
```

---

### 2.4 定价页 (`/pricing`)

```
PricingPage
└── MainContent
    ├── Header
    │   ├── Title: "选择适合你的方案"
    │   └── Subtitle: "算力积分制，充多少用多少，永不过期"
    ├── CreditCalculator (interactive tool)
    │   ├── Sliders
    │   │   └── "预计每月几集短剧？" slider [1-100]
    │   └── ResultDisplay
    │       ├── EstimatedCost: "约 ¥XXX/月"
    │       └── RequiredCredits: "需要 XXXX 积分"
    ├── PricingTiers (grid md:grid-cols-2 lg:grid-cols-4 gap-6)
    │   └── PricingCard×4
    │       ├── PlanName (体验包/入门包/标准包/专业包)
    │       ├── Price
    │       │   ├── Amount: "¥599"
    │       │   └── Credits: "+ 3,000 积分"
    │       ├── FeaturesList (bulleted)
    │       │   - 约合 XX 秒视频时长
    │       │   - 适合 XX 集短剧
    │       │   - 积分永不过期
    │       └── PurchaseButton
    │           Primary for "标准包"(recommended)
    │           outline for others
    │       Badge: "最受欢迎" (on recommended tier)
    ├── CostBreakdown
    │   ├── Title: "消耗参考（单集 2 分钟）"
    │   └── CostTable
    │       ├── Row: 视频生成 — ~1,500 积分
    │       ├── Row: 剧本交互 — ~300 积分
    │       ├── Row: 资产生成 — ~100 积分
    │       └── Row: 配音配乐 — ~100 积分
    │       ─────────────
    │       Total: ~2,000 积分 ≈ ¥200/集
    ├── PartnerPlanBanner
    │   Icon: hand-shake / rocket
    │   Title: "伙剧计划 — 零成本创作"
    │   Description: 平台垫付算力，盈利后分成
    │   ApplyButton: "申请加入"
    └── FAQ (reuse FAQ section)
```

---

### 2.5 工作台仪表盘 (`/studio`)

```
StudioLayout (full workspace)
├── TopBar
│   ├── StudioLogo ("Shuttle AI · 工作台")
│   ├── ProjectBreadcrumbs (if in project)
│   └── RightActions
│       ├── NotificationBell
│       ├── CreditsBadge
│       │   Shows current balance + link to recharge
│       └── UserMenu (avatar dropdown)
│           ├── Account
│           ├── Recharge
│           ├── Logout
│           └── ThemeToggle (optional)
│
├── Sidebar (left, collapsible)
│   ├── NavItem × N
│   │   ├── NewProjectButton (accent button at top)
│   │   ├── DashboardNavItem (active)
│   │   └── Separator
│   └── RecentProjects (scrollable list)
│       └── MiniProjectCard×5
│           ├── ProjectThumbnail
│           ├── Title
│           ├── StatusDot
│           └── LastEdited meta
│
├── MainContentArea
│   │
│   ├── EmptyState (no projects)
│   │   ├── Illustration/Icon
│   │   ├── Title: "还没有项目"
│   │   └── CreateFirstProjectButton (accent primary)
│   │
│   └── ProjectsListView (has projects)
│       ├── SectionHeader
│       │   Title: "我的短剧"
│       │   └── FilterTabs
│       │       ├── All / Scripting / Producing / Done
│       ├── StatsBar (top of list)
│       │   ├── Card: 总项目数
│       │   ├── Card: 进行中
│       │   ├── Card: 已完成
│       │   └── Card: 累计积分消耗
│       ├── ProjectsGrid (grid 1 col mobile / 2 col tablet / 3 col desktop)
│       │   └── ProjectCard×N
│       │       ├── CoverImage (generated or blank)
│       │       ├── GradientOverlay (cover bottom)
│       │       ├── Title (on cover)
│       │       ├── MetaRow (on cover)
│       │       │   ├── Genre tag
│       │       │   ├── Episodes progress "8/50"
│       │       │   └── Status badge
│       │       └── Click → navigate to /studio/[id]
│       └── Pagination or LoadMore
│
└── Modals / Dialogs
    ├── DeleteProjectConfirmDialog
    ├── DuplicateProjectDialog
    └── RechargeCreditsModal (slide-over from right)
```

---

### 2.6 新建项目向导 (`/studio/create`)

```
CreateWizard (fullscreen modal-like)
├── WizardProgressBar (top fixed bar)
│   ├── StepIndicator×3
│   │   ├── Circle number (1/2/3)
│   │   ├── StepLabel
│   │   └── ConnectorLine
│   │   States: completed(filled) / active(accent ring) / pending(outline)
│   ├── CloseButton (×, exit wizard without saving)
│   └── AutoSaveStatus ("已自动保存 14:32")
│
├── StepContent (centered card area)
│   │
│   ├── Step1: 创意输入
│   │   ├── ModeSwitcher
│   │   │   ├── OneSentenceMode (default tab)
│   │   │   └── UploadFileMode
│   │   ├── IdeaInputArea
│   │   │   ├── TextInputArea
│   │   │   │   placeholder: "用一句话描述你的故事。例如：都市白领穿越到古代成为将军，凭借现代知识改变天下格局..."
│   │   │   │   autosize textarea, max 500 chars
│   │   │   ├── CharacterCounter (right-aligned, text-meta)
│   │   │   └── ExampleIdeas (expandable hints)
│   │   │       "点击这里查看灵感示例 →"
│   │   │       3 random example prompts
│   │   ├── ConfigRow
│   │   │   ├── GenreSelect
│   │   │   ├── TrackSelect (AI漫剧/AI仿真人剧)
│   │   │   ├── EpisodeCount (1-100)
│   │   │   └── DurationSelect [1min, 2min, 3min]
│   │   └── ActionButtons
│   │       ├── NextButton: "生成剧本" (primary, accent)
│   │       └── SaveDraftButton (secondary, outline)
│   │
│   ├── Step2: 剧本编辑
│   │   ├── ScriptEditorPanel
│   │   │   ├── LeftPanel: Outline & Characters
│   │   │   │   ├── OutlineCollapsible
│   │   │   │   │   Generated storyline outline (from mock LLM)
│   │   │   │   │   Editable inline
│   │   │   │   ├── CharacterProfiles[]
│   │   │   │   │   Each profile card with avatar placeholder
│   │   │   │   │   Editable fields: name, age, appearance, personality
│   │   │   │   └── SceneSettings
│   │   │   ├── RightPanel: Episode Scripts
│   │   │   │   ├── EpisodeTabBar (Episode 1, 2, 3...)
│   │   │   │   └── ScriptContent
│   │   │   │       ├── SceneBlock×M per episode
│   │   │   │       │   ├── SceneHeader (INT./EXT., location, time)
│   │   │   │       │   ├── ActionLines (editable)
│   │   │   │       │   ├── DialogueBlocks×K
│   │   │   │       │   │   ├── CharacterName (colored by character)
│   │   │   │       │   │   ├── DialogueText (editable)
│   │   │   │       │   │   └── Parenthetical (optional direction)
│   │   │   │       │   └── CameraNotes (optional AI suggestion)
│   │   │   └── BottomPanel: AI Chat
│   │   │       ├── MessageBubbleList
│   │   │       │   ├── AIMessage (left aligned, subtle bg)
│   │   │       │   └── UserMessage (right aligned, accent tint)
│   │   │       └── ChatInput
│   │   │           Placeholder: "修改第2集的冲突节奏 / 给主角换个性格 ..."
│   │   └── ActionButtons
│   │       ├── PrevButton
│   │       ├── ReviewButton: "审查剧本" (triggers mock review agent)
│   │       └── NextButton: "下一步：分镜" (primary)
│   │
│   └── Step3: 导出设置
│       ├── VisualStylePicker
│       │   ├── StylePreviewGrid
│       │   │   └── StyleOption×8
│       │   │       ├── PreviewThumbnail
│       │   │       ├── StyleName (写实/国风水墨/赛博朋克/复古胶片/动漫/漫画/油画/水彩)
│       │   │       └── Selected border/highlight
│       │   └── ColorPaletteSelector
│       │       Predefined palettes + custom color pickers
│       ├── VoiceConfig
│       │   ├── VoiceTypeSelect [温柔女声/磁性男声/可爱少女/沧桑老者/中性]
│       │   └── BGMStyleSelect [抒情/紧张/欢快/悲壮/悬疑]
│       ├── SubtitleStyle
│       │   └── SubtitlePreview
│       └── ActionButtons
│           ├── GenerateButton: "一键生成" (primary, large)
│           └── PreviewButton: "预览首集" (secondary)
│
└── SidePanel (right, expandable)
    ├── QuickTips
    │   Tips about best practices for short drama writing
    └── ResourceLinks
        Links to virtual actor library, style gallery
```

---

### 2.7 项目详情页 (`/studio/[id]`)

这是最复杂的页面——项目编辑器的核心工作区。

```
ProjectWorkspace
├── TopBar (compact)
│   ├── BackToDashboard (<)
│   ├── ProjectTitle (editable inline)
│   ├── StatusIndicator (dot + label)
│   ├── AutoSaveStatus
│   └── Actions
│       ├── ExportDropdown
│       ├── ShareButton
│       └── MoreActions (...)
│
├── StageStepper (horizontal, below topbar)
│   Steps: ①剧本 ✓ → ②分镜 ✓ → ③资产 ● → ④配音 ● → ⑤渲染 ○ → ⑥导出 ○
│   States: completed(filled green), active(accent underline), pending(gray outline)
│
├── ContentArea (below stepper, tab-based)
│   │
│   ├── TabScript (剧本编辑器)
│   │   └── Same as Step2 RightPanel above
│   │
│   ├── TabStoryboard (分镜画板)
│   │   ├── StoryboardHeader
│   │   │   ├── Title: "智能分镜"
│   │   │   ├── GenerateStoryboardsButton (call AI)
│   │   │   └── ViewModeToggle (grid/list)
│   │   ├── ShotGrid (responsive grid)
│   │   │   └── ShotCard×N
│   │   │       ├── ThumbnailContainer
│   │   │       │   ├── MockAIImageUrl
│   │   │       │   ├── PlayOverlay (for generated video clips)
│   │   │       │   └── ExpandButton (fullscreen preview)
│   │   │       ├── ShotMetaRow
│   │   │       │   ├── ShotNumber (#01)
│   │   │       │   ├── ShotType (特写/中景/全景 badge)
│   │   │       │   └── Duration (3.5s tag)
│   │   │       ├── CameraNotes (small text)
│   │   │       └── DragHandle (reorder)
│   │   └── TimelineStrip (bottom thin strip)
│   │       └── Sequential shot thumbnails in a scrolling row
│   │
│   ├── TabAssets (资产管理)
│   │   ├── AssetTabs (Characters / Scenes / Props)
│   │   │
│   │   │   ├── CharactersSubTab
│   │   │   │   ├── AddCharacterButton
│   │   │   │   └── CharacterCarousel/Grid
│   │   │   │       └── CharacterCard×N
│   │   │   │           ├── PortraitImage (circular/large)
│   │   │   │           ├── Name + Role badge
│   │   │   │           ├── VoiceTag
│   │   │   │           └── OutfitPreviews (small thumbnails)
│   │   │   │
│   │   │   ├── ScenesSubTab
│   │   │   │   ├── SceneCard×N
│   │   │   │   │   ├── BackgroundImage
│   │   │   │   │   ├── LocationName
│   │   │   │   │   └── Mood tags
│   │   │   │   └── GenerateSceneButton
│   │   │   │
│   │   │   └── PropsSubTab
│   │   │       └── PropCard×N (image + name + usage context)
│   │   │
│   │   └── CanvasBoard (visual asset board)
│   │       ├── Draggable asset cards
│   │       ├── Selection tools
│   │       └── Zoom/Pan controls
│   │
│   ├── TabAudio (音频配置)
│   │   ├── VoiceAssignments
│   │   │   └── For each character: VoiceSelect + PreviewButton
│   │   ├── BGMConfiguration
│   │   │   ├── BGMStyleCard×Selected
│   │   │   ├── VolumeSlider
│   │   │   └── ImportLocalAudioButton
│   │   ├── SFXTrack
│   │   │   └── Automatic sound effects list with toggles
│   │   └── AudioTimeline (horizontal waveforms per track)
│   │
│   ├── TabRender (渲染队列)
│   │   ├── GenerationQueue
│   │   │   └── QueueItem×N (shots being processed)
│   │   │       ├── ShotNumber + Status
│   │   │       ├── ProgressBar (percentage + ETA)
│   │   │       ├── Thumbnail (progressive loading)
│   │   │       └── RegenerateButton (retry failed)
│   │   ├── GenerateAllButton (trigger batch generation)
│   │   └── BatchProgressSummary
│   │       ├── Overall: "12/50 completed • ~8 min remaining"
│   │       └── ProgressRing or LinearProgress
│   │
│   └── TabExport (预览导出)
│       ├── VideoPlayer (full-width preview player)
│       │   Controls: native or custom
│       │   Episode selector dropdown
│       ├── QualityPreview (side-by-side comparison if re-rendered)
│       ├── SubtitlePreviewToggle
│       └── ExportOptions
│           ├── ExportFormat [MP4]
│           ├── Resolution [720P/1080P/2K]
│           ├── AspectRatio [9:16竖屏 / 16:9横屏]
│           └── DownloadButton (or PackageDownload for all)
│
└── GlobalShortcuts (hint)
    Ctrl+S: Save draft
    Escape: Close fullscreen previews
    ← → : Switch tabs
```

---

### 2.8 虚拟演员库 (`/actors`)

```
ActorLibraryPage
└── MainContent
    ├── Header
    │   ├── Title: "虚拟演员库"
    │   └── SearchAndFilter
    │       ├── SearchInput
    │       ├── AgeFilter [全部, 少年, 青年, 中年, 老年]
    │       ├── GenderFilter [全部, 男, 女]
    │       └── StyleFilter [全部, 古风, 现代, 奇幻]
    ├── ActorGrid (columns responsive)
    │   └── ActorCard×N
    │       ├── PortraitImage (large circular portrait)
    │       ├── ActorName
    │       ├── Tags (age, gender, style pills)
    │       ├── PersonalityBrief (short description)
    │       └── SelectButton (outline, becomes "已选" when assigned)
    └── MyCharacters (separate section after grid)
        ├── Title: "我创建的角色"
        └── CustomCharacterCard×N
            ├── Portrait
            ├── Name + Edit
            └── DeleteButton
```

---

## 三、全局布局组件

### Layout.tsx — 深色主题外壳

```tsx
// src/layouts/DarkLayout.tsx
export default function DarkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="dark" className="bg-bg-primary text-text-primary min-h-screen">
      {/* Background ambient decorations */}
      <BackgroundDecorations />
      <NavBar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
```

### StudioLayout.tsx — 工作台布局

```tsx
// src/layouts/StudioLayout.tsx
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-bg-secondary flex flex-col overflow-hidden">
      <StudioTopBar />
      <div className="flex flex-1 overflow-hidden">
        <StudioSidebar />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
```

### Modal/Fullscreen Overlay

```tsx
// Components used across pages
import {
  Button,       // Pill buttons, ghost, outline variants
  Card,         // Content containers
  Dialog,       // Confirmation dialogs
  DropdownMenu, // Action menus
  Input,        // Form inputs
  Select,       // Dropdown selects
  Tabs,         // Tab navigation
  Toast,        // Success/error notifications
  Badge,        // Status indicators
  Avatar,       // User/character portraits
  Progress,     // Loading/progress bars
  Slider,       // Range inputs
  Tooltip,      // Hover hints
  Skeleton,     // Loading placeholders
  Separator,    // Visual dividers
} from '@/components/ui'
```

---

## 四、Mock数据策略

所有AI相关接口在开发阶段返回 Mock 数据，保证前端可以独立开发和演示。

```typescript
// src/mocks/data.ts
export const MOCK_SCRIPT = {
  outline: '都市白领苏晓意外穿越到古代...",
  characters: [
    { id: 'c1', name: '苏晓', age: 26, role: '女主', personality: '聪明机智...' },
    { id: 'c2', name: '萧逸', age: 28, role: '男主', personality: '冷峻霸气...' },
  ],
  episodes: [
    {
      id: 'e1', number: 1, title: '穿越',
      scenes: [{
        id: 's1', location: '现代办公室',
        dialogues: [
          { character: '苏晓', text: '这份报告今天必须做完...' }
        ]
      }]
    }
  ]
};

export const MOCK_SHOTS = Array.from({ length: 20 }, (_, i) => ({
  id: `shot-${i}`,
  number: i + 1,
  type: ['特写','中景','全景'][Math.floor(Math.random()*3)],
  duration: +(Math.random() * 4 + 1).toFixed(1),
  cameraNote: '缓慢推近',
  thumbnailUrl: `/placeholder/shot-${i}.jpg`,
}));

export const MOCK_ACTORS = [
  { id: 'a1', name: '林婉清', portraitUrl: '...', age: '青年', gender: '女', style: '古风' },
  { id: 'a2', name: '顾长风', portraitUrl: '...', age: '青年', gender: '男', style: '古风' },
  // ... more
];
```
