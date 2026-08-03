/**
 * 剧梭AI (Shuttle) Mock Sandbox Driver
 * 内置对可灵 AI (Kling) 核心渲染模型及 LLM 编剧 Agent 的仿真沙盒驱动
 */

export const PRESET_ACTORS = [
  {
    id: 'actor-1',
    name: '顾长歌',
    gender: '男',
    age: '26岁',
    style: '国风仙侠 / 都市霸总',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    appearance: '面如冠玉，剑眉星目，身着暗纹黑金长袍或高订西装，气场冷峻。',
    personality: '沉稳腹黑，重情重义，果断干脆。',
    voiceId: 'voice-male-magnet',
    voiceName: '磁性男主音 (顾长歌)',
    costumes: ['黑金战袍', '都市深灰西装', '白绸寝衣']
  },
  {
    id: 'actor-2',
    name: '沈清秋',
    gender: '女',
    age: '22岁',
    style: '古代大女主 / 现代甜妹',
    portrait: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    appearance: '肤如凝脂，清丽脱俗，眼含灵动之气，发绾云髻。',
    personality: '坚韧聪颖，医毒双绝，不阿谀奉承。',
    voiceId: 'voice-female-gentle',
    voiceName: '温柔大女主音 (沈清秋)',
    costumes: ['青白襦裙', '干练职场装', '红衣刺客']
  },
  {
    id: 'actor-3',
    name: '陆天行',
    gender: '男',
    age: '30岁',
    style: '反派枭雄 / 武林盟主',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    appearance: '威严高大，眉宇间透露桀骜霸气，左颊微有浅疤。',
    personality: '心狠手辣，心怀城府。',
    voiceId: 'voice-male-cangsang',
    voiceName: '沧桑霸气音 (陆天行)',
    costumes: ['深红蟒袍', '玄铁铠甲']
  },
  {
    id: 'actor-4',
    name: '小灵儿',
    gender: '女',
    age: '18岁',
    style: '古灵精怪 / 俏皮小丫鬟',
    portrait: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    appearance: '双马尾包包头，圆脸杏眼，满脸娇憨可爱。',
    personality: '忠心耿耿，活泼可爱。',
    voiceId: 'voice-female-cute',
    voiceName: '可爱少女音 (小灵儿)',
    costumes: ['粉嫩短裙', '黄绿丫鬟装']
  }
];

export const PRESET_PROJECTS = [
  {
    id: 'proj-demo-1',
    title: '《一枕山河踏月来》',
    genre: '古装仙侠逆袭',
    totalEpisodes: 50,
    episodeDuration: 120, // 2分钟
    visualStyle: '国风水墨高精质感',
    defaultModel: '可灵 AI (Kling 1.5 Pro)',
    status: 'storyboard',
    createdAt: '2026-07-31 10:00',
    characters: [PRESET_ACTORS[0], PRESET_ACTORS[1]],
    scriptSummary: '大明国一品医仙沈清秋，遭未婚夫与亲妹联合陷害抛下悬崖。死里逃生后换脸易容，以绝顶医毒之术携魔尊顾长歌重回京城，开启逆风翻盘虐渣之路...',
    storyboards: [
      {
        id: 'shot-1',
        shotNumber: 1,
        shotType: '特写 (Extreme Close-up)',
        cameraMovement: '缓慢拉镜头 (Slow Pull Back)',
        duration: 4.5,
        sceneDescription: '漆黑寒风暴雨中，崖底巨石上，沈清秋满脸血痕陡然睁开双眼，眼底爆发凌厉冷芒！',
        dialogue: '（重声喘息）那些欠我的，我要你们百倍奉还！',
        characterIds: ['actor-2'],
        model: '可灵 AI (Kling)',
        prompt: 'Extreme close up of a beautiful ancient Chinese warrior woman, blood stains on face, opening fierce eyes in thunderstorm, cinematic lightning, highly detailed 8k, Kling AI standard',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-close-up-of-a-woman-in-the-dark-42488-large.mp4',
        status: 'completed'
      },
      {
        id: 'shot-2',
        shotNumber: 2,
        shotType: '全景 (Full Shot)',
        cameraMovement: '仰拍移镜 (Low Angle Pan)',
        duration: 5.0,
        sceneDescription: '破庙废墟上方，黑色玄袍的魔尊顾长歌负手悬空而立，月光将他修长的身姿拉得极长。',
        dialogue: '想报仇？本座借你三千铁骑，但你拿什么交换？',
        characterIds: ['actor-1'],
        model: '可灵 AI (Kling)',
        prompt: 'Full shot low angle of dark fantasy Chinese lord hovering above ancient ruined temple, full moon background, flowing dark silk robes, epic scale, 8k resolution',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-man-in-a-black-coat-standing-in-the-night-42289-large.mp4',
        status: 'completed'
      },
      {
        id: 'shot-3',
        shotNumber: 3,
        shotType: '中景 (Medium Shot)',
        cameraMovement: '推镜头 (Dolly In)',
        duration: 4.0,
        sceneDescription: '沈清秋扶着染血的崖壁挣扎站起，迎着顾长歌的目光，没有丝毫退缩与怯懦。',
        dialogue: '用我这条命，还有天下第一医圣的灵典名录！',
        characterIds: ['actor-2', 'actor-1'],
        model: '可灵 AI (Kling)',
        prompt: 'Medium shot dolly in, injured Chinese noblewoman standing up resiliently, staring at dark lord, dramatic rain particles, volumetric lighting, photorealistic 8k',
        thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-looking-at-the-rain-through-a-window-41544-large.mp4',
        status: 'completed'
      },
      {
        id: 'shot-4',
        shotNumber: 4,
        shotType: '远景 (Far Shot)',
        cameraMovement: '摇镜头 (Tilt Up)',
        duration: 6.0,
        sceneDescription: '闪电划破夜空，破庙大门轰然崩塌，两人并肩踏入雷雨之中，浩浩荡荡的魔军在黑暗中显露深邃轮廓。',
        dialogue: '好！交易达成！从今日起，你便是本座唯一的魔后。',
        characterIds: ['actor-1', 'actor-2'],
        model: '可灵 AI (Kling)',
        prompt: 'Wide far shot of ruined temple exploding in thunderstorm, two powerful figures walking out side by side into dark army, epic movie scene, unreal engine 5 render style',
        thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-night-sky-filled-with-stars-and-clouds-42288-large.mp4',
        status: 'completed'
      }
    ]
  }
];

