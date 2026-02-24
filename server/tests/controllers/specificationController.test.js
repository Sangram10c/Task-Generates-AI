const request = require('supertest');
const express = require('express');
const Specification = require('../../models/Specification');
const specificationRoutes = require('../../routes/specifications.js');

// Create test app
const app = express();
app.use(express.json());
app.use('/api/specifications', specificationRoutes);
app.use((err, req, res, next) => {
  console.error('Test app error:', err);
  res.status(500).json({ success: false, error: err.message });
});

// Mock OpenRouter API
jest.mock('../../config/openrouter', () => ({
  openrouter: {
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{
            message: {
              content: JSON.stringify({
                userStories: [
                  {
                    title: 'Test User Story',
                    description: 'Test description',
                    priority: 'high',
                  },
                ],
                engineeringTasks: [
                  {
                    title: 'Test Task',
                    description: 'Test task description',
                    priority: 'medium',
                  },
                ],
                risks: 'Test risks',
                unknowns: 'Test unknowns',
              }),
            },
          }],
        }),
      },
    },
  },
  testOpenRouterConnection: jest.fn().mockResolvedValue(true),
}));

describe('Specification Controller Tests', () => {
  describe('POST /api/specifications/generate', () => {
    it('should generate specification with valid input', async () => {
      const validInput = {
        goal: 'Build a chat feature for customer support',
        users: 'Support agents and customers',
        constraints: 'Must support 100 concurrent users',
        template: 'web',
      };

      const res = await request(app)
        .post('/api/specifications/generate')
        .send(validInput);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.tasks).toBeInstanceOf(Array);
      expect(res.body.data.tasks.length).toBeGreaterThan(0);
    });

    it('should reject empty goal', async () => {
      const invalidInput = {
        goal: '',
        users: 'Test users',
        constraints: 'Test constraints',
      };

      const res = await request(app)
        .post('/api/specifications/generate')
        .send(invalidInput);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('Validation failed');
    });

    it('should reject goal too short', async () => {
      const invalidInput = {
        goal: 'Short',
        users: 'Test users longer than minimum',
        constraints: 'Test constraints longer',
      };

      const res = await request(app)
        .post('/api/specifications/generate')
        .send(invalidInput);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject missing required fields', async () => {
      const invalidInput = {
        goal: 'Test goal that is long enough',
      };

      const res = await request(app)
        .post('/api/specifications/generate')
        .send(invalidInput);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should default to custom template if not provided', async () => {
      const validInput = {
        goal: 'Build a chat feature for customer support',
        users: 'Support agents and customers',
        constraints: 'Must support 100 concurrent users',
      };

      const res = await request(app)
        .post('/api/specifications/generate')
        .send(validInput);

      expect(res.status).toBe(201);
      expect(res.body.data.featureIdea.template).toBe('custom');
    });
  });

  describe('GET /api/specifications/recent', () => {
    it('should return empty array when no specifications', async () => {
      const res = await request(app).get('/api/specifications/recent');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
    });

    it('should return recent specifications', async () => {
      // Create test specifications
      await Specification.create({
        featureIdea: {
          goal: 'Test goal',
          users: 'Test users',
          constraints: 'Test constraints',
          template: 'web',
        },
        tasks: [],
        groups: [],
      });

      const res = await request(app).get('/api/specifications/recent');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
    });

    it('should limit to 5 specifications', async () => {
      // Create 7 specifications
      for (let i = 0; i < 7; i++) {
        await Specification.create({
          featureIdea: {
            goal: `Test goal ${i}`,
            users: 'Test users',
            constraints: 'Test constraints',
            template: 'web',
          },
          tasks: [],
          groups: [],
        });
      }

      const res = await request(app).get('/api/specifications/recent');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(5);
    });
  });

  describe('GET /api/specifications/:id', () => {
    it('should return specification by ID', async () => {
      const spec = await Specification.create({
        featureIdea: {
          goal: 'Test goal',
          users: 'Test users',
          constraints: 'Test constraints',
          template: 'web',
        },
        tasks: [],
        groups: [],
      });

      const res = await request(app).get(`/api/specifications/${spec._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(spec._id.toString());
    });

    it('should return 404 for non-existent ID', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app).get(`/api/specifications/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/api/specifications/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/specifications/:id', () => {
    it('should update specification tasks', async () => {
      const spec = await Specification.create({
        featureIdea: {
          goal: 'Test goal',
          users: 'Test users',
          constraints: 'Test constraints',
          template: 'web',
        },
        tasks: [{
          id: 'task-1',
          type: 'user_story',
          title: 'Original title',
          description: 'Original description',
          priority: 'medium',
        }],
        groups: [],
      });

      const updatedTasks = [{
        id: 'task-1',
        type: 'user_story',
        title: 'Updated title',
        description: 'Updated description',
        priority: 'high',
      }];

      const res = await request(app)
        .put(`/api/specifications/${spec._id}`)
        .send({ tasks: updatedTasks });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.tasks[0].title).toBe('Updated title');
    });

    it('should update risks and unknowns', async () => {
      const spec = await Specification.create({
        featureIdea: {
          goal: 'Test goal',
          users: 'Test users',
          constraints: 'Test constraints',
          template: 'web',
        },
        tasks: [],
        groups: [],
      });

      const res = await request(app)
        .put(`/api/specifications/${spec._id}`)
        .send({
          risks: 'Updated risks',
          unknowns: 'Updated unknowns',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.risks).toBe('Updated risks');
      expect(res.body.data.unknowns).toBe('Updated unknowns');
    });
  });

  describe('DELETE /api/specifications/:id', () => {
    it('should delete specification', async () => {
      const spec = await Specification.create({
        featureIdea: {
          goal: 'Test goal',
          users: 'Test users',
          constraints: 'Test constraints',
          template: 'web',
        },
        tasks: [],
        groups: [],
      });

      const res = await request(app).delete(`/api/specifications/${spec._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify it's deleted
      const deleted = await Specification.findById(spec._id);
      expect(deleted).toBeNull();
    });

    it('should return 404 for non-existent specification', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app).delete(`/api/specifications/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
