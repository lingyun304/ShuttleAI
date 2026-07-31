# 剧梭短剧 — ShuttleAI

> **"一句话，穿梭成剧"** — 基于 AI 驱动的全流程短剧创作与智能生成平台

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 📖 项目简介

**剧梭短剧 (ShuttleAI)** 是一款极简且高效的 AI 短剧创作工具平台。涵盖从**剧本创作、角色设计、分镜生成、多轨时序编辑到视频渲染与发布**的全流程体验。

平台集成了主流 AI 语言模型（GPT-4, Claude 3.5, DeepSeek 等）与多模态生成引擎（Midjourney, Flux, Kling, Runway, Sora 等），支持创作者快速将一句话概念转化为高品质短剧作品。

---

## ✨ 核心功能亮点

- 🎬 **剧梭 Studio (创作工作台)**
  - **剧本生成与编辑**: 智能提示词解析、分集剧本生成与多语言角色对话推演
  - **分镜智能拆解**: 提示词/镜头控制/九宫格多视角分镜预览
  - **资产角色库 (Actors Studio)**: AI 动态演员一致性控制、高保真声音克隆与形象定制
  - **多轨时序编辑器**: 支持视频、音频、字幕、特效的多轨道拖拽编辑与实时预览
  - **云端/本地合成**: 集成 Web/FFmpeg 视频剪辑与高画质导出

- 🌟 **精选剧场 (Showcase)**
  - 全网优秀短剧作品展示、灵感库、多维度热度排行榜

- 🎭 **AI 虚拟演员市场 (Actors)**
  - 精选 AI 模特与演员包，支持一键加载至创作工作台

- ⚙️ **模型与引擎配置 (Model Settings)**
  - 自定义 API Key 配置、LLM 引擎切换、画质/视频生成参数设置

---

## 🛠️ 技术栈 (Tech Stack)

### 前端技术
- **核心框架**: React 18
- **构建工具**: Vite 5
- **UI & 样式**: Custom Design System + CSS Modules / Glassmorphism Design
- **图标库**: Lucide React
- **多媒体处理**: Web Audio API / FFmpeg.wasm

---

## 🚀 快速开始 (Quick Start)

### 1. 简要环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 2. 克隆仓库与安装依赖

```bash
git clone https://github.com/lingyun304/ShuttleAI.git
cd ShuttleAI

# 安装依赖
npm install
```

### 3. 本地开发运行

```bash
npm run dev
```

运行后在浏览器中打开 `http://localhost:5173` 即可查看项目。

### 4. 项目打包

```bash
npm run build
```

---

## 📁 目录结构 (Directory Structure)

```text
ShuttleAI/
├── public/                 # 静态资源文件
├── doc/                    # 设计规范与详细需求文档
│   ├── API_SPEC.md         # API Specification
│   ├── DESIGN_TOKENS.md    # UI/UX 设计规范令牌
│   ├── PRD_ORIGINAL.md     # 原始产品需求说明书
│   └── README_PROJECT.md   # 项目文档清单指南
├── src/
│   ├── assets/             # 图片、音视频等静态资源
│   ├── components/         # 核心组件库
│   │   ├── Studio/         # 剧梭工作台子组件 (剧本/分镜/多轨编辑器/渲染)
│   │   ├── Header.jsx      # 全局导航头
│   │   ├── JuhuoStudio.jsx # 剧梭主工作台容器
│   │   └── ...             # Showcase, Actors, Admin 等页面
│   ├── services/           # 模型驱动、FFmpeg 剪辑与 Mock 数据服务
│   ├── App.jsx             # 应用程序根组件
│   └── main.jsx            # React 入口文件
├── index.html              # HTML 入口
├── package.json            # 依赖与脚本配置
└── vite.config.js          # Vite 构建配置
```

---

## 📄 相关文档

关于项目的更多详细设计与规划，请参阅 `doc/` 目录中的以下文档：
- 📘 [设计规范令牌 (Design Tokens)](./doc/DESIGN_TOKENS.md)
- 📗 [前端组件架构 (Frontend Components)](./doc/FRONTEND_COMPONENTS.md)
- 📙 [API 契约规范 (API Spec)](./doc/API_SPEC.md)
- 📕 [项目与技术排期 (Development Schedule)](./doc/DEVELOPMENT_SCHEDULE.md)

---

## 📜 许可证 (License)

[MIT License](LICENSE)
