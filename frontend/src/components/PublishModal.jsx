import React, { useState } from 'react';
import { X, Share2, Check, Send, Calendar, Sparkles } from 'lucide-react';

export default function PublishModal({ project, onClose }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['douyin', 'kuaishou', 'xiaohongshu']);
  const [publishTitle, setPublishTitle] = useState(project ? `${project.title} 第1集《死里逃生》高能爆款短剧` : '短剧高清视频');
  const [tags, setTags] = useState('#AI短剧 #古风逆袭 #可灵AI #一人短剧工作室');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const platforms = [
    { id: 'douyin', name: '抖音短视频', icon: '🎵' },
    { id: 'kuaishou', name: '快手短剧', icon: '⚡' },
    { id: 'xiaohongshu', name: '小红书', icon: '📕' },
    { id: 'wechat', name: '微信视频号', icon: '🟢' },
    { id: 'bilibili', name: 'Bilibili B站', icon: '📺' }
  ];

  const togglePlatform = (id) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishedSuccess(true);
    }, 1500);
  };

  return (
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
      <div className="glass-panel" style={{ width: '100%', maxWidth: '560px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Share2 size={20} color="var(--accent-bamboo)" />
            <h3 style={{ fontSize: '1.3rem' }}>多平台一键发布 API</h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {publishedSuccess ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(44, 110, 73, 0.15)', color: 'var(--accent-bamboo)', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>分发发布成功！</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>已同步推送至抖音、快手与小红书开放 API 队列。</p>
            <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={onClose}>
              确定并关闭
            </button>
          </div>
        ) : (
          <>
            {/* Target Platform Picker */}
            <div>
              <label className="input-label" style={{ marginBottom: '8px', display: 'block' }}>选择分发目标平台</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {platforms.map((p) => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        background: isSelected ? 'rgba(44, 110, 73, 0.1)' : 'var(--bg-primary)',
                        border: `1px solid ${isSelected ? 'var(--accent-bamboo)' : 'var(--border-color)'}`,
                        color: isSelected ? 'var(--accent-bamboo)' : 'var(--text-primary)',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{p.icon}</span>
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">视频发布标题</label>
              <input
                className="input-field"
                value={publishTitle}
                onChange={(e) => setPublishTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">话题标签 (Hashtags)</label>
              <input
                className="input-field"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? '正在全平台分发同步中...' : '一键推送发布全平台'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
