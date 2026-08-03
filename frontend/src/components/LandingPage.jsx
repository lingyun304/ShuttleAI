import React, { useState } from 'react';
import {
  Sparkles, ArrowRight, Play, Cpu, Film, Users, Feather, BookOpen, Layers,
  Upload, Paperclip, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Zap,
  LayoutGrid, Folder, User, MessageCircle, Palette, Video, ArrowUp, Bell, Book, Flame
} from 'lucide-react';
import ShortDramaPlayerModal from './ShortDramaPlayerModal';
import { PRESET_PROJECTS } from '../services/mockDriver';

export default function LandingPage({ onStartProject, onViewShowcase, currentView = 'landing', setCurrentView, currentTheme, onChangeTheme }) {
  const [activeTab, setActiveTab] = useState('创作Agent'); // '创作Agent' | '自由画布'
  const [ideaText, setIdeaText] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('仿真人剧'); // '仿真人剧' | '漫剧'
  const [selectedPlanner, setSelectedPlanner] = useState('专业策划');
  const [showPlannerDropdown, setShowPlannerDropdown] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  // Fullscreen Short Drama Player Modal State
  const [selectedPlayerDrama, setSelectedPlayerDrama] = useState(null);

  // Carousel Index State
  const [carouselIndex, setCarouselIndex] = useState(1);

  const carouselItems = [
    {
      id: 1,
      badge: 'Seedance 2.0 Mini',
      title: '正式上线',
      subtitle: '更快出片 · 质感升维',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      tag: 'Seedance 2.0'
    },
    {
      id: 2,
      badge: '续写 2 次',
      title: '画面续写与长镜头',
      subtitle: 'SEEDANCE 2.0 画面续写 · 连贯度媲美影棚',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      tag: 'Seedance 2.0 画面续写'
    },
    {
      id: 3,
      badge: '音色绑定',
      title: '音色绑定功能上线',
      subtitle: '角色专属克隆音色 · 自动对齐口型',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      tag: '专属音色绑定'
    }
  ];

  const handleStart = () => {
    const finalPrompt = ideaText || `爆款${selectedFormat}短剧：主角逆境反杀，高能钩子剧情，镜头质感媲美影棚大片`;
    onStartProject(finalPrompt, selectedFormat);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setUploadedFileName(file.name);
      setTimeout(() => {
        setIsUploading(false);
        setIdeaText(`[从文件 《${file.name}》 解析出的剧情]：故事讲述大秦乱世，主角被禁封后逆天崛起，高能剧情反转不断...`);
      }, 1000);
    }
  };

  // Recent Projects List
  const recentProjects = [
    {
      id: 'rp-1',
      title: '大秦:开局被禁诛杀若能',
      epCount: '1集',
      charCount: '16个角色',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    }
  ];

  // Posters List (剧梭片场)
  const theaterPosters = [
    {
      id: 'p-1',
      title: '重回93，从下乡收菜开始发家',
      badge: '剧梭独播',
      plays: '全网播放量破 8000万',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-close-up-of-a-man-in-a-leather-jacket-41544-large.mp4',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p-2',
      title: '黑化仙尊与毒医娇妻',
      badge: '剧梭独播',
      plays: '全网播放量破 1.2亿',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-scene-of-a-man-looking-around-in-the-dark-41549-large.mp4',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p-3',
      title: '一枕山河踏月来',
      badge: '剧梭独播',
      subBadge: '全网播放量破亿',
      plays: '热播榜 NO.1',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-with-a-serious-expression-close-up-41551-large.mp4',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p-4',
      title: '神尊降世：诸天至尊',
      badge: '剧梭精选',
      plays: '全网播放量破 9500万',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-neon-lit-city-41543-large.mp4',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      paddingBottom: '24px',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      
      {/* Main Page Layout */}
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '30px 24px 0 24px', position: 'relative' }}>
        
        {/* Dynamic Background Ambient Radial Glow */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '420px',
          background: 'var(--gradient-hero)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* 2. Top Banner Feature Carousel (Theme Harmonized) */}
        <section style={{ position: 'relative', zIndex: 1, marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            {/* Left Nav Arrow */}
            <button
              onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : carouselItems.length - 1))}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-paper)'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Carousel Cards Track */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', overflow: 'hidden' }}>
              {carouselItems.map((item, idx) => {
                const isActive = idx === carouselIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => setCarouselIndex(idx)}
                    style={{
                      width: isActive ? '340px' : '220px',
                      height: isActive ? '140px' : '110px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: isActive ? '1px solid var(--accent-bamboo)' : '1px solid var(--border-color)',
                      boxShadow: isActive ? 'var(--shadow-paper)' : 'none',
                      opacity: isActive ? 1 : 0.65,
                      transform: isActive ? 'scale(1)' : 'scale(0.92)'
                    }}
                  >
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', background: 'var(--gradient-bamboo)', color: '#FFF', padding: '2px 8px', borderRadius: '6px', fontWeight: '600' }}>
                          {item.badge}
                        </span>
                      </div>
                      <div>
                        <h4 style={{ fontSize: isActive ? '1rem' : '0.85rem', fontWeight: '700', color: '#FFF', marginBottom: '2px' }}>
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={() => setCarouselIndex((prev) => (prev < carouselItems.length - 1 ? prev + 1 : 0))}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-paper)'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* 3. Hero Main Headline */}
        <section style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginBottom: '28px' }}>
          <h1 style={{
            fontSize: '2.6rem',
            fontWeight: '700',
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
            margin: 0
          }}>
            AI编剧+导演，一人短剧工作室
          </h1>
        </section>

        {/* 4. Central Creation Agent Card */}
        <section style={{ maxWidth: '640px', margin: '0 auto 40px auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            background: 'var(--bg-secondary)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: '18px',
            padding: '18px 22px',
            boxShadow: 'var(--shadow-paper)'
          }}>
            {/* Top Tabs */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <button
                onClick={() => setActiveTab('创作Agent')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === '创作Agent' ? 'var(--accent-bamboo)' : 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: activeTab === '创作Agent' ? '700' : '400',
                  cursor: 'pointer',
                  position: 'relative',
                  paddingBottom: '4px'
                }}
              >
                创作Agent
                {activeTab === '创作Agent' && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-11px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--accent-bamboo)',
                    borderRadius: '2px'
                  }} />
                )}
              </button>

              <button
                onClick={() => setActiveTab('自由画布')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === '自由画布' ? 'var(--accent-bamboo)' : 'var(--text-muted)',
                  fontSize: '0.95rem',
                  fontWeight: activeTab === '自由画布' ? '700' : '400',
                  cursor: 'pointer',
                  position: 'relative',
                  paddingBottom: '4px'
                }}
              >
                自由画布
                {activeTab === '自由画布' && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-11px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--accent-bamboo)',
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            </div>

            {/* Prompt Textarea Input */}
            <textarea
              rows={3}
              placeholder="上传剧本、小说，或直接输入你的故事想法，Agent会自动为你策划短剧并制作视频。"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                lineHeight: 1.65,
                resize: 'none',
                fontFamily: 'inherit'
              }}
            />

            {/* Bottom Inner Tools Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed var(--border-color)' }}>
              {/* Left Attachment Icon */}
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }} title="上传剧本文件">
                <Paperclip size={18} color="var(--accent-bamboo)" />
                <span>{uploadedFileName ? `已解析: ${uploadedFileName}` : '上传大纲/剧本'}</span>
                <input type="file" accept=".txt,.docx,.md,.pdf" style={{ display: 'none' }} onChange={handleFileUpload} />
              </label>

              {/* Middle & Right Tools */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Badges */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setSelectedFormat('仿真人剧')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: selectedFormat === '仿真人剧' ? '600' : '400',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      background: selectedFormat === '仿真人剧' ? 'var(--accent-glow)' : 'var(--bg-tertiary)',
                      color: selectedFormat === '仿真人剧' ? 'var(--accent-bamboo)' : 'var(--text-muted)'
                    }}
                  >
                    仿真人剧
                  </button>
                  <button
                    onClick={() => setSelectedFormat('漫剧')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: selectedFormat === '漫剧' ? '600' : '400',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      background: selectedFormat === '漫剧' ? 'var(--accent-glow)' : 'var(--bg-tertiary)',
                      color: selectedFormat === '漫剧' ? 'var(--accent-bamboo)' : 'var(--text-muted)'
                    }}
                  >
                    漫剧
                  </button>
                </div>

                {/* Dropdown Selector */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowPlannerDropdown(!showPlannerDropdown)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{selectedPlanner}</span>
                    <ChevronDown size={14} color="var(--accent-bamboo)" />
                  </button>

                  {showPlannerDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '32px',
                      right: 0,
                      width: '120px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '4px',
                      zIndex: 100,
                      boxShadow: 'var(--shadow-paper)'
                    }}>
                      {['专业策划', '爆款冲榜', '极速大纲'].map((p) => (
                        <div
                          key={p}
                          onClick={() => { setSelectedPlanner(p); setShowPlannerDropdown(false); }}
                          style={{
                            padding: '6px 10px',
                            fontSize: '0.78rem',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            borderRadius: '4px'
                          }}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Up Arrow Submit Button */}
                <button
                  onClick={handleStart}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'var(--gradient-bamboo)',
                    border: 'none',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px var(--accent-glow)'
                  }}
                  title="生成短剧"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 最近项目 Section */}
        <section style={{ maxWidth: '640px', margin: '0 auto 48px auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: '500' }}>最近项目</div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            {recentProjects.map((rp) => (
              <div
                key={rp.id}
                onClick={() => setCurrentView('studio')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-paper)'
                }}
              >
                <img src={rp.img} alt={rp.title} style={{ width: '40px', height: '54px', borderRadius: '6px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>{rp.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rp.epCount} · {rp.charCount}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 剧梭片场 (Short Drama Poster Showcase) */}
        <section style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-serif)' }}>剧梭片场</h3>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--accent-glow)',
              border: '1px solid var(--border-glow)',
              padding: '4px 14px',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: '600',
              color: 'var(--accent-bamboo)',
              cursor: 'pointer'
            }}>
              <span>创作者扶持计划</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* 4 Vertical Posters Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {theaterPosters.map((poster) => (
              <div
                key={poster.id}
                onClick={() => setSelectedPlayerDrama(poster)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '9/14',
                  background: '#111',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-paper)'
                }}
              >
                <img src={poster.img} alt={poster.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  {/* Top Badges */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', background: 'var(--gradient-bamboo)', color: '#FFF', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                      {poster.badge}
                    </span>
                    {poster.subBadge && (
                      <span style={{ fontSize: '0.72rem', background: 'rgba(217,119,6,0.3)', color: '#F59E0B', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                        {poster.subBadge}
                      </span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFF', marginBottom: '4px', lineHeight: 1.3, fontFamily: 'var(--font-serif)' }}>
                      {poster.title}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                      {poster.plays}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Fullscreen Interactive Short Drama Player Modal */}
      {selectedPlayerDrama && (
        <ShortDramaPlayerModal
          drama={selectedPlayerDrama}
          onClose={() => setSelectedPlayerDrama(null)}
          onStartDramaProject={(title) => {
            setSelectedPlayerDrama(null);
            onStartProject(title, '短剧');
          }}
        />
      )}
    </div>
  );
}
