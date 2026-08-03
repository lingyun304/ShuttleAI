import React, { useState } from 'react';
import { Film, Video, Cpu, Move, Plus, Trash2, ArrowRight, Sparkles, Sliders } from 'lucide-react';

export default function StoryboardStep({ project, onUpdateProject, onNextStep }) {
  const [storyboards, setStoryboards] = useState(project.storyboards || []);
  const [selectedShot, setSelectedShot] = useState(storyboards[0] || null);

  const handleShotChange = (shotId, field, value) => {
    const updated = storyboards.map((s) => (s.id === shotId ? { ...s, [field]: value } : s));
    setStoryboards(updated);
    if (selectedShot && selectedShot.id === shotId) {
      setSelectedShot({ ...selectedShot, [field]: value });
    }
  };

  const handleAddShot = () => {
    const newShot = {
      id: `shot-${Date.now()}`,
      shotNumber: storyboards.length + 1,
      shotType: '中景 (Medium Shot)',
      cameraMovement: '推镜头 (Dolly In)',
      duration: 4.0,
      sceneDescription: '新增镜头：角色在雨夜中挺直背脊，眼神冷峻如刀。',
      dialogue: '看戏的人，该入局了。',
      characterIds: ['actor-1'],
      model: '可灵 AI (Kling)',
      prompt: 'Medium shot dolly in of Chinese noble protagonist in rainstorm, cold sharp gaze, Kling 1.5 HD',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      status: 'ready'
    };
    const updated = [...storyboards, newShot];
    setStoryboards(updated);
    setSelectedShot(newShot);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
      {/* Storyboards Grid */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-kling" style={{ marginBottom: '4px' }}>可灵 AI 智能镜头规划</span>
            <h2 style={{ fontSize: '1.5rem' }}>Step 3: 导演 Agent 智能分镜</h2>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleAddShot}>
              <Plus size={14} /> 插入镜头
            </button>
            <button className="btn btn-kling btn-sm" onClick={onNextStep}>
              下一步：确认资产 <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Storyboards List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {storyboards.map((shot, idx) => (
            <div
              key={shot.id}
              onClick={() => setSelectedShot(shot)}
              className="glass-panel glass-panel-hover"
              style={{
                padding: '12px',
                border: selectedShot?.id === shot.id ? '2px solid var(--accent-purple)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {/* Thumbnail Header */}
              <div className="aspect-vertical" style={{ borderRadius: '8px', height: '180px', paddingTop: 0 }}>
                <img src={shot.thumbnailUrl} alt={`Shot ${shot.shotNumber}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', color: '#FFF' }}>
                  镜头 #{idx + 1}
                </div>
                <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                  <span className="badge badge-kling" style={{ fontSize: '0.65rem' }}>{shot.model || 'Kling HD'}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-purple)', marginBottom: '4px' }}>
                  {shot.shotType} · {shot.cameraMovement} ({shot.duration}s)
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {shot.sceneDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shot Parameter Inspector */}
      {selectedShot && (
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={18} color="var(--accent-purple)" />
              镜头 #{selectedShot.shotNumber} 参数微调
            </h3>
          </div>

          <div className="input-group">
            <label className="input-label">景别 (Shot Type)</label>
            <select
              className="select-field"
              value={selectedShot.shotType}
              onChange={(e) => handleShotChange(selectedShot.id, 'shotType', e.target.value)}
            >
              <option value="特写 (Extreme Close-up)">特写 (Extreme Close-up)</option>
              <option value="中景 (Medium Shot)">中景 (Medium Shot)</option>
              <option value="全景 (Full Shot)">全景 (Full Shot)</option>
              <option value="远景 (Far Shot)">远景 (Far Shot)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">运镜方式 (Camera Movement)</label>
            <select
              className="select-field"
              value={selectedShot.cameraMovement}
              onChange={(e) => handleShotChange(selectedShot.id, 'cameraMovement', e.target.value)}
            >
              <option value="缓慢拉镜头 (Slow Pull Back)">缓慢拉镜头 (Slow Pull Back)</option>
              <option value="推镜头 (Dolly In)">推镜头 (Dolly In)</option>
              <option value="仰拍移镜 (Low Angle Pan)">仰拍移镜 (Low Angle Pan)</option>
              <option value="摇镜头 (Tilt Up)">摇镜头 (Tilt Up)</option>
              <option value="环绕运镜 (Orbit)">环绕运镜 (Orbit)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">画面内容描述</label>
            <textarea
              className="textarea-field"
              rows={3}
              value={selectedShot.sceneDescription}
              onChange={(e) => handleShotChange(selectedShot.id, 'sceneDescription', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">对白/台词</label>
            <input
              className="input-field"
              value={selectedShot.dialogue}
              onChange={(e) => handleShotChange(selectedShot.id, 'dialogue', e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>可灵 AI 渲染 Prompt</span>
              <span className="badge badge-kling" style={{ fontSize: '0.65rem' }}>Auto Kling 1.5</span>
            </label>
            <textarea
              className="textarea-field"
              rows={3}
              style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}
              value={selectedShot.prompt}
              onChange={(e) => handleShotChange(selectedShot.id, 'prompt', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
