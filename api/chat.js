export default async function handler(req, res) {
    if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
    }

  const { messages, level } = req.body;

  if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages' });
  }

  const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
          return res.status(500).json({ error: 'API key not configured' });
    }

  const systemPrompt = `You are an English tutor assistant for Nexus English Center.
  The student is at level: ${level || 'A1'}.
  Your role:
  - Answer questions about English grammar, vocabulary and pronunciation
  - Correct student mistakes gently and explain why
  - Give examples appropriate to the student level
  - Keep responses concise and encouraging
  - If the student writes in Portuguese, respond in Portuguese but use English examples
  - If the student writes in English, respond in English
  - Always stay focused on English learning topics
  - Be friendly, patient and supportive`;

  const groqMessages = [
    { role: 'system', content: systemPrompt },
        ...messages.map(m => ({
                role: m.role === 'model' ? 'assistant' : m.role,
                content: Array.isArray(m.parts) ? m.parts.map(p => p.text).join('') : m.content
        }))
      ];

  const body = {
        model: 'llama3-8b-8192',
        messages: groqMessages,
        temperature: 0.7,
        max_tokens: 1024
  };

  try {
        const response = await fetch(
                'https://api.groq.com/openai/v1/chat/completions',
          {
                    method: 'POST',
                    headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(body)
          }
              );

      if (!response.ok) {
              const err = await response.text();
              console.error('Groq error:', err);
              return res.status(response.status).json({ error: 'Groq API error', detail: err });
      }

      const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';
        return res.status(200).json({ reply: text });
  } catch (err) {
        console.error('Fetch error:', err);
        return res.status(500).json({ error: 'Internal server error' });
  }
}
