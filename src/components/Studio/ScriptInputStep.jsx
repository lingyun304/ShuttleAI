import React, { useState } from 'react';
import { Sparkles, Upload, FileText, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function ScriptInputStep({ onGenerate, isGenerating }) {
  const [ideaInput, setIdeaInput] = useState('');
  const [genre, setGenre] = useState('古装仙侠');
  const [episodes, setEpisodes] = useState(50);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const genres = ['古装仙侠', '都市甜宠', '豪门逆袭', '战神归来', '悬疑推理', '科幻未来', '异能战神'];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      setIdeaInput(`已从上传文件《${file.name}》提取网文文本大纲，包含完整三幕式剧情冲突...`);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '36px', maxWidth: '840px', margin: '0 auto', background: 'var(--bg-secondary)' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gradient-bamboo)', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={24} color="#FFF" />
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Step 1: 创意解析</h2>
        <p style={{ color: 'var(--text-secondary)' }}>用一句话描述创意或上传小说，AI 编剧 Agent 将自动生成结构化剧本与分镜</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Main Idea Textarea */}
        <div className="input-group">
          <label className="input-label">一句话故事创意或故事大纲 (50~5000字)</label>
          <textarea
            className="textarea-field"
            rows={5}
            placeholder="例如：女主角跌落悬崖后易容换脸，携带无上绝技重返京城，与黑衣男主联手逆袭..."
            value={ideaInput}
            onChange={(e) => setIdeaInput(e.target.value)}
          />
        </div>

        {/* Upload File Zone */}
        <div style={{
          border: '1px dashed var(--accent-bamboo)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          textAlign: 'center',
          background: 'rgba(44, 110, 73, 0.04)',
          position: 'relative',
          cursor: 'pointer'
        }}>
          <input
            type="file"
            accept=".txt,.docx,.md,.pdf"
            onChange={handleFileUpload}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Upload size={28} color="var(--accent-bamboo)" />
            <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {uploadedFileName ? `已加载: ${uploadedFileName}` : '点击或拖拽上传小说/剧本文件 (.txt / .docx / .md)'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>支持最大 50MB 文本解析，自动切割集数与对白</div>
          </div>
        </div>

        {/* Options Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="input-group">
            <label className="input-label">题材类型标签</label>
            <select
              className="select-field"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">目标全剧集数</label>
            <select
              className="select-field"
              value={episodes}
              onChange={(e) => setEpisodes(Number(e.target.value))}
            >
              <option value={10}>10 集 (短篇极速版)</option>
              <option value={30}>30 集 (标准季播)</option>
              <option value={50}>50 集 (爆款黄金档)</option>
              <option value={100}>100 集 (长篇连载)</option>
            </select>
          </div>
        </div>

        {/* Generate CTA Button */}
        <button
          className="btn btn-primary btn-lg"
          style={{ width: '100%', marginTop: '12px' }}
          onClick={() => onGenerate(ideaInput || '女主角跌落悬崖逆袭虐渣', genre, episodes)}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} className="pulse-glow" /> AI 编剧 Agent 正在解析剧本与生成角色...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              启动 AI 创意解析 <ArrowRight size={20} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
