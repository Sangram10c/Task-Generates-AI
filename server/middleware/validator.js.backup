const validateFeatureInput = (req, res, next) => {
  const { goal, users, constraints, template } = req.body;

  const errors = [];

  if (!goal || goal.trim().length < 10) {
    errors.push('Goal must be at least 10 characters long');
  }

  if (!users || users.trim().length < 5) {
    errors.push('Users description must be at least 5 characters long');
  }

  if (!constraints || constraints.trim().length < 5) {
    errors.push('Constraints must be at least 5 characters long');
  }

  if (template && !['mobile', 'web', 'internal_tool', 'custom'].includes(template)) {
    errors.push('Invalid template type');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = { validateFeatureInput };