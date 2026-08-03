import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import ShortDramaPlayerModal from './ShortDramaPlayerModal';
import { PRESET_PROJECTS } from '../services/mockDriver';

export default function ShowcaseView({ onSelectProject, setCurrentView }) {
  const [selectedDrama, setSelectedDrama] = useState(null);
  const [styleFilter, setStyleFilter] = useState('all');

  const filteredProjects = PRESET_PROJECTS.filter(proj => {
    if (styleFilter === 'all') return true;
    return proj.tags && proj.tags.some(t => t.includes(styleFilter));
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '24px 24px 40px 24px' }}>
      
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span className="badge badge-kling" style={{ marginBottom: '12px' }}>AI 生成作品全景展示</span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '12px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>短剧案例大厅</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 16px auto' }}>
          点击海报即可全屏开启沉浸式竖屏短剧播放器，查看 Seedance 2.0 / 可灵 AI 生成案例
        </p>

        {/* Style Dropdown Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>风格筛选：</span>
          <select
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              fontWeight: '600',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">✨ 全部视觉风格</option>
            <option value="写实">🎬 3D 写实电影感</option>
            <option value="3D">🎨 3D CG 极清动漫</option>
            <option value="2D">🖌️ 2D 二次元手绘</option>
            <option value="古风">🎏 水墨古风汉服</option>
            <option value="赛博">🌌 赛博朋克科幻</option>
          </select>
        </div>
      </div>

      {/* Grid of Short Drama Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px'
      }}>
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedDrama(proj)}
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              aspectRatio: '9/14',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-paper)',
              transition: 'all 0.3s ease'
            }}
          >
            <img src={proj.storyboards[0].thumbnailUrl} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', background: 'var(--gradient-bamboo)', color: '#FFF', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                  剧梭独播
                </span>
                <span style={{ fontSize: '0.72rem', color: '#FFF', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '10px' }}>
                  {proj.totalEpisodes}集 · {proj.episodeDuration}s
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-bamboo)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={16} fill="#FFF" color="#FFF" style={{ marginLeft: '2px' }} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontWeight: '700', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    {proj.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                  {proj.scriptSummary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Fullscreen Vertical Short Drama Player Modal */}
      {selectedDrama && (
        <ShortDramaPlayerModal
          drama={selectedDrama}
          onClose={() => setSelectedDrama(null)}
          onStartDramaProject={(title) => {
            setSelectedDrama(null);
            if (onSelectProject) onSelectProject(selectedDrama);
          }}
        />
      )}
    </div>
  );
}
