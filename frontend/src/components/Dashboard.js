import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || {}
  });

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/subscriptions/my-subscription');
      setSubscription(response.data.subscription);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setError('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    try {
      await axios.post('/api/subscriptions/cancel');
      alert('Subscription cancelled successfully');
      setSubscription(null);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert(error.response?.data?.message || 'Failed to cancel subscription');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/auth/profile', profileData);
      alert('Profile updated successfully');
      setShowProfileForm(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 p-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="loading mb-4"></div>
            <p className="text-white text-lg">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 p-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Welcome back, {user?.name}! 👋</h1>
          <p className="text-white/80 text-lg md:text-xl">Manage your subscription and account</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📱</div>
            <div className="text-white text-2xl font-bold">{subscription ? 'Active' : 'No Plan'}</div>
            <div className="text-white/60 text-sm">Status</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-white text-2xl font-bold">
              {subscription ? `₹${subscription.plan.price}` : '₹0'}
            </div>
            <div className="text-white/60 text-sm">Monthly Cost</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-white text-2xl font-bold">
              {subscription ? getDaysRemaining(subscription.endDate) : '0'}
            </div>
            <div className="text-white/60 text-sm">Days Remaining</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-white text-2xl font-bold">100%</div>
            <div className="text-white/60 text-sm">Network Coverage</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Information */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Account Information</h3>
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-800 font-semibold">{user?.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-800 font-semibold">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Phone:</span>
                <span className="text-gray-800 font-semibold">{user?.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">Member since:</span>
                <span className="text-gray-800 font-semibold">{formatDate(user?.createdAt)}</span>
              </div>
            </div>
            <button 
              className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30"
              onClick={() => setShowProfileForm(!showProfileForm)}
            >
              Edit Profile
            </button>
          </div>

          {/* Subscription Status */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Current Subscription</h3>
              <div className="text-2xl">📦</div>
            </div>
            {subscription ? (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{subscription.plan.name}</div>
                  <div className="text-xl text-gray-700 font-semibold">₹{subscription.plan.price}/{subscription.plan.duration}</div>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-gray-600 font-medium mr-3">Status:</span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                    subscription.status === 'expired' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {subscription.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span className="font-semibold">{formatDate(subscription.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>End Date:</span>
                    <span className="font-semibold">{formatDate(subscription.endDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days Remaining:</span>
                    <span className="font-semibold text-primary-600">{getDaysRemaining(subscription.endDate)} days</span>
                  </div>
                </div>
                {subscription.status === 'active' && (
                  <button 
                    className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30"
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-gray-600 mb-6 text-lg">No active subscription</p>
                <Link 
                  to="/plans" 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 inline-block"
                >
                  Browse Plans
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
              <div className="text-2xl">⚡</div>
            </div>
            <div className="space-y-4">
              <Link 
                to="/plans" 
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 flex items-center justify-center"
              >
                <span className="mr-2">📋</span>
                Browse Plans
              </Link>
        
             
              <button 
                className="w-full bg-red-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:bg-red-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center"
                onClick={logout}
              >
                <span className="mr-2">🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Profile Update Form */}
        {showProfileForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Update Profile</h3>
                <button 
                  onClick={() => setShowProfileForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="form-group">
                  <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-gray-700 font-semibold mb-2">Phone:</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="10-digit number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-400"
                    onClick={() => setShowProfileForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;