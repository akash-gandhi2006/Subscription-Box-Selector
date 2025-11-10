import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await axios.get('/api/auth/profile');
          setCurrentUser(response.data.user);
        } catch (error) {
          console.error('Failed to verify token:', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, []);
 const register = async (name, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to register.' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to log in.' };
    }
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };
const resetPassword = async (email) => {
    try {
        const response = await axios.post('/api/auth/forgot-password', { email });
        const { message } = response.data;
        return { success: true, message };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Could not send reset link.' };
    }
  };
  
  const updatePassword = async (token, password) => {
    try {
      const response = await axios.post(`/api/auth/reset-password/${token}`, { password });
      const { message } = response.data;
      return { success: true, message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to reset password.' };
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    register,
    login,
    logout,
    resetPassword,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
