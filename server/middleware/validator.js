const logger = require('../config/logger');
const {
  specificationSchema,
  updateSpecificationSchema,
  objectIdSchema,
} = require('../utils/validationSchemas');

// Validate feature input for generation
const validateFeatureInput = (req, res, next) => {
  const { error, value } = specificationSchema.validate(req.body, {
    abortEarly: false, // Return all errors, not just the first
    stripUnknown: true, // Remove unknown fields
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));

    logger.warn('Feature input validation failed', {
      errors,
      body: req.body,
      ip: req.ip,
    });

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors,
    });
  }

  // Replace body with validated and sanitized data
  req.body = value;
  next();
};

// Validate specification ID parameter
const validateSpecificationId = (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params.id);

  if (error) {
    logger.warn('Invalid specification ID', {
      id: req.params.id,
      error: error.message,
      ip: req.ip,
    });

    return res.status(400).json({
      success: false,
      error: 'Invalid specification ID format',
    });
  }

  next();
};

// Validate update specification data
const validateUpdateSpecification = (req, res, next) => {
  const { error, value } = updateSpecificationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));

    logger.warn('Update specification validation failed', {
      errors,
      specId: req.params.id,
      ip: req.ip,
    });

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors,
    });
  }

  req.body = value;
  next();
};

module.exports = {
  validateFeatureInput,
  validateSpecificationId,
  validateUpdateSpecification,
};
