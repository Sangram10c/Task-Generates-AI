// const mongoose = require('mongoose');
// const { testClaudeConnection } = require('../config/claude');

// const getSystemStatus = async (req, res) => {
//   try {
//     // Check backend status
//     const backendStatus = {
//       status: 'healthy',
//       uptime: process.uptime(),
//       timestamp: new Date().toISOString(),
//     };

//     // Check database status
//     const dbStatus = {
//       status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
//       state: mongoose.connection.readyState,
//       host: mongoose.connection.host,
//     };

//     // Check LLM status
//     let llmStatus = {
//       status: 'unknown',
//       provider: 'Anthropic',
//       model: 'claude-sonnet-4-20250514',
//     };

//     try {
//       const isConnected = await testClaudeConnection();
//       llmStatus.status = isConnected ? 'connected' : 'disconnected';
//     } catch (error) {
//       llmStatus.status = 'error';
//       llmStatus.error = error.message;
//     }

//     res.json({
//       success: true,
//       backend: backendStatus,
//       database: dbStatus,
//       llm: llmStatus,
//       overall: 
//         backendStatus.status === 'healthy' && 
//         dbStatus.status === 'connected' && 
//         llmStatus.status === 'connected' 
//           ? 'healthy' 
//           : 'degraded',
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// module.exports = { getSystemStatus };

const mongoose = require("mongoose");
const { testLLMConnection } = require("../config/openrouter");

const getSystemStatus = async (req, res) => {
  try {
    const backendStatus = {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };

    const dbStatus = {
      status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      state: mongoose.connection.readyState,
      host: mongoose.connection.host,
    };

    const llmCheck = await testLLMConnection();

    const llmStatus = {
      provider: "OpenRouter",
      model: "mistralai/mistral-7b-instruct",
      status: llmCheck.ok ? "connected" : "limited",
    };

    res.json({
      success: true,
      backend: backendStatus,
      database: dbStatus,
      llm: llmStatus,
      overall:
        backendStatus.status === "healthy" &&
        dbStatus.status === "connected" &&
        llmStatus.status === "connected"
          ? "healthy"
          : "degraded",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getSystemStatus };
