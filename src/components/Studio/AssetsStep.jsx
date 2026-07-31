import React, { useState } from 'react';
import { UserCheck, ShieldCheck, Sparkles, Volume2, ArrowRight, RefreshCw, Layers } from 'lucide-react';

export default function AssetsStep({ project, onNextStep }) {
  const characters = project.characters || [];
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0] || {});

  return (
    <div className="glass-panel" style={{ padding: '28px', background: 'var(--bg-secondary)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-emerald">AI 面部一致性已锁定</span>
            <span className="badge badge-bamboo">角色零崩脸</span>
          </div>
          <h2 style={{ fontSize: '1.6rem' }}>Step 4: 资产确认</h2>
        </div>

        <button className="btn btn-kling btn-lg" onClick={onNextStep}>
          下一步：视频生成 <ArrowRight size={18} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {characters.map((char) => (
          <div key={char.id} className="glass-panel glass-panel-hover" style={{ padding: '20px', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="aspect-vertical" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img src={char.portrait} alt={char.name} />
              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <span className="badge badge-emerald"><ShieldCheck size={12} /> 一致性特征已绑定</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{char.name}</h3>
                <span className="badge badge-bamboo">{char.gender}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{char.style}</p>

              <div style={{ background: 'rgba(44, 110, 73, 0.05)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(44, 110, 73, 0.15)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                配音音色：<strong style={{ color: 'var(--accent-bamboo)' }}>{char.voiceName || '专属配音已绑定'}</strong>
              </div>
            </div>

            <button className="btn btn-secondary btn-sm" onClick={() => alert(`已为 ${char.name} 重新渲染高清图像`)}>
              <RefreshCw size={14} /> 重新生成面部图像
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
