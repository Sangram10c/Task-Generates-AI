import React, { useState, useEffect } from 'react';
import { getSystemStatus } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Server, 
  Database, 
  Cpu,
  RefreshCw 
} from 'lucide-react';

const StatusPage = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchStatus();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSystemStatus();
      setStatus(response);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch system status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case 'healthy':
      case 'connected':
        return <CheckCircle className="status-icon status-healthy" size={24} />;
      case 'degraded':
        return <AlertCircle className="status-icon status-degraded" size={24} />;
      case 'disconnected':
      case 'error':
        return <XCircle className="status-icon status-error" size={24} />;
      default:
        return <AlertCircle className="status-icon status-unknown" size={24} />;
    }
  };

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };

  if (loading && !status) {
    return (
      <div className="status-page">
        <div className="status-container">
          <LoadingSpinner text="Loading system status..." />
        </div>
      </div>
    );
  }

  if (error && !status) {
    return (
      <div className="status-page">
        <div className="status-container">
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
          <button onClick={fetchStatus} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="status-page">
      <div className="status-container">
        <div className="status-header">
          <h1 className="status-title">System Status</h1>
          <button 
            onClick={fetchStatus} 
            className="btn-icon"
            disabled={loading}
            title="Refresh status"
          >
            <RefreshCw size={20} className={loading ? 'spinning' : ''} />
          </button>
        </div>

        <div className="status-updated">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>

        {/* Overall Status */}
        <div className="status-card status-card-main">
          <div className="status-card-header">
            {getStatusIcon(status?.overall)}
            <h2>Overall System</h2>
          </div>
          <div className="status-value">
            {status?.overall?.toUpperCase() || 'UNKNOWN'}
          </div>
        </div>

        {/* Individual Components */}
        <div className="status-grid">
          {/* Backend Status */}
          <div className="status-card">
            <div className="status-card-header">
              <Server size={20} />
              <h3>Backend Server</h3>
            </div>
            {status?.backend && (
              <>
                <div className="status-card-body">
                  {getStatusIcon(status.backend.status)}
                  <span className="status-label">
                    {status.backend.status?.toUpperCase()}
                  </span>
                </div>
                <div className="status-details">
                  <div className="status-detail">
                    <span className="detail-label">Uptime:</span>
                    <span className="detail-value">
                      {formatUptime(status.backend.uptime)}
                    </span>
                  </div>
                  <div className="status-detail">
                    <span className="detail-label">Last Check:</span>
                    <span className="detail-value">
                      {new Date(status.backend.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Database Status */}
          <div className="status-card">
            <div className="status-card-header">
              <Database size={20} />
              <h3>Database</h3>
            </div>
            {status?.database && (
              <>
                <div className="status-card-body">
                  {getStatusIcon(status.database.status)}
                  <span className="status-label">
                    {status.database.status?.toUpperCase()}
                  </span>
                </div>
                <div className="status-details">
                  <div className="status-detail">
                    <span className="detail-label">Host:</span>
                    <span className="detail-value">
                      {status.database.host || 'N/A'}
                    </span>
                  </div>
                  <div className="status-detail">
                    <span className="detail-label">State:</span>
                    <span className="detail-value">
                      {status.database.state === 1 ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* LLM Status */}
          <div className="status-card">
            <div className="status-card-header">
              <Cpu size={20} />
              <h3>LLM Connection</h3>
            </div>
            {status?.llm && (
              <>
                <div className="status-card-body">
                  {getStatusIcon(status.llm.status)}
                  <span className="status-label">
                    {status.llm.status?.toUpperCase()}
                  </span>
                </div>
                <div className="status-details">
                  <div className="status-detail">
                    <span className="detail-label">Provider:</span>
                    <span className="detail-value">{status.llm.provider}</span>
                  </div>
                  <div className="status-detail">
                    <span className="detail-label">Model:</span>
                    <span className="detail-value model-name">
                      {status.llm.model}
                    </span>
                  </div>
                  {status.llm.error && (
                    <div className="status-detail status-error">
                      <span className="detail-label">Error:</span>
                      <span className="detail-value">{status.llm.error}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status Legend */}
        <div className="status-legend">
          <h3>Status Indicators</h3>
          <div className="legend-items">
            <div className="legend-item">
              <CheckCircle className="status-icon status-healthy" size={18} />
              <span>Healthy / Connected</span>
            </div>
            <div className="legend-item">
              <AlertCircle className="status-icon status-degraded" size={18} />
              <span>Degraded / Warning</span>
            </div>
            <div className="legend-item">
              <XCircle className="status-icon status-error" size={18} />
              <span>Error / Disconnected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;