# 剧梭 AI（ShuttleAI）- 短剧制作平台 (Monorepo)

本项目采用 **单仓库双子目录 (Monorepo)** 架构组织：

```text
ShuttleAI/
├── frontend/    # 前端 UI 与 BFF 大模型服务 (Next.js / React + Tailwind/CSS)
└── backend/     # 核心业务后端服务 (Java Spring Boot 3 + Maven)
```

---

## 🛠️ 1. 前端与 BFF 启动指南 (`frontend/`)

前端负责用户交互界面（如剧本工作台、分镜板、播放器），并包含 **Next.js BFF (Backend For Frontend)** API 路由，用于安全代理与三方大模型 (DeepSeek, OpenAI 等) 的流式 (SSE) 交互。

```bash
cd frontend

# 安装依赖
npm install

# 方式 A：运行 Vite 前端开发服务器 (默认端口 5173)
npm run dev

# 方式 B：运行 Next.js 前端及 BFF 路由 (默认端口 3000)
npm run dev:next
```

BFF 大模型流式接口：`POST /api/ai/chat`

---

## ☕ 2. 核心业务后端启动指南 (`backend/`)

后端基于 **Java 17 + Spring Boot 3** 建立，负责用户鉴权、积分算力管理、项目持久化及长任务调度。

```bash
cd backend

# 使用 Maven 编译与运行
mvn spring-boot:run
```

后端服务监听端口：`8080`
基础 API 根路径：`http://localhost:8080/api`
健康检查接口：`GET http://localhost:8080/api/health`

---

## 📄 项目相关文档
* [剧梭短剧需求文档](file:///Users/zhangshengmeng/Desktop/comfyui/ShuttleAI/%E5%89%A7%E6%A2%AD%E7%9F%AD%E5%89%A7%E9%9C%80%E6%B1%82%E6%96%87%E6%A1%A3.md)
* [用户操作文档](file:///Users/zhangshengmeng/Desktop/comfyui/ShuttleAI/%E7%94%A8%E6%88%B7%E6%93%8D%E4%BD%9C%E6%96%87%E6%A1%A3.md)
* [部署文档](file:///Users/zhangshengmeng/Desktop/comfyui/ShuttleAI/%E9%83%A8%E7%BD%B2%E6%96%87%E6%A1%A3.md)
