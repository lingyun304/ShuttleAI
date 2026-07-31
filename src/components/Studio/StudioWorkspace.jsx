import React, { useState } from 'react';
import { Sparkles, Film, User, Cpu, Download, CheckCircle, ArrowLeft, ArrowRight, Layers, Feather } from 'lucide-react';
import ScriptInputStep from './ScriptInputStep';
import ScriptEditorStep from './ScriptEditorStep';
import StoryboardStep from './StoryboardStep';
import AssetsStep from './AssetsStep';
import VideoRenderStep from './VideoRenderStep';
import { callLLMStudioAgent } from '../../services/modelDrivers';

export default function StudioWorkspace({ activeProject, onUpdateProject, onCreateNewProject }) {
  const [currentStep, setCurrentStep] = useState(activeProject ? 2 : 1);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    { num: 1, title: '创意解析', icon: Feather },
    { num: 2, title: '剧本编辑', icon: Film },
    { num: 3, title: '智能分镜', icon: Layers },
    { num: 4, title: '资产确认', icon: User },
    { num: 5, title: '视频生成', icon: Cpu }
  ];

  const handleStartGenerate = async (prompt, genre, count) => {
    setIsGenerating(true);
    const newProj = await callLLMStudioAgent(prompt, genre, count);
    onUpdateProject(newProj);
    setIsGenerating(false);
    setCurrentStep(2);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 24px 80px 24px' }}>
      {/* Top Project Bar & Step Breadcrumbs */}
      <div className="glass-panel" style={{ padding: '14px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>当前短剧项目：</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
              {activeProject ? activeProject.title : '未命名短剧'}
            </div>
          </div>
          <span className="badge badge-emerald">AI 引擎驱动已就绪</span>
        </div>

        {/* 5-Step Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            const isDone = currentStep > s.num;

            return (
              <React.Fragment key={s.num}>
                <button
                  onClick={() => activeProject && setCurrentStep(s.num)}
                  disabled={!activeProject && s.num > 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '9999px',
                    background: isActive
                      ? 'var(--gradient-bamboo)'
                      : isDone
                      ? 'rgba(44, 110, 73, 0.12)'
                      : 'rgba(150, 150, 150, 0.05)',
                    color: isActive ? '#FFF' : isDone ? 'var(--accent-bamboo)' : 'var(--text-secondary)',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: '500',
                    cursor: activeProject || s.num === 1 ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isDone ? <CheckCircle size={13} /> : <Icon size={13} />}
                  <span>{s.num}. {s.title}</span>
                </button>
                {idx < steps.length - 1 && (
                  <div style={{ width: '12px', height: '1px', background: 'var(--border-color)' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Render Area */}
      {currentStep === 1 && (
        <ScriptInputStep onGenerate={handleStartGenerate} isGenerating={isGenerating} />
      )}

      {currentStep === 2 && activeProject && (
        <ScriptEditorStep
          project={activeProject}
          onUpdateProject={onUpdateProject}
          onNextStep={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 3 && activeProject && (
        <StoryboardStep
          project={activeProject}
          onUpdateProject={onUpdateProject}
          onNextStep={() => setCurrentStep(4)}
        />
      )}

      {currentStep === 4 && activeProject && (
        <AssetsStep
          project={activeProject}
          onNextStep={() => setCurrentStep(5)}
        />
      )}

      {currentStep === 5 && activeProject && (
        <VideoRenderStep
          project={activeProject}
          onUpdateProject={onUpdateProject}
        />
      )}
    </div>
  );
}
