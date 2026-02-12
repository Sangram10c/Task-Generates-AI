import React, { useState } from 'react';
import { validateFeatureForm } from '../utils/validators';
import { FileText, Users, AlertTriangle, Layout } from 'lucide-react';

const TEMPLATES = [
  { value: 'custom', label: 'Custom', description: 'General purpose application' },
  { value: 'mobile', label: 'Mobile App', description: 'iOS/Android mobile application' },
  { value: 'web', label: 'Web App', description: 'Web-based application' },
  { value: 'internal_tool', label: 'Internal Tool', description: 'Internal productivity tool' },
];

const FeatureForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    goal: '',
    users: '',
    constraints: '',
    template: 'custom',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      goal: true,
      users: true,
      constraints: true,
    });

    const validation = validateFeatureForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="feature-form">
      {/* Template Selection */}
      <div className="form-group">
        <label htmlFor="template" className="form-label">
          <Layout size={18} />
          <span>Template Type</span>
        </label>
        <div className="template-grid">
          {TEMPLATES.map((template) => (
            <label
              key={template.value}
              className={`template-option ${
                formData.template === template.value ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name="template"
                value={template.value}
                checked={formData.template === template.value}
                onChange={handleChange}
              />
              <div className="template-content">
                <span className="template-label">{template.label}</span>
                <span className="template-description">{template.description}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="form-group">
        <label htmlFor="goal" className="form-label">
          <FileText size={18} />
          <span>Feature Goal</span>
          <span className="required">*</span>
        </label>
        <textarea
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          onBlur={() => handleBlur('goal')}
          className={`form-textarea ${errors.goal && touched.goal ? 'error' : ''}`}
          placeholder="What is the main objective of this feature? What problem does it solve?"
          rows="3"
        />
        {errors.goal && touched.goal && (
          <span className="form-error">{errors.goal}</span>
        )}
        <span className="form-hint">
          Minimum 10 characters. Be specific about what you want to achieve.
        </span>
      </div>

      {/* Target Users */}
      <div className="form-group">
        <label htmlFor="users" className="form-label">
          <Users size={18} />
          <span>Target Users</span>
          <span className="required">*</span>
        </label>
        <textarea
          id="users"
          name="users"
          value={formData.users}
          onChange={handleChange}
          onBlur={() => handleBlur('users')}
          className={`form-textarea ${errors.users && touched.users ? 'error' : ''}`}
          placeholder="Who will use this feature? What are their needs and pain points?"
          rows="3"
        />
        {errors.users && touched.users && (
          <span className="form-error">{errors.users}</span>
        )}
        <span className="form-hint">
          Minimum 5 characters. Describe your user personas.
        </span>
      </div>

      {/* Constraints */}
      <div className="form-group">
        <label htmlFor="constraints" className="form-label">
          <AlertTriangle size={18} />
          <span>Constraints & Requirements</span>
          <span className="required">*</span>
        </label>
        <textarea
          id="constraints"
          name="constraints"
          value={formData.constraints}
          onChange={handleChange}
          onBlur={() => handleBlur('constraints')}
          className={`form-textarea ${errors.constraints && touched.constraints ? 'error' : ''}`}
          placeholder="Technical constraints, time limits, budget, platform requirements, etc."
          rows="3"
        />
        {errors.constraints && touched.constraints && (
          <span className="form-error">{errors.constraints}</span>
        )}
        <span className="form-hint">
          Minimum 5 characters. Include technical, time, or budget constraints.
        </span>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary btn-large">
        Generate Specification
      </button>
    </form>
  );
};

export default FeatureForm;