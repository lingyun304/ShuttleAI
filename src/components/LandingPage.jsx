import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, Cpu, Film, Users, Feather, BookOpen, Layers } from 'lucide-react';
import { PRESET_PROJECTS } from '../services/mockDriver';

export default function LandingPage({ onStartProject, onViewShowcase, setCurrentView }) {
  const [ideaText, setIdeaText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('古装仙侠');

  const handleStart = () => {
    onStartProject(ideaText || '都市白领偶然穿越回千年前大明王朝，依靠现代商业智慧逆袭成为富甲一方的绝代奇女子', selectedGenre);
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '70px 24px 50px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Top Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(44, 110, 73, 0.08)',
            border: '1px solid rgba(44, 110, 73, 0.2)',
            padding: '5px 16px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            color: 'var(--accent-bamboo)',
            marginBottom: '20px'
          }}>
            <Feather size={15} />
            <span>水墨古风·清新生成架构 · 极速引擎驱动</span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: '3.4rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: '700',
            lineHeight: 1.2,
            marginBottom: '18px',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)'
          }}>
            执笔画江山 · 一念成短剧<br />
            <span className="text-gradient" style={{ fontSize: '2.8rem' }}>AI编剧与导演 · 一人水墨工坊</span>
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 32px auto',
            lineHeight: 1.6
          }}>
            无需繁复团队，提供一句话故事灵感或上传网文小说，AI Agent 协同完成古风水墨剧本大纲、镜头语言、虚拟演员到高清视频渲染。
          </p>

          {/* CTA Interactive Prompt Box */}
          <div className="glass-panel" style={{
            maxWidth: '780px',
            margin: '0 auto 20px auto',
            padding: '8px 12px 8px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(44, 110, 73, 0.3)',
            boxShadow: '0 8px 24px rgba(44, 110, 73, 0.08)'
          }}>
            <BookOpen size={20} color="var(--accent-bamboo)" />
            <input
              type="text"
              placeholder="输入故事创意，如：医仙女主角悬崖复活，携手黑衣魔尊踏月重返京城..."
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button className="btn btn-primary btn-lg" onClick={handleStart}>
              一键生成短剧 <ArrowRight size={18} />
            </button>
          </div>

          {/* Quick Genre Selection Tags */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>热门水墨题材：</span>
            {['古装仙侠', '国风逆袭', '宫廷甜宠', '神医毒后', '武林江湖', '悬疑惊悚'].map((genre) => (
              <button
                key={genre}
                onClick={() => { setSelectedGenre(genre); if(!ideaText) setIdeaText(`一部关于${genre}的短剧，水墨画质高能钩子`); }}
                style={{
                  background: selectedGenre === genre ? 'rgba(44, 110, 73, 0.12)' : 'var(--bg-secondary)',
                  border: `1px solid ${selectedGenre === genre ? 'var(--accent-bamboo)' : 'var(--border-color)'}`,
                  color: selectedGenre === genre ? 'var(--accent-bamboo)' : 'var(--text-secondary)',
                  padding: '3px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>水墨流转 · 5步极速管线</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>简约而不简单，从灵感到水墨高清视频渲染仅需 5 步</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px'
        }}>
          {/* Card 1 */}
          <div className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(44, 110, 73, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <BookOpen size={20} color="var(--accent-bamboo)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>1. 卷轴剧本拆解</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              输入文字或上传 TXT，AI 自动拆分三幕结构、角色档案与集尾悬念 Hook。
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(184, 134, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Film size={20} color="var(--accent-gold)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>2. 导演镜头规划</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              智能推拉摇移运镜、特写与远景交织，生成高质量水墨画板提示词。
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(44, 110, 73, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Cpu size={20} color="var(--accent-bamboo)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>3. AI 视频渲染</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              首选 Kling 高精引擎，物理飘逸感极强，画面质感细腻优雅。
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel glass-panel-hover" style={{ padding: '20px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(82, 121, 111, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Users size={20} color="var(--accent-tea)" />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>4. 配音字幕输出</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              配合角色专属 TTS 音色与水墨双语字幕，一键打包导出 1080P/4K MP4。
            </p>
          </div>
        </div>
      </section>

      {/* Featured Showcase Section */}
      <section style={{ maxWidth: '1100px', margin: '50px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>典藏水墨短剧案例</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>由剧梭 AI 生成，高分古风雅致质感</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentView('showcase')}>
            查看全部案例 <ArrowRight size={14} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {PRESET_PROJECTS.map((proj) => (
            <div key={proj.id} className="glass-panel glass-panel-hover" style={{ overflow: 'hidden', background: 'var(--bg-secondary)' }}>
              <div className="aspect-vertical" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('showcase')}>
                <img src={proj.storyboards[0].thumbnailUrl} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="badge badge-kling">Kling 引擎</span>
                    <span className="badge badge-bamboo">{proj.genre}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={16} fill="#FFF" color="#FFF" style={{ marginLeft: '2px' }} />
                      </div>
                      <h4 style={{ fontSize: '1.15rem', color: '#FFF', fontFamily: 'var(--font-serif)' }}>{proj.title}</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {proj.scriptSummary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
