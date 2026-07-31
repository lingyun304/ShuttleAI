import React, { useState } from 'react';
import { Sparkles, Video, User, Zap, Feather, DollarSign, PlusCircle, Palette, Sliders, ShieldAlert } from 'lucide-react';
import ModelSettingsModal from './ModelSettingsModal';
import RechargeModal from './RechargeModal';
import { getModelConfig } from '../services/modelDrivers';

export default function Header({ currentView, setCurrentView, activeProject, onNewProject, credits = 33000, currentTheme, onChangeTheme, onPurchaseCredits }) {
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [modelConfig, setModelConfig] = useState(getModelConfig());

  const themes = [
    { id: 'bamboo', name: '🍃 清新水墨古风', desc: '竹青与宣纸暖白 · 典雅诗意' },
    { id: 'cyber', name: '🌌 赛博炫彩黑金', desc: '深色炫彩霓虹 · 现代科技' },
    { id: 'zen', name: '🍵 极简禅意雅白', desc: '纯净优雅灰白 · 极简风尚' }
  ];

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--bg-secondary)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
      }}>
        {/* Brand & Logo - 清新简洁 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setCurrentView('landing')}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--gradient-bamboo)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}>
            <Feather size={20} color="#FFF" />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              剧梭 <span style={{ color: 'var(--accent-bamboo)', fontSize: '0.95rem' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>一人短剧工作室 · 极速生成</div>
          </div>
        </div>

        {/* Main Nav Items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className={`btn btn-ghost ${currentView === 'landing' ? 'active' : ''}`}
            onClick={() => setCurrentView('landing')}
            style={{ color: currentView === 'landing' ? 'var(--accent-bamboo)' : 'var(--text-secondary)', background: currentView === 'landing' ? 'rgba(150, 150, 150, 0.1)' : 'transparent', fontWeight: currentView === 'landing' ? '600' : '400' }}
          >
            卷首首页
          </button>
          <button
            className={`btn btn-ghost ${currentView === 'showcase' ? 'active' : ''}`}
            onClick={() => setCurrentView('showcase')}
            style={{ color: currentView === 'showcase' ? 'var(--accent-bamboo)' : 'var(--text-secondary)', background: currentView === 'showcase' ? 'rgba(150, 150, 150, 0.1)' : 'transparent' }}
          >
            <Video size={15} />
            短剧案例
          </button>
          <button
            className={`btn btn-ghost ${currentView === 'studio' ? 'active' : ''}`}
            onClick={() => setCurrentView('studio')}
            style={{
              color: currentView === 'studio' ? '#FFF' : 'var(--accent-bamboo)',
              background: currentView === 'studio' ? 'var(--gradient-bamboo)' : 'rgba(150, 150, 150, 0.1)'
            }}
          >
            <Sparkles size={15} />
            创作工作台
          </button>
          <button
            className={`btn btn-ghost ${currentView === 'actors' ? 'active' : ''}`}
            onClick={() => setCurrentView('actors')}
            style={{ color: currentView === 'actors' ? 'var(--accent-bamboo)' : 'var(--text-secondary)', background: currentView === 'actors' ? 'rgba(150, 150, 150, 0.1)' : 'transparent' }}
          >
            <User size={15} />
            虚拟演员
          </button>
          <button
            className={`btn btn-ghost ${currentView === 'pricing' ? 'active' : ''}`}
            onClick={() => setCurrentView('pricing')}
            style={{ color: currentView === 'pricing' ? 'var(--accent-bamboo)' : 'var(--text-secondary)', background: currentView === 'pricing' ? 'rgba(150, 150, 150, 0.1)' : 'transparent' }}
          >
            <DollarSign size={15} />
            算力套餐
          </button>
          <button
            className={`btn btn-ghost ${currentView === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentView('admin')}
            style={{ color: currentView === 'admin' ? 'var(--accent-bamboo)' : 'var(--text-secondary)', background: currentView === 'admin' ? 'rgba(150, 150, 150, 0.1)' : 'transparent' }}
          >
            <ShieldAlert size={15} />
            管理后台
          </button>
        </nav>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Model Config Opener */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowModelModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sliders size={14} color="var(--accent-bamboo)" />
            <span>模型配置</span>
          </button>

          {/* Theme Switcher Button */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Palette size={14} color="var(--accent-bamboo)" />
              <span>风格</span>
            </button>

            {showThemeDropdown && (
              <div className="glass-panel" style={{
                position: 'absolute',
                top: '40px',
                right: 0,
                width: '220px',
                padding: '8px',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                background: 'var(--bg-secondary)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', padding: '4px 8px' }}>
                  选择界面视效风格
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { onChangeTheme(t.id); setShowThemeDropdown(false); }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      background: currentTheme === t.id ? 'rgba(150, 150, 150, 0.15)' : 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)' }}>{t.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Credits Badge & Recharge Modal Opener */}
          <div
            onClick={() => setShowRechargeModal(true)}
            style={{
              background: 'rgba(184, 134, 11, 0.08)',
              border: '1px solid rgba(184, 134, 11, 0.2)',
              borderRadius: '9999px',
              padding: '5px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: '600',
              color: 'var(--accent-gold)',
              cursor: 'pointer'
            }}
            title="点击在线充值算力积分"
          >
            <Zap size={14} fill="var(--accent-gold)" />
            <span>{credits.toLocaleString()} 算力</span>
          </div>

          <button className="btn btn-primary btn-sm" onClick={onNewProject}>
            <PlusCircle size={14} />
            新建短剧
          </button>
        </div>
      </header>

      {/* Model Settings Modal */}
      {showModelModal && (
        <ModelSettingsModal
          onClose={() => setShowModelModal(false)}
          onConfigSaved={(newCfg) => setModelConfig(newCfg)}
        />
      )}

      {/* Recharge Modal */}
      {showRechargeModal && (
        <RechargeModal
          credits={credits}
          onClose={() => setShowRechargeModal(false)}
          onRechargeSuccess={onPurchaseCredits}
        />
      )}
    </>
  );
}
