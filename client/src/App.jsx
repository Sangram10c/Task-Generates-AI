import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import TasksList from "./components/TasksList";
import StatusPage from "./components/StatusPage";
import { Github, Linkedin, Mail } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/specification/:id" element={<TasksList />} />
            <Route path="/status" element={<StatusPage />} />
          </Routes>
        </main>

        {/* Stylish Footer */}
        <footer className="relative mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Left side - Info */}
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold mb-1">Tasks Generator</p>
                <p className="text-xs text-slate-400">Built with Sangram</p>
                <p className="text-xs text-slate-500">
                  MERN Stack • Tailwind CSS
                </p>
              </div>

              {/* Center - Copyright */}
              <div className="text-center">
                <p className="text-xs text-slate-400">
                  © {new Date().getFullYear()} All rights reserved
                </p>
              </div>

              {/* Right side - Social Links */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/Sangram10c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-slate-700 transition-colors group"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/sangram-chougule-676143262/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-slate-700 transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                </a>

                <a
                  href="mailto:chougulesangram3@gmail.com"
                  className="p-2 rounded-lg hover:bg-slate-700 transition-colors group"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
