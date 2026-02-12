const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['user_story', 'engineering_task'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium',
  },
  groupId: {
    type: String,
    default: null,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const groupSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#3b82f6',
  },
});

const specificationSchema = new mongoose.Schema(
  {
    featureIdea: {
      goal: {
        type: String,
        required: true,
      },
      users: {
        type: String,
        required: true,
      },
      constraints: {
        type: String,
        required: true,
      },
      template: {
        type: String,
        enum: ['mobile', 'web', 'internal_tool', 'custom'],
        default: 'custom',
      },
    },
    tasks: [taskSchema],
    groups: [groupSchema],
    risks: {
      type: String,
      default: '',
    },
    unknowns: {
      type: String,
      default: '',
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Specification', specificationSchema);