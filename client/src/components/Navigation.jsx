import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Activity, Sparkles, Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
              <div className="absolute inset-0 bg-primary-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Tasks Generator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              icon={<Home className="w-4 h-4" />}
              active={location.pathname === "/"}
            >
              Home
            </NavLink>
            <NavLink
              to="/status"
              icon={<Activity className="w-4 h-4" />}
              active={location.pathname === "/status"}
            >
              Status
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-2">
              <MobileNavLink
                to="/"
                icon={<Home className="w-5 h-5" />}
                active={location.pathname === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </MobileNavLink>
              <MobileNavLink
                to="/status"
                icon={<Activity className="w-5 h-5" />}
                active={location.pathname === "/status"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Status
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, active, children }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, active, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
        : "text-slate-600 hover:bg-slate-100"
    }`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default Navigation;
