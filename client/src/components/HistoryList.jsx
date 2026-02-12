import React from 'react';
import { Clock, FileText, RefreshCw } from 'lucide-react';

const HistoryList = ({ specifications, onViewSpec, onRefresh }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const getTemplateLabel = (template) => {
    const labels = {
      mobile: 'Mobile App',
      web: 'Web App',
      internal_tool: 'Internal Tool',
      custom: 'Custom',
    };
    return labels[template] || template;
  };

  if (!specifications || specifications.length === 0) {
    return (
      <div className="empty-state">
        <FileText size={48} />
        <h3>No specifications yet</h3>
        <p>Create your first specification to get started</p>
      </div>
    );
  }

  return (
    <div className="history-list">
      <div className="history-header">
        <span className="history-count">
          {specifications.length} {specifications.length === 1 ? 'specification' : 'specifications'}
        </span>
        <button onClick={onRefresh} className="btn-icon" title="Refresh">
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="history-items">
        {specifications.map((spec) => (
          <div
            key={spec._id}
            className="history-item"
            onClick={() => onViewSpec(spec._id)}
          >
            <div className="history-item-content">
              <h4 className="history-item-title">{spec.featureIdea.goal}</h4>
              <div className="history-item-meta">
                <span className="history-item-template">
                  {getTemplateLabel(spec.featureIdea.template)}
                </span>
                <span className="history-item-date">
                  <Clock size={14} />
                  {formatDate(spec.generatedAt || spec.createdAt)}
                </span>
              </div>
            </div>
            <div className="history-item-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;