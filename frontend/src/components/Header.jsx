import React, { useState } from 'react';
import {
  Sparkles, Video, User, Zap, Feather, Flame, Bell, Palette, ChevronDown,
  Book, MessageCircle, Settings, ShieldAlert, Layers, LayoutGrid, Folder, Home, Plus
} from 'lucide-react';
import ModelSettingsModal from './ModelSettingsModal';
import RechargeModal from './RechargeModal';
import { getModelConfig } from '../services/modelDrivers';

export default function Header({ currentView, setCurrentView, activeProject, onNewProject, credits = 33000, currentTheme, onChangeTheme, onPurchaseCredits }) {
  const [showModelModal, setShowModelModal] = useState(false);
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [modelConfig, setModelConfig] = useState(getModelConfig());

  const navItems = [
    { id: 'landing', label: '首页', icon: Home },
    { id: 'showcase', label: '片场', icon: Video },
    { id: 'studio', label: '短剧工坊', icon: Folder },
    { id: 'canvas', label: '全能画板', icon: LayoutGrid },
    { id: 'free-canvas', label: '自由画布', icon: Layers },
    { id: 'actors', label: '虚拟演员', icon: User },
    { id: 'pricing', label: '算力套餐', icon: Zap }
  ];

  const themes = [
    { id: 'bamboo', label: '🍃 清新竹子', desc: '翡翠竹韵 · 自然优雅' },
    { id: 'firetech', label: '🔥 火红科技', desc: '炽红热血 · 震撼科技' },
    { id: 'cyber', label: '🌌 赛博黑金', desc: '深色炫彩 · 极客未来' },
    { id: 'zen', label: '🍵 极简雅白', desc: '纯净优雅 · 极简风尚' }
  ];

  const currentThemeObj = themes.find(t => t.id === currentTheme) || themes[0];

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'var(--bg-secondary)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-paper)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}>
        
        {/* Left: Brand Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => setCurrentView('landing')}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--gradient-bamboo)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <Flame size={20} color="#FFF" />
          </div>
          <div>
            <div style={{ fontSize: '1.18rem', fontWeight: '800', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)' }}>
              剧梭 <span style={{ color: 'var(--accent-bamboo)', fontSize: '0.92rem' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>一人短剧工作室 · 智能短剧工坊</div>
          </div>
        </div>

        {/* Center: Core Function Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? '700' : '400',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive ? 'var(--gradient-bamboo)' : 'transparent',
                  color: isActive ? '#FFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px var(--accent-glow)' : 'none'
                }}
              >
                <IconComponent size={15} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Comprehensive Action Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* 1. Model Selector Badge */}
          <button
            onClick={() => setShowModelModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '8px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            title="配置生成模型"
          >
            <Sparkles size={14} color="var(--accent-bamboo)" />
            <span>Seedance 2.0</span>
            <ChevronDown size={12} color="var(--text-muted)" />
          </button>

          {/* 2. Visual Theme Dropdown Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-paper)'
              }}
              title="切换界面风格主题"
            >
              <Palette size={14} color="var(--accent-bamboo)" />
              <span>{currentThemeObj.label}</span>
              <ChevronDown size={12} color="var(--text-muted)" style={{ transform: showThemeDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
            </button>

            {/* Dropdown Menu Popup */}
            {showThemeDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '180px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
                  padding: '6px',
                  zIndex: 1100,
                  backdropFilter: 'blur(16px)'
                }}
              >
                <div style={{ padding: '6px 10px 4px 10px', fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  选择界面主题
                </div>
                {themes.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onChangeTheme && onChangeTheme(t.id);
                      setShowThemeDropdown(false);
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: currentTheme === t.id ? 'var(--accent-glow)' : 'transparent',
                      color: currentTheme === t.id ? 'var(--accent-bamboo)' : 'var(--text-primary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      transition: 'all 0.15s ease',
                      marginBottom: '2px'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: currentTheme === t.id ? '700' : '500' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {t.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Remaining Credits Display */}
          <button
            onClick={() => setShowRechargeModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'var(--accent-glow)',
              border: '1px solid var(--border-glow)',
              color: 'var(--accent-bamboo)',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-paper)'
            }}
            title="点击充值算力积分"
          >
            <Zap size={14} fill="var(--accent-bamboo)" />
            <span>⚡ {credits.toLocaleString()} 算力</span>
          </button>

          {/* 4. Message Notifications Icon with Red Dot */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => alert('无新未读消息')}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)'
            }}>
              <Bell size={16} />
            </div>
            {/* Red Badge Dot */}
            <div style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FF3344',
              border: '2px solid var(--bg-secondary)'
            }} />
          </div>

          {/* 5. User Avatar & Dropdown Menu (Tutorial, Feedback, Admin) */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--gradient-bamboo)',
                border: '2px solid var(--border-color)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={18} color="#FFF" />
            </div>

            {/* Dropdown Menu Popup */}
            {showUserDropdown && (
              <div style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '180px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '6px',
                boxShadow: 'var(--shadow-paper)',
                zIndex: 1100
              }}>
                <div
                  onClick={() => { alert('打开使用教程指南手册'); setShowUserDropdown(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    borderRadius: '6px'
                  }}
                >
                  <Book size={15} color="var(--accent-bamboo)" />
                  <span>使用教程指南</span>
                </div>

                <div
                  onClick={() => { alert('打开在线客服与反馈中心'); setShowUserDropdown(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    borderRadius: '6px'
                  }}
                >
                  <MessageCircle size={15} color="var(--accent-bamboo)" />
                  <span>在线客服与反馈</span>
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />

                <div
                  onClick={() => { setCurrentView('admin'); setShowUserDropdown(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    color: 'var(--accent-bamboo)',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    fontWeight: '600'
                  }}
                >
                  <Settings size={15} />
                  <span>后台控制台</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Models Configuration Modal */}
      {showModelModal && (
        <ModelSettingsModal
          config={modelConfig}
          onSave={(cfg) => { setModelConfig(cfg); setShowModelModal(false); }}
          onClose={() => setShowModelModal(false)}
        />
      )}

      {/* Recharge Modal */}
      {showRechargeModal && (
        <RechargeModal
          onClose={() => setShowRechargeModal(false)}
          onSuccess={(addCredits) => {
            if (onPurchaseCredits) onPurchaseCredits(addCredits);
            setShowRechargeModal(false);
          }}
        />
      )}
    </>
  );
}
