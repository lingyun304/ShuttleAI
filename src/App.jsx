import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ShowcaseView from './components/ShowcaseView';
import ActorsView from './components/ActorsView';
import PricingView from './components/PricingView';
import AdminConsoleView from './components/AdminConsoleView';
import JuhuoStudio from './components/JuhuoStudio';
import { PRESET_PROJECTS } from './services/mockDriver';
import { callLLMStudioAgent } from './services/modelDrivers';

export default function App() {
  const [currentView, setCurrentView] = useState('studio'); // Default to Studio!
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
    const names = { bamboo: '清新水墨古风', cyber: '赛博炫彩黑金', zen: '极简禅意雅白' };
    showToast(`已成功切换至【${names[newTheme]}】视效风格！`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000,
          background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
          color: '#FFF',
          padding: '10px 24px',
          borderRadius: '9999px',
          fontWeight: '600',
          fontSize: '0.88rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Header Navigation */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeProject={activeProject}
        onNewProject={handleNewProject}
        credits={credits}
        currentTheme={theme}
        onChangeTheme={handleChangeTheme}
        onPurchaseCredits={handlePurchaseCredits}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentView === 'landing' && (
          <LandingPage
            onStartProject={handleStartProject}
            onViewShowcase={() => setCurrentView('showcase')}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'showcase' && (
          <ShowcaseView
            onSelectProject={(proj) => { setActiveProject(proj); setCurrentView('studio'); }}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'studio' && (
          <JuhuoStudio
            activeProject={activeProject}
            onUpdateProject={setActiveProject}
          />
        )}

        {currentView === 'actors' && <ActorsView />}

        {currentView === 'pricing' && (
          <PricingView onPurchaseCredits={handlePurchaseCredits} />
        )}

        {currentView === 'admin' && <AdminConsoleView />}
      </main>

      {/* Global Footer */}
      <footer style={{
        background: '#09090B',
        borderTop: '1px solid #27272A',
        padding: '20px 32px',
        textAlign: 'center',
        color: '#71717A',
        fontSize: '0.85rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <strong style={{ color: '#E4E4E7' }}>剧梭AI (Shuttle) Studio</strong> — 仿剧火 (juhuo.cn) 一站式 AI 短剧智能工坊 · 大模型自由定义
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }}>关于我们</span>
            <span style={{ cursor: 'pointer' }}>帮助中心</span>
            <span style={{ cursor: 'pointer' }}>用户协议</span>
            <span style={{ cursor: 'pointer' }}>隐私政策</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
