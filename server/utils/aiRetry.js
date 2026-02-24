const logger = require('../config/logger');
const { openrouter } = require('../config/openrouter');

// Sleep utility
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry logic with exponential backoff
const callAIWithRetry = async (prompt, maxRetries = 3, initialDelay = 1000) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.info('AI API call attempt', {
        attempt,
        maxRetries,
        promptLength: prompt.length,
      });

      const completion = await openrouter.chat.completions.create({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 4000,
        temperature: 0.7,
      });

      // Validate response structure
      if (!completion || !completion.choices || !completion.choices[0]) {
        throw new Error('Invalid AI response structure');
      }

      const responseText = completion.choices[0]?.message?.content;

      if (!responseText) {
        throw new Error('Empty AI response');
      }

      // Validate response contains JSON
      if (!responseText.includes('{') || !responseText.includes('}')) {
        throw new Error('AI response does not contain JSON');
      }

      logger.info('AI API call successful', {
        attempt,
        responseLength: responseText.length,
      });

      return responseText;

    } catch (error) {
      lastError = error;

      logger.error('AI API call failed', {
        attempt,
        maxRetries,
        error: error.message,
        stack: error.stack,
      });

      // Don't retry on last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = initialDelay * Math.pow(2, attempt - 1);

      logger.info('Retrying AI API call', {
        attempt,
        nextAttempt: attempt + 1,
        delayMs: delay,
      });

      await sleep(delay);
    }
  }

  // All retries failed
  logger.error('AI API call failed after all retries', {
    maxRetries,
    finalError: lastError.message,
  });

  throw new Error(`AI API failed after ${maxRetries} attempts: ${lastError.message}`);
};

// Parse AI JSON response with validation
const parseAIResponse = (responseText) => {
  try {
    // Remove markdown code blocks if present
let cleanedText = responseText.trim();

// Only clean if it has markdown backticks
if (cleanedText.includes('```')) {
  cleanedText = cleanedText
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
}

    // Parse JSON
    const parsedData = JSON.parse(cleanedText);

    // Validate required fields
    if (!parsedData.userStories && !parsedData.engineeringTasks) {
      throw new Error('AI response missing userStories or engineeringTasks');
    }

    // Validate arrays
    if (parsedData.userStories && !Array.isArray(parsedData.userStories)) {
      throw new Error('userStories must be an array');
    }

    if (parsedData.engineeringTasks && !Array.isArray(parsedData.engineeringTasks)) {
      throw new Error('engineeringTasks must be an array');
    }

    logger.info('AI response parsed successfully', {
      userStoriesCount: parsedData.userStories?.length || 0,
      engineeringTasksCount: parsedData.engineeringTasks?.length || 0,
    });

    return parsedData;

  } catch (error) {
    logger.error('Failed to parse AI response', {
      error: error.message,
      responsePreview: responseText.substring(0, 200),
    });

    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
};

module.exports = {
  callAIWithRetry,
  parseAIResponse,
  sleep,
};
