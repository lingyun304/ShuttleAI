import React, { useState } from 'react';
import {
  Sparkles, MessageSquare, Edit3, ArrowRight, User, Image as ImageIcon,
  Film, Layers, ChevronDown, Upload, Paperclip, Send, Download, Plus,
  RefreshCw, Settings, Sliders, ShieldCheck, Box, Crosshair, Sword,
  Check, Palette, Layout, Play, Eye
} from 'lucide-react';
import { getModelConfig, saveModelConfig, callLLMStudioAgent } from '../services/modelDrivers';
import ModelSettingsModal from './ModelSettingsModal';
import MultiTrackTimelineEditor from './Studio/MultiTrackTimelineEditor';

export default function JuhuoStudio({ activeProject, onUpdateProject }) {
  const [activeNavTab, setActiveNavTab] = useState('基础设定'); // '基础设定' | '大纲与剧本' | '角色' | '场景' | '道具' | '分镜与视频'
  const [selectedModelTier, setSelectedModelTier] = useState('专业编剧');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showModelConfigModal, setShowModelConfigModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [modelConfig, setModelConfig] = useState(getModelConfig());

  // Theme State: 'light' (白 - 默认) | 'dark' (黑)
  const [studioTheme, setStudioTheme] = useState('light');

  // Selected Visual Style State (Image 1)
  const [selectedStyle, setSelectedStyle] = useState('经典古装');
  const [styleCategory, setStyleCategory] = useState('AI真人剧');

  // Project Settings State (Image 1)
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [firstEpDuration, setFirstEpDuration] = useState(120);
  const [subsequentDuration, setSubsequentDuration] = useState(60);
  const [autoCensor, setAutoCensor] = useState(false);

  // Left Script Scenes List
  const [scenes, setScenes] = useState([
    { id: 'sc-1', name: '沙丘行宫内殿', desc: '远景咸阳的宫室昏暗，殿内陈设华丽却透着死寂压抑。金丝梵文龙榻巨柜中，香烟缭绕...' },
    { id: 'sc-2', name: '上郡校场', desc: '迈关军校场，开阔平坦的黄土夯实地面，烈日当空，阳光炽白刺眼。场内散布半人高石块...' },
    { id: 'sc-3', name: '上郡灵堂废墟', desc: '军营内临时搭建的灵堂，巨幔悬高，素衣飘摇，烛火密集排列于灵台两侧...' },
    { id: 'sc-4', name: '咸阳奉台宫', desc: '咸阳宫中枢议政的仙殿，殿内布局阴森庄严。案几上摆有摊开的竹简与密诏...' }
  ]);

  // Visual Styles List (Matching Image 1 Screenshot!)
  const visualStyles = [
    { id: '现代短剧', desc: '逆袭·复仇·甜宠', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { id: '类型古装', desc: '仙侠·帝尊·东方', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { id: '经典古装', desc: '古装·宫廷·历史', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
    { id: '院线电影风', desc: '电影·质感·好莱坞', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    { id: '张艺谋风格', desc: '历史·大片·权谋', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
    { id: '欧洲史诗风格', desc: '史诗·历史·恢弘', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
    { id: '银翼杀手风格', desc: '未来·赛博·质感', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
    { id: '权力游戏', desc: '中世纪·战争·史诗', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80' },
    { id: '剧情犯罪', desc: '高智商犯罪·黑帮', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80' },
    { id: '现代韩剧风', desc: '富豪·都市·偶像', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80' },
    { id: '黑泽明风格', desc: '武士·黑白·硬核', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' },
    { id: '诺兰风格', desc: '摄影冷艳·大严肃', img: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80' }
  ];

  // Episodes List (Matching Image 2 Screenshot!)
  const episodes = [
    {
      id: 'ep-1',
      title: 'EP1 庶子赴边',
      desc: '秦始皇三十七年，始皇帝命扶苏率军征讨赴上郡抵挡，扶苏请旨带庶子赢相同行... 命运的死局已经启动。',
      duration: '120s',
      status: '剧本完成 (6个分场)',
      videoProgress: '视频 6/6'
    },
    {
      id: 'ep-2',
      title: 'EP2 沙丘惊变',
      desc: '上郡校场，赢相徒手劈碎巨石震慑众将却被视为异类。沙丘行宫始皇崩逝，赵高胁迫李斯伪造遗诏...',
      duration: '60s',
      status: '剧本完成 (6个分场)',
      videoProgress: '视频 1/6'
    },
    {
      id: 'ep-3',
      title: 'EP3 怒杀赴合',
      desc: '国运系统激活，赢相修为连升天境巅峰。赵高宗弟赵舍率二名大秦龙骑、百名禁军国杀赢相...',
      duration: '60s',
      status: '剧本生成中',
      videoProgress: '视频 0/6'
    }
  ];

  // Character Sheets List (Matching Image 3 Screenshot!)
  const characters = [
    {
      id: 'char-1',
      name: '盖聂',
      roleType: '主角',
      portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      threeViews: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      specs: '身高: 178cm | 头身比: 8头身 | 人种: 东亚 | 体型: 偏瘦却筋骨如铁',
      appearance: '黑发散落，眼神如刀刃。穿冷黑布衣，手提过古玄铁名剑“易水寒”。'
    },
    {
      id: 'char-2',
      name: '胡亥',
      roleType: '反派',
      portrait: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      threeViews: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      specs: '身高: 168cm | 头身比: 7头身 | 人种: 东亚 | 体型: 偏胖软弱，无帝王威仪',
      appearance: '黑色长袍束重金帝冠，眼神阴鸷。'
    }
  ];

  // Props List (Matching Image 5 Screenshot!)
  const propsList = [
    {
      id: 'prop-1',
      title: '黑色密诏 (矫诏)',
      subTitle: '黑色密诏 (矫诏)',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      desc: '卷展开长约三十厘米的黑色帛书。丝绸光滑、边缘平整，卷末以朱红官印与黑色密诏右其上。'
    },
    {
      id: 'prop-2',
      title: '空白帛书与玉玺',
      subTitle: '空白帛书与玉玺',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      desc: '一套两件组合道具：空白帛书为米白色宽幅绢帛，表面光滑微透光；玉玺为方形青白玉质。'
    },
    {
      id: 'prop-3',
      title: '扶苏佩剑',
      subTitle: '扶苏佩剑',
      image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80',
      desc: '秦代长剑制式，剑身细长锋利，剑脊突起。剑柄以黑革紧密缠绕，护手为青铜兽面纹剑格。'
    },
    {
      id: 'prop-4',
      title: '易水寒 (Yi Shui Han)',
      subTitle: '易水寒 (Yi Shui Han)',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      desc: '名剑易水寒，剑出水结成冰。剑身通体呈现冰蓝色冷光，剑柄为冷银龙头造形。'
    }
  ];

  // Theme Styles Configuration: 'light' (白 - 默认) & 'dark' (黑)
  const themeStyles = {
    light: {
      bgMain: '#F4F4F5',
      bgHeader: '#FFFFFF',
      bgDrawer: '#FFFFFF',
      bgCard: '#FFFFFF',
      bgInput: '#F4F4F5',
      textPrimary: '#18181B',
      textSecondary: '#52525B',
      border: '#E4E4E7',
      accent: '#059669'
    },
    dark: {
      bgMain: '#141416',
      bgHeader: '#1A1A1E',
      bgDrawer: '#18181B',
      bgCard: '#27272A',
      bgInput: '#27272A',
      textPrimary: '#F4F4F5',
      textSecondary: '#9CA3AF',
      border: '#27272A',
      accent: '#10B981'
    }
  };

  const currentThemeStyle = themeStyles[studioTheme];

  const handleSendPrompt = () => {
    if (!chatInput.trim()) return;
    setScenes([...scenes, { id: `sc-${Date.now()}`, name: `新场次 #${scenes.length + 1}`, desc: chatInput }]);
    setChatInput('');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      background: currentThemeStyle.bgMain,
      color: currentThemeStyle.textPrimary,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      transition: 'all 0.3s ease'
    }}>
      {/* 1. Top Header Bar (Matching juhuo.cn screenshot!) */}
      <header style={{
        height: '56px',
        background: currentThemeStyle.bgHeader,
        borderBottom: `1px solid ${currentThemeStyle.border}`,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Left Project Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge" style={{ background: currentThemeStyle.border, color: currentThemeStyle.textPrimary, fontSize: '0.85rem', padding: '4px 10px', fontWeight: '600' }}>
            {activeProject ? activeProject.title : '大秦·开局觉醒国运系统'}
          </span>
          <button style={{ background: 'transparent', border: 'none', color: currentThemeStyle.textSecondary, fontSize: '0.8rem', cursor: 'pointer' }}>
            反馈
          </button>
        </div>

        {/* Center Nav Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: currentThemeStyle.bgMain, padding: '4px', borderRadius: '9999px', border: `1px solid ${currentThemeStyle.border}` }}>
          {['基础设定', '大纲与剧本', '角色', '场景', '道具', '分镜与视频'].map((tab) => {
            const isActive = activeNavTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveNavTab(tab)}
                style={{
                  padding: '5px 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? currentThemeStyle.accent : currentThemeStyle.textSecondary,
                  background: isActive ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentThemeStyle.accent }} />}
                {tab}
              </button>
            );
          })}

          {/* 打开项目画板 (Canvas / Style Preset Opener) */}
          <button
            onClick={() => setActiveNavTab('基础设定')}
            style={{
              padding: '5px 14px',
              borderRadius: '9999px',
              border: `1px solid ${currentThemeStyle.accent}`,
              background: 'rgba(16, 185, 129, 0.1)',
              color: currentThemeStyle.accent,
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginLeft: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Palette size={13} />
            打开项目画板
          </button>
        </div>

        {/* Right Actions & Theme Switcher (黑 / 白) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme Switcher Buttons (黑 / 白) */}
          <div style={{ display: 'flex', background: currentThemeStyle.bgMain, borderRadius: '8px', padding: '2px', border: `1px solid ${currentThemeStyle.border}` }}>
            <button
              onClick={() => setStudioTheme('light')}
              style={{ padding: '3px 12px', borderRadius: '6px', border: 'none', fontSize: '0.78rem', cursor: 'pointer', background: studioTheme === 'light' ? currentThemeStyle.accent : 'transparent', color: studioTheme === 'light' ? '#FFF' : currentThemeStyle.textSecondary, fontWeight: '600' }}
            >
              白
            </button>
            <button
              onClick={() => setStudioTheme('dark')}
              style={{ padding: '3px 12px', borderRadius: '6px', border: 'none', fontSize: '0.78rem', cursor: 'pointer', background: studioTheme === 'dark' ? currentThemeStyle.accent : 'transparent', color: studioTheme === 'dark' ? '#FFF' : currentThemeStyle.textSecondary, fontWeight: '600' }}
            >
              黑
            </button>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowModelConfigModal(true)}
            style={{ background: currentThemeStyle.bgCard, border: `1px solid ${currentThemeStyle.border}`, color: currentThemeStyle.textPrimary }}
          >
            <Sliders size={13} color={currentThemeStyle.accent} /> 模型配置
          </button>
          <button className="btn btn-primary btn-sm" style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }}>
            <Plus size={14} /> 添加{activeNavTab}
          </button>
        </div>
      </header>

      {/* 2. Main Workspace Split View Layout (Matching juhuo.cn screenshots!) */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '420px 1fr', height: 'calc(100vh - 116px)', overflow: 'hidden' }}>
        {/* Left Column: AI 编剧助手 (AI Script Assistant Drawer) */}
        <div style={{
          background: currentThemeStyle.bgDrawer,
          borderRight: `1px solid ${currentThemeStyle.border}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}>
          {/* AI Drawer Header */}
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${currentThemeStyle.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color={currentThemeStyle.accent} />
              <span style={{ fontSize: '0.95rem', fontWeight: '600', color: currentThemeStyle.textPrimary }}>AI 编剧助手</span>
            </div>
            <span className="badge" style={{ background: currentThemeStyle.bgMain, color: currentThemeStyle.textSecondary, fontSize: '0.75rem' }}>+0</span>
          </div>

          {/* Script Scenes Stream List */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {scenes.map((sc) => (
              <div
                key={sc.id}
                style={{
                  background: currentThemeStyle.bgCard,
                  borderRadius: '10px',
                  padding: '14px',
                  border: `1px solid ${currentThemeStyle.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: currentThemeStyle.textPrimary }}>{sc.name}</h4>
                  <Crosshair size={14} color={currentThemeStyle.textSecondary} />
                </div>
                <p style={{ fontSize: '0.8rem', color: currentThemeStyle.textSecondary, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {sc.desc}
                </p>
              </div>
            ))}
          </div>

          {/* AI Drawer Bottom Prompt Input */}
          <div style={{ padding: '14px 16px', borderTop: `1px solid ${currentThemeStyle.border}`, background: currentThemeStyle.bgMain }}>
            <div style={{ background: currentThemeStyle.bgCard, borderRadius: '12px', padding: '10px 14px', border: `1px solid ${currentThemeStyle.border}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <textarea
                rows={2}
                placeholder="聊剧情、查资料、讨论作品，或导入小说/剧本文件.."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendPrompt())}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: currentThemeStyle.textPrimary,
                  fontSize: '0.88rem',
                  outline: 'none',
                  resize: 'none'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Paperclip size={16} color={currentThemeStyle.textSecondary} style={{ cursor: 'pointer' }} />
                  <button
                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                    style={{
                      background: currentThemeStyle.bgMain,
                      border: `1px solid ${currentThemeStyle.border}`,
                      borderRadius: '6px',
                      padding: '3px 10px',
                      color: currentThemeStyle.textPrimary,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{selectedModelTier}</span>
                    <ChevronDown size={12} />
                  </button>
                </div>

                <button
                  onClick={handleSendPrompt}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                    border: 'none',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Canvas Views (Matching juhuo.cn 5 screenshots!) */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: currentThemeStyle.bgMain }}>
          {/* TAB 1: 基础设定 & 画风 (Image 1 Screenshot!) */}
          {activeNavTab === '基础设定' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '14px' }}>画风选择</h3>

                {/* Style Sub-Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {['AI真人剧', 'AI漫剧', '自定义'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setStyleCategory(cat)}
                      style={{
                        padding: '6px 20px',
                        borderRadius: '8px',
                        border: `1px solid ${styleCategory === cat ? currentThemeStyle.accent : currentThemeStyle.border}`,
                        background: styleCategory === cat ? 'rgba(16, 185, 129, 0.15)' : currentThemeStyle.bgCard,
                        color: styleCategory === cat ? currentThemeStyle.accent : currentThemeStyle.textSecondary,
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Style Cards Grid (Matching Image 1 Screenshot!) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '14px' }}>
                  {visualStyles.map((style) => {
                    const isSelected = selectedStyle === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        style={{
                          background: currentThemeStyle.bgCard,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: `2px solid ${isSelected ? currentThemeStyle.accent : 'transparent'}`,
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                          <img src={style.img} alt={style.id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          {isSelected && (
                            <div style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: currentThemeStyle.accent,
                              color: '#FFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Check size={14} />
                            </div>
                          )}
                          <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', padding: '4px 8px', borderRadius: '6px', color: '#FFF', fontSize: '0.85rem', fontWeight: '700', textAlign: 'center' }}>
                            {style.id}
                          </div>
                        </div>
                        <div style={{ padding: '8px', fontSize: '0.75rem', color: currentThemeStyle.textSecondary, textAlign: 'center' }}>
                          {style.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Basic Settings Form (Matching Image 1 Screenshot!) */}
              <div style={{ background: currentThemeStyle.bgCard, padding: '20px', borderRadius: '14px', border: `1px solid ${currentThemeStyle.border}` }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '14px' }}>基础设定</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div className="input-group">
                    <label className="input-label">比例</label>
                    <select className="select-field" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                      <option value="16:9">16:9 (横屏大片)</option>
                      <option value="9:16">9:16 (竖屏短剧)</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">首集时长</label>
                    <input className="input-field" value={`${firstEpDuration} 秒`} onChange={(e) => setFirstEpDuration(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">后续集时长</label>
                    <input className="input-field" value={`${subsequentDuration} 秒`} onChange={(e) => setSubsequentDuration(Number(e.target.value))} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">视听语言</label>
                    <input className="input-field" defaultValue="中文" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 大纲与剧本 (Image 2 Screenshot!) */}
          {activeNavTab === '大纲与剧本' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Project Overview Card */}
              <div style={{ background: currentThemeStyle.bgCard, padding: '20px', borderRadius: '14px', border: `1px solid ${currentThemeStyle.border}` }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>项目概览</h3>
                <div style={{ fontSize: '0.88rem', color: currentThemeStyle.textSecondary, marginBottom: '6px' }}>
                  <strong style={{ color: currentThemeStyle.accent }}>一句话故事：</strong>穿越重生的历史天骄赢相，在秦帝国覆灭的夜被迫承担逆转历史的使命...
                </div>
                <div style={{ fontSize: '0.85rem', color: currentThemeStyle.textSecondary, marginBottom: '12px' }}>
                  <strong style={{ color: currentThemeStyle.accent }}>大期待：</strong>穿越少年以系统加持的超能力对抗黑国权臣，扶苏起义与改变历史的抉择中承载帝国命运。
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className="badge" style={{ background: currentThemeStyle.bgMain, color: currentThemeStyle.textPrimary }}>5集</span>
                  <span className="badge" style={{ background: currentThemeStyle.bgMain, color: currentThemeStyle.textPrimary }}>6m</span>
                  <span className="badge" style={{ background: currentThemeStyle.bgMain, color: currentThemeStyle.textPrimary }}>15角色</span>
                  <span className="badge" style={{ background: currentThemeStyle.bgMain, color: currentThemeStyle.textPrimary }}>9场景</span>
                </div>
              </div>

              {/* Episode List (Matching Image 2 Screenshot!) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {episodes.map((ep) => (
                  <div key={ep.id} style={{ background: currentThemeStyle.bgCard, padding: '18px', borderRadius: '12px', border: `1px solid ${currentThemeStyle.border}`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: currentThemeStyle.textPrimary }}>{ep.title}</h4>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span className="badge badge-emerald">{ep.duration}</span>
                        <span className="badge badge-bamboo">{ep.status}</span>
                        <span className="badge badge-kling">{ep.videoProgress}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: currentThemeStyle.textSecondary, lineHeight: 1.5 }}>{ep.desc}</p>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      <button className="btn btn-secondary btn-sm" style={{ background: currentThemeStyle.bgMain, border: `1px solid ${currentThemeStyle.border}`, color: currentThemeStyle.textPrimary }}>
                        <Edit3 size={12} /> 查看/编辑详细剧本
                      </button>
                      <button className="btn btn-primary btn-sm" style={{ background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)' }} onClick={() => setActiveNavTab('分镜与视频')}>
                        <Play size={12} /> 进入视频生成环节
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: 角色 (Image 3 Screenshot!) */}
          {activeNavTab === '角色' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {characters.map((c) => (
                <div key={c.id} style={{ background: currentThemeStyle.bgCard, padding: '20px', borderRadius: '16px', border: `1px solid ${currentThemeStyle.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: currentThemeStyle.textPrimary }}>{c.name}</h3>
                    <span className="badge badge-bamboo">{c.roleType}</span>
                  </div>

                  <div style={{ height: '220px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={c.threeViews} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ fontSize: '0.78rem', color: currentThemeStyle.textSecondary }}>{c.specs}</div>
                  <p style={{ fontSize: '0.82rem', color: currentThemeStyle.textPrimary, lineHeight: 1.5 }}>{c.appearance}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: 场景 (Image 4 Screenshot!) */}
          {activeNavTab === '场景' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {scenes.map((s) => (
                <div key={s.id} style={{ background: currentThemeStyle.bgCard, padding: '20px', borderRadius: '16px', border: `1px solid ${currentThemeStyle.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: currentThemeStyle.textPrimary }}>{s.name}</h3>
                  <div style={{ height: '180px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80" alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <p style={{ fontSize: '0.82rem', color: currentThemeStyle.textSecondary, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: 道具 (Image 5 Screenshot!) */}
          {activeNavTab === '道具' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {propsList.map((p) => (
                <div key={p.id} style={{ background: currentThemeStyle.bgCard, padding: '20px', borderRadius: '16px', border: `1px solid ${currentThemeStyle.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: currentThemeStyle.textPrimary }}>{p.title}</h3>
                  <div style={{ height: '200px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <p style={{ fontSize: '0.82rem', color: currentThemeStyle.textSecondary, lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: 分镜与视频 */}
          {activeNavTab === '分镜与视频' && (
            <MultiTrackTimelineEditor
              storyboards={activeProject?.storyboards || []}
              onExportClick={() => alert('导出视频已启动')}
            />
          )}
        </div>
      </div>

      {/* Model Settings Modal */}
      {showModelConfigModal && (
        <ModelSettingsModal
          onClose={() => setShowModelConfigModal(false)}
          onConfigSaved={(newCfg) => setModelConfig(newCfg)}
        />
      )}
    </div>
  );
}
