# AI Usage Notes

## Overview

This document explains how AI was used in the development of Tasks Generator and clarifies that only 40% of the project involved AI assistance, primarily for debugging and error handling. The remaining 60% was manual development.

## AI Usage Breakdown

### Total AI Contribution: 40%

AI was used for:
- Debugging errors and issues (35%)
- Error handling patterns (5%)

### Manual Development: 60%

All core work was done manually:
- Application architecture and design
- Feature implementation
- UI/UX design with Tailwind CSS
- Business logic
- Database schema design
- API development
- Testing and quality assurance

## What AI Was Used For

### 1. Debugging (35%)

AI helped resolve technical issues:

Backend Issues:
- MongoDB deprecation warnings (useNewUrlParser, useUnifiedTopology)
- Express trust proxy configuration for Render deployment
- CORS configuration for cross-origin requests
- OpenRouter API integration errors
- Rate limiting configuration issues

Frontend Issues:
- Tailwind CSS compilation errors
- React component syntax errors
- Drag-and-drop library setup

### 2. Error Handling Patterns (5%)

AI provided guidance on:
- Try-catch block structure
- Error response formatting
- Input validation approaches
- API error handling best practices

## What I Developed Manually (60%)

### Architecture (100% Manual)
- Technology stack selection (MERN)
- System design and structure
- Component hierarchy
- API endpoint design
- Database schema modeling

### Implementation (100% Manual)
- All React components
- Express.js routes and controllers
- MongoDB schemas with Mongoose
- Form validation logic
- Drag-and-drop functionality
- Export features (Markdown, Text)
- Task management logic
- Group management system

### Design (100% Manual)
- UI/UX design decisions
- Tailwind CSS configuration
- Color schemes and gradients
- Animations and transitions
- Responsive layout design
- Component styling

### Testing (100% Manual)
- Feature testing
- Browser compatibility testing
- API testing with Postman
- Error scenario testing
- Edge case validation

## LLM Provider and Model

### Provider: OpenRouter

Chosen because:
- Access to multiple AI models through single API
- Better cost management and usage tracking
- Flexible model selection
- OpenAI-compatible API format

### Model: Claude 3.5 Sonnet

API Endpoint: anthropic/claude-3.5-sonnet

Chosen because:
- Excellent balance of quality, speed, and cost
- Reliable JSON output formatting
- Strong at breaking down features into tasks
- Consistent structured responses
- Fast response time (10-20 seconds)

Model Details:
- Context window: 20K tokens
- Max output: 4,096 tokens
- Temperature: 0.7
- Primary use: Generate user stories and tasks

## Development Workflow

1. Feature Planning (Manual)
   - Define requirements
   - Design structure
   - Plan implementation

2. Implementation (Manual)
   - Write all code
   - Create components
   - Build API endpoints

3. Debugging (40% AI-Assisted)
   - Encounter errors
   - Ask AI for explanation
   - Review suggested solutions
   - Implement fixes manually

4. Testing (Manual)
   - Test functionality
   - Check edge cases
   - Verify responsive design

5. Refinement (Manual)
   - Code review
   - Performance optimization
   - UI improvements
