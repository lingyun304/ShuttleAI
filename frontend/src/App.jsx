import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ShowcaseView from './components/ShowcaseView';
import ActorsView from './components/ActorsView';
import PricingView from './components/PricingView';
import AdminConsoleView from './components/AdminConsoleView';
import ShuttleStudio from './components/ShuttleStudio';
import GlobalDockSidebar from './components/GlobalDockSidebar';
import CanvasBoardView from './components/CanvasBoardView';
import FreeCanvasView from './components/FreeCanvasView';
import { PRESET_PROJECTS } from './services/mockDriver';
import { callLLMStudioAgent } from './services/modelDrivers';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // Default to Landing Page!
  const [activeProject, setActiveProject] = useState(PRESET_PROJECTS[0]);
  const [credits, setCredits] = useState(33000);
  const [theme, setTheme] = useState('bamboo');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [studioInitialMode, setStudioInitialMode] = useState('list');
  const [canvasInitialMode, setCanvasInitialMode] = useState('list');
  const [freeCanvasInitialMode, setFreeCanvasInitialMode] = useState('list');

  const handleSetCurrentView = (view) => {
    if (view === 'studio') {
      setStudioInitialMode('list');
    }
    if (view === 'canvas') {
      setCanvasInitialMode('list');
    }
    if (view === 'free-canvas') {
      setFreeCanvasInitialMode('list');
    }
    setCurrentView(view);
  };

  const handleOpenProjectCanvas = () => {
    setCanvasInitialMode('editor');
    setCurrentView('canvas');
  };

  const handleStartProject = async (ideaText, genre) => {
    setCurrentView('studio');
    showToast('正在初始化 AI 编剧 Agent 剧本模型...');
    const newProj = await callLLMStudioAgent(ideaText, genre);
    setActiveProject(newProj);
    showToast(`项目《${newProj.title}》已就绪！已为您生成剧本与角色档案。`);
  };

  const handleNewProject = () => {
    setActiveProject(null);
    setCurrentView('studio');
  };

  const handlePurchaseCredits = (addedCredits, planName) => {
    setCredits((prev) => prev + addedCredits);
    showToast(`充值成功！已为您新增 ${addedCredits.toLocaleString()} 算力积分 (${planName})`);
  };

  const handleChangeTheme = (newTheme) => {
    setTheme(newTheme);
    const names = {
      bamboo: '🍃 清新竹子水墨',
      firetech: '🔥 火红科技赛博',
      cyber: '🌌 赛博炫彩黑金',
      zen: '🍵 极简禅意雅白'
    };
    showToast(`已成功切换至【${names[newTheme]}】视效风格！`);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000,
          background: 'var(--gradient-bamboo)',
          color: '#FFF',
          padding: '10px 24px',
          borderRadius: '9999px',
          fontWeight: '600',
          fontSize: '0.88rem',
          boxShadow: '0 8px 24px var(--accent-glow)',
          border: '1px solid var(--border-glow)',
          transition: 'all 0.3s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Header Navigation (Fixed at top) */}
      <Header
        currentView={currentView}
        setCurrentView={handleSetCurrentView}
        activeProject={activeProject}
        onNewProject={handleNewProject}
        credits={credits}
        currentTheme={theme}
        onChangeTheme={handleChangeTheme}
        onPurchaseCredits={handlePurchaseCredits}
      />

      {/* Main View Router (Internal Scrolling Container) */}
      <main style={{
        flex: 1,
        overflowY: (currentView === 'free-canvas' || currentView === 'canvas' || currentView === 'studio') ? 'hidden' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {currentView === 'landing' && (
          <LandingPage
            onStartProject={handleStartProject}
            onViewShowcase={() => setCurrentView('showcase')}
            currentView={currentView}
            setCurrentView={setCurrentView}
            currentTheme={theme}
            onChangeTheme={handleChangeTheme}
          />
        )}

        {currentView === 'showcase' && (
          <ShowcaseView
            onSelectProject={(proj) => { setActiveProject(proj); setCurrentView('studio'); }}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'studio' && (
          <ShuttleStudio
            activeProject={activeProject}
            initialMode={studioInitialMode}
            onUpdateProject={setActiveProject}
            onViewCanvas={handleOpenProjectCanvas}
          />
        )}

        {currentView === 'canvas' && (
          <CanvasBoardView
            activeProject={activeProject}
            initialViewMode={canvasInitialMode}
            onSelectProject={(proj) => { setActiveProject(proj); setCurrentView('studio'); }}
            onBackToStudio={() => setCurrentView('studio')}
          />
        )}

        {currentView === 'free-canvas' && (
          <FreeCanvasView
            initialViewMode={freeCanvasInitialMode}
            onSelectProject={(proj) => { setActiveProject(proj); setCurrentView('studio'); }}
          />
        )}

        {currentView === 'actors' && (
          <ActorsView onGoToStudio={() => setCurrentView('studio')} />
        )}

        {currentView === 'pricing' && (
          <PricingView onPurchaseCredits={handlePurchaseCredits} />
        )}

        {currentView === 'admin' && <AdminConsoleView />}
      </main>

      {/* Global Footer (Fixed at bottom) */}
      <footer style={{
        flexShrink: 0,
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '14px 32px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        transition: 'all 0.3s ease',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>剧梭 AI (Shuttle) · 短剧创作工坊</strong> — 一站式 AI 短剧智能工坊 · 大模型驱动
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer' }}>关于我们</span>
            <span style={{ cursor: 'pointer' }}>服务条款</span>
            <span style={{ cursor: 'pointer' }}>隐私政策</span>
            <span style={{ cursor: 'pointer' }}>使用指南</span>
            <span>© 2026 剧梭 AI. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
