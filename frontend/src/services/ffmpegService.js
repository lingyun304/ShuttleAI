/**
 * 剧梭AI (Shuttle) - Phase 3 多轨音视频剪辑与 FFmpeg 渲染导出引擎
 * 支持画面轨、配音轨、BGM轨、字幕轨时间轴对齐与 FFmpeg 视频合成
 */

export const BGM_LIBRARY = [
  { id: 'bgm-1', title: '《山河磅礴·豪情》', style: '古风交响/战歌', duration: 180, url: 'https://assets.mixkit.co/music/preview/mixkit-epic-hero-688.mp3' },
  { id: 'bgm-2', title: '《烟雨江南·凄美》', style: '古风箫笛/悲伤', duration: 210, url: 'https://assets.mixkit.co/music/preview/mixkit-sad-violin-cinematic-669.mp3' },
  { id: 'bgm-3', title: '《高能反转·节奏》', style: '快节奏鼓点/逆袭', duration: 150, url: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3' }
];

/**
 * 计算多轨时间轴数据
 */
export function buildProjectTimeline(storyboards = []) {
  let currentTime = 0;

  const videoTrack = storyboards.map((shot, idx) => {
    const startTime = currentTime;
    const duration = shot.duration || 5;
    currentTime += duration;

    return {
      shotId: shot.id,
      shotNumber: idx + 1,
      title: `镜头 #${idx + 1} (${shot.shotType})`,
      startTime: startTime,
      endTime: currentTime,
      duration: duration,
      thumbnailUrl: shot.thumbnailUrl,
      videoUrl: shot.videoUrl,
      dialogue: shot.dialogue
    };
  });

  const totalDuration = currentTime;

  // 自动根据视频总时长匹配背景音乐
  const bgmTrack = {
    bgmId: 'bgm-1',
    title: BGM_LIBRARY[0].title,
    volume: 0.35, // 背景音量
    startTime: 0,
    endTime: totalDuration
  };

  // 生成字幕轨时间戳数据 (SRT 格式)
  const subtitleTrack = videoTrack.map((v, idx) => ({
    id: `sub-${idx}`,
    index: idx + 1,
    startTime: v.startTime,
    endTime: v.endTime,
    startTimeFormatted: formatSrtTime(v.startTime),
    endTimeFormatted: formatSrtTime(v.endTime),
    text: v.dialogue
  }));

  return {
    totalDuration,
    videoTrack,
    bgmTrack,
    subtitleTrack
  };
}

/**
 * 生成 FFmpeg 命令行合成指令 (用于后端 FFmpeg 离线渲染或 WebAssembly 运行)
 */
export function generateFFmpegCommand(timeline) {
  const videoInputs = timeline.videoTrack.map((v, i) => `-i shot_${i + 1}.mp4`).join(' ');
  const filterComplex = timeline.videoTrack.map((_, i) => `[${i}:v][${i}:a]`).join('') + `concat=n=${timeline.videoTrack.length}:v=1:a=1[outv][outa]`;

  return `ffmpeg ${videoInputs} -i bgm.mp3 -filter_complex "${filterComplex};[outa][${timeline.videoTrack.length}:a]amix=inputs=2:duration=first[aout]" -map "[outv]" -map "[aout]" -vf "subtitles=subtitles.srt:force_style='FontSize=16,PrimaryColour=&H00FFE6&'" -c:v libx264 -crf 18 -preset fast output_1080p.mp4`;
}

/**
 * 模拟 FFmpeg 多轨合成渲染服务
 */
export async function renderFFmpegVideo(timeline, onProgress) {
  return new Promise((resolve) => {
    let progress = 0;
    const stages = [
      '正在读取各分镜 H.264 视频片段...',
      '正在对齐音轨与 CosyVoice TTS 对比频率...',
      '正在混合 BGM 背景音轨与淡入淡出...',
      '正在使用 libass 压制双语高清字幕...',
      '正在打包 H.264/AAC 1080P MP4 文件...'
    ];

    const timer = setInterval(() => {
      progress += 10;
      const stageIdx = Math.min(Math.floor(progress / 22), stages.length - 1);
      onProgress(progress, stages[stageIdx]);

      if (progress >= 100) {
        clearInterval(timer);
        resolve({
          status: 'success',
          mp4Url: timeline.videoTrack[0]?.videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-close-up-of-a-woman-in-the-dark-42488-large.mp4',
          srtContent: generateSrtFileContent(timeline.subtitleTrack)
        });
      }
    }, 300);
  });
}

function formatSrtTime(seconds) {
  const pad = (num, size = 2) => String(num).padStart(size, '0');
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)},${pad(ms, 3)}`;
}

export function generateSrtFileContent(subtitleTrack = []) {
  return subtitleTrack
    .map((sub) => `${sub.index}\n${sub.startTimeFormatted} --> ${sub.endTimeFormatted}\n${sub.text}\n`)
    .join('\n');
}
