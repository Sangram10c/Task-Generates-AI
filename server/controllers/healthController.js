const mongoose = require('mongoose');
const { testOpenRouterConnection } = require('../config/openrouter');
const logger = require('../config/logger');
const os = require('os');

// Detailed health check
const getDetailedHealth = async (req, res) => {
  try {
    const startTime = Date.now();

    // Check database
    const dbStatus = {
      status: mongoose.connection.readyState === 1 ? 'healthy' : 'unhealthy',
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      database: mongoose.connection.name,
    };

    // Check AI API
    let aiStatus = {
      status: 'unknown',
      provider: 'OpenRouter',
      model: 'anthropic/claude-3.5-sonnet',
    };

    try {
      const isConnected = await testOpenRouterConnection();
      aiStatus.status = isConnected ? 'healthy' : 'unhealthy';
    } catch (error) {
      aiStatus.status = 'unhealthy';
      aiStatus.error = error.message;
    }

    // System info
    const systemInfo = {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
      uptime: process.uptime(),
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        used: os.totalmem() - os.freemem(),
        usagePercent: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2),
      },
      cpu: {
        cores: os.cpus().length,
        model: os.cpus()[0]?.model,
      },
    };

    // Overall health
    const isHealthy = 
      dbStatus.status === 'healthy' && 
      aiStatus.status === 'healthy';

    const responseTime = Date.now() - startTime;

    const healthData = {
      success: true,
      overall: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      checks: {
        database: dbStatus,
        ai: aiStatus,
      },
      system: systemInfo,
    };

    logger.info('Health check performed', {
      overall: healthData.overall,
      responseTime: healthData.responseTime,
    });

    res.status(isHealthy ? 200 : 503).json(healthData);

  } catch (error) {
    logger.error('Health check failed', {
      error: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      overall: 'unhealthy',
      error: error.message,
    });
  }
};

// Simple liveness check (for load balancers)
const getLiveness = (req, res) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
  });
};

// Readiness check (can handle traffic)
const getReadiness = async (req, res) => {
  try {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        ready: false,
        reason: 'Database not connected',
      });
    }

    res.status(200).json({
      ready: true,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    res.status(503).json({
      ready: false,
      error: error.message,
    });
  }
};

// Metrics endpoint
const getMetrics = async (req, res) => {
  try {
    const Specification = require('../models/Specification');

    // Gather metrics
    const totalSpecs = await Specification.countDocuments();
    const specsToday = await Specification.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });
    const specsThisWeek = await Specification.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    const metrics = {
      specifications: {
        total: totalSpecs,
        today: specsToday,
        thisWeek: specsThisWeek,
      },
      system: {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
      },
      timestamp: new Date().toISOString(),
    };

    res.json(metrics);

  } catch (error) {
    logger.error('Metrics collection failed', {
      error: error.message,
    });

    res.status(500).json({
      success: false,
      error: 'Failed to collect metrics',
    });
  }
};

module.exports = {
  getDetailedHealth,
  getLiveness,
  getReadiness,
  getMetrics,
};
