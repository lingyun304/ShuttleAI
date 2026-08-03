import '../src/index.css';

export const metadata = {
  title: '剧梭AI (ShuttleAI) - 一站式 AI 短剧制作平台',
  description: 'AI编剧 + 导演，一人短剧工作室。支持剧本生成、分镜设计、角色场景资产生成、视频制作到配音字幕全流程。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
