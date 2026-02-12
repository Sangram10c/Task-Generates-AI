// const buildPrompt = (featureIdea) => {
//   const { goal, users, constraints, template } = featureIdea;

//   const templateContext = {
//     mobile: 'This is a mobile application. Consider mobile-specific patterns, touch interactions, offline capabilities, and app store requirements.',
//     web: 'This is a web application. Consider responsive design, browser compatibility, accessibility standards, and SEO.',
//     internal_tool: 'This is an internal tool. Prioritize functionality over polish, consider existing company systems, and focus on productivity improvements.',
//     custom: '',
//   };

//   return `You are a product manager and technical lead helping break down a feature idea into actionable user stories and engineering tasks.

// Feature Context:
// - Goal: ${goal}
// - Target Users: ${users}
// - Constraints: ${constraints}
// ${template !== 'custom' ? `- Type: ${template.replace('_', ' ').toUpperCase()}
// - Context: ${templateContext[template]}` : ''}

// Please generate a comprehensive breakdown including:

// 1. User Stories (5-8 stories): Write from user perspective "As a [user], I want to [action] so that [benefit]"
// 2. Engineering Tasks (10-15 tasks): Technical implementation tasks, including:
//    - Frontend components
//    - Backend APIs
//    - Database schema
//    - Testing requirements
//    - Deployment considerations

// 3. Risks and Unknowns: Identify potential technical risks, dependencies, and open questions

// Format your response as valid JSON with this exact structure:
// {
//   "userStories": [
//     {
//       "title": "Brief title",
//       "description": "As a [user], I want to [action] so that [benefit]",
//       "priority": "high|medium|low"
//     }
//   ],
//   "engineeringTasks": [
//     {
//       "title": "Brief technical title",
//       "description": "Detailed technical description",
//       "priority": "high|medium|low"
//     }
//   ],
//   "risks": "Comma-separated list of potential risks",
//   "unknowns": "Comma-separated list of open questions and unknowns"
// }

// Provide ONLY the JSON response, no other text.`;
// };

// module.exports = { buildPrompt };
const buildPrompt = ({ goal, users, constraints, template }) => {
  return `
You are a senior software architect.

Generate a feature specification STRICTLY in valid JSON.
DO NOT include explanations, markdown, or extra text.
DO NOT wrap the response in code blocks.

Return ONLY this JSON structure:

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
- Template: ${template}
- Goal: ${goal}
- Users: ${users}
- Constraints: ${constraints}
`;
};

module.exports = { buildPrompt };
