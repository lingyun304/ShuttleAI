import React, { useState } from 'react';
import { User, Volume2, Sparkles, Shirt, PlusCircle, Check } from 'lucide-react';
import { PRESET_ACTORS } from '../services/mockDriver';

export default function ActorsView() {
  const [actors, setActors] = useState(PRESET_ACTORS);
  const [selectedActor, setSelectedActor] = useState(PRESET_ACTORS[0]);
  const [activeCostume, setActiveCostume] = useState(PRESET_ACTORS[0].costumes[0]);

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 24px 80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="badge badge-bamboo" style={{ marginBottom: '12px' }}>无版权风险 · 角色零崩脸</span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>虚拟演员资产库</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          预设多风格高精度虚拟演员，支持面部特征提取、多套造型服装切换与专属 TTS 配音锁定。
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '28px' }}>
        {/* Actor Selector List */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.1rem' }}>预设演员列表</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => alert('支持上传真人照片或生成自定义演员')}>
              <PlusCircle size={14} /> 新建演员
            </button>
          </div>

          {actors.map((actor) => (
            <div
              key={actor.id}
              onClick={() => { setSelectedActor(actor); setActiveCostume(actor.costumes[0]); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '10px 14px',
                borderRadius: '12px',
                background: selectedActor.id === actor.id ? 'rgba(44, 110, 73, 0.1)' : '#FFFFFF',
                border: `1px solid ${selectedActor.id === actor.id ? 'var(--accent-bamboo)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <img
                src={actor.portrait}
                alt={actor.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(44,110,73,0.2)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{actor.name}</h4>
                  <span className="badge badge-bamboo" style={{ fontSize: '0.65rem' }}>{actor.gender} · {actor.age}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{actor.style}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Actor Detail & Inspector */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', gap: '28px', background: 'var(--bg-secondary)' }}>
          {/* Portrait Preview */}
          <div style={{ width: '260px' }}>
            <div className="aspect-vertical" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <img src={selectedActor.portrait} alt={selectedActor.name} />
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', color: '#FFF' }}>
                当前服装：{activeCostume}
              </div>
            </div>
          </div>

          {/* Configuration Options */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>{selectedActor.name}</h2>
                <span className="badge badge-kling">AI 一致性生成已锁定</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{selectedActor.style}</p>
            </div>

            <div style={{ background: 'rgba(44, 110, 73, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(44, 110, 73, 0.15)' }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--accent-bamboo)', fontFamily: 'var(--font-serif)' }}>外貌与气场描述</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{selectedActor.appearance}</p>
            </div>

            {/* Costume Switcher */}
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shirt size={16} color="var(--accent-bamboo)" />
                造型服装库 (自动跨场景匹配)
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selectedActor.costumes.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCostume(c)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      background: activeCostume === c ? 'rgba(44, 110, 73, 0.12)' : '#FFFFFF',
                      border: `1px solid ${activeCostume === c ? 'var(--accent-bamboo)' : 'var(--border-color)'}`,
                      color: activeCostume === c ? 'var(--accent-bamboo)' : 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {activeCostume === c && <Check size={14} color="var(--accent-bamboo)" />}
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Style Selector */}
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={16} color="var(--accent-bamboo)" />
                角色绑定音色 (CosyVoice TTS)
              </h4>
              <div style={{
                background: 'rgba(44, 110, 73, 0.05)',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(44, 110, 73, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>{selectedActor.voiceName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>全剧对白自动按此音色克隆与表达感情</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => alert('正在试听音色...')}>
                  <Volume2 size={14} /> 试听
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
