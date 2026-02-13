const buildPrompt = ({ goal, users, constraints, template }) => {
  return `
You are a backend API that outputs STRICT JSON only.

CRITICAL RULES:
- Output ONLY valid JSON
- No explanations
- No markdown
- No code fences
- No comments
- No text before or after JSON

The JSON MUST match this exact structure:

{
  "userStories": [
    {
      "title": "string",
      "description": "string",
      "priority": "low | medium | high"
    }
  ],
  "engineeringTasks": [
    {
      "title": "string",
      "description": "string",
      "priority": "low | medium | high"
    }
  ],
  "risks": "string",
  "unknowns": "string"
}

Feature details:
Template: ${template}
Goal: ${goal}
Users: ${users}
Constraints: ${constraints}
`;
};

module.exports = { buildPrompt };
