import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-black/10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center text-gray-800 font-bold text-xl transition-colors duration-300 hover:text-primary-500 no-underline">
            <span className="text-2xl mr-2">📱</span>
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Prime Subscription
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`font-semibold text-base transition-all duration-300 px-4 py-2 rounded-lg no-underline ${
                    isActive('/dashboard') 
                      ? 'text-primary-500 bg-primary-500/10' 
                      : 'text-gray-800 hover:text-primary-500 hover:bg-primary-500/10'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/plans" 
                  className={`font-semibold text-base transition-all duration-300 px-4 py-2 rounded-lg no-underline ${
                    isActive('/plans') 
                      ? 'text-primary-500 bg-primary-500/10' 
                      : 'text-gray-800 hover:text-primary-500 hover:bg-primary-500/10'
                  }`}
                >
                  Plans
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`font-semibold text-base transition-all duration-300 px-4 py-2 rounded-lg no-underline ${
                      isActive('/admin') 
                        ? 'text-primary-500 bg-primary-500/10' 
                        : 'text-gray-800 hover:text-primary-500 hover:bg-primary-500/10'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-gray-800 font-semibold text-sm hidden lg:block">
                      Welcome, {user?.name || 'User'}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white border-none px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`font-semibold text-base transition-all duration-300 px-4 py-2 rounded-lg no-underline ${
                    isActive('/login') 
                      ? 'text-primary-500 bg-primary-500/10' 
                      : 'text-gray-800 hover:text-primary-500 hover:bg-primary-500/10'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 no-underline font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {isAuthenticated ? (
              <div className="space-y-4">
                <Link 
                  to="/dashboard" 
                  className={`block font-semibold text-base transition-all duration-300 px-4 py-2 rounded-lg no-underline ${
                    isActive('/dashboard') 
                      ? 'text-primary-500 bg-primary-500/10' 
                      : 'text-gray-800 hover:text-primary-500 hover:bg-primary-500/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/plans" 
                  className={`block font-semibold text-base transition-all duration-300 px-4 py-2 rounded-lg no-underline ${
                    isActive('/plans') 
                      ? 'text-primary-500 bg-primary-500/10' 
                      : 'text-gray-800 hover:text-primary-500 hover:bg-primary-500/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Plans
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`block font-semibold text-base transition-all duration-300 px-4 py-2 rounded-lg no-underline ${
                      isActive('/admin') 
                        ? 'text-primary-500 bg-primary-500/10' 
                        : 'text-gray-800 hover:text-primary-500 hover:bg-primary-500/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-gray-800 font-semibold text-sm">
                    {user?.name || 'User'}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }} 
                  className="w-full bg-red-500 text-white border-none px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link 
                  to="/login" 
                  className={`block font-semibold text-base transition-all duration-300 px-4 py-2 rounded-lg no-underline ${
                    isActive('/login') 
                      ? 'text-primary-500 bg-primary-500/10' 
                      : 'text-gray-800 hover:text-primary-500 hover:bg-primary-500/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 no-underline font-semibold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 