import { ResponseStream } from 'next/server';

/**
 * BFF API Route: 处理与三方大模型 (如 DeepSeek / OpenAI) 的流式对话与剧本生成
 * 隐藏三方 API Key，提供 SSE 打字机流式响应
 */
export async function POST(req) {
  try {
    const { prompt, model = 'deepseek-chat' } = await req.json();

    const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY || 'mock-key';
    const baseUrl = process.env.LLM_BASE_URL || 'https://api.deepseek.com/v1';

    // 如果未配置真实的 API Key，返回模拟打字机流式响应
    if (!process.env.LLM_API_KEY && !process.env.OPENAI_API_KEY) {
      const mockStream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const mockText = `【剧梭 AI 剧本引擎示例】\n\n针对创意："${prompt}"，生成剧本结构：\n\n【第一幕：夜幕降临】\n场景：霓虹闪烁的未来都市高楼顶层。\n角色：主角林梭、AI助手小彩。\n台词：林梭：“启动代号 Shuttle 的短剧渲染队列。”`;
          
          for (const char of mockText) {
            controller.enqueue(encoder.encode(char));
            await new Promise((res) => setTimeout(res, 30));
          }
          controller.close();
        },
      });

      return new Response(mockStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      });
    }

    // 真实调用第三方 Open AI 兼容的大模型 API
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      }),
    });

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
