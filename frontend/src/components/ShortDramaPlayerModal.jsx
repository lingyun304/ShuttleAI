import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Lock, Heart, Share2, Maximize2, Feather, Flame, Sparkles, Volume2, VolumeX, RotateCcw } from 'lucide-react';

export default function ShortDramaPlayerModal({ drama, onClose, onStartDramaProject }) {
  const [activeDrama, setActiveDrama] = useState(drama);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('00:15');
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128400);

  const videoRef = useRef(null);

  // All Showcase Short Dramas List with real HD video streams
  const allDramas = [
    {
      id: 'p-1',
      title: '重回93，从下乡收菜开始发家',
      badge: '剧梭独播',
      plays: '8000万次播放',
      updateTime: '2026年07月07日 19:10',
      durationStr: '00:15',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-close-up-of-a-man-in-a-leather-jacket-41544-large.mp4',
      subtitles: [
        '瘦了不少...',
        '这一趟下乡收菜，我可不会再走上一世的老路！',
        '九十年代风云变幻，重回93，属于我的时代到了！'
      ],
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p-2',
      title: '黑化仙尊与毒医娇妻',
      badge: '剧梭独播',
      plays: '1.2亿次播放',
      updateTime: '2026年08月01日 22:30',
      durationStr: '00:12',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-scene-of-a-man-looking-around-in-the-dark-41549-large.mp4',
      subtitles: [
        '这九天十地，谁敢动我一分一毫？',
        '三千年玄阴绝脉，今日我亲自为你解毒。',
        '九天魔域尽归我手，九霄神雷听我统领！'
      ],
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p-3',
      title: '一枕山河踏月来',
      badge: '剧梭独播',
      subBadge: '全网播放量破亿',
      plays: '热播 NO.1',
      updateTime: '2026年07月28日 15:45',
      durationStr: '00:18',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-with-a-serious-expression-close-up-41551-large.mp4',
      subtitles: [
        '风起雨落，这满朝文武，竟无一人懂我剑意。',
        '一枕山河踏月来，万里河山皆在我心。',
        '大秦铁骑所过之处，莫敢不从！'
      ],
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p-4',
      title: '神尊降世：诸天至尊',
      badge: '剧梭精选',
      plays: '9500万次播放',
      updateTime: '2026年07月19日 11:20',
      durationStr: '00:14',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-neon-lit-city-41543-large.mp4',
      subtitles: [
        '凡人，也敢窥探本尊之威仪？',
        '星辰破灭，诸天陨落，不过在我一念之间！',
        '战天斗地，吾乃万劫不灭神尊！'
      ],
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p-5',
      title: '大秦：开局觉醒国运系统',
      badge: 'AI热门',
      plays: '1.5亿次播放',
      updateTime: '2026年08月02日 20:00',
      durationStr: '00:16',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-down-a-city-street-at-night-41547-large.mp4',
      subtitles: [
        '朕乃大秦始皇帝，国运系统已觉醒！',
        '咸阳宫前，谁敢阻挡大秦一统天下的脚步？',
        '三十万大秦龙骑已就位，众将听令！'
      ],
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Active item
  const currentItem = allDramas.find(d => d.title === activeDrama?.title) || {
    ...allDramas[0],
    title: activeDrama?.title || allDramas[0].title,
    img: activeDrama?.img || allDramas[0].img,
    videoUrl: activeDrama?.videoUrl || allDramas[0].videoUrl
  };

  // Video playback & HTML5 video element sync
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeDrama]);

  // Subtitles cycle interval
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSubtitleIndex(prev => (prev + 1) % (currentItem.subtitles?.length || 1));
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentItem]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      const pct = (cur / dur) * 100;
      setProgress(pct);

      const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
      };
      setCurrentTimeStr(formatTime(cur));
      setDurationStr(formatTime(dur));
    }
  };

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = pct * videoRef.current.duration;
      setProgress(pct * 100);
    }
  };

  const handleToggleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(5, 4, 6, 0.96)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      flexDirection: 'column',
      color: '#FFF',
      overflow: 'hidden'
    }}>
      
      {/* 1. Top Header Bar (Matching Screenshot Header) */}
      <div style={{
        height: '56px',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(10, 8, 12, 0.8)'
      }}>
        {/* Left Back Arrow & Logo Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#FFF',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={15} />
            <span>返回</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'var(--gradient-bamboo)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={14} color="#FFF" />
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: 'rgba(255,255,255,0.85)' }}>
              剧梭工作室 | <span style={{ color: '#FFF' }}>{currentItem.title}</span>
            </span>
          </div>
        </div>

        {/* Right Actions & Update Timestamp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onStartDramaProject && (
            <button
              onClick={() => onStartDramaProject(currentItem.title)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: '9999px',
                background: 'var(--accent-glow)',
                border: '1px solid var(--border-glow)',
                color: 'var(--accent-bamboo)',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={14} />
              <span>二次创作同款</span>
            </button>
          )}
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
            更新时间：{currentItem.updateTime || '2026年07月07日 19:10'}
          </div>
        </div>
      </div>

      {/* 2. Main Center 9:16 Vertical Video Player (Real HTML5 Video Player) */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 0',
        position: 'relative'
      }}>
        {/* 9:16 Ratio Video Card Container */}
        <div style={{
          height: '100%',
          maxHeight: '620px',
          aspectRatio: '9/16',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          background: '#000'
        }}>
          {/* Real Playable HTML5 Video Element */}
          <video
            ref={videoRef}
            src={currentItem.videoUrl}
            poster={currentItem.img}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onClick={handleTogglePlay}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer'
            }}
          />

          {/* Video Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Play/Pause Overlay Icon when paused */}
          {!isPlaying && (
            <div
              onClick={handleTogglePlay}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: 'rgba(0,0,0,0.3)',
                zIndex: 15
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Play size={28} fill="#FFF" color="#FFF" style={{ marginLeft: '4px' }} />
              </div>
            </div>
          )}

          {/* Top Right Controls */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            display: 'flex',
            gap: '8px',
            zIndex: 20
          }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Maximize2 size={15} color="#FFF" />
            </div>
          </div>

          {/* Dynamic Animated Subtitle Text Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '95px',
            left: '16px',
            right: '16px',
            textAlign: 'center',
            zIndex: 18,
            pointerEvents: 'none'
          }}>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: '#FFFFFF',
              textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)',
              letterSpacing: '0.04em',
              background: 'rgba(0, 0, 0, 0.55)',
              padding: '6px 16px',
              borderRadius: '8px',
              backdropFilter: 'blur(8px)'
            }}>
              {currentItem.subtitles ? currentItem.subtitles[subtitleIndex] : '瘦了不少'}
            </span>
          </div>

          {/* Real Video Timeline Seek Bar */}
          <div style={{
            position: 'absolute',
            bottom: '62px',
            left: '16px',
            right: '16px',
            zIndex: 20
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
              <span>{currentTimeStr}</span>
              <span>{durationStr}</span>
            </div>
            <div
              onClick={handleSeek}
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: 'var(--accent-bamboo)',
                borderRadius: '2px',
                transition: 'width 0.1s linear'
              }} />
            </div>
          </div>

          {/* Bottom Action Controls Inside Video Box */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 20
          }}>
            {/* 播放 / 暂停 控制按钮 */}
            <button
              onClick={handleTogglePlay}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '9999px',
                background: isPlaying ? 'rgba(255,255,255,0.2)' : '#FFFFFF',
                color: isPlaying ? '#FFFFFF' : '#000000',
                fontSize: '0.82rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
            >
              {isPlaying ? <Pause size={14} fill="#FFF" /> : <Play size={14} fill="#000" />}
              <span>{isPlaying ? '暂停播放' : '立 即 观 看'}</span>
            </button>

            {/* Center Lock Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(0,0,0,0.45)',
              padding: '4px 10px',
              borderRadius: '9999px',
              backdropFilter: 'blur(6px)'
            }}>
              <Lock size={12} />
              <span>创作过程未公开</span>
            </div>

            {/* Right Like & Share Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handleToggleLike}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: liked ? '#FF3344' : '#FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Heart size={18} fill={liked ? '#FF3344' : 'none'} />
              </button>
              <button
                onClick={() => alert(`视频链接已复制！分享短剧《${currentItem.title}》`)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Horizontal Mini Poster Track Carousel (Matching Screenshot Bottom Row) */}
      <div style={{
        height: '110px',
        background: 'rgba(10, 8, 12, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        gap: '14px'
      }}>
        {allDramas.map((item) => {
          const isActive = item.title === currentItem.title;
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveDrama(item);
                setSubtitleIndex(0);
                setProgress(0);
                setIsPlaying(true);
              }}
              style={{
                width: '64px',
                height: '84px',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                cursor: 'pointer',
                border: isActive ? '2px solid var(--accent-bamboo)' : '1px solid rgba(255,255,255,0.1)',
                opacity: isActive ? 1 : 0.6,
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.25s ease'
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.85) 100%)',
                padding: '4px',
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                <span style={{ fontSize: '0.6rem', color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title.substring(0, 4)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
