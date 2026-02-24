const Joi = require('joi');

// Feature specification validation schema
const specificationSchema = Joi.object({
  goal: Joi.string()
    .min(10)
    .max(500)
    .trim()
    .required()
    .messages({
      'string.base': 'Goal must be a text string',
      'string.empty': 'Goal is required',
      'string.min': 'Goal must be at least 10 characters long',
      'string.max': 'Goal cannot exceed 500 characters',
      'any.required': 'Goal is required',
    }),
  
  users: Joi.string()
    .min(10)
    .max(300)
    .trim()
    .required()
    .messages({
      'string.base': 'Users must be a text string',
      'string.empty': 'Target users are required',
      'string.min': 'Users description must be at least 10 characters long',
      'string.max': 'Users description cannot exceed 300 characters',
      'any.required': 'Target users are required',
    }),
  
  constraints: Joi.string()
    .min(10)
    .max(500)
    .trim()
    .required()
    .messages({
      'string.base': 'Constraints must be a text string',
      'string.empty': 'Constraints are required',
      'string.min': 'Constraints must be at least 10 characters long',
      'string.max': 'Constraints cannot exceed 500 characters',
      'any.required': 'Constraints are required',
    }),
  
  template: Joi.string()
    .valid('mobile', 'web', 'internal_tool', 'custom')
    .default('custom')
    .messages({
      'any.only': 'Template must be one of: mobile, web, internal_tool, custom',
    }),
});

// Task update validation schema
const taskSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string().valid('user_story', 'engineering_task').required(),
  title: Joi.string().min(3).max(200).trim().required(),
  description: Joi.string().min(3).max(1000).trim().required(),
  priority: Joi.string().valid('high', 'medium', 'low').default('medium'),
  groupId: Joi.string().allow(null).default(null),
  order: Joi.number().integer().min(0).default(0),
});

// Group validation schema
const groupSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(1).max(100).trim().required(),
  color: Joi.string()
    .pattern(/^#[0-9A-Fa-f]{6}$/)
    .default('#3b82f6')
    .messages({
      'string.pattern.base': 'Color must be a valid hex code (e.g., #3b82f6)',
    }),
});

// Update specification validation schema
const updateSpecificationSchema = Joi.object({
  tasks: Joi.array().items(taskSchema).min(1),
  groups: Joi.array().items(groupSchema),
  risks: Joi.string().max(2000).allow(''),
  unknowns: Joi.string().max(2000).allow(''),
}).min(1);

// MongoDB ObjectId validation
const objectIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.pattern.base': 'Invalid specification ID format',
  });

module.exports = {
  specificationSchema,
  taskSchema,
  groupSchema,
  updateSpecificationSchema,
  objectIdSchema,
};
