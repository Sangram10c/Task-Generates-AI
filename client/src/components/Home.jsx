import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureForm from './FeatureForm';
import HistoryList from './HistoryList';
import { generateSpecification, getRecentSpecifications } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import { AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [recentSpecs, setRecentSpecs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    fetchRecentSpecs();
  }, []);

  const fetchRecentSpecs = async () => {
    try {
      setLoadingHistory(true);
      const response = await getRecentSpecifications();
      setRecentSpecs(response.data || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await generateSpecification(formData);
      setSuccess('Specification generated successfully!');
      
      // Navigate to the generated specification after a brief delay
      setTimeout(() => {
        navigate(`/specification/${response.data._id}`);
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.error || 
        err.response?.data?.errors?.join(', ') || 
        'Failed to generate specification. Please try again.'
      );
      setLoading(false);
    }
  };

  const handleViewSpec = (id) => {
    navigate(`/specification/${id}`);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <Sparkles className="hero-icon" size={48} />
            <h1 className="hero-title">Tasks Generator</h1>
            <p className="hero-subtitle">
              Transform your feature ideas into actionable user stories and engineering tasks
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Describe Your Feature</h3>
              <p>Fill in the goal, target users, and constraints</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>AI Generation</h3>
              <p>Our AI analyzes and creates user stories and tasks</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Edit & Organize</h3>
              <p>Customize, reorder, and group your tasks</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Export</h3>
              <p>Download as text or markdown format</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="home-content">
          {/* Form Section */}
          <section className="form-section">
            <h2 className="section-title">Create New Specification</h2>
            
            {error && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                <CheckCircle size={20} />
                <span>{success}</span>
              </div>
            )}

            {loading ? (
              <div className="loading-container">
                <LoadingSpinner size={40} text="Generating your specification..." />
                <p className="loading-subtext">This may take 10-20 seconds</p>
              </div>
            ) : (
              <FeatureForm onSubmit={handleSubmit} />
            )}
          </section>

          {/* History Section */}
          <section className="history-section">
            <h2 className="section-title">Recent Specifications</h2>
            {loadingHistory ? (
              <LoadingSpinner text="Loading history..." />
            ) : (
              <HistoryList 
                specifications={recentSpecs} 
                onViewSpec={handleViewSpec}
                onRefresh={fetchRecentSpecs}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;