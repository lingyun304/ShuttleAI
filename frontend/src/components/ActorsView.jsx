import React, { useState } from 'react';
import { User, Volume2, Sparkles, Shirt, PlusCircle, Check, Search, Filter, X, Info, ArrowRight } from 'lucide-react';

export default function ActorsView({ onGoToStudio }) {
  const [styleFilter, setStyleFilter] = useState('全部'); // '全部' | '写实' | '3D' | '2D'
  const [roleFilter, setRoleFilter] = useState('全部'); // '全部' | '男主' | '女主' | '反派' | '配角' | '长者' | '少年' | '幼童'
  const [selectedActorModal, setSelectedActorModal] = useState(null);

  // Curated Virtual Actors List with rich taglines matching screenshot
  const virtualActorsList = [
    {
      id: 'a-0',
      name: '苏绮',
      style: '写实',
      role: '女主',
      tagline: '东方妖艳女王',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-1',
      name: '许霖树',
      style: '写实',
      role: '男主',
      tagline: '霸道总裁 · 气场开满',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-2',
      name: '楚倾饰',
      style: '2D',
      role: '女主',
      tagline: '二次元清甜神颜',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-3',
      name: '谢思阳',
      style: '2D',
      role: '男主',
      tagline: '白发高冷剑客',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-4',
      name: '林书沦',
      style: '2D',
      role: '女主',
      tagline: '古风绝美千金',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-5',
      name: '温海秋',
      style: '2D',
      role: '女主',
      tagline: '知性校园女主',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-6',
      name: '楚雅白',
      style: '2D',
      role: '男主',
      tagline: '修仙古风男神',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-7',
      name: '谷旭约',
      style: '2D',
      role: '少年',
      tagline: '热血玄幻少年',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-8',
      name: '苏引莹',
      style: '写实',
      role: '女主',
      tagline: '豪门复仇大女主',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-9',
      name: '宋云峥',
      style: '3D',
      role: '男主',
      tagline: '3D 动漫画质魔尊',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-10',
      name: '沈光露',
      style: '3D',
      role: '女主',
      tagline: '3D 仙侠女神',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-11',
      name: '沈雨犹',
      style: '3D',
      role: '女主',
      tagline: '3D 灵动女角',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-12',
      name: '姜晚宁',
      style: '写实',
      role: '女主',
      tagline: '温婉娇妻黑化归来',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-13',
      name: '林耀',
      style: '写实',
      role: '男主',
      tagline: '爆款逆袭战神',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-14',
      name: '沐瑶',
      style: '写实',
      role: '女主',
      tagline: '干练职场高岭之花',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-15',
      name: '绮梦',
      style: '写实',
      role: '女主',
      tagline: '国民级温柔白月光',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-16',
      name: '果果',
      style: '写实',
      role: '幼童',
      tagline: '带妈打脸萌宝',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-17',
      name: '林婷',
      style: '写实',
      role: '女主',
      tagline: '豪门风尚贵妇',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-18',
      name: '林宸依',
      style: '写实',
      role: '男主',
      tagline: '阳光邻家男神',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-19',
      name: '叶曦琳',
      style: '写实',
      role: '女主',
      tagline: '反差萌千金小姐',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-20',
      name: '林玥',
      style: '写实',
      role: '女主',
      tagline: '古装爆款甜妹',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'a-21',
      name: '许淮',
      style: '写实',
      role: '少年',
      tagline: '热血少侠',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Filtering Logic
  const filteredActors = virtualActorsList.filter(actor => {
    if (styleFilter !== '全部' && actor.style !== styleFilter) return false;
    if (roleFilter !== '全部' && actor.role !== roleFilter) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '20px 24px 32px 24px' }}>
      
      {/* Title & Description */}
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '6px' }}>
          虚拟演员肖像库
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          精选高人气虚拟演员形象，经大众审美验证，助力短剧获得更高播放量。
        </p>
      </div>

      {/* Filter Options Panel Container */}
      <div style={{
        maxWidth: '820px',
        margin: '0 auto 20px auto',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '12px 18px',
        boxShadow: 'var(--shadow-paper)'
      }}>
        {/* Row 1: 画风 Style Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)', width: '70px' }}>画风</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['全部', '写实', '3D', '2D'].map(style => (
              <button
                key={style}
                onClick={() => setStyleFilter(style)}
                style={{
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: styleFilter === style ? '600' : '400',
                  border: 'none',
                  cursor: 'pointer',
                  background: styleFilter === style ? 'var(--gradient-bamboo)' : 'var(--bg-tertiary)',
                  color: styleFilter === style ? '#FFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: 角色定位 Role Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-muted)', width: '70px' }}>角色定位</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['全部', '男主', '女主', '反派', '配角', '长者', '少年', '幼童'].map(role => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                style={{
                  padding: '4px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: roleFilter === role ? '600' : '400',
                  border: 'none',
                  cursor: 'pointer',
                  background: roleFilter === role ? 'var(--gradient-bamboo)' : 'var(--bg-tertiary)',
                  color: roleFilter === role ? '#FFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actor Portrait Cards Grid (7 Columns matching screenshot layout) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '16px'
      }}>
        {filteredActors.map((actor) => (
          <div
            key={actor.id}
            onClick={() => setSelectedActorModal(actor)}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-paper)',
              transition: 'all 0.25s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Portrait Image (3:4 ratio) */}
            <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
              <img src={actor.img} alt={actor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Name Footer Bar */}
            <div style={{ padding: '8px 10px', textAlign: 'center', background: 'var(--bg-secondary)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {actor.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actor Click Inspector Modal (1:1 Matching Screenshot) */}
      {selectedActorModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '680px',
            width: '100%',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            position: 'relative',
            display: 'flex',
            gap: '24px'
          }}>
            {/* Close Button Top Right */}
            <div
              onClick={() => setSelectedActorModal(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                zIndex: 10
              }}
            >
              <X size={16} />
            </div>

            {/* Left Column: High-def Portrait Photo */}
            <div style={{ width: '220px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0, boxShadow: 'var(--shadow-paper)' }}>
              <img
                src={selectedActorModal.img}
                alt={selectedActorModal.name}
                style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover' }}
              />
            </div>

            {/* Right Column: Detailed Info Box matching Screenshot */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Name & Badges Row */}
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {selectedActorModal.name}
                </h2>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8', padding: '3px 12px', borderRadius: '6px', fontWeight: '600' }}>
                    {selectedActorModal.style}
                  </span>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8', padding: '3px 12px', borderRadius: '6px', fontWeight: '600' }}>
                    {selectedActorModal.role}
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {selectedActorModal.tagline || '东方妖艳女王'}
                </div>
              </div>

              {/* Notice Banner Box (仅提供五官形象...) */}
              <div style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '12px 14px',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}>
                <Info size={16} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  仅提供五官形象，不包含服化道。选择后可通过"自由创作"为角色定制服装、妆造和发型。
                </span>
              </div>

              {/* Instructions Box (如何使用...) */}
              <div style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '14px 16px'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>
                  如何使用：
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>创建或打开一个短剧项目</div>
                  <div>在角色设定面板中，选择目标角色</div>
                  <div>点击"浏览更多官方形象"找到此形象并应用</div>
                </div>
              </div>

              {/* Bottom Action Button: 前往创作 → */}
              <button
                onClick={() => {
                  setSelectedActorModal(null);
                  if (onGoToStudio) onGoToStudio();
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-paper)',
                  marginTop: 'auto'
                }}
              >
                <span>前往创作</span>
                <ArrowRight size={16} />
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
