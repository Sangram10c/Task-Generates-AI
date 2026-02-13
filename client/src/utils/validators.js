export const validateFeatureForm = (formData) => {
  const errors = {};

  if (!formData.goal || formData.goal.trim().length < 10) {
    errors.goal = "Goal must be at least 10 characters long";
  }

  if (!formData.users || formData.users.trim().length < 5) {
    errors.users = "Users description must be at least 5 characters long";
  }

  if (!formData.constraints || formData.constraints.trim().length < 5) {
    errors.constraints = "Constraints must be at least 5 characters long";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
