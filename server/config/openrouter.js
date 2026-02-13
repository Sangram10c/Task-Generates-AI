// const OpenAI = require("openai");

// const openrouter = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1",
//   defaultHeaders: {
//     "HTTP-Referer": "http://localhost:3000",
//     "X-Title": "Tasks Generator",
//   },
// });

// const testLLMConnection = async () => {
//   try {
//     const response = await openrouter.chat.completions.create({
//       model: "mistralai/mistral-7b-instruct",
//       messages: [{ role: "user", content: "ping" }],
//       max_tokens: 5,
//     });

//     return { ok: Boolean(response.choices[0]?.message?.content) };
//   } catch (error) {
//     if (error.status === 429) {
//       return { ok: false, reason: "rate_limited" };
//     }
//     return { ok: false, reason: error.message };
//   }
// };

// module.exports = { openrouter, testLLMConnection };
const OpenAI = require('openai');

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.SITE_URL || 'https://task-generates-ai.onrender.com',
    'X-Title': 'Tasks Generator',
  },
});

const testOpenRouterConnection = async () => {
  try {
    const completion = await openrouter.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [{ role: 'user', content: 'Hello! Just testing connection.' }],
      max_tokens: 100,
    });
    return completion.choices[0]?.message?.content ? true : false;
  } catch (error) {
    console.error('OpenRouter API Error:', error.message);
    return false;
  }
};

module.exports = { openrouter, testOpenRouterConnection };