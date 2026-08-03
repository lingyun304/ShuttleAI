import React, { useState } from 'react';
import { X, Zap, Check, QrCode, CreditCard, ShieldCheck, ArrowRight, History } from 'lucide-react';

export default function RechargeModal({ onClose, onRechargeSuccess, credits = 33000 }) {
  const [selectedPlan, setSelectedPlan] = useState({ name: '标准包', price: 2999, credits: 33000 });
  const [payMethod, setPayMethod] = useState('wechat'); // 'wechat' | 'alipay'
  const [isPaying, setIsPaying] = useState(false);
  const [activeTab, setActiveTab] = useState('recharge'); // 'recharge' | 'ledger'

  const plans = [
    { name: '体验包', price: 59, credits: 500, desc: '~80秒视频 (尝鲜)' },
    { name: '入门包', price: 599, credits: 3000, desc: '~460秒视频 (~1.5集)' },
    { name: '标准包', price: 2999, credits: 33000, desc: '~5,070秒 (~84.5分钟)', popular: true },
    { name: '专业包', price: 9999, credits: 120000, desc: '~18,000秒 (~60集短剧)' }
  ];

  const ledgerHistory = [
    { id: 'tx-1', type: 'deduct', item: '可灵 AI 分镜视频渲染 (镜头#1~#4)', credits: -1500, time: '2026-07-31 11:30' },
    { id: 'tx-2', type: 'deduct', item: 'LLM 剧本 Agent 拆解与钩子注入', credits: -300, time: '2026-07-31 11:15' },
    { id: 'tx-3', type: 'deduct', item: '虚拟演员 Face ID 一致性锁定', credits: -100, time: '2026-07-31 11:10' },
    { id: 'tx-4', type: 'add', item: '在线充值 (标准包)', credits: +33000, time: '2026-07-31 10:00' }
  ];

  const handleSimulatePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      onRechargeSuccess(selectedPlan.credits, selectedPlan.name);
      onClose();
    }, 1200);
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
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'var(--bg-secondary)',
        borderRadius: '20px'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                className={`btn btn-sm ${activeTab === 'recharge' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setActiveTab('recharge')}
              >
                <Zap size={14} /> 算力充值
              </button>
              <button
                className={`btn btn-sm ${activeTab === 'ledger' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setActiveTab('ledger')}
              >
                <History size={14} /> 算力消耗账单
              </button>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {activeTab === 'recharge' ? (
          <>
            {/* Balance Badge */}
            <div style={{ background: 'rgba(184, 134, 11, 0.08)', border: '1px solid rgba(184, 134, 11, 0.2)', padding: '14px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>当前账户可用算力余额：</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={20} fill="var(--accent-gold)" />
                {credits.toLocaleString()} 积分
              </div>
            </div>

            {/* Package Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {plans.map((p) => (
                <div
                  key={p.name}
                  onClick={() => setSelectedPlan(p)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: selectedPlan.name === p.name ? 'rgba(44, 110, 73, 0.08)' : 'var(--bg-primary)',
                    border: `2px solid ${selectedPlan.name === p.name ? 'var(--accent-bamboo)' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {p.popular && (
                    <span style={{ position: 'absolute', top: '-10px', right: '12px', background: 'var(--gradient-bamboo)', color: '#FFF', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>
                      爆款推荐
                    </span>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--text-primary)' }}>{p.name}</span>
                    <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--accent-bamboo)' }}>¥{p.price}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-gold)', marginBottom: '4px' }}>
                    +{p.credits.toLocaleString()} 算力积分
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.desc}</div>
                </div>
              ))}
            </div>

            {/* Payment Method Selector */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>支付方式：</span>
              <button
                className={`btn btn-sm ${payMethod === 'wechat' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPayMethod('wechat')}
              >
                微信支付
              </button>
              <button
                className={`btn btn-sm ${payMethod === 'alipay' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPayMethod('alipay')}
              >
                支付宝
              </button>
            </div>

            {/* Pay Action Button */}
            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleSimulatePay} disabled={isPaying}>
              {isPaying ? '正在安全支付处理中...' : `确认充值 ¥${selectedPlan.price} (${selectedPlan.credits.toLocaleString()}积分)`}
            </button>
          </>
        ) : (
          /* Ledger History */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto' }}>
            {ledgerHistory.map((tx) => (
              <div key={tx.id} style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>{tx.item}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{tx.time}</div>
                </div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: tx.credits > 0 ? 'var(--accent-bamboo)' : 'var(--accent-crimson, #9E2A2B)' }}>
                  {tx.credits > 0 ? `+${tx.credits.toLocaleString()}` : `${tx.credits.toLocaleString()}`} 积分
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
