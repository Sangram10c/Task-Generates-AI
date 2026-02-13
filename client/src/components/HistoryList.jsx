// import React from 'react';
// import { Clock, FileText, RefreshCw } from 'lucide-react';

// const HistoryList = ({ specifications, onViewSpec, onRefresh }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//     if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
//     return date.toLocaleDateString();
//   };

//   const getTemplateLabel = (template) => {
//     const labels = {
//       mobile: 'Mobile App',
//       web: 'Web App',
//       internal_tool: 'Internal Tool',
//       custom: 'Custom',
//     };
//     return labels[template] || template;
//   };

//   if (!specifications || specifications.length === 0) {
//     return (
//       <div className="empty-state">
//         <FileText size={48} />
//         <h3>No specifications yet</h3>
//         <p>Create your first specification to get started</p>
//       </div>
//     );
//   }

//   return (
//     <div className="history-list">
//       <div className="history-header">
//         <span className="history-count">
//           {specifications.length} {specifications.length === 1 ? 'specification' : 'specifications'}
//         </span>
//         <button onClick={onRefresh} className="btn-icon" title="Refresh">
//           <RefreshCw size={18} />
//         </button>
//       </div>

//       <div className="history-items">
//         {specifications.map((spec) => (
//           <div
//             key={spec._id}
//             className="history-item"
//             onClick={() => onViewSpec(spec._id)}
//           >
//             <div className="history-item-content">
//               <h4 className="history-item-title">{spec.featureIdea.goal}</h4>
//               <div className="history-item-meta">
//                 <span className="history-item-template">
//                   {getTemplateLabel(spec.featureIdea.template)}
//                 </span>
//                 <span className="history-item-date">
//                   <Clock size={14} />
//                   {formatDate(spec.generatedAt || spec.createdAt)}
//                 </span>
//               </div>
//             </div>
//             <div className="history-item-arrow">→</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HistoryList;

import React from 'react';
import { Clock, FileText, RefreshCw, Smartphone, Globe, Wrench, Sparkles } from 'lucide-react';

const HistoryList = ({ specifications, onViewSpec, onRefresh }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getTemplateIcon = (template) => {
    const icons = {
      mobile: <Smartphone className="w-4 h-4" />,
      web: <Globe className="w-4 h-4" />,
      internal_tool: <Wrench className="w-4 h-4" />,
      custom: <Sparkles className="w-4 h-4" />,
    };
    return icons[template] || icons.custom;
  };

  const getTemplateColor = (template) => {
    const colors = {
      mobile: 'from-blue-500 to-cyan-600',
      web: 'from-purple-500 to-pink-600',
      internal_tool: 'from-green-500 to-emerald-600',
      custom: 'from-slate-500 to-slate-600',
    };
    return colors[template] || colors.custom;
  };

  if (!specifications || specifications.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="relative inline-block">
          <FileText className="w-16 h-16 text-slate-300" />
          <div className="absolute inset-0 bg-slate-200 blur-2xl opacity-50"></div>
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No specifications yet</h3>
        <p className="text-sm text-slate-500">Create your first specification to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-600 font-medium">
          {specifications.length} {specifications.length === 1 ? 'specification' : 'specifications'}
        </span>
        <button
          onClick={onRefresh}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors group"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4 text-slate-600 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      <div className="space-y-3">
        {specifications.map((spec, index) => (
          <div
            key={spec._id}
            onClick={() => onViewSpec(spec._id)}
            className="group cursor-pointer glass rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${getTemplateColor(
                  spec.featureIdea.template
                )} text-white shadow-lg flex-shrink-0`}
              >
                {getTemplateIcon(spec.featureIdea.template)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-800 truncate group-hover:text-primary-600 transition-colors">
                  {spec.featureIdea.goal}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(spec.generatedAt || spec.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="text-slate-400 group-hover:text-primary-500 transition-colors transform group-hover:translate-x-1 duration-200">
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;