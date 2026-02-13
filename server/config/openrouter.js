const OpenAI = require("openai");

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Tasks Generator",
  },
});

const testLLMConnection = async () => {
  try {
    const response = await openrouter.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
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
