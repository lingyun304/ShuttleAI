import React, { useState } from 'react';
import { Sparkles, MessageSquare, Edit3, ArrowRight, UserCheck, CheckCircle, RefreshCw, Save, Plus, Trash2 } from 'lucide-react';

export default function ScriptEditorStep({ project, onUpdateProject, onNextStep }) {
  const [activeTab, setActiveTab] = useState('script');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', text: '你好！我是你的 AI 编剧 Agent。已为您拆解完成剧本与角色档案。您可直接在左侧编辑剧本描述与台词，也可告诉我您的修改意见。' }
  ]);

  // Editable Script State
  const [episodeTitle, setEpisodeTitle] = useState(project.title ? `${project.title} — 第 1 集《死里逃生》` : '第 1 集《死里逃生》');
  const [scriptSummary, setScriptSummary] = useState(project.scriptSummary || '大明国一品医仙沈清秋遭陷害落崖，死里逃生后携手魔尊重返京城...');
  const [sceneDescription, setSceneDescription] = useState('漆黑夜色中，暴雨倾盆。崖底巨石上，沈清秋浑身染血，艰难睁开眼睛。天空一道闪电劈过，映照出上方凭空悬浮的顾长歌。');
  const [dialogues, setDialogues] = useState([
    { id: 'd-1', speaker: '沈清秋', emotion: '喘息硬气', content: '那些欠我的，我要他们百倍奉还！' },
    { id: 'd-2', speaker: '顾长歌', emotion: '冷酷俯视', content: '想报仇？本座借你三千铁骑，但你拿什么交换？' }
  ]);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveScript = () => {
    setIsSaved(true);
    const updated = {
      ...project,
      title: episodeTitle.split('—')[0]?.trim() || project.title,
      scriptSummary: scriptSummary
    };
    onUpdateProject(updated);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDialogueChange = (id, field, value) => {
    setDialogues(dialogues.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const handleAddDialogue = () => {
    const newDialogue = {
      id: `d-${Date.now()}`,
      speaker: '沈清秋',
      emotion: '眼神冰冷',
      content: '用我这条命，还有天下第一医圣的灵典名录！'
    };
    setDialogues([...dialogues, newDialogue]);
  };

  const handleDeleteDialogue = (id) => {
    setDialogues(dialogues.filter((d) => d.id !== id));
  };

  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: `好的，已根据您的要求：“${userMsg}”优化了剧情冲突与对白节奏！对白已同步更更新。` }
      ]);
      // Auto refine dialogue based on AI suggestion
      if (userMsg.includes('紧凑') || userMsg.includes('改')) {
        setDialogues((prev) =>
          prev.map((d) => ({ ...d, content: d.content + '（高能反转加剧）' }))
        );
      }
    }, 1000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px' }}>
      {/* Left Main Script Workspace */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--bg-secondary)' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`btn btn-sm ${activeTab === 'script' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab('script')}
            >
              <Edit3 size={14} /> 分集剧本与对白 (可实时编辑)
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'characters' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab('characters')}
            >
              主要角色档案 ({project.characters?.length || 0})
            </button>
            <button
              className={`btn btn-sm ${activeTab === 'audit' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab('audit')}
            >
              <CheckCircle size={14} color="#10B981" />
              剧本审查Agent评估
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleSaveScript}>
              <Save size={14} /> {isSaved ? '已保存！' : '保存修改'}
            </button>
            <button className="btn btn-kling btn-sm" onClick={onNextStep}>
              下一步：AI 导演分镜 <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Script Tab - Full Interactive Editor */}
        {activeTab === 'script' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Episode Title & Summary Editor */}
            <div style={{ background: 'rgba(44, 110, 73, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(44, 110, 73, 0.2)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="input-group">
                <label className="input-label" style={{ fontWeight: '700', color: 'var(--accent-bamboo)' }}>集标题 (点击修改)</label>
                <input
                  className="input-field"
                  style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}
                  value={episodeTitle}
                  onChange={(e) => setEpisodeTitle(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-label">本集剧情大纲摘要</label>
                <textarea
                  className="textarea-field"
                  rows={2}
                  value={scriptSummary}
                  onChange={(e) => setScriptSummary(e.target.value)}
                />
              </div>
            </div>

            {/* Scene #1 Editor */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-bamboo)', fontFamily: 'var(--font-serif)' }}>
                场次 #1：崖底破庙雨夜 (可修改场景描述)
              </h4>

              <div className="input-group">
                <label className="input-label">【场景环境描述与动作指示】</label>
                <textarea
                  className="textarea-field"
                  rows={3}
                  value={sceneDescription}
                  onChange={(e) => setSceneDescription(e.target.value)}
                />
              </div>

              {/* Character Dialogues Editor */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="input-label" style={{ fontWeight: '600' }}>【角色对白与情感指示编辑】</label>
                  <button className="btn btn-secondary btn-sm" onClick={handleAddDialogue}>
                    <Plus size={13} /> 追加对白台词
                  </button>
                </div>

                {dialogues.map((dlg, idx) => (
                  <div key={dlg.id} style={{ background: idx % 2 === 0 ? 'rgba(44, 110, 73, 0.06)' : 'rgba(184, 134, 11, 0.06)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input
                        className="input-field"
                        style={{ width: '120px', fontWeight: '700' }}
                        value={dlg.speaker}
                        onChange={(e) => handleDialogueChange(dlg.id, 'speaker', e.target.value)}
                        placeholder="角色姓名"
                      />
                      <input
                        className="input-field"
                        style={{ width: '140px', fontSize: '0.82rem', color: 'var(--text-muted)' }}
                        value={dlg.emotion}
                        onChange={(e) => handleDialogueChange(dlg.id, 'emotion', e.target.value)}
                        placeholder="语气情绪标注"
                      />
                      <button onClick={() => handleDeleteDialogue(dlg.id)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <textarea
                      className="textarea-field"
                      rows={2}
                      value={dlg.content}
                      onChange={(e) => handleDialogueChange(dlg.id, 'content', e.target.value)}
                      placeholder="输入对白台词内容..."
                    />
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(184, 134, 11, 0.08)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} />
                <span>内置爆款公式：已插入集尾强情绪悬念钩子，留存率提升 35%</span>
              </div>
            </div>
          </div>
        )}

        {/* Characters Tab */}
        {activeTab === 'characters' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {project.characters?.map((c) => (
              <div key={c.id} className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-secondary)' }}>
                <img src={c.portrait} alt={c.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{c.name}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.style}</div>
                  <span className="badge badge-bamboo" style={{ fontSize: '0.65rem', marginTop: '4px' }}>{c.voiceName || '专属配音已绑定'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Audit Agent Tab */}
        {activeTab === 'audit' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '16px', borderRadius: '12px' }}>
              <h4 style={{ color: '#10B981', fontSize: '1.05rem', marginBottom: '6px' }}>剧本健康度得分：96 分 (优)</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>逻辑漏洞：0 处 | 情绪冲突强度：高 | 内容合规检查：已通过</p>
            </div>
          </div>
        )}
      </div>

      {/* Right AI Assistant Chat Window */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '640px', background: 'var(--bg-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <MessageSquare size={18} color="var(--accent-bamboo)" />
          <h3 style={{ fontSize: '1rem' }}>AI 编剧助手对话</h3>
        </div>

        {/* Messages list */}
        <div style={{ flex: 1, padding: '12px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: '12px',
                background: msg.role === 'user' ? 'var(--gradient-bamboo)' : 'rgba(44, 110, 73, 0.06)',
                color: msg.role === 'user' ? '#FFF' : 'var(--text-primary)',
                fontSize: '0.88rem',
                lineHeight: 1.4,
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)'
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat input box */}
        <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
          <input
            className="input-field"
            placeholder="告诉AI如何修改剧本..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
            style={{ fontSize: '0.85rem' }}
          />
          <button className="btn btn-primary btn-sm" onClick={handleSendChat}>
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
