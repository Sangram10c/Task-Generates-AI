import React, { useState, useEffect } from "react";
import { getSystemStatus } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Server,
  Database,
  Cpu,
  RefreshCw,
  Activity,
} from "lucide-react";

const StatusPage = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchStatus();
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
      setError("Failed to fetch system status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case "healthy":
      case "connected":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "degraded":
        return <AlertCircle className="w-8 h-8 text-amber-500" />;
      case "disconnected":
      case "error":
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return <AlertCircle className="w-8 h-8 text-slate-400" />;
    }
  };

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "healthy":
      case "connected":
        return "from-green-500 to-emerald-600";
      case "degraded":
        return "from-amber-500 to-orange-600";
      case "disconnected":
      case "error":
        return "from-red-500 to-red-600";
      default:
        return "from-slate-500 to-slate-600";
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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={48} text="Loading system status..." />
      </div>
    );
  }

  if (error && !status) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md animate-scale-in">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto" />
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Unable to Load Status
            </h2>
            <p className="text-slate-600">{error}</p>
          </div>
          <button
            onClick={fetchStatus}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 animate-slide-down">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              System Status
            </h1>
            <p className="text-slate-600">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="mt-4 sm:mt-0 p-3 rounded-xl glass hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            title="Refresh status"
          >
            <RefreshCw
              className={`w-5 h-5 text-primary-600 ${loading ? "animate-spin" : ""}`}
            />
          </button>
        </div>

        {/* Overall Status */}
        <div className="glass rounded-2xl p-8 mb-8 text-center animate-slide-up card-hover">
          <div className="flex justify-center mb-4">
            <div className="relative">
              {getStatusIcon(status?.overall)}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(
                  status?.overall,
                )} blur-2xl opacity-30 animate-pulse`}
              ></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">
            <span
              className={`bg-gradient-to-r ${getStatusColor(
                status?.overall,
              )} bg-clip-text text-transparent`}
            >
              {status?.overall?.toUpperCase() || "UNKNOWN"}
            </span>
          </h2>
          <p className="text-slate-600">All systems operational</p>
        </div>

        {/* Component Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
            icon={<Server className="w-6 h-6" />}
            title="Backend Server"
            status={status?.backend?.status}
            details={[
              {
                label: "Uptime",
                value: formatUptime(status?.backend?.uptime || 0),
              },
              {
                label: "Last Check",
                value: new Date(
                  status?.backend?.timestamp,
                ).toLocaleTimeString(),
              },
            ]}
            delay="animate-delay-100"
          />
          <StatusCard
            icon={<Database className="w-6 h-6" />}
            title="Database"
            status={status?.database?.status}
            details={[
              { label: "Host", value: status?.database?.host || "N/A" },
              {
                label: "State",
                value:
                  status?.database?.state === 1 ? "Connected" : "Disconnected",
              },
            ]}
            delay="animate-delay-200"
          />
          <StatusCard
            icon={<Cpu className="w-6 h-6" />}
            title="LLM Connection"
            status={status?.llm?.status}
            details={[
              { label: "Provider", value: status?.llm?.provider || "N/A" },
              {
                label: "Model",
                value: status?.llm?.model || "N/A",
                mono: true,
              },
            ]}
            error={status?.llm?.error}
            delay="animate-delay-300"
          />
        </div>

        {/* Status Legend */}
        <div className="glass rounded-2xl p-6 animate-slide-up animate-delay-400">
          <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary-600" />
            <span>Status Indicators</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <LegendItem
              icon={<CheckCircle className="w-5 h-5 text-green-500" />}
              label="Healthy / Connected"
            />
            <LegendItem
              icon={<AlertCircle className="w-5 h-5 text-amber-500" />}
              label="Degraded / Warning"
            />
            <LegendItem
              icon={<XCircle className="w-5 h-5 text-red-500" />}
              label="Error / Disconnected"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ icon, title, status, details, error, delay }) => {
  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "healthy":
      case "connected":
        return "from-green-500 to-emerald-600";
      case "degraded":
        return "from-amber-500 to-orange-600";
      case "disconnected":
      case "error":
        return "from-red-500 to-red-600";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue) {
      case "healthy":
      case "connected":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "degraded":
        return <AlertCircle className="w-6 h-6 text-amber-500" />;
      case "disconnected":
      case "error":
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <div
      className={`glass rounded-2xl p-6 animate-slide-up ${delay} card-hover`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
          {icon}
        </div>
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        {getStatusIcon(status)}
        <span
          className={`font-bold text-lg bg-gradient-to-r ${getStatusColor(
            status,
          )} bg-clip-text text-transparent`}
        >
          {status?.toUpperCase() || "UNKNOWN"}
        </span>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-200">
        {details?.map((detail, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">{detail.label}:</span>
            <span
              className={`text-slate-800 ${detail.mono ? "font-mono text-xs" : ""}`}
            >
              {detail.value}
            </span>
          </div>
        ))}
        {error && (
          <div className="mt-2 p-2 bg-red-50 rounded-lg">
            <p className="text-xs text-red-700 font-medium">Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LegendItem = ({ icon, label }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
    {icon}
    <span className="text-sm text-slate-700 font-medium">{label}</span>
  </div>
);

export default StatusPage;
