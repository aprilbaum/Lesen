export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { messages, max_tokens } = req.body;
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        max_tokens: max_tokens || 800,
        stream: false
      })
    });
   const data = await response.json();
if (!response.ok) {
  return res.status(200).json({ 
    error: `DeepSeek错误：${data.error?.message || response.status}` 
  });
}
res.status(200).json(data);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
