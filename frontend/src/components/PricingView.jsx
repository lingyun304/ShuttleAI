import React, { useState } from 'react';
import { Zap, Check, ShieldCheck, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export default function PricingView({ onPurchaseCredits }) {
  const [selectedPlan, setSelectedPlan] = useState('标准包');

  const plans = [
    {
      name: '体验包',
      price: 59,
      credits: 500,
      videoLength: '~80秒视频 (SD画质)',
      perEpisode: '可制作约 0.25 集',
      badge: '尝鲜首选',
      popular: false
    },
    {
      name: '入门包',
      price: 599,
      credits: 3000,
      videoLength: '~460秒视频 (1080P)',
      perEpisode: '可制作约 1.5 集短剧',
      badge: '个人创作者',
      popular: false
    },
    {
      name: '标准包',
      price: 2999,
      credits: 33000,
      videoLength: '~5,070秒 (~84.5分钟)',
      perEpisode: '可完整完成 1 部 (16~20集) 短剧',
      badge: '热门爆款推荐',
      popular: true
    },
    {
      name: '专业包',
      price: 9999,
      credits: 120000,
      videoLength: '~18,000秒 (~300分钟)',
      perEpisode: '可制作约 60 集高精短剧',
      badge: 'MCN/团队首选',
      popular: false
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '24px 24px 32px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="badge badge-amber" style={{ marginBottom: '12px' }}>算力积分制 · 永不过期</span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>透明算力计费套餐</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          按量扣减积分，不设强制月度订阅。默认集成可灵 AI HD 视频生成，算力消耗真实可控。
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        marginBottom: '60px'
      }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="glass-panel"
            style={{
              padding: '30px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              background: 'var(--bg-secondary)',
              border: plan.popular ? '2px solid var(--accent-bamboo)' : '1px solid var(--border-color)',
              boxShadow: plan.popular ? '0 8px 24px rgba(44, 110, 73, 0.12)' : 'var(--shadow-paper)',
              transform: plan.popular ? 'scale(1.02)' : 'none'
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--gradient-bamboo)',
                color: '#FFF',
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 12px rgba(44, 110, 73, 0.25)'
              }}>
                {plan.badge}
              </div>
            )}

            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '8px', fontFamily: 'var(--font-serif)' }}>
                {plan.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent-bamboo)' }}>¥</span>
                <span style={{ fontSize: '2.8rem', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>
                  {plan.price.toLocaleString()}
                </span>
              </div>

              <div style={{
                background: 'rgba(184, 134, 11, 0.08)',
                color: 'var(--accent-gold)',
                padding: '10px 14px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
                border: '1px solid rgba(184, 134, 11, 0.2)'
              }}>
                <Zap size={18} fill="var(--accent-gold)" />
                {plan.credits.toLocaleString()} 算力积分
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10B981" />
                  <span>渲染时长：{plan.videoLength}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10B981" />
                  <span>{plan.perEpisode}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10B981" />
                  <span>可灵 AI 高清渲染驱动支持</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} color="#10B981" />
                  <span>AI 角色与场景无限次生成</span>
                </li>
              </ul>
            </div>

            <button
              className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              style={{ marginTop: '28px', width: '100%' }}
              onClick={() => onPurchaseCredits(plan.credits, plan.name)}
            >
              立即购买算力
            </button>
          </div>
        ))}
      </div>

      {/* Credit Consumption Breakdown */}
      <div className="glass-panel" style={{ padding: '32px', background: 'var(--bg-secondary)' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-serif)' }}>
          <Sparkles size={20} color="var(--accent-bamboo)" />
          算力消耗对照参考 (以单集 2 分钟短剧为例)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(44, 110, 73, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>可灵 AI 视频渲染 (分镜转换)</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', margin: '4px 0' }}>~1,500 积分</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-bamboo)' }}>约合 ¥15.0 / 集</div>
          </div>

          <div style={{ background: 'rgba(44, 110, 73, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AI 剧本 Agent 生成与拆解</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', margin: '4px 0' }}>~300 积分</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-bamboo)' }}>约合 ¥3.0 / 集</div>
          </div>

          <div style={{ background: 'rgba(44, 110, 73, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>角色/场景高精图片生成</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', margin: '4px 0' }}>~100 积分</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-bamboo)' }}>约合 ¥1.0 / 集</div>
          </div>

          <div style={{ background: 'rgba(44, 110, 73, 0.04)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>CosyVoice TTS 角色配音</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', margin: '4px 0' }}>~100 积分</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-bamboo)' }}>约合 ¥1.0 / 集</div>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '12px 16px', background: 'rgba(44, 110, 73, 0.08)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>单集（2分钟）全套制作合计仅需：</span>
          <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-bamboo)' }}>~2,000 积分 (折合 ≈ ¥20 元/集)</span>
        </div>
      </div>
    </div>
  );
}
