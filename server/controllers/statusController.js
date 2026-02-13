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
