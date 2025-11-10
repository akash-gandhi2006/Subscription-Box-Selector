import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SubscriptionPlans from './components/SubscriptionPlans';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-500 to-secondary-500">
          <Navbar />
          <Routes>
<Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/plans" 
              element={
                <PrivateRoute>
                  <SubscriptionPlans />
                </PrivateRoute>
              } 
            />
 <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
