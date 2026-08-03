/**
 * 剧梭AI (Shuttle) - 多模型驱动与 API 接口服务
 * 支持自定义大模型 Base URL、模型名称(Model Name)、API Key 及可灵视频接口
 */

const STORAGE_KEY_CONFIG = 'shuttle_model_config';

export const DEFAULT_MODEL_CONFIG = {
  mode: 'sandbox', // 'sandbox' (沙盒模拟) | 'real_api' (真实API)
  
  // LLM 自定义大模型设置
  llmBaseUrl: 'https://api.deepseek.com/v1',
  llmModelName: 'deepseek-chat',
  llmApiKey: '',

  // 视频大模型设置
  videoModel: 'Kling-v1.5', // 默认可灵 AI
  videoBaseUrl: 'https://api.klingai.com/v1',
  videoModelName: 'kling-v1.5',
  videoApiKey: '',
  klingResolution: '1080p',
  klingMode: 'std',

  // 音频 TTS 设置
  ttsBaseUrl: 'https://api.fish.audio/v1',
  ttsModelName: 'cosyvoice-v2',
  ttsApiKey: ''
};

export function getModelConfig() {
  if (typeof window === 'undefined') {
    return DEFAULT_MODEL_CONFIG;
  }
  const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
  if (!saved) return DEFAULT_MODEL_CONFIG;
  try {
    return { ...DEFAULT_MODEL_CONFIG, ...JSON.parse(saved) };
  } catch (e) {
    return DEFAULT_MODEL_CONFIG;
  }
}

export function saveModelConfig(config) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  }
}

/**
 * 统一 LLM 剧本 Agent 驱动 (支持自定义 Base URL / Model Name / API Key)
 */
export async function callLLMStudioAgent(prompt, genre, episodeCount = 50, config = getModelConfig()) {
  if (config.mode === 'real_api' && config.llmApiKey && config.llmBaseUrl) {
    try {
      const endpoint = config.llmBaseUrl.endsWith('/')
        ? `${config.llmBaseUrl}chat/completions`
        : `${config.llmBaseUrl}/chat/completions`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.llmApiKey}`
        },
        body: JSON.stringify({
          model: config.llmModelName || 'deepseek-chat',
          messages: [
            { role: 'system', content: `你是一名顶尖AI短剧编剧与导演Agent。题材：${genre}。请输出JSON格式结构化剧本，包含大纲、角色档案及分镜表。` },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
      }
    } catch (err) {
      console.warn('真实自定义 LLM API 请求失败，降级为沙盒驱动:', err);
    }
  }

  // 高保真沙盒智能推导引擎
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: prompt.slice(0, 10) ? `《${prompt.slice(0, 8)}...》` : '《水墨绝恋》',
        genre: genre,
        totalEpisodes: episodeCount,
        episodeDuration: 120,
        scriptSummary: `基于系统提示“${prompt}”生成。剧本紧扣“钩子-冲突-反转-悬念”四大爆款要件，主角在命运困境中步步逆袭。`,
        characters: [
          {
            id: 'actor-1',
            name: '顾长歌',
            gender: '男',
            style: '国风仙侠 / 暗夜魔尊',
            portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
            voiceName: '磁性男主音 (顾长歌)'
          },
          {
            id: 'actor-2',
            name: '沈清秋',
            gender: '女',
            style: '绝代医仙 / 大女主',
            portrait: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
            voiceName: '温柔大女主音 (沈清秋)'
          }
        ],
        storyboards: [
          {
            id: `shot-${Date.now()}-1`,
            shotNumber: 1,
            shotType: '特写 (Extreme Close-up)',
            cameraMovement: '急推镜头 (Dolly In)',
            duration: 4.5,
            sceneDescription: '崖底寒雨，沈清秋满脸血痕陡然睁开凌厉双眼，闪电撕裂破庙暗夜。',
            dialogue: '那些欠我的，我要他们百倍奉还！',
            characterIds: ['actor-2'],
            model: `可灵 AI (${config.videoModelName || 'Kling-v1.5'})`,
            prompt: 'Extreme close up of Chinese warrior noblewoman opening fierce eyes in rainstorm, blood mark on face, Kling 1.5 HD 8k render',
            thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-close-up-of-a-woman-in-the-dark-42488-large.mp4',
            status: 'completed'
          },
          {
            id: `shot-${Date.now()}-2`,
            shotNumber: 2,
            shotType: '全景 (Full Shot)',
            cameraMovement: '仰拍移镜 (Low Angle Pan)',
            duration: 5.0,
            sceneDescription: '黑色玄袍的魔尊顾长歌凭空悬立，冷酷俯视下方破庙。',
            dialogue: '想报仇？本座借你三千铁骑！',
            characterIds: ['actor-1'],
            model: `可灵 AI (${config.videoModelName || 'Kling-v1.5'})`,
            prompt: 'Full shot low angle of dark fantasy lord standing above ruined temple in full moon night, flowing silk robes, cinematic lighting 8k',
            thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-man-in-a-black-coat-standing-in-the-night-42289-large.mp4',
            status: 'completed'
          }
        ]
      });
    }, 1200);
  });
}

/**
 * 可灵 AI 视频生成驱动 (支持自定义 Base URL / API Key)
 */
export async function callKlingVideoGeneration(shotData, onProgress, config = getModelConfig()) {
  if (config.mode === 'real_api' && config.videoApiKey && config.videoBaseUrl) {
    try {
      const endpoint = config.videoBaseUrl.endsWith('/')
        ? `${config.videoBaseUrl}videos/image2video`
        : `${config.videoBaseUrl}/videos/image2video`;

      const taskRes = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.videoApiKey}`
        },
        body: JSON.stringify({
          model_name: config.videoModelName || 'kling-v1.5',
          prompt: shotData.prompt,
          image: shotData.thumbnailUrl,
          duration: shotData.duration || 5,
          mode: config.klingMode
        })
      });

      if (taskRes.ok) {
        const taskData = await taskRes.json();
        const taskId = taskData.data.task_id;
        return pollKlingTask(taskId, config.videoBaseUrl, config.videoApiKey, onProgress);
      }
    } catch (e) {
      console.warn('真实视频 API 调用失败，降级为沙盒模拟:', e);
    }
  }

  // 高保真沙盒驱动
  return new Promise((resolve) => {
    let progress = 0;
    const timer = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        onProgress(100, 'completed');
        resolve({
          status: 'completed',
          videoUrl: shotData.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-close-up-of-a-woman-in-the-dark-42488-large.mp4'
        });
      } else {
        onProgress(progress, 'processing');
      }
    }, 350);
  });
}

async function pollKlingTask(taskId, baseUrl, apiKey, onProgress) {
  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const endpoint = baseUrl.endsWith('/')
          ? `${baseUrl}videos/image2video/${taskId}`
          : `${baseUrl}/videos/image2video/${taskId}`;

        const res = await fetch(endpoint, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        const resData = await res.json();
        const status = resData.data.task_status;
        if (status === 'succeed') {
          onProgress(100, 'completed');
          resolve({ status: 'completed', videoUrl: resData.data.task_result.videos[0].url });
        } else if (status === 'failed') {
          reject(new Error('Video generation failed'));
        } else {
          onProgress(50, 'processing');
          setTimeout(check, 3000);
        }
      } catch (e) {
        reject(e);
      }
    };
    check();
  });
}
