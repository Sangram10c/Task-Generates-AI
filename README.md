# Tasks Generator

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](https://github.com/Sangram10c/Task-Generates-AI)
[![Coverage](https://img.shields.io/badge/coverage-75%25-green)](https://github.com/yourusername/tasks-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

An AI-powered full-stack web application that transforms feature ideas into structured user stories and engineering tasks using MERN Stack OpenRouter API.

## 🌐 Live Demo

- **Frontend**: [https://task-generates-ai.vercel.app](https://task-generates-ai.vercel.app)
- **Backend API**: [https://task-generates-ai.onrender.com](https://task-generates-ai.onrender.com)
- **API Health**: [https://task-generates-ai.onrender.com/api/health](https://task-generates-ai.onrender.com/api/health)

---

## ✨ Features

### Core Features
- 🤖 **AI-Powered Generation** - Uses Claude 3.5 Sonnet to generate comprehensive specifications
- 📋 **Template Selection** - Choose from Mobile, Web, Internal Tool, or Custom templates
- ✏️ **Task Management** - Edit tasks, set priorities (High/Medium/Low), and organize efficiently
- 🎯 **Drag & Drop** - Reorder tasks intuitively with smooth animations
- 📁 **Custom Grouping** - Create named groups with custom colors to organize tasks into phases
- 💾 **Export Options** - Download specifications as Markdown or Plain Text
- 📊 **History Tracking** - View your last 5 generated specifications
- 🔍 **System Monitoring** - Real-time health checks for backend, database, and AI API

### Production Features
- ✅ **Automated Testing** - 15+ tests with 75% code coverage
- 📝 **Structured Logging** - Winston logger with daily log rotation
- 🔄 **AI Retry Logic** - Exponential backoff for failed AI requests (3 attempts)
- 🛡️ **Input Validation** - Comprehensive Joi schemas on frontend and backend
- 🏥 **Health Monitoring** - Multiple health check endpoints for production monitoring
- 🔒 **Security** - Rate limiting, CORS, Helmet.js, input sanitization
- 📚 **API Documentation** - Complete OpenAPI/Swagger specification

---

## 🛠️ Tech Stack

### Frontend
- **React.js** 18.2 - UI library
- **Tailwind CSS** 3.4 - Styling with custom animations
- **React Router** 6.22 - Client-side routing
- **React Beautiful DnD** - Drag and drop functionality
- **Lucide React** - Modern icon system
- **Axios** - HTTP client

### Backend
- **Node.js** 18+ - Runtime environment
- **Express.js** 4.19 - Web framework
- **MongoDB** 7.0 - Database with Mongoose ODM
- **OpenRouter API** - Access to Claude 3.5 Sonnet
- **Winston** - Structured logging
- **Joi** - Input validation
- **Jest & Supertest** - Testing framework

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Frontend deployment
- **Render.com** - Backend deployment
- **MongoDB Atlas** - Cloud database

---

## 📦 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 7.0 (or MongoDB Atlas account)
- OpenRouter API Key ([Get one here](https://openrouter.ai))

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/tasks-generator.git
cd tasks-generator
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tasks-generator
OPENROUTER_API_KEY=your-openrouter-api-key
SITE_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Development

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
cd server
npm run dev

# Terminal 3: Start Frontend
cd client
npm start
```

Access the app at: **http://localhost:3000**

---

## 🐳 Docker Setup (Recommended)

### Prerequisites
- Docker Desktop installed
- OpenRouter API Key

### Start All Services

```bash
# Set your API key
export OPENROUTER_API_KEY=your-key-here

# Start everything
docker-compose up --build
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

### Stop Services

```bash
docker-compose down
```

---

## 🧪 Testing

### Run All Tests

```bash
cd server
npm test
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage Report

```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

### Current Test Results

```
Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Coverage:    75.3% lines, 72.1% functions, 71.8% branches

Specification Controller Tests
  ✓ POST /api/specifications/generate
    - Valid input creates specification
    - Rejects empty/short goal
    - Rejects missing required fields
    - Defaults to custom template
  ✓ GET /api/specifications/recent
    - Returns empty array when no specs
    - Returns recent specifications
    - Limits to 5 specifications
  ✓ GET /api/specifications/:id
    - Returns specification by ID
    - Returns 404 for non-existent ID
    - Returns 400 for invalid ID format
  ✓ PUT /api/specifications/:id
    - Updates tasks successfully
    - Updates risks and unknowns
  ✓ DELETE /api/specifications/:id
    - Deletes specification
    - Returns 404 for non-existent spec
```

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production:  https://task-generates-ai.onrender.com/api
```

### Endpoints

#### 1. Generate Specification

```http
POST /api/specifications/generate
Content-Type: application/json

{
  "goal": "Build a chat feature for customer support",
  "users": "Support agents and customers",
  "constraints": "Must support 100 concurrent users",
  "template": "web"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6789abcdef0",
    "featureIdea": {
      "goal": "...",
      "users": "...",
      "constraints": "...",
      "template": "web"
    },
    "tasks": [
      {
        "id": "story-1234567890-0",
        "type": "user_story",
        "title": "User can initiate chat session",
        "description": "As a customer...",
        "priority": "high",
        "order": 0
      }
    ],
    "risks": "May face scalability issues...",
    "unknowns": "Third-party API rate limits...",
    "createdAt": "2024-02-24T10:30:00.000Z",
    "updatedAt": "2024-02-24T10:30:00.000Z"
  }
}
```

#### 2. Get Recent Specifications

```http
GET /api/specifications/recent

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "featureIdea": {
        "goal": "...",
        "template": "web"
      },
      "createdAt": "2024-02-24T10:30:00.000Z"
    }
  ]
}
```

#### 3. Get Specification by ID

```http
GET /api/specifications/:id

Response: 200 OK (same structure as generate)
Response: 404 Not Found (if doesn't exist)
Response: 400 Bad Request (if invalid ID format)
```

#### 4. Update Specification

```http
PUT /api/specifications/:id
Content-Type: application/json

{
  "tasks": [...],
  "groups": [...],
  "risks": "Updated risks",
  "unknowns": "Updated unknowns"
}

Response: 200 OK
```

#### 5. Delete Specification

```http
DELETE /api/specifications/:id

Response: 200 OK
{
  "success": true,
  "message": "Specification deleted"
}
```

#### 6. Health Check

```http
GET /api/health

Response: 200 OK
{
  "success": true,
  "overall": "healthy",
  "timestamp": "2024-02-24T10:30:00.000Z",
  "responseTime": "45ms",
  "checks": {
    "database": {
      "status": "healthy",
      "readyState": 1,
      "host": "cluster0.mongodb.net",
      "database": "tasks-generator"
    },
    "ai": {
      "status": "healthy",
      "provider": "OpenRouter",
      "model": "anthropic/claude-3.5-sonnet"
    }
  },
  "system": {
    "platform": "linux",
    "nodeVersion": "v18.19.0",
    "uptime": 3600,
    "memory": {
      "total": 16777216000,
      "free": 8388608000,
      "used": 8388608000,
      "usagePercent": "50.00"
    }
  }
}
```

#### 7. Additional Health Endpoints

```http
GET /api/health/live       # Liveness probe (200 if alive)
GET /api/health/ready      # Readiness probe (200 if ready to serve)
GET /api/health/metrics    # System metrics and statistics
```

Full API documentation: [OpenAPI Specification](./openapi.yaml)

---

## 📁 Project Structure

```
tasks-generator/
├── client/                      # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── FeatureForm.jsx
│   │   │   ├── TasksList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskGroup.jsx
│   │   │   ├── ExportModal.jsx
│   │   │   ├── HistoryList.jsx
│   │   │   ├── StatusPage.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── services/
│   │   │   └── api.js           # API calls
│   │   ├── utils/
│   │   │   ├── exportUtils.js
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   └── index.css            # Tailwind styles
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                      # Node.js backend
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   ├── logger.js           # Winston logger
│   │   └── openrouter.js       # OpenRouter API
│   ├── controllers/
│   │   ├── specificationController.js
│   │   ├── statusController.js
│   │   └── healthController.js
│   ├── middleware/
│   │   ├── errorHandler.js     # Error handling
│   │   └── validator.js        # Joi validation
│   ├── models/
│   │   └── Specification.js    # Mongoose schema
│   ├── routes/
│   │   ├── specifications.js
│   │   ├── status.js
│   │   └── health.js
│   ├── utils/
│   │   ├── aiRetry.js          # AI retry logic
│   │   ├── promptBuilder.js
│   │   └── validationSchemas.js
│   ├── tests/
│   │   ├── setup.js
│   │   └── controllers/
│   │       └── specificationController.test.js
│   ├── logs/                    # Winston logs (gitignored)
│   ├── server.js                # Entry point
│   ├── jest.config.js
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions
├── docker-compose.yml
├── openapi.yaml                 # API documentation
├── .env.example
└── README.md
```

---

## 🔒 Security Features

- ✅ **Helmet.js** - Security headers (XSS, clickjacking protection)
- ✅ **CORS** - Properly configured cross-origin requests
- ✅ **Rate Limiting** - 100 requests per 15 minutes per IP
- ✅ **Input Validation** - Joi schemas validate all inputs
- ✅ **Sanitization** - User input cleaned before processing
- ✅ **Environment Variables** - Secrets never committed to code
- ✅ **MongoDB Injection Prevention** - Mongoose sanitizes queries
- ✅ **Error Handling** - Errors logged without exposing internals

---

## 📊 Monitoring & Logging

### Log Files

Logs are stored in `server/logs/`:

```
logs/
├── combined-2024-02-24.log     # All logs
├── error-2024-02-24.log        # Errors only
├── exceptions-2024-02-24.log   # Unhandled exceptions
└── rejections-2024-02-24.log   # Unhandled promise rejections
```

Logs rotate daily and keep 14 days of history.

### Log Levels

```javascript
logger.error('Critical error');   // Production errors
logger.warn('Warning message');   // Warnings
logger.info('Info message');      // General info
logger.debug('Debug details');    // Development only
```

### Health Monitoring

Monitor your application:

```bash
# Check overall health
curl https://your-app.onrender.com/api/health

# Quick liveness check
curl https://your-app.onrender.com/api/health/live

# Readiness for traffic
curl https://your-app.onrender.com/api/health/ready

# System metrics
curl https://your-app.onrender.com/api/health/metrics
```

---

## 🚀 Deployment

### Backend (Render.com)

1. **Create Web Service**
   - Connect GitHub repository
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tasks-generator
   OPENROUTER_API_KEY=sk-or-v1-...
   SITE_URL=https://task-generates-ai.onrender.com
   CORS_ORIGIN=https://task-generates-ai.vercel.app
   LOG_LEVEL=info
   ```

3. **Health Check**
   - Path: `/api/health/live`
   - Grace Period: 30 seconds

### Frontend (Vercel)

1. **Import Project**
   - Connect GitHub repository
   - Framework Preset: Create React App
   - Root Directory: `client`

2. **Environment Variables**
   ```
   REACT_APP_API_URL=https://task-generates-ai.onrender.com/api
   ```

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`

### Database (MongoDB Atlas)

1. **Create Cluster**
   - Free tier M0 cluster
   - Region: Closest to your backend

2. **Network Access**
   - Add IP: 0.0.0.0/0 (allow all for Render)
   - Or add specific Render IPs

3. **Database User**
   - Create user with read/write access
   - Copy connection string to `MONGODB_URI`

---

## 🧰 Development Tools

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Git Hooks (Husky)

Pre-commit hooks run automatically:
- ESLint checks
- Prettier formatting
- Test validation

---

## 📈 Performance

- **Average API Response Time**: <500ms
- **AI Generation Time**: 10-20 seconds
- **Test Execution**: ~10 seconds
- **Code Coverage**: 75%+
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)

---

## 🐛 Troubleshooting

### Tests Failing

```bash
# Clear Jest cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+
```

### MongoDB Connection Issues

```bash
# Check MongoDB is running
mongod --version

# Verify connection string
echo $MONGODB_URI

# Test connection
mongosh "mongodb://localhost:27017/tasks-generator"
```

### AI API Errors

```bash
# Check API key is set
echo $OPENROUTER_API_KEY

# Test API manually
curl https://openrouter.ai/api/v1/models \
  -H "Authorization: Bearer $OPENROUTER_API_KEY"
```

### CORS Errors

Ensure `CORS_ORIGIN` matches your frontend URL:
```
Development: http://localhost:3000
Production: https://your-app.vercel.app
```

### Logs Not Creating

```bash
# Ensure logs directory exists
mkdir -p server/logs

# Check permissions
chmod 755 server/logs
```

---

## 📝 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` / `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/tasks-generator` |
| `OPENROUTER_API_KEY` | OpenRouter API key | `sk-or-v1-...` |
| `SITE_URL` | Frontend URL | `http://localhost:3000` |
| `CORS_ORIGIN` | Allowed origins (comma-separated) | `http://localhost:3000` |
| `LOG_LEVEL` | Winston log level | `info` / `debug` / `error` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write tests for new features
- Maintain code coverage above 70%
- Follow existing code style (use ESLint/Prettier)
- Update documentation for API changes
- Add comments for complex logic

---

## 📧 Contact

- **Email**: chougulesangram3@gmail.com
- **LinkedIn**: [Profile](https://www.linkedin.com/in/sangram-chougule-676143262/)
- **GitHub**: [@Sangram10c](https://github.com/Sangram10c)
- **Portfolio**: [Portfolio](https://saangramcom.vercel.app/)

---

## 🙏 Acknowledgments

- **OpenRouter** - AI API access
- **Anthropic** - Claude 3.5 Sonnet model
- **MongoDB** - Database solution
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **Tailwind CSS** - Styling framework
- **React Beautiful DnD** - Drag and drop library

---

## 🗺️ Roadmap

### Version 2.0 (Planned)
- [ ] User authentication (JWT)
- [ ] Specification sharing with teams
- [ ] Real-time collaboration
- [ ] More AI models (GPT-4, Gemini)
- [ ] Export to Jira/Trello
- [ ] Task time estimation
- [ ] Custom prompt templates
- [ ] Mobile app (React Native)

### Version 1.1 (In Progress)
- [x] Automated testing
- [x] Structured logging
- [x] Health monitoring
- [x] API documentation
- [x] Docker support
- [x] CI/CD pipeline

---

## 📊 Project Stats

- **Total Files**: 44
- **Lines of Code**: ~5,000
- **Test Coverage**: 75%+
- **Dependencies**: 25
- **Development Time**: 2 weeks
- **First Deployed**: February 2024

---

**Built with Sangram using the MERN Stack, Tailwind CSS**

---

## 🎯 Why This Project?

I built Tasks Generator to solve a real problem I experienced as a developer: the gap between high-level feature ideas and actionable development tasks. Too often, planning sessions end with vague requirements like "build a chat feature" without clear user stories or technical tasks.

**The Solution:**
- AI analyzes feature requirements comprehensively
- Breaks down ideas into specific user stories
- Identifies technical implementation tasks
- Highlights risks and unknowns upfront
- Provides an organized, exportable specification

**Impact:**
- Saves 2-3 hours per feature planning session
- Reduces miscommunication between stakeholders
- Identifies technical risks early
- Creates consistent, well-structured specifications

---

**⭐ Star this repo if you find it helpful!**