/**
 * 模拟 AI 编剧 Agent 拓展故事
 */
export async function mockGenerateScript(promptText, genre = '古装仙侠', episodeCount = 50) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const generatedProject = {
        id: `proj-${Date.now()}`,
        title: promptText.slice(0, 12) ? `《${promptText.slice(0, 10)}...》` : '《未命名AI短剧》',
        genre: genre,
        totalEpisodes: episodeCount,
        episodeDuration: 120,
        visualStyle: '仿真真人超级高清 (Kling 1.5 HD)',
        defaultModel: '可灵 AI (Kling)',
        status: 'scripting',
        createdAt: new Date().toLocaleString('zh-CN'),
        scriptSummary: `基于创意“${promptText}”拓展。剧本讲述了核心主角在跌宕起伏的命运面前，通过强烈的冲突反转与高密度情感钩子，完成绝地反击的传奇故事。每集末尾包含高能悬念钩子！`,
        characters: [PRESET_ACTORS[0], PRESET_ACTORS[1]],
        storyboards: [
          {
            id: `shot-${Date.now()}-1`,
            shotNumber: 1,
            shotType: '特写 (Extreme Close-up)',
            cameraMovement: '急推镜头 (Crash Zoom In)',
            duration: 3.5,
            sceneDescription: '主角眼神凝聚光芒，在冰冷暗夜中缓缓转头，冷酷锁定前方敌人。',
            dialogue: '游戏，才刚刚开始！',
            characterIds: ['actor-1'],
            model: '可灵 AI (Kling)',
            prompt: `Close up shot of main protagonist in ${genre} style, intense eyes, dramatic contrast lighting, 8k resolution, Kling AI generator`,
            thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-close-up-of-a-woman-in-the-dark-42488-large.mp4',
            status: 'ready'
          },
          {
            id: `shot-${Date.now()}-2`,
            shotNumber: 2,
            shotType: '中景 (Medium Shot)',
            cameraMovement: '环绕运镜 (Orbit Camera)',
            duration: 4.5,
            sceneDescription: '大殿之内，气氛剑拔弩张，四下侍卫拔刀相对。',
            dialogue: '放肆！谁敢动他分毫？！',
            characterIds: ['actor-2'],
            model: '可灵 AI (Kling)',
            prompt: `Medium shot orbiting around palace interior, guards drawing swords, cinematic motion blur, high definition 8k, Kling AI`,
            thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-man-in-a-black-coat-standing-in-the-night-42289-large.mp4',
            status: 'ready'
          }
        ]
      };
      resolve(generatedProject);
    }, 1500);
  });
}

/**
 * 模拟可灵 AI (Kling) 渲染生成视频片段
 */
export async function mockRenderKlingVideo(shotId, onProgress) {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        onProgress(100, 'completed');
        resolve({
          status: 'completed',
          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-close-up-of-a-woman-in-the-dark-42488-large.mp4'
        });
      } else {
        onProgress(progress, 'processing');
      }
    }, 400);
  });
}
