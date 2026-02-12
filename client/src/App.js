import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import TasksList from './components/TasksList';
import StatusPage from './components/StatusPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/specification/:id" element={<TasksList />} />
            <Route path="/status" element={<StatusPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2024 Tasks Generator. Built with MERN Stack.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;