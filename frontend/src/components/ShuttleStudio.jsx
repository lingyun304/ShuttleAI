import React, { useState } from 'react';
import {
  Plus, Folder, ArrowLeft, Sparkles, Download, List, Check, ChevronDown, Play,
  Flame, RefreshCw, FileText, Users, MapPin, Box, ExternalLink, MessageSquare,
  ArrowUp, ChevronRight, Sliders, Search, Image, Video, CheckCircle2, User, Upload
} from 'lucide-react';
import { PRESET_PROJECTS } from '../services/mockDriver';

export default function ShuttleStudio({ activeProject, initialMode = 'list', onUpdateProject, onViewCanvas }) {
  // Mode: 'list' (我的项目大厅) | 'detail' (项目详情与AI编剧台)
  const [studioMode, setStudioMode] = useState(initialMode || 'list');
  const [selectedTab, setSelectedTab] = useState('基础设定'); // '基础设定' | '大纲与剧本' | '角色' | '场景' | '道具'
  const [filterProject, setFilterProject] = useState('显示全部');
  const [agentChatInput, setAgentChatInput] = useState('');
  const [currentProject, setCurrentProject] = useState(activeProject || PRESET_PROJECTS[0]);

  React.useEffect(() => {
    if (initialMode) {
      setStudioMode(initialMode);
    }
  }, [initialMode]);

  // Tab 1 Base Settings Form State
  const [baseStyleMode, setBaseStyleMode] = useState('自定义');
  const [baseStyleDesc, setBaseStyleDesc] = useState('例如：赛博朋克风格，但色调偏暖，带有东方元素...');
  const [epMode, setEpMode] = useState('多集');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [firstDuration, setFirstDuration] = useState('120');
  const [nextDuration, setNextDuration] = useState('60');
  const [videoLang, setVideoLang] = useState('中文');
  const [charmScale, setCharmScale] = useState('全年龄');
  const [autoAudit, setAutoAudit] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('古言宫廷');
  const [selectedBg, setSelectedBg] = useState('古代');
  const [selectedTrope, setSelectedTrope] = useState('系统');

  // Project List
  const [projectsList, setProjectsList] = useState([
    {
      id: 'proj-qin',
      title: '大秦:开局觉醒国运系统',
      updatedAt: '编辑于 23 小时前',
      cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      episodes: 5,
      duration: '6m',
      characters: 16,
      scenes: 9
    }
  ]);

  const handleOpenDetail = (proj) => {
    setCurrentProject(proj);
    setStudioMode('detail');
  };

  const handleCreateNewProject = () => {
    const newP = {
      id: `proj-${Date.now()}`,
      title: '未命名短剧项目 01',
      updatedAt: '刚刚',
      cover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      episodes: 1,
      duration: '2m',
      characters: 3,
      scenes: 2
    };
    setProjectsList([newP, ...projectsList]);
    setCurrentProject(newP);
    setStudioMode('detail');
  };

  return (
    <div style={{
      width: '100%',
      flex: 1,
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      position: 'relative'
    }}>

      {/* =========================================================================
         VIEW 1: 我的项目列表大厅 (Studio List matching Screenshot 1)
         ========================================================================= */}
      {studioMode === 'list' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '24px 24px 40px 24px' }}>
          
          {/* Header Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', margin: 0 }}>
              短剧工坊
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Filter Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '4px 10px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>排序:</span>
                <select
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.78rem', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="显示全部">显示全部</option>
                  <option value="最近编辑">最近编辑</option>
                  <option value="已筹备完成">已筹备完成</option>
                </select>
              </div>

              {/* Create Project Button */}
              <button
                onClick={handleCreateNewProject}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: 'var(--gradient-bamboo)',
                  border: 'none',
                  color: '#FFF',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-paper)'
                }}
              >
                <Plus size={16} />
                <span>新建短剧项目</span>
              </button>
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {/* Project Card 1: Create Card */}
            <div
              onClick={handleCreateNewProject}
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
                  导入或创建新剧本
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  粘贴文本大纲，由 AI Agent 自动策划
                </div>
              </div>
            </div>

            {/* Existing Projects Cards */}
            {projectsList.map((proj) => (
              <div
                key={proj.id}
                onClick={() => handleOpenDetail(proj)}
                style={{
                  height: '240px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-paper)',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Cover Banner */}
                <div style={{
                  flex: 1,
                  background: `url(${proj.cover}) center/cover`,
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '0.72rem',
                    background: 'rgba(0,0,0,0.65)',
                    color: 'var(--accent-bamboo)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backdropFilter: 'blur(4px)',
                    fontWeight: '600'
                  }}>
                    ● 筹备中
                  </span>
                </div>

                {/* Footer Description */}
                <div style={{ padding: '14px 16px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {proj.title}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{proj.episodes} 集 · {proj.characters} 角色 · {proj.scenes} 场景</span>
                    <span>{proj.updatedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
         VIEW 2: 项目详情与 Agent 联动编剧台 (Studio Detail matching User Screenshots)
         ========================================================================= */}
      {studioMode === 'detail' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px - 48px)', overflow: 'hidden' }}>
          
          {/* Top Header Navigation Bar */}
          <div style={{
            height: '52px',
            padding: '0 20px',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 100,
            flexShrink: 0
          }}>
            {/* Left Back Arrow & Project Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => setStudioMode('list')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <ArrowLeft size={18} />
              </button>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {currentProject ? currentProject.title : '大秦:开局觉醒国运系统'}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>反馈</span>
            </div>

            {/* Center Navigation Tabs (5 Sub-Tabs) */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {['基础设定', '大纲与剧本', '角色', '场景', '道具'].map((tab) => (
                <span
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: selectedTab === tab ? '700' : '400',
                    color: selectedTab === tab ? 'var(--accent-bamboo)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    position: 'relative',
                    paddingBottom: '4px'
                  }}
                >
                  ● {tab}
                  {selectedTab === tab && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-12px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-bamboo)'
                    }} />
                  )}
                </span>
              ))}

              <button
                onClick={() => onViewCanvas && onViewCanvas()}
                style={{
                  padding: '4px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: '500',
                  marginLeft: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                打开项目画板
              </button>
            </div>

            {/* Right Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>
                + 添加分集
              </button>
              <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={13} color="var(--accent-bamboo)" />
                <span>AI优化大纲</span>
              </button>
              <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Download size={13} />
                <span>导出剧本与资产</span>
              </button>
              <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>
                分场列表
              </button>
              <button style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--gradient-bamboo)', border: 'none', color: '#FFF', fontWeight: '600', cursor: 'pointer' }}>
                ⚡ 筹备完成
              </button>
            </div>
          </div>

          {/* Main Two-Column Studio Layout */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            
            {/* Left Drawer Column: AI 编剧助手 (Flex Column with Inner Scrolling) */}
            <div style={{
              width: '360px',
              height: '100%',
              background: 'var(--bg-secondary)',
              borderRight: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              {/* Header (Fixed Top) */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="var(--accent-bamboo)" />
                  <span>AI 编剧助手</span>
                </div>
                <RefreshCw size={14} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              </div>

              {/* Scrollable Message & Beat Content Area */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Beat Cards Stream */}
                {[
                  {
                    tag: 'Beat 1 · 开场钩子',
                    text: '咸阳天帝深处，火把昏暗摇曳，铁链碰撞作响。盖聂佩剑站在牢房内，衣衫褶皱却目光如火... 剑拔弩张，气氛杀机逼人！',
                    roles: '嬴政、盖聂、赵高'
                  },
                  {
                    tag: 'Beat 2 · 压力升级',
                    text: '盖聂向前一步，寒光铁剑，低声警告。盖聂杀意自发，盖聂握紧佩剑，语气凝重出刺竹作决心。',
                    roles: '嬴政、盖聂、赵高'
                  },
                  {
                    tag: 'Beat 3 · 触发事件',
                    text: '盖聂出剑，快如闪电，车房内一片死寂，赵高恐惧后退，却盖聂按住了，掩面哭更哭。',
                    roles: '嬴政、盖聂、赵高'
                  },
                  {
                    tag: 'Beat 4 · 高潮爆点',
                    text: '嬴政挥手止住残剑，眼中杀意陡收，语气沉静，盖聂按剑退步，盖聂手握佩剑... 一派平静之下，十年暗潮涌动，长发飘散，整个人焕然一新——天下第一剑客气质暴现而出！',
                    roles: '嬴政、盖聂、赵高'
                  }
                ].map((beat, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-glow)',
                      borderRadius: '12px',
                      padding: '12px',
                      fontSize: '0.8rem'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', background: 'var(--gradient-bamboo)', color: '#FFF', padding: '2px 8px', borderRadius: '4px', fontWeight: '600', display: 'inline-block', marginBottom: '6px' }}>
                      {beat.tag}
                    </span>
                    <p style={{ color: 'var(--text-primary)', lineHeight: 1.5, margin: '0 0 6px 0' }}>
                      △ {beat.text}
                    </p>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      人物：{beat.roles}
                    </div>
                  </div>
                ))}

                {/* All Completed Summary Card */}
                <div style={{
                  background: 'rgba(5, 150, 105, 0.08)',
                  border: '1px solid var(--accent-bamboo)',
                  borderRadius: '12px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-bamboo)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} />
                    <span>全部完成！ 《大秦:开局觉醒国运系统》出片流程已全部完成：</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <div>• <strong>大纲：</strong> 5集 (质子赴边 &gt; 沙丘转变 &gt; 愿杀赴会 &gt; 昭阳临易 &gt; 剑出凭天)</div>
                    <div>• <strong>角色：</strong> 15个 (嬴政、盖聂、赵高 等)</div>
                    <div>• <strong>场景：</strong> 9处 / <strong>道具：</strong> 8件</div>
                    <div>• <strong>分场剧本：</strong> 5集共 30个Beat，总时长约 458秒，原始台词全部保留</div>
                  </div>
                </div>

                {/* Interactive Action Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['直接进入视频生成', '查看并调整集数分场Beat', '修改某个角色/场景设定', '修改集数大纲内容'].map((pill) => (
                    <button
                      key={pill}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.72rem',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-glow)',
                        color: 'var(--accent-bamboo)',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                {/* Agent Checklist Tasks */}
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>✓ 已解析剧本大纲 (第1-3集)</div>
                  <div>✓ 已解析剧本大纲 (第4-5集)</div>
                  <div>✓ 已解析角色设定</div>
                  <div>✓ 已解析场景设定</div>
                </div>

              </div>

              {/* Bottom Interactive Agent Input (Pinned at bottom, flexShrink: 0) */}
              <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', flexShrink: 0 }}>
                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '8px 10px' }}>
                  <textarea
                    rows={2}
                    value={agentChatInput}
                    onChange={(e) => setAgentChatInput(e.target.value)}
                    placeholder="聊创意、查资料、讨论作品，或导入小说剧本文件..."
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
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', cursor: 'pointer' }}>专业编辑 ∨</span>
                    <button
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
                      <ArrowUp size={13} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Main Column: Dynamic Sub-Tab Renderer */}
            <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', background: 'var(--bg-primary)' }}>
              
              {/* =========================================================================
                 SUB-TAB 1: 基础设定 (Base Settings matching Screenshot 1)
                 ========================================================================= */}
              {selectedTab === '基础设定' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px' }}>
                  
                  {/* 1. 画风 */}
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>画风</div>
                    <div style={{ display: 'inline-flex', gap: '8px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      {['AI真人剧', 'AI漫剧', '自定义'].map((styleOpt) => (
                        <button
                          key={styleOpt}
                          onClick={() => setBaseStyleMode(styleOpt)}
                          style={{
                            padding: '6px 20px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            background: baseStyleMode === styleOpt ? 'var(--gradient-bamboo)' : 'transparent',
                            color: baseStyleMode === styleOpt ? '#FFF' : 'var(--text-secondary)'
                          }}
                        >
                          {styleOpt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. 画风描述 */}
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>画风描述</div>
                    <textarea
                      rows={3}
                      value={baseStyleDesc}
                      onChange={(e) => setBaseStyleDesc(e.target.value)}
                      placeholder="例如：赛博朋克风格，但色调偏暖，带有东方元素..."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        resize: 'none',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* 3. 基础设定 */}
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>基础设定</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                      {/* 集模式 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>集模式</div>
                        <div style={{ display: 'inline-flex', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '2px' }}>
                          {['单集', '多集'].map(m => (
                            <button
                              key={m}
                              onClick={() => setEpMode(m)}
                              style={{
                                padding: '4px 12px',
                                borderRadius: '4px',
                                fontSize: '0.78rem',
                                border: 'none',
                                cursor: 'pointer',
                                background: epMode === m ? 'var(--accent-glow)' : 'transparent',
                                color: epMode === m ? 'var(--accent-bamboo)' : 'var(--text-muted)',
                                fontWeight: epMode === m ? '700' : '400'
                              }}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 比例 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>比例</div>
                        <select
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value)}
                          style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
                        >
                          <option value="16:9">🖥️ 16:9 ∨</option>
                          <option value="9:16">📱 9:16 ∨</option>
                          <option value="1:1">⬛ 1:1 ∨</option>
                        </select>
                      </div>

                      {/* 首集时长 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>首集时长</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <input
                            type="number"
                            value={firstDuration}
                            onChange={(e) => setFirstDuration(e.target.value)}
                            style={{ width: '70px', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem', textAlign: 'center' }}
                          />
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>秒</span>
                        </div>
                      </div>

                      {/* 后续集时长 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>后续集时长</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <input
                            type="number"
                            value={nextDuration}
                            onChange={(e) => setNextDuration(e.target.value)}
                            style={{ width: '70px', padding: '6px 10px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem', textAlign: 'center' }}
                          />
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>秒</span>
                        </div>
                      </div>

                      {/* 视频语言 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>视频语言</div>
                        <select
                          value={videoLang}
                          onChange={(e) => setVideoLang(e.target.value)}
                          style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
                        >
                          <option value="中文">中文 ∨</option>
                          <option value="英文">英文 ∨</option>
                          <option value="日文">日文 ∨</option>
                        </select>
                      </div>

                      {/* 魅力尺度 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>魅力尺度</div>
                        <select
                          value={charmScale}
                          onChange={(e) => setCharmScale(e.target.value)}
                          style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
                        >
                          <option value="全年龄">全年龄 ∨</option>
                          <option value="16+">16+ ∨</option>
                          <option value="18+">18+ ∨</option>
                        </select>
                      </div>

                    </div>
                  </div>

                  {/* 4. 系统设置 */}
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>系统设置</div>
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>自动审查优化</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          普通创作模式下，生成大纲和剧本后 AI 会自动进行一轮审查优化；开启后剧本质量更高，但生成耗时会增加，建议开启
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoAudit}
                        onChange={(e) => setAutoAudit(e.target.checked)}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--accent-bamboo)', cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  {/* 5. 创作定位 */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>创作定位</div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', cursor: 'pointer' }}>展开 &gt;</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {/* 题材 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>题材</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {['现实都市', '古言宫廷', '仙侠玄幻', '校园青春', '年代情感', '民国传奇', '悬疑刑侦', '恐怖灵异', '科幻机甲', '武侠动作', '职场商战', '乡村现实', '奇幻脑洞', '家庭情感', '求生冒险', '轻喜剧', '自定义...'].map(t => (
                            <button
                              key={t}
                              onClick={() => setSelectedGenre(t)}
                              style={{
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                background: selectedGenre === t ? 'var(--gradient-bamboo)' : 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                color: selectedGenre === t ? '#FFF' : 'var(--text-secondary)',
                                cursor: 'pointer'
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 背景 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>背景</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {['现代', '古代', '民国', '架空', '校园', '职场', '乡村', '荒岛', '宫廷', '自定义...'].map(b => (
                            <button
                              key={b}
                              onClick={() => setSelectedBg(b)}
                              style={{
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                background: selectedBg === b ? 'var(--gradient-bamboo)' : 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                color: selectedBg === b ? '#FFF' : 'var(--text-secondary)',
                                cursor: 'pointer'
                              }}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 设定 */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>设定</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {['重生', '穿越', '系统', '马甲', '先婚后爱', '追妻火葬场', '大女主', '大男主', '强者回归', '破镜重圆', '自定义...'].map(s => (
                            <button
                              key={s}
                              onClick={() => setSelectedTrope(s)}
                              style={{
                                padding: '4px 12px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                background: selectedTrope === s ? 'var(--gradient-bamboo)' : 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                color: selectedTrope === s ? '#FFF' : 'var(--text-secondary)',
                                cursor: 'pointer'
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* =========================================================================
                 SUB-TAB 2: 大纲与剧本 (Outline & Script matching Screenshot 2)
                 ========================================================================= */}
              {selectedTab === '大纲与剧本' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Top Overview Banner Card */}
                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    boxShadow: 'var(--shadow-paper)'
                  }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
                      项目概览
                    </h3>
                    
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-bamboo)', fontWeight: '700', marginBottom: '2px' }}>一句话故事</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        穿越重生的历史教师嬴昭，在秦帝国覆灭前夜被迫承担逆转历史的使命，用超越时代的力量对抗权谋暗局、拯救注定的死局。
                      </p>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--accent-bamboo)', fontWeight: '700', marginBottom: '2px' }}>大期待</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        穿越少年以系统加持的超能力对抗帝国权谋，从被贬低的"废物庶子"逆转为率兵起义的战神，在热血复仇与改变历史的抉择中承担秦帝国命运。
                      </p>
                    </div>

                    {/* Metric Badges */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {['5 集', '6m', '15 角色', '9 场景'].map(m => (
                        <span key={m} style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '4px 12px', borderRadius: '6px', fontWeight: '600' }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Episode Cards Section */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {[
                      { ep: 'EP1', title: '庶子赴边', desc: '秦始皇三十七年，始皇帝命扶苏蒙恬赴上郡练兵，扶苏请旨带庶弟嬴昭同行，始皇当众嘲讽其为\'只会举鼎的废物\'后勉强应允。寒酸小院中，穿越两年的嬴昭暗下决心改变命运。血影卫破门宣旨命其赴上郡，嬴昭瞳孔紧缩——历史的死局已经启动。', duration: '120s', status: '剧本完成 (6个分场)', videoStatus: '视频 6/6' },
                      { ep: 'EP2', title: '沙丘惊变', desc: '上郡校场，嬴昭徒手劈碎巨石震慑众将却仍被视为莽夫。沙丘行宫始皇驾崩，赵高胁迫李斯连夜伪造遗诏，矫诏送达上郡：赐扶苏自尽、蒙恬下狱。嬴昭拼死阻拦怒吼\'这是矫诏\'，扶苏含泪道\'父命不可违\'，一剑自刎于嬴昭怀中，鲜血染红双臂。', duration: '60s', status: '剧本完成 (6个分场)', videoStatus: '视频 1/6' },
                      { ep: 'EP3', title: '怒杀赵合', desc: '国运系统激活，嬴昭修为直升先天境巅峰。赵高亲弟赵合率二十五名大秦龙骑、百名禁军围杀嬴昭——嬴昭一人从府内杀到府外，一掌捏碎宗师境赵合的咽喉，提着血淋淋的人头站在三万长城军阵前。长城军被恐怖杀气震慑，纷纷单膝跪地归顺。嬴昭将扶苏灵柩置于高台，当众誓师起兵清君侧。', duration: '60s', status: '剧本完成 (6个分场)', videoStatus: '视频 0/6' },
                      { ep: 'EP4', title: '咸阳暗局', desc: '消息传到咸阳朝堂引起震动，胡亥、李斯、赵高慌忙商议对策。赵高献策勾结匈奴头曼单于南下围剿嬴昭，许诺割让上郡、河内、代郡三郡之地，胡亥被说服同意。随后赵高来到天牢，嘲讽被关押十年的天下第一剑客盖聂...', duration: '90s', status: '剧本完成 (6个分场)', videoStatus: '视频 0/6' }
                    ].map((item) => (
                      <div
                        key={item.ep}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '14px',
                          padding: '18px 20px',
                          boxShadow: 'var(--shadow-paper)'
                        }}
                      >
                        {/* Top Episode Row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent-bamboo)' }}>
                              {item.ep}
                            </span>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                              {item.title}
                            </h4>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.72rem', background: 'var(--bg-tertiary)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px' }}>
                              {item.duration}
                            </span>
                            <span style={{ fontSize: '0.72rem', background: 'var(--accent-glow)', color: 'var(--accent-bamboo)', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                              {item.status}
                            </span>
                            <span style={{ fontSize: '0.72rem', background: 'var(--bg-tertiary)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px' }}>
                              {item.videoStatus}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>
                          {item.desc}
                        </p>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                          <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <FileText size={14} color="var(--accent-bamboo)" />
                            <span>查看/编辑详细剧本</span>
                          </button>
                          <button style={{ padding: '6px 16px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--gradient-bamboo)', border: 'none', color: '#FFF', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Video size={14} />
                            <span>进入视频生成环节 ∨</span>
                          </button>
                        </div>

                      </div>
                    ))}

                  </div>

                </div>
              )}

              {/* =========================================================================
                 SUB-TAB 3: 角色 (Characters matching Screenshot 3)
                 ========================================================================= */}
              {selectedTab === '角色' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Top Action Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>角色设定</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Download size={14} />
                        <span>导出角色</span>
                      </button>
                      <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--gradient-bamboo)', border: 'none', color: '#FFF', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Plus size={14} />
                        <span>添加角色</span>
                      </button>
                    </div>
                  </div>

                  {/* 2-Column Grid of Characters Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
                    
                    {/* Character Card 1: 盖聂 */}
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-paper)' }}>
                      {/* Character Turn-around Render */}
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '12px', background: '#000' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2px' }}>
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="盖聂" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                          <div style={{ background: '#111', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFF', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>盖聂 · 默认造型</div>
                            <div style={{ fontSize: '0.72rem', color: '#AAA', textAlign: 'center', lineHeight: 1.5 }}>
                              正面 view · 侧面 view · 背面 view (3-View Model Sheet)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Actions Row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--accent-bamboo)', cursor: 'pointer' }}>🔄 重新生成 ⚡ 8 ∨</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>📤 本地上传</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>✏️ 自由创作</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>🔲 画板导入</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>👤 虚拟演员肖像库</button>
                      </div>

                      {/* Character Specs Description */}
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>盖聂 (配角)</div>
                        <div>外貌描述：身高178cm / 头身比8头身 / 东亚人种 / 偏瘦却筋骨如铁，道玄境强者...</div>
                        <div>服饰与道具：天牢中衣衫褴褛，双手被玄铁锁链吊于半空...</div>
                      </div>

                      {/* Personality Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                        {['话少冷峻句句带刀', '为蒸暑甘愿十年为囚', '对赵高不屑但被拔后妥协', '道玄境气势倾泻血影卫后退'].map(tag => (
                          <span key={tag} style={{ fontSize: '0.72rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '9999px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Audio Button */}
                      <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Upload size={14} />
                        <span>上传参考音频 (2-15s)</span>
                      </button>

                    </div>

                    {/* Character Card 2: 胡亥 */}
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-paper)' }}>
                      {/* Character Turn-around Render */}
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '12px', background: '#000' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2px' }}>
                          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" alt="胡亥" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                          <div style={{ background: '#111', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#FFF', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>胡亥 · 角色定位: villain</div>
                            <div style={{ fontSize: '0.72rem', color: '#AAA', textAlign: 'center', lineHeight: 1.5 }}>
                              正面 view · 侧面 view · 背面 view (3-View Model Sheet)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Actions Row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--accent-bamboo)', cursor: 'pointer' }}>🔄 重新生成 ⚡ 8 ∨</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>📤 本地上传</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>✏️ 自由创作</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>🔲 画板导入</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>👤 虚拟演员肖像库</button>
                      </div>

                      {/* Character Specs Description */}
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                        <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>胡亥 (反派)</div>
                        <div>外貌描述：身高168cm / 头身比7头身 / 体型偏胖软弱 / 面部特征圆脸眼滴溜溜...</div>
                        <div>服饰与道具：帝王黑色龙袍，玉带束腰，坐于龙椅上随机弹起...</div>
                      </div>

                      {/* Personality Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                        {['懦弱无能完全依附赵高', '得到好消息狂喜失态', '一听割地立刻心疼又迅速妥协', '对赵高言听计从'].map(tag => (
                          <span key={tag} style={{ fontSize: '0.72rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: '9999px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Audio Button */}
                      <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Upload size={14} />
                        <span>上传参考音频 (2-15s)</span>
                      </button>

                    </div>

                  </div>

                </div>
              )}

              {/* =========================================================================
                 SUB-TAB 4: 场景 (Scenes matching Screenshot 4)
                 ========================================================================= */}
              {selectedTab === '场景' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Top Action Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>场景设定</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Download size={14} />
                        <span>导出场景</span>
                      </button>
                      <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--gradient-bamboo)', border: 'none', color: '#FFF', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Plus size={14} />
                        <span>添加场景</span>
                      </button>
                    </div>
                  </div>

                  {/* 2-Column Grid of Scene Concept Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
                    
                    {/* Scene 1: 咸阳宫大殿 */}
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-paper)' }}>
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '12px', background: '#000', position: 'relative' }}>
                        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" alt="咸阳宫大殿" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }}>
                          咸阳宫大殿 · 精品古装真人短剧场景概念设计
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--accent-bamboo)', cursor: 'pointer' }}>🔄 重新生成 ⚡ 8 ∨</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>📤 本地上传</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>✏️ 自由创作</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>🔲 画板导入</button>
                      </div>

                      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>咸阳宫大殿</div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        视觉描述：巍峨高耸的秦代宫殿大殿，黑色巨型立柱上浮雕缠龙盘旋而上，鳞甲清晰，龙爪张扬...
                      </p>
                    </div>

                    {/* Scene 2: 芈夫人寝宫小院 */}
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-paper)' }}>
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '12px', background: '#000', position: 'relative' }}>
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" alt="芈夫人寝宫小院" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }}>
                          芈夫人寝宫小院 · 全景定场与多角度细节
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--accent-bamboo)', cursor: 'pointer' }}>🔄 重新生成 ⚡ 8 ∨</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>📤 本地上传</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>✏️ 自由创作</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>🔲 画板导入</button>
                      </div>

                      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>芈夫人寝宫小院</div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        视觉描述：逼仄寒酸的宫中偏院，院墙斑驳剥落，青苔沿砖缝蔓延。屋内陈设极为简朴...
                      </p>
                    </div>

                  </div>

                </div>
              )}

              {/* =========================================================================
                 SUB-TAB 5: 道具 (Props matching Screenshot 5)
                 ========================================================================= */}
              {selectedTab === '道具' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Top Action Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>道具设定</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Download size={14} />
                        <span>导出道具</span>
                      </button>
                      <button style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', background: 'var(--gradient-bamboo)', border: 'none', color: '#FFF', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Plus size={14} />
                        <span>添加道具</span>
                      </button>
                    </div>
                  </div>

                  {/* 2-Column Grid of Prop Concept Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '20px' }}>
                    
                    {/* Prop 1: 黑色密诏 (矫诏) */}
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-paper)' }}>
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '12px', background: '#000', position: 'relative' }}>
                        <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" alt="黑色密诏" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }}>
                          黑色密诏 (矫诏) · 3D概念拆解图
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--accent-bamboo)', cursor: 'pointer' }}>🔄 重新生成 ⚡ 8 ∨</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>📤 本地上传</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>✏️ 自由创作</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>🔲 画板导入</button>
                      </div>

                      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>黑色密诏 (矫诏)</div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        外观描述：一卷展开约三十厘米宽的黑色帛书，丝质光滑、边缘平整，墨边以朱红官印与黑色帛书密布其上...
                      </p>
                    </div>

                    {/* Prop 2: 信物: 空白帛书与玉玺 */}
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow-paper)' }}>
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '12px', background: '#000', position: 'relative' }}>
                        <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80" alt="信物: 空白帛书与玉玺" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: '#FFF', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }}>
                          信物: 空白帛书与玉玺 · 材质细节标注
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--accent-bamboo)', cursor: 'pointer' }}>🔄 重新生成 ⚡ 8 ∨</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>📤 本地上传</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>✏️ 自由创作</button>
                        <button style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.74rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}>🔲 画板导入</button>
                      </div>

                      <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>信物: 空白帛书与玉玺</div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        外观描述：一套两件组合道具：空白帛书为米白色宽幅绢帛，表面光洁微透光... 玉玺为方形青白玉质...
                      </p>
                    </div>

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
