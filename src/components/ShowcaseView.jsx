import React, { useState } from 'react';
import { Play, X, Heart, Share2, Eye, Sparkles, Film, CheckCircle2 } from 'lucide-react';
import { PRESET_PROJECTS } from '../services/mockDriver';

export default function ShowcaseView({ onSelectProject, setCurrentView }) {
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeShotIndex, setActiveShotIndex] = useState(0);

  const openVideo = (proj) => {
    setActiveVideoModal(proj);
    setActiveShotIndex(0);
  };

  const closeVideo = () => {
    setActiveVideoModal(null);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 24px 80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-kling" style={{ marginBottom: '12px' }}>AI 生成作品全景展示</span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>短剧案例大厅</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          点击播放查看由剧梭 AI 编剧 + 导演与可灵 AI 视频引擎渲染制作的高清短剧案例
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {PRESET_PROJECTS.map((proj) => (
          <div key={proj.id} className="glass-panel glass-panel-hover" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => openVideo(proj)}>
            <div className="aspect-vertical">
              <img src={proj.storyboards[0].thumbnailUrl} alt={proj.title} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-kling">Kling 默认</span>
                  <span style={{ fontSize: '0.75rem', color: '#FFF', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '10px' }}>
                    {proj.totalEpisodes}集 · {proj.episodeDuration}s
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={20} fill="#FFF" color="#FFF" style={{ marginLeft: '2px' }} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: '#FFF' }}>{proj.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                    {proj.scriptSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '24px',
            border: '1px solid rgba(139, 92, 246, 0.4)'
          }}>
            <button onClick={closeVideo} style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: '#FFF',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <X size={20} />
            </button>

            {/* Left 9:16 Vertical Video Player */}
            <div style={{ width: '380px', background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video
                key={activeVideoModal.storyboards[activeShotIndex].id}
                src={activeVideoModal.storyboards[activeShotIndex].videoUrl}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Subtitle Overlay */}
              <div style={{
                position: 'absolute',
                bottom: '50px',
                left: '20px',
                right: '20px',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.7)',
                padding: '8px 12px',
                borderRadius: '8px',
                color: '#FFE600',
                fontSize: '0.95rem',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}>
                {activeVideoModal.storyboards[activeShotIndex].dialogue}
              </div>
            </div>

            {/* Right Storyboard Breakdown & Info */}
            <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
              <div>
                <span className="badge badge-kling" style={{ marginBottom: '8px' }}>可灵 AI (Kling) HD 物理仿真渲染</span>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{activeVideoModal.title}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{activeVideoModal.scriptSummary}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--accent-purple)' }}>
                  分镜镜头切换列表 ({activeShotIndex + 1} / {activeVideoModal.storyboards.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeVideoModal.storyboards.map((shot, idx) => (
                    <div
                      key={shot.id}
                      onClick={() => setActiveShotIndex(idx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: idx === activeShotIndex ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${idx === activeShotIndex ? 'var(--accent-purple)' : 'transparent'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: idx === activeShotIndex ? '#FFF' : 'var(--text-secondary)' }}>
                          镜头 #{shot.shotNumber} - {shot.shotType} ({shot.cameraMovement})
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {shot.sceneDescription}
                        </div>
                      </div>
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>Ready</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { closeVideo(); onSelectProject(activeVideoModal); }}>
                  基于该项目二次创作
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
