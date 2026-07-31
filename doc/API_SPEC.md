# ShuttleAI — API契约规范

> **策略**: RESTful JSON API，前端先用 Mock Server 拦截，后期直接对接真实后端无需改代码。  
> **基础URL**: `/api` | **Content-Type**: `application/json` | **Auth Header**: `Authorization: Bearer <token>`

---

## 一、统一响应格式

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

### 错误响应

```json
{
  "code": 4001,
  "message": "积分不足，请充值",
  "data": null
}
```

| code 范围 | 含义 |
|-----------|------|
| 0 | 成功 |
| 1000-1999 | 客户端错误（参数校验等） |
| 2000-2999 | 认证/授权错误 |
| 3000-3999 | 业务逻辑错误（积分不足等） |
| 5000-5999 | 服务端错误 |

---

## 二、认证API

### POST /api/auth/send-code
发送验证码

**Request:**
```json
{ "phone": "13800138000" }
```

**Response:** `{}`

### POST /api/auth/login
手机号+验证码登录

**Request:**
```json
{ "phone": "13800138000", "code": "123456" }
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "token": "eyJ...",
    "refreshToken": "eyJ...",
    "user": {
      "id": "u-xxx",
      "phone": "138****8000",
      "nickname": "创作者小王",
      "creditsBalance": 3000,
      "avatarUrl": null,
      "isVerified": false
    }
  }
}
```

### GET /api/user/me
获取当前用户信息

**Response:** 同 login response 中的 `user`

### PUT /api/user/profile
更新用户资料

**Request:**
```json
{ "nickname": "新名字", "avatarUrl": "https://..." }
```

---

## 三、项目管理API

### GET /api/projects
获取我的项目列表

**Query Params:**
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| page | number | 1 | 页码 |
| pageSize | number | 20 | 每页数量 |
| status | string | all | all \| scripting \| producing \| done |

**Response:**
```json
{
  "code": 0,
  "data": {
    "total": 5,
    "page": 1,
    "projects": [
      {
        "id": "p-001",
        "title": "都市穿越风云",
        "coverUrl": "https://...",
        "genre": "urban-romance",
        "track": "live-action",
        "currentEpisode": 8,
        "totalEpisodes": 50,
        "status": "producing",
        "createdAt": "2026-07-15T10:00:00Z",
        "updatedAt": "2026-07-28T14:30:00Z"
      }
    ]
  }
}
```

### POST /api/projects
创建新项目

**Request:**
```json
{
  "title": "都市穿越风云",
  "idea": "一个都市白领穿越回古代成为将军的故事",
  "genre": "urban-romance",
  "track": "live-action",
  "totalEpisodes": 50,
  "episodeDuration": 120
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "p-002",
    "status": "draft"
  }
}
```

### PATCH /api/projects/{id}
更新项目信息

**Request:** `{ "title": "新标题", ... }`

### DELETE /api/projects/{id}
删除项目

