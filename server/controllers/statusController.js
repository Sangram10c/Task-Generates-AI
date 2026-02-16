const mongoose = require('mongoose');
const { testOpenRouterConnection } = require('../config/openrouter');

const getSystemStatus = async (req, res) => {
  try {
    
    const backendStatus = {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };

    const dbStatus = {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      state: mongoose.connection.readyState,
      host: mongoose.connection.host,
    };

    
    let llmStatus = {
      status: 'unknown',
      provider: 'OpenRouter',
      model: 'anthropic/claude-3.5-sonnet',
    };

    try {
      const isConnected = await testOpenRouterConnection();
      llmStatus.status = isConnected ? 'connected' : 'disconnected';
    } catch (error) {
      llmStatus.status = 'error';
      llmStatus.error = error.message;
    }

    res.json({
      success: true,
      backend: backendStatus,
      database: dbStatus,
      llm: llmStatus,
      overall:
        backendStatus.status === 'healthy' &&
        dbStatus.status === 'connected' &&
        llmStatus.status === 'connected'
          ? 'healthy'
          : 'degraded',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { getSystemStatus };