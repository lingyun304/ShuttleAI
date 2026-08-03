import React, { useState } from 'react';
import {
  Video, Image, Mic, Layers, Wand2, Scissors, Plus, Folder, Upload, Search,
  SlidersHorizontal, ChevronDown, ArrowLeft, Sparkles, RefreshCw, Grid,
  FileText, Layout, Play, Flame, Check, HelpCircle
} from 'lucide-react';

export default function CanvasBoardView({ onSelectProject, initialViewMode = 'list', activeProject, onBackToStudio }) {
  // State: 'list' (我的画板) | 'editor' (画板编辑器)
  const [viewMode, setViewMode] = useState(initialViewMode || 'list');
  const [activeBoard, setActiveBoard] = useState(null);
  const [filterCategory, setFilterCategory] = useState('所有画板');

  React.useEffect(() => {
    if (initialViewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode]);

  // Editor Left Panel State
  const [leftNavTool, setLeftNavTool] = useState('video'); // 'image' | 'video' | 'audio'
  const [videoGenMode, setVideoGenMode] = useState('全能参考生视频'); // '全能参考生视频' | '图生视频' | '文生视频'
  const [selectedModel, setSelectedModel] = useState('Seedance 2.0');
  const [promptText, setPromptText] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [duration, setDuration] = useState('15s');
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [resolution, setResolution] = useState('4K');
  const [genCount, setGenCount] = useState(1);
  const [autoHD, setAutoHD] = useState(false);

  // Editor Canvas State
  const [canvasSubTab, setCanvasSubTab] = useState('画板'); // '画板' | '灵感库'
  const [mediaFilter, setMediaFilter] = useState('全部'); // '全部' | '图片' | '视频' | '音频'
  const [uploadedAssets, setUploadedAssets] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Preset Boards Data
  const boardsList = [
    {
      id: 'b-1',
      title: '默认画板',
      type: '独立画板',
      assetCount: 0,
      updatedAt: '3天前',
      cover: null
    },
    {
      id: 'b-2',
      title: '[项目关联画板] 大秦:开局觉醒国运...',
      type: '项目关联画板',
      assetCount: 83,
      updatedAt: '3天前',
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleOpenBoard = (board) => {
    setActiveBoard(board);
    setViewMode('editor');
  };

  const handleCreateNewBoard = () => {
    const newB = {
      id: `b-${Date.now()}`,
      title: `新建独立画板 #${boardsList.length + 1}`,
      type: '独立画板',
      assetCount: 0,
      updatedAt: '刚刚',
      cover: null
    };
    setActiveBoard(newB);
    setViewMode('editor');
  };

  const handleUploadLocalMaterial = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newItems = files.map(f => ({
        id: Math.random().toString(),
        name: f.name,
        type: f.type.includes('image') ? '图片' : f.type.includes('video') ? '视频' : '音频',
        url: URL.createObjectURL(f)
      }));
      setUploadedAssets(prev => [...prev, ...newItems]);
    }
  };

  const handleSimulateGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const generatedAsset = {
        id: Math.random().toString(),
        name: `Seedance 2.0 生成成果 #${uploadedAssets.length + 1}`,
        type: '视频',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
      };
      setUploadedAssets(prev => [generatedAsset, ...prev]);
    }, 1500);
  };

  const filteredBoards = boardsList.filter(b => {
    if (filterCategory === '独立画板') return b.type === '独立画板';
    if (filterCategory === '项目关联画板') return b.type === '项目关联画板';
    return true;
  });

  return (
    <div style={{
      width: '100%',
      flex: 1,
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)'
    }}>

      {/* =========================================================================
         VIEW 1: 我的画板 (Canvas Dashboard matching Screenshot 2)
         ========================================================================= */}
      {viewMode === 'list' && (
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '36px 24px' }}>
          
          {/* Title Header */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-serif)', marginBottom: '8px', color: 'var(--text-primary)' }}>
              我的画板
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '860px' }}>
              在画板中生成、整理同一个项目的图片、视频、音频素材。独立画板不关联短剧Agent项目，项目关联画板针对短剧Agent项目关联，自动同步Agent产出的资产。
            </p>
          </div>

          {/* Top 6 Quick Capability Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '32px'
          }}>
            {[
              { label: 'AI视频', icon: Video },
              { label: 'AI图片', icon: Image },
              { label: '音色克隆', icon: Mic },
              { label: '分镜故事板', icon: Layers },
              { label: '视听高清化', icon: Wand2 },
              { label: '一键去字幕', icon: Scissors }
            ].map((tool, i) => {
              const ToolIcon = tool.icon;
              return (
                <div
                  key={i}
                  onClick={handleCreateNewBoard}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '16px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-paper)'
                  }}
                >
                  <ToolIcon size={20} color="var(--accent-bamboo)" />
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {tool.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Category Filters Row */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            {['所有画板', '独立画板', '项目关联画板'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: filterCategory === cat ? '600' : '400',
                  border: '1px solid var(--border-color)',
                  background: filterCategory === cat ? 'var(--gradient-bamboo)' : 'var(--bg-secondary)',
                  color: filterCategory === cat ? '#FFF' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Board Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {/* Card 1: Create New Board */}
            <div
              onClick={handleCreateNewBoard}
              style={{
                height: '240px',
                borderRadius: '16px',
                border: '2px dashed var(--border-color)',
                background: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--accent-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Plus size={22} color="var(--accent-bamboo)" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  新建独立画板
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  创建一个不关联 Agent 项目的独立画板
                </div>
              </div>
            </div>

            {/* Board Cards List */}
            {filteredBoards.map((board) => (
              <div
                key={board.id}
                onClick={() => handleOpenBoard(board)}
                style={{
                  height: '240px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-paper)',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Cover Image / Placeholder */}
                <div style={{
                  flex: 1,
                  background: board.cover ? `url(${board.cover}) center/cover` : 'var(--bg-tertiary)',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontSize: '0.72rem',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#FFF',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {board.type}
                  </span>
                </div>

                {/* Footer Info */}
                <div style={{ padding: '14px 16px' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {board.title}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {board.assetCount} 资产 · {board.updatedAt}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
         VIEW 2: 画板编辑器 (Board Editor Workbench matching Screenshot 1)
         ========================================================================= */}
      {viewMode === 'editor' && (
        <div style={{ display: 'flex', height: 'calc(100vh - 64px - 50px)', overflow: 'hidden', position: 'relative' }}>
          
          {/* Leftmost Slim Icon Toolbar */}
          <div style={{
            width: '54px',
            height: '100%',
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '16px',
            gap: '18px',
            flexShrink: 0
          }}>
            {[
              { id: 'image', label: '图片', icon: Image },
              { id: 'video', label: '视频', icon: Video },
              { id: 'audio', label: '音频', icon: Mic }
            ].map(item => {
              const IconComp = item.icon;
              const isActive = leftNavTool === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setLeftNavTool(item.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    border: 'none',
                    background: 'transparent',
                    color: isActive ? 'var(--accent-bamboo)' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  <IconComp size={20} />
                  <span style={{ fontSize: '0.68rem', fontWeight: isActive ? '700' : '400' }}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Left Tool Drawer Controls Panel (Flex Column with Inner Scroll) */}
          <div style={{
            width: '320px',
            height: '100%',
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            {/* Header Title (Fixed Top) */}
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>AI 视频</span>
              </div>
              <Plus size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>

            {/* Scrollable Form Parameters Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Generation Mode Selector Pills */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['全能参考生视频', '图生视频', '文生视频'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setVideoGenMode(mode)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      fontWeight: videoGenMode === mode ? '600' : '400',
                      border: 'none',
                      cursor: 'pointer',
                      background: videoGenMode === mode ? 'var(--gradient-bamboo)' : 'var(--bg-tertiary)',
                      color: videoGenMode === mode ? '#FFF' : 'var(--text-secondary)'
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* Model Choice Dropdown */}
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>选择模型</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem', outline: 'none' }}
                >
                  <option value="Seedance 2.0">Seedance 2.0 (旗舰画质)</option>
                  <option value="Kling 1.5">可灵 AI 1.5 HD</option>
                  <option value="Sora Turbo">Sora Turbo 引擎</option>
                </select>
              </div>

              {/* Reference Media Drag Box */}
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>上传参考 (至少1张图片或1个视频)</label>
                <label style={{
                  height: '80px',
                  borderRadius: '8px',
                  border: '1px dashed var(--border-color)',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  <Upload size={16} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>导入 图片 / 视频</span>
                  <input type="file" hidden onChange={handleUploadLocalMaterial} />
                </label>
              </div>

              {/* Prompt Textarea */}
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>提示词</label>
                <textarea
                  rows={3}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="上传 1-5 个参考图片或视频，并使用 @ 提及来描述互动效果。例如：用 @Image1 作为首帧，@Image2 作为尾帧，让它们像 @Video1 一样跳舞。"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.78rem',
                    lineHeight: 1.4,
                    resize: 'none',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Aspect Ratio & Duration */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>宽高比</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    style={{ width: '100%', padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.78rem' }}
                  >
                    <option value="16:9">16:9 (横屏大片)</option>
                    <option value="9:16">9:16 (竖屏短剧)</option>
                    <option value="1:1">1:1 (正方形)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>时长</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{ width: '100%', padding: '6px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.78rem' }}
                  >
                    <option value="5s">5s</option>
                    <option value="10s">10s</option>
                    <option value="15s">15s</option>
                  </select>
                </div>
              </div>

              {/* Resolution & Toggles */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>分辨率</span>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  style={{ padding: '4px 8px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.78rem' }}
                >
                  <option value="1080P">1080P</option>
                  <option value="4K">4K 超清</option>
                </select>
              </div>

            </div>

            {/* Pinned Bottom Generate Button (flexShrink: 0, Always Visible) */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', flexShrink: 0 }}>
              <button
                onClick={handleSimulateGeneration}
                disabled={isGenerating}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '9999px',
                  border: 'none',
                  background: 'var(--gradient-bamboo)',
                  color: '#FFF',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-paper)'
                }}
              >
                <Sparkles size={16} />
                <span>{isGenerating ? 'Seedance 2.0 渲染中...' : '生成 | ⚡ 1365'}</span>
              </button>
            </div>

          </div>

          {/* Main Right Canvas Workspace */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
            
            {/* Top Workspace Header Bar */}
            <div style={{
              height: '50px',
              padding: '0 20px',
              borderBottom: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {/* Left Breadcrumb & Mode Tabs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={() => {
                    if (onBackToStudio) {
                      onBackToStudio();
                    } else {
                      setViewMode('list');
                    }
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  <ArrowLeft size={16} />
                  <span>{activeProject ? `${activeProject.title} · 项目画板` : (activeBoard ? activeBoard.title : '《大秦:开局觉醒国运系统》· 项目画板')}</span>
                  <ChevronDown size={14} color="var(--text-muted)" />
                </button>

                <div style={{ height: '16px', width: '1px', background: 'var(--border-color)' }} />

                <div style={{ display: 'flex', gap: '12px' }}>
                  {['画板', '灵感库'].map(tab => (
                    <span
                      key={tab}
                      onClick={() => setCanvasSubTab(tab)}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: canvasSubTab === tab ? '700' : '400',
                        color: canvasSubTab === tab ? 'var(--accent-bamboo)' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Media Type Filters & Upload Action Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', background: 'var(--bg-tertiary)', borderRadius: '6px', padding: '2px' }}>
                  {['全部', '图片', '视频', '音频'].map(f => (
                    <button
                      key={f}
                      onClick={() => setMediaFilter(f)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        background: mediaFilter === f ? 'var(--bg-secondary)' : 'transparent',
                        color: mediaFilter === f ? 'var(--accent-bamboo)' : 'var(--text-muted)',
                        fontWeight: mediaFilter === f ? '600' : '400'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <label style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  background: 'var(--gradient-bamboo)',
                  color: '#FFF',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  <Upload size={14} />
                  <span>上传本地素材</span>
                  <input type="file" multiple onChange={handleUploadLocalMaterial} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Central Canvas Dropzone / Asset Stream */}
            <div style={{
              flex: 1,
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: uploadedAssets.length > 0 ? 'flex-start' : 'center',
              overflowY: 'auto'
            }}>

              {/* If no assets uploaded yet, display Dropzone Box from Screenshot 1 */}
              {uploadedAssets.length === 0 ? (
                <div style={{
                  maxWidth: '540px',
                  width: '100%',
                  padding: '36px',
                  borderRadius: '20px',
                  border: '2px dashed var(--border-color)',
                  background: 'var(--bg-secondary)',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-paper)'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'var(--accent-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <Upload size={26} color="var(--accent-bamboo)" />
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                    先把素材上传到画板
                  </h3>
                  
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                    本画板你可以先统一放在右侧画板面板，后续用到时直接拖拽到左侧工具即可。
                  </p>

                  <label style={{
                    display: 'inline-block',
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    background: 'var(--gradient-bamboo)',
                    color: '#FFF',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-paper)',
                    marginBottom: '28px'
                  }}>
                    打开上传面板
                    <input type="file" multiple onChange={handleUploadLocalMaterial} style={{ display: 'none' }} />
                  </label>

                  {/* 3-Step Process Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>❶ 上传素材到画板</span>
                    <span>—</span>
                    <span>❷ 拖拽到左侧工具</span>
                    <span>—</span>
                    <span>❸ 快速套用模型生成</span>
                  </div>
                </div>
              ) : (
                /* Generated Assets & Uploaded Materials Grid */
                <div style={{ width: '100%' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                    画板资产库 ({uploadedAssets.length})
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '16px'
                  }}>
                    {uploadedAssets.map((asset) => (
                      <div
                        key={asset.id}
                        style={{
                          borderRadius: '12px',
                          overflow: 'hidden',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          boxShadow: 'var(--shadow-paper)'
                        }}
                      >
                        <div style={{ height: '140px', background: '#000', position: 'relative' }}>
                          <img src={asset.url} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '0.68rem', background: 'rgba(0,0,0,0.6)', color: '#FFF', padding: '2px 6px', borderRadius: '4px' }}>
                            {asset.type}
                          </span>
                        </div>
                        <div style={{ padding: '10px 12px' }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {asset.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