### GET /api/projects/{id}
获取项目详情（包含剧本、分镜、资产等完整信息）

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "p-001",
    "title": "都市穿越风云",
    "genre": "urban-romance",
    "track": "live-action",
    "visualStyle": "realistic",
    "colorPalette": ["#FFB6C1","#2F4F4F"],
    "status": "producing",
    "outline": "故事大纲...",
    "characters": [
      {
        "id": "c-001",
        "name": "苏晓",
        "portraitUrl": "https://...",
        "appearance": "温婉大气，齐肩短发",
        "personality": "外柔内刚",
        "ageRange": "青年",
        "voiceId": "v-warm-female-01",
        "costumes": [
          { "id": "co-01", "name": "现代职业装", "imageUrl": "https://..." },
          { "id": "co-02", "name": "古装战袍", "imageUrl": "https://..." }
        ]
      }
    ],
    "episodes": [
      {
        "id": "e-001",
        "number": 1,
        "title": "穿越",
        "scenes": [
          {
            "id": "s-001",
            "location": "INT. 办公室 - 夜",
            "actionLine": "苏晓揉着疲惫的眼睛，盯着电脑屏幕...",
            "dialogues": [
              { "characterId": "c-001", "text": "这份报告明天就必须交..." },
              { "characterId": "c-002", "text": "放心吧主管，今晚一定搞定。" }
            ]
          }
        ]
      }
    ],
    "storyboards": [
      {
        "id": "sb-001",
        "shotNumber": 1,
        "episodeId": "e-001",
        "sceneDescription": "特写镜头，苏晓疲惫的脸",
        "shotType": "close-up",
        "cameraMovement": "缓慢推近",
        "duration": 3.5,
        "thumbnailUrl": "https://...",
        "videoUrl": null,
        "status": "pending"
      }
    ]
  }
}
```

---

## 四、剧本Agent API

### POST /api/agents/script/generate
生成剧本

**Request:**
```json
{
  "projectId": "p-001",
  "input": "都市白领穿越回古代当将军",
  "genre": "urban-romance",
  "totalEpisodes": 50,
  "episodeDuration": 120
}
```

**Response (SSE流式):**
```json
// Server-Sent Events format
data: {"type":"outline","content":"...正在生成大纲..."}
data: {"type":"characters","content":[...]}}
data: {"type":"episodes","episode":1,"partial":"...第1集内容..."}
data: {"type":"complete","data":{"outline":"...","characters":[...],"episodes":{...}}}
```

### POST /api/agents/script/review
剧本审查

**Request:**
```json
{
  "projectId": "p-001",
  "focusArea": "conflict-density"  // conflict-density | logic | dialogue | compliance
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "score": 78,
    "issues": [
      {
        "type": "conflict",
        "severity": "warning",
        "episode": 3,
        "scene": 2,
        "description": "本集冲突密度偏低，建议在第5场增加反转",
        "suggestion": "让反派突然出现夺走关键道具"
      }
    ],
    "emotionalCurve": [
      {"episode": 1, "value": 65},
      {"episode": 2, "value": 72},
      {"episode": 3, "value": 45}
    ]
  }
}
```

### PATCH /api/projects/{id}/script
更新剧本内容

**Request:**
```json
{
  "episodeId": "e-001",
  "sceneId": "s-001",
  "dialogues": [
    { "characterId": "c-001", "text": "修改后的对白" }
  ]
}
```

---

## 五、AI导演（分镜）API

### POST /api/agents/storyboard/generate
生成智能分镜

**Request:**
```json
{
  "episodeId": "e-001"
}
```

**Response (SSE流式):**
```json
data: {"type":"progress","current":5,"total":20}
data: {"type":"shots", "shots":[...20个分镜对象...]}
data: {"type":"complete"}
```

### PATCH /api/storyboards/{id}
调整单个分镜

**Request:**
```json
{
  "shotType": "wide-shot",
  "cameraMovement": "pan right",
  "duration": 4.2
}
```

### PUT /api/storyboards/{id}/order
批量调整分镜顺序

**Request:**
```json
{
  "shotOrderIds": ["sb-003", "sb-001", "sb-002", "sb-004"]
}
```

---

## 六、视频生成 API

### POST /api/jobs/video/generate
提交视频生成任务

**Request:**
```json
{
  "shotIds": ["sb-001", "sb-002", "sb-003"],
  "model": "seedance-2",
  "quality": "standard",       // standard | enhanced
  "style": "realistic",         // realistic | anime | manga | ink | cyberpunk
  "extendFromPreviousShot": true  // Enable continuity generation
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "batchId": "batch-xyz",
    "estimatedWaitSeconds": 180
  }
}
```

### GET /api/jobs/{batchId}
查询视频生成进度

**Response:**
```json
{
  "code": 0,
  "data": {
    "batchId": "batch-xyz",
    "status": "processing",     // queued | processing | completed | failed
    "totalShots": 3,
    "completedShots": 1,
    "failedShots": 0,
    "etaSeconds": 90,
    "shots": [
      {
        "shotId": "sb-001",
        "status": "completed",
        "progress": 100,
        "resultUrl": "https://oss.../video/sb-001.mp4"
      },
      {
        "shotId": "sb-002",
        "status": "processing",
        "progress": 60,
        "resultUrl": null
      },
      {
        "shotId": "sb-003",
        "status": "queued",
        "progress": 0,
        "resultUrl": null
      }
    ]
  }
}
```

### POST /api/jobs/{shotId}/regenerate
重新生成失败的分镜

**Response:** `{ "batchId": "batch-retry-abc", "estimatedWaitSeconds": 30 }`

### GET /api/jobs/batch-progress?projectId=p-001
查询项目整体渲染进度

**Response:**
```json
{
  "code": 0,
  "data": {
    "totalEpisodes": 50,
    "completedEpisodes": 12,
    "overallProgress": 24,
    "etaMinutes": 8
  }
}
```

---

## 七、音频与字幕 API

### POST /api/agents/audio/generate
生成配音配乐

**Request:**
```json
{
  "episodeId": "e-001",
  "voiceAssignments": {
    "c-001": "warm-female-01",
    "c-002": "deep-male-01"
  },
  "bgmStyle": "tense",
  "subtitles": {
    "enabled": true,
    "style": "default"   // default | bold | elegant
  }
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "audioFileUrl": "https://...",
    "subtitleUrl": "https://.../e-001.srt",
    "lipSyncData": { /* mouth movement timing data */ },
    "duration": 125.4
  }
}
```

---

## 八、资产管理 API

### GET /api/actors
获取虚拟演员库

**Query Params:** age?, gender?, style?

**Response:** Actor数组

### GET /api/actors/my
获取我创建的角色

### POST /api/projects/{id}/actors/assign
为角色分配演员

**Request:**
```json
{
  "characterId": "c-001",
  "actorId": "a-01",
  "costumeId": "co-01"
}
```

### POST /api/agents/asset/generate
生成场景/道具图片

**Request:**
```json
{
  "projectId": "p-001",
  "type": "scene",           // scene | prop
  "description": "古色古香的军营中帐"
}
```

**Response (image generation progress):**
```json
{
  "code": 0,
  "data": {
    "assetId": "asset-001",
    "status": "generating",
    "resultUrl": "https://...",   // populated when complete
    "estimatedSeconds": 15
  }
}
```

---

## 九、支付API

### GET /api/credits/packages
获取积分套餐列表

**Response:**
```json
{
  "code": 0,
  "data": [
    {
      "id": "pkg-trial",
      "name": "体验包",
      "price": 59,
      "credits": 500,
      "recommended": false
    },
    {
      "id": "pkg-standard",
      "name": "标准包",
      "price": 2999,
      "credits": 33000,
      "recommended": true
    }
  ]
}
```

### POST /api/payments/create
创建支付订单

**Request:**
```json
{
  "packageId": "pkg-standard",
  "channel": "wechat"   // wechat | alipay
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "orderId": "ord-xxx",
    "paymentUrl": "weixin://...",   // WeChat QR code URL
    "expireAt": "2026-07-31T15:00:00Z"
  }
}
```

### POST /api/payments/callback
支付回调通知

### GET /api/payments/my
获取我的交易记录

---

## 十、作品展示API

### GET /api/showcase
获取展示作品列表

**Query Params:** page?, genre?, track?, sort?

**Response:**
```json
{
  "code": 0,
  "data": {
    "total": 120,
    "works": [
      {
        "id": "w-001",
        "title": "月下将军传",
        "author": "ShuttleAI创作者：编剧老张",
        "genre": "ancient-warrior",
        "track": "live-action",
        "totalEpisodes": 50,
        "coverUrl": "https://...",
        "previewVideoUrl": "https://...",
        "viewCount": 128000,
        "likeCount": 8500
      }
    ]
  }
}
```

---

## 十一、Mock数据代理配置

开发阶段使用 Next.js API Route 作为 Mock Server。

```typescript
// src/app/api/mock/[...path]/route.ts
// 所有 /api/mock/* 请求返回预定义的mock数据

const mockDb = {
  projects: [...],
  scripts: {...},
  shots: [...],
  actors: [...],
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname.replace('/api/mock', '');
  
  // Route matching
  if (path === '/projects') return json({ data: mockDb.projects });
  if (path === '/agents/script/generate') return sseStream(mockScriptGenerationStream());
  // ... more routes
}

// 模拟延迟
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
```

**切换策略**：用一个环境变量控制使用 Mock 还是真实API：

```typescript
// src/lib/api.ts
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export async function fetchProjects(page = 1) {
  const endpoint = USE_MOCK ? '/api/mock/projects' : '/api/projects';
  const res = await fetch(`${endpoint}?page=${page}`);
  return res.json();
}
```
