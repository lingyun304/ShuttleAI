import React, { useState, useEffect } from 'react';
import { Film, Volume2, Music, Type, Play, Pause, RefreshCw, Terminal, Sliders, CheckCircle, Download } from 'lucide-react';
import { buildProjectTimeline, BGM_LIBRARY, generateFFmpegCommand, renderFFmpegVideo } from '../../services/ffmpegService';

export default function MultiTrackTimelineEditor({ storyboards = [], onExportClick }) {
  const [timeline, setTimeline] = useState(() => buildProjectTimeline(storyboards));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedBgm, setSelectedBgm] = useState(BGM_LIBRARY[0]);
  const [bgmVolume, setBgmVolume] = useState(35);
  const [showFFmpegModal, setShowFFmpegModal] = useState(false);
  const [isFFmpegRendering, setIsFFmpegRendering] = useState(false);
  const [ffmpegStage, setFfmpegStage] = useState('');
  const [renderProgress, setRenderProgress] = useState(100);

  useEffect(() => {
    setTimeline(buildProjectTimeline(storyboards));
  }, [storyboards]);

  // Playhead timer simulation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= timeline.totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.2;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeline.totalDuration]);

  const handleStartFFmpegRender = async () => {
    setIsFFmpegRendering(true);
    setRenderProgress(0);

    await renderFFmpegVideo(timeline, (prog, stage) => {
      setRenderProgress(prog);
      setFfmpegStage(stage);
    });

    setIsFFmpegRendering(false);
    setShowFFmpegModal(true);
  };

  const ffmpegCommand = generateFFmpegCommand(timeline);

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-secondary)' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-bamboo">多轨音视频时间轴</span>
            <span className="badge badge-kling">FFmpeg 核心合成引擎</span>
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>多轨音视频微剪辑编辑器 (Timeline Editor)</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Playhead Controller */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isPlaying ? <Pause size={14} color="var(--accent-bamboo)" /> : <Play size={14} color="var(--accent-bamboo)" />}
            <span>{isPlaying ? '暂停播放' : '时间轴预览'}</span>
          </button>

          <span style={{ fontSize: '0.9rem', fontFamily: 'monospace', fontWeight: '600', color: 'var(--accent-bamboo)' }}>
            {currentTime.toFixed(1)}s / {timeline.totalDuration.toFixed(1)}s
          </span>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowFFmpegModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Terminal size={14} /> FFmpeg 指令
          </button>

          <button className="btn btn-primary btn-sm" onClick={handleStartFFmpegRender}>
            <RefreshCw size={14} className={isFFmpegRendering ? 'pulse-glow' : ''} />
            FFmpeg 多轨离线压制
          </button>
        </div>
      </div>

      {/* Multi-Track Editor Canvas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(150,150,150,0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', position: 'relative' }}>
        {/* Time Ruler */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', paddingLeft: '110px' }}>
          {Array.from({ length: Math.ceil(timeline.totalDuration) + 1 }).map((_, i) => (
            <div key={i} style={{ width: '40px', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              {i}s
            </div>
          ))}
        </div>

        {/* Playhead Red Indicator Line */}
        <div style={{
          position: 'absolute',
          top: '36px',
          bottom: '16px',
          left: `${110 + (currentTime / timeline.totalDuration) * (timeline.totalDuration * 40)}px`,
          width: '2px',
          background: 'var(--accent-crimson, #9E2A2B)',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          <div style={{ width: '8px', height: '8px', background: 'var(--accent-crimson, #9E2A2B)', borderRadius: '50%', transform: 'translateX(-3px)' }} />
        </div>

        {/* Track 1: Video Track (画面轨) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '100px', fontSize: '0.82rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-bamboo)' }}>
            <Film size={14} /> 画面轨
          </div>
          <div style={{ display: 'flex', gap: '4px', flex: 1, overflowX: 'auto' }}>
            {timeline.videoTrack.map((shot) => (
              <div
                key={shot.shotId}
                style={{
                  width: `${shot.duration * 40}px`,
                  height: '54px',
                  background: 'var(--gradient-bamboo)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: '#FFF',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}
              >
                <img src={shot.thumbnailUrl} alt="" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {shot.title} ({shot.duration}s)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Audio/TTS Track (对白音轨) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '100px', fontSize: '0.82rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)' }}>
            <Volume2 size={14} /> 对白TTS轨
          </div>
          <div style={{ display: 'flex', gap: '4px', flex: 1, overflowX: 'auto' }}>
            {timeline.videoTrack.map((shot) => (
              <div
                key={shot.shotId}
                style={{
                  width: `${shot.duration * 40}px`,
                  height: '36px',
                  background: 'rgba(184, 134, 11, 0.15)',
                  border: '1px solid rgba(184, 134, 11, 0.3)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: 'var(--accent-gold)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                <span>🗣️ {shot.dialogue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 3: BGM Track (背景音乐轨) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '100px', fontSize: '0.82rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
            <Music size={14} /> BGM 轨
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              flex: 1,
              height: '36px',
              background: 'rgba(44, 110, 73, 0.08)',
              border: '1px dashed var(--accent-bamboo)',
              borderRadius: '6px',
              padding: '4px 12px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>🎵 {selectedBgm.title} ({selectedBgm.style})</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>音量: {bgmVolume}% (淡入淡出已开启)</span>
            </div>

            <select
              className="select-field"
              style={{ width: '180px', padding: '4px 8px', fontSize: '0.8rem' }}
              value={selectedBgm.id}
              onChange={(e) => setSelectedBgm(BGM_LIBRARY.find((b) => b.id === e.target.value))}
            >
              {BGM_LIBRARY.map((b) => (
                <option key={b.id} value={b.id}>{b.title}</option>
              ))}
            </select>

            <input
              type="range"
              min="0"
              max="100"
              value={bgmVolume}
              onChange={(e) => setBgmVolume(Number(e.target.value))}
              style={{ width: '80px', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Track 4: Subtitle Track (字幕轨) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '100px', fontSize: '0.82rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Type size={14} /> 字幕轨
          </div>
          <div style={{ display: 'flex', gap: '4px', flex: 1, overflowX: 'auto' }}>
            {timeline.subtitleTrack.map((sub) => (
              <div
                key={sub.id}
                style={{
                  width: `${(sub.endTime - sub.startTime) * 40}px`,
                  height: '32px',
                  background: 'rgba(150,150,150,0.1)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '0.72rem',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                📝 {sub.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FFmpeg Modal Inspector */}
      {showFFmpegModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '640px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px', background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={20} color="var(--accent-bamboo)" />
                <h3 style={{ fontSize: '1.2rem' }}>FFmpeg 多轨渲染引擎与指令日志</h3>
              </div>
              <button onClick={() => setShowFFmpegModal(false)} className="btn btn-ghost btn-sm">关闭</button>
            </div>

            {isFFmpegRendering && (
              <div style={{ background: 'rgba(44, 110, 73, 0.1)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--accent-bamboo)', marginBottom: '6px' }}>
                  {ffmpegStage} ({renderProgress}%)
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(150,150,150,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${renderProgress}%`, height: '100%', background: 'var(--gradient-bamboo)', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            )}

            <div className="input-group">
              <label className="input-label">底层的真实 FFmpeg 多轨合成 Shell 命令</label>
              <textarea
                className="textarea-field"
                rows={5}
                readOnly
                style={{ fontSize: '0.78rem', fontFamily: 'monospace', background: '#111', color: '#34D399' }}
                value={ffmpegCommand}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => navigator.clipboard.writeText(ffmpegCommand)}>
                复制 FFmpeg 命令
              </button>
              <button className="btn btn-primary btn-sm" onClick={onExportClick}>
                <Download size={14} /> 确认并下载打轨视频
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
