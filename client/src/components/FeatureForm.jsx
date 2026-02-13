// import React, { useState } from 'react';
// import { validateFeatureForm } from '../utils/validators';
// import { FileText, Users, AlertTriangle, Layout } from 'lucide-react';

// const TEMPLATES = [
//   { value: 'custom', label: 'Custom', description: 'General purpose application' },
//   { value: 'mobile', label: 'Mobile App', description: 'iOS/Android mobile application' },
//   { value: 'web', label: 'Web App', description: 'Web-based application' },
//   { value: 'internal_tool', label: 'Internal Tool', description: 'Internal productivity tool' },
// ];

// const FeatureForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     goal: '',
//     users: '',
//     constraints: '',
//     template: 'custom',
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: null,
//       }));
//     }
//   };

//   const handleBlur = (field) => {
//     setTouched((prev) => ({
//       ...prev,
//       [field]: true,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Mark all fields as touched
//     setTouched({
//       goal: true,
//       users: true,
//       constraints: true,
//     });

//     const validation = validateFeatureForm(formData);

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="feature-form">
//       {/* Template Selection */}
//       <div className="form-group">
//         <label htmlFor="template" className="form-label">
//           <Layout size={18} />
//           <span>Template Type</span>
//         </label>
//         <div className="template-grid">
//           {TEMPLATES.map((template) => (
//             <label
//               key={template.value}
//               className={`template-option ${
//                 formData.template === template.value ? 'selected' : ''
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="template"
//                 value={template.value}
//                 checked={formData.template === template.value}
//                 onChange={handleChange}
//               />
//               <div className="template-content">
//                 <span className="template-label">{template.label}</span>
//                 <span className="template-description">{template.description}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Goal */}
//       <div className="form-group">
//         <label htmlFor="goal" className="form-label">
//           <FileText size={18} />
//           <span>Feature Goal</span>
//           <span className="required">*</span>
//         </label>
//         <textarea
//           id="goal"
//           name="goal"
//           value={formData.goal}
//           onChange={handleChange}
//           onBlur={() => handleBlur('goal')}
//           className={`form-textarea ${errors.goal && touched.goal ? 'error' : ''}`}
//           placeholder="What is the main objective of this feature? What problem does it solve?"
//           rows="3"
//         />
//         {errors.goal && touched.goal && (
//           <span className="form-error">{errors.goal}</span>
//         )}
//         <span className="form-hint">
//           Minimum 10 characters. Be specific about what you want to achieve.
//         </span>
//       </div>

//       {/* Target Users */}
//       <div className="form-group">
//         <label htmlFor="users" className="form-label">
//           <Users size={18} />
//           <span>Target Users</span>
//           <span className="required">*</span>
//         </label>
//         <textarea
//           id="users"
//           name="users"
//           value={formData.users}
//           onChange={handleChange}
//           onBlur={() => handleBlur('users')}
//           className={`form-textarea ${errors.users && touched.users ? 'error' : ''}`}
//           placeholder="Who will use this feature? What are their needs and pain points?"
//           rows="3"
//         />
//         {errors.users && touched.users && (
//           <span className="form-error">{errors.users}</span>
//         )}
//         <span className="form-hint">
//           Minimum 5 characters. Describe your user personas.
//         </span>
//       </div>

//       {/* Constraints */}
//       <div className="form-group">
//         <label htmlFor="constraints" className="form-label">
//           <AlertTriangle size={18} />
//           <span>Constraints & Requirements</span>
//           <span className="required">*</span>
//         </label>
//         <textarea
//           id="constraints"
//           name="constraints"
//           value={formData.constraints}
//           onChange={handleChange}
//           onBlur={() => handleBlur('constraints')}
//           className={`form-textarea ${errors.constraints && touched.constraints ? 'error' : ''}`}
//           placeholder="Technical constraints, time limits, budget, platform requirements, etc."
//           rows="3"
//         />
//         {errors.constraints && touched.constraints && (
//           <span className="form-error">{errors.constraints}</span>
//         )}
//         <span className="form-hint">
//           Minimum 5 characters. Include technical, time, or budget constraints.
//         </span>
//       </div>

