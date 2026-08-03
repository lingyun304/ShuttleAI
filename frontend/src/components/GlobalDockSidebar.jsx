import React from 'react';
import {
  Flame, Home, Folder, LayoutGrid, Layers, User, Bell, Users, Book, MessageCircle, Zap, Feather, Hash
} from 'lucide-react';

export default function GlobalDockSidebar({ currentView, setCurrentView, onOpenRecharge, credits = 0 }) {
  return (
    <aside style={{
      position: 'fixed',
      top: '50%',
      left: '16px',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px'
    }}>
      {/* 1. Top Logo Icon */}
      <div
        className="dock-tooltip-item"
        data-tooltip="剧梭 AI · 一人短剧工作室"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'var(--gradient-bamboo)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px var(--accent-glow)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onClick={() => setCurrentView('landing')}
      >
        <Flame size={20} color="#FFF" />
      </div>

      {/* 2. Main Navigation Dock Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--bg-secondary)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '9999px',
        padding: '10px 8px',
        boxShadow: 'var(--shadow-paper)'
      }}>
        {/* 🏠 Home 卷首首页 */}
        <button
          className="dock-tooltip-item"
          data-tooltip="卷首首页"
          onClick={() => setCurrentView('landing')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: currentView === 'landing' ? 'var(--accent-glow)' : 'transparent',
            color: currentView === 'landing' ? 'var(--accent-bamboo)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <Home size={18} />
        </button>

        {/* 📁 Folder 短剧创作工坊 */}
        <button
          className="dock-tooltip-item"
          data-tooltip="短剧创作工坊"
          onClick={() => setCurrentView('studio')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: currentView === 'studio' ? 'var(--accent-glow)' : 'transparent',
            color: currentView === 'studio' ? 'var(--accent-bamboo)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <Folder size={18} />
        </button>

        {/* 㗊 Grid 全能画板 */}
        <button
          className="dock-tooltip-item"
          data-tooltip="全能画板"
          onClick={() => setCurrentView('canvas')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: currentView === 'canvas' ? 'var(--accent-glow)' : 'transparent',
            color: currentView === 'canvas' ? 'var(--accent-bamboo)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <LayoutGrid size={18} />
        </button>

        {/* # / ⌗ Freeform Canvas 自由画布 */}
        <button
          className="dock-tooltip-item"
          data-tooltip="自由画布"
          onClick={() => setCurrentView('free-canvas')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: currentView === 'free-canvas' ? 'var(--accent-glow)' : 'transparent',
            color: currentView === 'free-canvas' ? 'var(--accent-bamboo)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <Hash size={18} />
        </button>

        {/* 👤 User 虚拟演员肖像库 */}
        <button
          className="dock-tooltip-item"
          data-tooltip="虚拟演员肖像库"
          onClick={() => setCurrentView('actors')}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            background: currentView === 'actors' ? 'var(--accent-glow)' : 'transparent',
            color: currentView === 'actors' ? 'var(--accent-bamboo)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <User size={18} />
        </button>
      </div>

      {/* 3. Bottom Small Floating Dock Items */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--bg-secondary)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-color)',
        borderRadius: '18px',
        padding: '8px 6px',
        boxShadow: 'var(--shadow-paper)'
      }}>
        {/* Credits Purchase Pill Button matching screenshot */}
        <div
          className="dock-tooltip-item"
          data-tooltip="在线充值算力积分"
          onClick={onOpenRecharge}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '3px 8px',
            background: 'var(--accent-glow)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--accent-bamboo)' }}>
            + {credits.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
            购买算力
          </span>
        </div>

        {/* User Avatar */}
        <div
          className="dock-tooltip-item"
          data-tooltip="个人中心"
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'var(--gradient-bamboo)',
            border: '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        />

        {/* Bell 消息通知 */}
        <div className="dock-tooltip-item" data-tooltip="消息通知" style={{ display: 'flex' }}>
          <Bell size={15} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>

        {/* Group 创作者交流群 */}
        <div className="dock-tooltip-item" data-tooltip="创作者交流群" style={{ display: 'flex' }}>
          <Users size={15} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>

        {/* Tutorial 使用教程 */}
        <div className="dock-tooltip-item" data-tooltip="使用教程与指南" style={{ display: 'flex' }}>
          <Book size={15} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>

        {/* Chat 在线客服 */}
        <div className="dock-tooltip-item" data-tooltip="在线客服与反馈" style={{ display: 'flex' }}>
          <MessageCircle size={15} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </aside>
  );
}
