const logger = require('./config/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const healthRoutes = require('./routes/health');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');

const specificationRoutes = require('./routes/specifications');
const statusRoutes = require('./routes/status');

const app = express();
// Request logging
app.use((req, res, next) => {
  logger.info('Request received', {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });
  next();
});

app.use('/api/health', healthRoutes);

// IMPORTANT: Trust proxy - Required for Render.com and other reverse proxies
app.set('trust proxy', 1);

// Connect to database
connectDB();

// Middleware
app.use(helmet());

// CORS Configuration - Support multiple origins
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'https://task-generates-ai.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting - Now works correctly with trust proxy
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Tasks Generator API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      status: '/api/status',
      specifications: '/api/specifications',
    },
  });
});

app.use('/api/status', statusRoutes);
app.use('/api/specifications', specificationRoutes);

// Error handler (must be last)
// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);
const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🌐 API endpoint: http://${HOST}:${PORT}`);
  console.log(`🔗 CORS origins: ${allowedOrigins.join(', ')}`);
  console.log(`🗄️ MongoDB: ${process.env.MONGODB_URI ? 'Connected' : 'NOT SET'}`);
  console.log(`🤖 Claude API: ${process.env.ANTHROPIC_API_KEY ? 'Configured' : 'NOT SET'}`);
});

module.exports = app;