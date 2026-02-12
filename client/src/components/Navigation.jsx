import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, List } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">📋</span>
          Tasks Generator
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link
            to="/status"
            className={`nav-link ${location.pathname === '/status' ? 'active' : ''}`}
          >
            <Activity size={18} />
            <span>Status</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;