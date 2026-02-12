// const Anthropic = require('@anthropic-ai/sdk');

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

// const testClaudeConnection = async () => {
//   try {
//     const message = await anthropic.messages.create({
//       model: 'claude-sonnet-4-20250514',
//       max_tokens: 100,
//       messages: [{ role: 'user', content: 'Hello! Just testing connection.' }],
//     });
//     return message.content[0].text ? true : false;
//   } catch (error) {
//     console.error('Claude API Error:', error.message);
//     return false;
//   }
// };

// module.exports = { anthropic, testClaudeConnection };
const OpenAI = require("openai");

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // required
    "X-Title": "Tasks Generator",             // your app name
  },
});

const testLLMConnection = async () => {
  try {
    const response = await openrouter.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // FREE model
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 5,
    });

    return { ok: Boolean(response.choices[0]?.message?.content) };
  } catch (error) {
    if (error.status === 429) {
      return { ok: false, reason: "rate_limited" };
    }
    return { ok: false, reason: error.message };
  }
};

module.exports = { openrouter, testLLMConnection };
