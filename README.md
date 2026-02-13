# Tasks Generator

An AI-powered web application that transforms feature ideas into actionable user stories and engineering tasks using Claude AI via OpenRouter.

## 🚀 Live Demo

- **Frontend**: [https://task-generates-ai.vercel.app](https://task-generates-ai.vercel.app)
- **Backend API**: [https://task-generates-ai.onrender.com](https://task-generates-ai.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [What's Done](#whats-done)
- [What's Not Done](#whats-not-done)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Core Features
- 🤖 **AI-Powered Generation**: Automatically generate user stories and engineering tasks from feature descriptions
- 📝 **Template Selection**: Choose from Mobile App, Web App, Internal Tool, or Custom templates
- ✏️ **Task Management**: Edit, delete, and prioritize tasks
- 🎯 **Drag & Drop**: Reorder tasks and organize them into groups
- 📁 **Task Grouping**: Create custom groups with color coding
- 💾 **Export Options**: Download specifications as Markdown or Plain Text
- 📊 **History Tracking**: View your last 5 generated specifications
- 🔍 **System Status**: Monitor backend, database, and AI API health
- 🎨 **Modern UI**: Beautiful gradient design with Tailwind CSS and smooth animations

### Additional Features
- ⚠️ **Risk Assessment**: AI-identified potential risks
- ❓ **Unknowns Tracking**: List of open questions and uncertainties
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🔄 **Real-time Updates**: Automatic saving of changes

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18.2
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.22
- **Icons**: Lucide React
- **Drag & Drop**: React Beautiful DnD
- **HTTP Client**: Axios
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.19
- **Database**: MongoDB (MongoDB Atlas)
- **ODM**: Mongoose 8.3
- **AI Provider**: OpenRouter API
- **Model**: Claude 3.5 Sonnet (Anthropic)
- **Security**: Helmet, CORS, Rate Limiting
- **Deployment**: Render.com

### Development Tools
- **Version Control**: Git & GitHub
- **Environment Management**: dotenv
- **API Testing**: Postman
- **Code Editor**: VS Code

---

## 📦 Prerequisites

Before running this project, make sure you have:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** (local) or MongoDB Atlas account
- **OpenRouter API Key** (sign up at [openrouter.ai](https://openrouter.ai))
- **Git** (for version control)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Sangram10c/Task-Generates-AI.git
cd Tasks-Generator-AI
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

#### Backend (.env)

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tasks-generator
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key
SITE_URL=http://localhost:3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasks-generator
```

#### Frontend (.env)

Create `client/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Get Your OpenRouter API Key

1. Sign up at [https://openrouter.ai](https://openrouter.ai)
2. Go to [Keys](https://openrouter.ai/keys)
3. Create a new API key
4. Copy and paste it into `server/.env`

---

## 🏃 Running Locally

### Option 1: Run Both Servers Separately

**Terminal 1 - Start MongoDB (if using local):**
```bash
mongod
```

**Terminal 2 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 3 - Start Frontend:**
```bash
cd client
npm start
```

### Option 2: Using Docker (Optional)
```bash
# From root directory
docker-compose up --build
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Status Page**: http://localhost:3000/status

---

## 🌐 Deployment

### Deploy Backend (Render.com)

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: tasks-generator-api
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment Variables**: Add all variables from `.env`
5. Click "Create Web Service"

### Deploy Frontend (Vercel)
```bash
cd client
npm install -g vercel
vercel --prod
```

Or use Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set Root Directory to `client`
4. Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com/api`
5. Deploy

---

## 📁 Project Structure
```
tasks-generator/
├── client/                      # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Home.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── FeatureForm.jsx
│   │   │   ├── TasksList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── TaskGroup.jsx
│   │   │   ├── ExportModal.jsx
│   │   │   ├── HistoryList.jsx
│   │   │   ├── StatusPage.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── utils/
│   │   │   ├── exportUtils.js   # Export functionality
│   │   │   └── validators.js    # Form validation
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env
├── server/                      # Node.js backend
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── openrouter.js       # OpenRouter AI config
│   ├── models/
│   │   └── Specification.js    # MongoDB schema
│   ├── routes/
│   │   ├── specifications.js   # Spec routes
│   │   └── status.js           # Health check routes
│   ├── controllers/
│   │   ├── specificationController.js
│   │   └── statusController.js
│   ├── middleware/
│   │   ├── errorHandler.js     # Error handling
│   │   └── validator.js        # Input validation
│   ├── utils/
│   │   └── promptBuilder.js    # AI prompt engineering
│   ├── server.js               # Entry point
│   ├── package.json
│   └── .env
├── README.md
├── AI_NOTES.md
├── ABOUTME.md
├── PROMPTS_USED.md
└── .gitignore
```

---

## 📡 API Documentation

### Base URL
```
Production: https://task-generates-ai.onrender.com/api
Local: http://localhost:5000/api
```

### Endpoints

#### 1. Generate Specification
```http
POST /specifications/generate
```

**Request Body:**
```json
{
  "goal": "Create a chat feature for customer support",
  "users": "Support agents and customers",
  "constraints": "Must support 100 concurrent users",
  "template": "web"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "featureIdea": {...},
    "tasks": [...],
    "risks": "...",
    "unknowns": "..."
  }
}
```

#### 2. Get Recent Specifications
```http
GET /specifications/recent
```

#### 3. Get Single Specification
```http
GET /specifications/:id
```

#### 4. Update Specification
```http
PUT /specifications/:id
```

#### 5. Delete Specification
```http
DELETE /specifications/:id
```

#### 6. System Status
```http
GET /status
```

---

## ✅ What's Done

### Core Functionality
- [x] AI-powered task generation using Claude 3.5 Sonnet
- [x] Template selection (Mobile, Web, Internal Tool, Custom)
- [x] Form validation and error handling
- [x] User stories and engineering tasks separation
- [x] Task editing (title, description, priority)
- [x] Task deletion with confirmation
- [x] Drag-and-drop task reordering
- [x] Task grouping with custom names and colors
- [x] Group management (create, edit, delete)
- [x] Risk and unknowns identification
- [x] Export as Markdown and Plain Text
- [x] Download exported files
- [x] Copy to clipboard functionality
- [x] View last 5 specifications history
- [x] System health monitoring
- [x] Real-time status checking (Backend, Database, LLM)
- [x] Responsive design (mobile, tablet, desktop)
- [x] Modern UI with Tailwind CSS
- [x] Smooth animations and transitions
- [x] Loading states and spinners
- [x] Error messages and alerts
- [x] Backend API with Express.js
- [x] MongoDB database integration
- [x] OpenRouter API integration
- [x] CORS configuration
- [x] Rate limiting
- [x] Security headers (Helmet)
- [x] Environment variable management
- [x] Deployment on Vercel and Render

### Documentation
- [x] README with setup instructions
- [x] API documentation
- [x] AI usage notes
- [x] Personal information
- [x] Prompts used record

---

## ❌ What's Not Done

### Features Not Implemented
- [ ] User authentication and authorization
- [ ] User accounts and profiles
- [ ] Sharing specifications between users
- [ ] Collaborative editing (multiple users)
- [ ] Real-time collaboration with WebSockets
- [ ] Advanced search and filtering
- [ ] Task dependencies visualization
- [ ] Gantt chart or timeline view
- [ ] Time estimation for tasks
- [ ] Task assignment to team members
- [ ] Comments and discussions on tasks
- [ ] File attachments
- [ ] Integration with project management tools (Jira, Trello, Asana)
- [ ] Slack/Discord notifications
- [ ] Email notifications
- [ ] Version history and rollback
- [ ] Custom AI prompt templates
- [ ] Batch operations on multiple tasks
- [ ] Analytics and reporting
- [ ] API rate limiting per user
- [ ] Task templates library
- [ ] Dark mode theme
- [ ] Keyboard shortcuts
- [ ] Undo/Redo functionality
- [ ] Auto-save with debouncing
- [ ] Offline mode with service workers
- [ ] Mobile native app
- [ ] Browser extension

### Technical Improvements Needed
- [ ] Unit tests (Jest, React Testing Library)
- [ ] Integration tests
- [ ] E2E tests (Cypress, Playwright)
- [ ] Performance optimization
- [ ] Code splitting and lazy loading
- [ ] PWA support
- [ ] SEO optimization
- [ ] Accessibility improvements (WCAG compliance)
- [ ] Internationalization (i18n)
- [ ] Database indexing optimization
- [ ] Caching layer (Redis)
- [ ] CDN for static assets
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics, Mixpanel)
- [ ] Logging and monitoring
- [ ] Automated CI/CD pipeline
- [ ] Docker production setup
- [ ] Kubernetes deployment
- [ ] Load balancing
- [ ] Database backups and recovery

---

## 🔐 Environment Variables

### Backend Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `5000` |
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/tasks-generator` |
| `OPENROUTER_API_KEY` | OpenRouter API key | Yes | `sk-or-v1-...` |
| `SITE_URL` | Your site URL for OpenRouter | Yes | `http://localhost:3000` |
| `NODE_ENV` | Environment mode | No | `development` or `production` |
| `CORS_ORIGIN` | Allowed CORS origins | No | `http://localhost:3000` |

### Frontend Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API URL | Yes | `http://localhost:5000/api` |

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Cannot connect to backend"
**Solution:**
- Check if backend is running on correct port
- Verify `REACT_APP_API_URL` in frontend `.env`
- Check CORS configuration in backend

#### 2. "Failed to generate specification"
**Solution:**
- Verify OpenRouter API key is valid
- Check API key has credits
- Ensure MongoDB is connected

#### 3. "Database connection failed"
**Solution:**
- Check MongoDB is running (`mongod`)
- Verify `MONGODB_URI` is correct
- For Atlas: Check network access (whitelist IP)

#### 4. Drag and drop not working
**Solution:**
- Clear browser cache
- Check browser console for errors
- Ensure React Beautiful DnD is installed

#### 5. Status page shows "Unknown"
**Solution:**
- Check backend logs
- Verify all environment variables are set
- Test API endpoint directly: `/api/status`

### Getting Help

If you encounter issues:
1. Check the browser console (F12)
2. Check backend logs
3. Verify all environment variables
4. Test API endpoints with Postman
5. Check MongoDB connection

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 🙏 Acknowledgments

- **OpenRouter** for providing access to Claude AI
- **Anthropic** for Claude 3.5 Sonnet
- **Tailwind CSS** for the styling framework
- **Lucide React** for beautiful icons
- **MongoDB** for the database
- **Vercel** and **Render** for hosting

---

## 📧 Contact

For questions or feedback, please reach out:
- Email: chougulesangram3@gmail.com 
- LinkedIn: [LinkedIn]([https://linkedin.com/in/yourprofile](https://www.linkedin.com/in/sangram-chougule-676143262/))
- GitHub: [GitHub]([https://github.com/yourusername](https://github.com/Sangram10c))

---

**Built with Sangram using MERN Stack, Tailwind CSS & Claude AI**
