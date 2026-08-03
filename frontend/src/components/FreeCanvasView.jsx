import React, { useState } from 'react';
import {
  Plus, Play, Move, Link, Sparkles, Sliders, Type, Image, Video,
  Wand2, Folder, ZoomIn, ZoomOut, ArrowUp, ChevronDown, Settings, X, Upload
} from 'lucide-react';

export default function FreeCanvasView({ onSelectProject, initialViewMode = 'list' }) {
  // Mode: 'list' (我的自由画布) | 'editor' (自由画布编辑器)
  const [viewMode, setViewMode] = useState(initialViewMode || 'list');
  const [canvasTitle, setCanvasTitle] = useState('无标题画布 01');
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);

  React.useEffect(() => {
    if (initialViewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode]);

  // Spawned Canvas Nodes State
  const [nodes, setNodes] = useState([
    {
      id: 'n-1',
      title: 'AI 剧本构思节点',
      type: 'script',
      x: 320,
      y: 180,
      content: '主角在绝境中触发上古国运系统，剧情展开...',
      status: 'ready'
    },
    {
      id: 'n-2',
      title: 'Seedance 2.0 分镜渲染',
      type: 'video',
      x: 660,
      y: 180,
      content: '正在渲染 4K 16:9 高清短片视频帧...',
      status: 'rendering'
    }
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState('n-1');

  // Preset Canvases List
  const canvasList = [
    {
      id: 'c-1',
      title: '2026-08-01 21:50',
      time: '16 小时前',
      nodeCount: 3
    }
  ];

  const handleCreateNewCanvas = () => {
    setCanvasTitle(`无标题画布 ${canvasList.length + 1}`);
    setNodes([]);
    setViewMode('editor');
  };

  const handleOpenCanvas = (item) => {
    setCanvasTitle(item.title);
    setNodes([
      {
        id: 'n-1',
        title: 'AI 剧本构思节点',
        type: 'script',
        x: 320,
        y: 180,
        content: '主角在绝境中触发上古造物，翻盘故事脉络...',
        status: 'ready'
      },
      {
        id: 'n-2',
        title: 'Seedance 2.0 分镜画幅生成',
        type: 'video',
        x: 660,
        y: 180,
        content: '正在渲染 4K 16:9 高清短片视频帧...',
        status: 'rendering'
      }
    ]);
    setViewMode('editor');
  };

  const handleAddNodeFromPill = (label) => {
    const newNode = {
      id: `node-${Date.now()}`,
      title: label,
      type: label.includes('脚本') ? 'script' : label.includes('视频') ? 'video' : 'creative',
      x: 280 + (nodes.length * 40),
      y: 140 + (nodes.length * 30),
      content: `自动套用模板：[${label}]。点击修改节点细节或连接其他节点...`,
      status: 'ready'
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)'
    }}>

      {/* =========================================================================
         VIEW 1: 自由画布列表大厅 (Dashboard)
         ========================================================================= */}
      {viewMode === 'list' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '36px',
          paddingBottom: '36px',
          position: 'relative',
          background: 'var(--bg-primary)',
          overflowY: 'auto',
          flex: 1
        }}>

          {/* Faint Background Grid Watermark (#) */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '60px',
            opacity: 0.08,
            fontSize: '8rem',
            fontFamily: 'monospace',
            pointerEvents: 'none',
            color: 'var(--text-primary)'
          }}>
            #
          </div>

          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 36px auto' }}>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '12px' }}>
              自由画布
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              基于节点流与大模型共创的无界视觉工坊
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', width: '100%', maxWidth: '960px', padding: '0 24px' }}>
            {/* Create Card */}
            <div
              onClick={handleCreateNewCanvas}
              style={{
                height: '180px',
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
              <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>新建自由画布</span>
            </div>

            {/* Canvas List */}
            {canvasList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenCanvas(item)}
                style={{
                  height: '180px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-paper)',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</span>
                  <span style={{ fontSize: '0.72rem', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent-bamboo)', fontWeight: '600' }}>
                    {item.nodeCount} 节点
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
         VIEW 2: 自由画布 节点编辑器 (Canvas Workbench matching Screenshot 2)
         ========================================================================= */}
      {viewMode === 'editor' && (
        <div style={{
          width: '100%',
          height: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          background: 'var(--bg-primary)'
        }}>

          {/* 1. Top Sub-Navbar */}
          <div style={{
            height: '44px',
            padding: '0 16px',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 100,
            flexShrink: 0
          }}>
            {/* Left Title & Settings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <span>默认画布</span>
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>
              <Settings size={15} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            </div>

            {/* Center Run Simulation Button */}
            <button
              onClick={() => alert('正在全量渲染并执行当前画布节点图表流程...')}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'var(--gradient-bamboo)',
                border: 'none',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-paper)'
              }}
              title="运行画布节点"
            >
              <Play size={14} fill="#FFF" />
            </button>

            {/* Right Header Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer' }}>反馈</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer' }}>任务</span>
              <span style={{ fontSize: '0.72rem', background: 'var(--accent-glow)', color: 'var(--accent-bamboo)', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                + 0 算力
              </span>
              <button
                onClick={() => setIsAgentDrawerOpen(!isAgentDrawerOpen)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  border: '1px solid var(--border-color)',
                  background: isAgentDrawerOpen ? 'var(--gradient-bamboo)' : 'var(--bg-tertiary)',
                  color: isAgentDrawerOpen ? '#FFF' : 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Agent 助手
              </button>
            </div>
          </div>

          {/* Main Canvas Area (Flex 1) */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

            {/* Left Floating Tool Bar */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 90,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'var(--bg-secondary)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '6px 4px',
              boxShadow: 'var(--shadow-paper)'
            }}>
              {[
                { id: 'select', title: '选择/移动', icon: Move },
                { id: 'upload', title: '导入素材', icon: Upload },
                { id: 'link', title: '连线节点', icon: Link },
                { id: 'ai', title: 'AI 节点', icon: Sparkles },
                { id: 'sliders', title: '参数调节', icon: Sliders },
                { id: 'text', title: '文字节点', icon: Type },
                { id: 'image', title: '图片节点', icon: Image },
                { id: 'video', title: '视频节点', icon: Video },
                { id: 'wand', title: '魔法修图', icon: Wand2 },
                { id: 'folder', title: '预设模板', icon: Folder }
              ].map(tool => {
                const ToolIcon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    title={tool.title}
                    onClick={() => handleAddNodeFromPill(tool.title)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ToolIcon size={16} />
                  </button>
                );
              })}
            </div>

            {/* Center Grid Paper Background & Nodes */}
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              backgroundImage: 'radial-gradient(circle, var(--border-color) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out'
            }}>

              {/* Center Hint Overlay */}
              <div style={{
                position: 'absolute',
                top: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                pointerEvents: 'none'
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '4px 14px', borderRadius: '9999px' }}>
                  按 <code style={{ color: 'var(--accent-bamboo)', fontWeight: '700' }}>/</code> 与 Agent 共创 或 点击工具栏添加节点
                </span>
              </div>

              {/* Floating Shortcut Pills on Canvas */}
              <div style={{
                position: 'absolute',
                top: '86px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                maxWidth: '640px',
                justifyContent: 'center'
              }}>
                {[
                  '📄 构思影片剧本',
                  '🎬 视频短片策划',
                  '🎥 AI 微电影',
                  '📢 设计商品广告',
                  '⚙️ 批量制作视频',
                  '🔗 粘贴URL来创作视频'
                ].map(pill => (
                  <button
                    key={pill}
                    onClick={() => handleAddNodeFromPill(pill)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.76rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-paper)'
                    }}
                  >
                    {pill}
                  </button>
                ))}
              </div>

              {/* Render Spawned Nodes */}
              {nodes.map(n => (
                <div
                  key={n.id}
                  onClick={() => setSelectedNodeId(n.id)}
                  style={{
                    position: 'absolute',
                    left: `${n.x}px`,
                    top: `${n.y}px`,
                    width: '260px',
                    background: 'var(--bg-secondary)',
                    border: selectedNodeId === n.id ? '2px solid var(--accent-bamboo)' : '1px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '14px',
                    boxShadow: 'var(--shadow-paper)',
                    cursor: 'move'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)' }}>{n.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNodes(prev => prev.filter(x => x.id !== n.id));
                      }}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, background: 'var(--bg-tertiary)', padding: '8px', borderRadius: '6px' }}>
                    {n.content}
                  </div>
                </div>
              ))}

            </div>

            {/* Bottom Right Zoom Controls */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              right: isAgentDrawerOpen ? '360px' : '16px',
              zIndex: 90,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '9999px',
              padding: '4px 12px',
              boxShadow: 'var(--shadow-paper)',
              transition: 'right 0.3s ease'
            }}>
              <button onClick={() => setZoomLevel(prev => Math.max(prev - 10, 50))} style={{ border: 'none', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>-</button>
              <span style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-primary)' }}>{zoomLevel}%</span>
              <button onClick={() => setZoomLevel(prev => Math.min(prev + 10, 150))} style={{ border: 'none', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>+</button>
            </div>

            {/* Right Agent Co-Pilot Chat Drawer Panel (Self-Adaptive Flex Height with Pinned Bottom Input) */}
            {isAgentDrawerOpen && (
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '340px',
                background: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 100,
                boxShadow: '-4px 0 20px rgba(0,0,0,0.12)',
                overflow: 'hidden'
              }}>
                {/* Header (Fixed Top) */}
                <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.72rem', background: 'var(--accent-glow)', color: 'var(--accent-bamboo)', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    + 0 算力
                  </span>
                  <X size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} onClick={() => setIsAgentDrawerOpen(false)} />
                </div>

                {/* Scrollable Body Content */}
                <div style={{ flex: 1, padding: '14px', overflowY: 'auto' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '12px', textAlign: 'center', lineHeight: 1.4 }}>
                    你好，Canvas User<br />今天想创作什么？
                  </h3>

                  {/* Tag Cloud Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginBottom: '14px' }}>
                    {[
                      '构思影片剧本', '设计商品广告', '批量制作视频', 'AI 微电影',
                      'UGC 爆款广告', '粘贴URL来创作视频', '复制短片编剧',
                      '广告宣传视频', '制作爆款金雪主题', 'AI 短剧', '社交短广告',
                      '动画短片', '广告视频策划', '品牌故事片', '历史角色解读'
                    ].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleAddNodeFromPill(tag)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.74rem',
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Input Box (Pinned at Bottom, flexShrink: 0) */}
                <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', flexShrink: 0 }}>
                  <div style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '8px 10px'
                  }}>
                    <textarea
                      rows={2}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="描述你的想法，使用 @ 引用素材"
                      style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '0.78rem',
                        resize: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', cursor: 'pointer' }}>专业模式 ∨</span>
                      <button
                        onClick={() => {
                          if (chatInput.trim()) {
                            handleAddNodeFromPill(chatInput);
                            setChatInput('');
                          }
                        }}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'var(--gradient-bamboo)',
                          border: 'none',
                          color: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <ArrowUp size={14} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
