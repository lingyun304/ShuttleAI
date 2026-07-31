import React, { useState } from 'react';
import { Cpu, Play, CheckCircle, RefreshCw, Download, Film, Volume2, Sparkles, Share2, Layers } from 'lucide-react';
import { callKlingVideoGeneration } from '../../services/modelDrivers';
import MultiTrackTimelineEditor from './MultiTrackTimelineEditor';

export default function VideoRenderStep({ project, onUpdateProject }) {
  const [shots, setShots] = useState(project.storyboards || []);
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [renderProgress, setRenderProgress] = useState(100);
  const [isRendering, setIsRendering] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [subtitleStyle, setSubtitleStyle] = useState({ color: '#FFE600', size: 16, stroke: true });

  const handleStartBatchRender = async () => {
    setIsRendering(true);
    setRenderProgress(0);

    const currentShot = shots[activeShotIndex] || shots[0];
    await callKlingVideoGeneration(currentShot, (prog) => {
      setRenderProgress(prog);
    });

    setIsRendering(false);
    setRenderProgress(100);
  };

  const currentShot = shots[activeShotIndex] || shots[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Preview Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
        {/* Left 9:16 Vertical Video Preview Player */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', background: 'var(--bg-secondary)' }}>
          <div className="aspect-vertical" style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--accent-gold)' }}>
            {currentShot && (
              <video
                key={currentShot.id}
                src={currentShot.videoUrl}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}

            {/* Subtitle Overlay */}
            {currentShot && (
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '16px',
                right: '16px',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.75)',
                padding: '6px 12px',
                borderRadius: '8px',
                color: subtitleStyle.color,
                fontSize: `${subtitleStyle.size}px`,
                fontWeight: '700',
                textShadow: subtitleStyle.stroke ? '0 2px 4px rgba(0,0,0,0.9), 0 0 2px #000' : 'none'
              }}>
                {currentShot.dialogue}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', width: '100%', paddingBottom: '4px' }}>
            {shots.map((shot, idx) => (
              <button
                key={shot.id}
                onClick={() => setActiveShotIndex(idx)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  background: activeShotIndex === idx ? 'var(--gradient-bamboo)' : 'rgba(150,150,150,0.1)',
                  color: activeShotIndex === idx ? '#FFF' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                镜 #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Right Render Status */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-kling">多轨音视频合成</span>
                <span className="badge badge-emerald">实时通信对齐正常</span>
              </div>
              <h2 style={{ fontSize: '1.6rem' }}>Step 5: 视频生成与多轨时间轴</h2>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleStartBatchRender}
                disabled={isRendering}
              >
                <RefreshCw size={14} className={isRendering ? 'pulse-glow' : ''} /> 重新渲染当前镜头
              </button>
              <button className="btn btn-kling btn-lg" onClick={() => setShowExportModal(true)}>
                <Download size={18} /> 导出合成 MP4 视频
              </button>
            </div>
          </div>

          {/* Render Queue Progress Bar */}
          <div style={{ background: 'rgba(150,150,150,0.06)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem', fontWeight: '600' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={16} color="var(--accent-bamboo)" />
                AI 视频渲染任务进度 ({shots.length} 个镜头)
              </span>
              <span style={{ color: 'var(--accent-bamboo)' }}>{renderProgress}%</span>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'rgba(150,150,150,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${renderProgress}%`,
                height: '100%',
                background: 'var(--gradient-bamboo)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Shots Status List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '200px' }}>
            {shots.map((shot, idx) => (
              <div
                key={shot.id}
                onClick={() => setActiveShotIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: activeShotIndex === idx ? 'rgba(44, 110, 73, 0.08)' : 'rgba(150,150,150,0.03)',
                  border: `1px solid ${activeShotIndex === idx ? 'var(--accent-bamboo)' : 'transparent'}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={shot.thumbnailUrl} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      镜头 #{shot.shotNumber} · {shot.shotType}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{shot.dialogue}</div>
                  </div>
                </div>

                <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                  <CheckCircle size={12} style={{ marginRight: '2px' }} /> 已渲染
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Track Timeline Editor */}
      <MultiTrackTimelineEditor
        storyboards={shots}
        onExportClick={() => setShowExportModal(true)}
      />

      {/* Export Modal */}
      {showExportModal && (
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
          <div className="glass-panel" style={{ width: '100%', maxWidth: '540px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-secondary)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gradient-bamboo)', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Film size={28} color="#FFF" />
              </div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>全集打轨导出</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>已完成《{project.title}》画面轨、TTS对白轨、BGM音轨与SRT字幕的压制合成</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'rgba(150,150,150,0.08)', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600' }}>超清竖屏 MP4 视频 (1080P/4K)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>FFmpeg libx264 编码合成</div>
                </div>
                <button className="btn btn-kling btn-sm" onClick={() => alert('已触发 FFmpeg 1080P MP4 视频文件下载！')}>
                  下载 MP4
                </button>
              </div>

              <div style={{ background: 'rgba(150,150,150,0.08)', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600' }}>SRT / ASS 同步字幕文件</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>包含精确时间戳标记</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => alert('已导出 SRT 字幕文件！')}>
                  下载 SRT
                </button>
              </div>

              <div style={{ background: 'rgba(150,150,150,0.08)', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600' }}>项目完整资产包 (.zip)</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>分镜原画、配音音频及 BGM 音轨</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => alert('已打包项目全量资产！')}>
                  下载 Zip
                </button>
              </div>
            </div>

            <button className="btn btn-ghost" onClick={() => setShowExportModal(false)} style={{ marginTop: '8px' }}>
              关闭窗口
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