//       {/* Submit Button */}
//       <button type="submit" className="btn btn-primary btn-large">
//         Generate Specification
//       </button>
//     </form>
//   );
// };

// export default FeatureForm;

import React, { useState } from 'react';
import { validateFeatureForm } from '../utils/validators';
import { FileText, Users, AlertTriangle, Layout, Smartphone, Globe, Wrench, Sparkles } from 'lucide-react';

const TEMPLATES = [
  {
    value: 'custom',
    label: 'Custom',
    description: 'General purpose application',
    icon: <Sparkles className="w-5 h-5" />,
    color: 'from-slate-500 to-slate-600',
  },
  {
    value: 'mobile',
    label: 'Mobile App',
    description: 'iOS/Android mobile application',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    value: 'web',
    label: 'Web App',
    description: 'Web-based application',
    icon: <Globe className="w-5 h-5" />,
    color: 'from-purple-500 to-pink-600',
  },
  {
    value: 'internal_tool',
    label: 'Internal Tool',
    description: 'Internal productivity tool',
    icon: <Wrench className="w-5 h-5" />,
    color: 'from-green-500 to-emerald-600',
  },
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template Selection */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
          <Layout className="w-4 h-4" />
          <span>Template Type</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEMPLATES.map((template) => (
            <label
              key={template.value}
              className={`relative cursor-pointer group ${
                formData.template === template.value ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <input
                type="radio"
                name="template"
                value={template.value}
                checked={formData.template === template.value}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`glass rounded-xl p-4 transition-all duration-200 ${
                  formData.template === template.value
                    ? 'shadow-lg scale-105'
                    : 'hover:shadow-md hover:scale-102'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${template.color} text-white`}
                  >
                    {template.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800">{template.label}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{template.description}</p>
                  </div>
                  {formData.template === template.value && (
                    <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center animate-scale-in">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Goal */}
      <FormField
        id="goal"
        name="goal"
        label="Feature Goal"
        icon={<FileText className="w-4 h-4" />}
        value={formData.goal}
        onChange={handleChange}
        onBlur={() => handleBlur('goal')}
        error={errors.goal && touched.goal ? errors.goal : null}
        placeholder="What is the main objective of this feature? What problem does it solve?"
        required
        rows={3}
        hint="Minimum 10 characters. Be specific about what you want to achieve."
      />

      {/* Target Users */}
      <FormField
        id="users"
        name="users"
        label="Target Users"
        icon={<Users className="w-4 h-4" />}
        value={formData.users}
        onChange={handleChange}
        onBlur={() => handleBlur('users')}
        error={errors.users && touched.users ? errors.users : null}
        placeholder="Who will use this feature? What are their needs and pain points?"
        required
        rows={3}
        hint="Minimum 5 characters. Describe your user personas."
      />

      {/* Constraints */}
      <FormField
        id="constraints"
        name="constraints"
        label="Constraints & Requirements"
        icon={<AlertTriangle className="w-4 h-4" />}
        value={formData.constraints}
        onChange={handleChange}
        onBlur={() => handleBlur('constraints')}
        error={errors.constraints && touched.constraints ? errors.constraints : null}
        placeholder="Technical constraints, time limits, budget, platform requirements, etc."
        required
        rows={3}
        hint="Minimum 5 characters. Include technical, time, or budget constraints."
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <Sparkles className="w-5 h-5" />
        <span>Generate Specification</span>
      </button>
    </form>
  );
};

const FormField = ({
  id,
  name,
  label,
  icon,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required,
  rows,
  hint,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
      {icon}
      <span>{label}</span>
      {required && <span className="text-danger-500">*</span>}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      rows={rows}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        error
          ? 'border-danger-300 focus:border-danger-500 focus:ring-danger-200'
          : 'border-slate-200 focus:border-primary-500 focus:ring-primary-200'
      }`}
    />
    {error && (
      <p className="text-sm text-danger-600 flex items-center space-x-1 animate-slide-down">
        <AlertTriangle className="w-4 h-4" />
        <span>{error}</span>
      </p>
    )}
    {hint && !error && (
      <p className="text-xs text-slate-500">{hint}</p>
    )}
  </div>
);

export default FeatureForm;