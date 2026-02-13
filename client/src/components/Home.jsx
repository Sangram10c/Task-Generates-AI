// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import FeatureForm from './FeatureForm';
// import HistoryList from './HistoryList';
// import { generateSpecification, getRecentSpecifications } from '../services/api';
// import LoadingSpinner from './LoadingSpinner';
// import { AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

// const Home = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [recentSpecs, setRecentSpecs] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(true);

//   useEffect(() => {
//     fetchRecentSpecs();
//   }, []);

//   const fetchRecentSpecs = async () => {
//     try {
//       setLoadingHistory(true);
//       const response = await getRecentSpecifications();
//       setRecentSpecs(response.data || []);
//     } catch (err) {
//       console.error('Failed to fetch history:', err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   const handleSubmit = async (formData) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await generateSpecification(formData);
//       setSuccess('Specification generated successfully!');
      
//       // Navigate to the generated specification after a brief delay
//       setTimeout(() => {
//         navigate(`/specification/${response.data._id}`);
//       }, 1000);
//     } catch (err) {
//       setError(
//         err.response?.data?.error || 
//         err.response?.data?.errors?.join(', ') || 
//         'Failed to generate specification. Please try again.'
//       );
//       setLoading(false);
//     }
//   };

//   const handleViewSpec = (id) => {
//     navigate(`/specification/${id}`);
//   };

//   return (
//     <div className="home-page">
//       <div className="home-container">
//         {/* Hero Section */}
//         <section className="hero-section">
//           <div className="hero-content">
//             <Sparkles className="hero-icon" size={48} />
//             <h1 className="hero-title">Tasks Generator</h1>
//             <p className="hero-subtitle">
//               Transform your feature ideas into actionable user stories and engineering tasks
//             </p>
//           </div>
//         </section>

//         {/* How It Works */}
//         <section className="how-it-works">
//           <h2 className="section-title">How It Works</h2>
//           <div className="steps-grid">
//             <div className="step-card">
//               <div className="step-number">1</div>
//               <h3>Describe Your Feature</h3>
//               <p>Fill in the goal, target users, and constraints</p>
//             </div>
//             <div className="step-card">
//               <div className="step-number">2</div>
//               <h3>AI Generation</h3>
//               <p>Our AI analyzes and creates user stories and tasks</p>
//             </div>
//             <div className="step-card">
//               <div className="step-number">3</div>
//               <h3>Edit & Organize</h3>
//               <p>Customize, reorder, and group your tasks</p>
//             </div>
//             <div className="step-card">
//               <div className="step-number">4</div>
//               <h3>Export</h3>
//               <p>Download as text or markdown format</p>
//             </div>
//           </div>
//         </section>

//         {/* Main Content */}
//         <div className="home-content">
//           {/* Form Section */}
//           <section className="form-section">
//             <h2 className="section-title">Create New Specification</h2>
            
//             {error && (
//               <div className="alert alert-error">
//                 <AlertCircle size={20} />
//                 <span>{error}</span>
//               </div>
//             )}

//             {success && (
//               <div className="alert alert-success">
//                 <CheckCircle size={20} />
//                 <span>{success}</span>
//               </div>
//             )}

//             {loading ? (
//               <div className="loading-container">
//                 <LoadingSpinner size={40} text="Generating your specification..." />
//                 <p className="loading-subtext">This may take 10-20 seconds</p>
//               </div>
//             ) : (
//               <FeatureForm onSubmit={handleSubmit} />
//             )}
//           </section>

//           {/* History Section */}
//           <section className="history-section">
//             <h2 className="section-title">Recent Specifications</h2>
//             {loadingHistory ? (
//               <LoadingSpinner text="Loading history..." />
//             ) : (
//               <HistoryList 
//                 specifications={recentSpecs} 
//                 onViewSpec={handleViewSpec}
//                 onRefresh={fetchRecentSpecs}
//               />
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureForm from './FeatureForm';
import HistoryList from './HistoryList';
import { generateSpecification, getRecentSpecifications } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import { AlertCircle, CheckCircle, Sparkles, Zap, Target, Users, Rocket } from 'lucide-react';

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
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 animate-fade-in">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 blur-3xl opacity-30 animate-pulse-slow"></div>
                <Sparkles className="relative w-16 h-16 sm:w-20 sm:h-20 text-primary-600 animate-bounce-in" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="gradient-text">Tasks Generator</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Transform your feature ideas into actionable user stories and engineering tasks
              with the power of AI
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 animate-slide-up">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard
              number="1"
              icon={<Target className="w-6 h-6" />}
              title="Describe Your Feature"
              description="Fill in the goal, target users, and constraints"
              delay="animate-delay-100"
            />
            <StepCard
              number="2"
              icon={<Zap className="w-6 h-6" />}
              title="AI Generation"
              description="Our AI analyzes and creates user stories and tasks"
              delay="animate-delay-200"
            />
            <StepCard
              number="3"
              icon={<Users className="w-6 h-6" />}
              title="Edit & Organize"
              description="Customize, reorder, and group your tasks"
              delay="animate-delay-300"
            />
            <StepCard
              number="4"
              icon={<Rocket className="w-6 h-6" />}
              title="Export"
              description="Download as text or markdown format"
              delay="animate-delay-400"
            />
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <section className="lg:col-span-2 animate-slide-up">
            <div className="glass rounded-2xl p-6 sm:p-8 card-hover">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-primary-600" />
                <span>Create New Specification</span>
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-xl flex items-start space-x-3 animate-scale-in">
                  <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
                  <span className="text-danger-800 text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-xl flex items-start space-x-3 animate-scale-in">
                  <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                  <span className="text-success-800 text-sm">{success}</span>
                </div>
              )}

              {loading ? (
                <div className="py-12">
                  <LoadingSpinner size={48} text="Generating your specification..." />
                  <p className="text-center text-slate-500 text-sm mt-4">
                    This may take 10-20 seconds
                  </p>
                </div>
              ) : (
                <FeatureForm onSubmit={handleSubmit} />
              )}
            </div>
          </section>

          {/* History Section */}
          <section className="animate-slide-up animate-delay-200">
            <div className="glass rounded-2xl p-6 card-hover sticky top-24">
              <h2 className="text-xl font-bold mb-6">Recent Specifications</h2>
              {loadingHistory ? (
                <LoadingSpinner text="Loading history..." />
              ) : (
                <HistoryList
                  specifications={recentSpecs}
                  onViewSpec={handleViewSpec}
                  onRefresh={fetchRecentSpecs}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ number, icon, title, description, delay }) => (
  <div className={`glass rounded-xl p-6 text-center card-hover animate-slide-up ${delay}`}>
    <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4 shadow-lg">
      <span className="text-2xl font-bold text-white">{number}</span>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 blur-xl opacity-40 rounded-2xl"></div>
    </div>
    <div className="flex justify-center mb-3 text-primary-600">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-slate-800">{title}</h3>
    <p className="text-sm text-slate-600">{description}</p>
  </div>
);

export default Home;