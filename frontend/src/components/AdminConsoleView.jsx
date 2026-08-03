import React, { useState } from 'react';
import { Users, DollarSign, ShieldAlert, Cpu, BarChart2, CheckCircle, XCircle, Search, Settings } from 'lucide-react';

export default function AdminConsoleView() {
  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'users' | 'audit' | 'config'

  const metrics = [
    { title: '注册创作者总数', value: '58,420 人', change: '+12% 本月', color: 'var(--accent-bamboo)' },
    { title: '月活跃创作者 (MAC)', value: '12,850 人', change: '+18% 本月', color: 'var(--accent-gold)' },
    { title: '月度算力充值营收', value: '¥ 685,000', change: '+25% 本月', color: 'var(--accent-bamboo)' },
    { title: '可灵 GPU 集群负载', value: '68% (正常)', change: '节点运行中', color: '#10B981' }
  ];

  const userList = [
    { id: 'u-1', name: '风清扬', phone: '138****8888', credits: 33000, verified: true, projects: 12, date: '2026-07-28' },
    { id: 'u-2', name: '短剧大魔王', phone: '139****6666', credits: 120000, verified: true, projects: 45, date: '2026-07-25' },
    { id: 'u-3', name: '星洲影视MCN', phone: '150****1234', credits: 5000, verified: false, projects: 3, date: '2026-07-30' }
  ];

  const auditList = [
    { id: 'aud-1', projectTitle: '《一枕山河踏月来》', type: '视频渲染镜头 #1', result: '通过', status: 'pass', time: '11:45' },
    { id: 'aud-2', projectTitle: '《都市至尊神医》', type: 'LLM 剧本对白', result: '通过', status: 'pass', time: '11:30' },
    { id: 'aud-3', projectTitle: '《修仙反派降临》', type: '角色原画生成', result: '需复审核', status: 'review', time: '10:50' }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 24px 80px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <span className="badge badge-bamboo" style={{ marginBottom: '8px' }}>内部管理后台</span>
          <h1 style={{ fontSize: '2.2rem' }}>剧梭 AI 平台运营控制台</h1>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-secondary)', padding: '6px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <button
            className={`btn btn-sm ${activeTab === 'metrics' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('metrics')}
          >
            <BarChart2 size={14} /> 运营概览
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={14} /> 创作者管理
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'audit' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('audit')}
          >
            <ShieldAlert size={14} /> 内容合规审核
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      {activeTab === 'metrics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {metrics.map((m) => (
              <div key={m.title} className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{m.title}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: m.color, marginBottom: '6px' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{m.change}</div>
              </div>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={20} color="var(--accent-bamboo)" /> 可灵 AI 算力集群运行监控 (Kling Cluster Nodes)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ background: 'rgba(150,150,150,0.06)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontWeight: '600' }}>Node-01 (可灵 1.5 HD 主节点)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0' }}>任务队列：12 个镜头渲染中</div>
                <span className="badge badge-emerald">系统正常</span>
              </div>
              <div style={{ background: 'rgba(150,150,150,0.06)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontWeight: '600' }}>Node-02 (Seedance 备用节点)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0' }}>任务队列：2 个镜头降级渲染</div>
                <span className="badge badge-emerald">待命就绪</span>
              </div>
              <div style={{ background: 'rgba(150,150,150,0.06)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontWeight: '600' }}>Node-03 (CosyVoice TTS 集群)</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0' }}>语音合成延时：&lt; 150ms</div>
                <span className="badge badge-emerald">极速运行</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>注册创作者清单</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>用户</th>
                <th style={{ padding: '12px' }}>手机号</th>
                <th style={{ padding: '12px' }}>剩余积分</th>
                <th style={{ padding: '12px' }}>实名认证</th>
                <th style={{ padding: '12px' }}>创作项目数</th>
                <th style={{ padding: '12px' }}>注册时间</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>{u.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{u.phone}</td>
                  <td style={{ padding: '12px', color: 'var(--accent-gold)', fontWeight: '700' }}>{u.credits.toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>
                    {u.verified ? <span className="badge badge-emerald">已认证</span> : <span className="badge badge-amber">未认证</span>}
                  </td>
                  <td style={{ padding: '12px' }}>{u.projects} 个短剧</td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{u.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Content Audit Tab */}
      {activeTab === 'audit' && (
        <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>AI 生成内容自动合规审核队列</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {auditList.map((aud) => (
              <div key={aud.id} style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600' }}>{aud.projectTitle} · {aud.type}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>提交时间：{aud.time}</div>
                </div>
                <div>
                  {aud.status === 'pass' ? (
                    <span className="badge badge-emerald"><CheckCircle size={12} /> 自动审核通过</span>
                  ) : (
                    <span className="badge badge-amber">需人工复审</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
