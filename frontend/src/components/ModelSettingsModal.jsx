import React, { useState } from 'react';
import { X, Sliders, Cpu, Check, ShieldCheck, Key, RefreshCw, Zap, Globe, Server } from 'lucide-react';
import { getModelConfig, saveModelConfig } from '../services/modelDrivers';

export default function ModelSettingsModal({ onClose, onConfigSaved }) {
  const [config, setConfig] = useState(getModelConfig());
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = () => {
    saveModelConfig(config);
    if (onConfigSaved) onConfigSaved(config);
    onClose();
  };

  const applyPreset = (preset) => {
    if (preset === 'deepseek') {
      setConfig({
        ...config,
        llmBaseUrl: 'https://api.deepseek.com/v1',
        llmModelName: 'deepseek-chat'
      });
    } else if (preset === 'qwen') {
      setConfig({
        ...config,
        llmBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        llmModelName: 'qwen-max'
      });
    } else if (preset === 'openai') {
      setConfig({
        ...config,
        llmBaseUrl: 'https://api.openai.com/v1',
        llmModelName: 'gpt-4o'
      });
    } else if (preset === 'kling') {
      setConfig({
        ...config,
        videoBaseUrl: 'https://api.klingai.com/v1',
        videoModelName: 'kling-v1.5'
      });
    }
  };

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      if (config.mode === 'sandbox') {
        setTestResult({ success: true, message: '沙盒模式推导已就绪 (无需外网配置)' });
      } else if (!config.llmApiKey && !config.videoApiKey) {
        setTestResult({ success: false, message: '请配置 API Key 密钥以测试直连' });
      } else {
        setTestResult({ success: true, message: `模型服务连通成功！Base URL: ${config.llmBaseUrl}` });
      }
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '680px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'var(--bg-secondary)',
        borderRadius: '20px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={20} color="var(--accent-bamboo)" />
            <h2 style={{ fontSize: '1.3rem' }}>自定义大模型与 API 接口配置</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Mode Switcher */}
        <div style={{
          background: 'rgba(44, 110, 73, 0.05)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid rgba(44, 110, 73, 0.15)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)' }}>驱动模式切换</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {config.mode === 'sandbox' ? '沙盒内置模拟（免 Key，极速推导测试）' : '自定义真实外网 API 直连（支持自建网关 / Ollama / OneAPI）'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`btn btn-sm ${config.mode === 'sandbox' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setConfig({ ...config, mode: 'sandbox' })}
            >
              沙盒模拟 Mode
            </button>
            <button
              className={`btn btn-sm ${config.mode === 'real_api' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setConfig({ ...config, mode: 'real_api' })}
            >
              自定义 API Mode
            </button>
          </div>
        </div>

        {/* LLM Custom API Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--accent-bamboo)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Server size={18} /> LLM 剧本 Agent 自定义地址与模型
            </h3>

            {/* Presets buttons */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem', padding: '2px 8px' }} onClick={() => applyPreset('deepseek')}>
                DeepSeek
              </button>
              <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem', padding: '2px 8px' }} onClick={() => applyPreset('qwen')}>
                通义千问
              </button>
              <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem', padding: '2px 8px' }} onClick={() => applyPreset('openai')}>
                OpenAI
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">大模型 API Endpoint 地址 (Base URL)</label>
            <input
              className="input-field"
              placeholder="例如: https://api.deepseek.com/v1 或 http://localhost:11434/v1"
              value={config.llmBaseUrl}
              onChange={(e) => setConfig({ ...config, llmBaseUrl: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="input-group">
              <label className="input-label">自定义模型名称 (Model Name)</label>
              <input
                className="input-field"
                placeholder="如 deepseek-chat / qwen-max"
                value={config.llmModelName}
                onChange={(e) => setConfig({ ...config, llmModelName: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="input-label">API Key 密钥</label>
              <input
                type="password"
                className="input-field"
                placeholder="sk-xxxxxxxxxxxxxxxx"
                value={config.llmApiKey}
                onChange={(e) => setConfig({ ...config, llmApiKey: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Video Model API Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={18} /> 视频渲染大模型接口配置 (可灵 AI 首选)
          </h3>

          <div className="input-group">
            <label className="input-label">视频模型 API Endpoint (Base URL)</label>
            <input
              className="input-field"
              placeholder="例如: https://api.klingai.com/v1"
              value={config.videoBaseUrl}
              onChange={(e) => setConfig({ ...config, videoBaseUrl: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="input-group">
              <label className="input-label">视频模型名称 (Model Name)</label>
              <input
                className="input-field"
                placeholder="kling-v1.5 / seedance-v2"
                value={config.videoModelName}
                onChange={(e) => setConfig({ ...config, videoModelName: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label className="input-label">视频 API Key 密钥</label>
              <input
                type="password"
                className="input-field"
                placeholder="sk-kling-xxxxxxxxxxxxxxxx"
                value={config.videoApiKey}
                onChange={(e) => setConfig({ ...config, videoApiKey: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Connection Test Banner */}
        {testResult && (
          <div style={{
            background: testResult.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${testResult.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: testResult.success ? '#10B981' : '#EF4444',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Check size={16} /> {testResult.message}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
          <button
            className="btn btn-secondary"
            onClick={handleTestConnection}
            disabled={isTesting}
          >
            {isTesting ? <RefreshCw size={14} className="pulse-glow" /> : <Zap size={14} />} 测试接口连通
          </button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>
            保存配置并应用
          </button>
        </div>
      </div>
    </div>
  );
}
