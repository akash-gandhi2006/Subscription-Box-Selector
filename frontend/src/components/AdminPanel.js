import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: 'monthly',
    category: 'basic',
    features: [],
    dataLimit: { daily: 1, monthly: 30, unlimited: false },
    callFeatures: { unlimited: true, minutes: null, smsCount: 100 },
    entertainment: { netflix: false, amazonPrime: false, disneyHotstar: false, otherServices: [] },
    isPopular: false,
    isActive: true,
    maxUsers: 1,
    color: '#667eea'
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/subscriptions/plans');
      setPlans(response.data.plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      alert('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await axios.put(`/api/subscriptions/plans/${editingPlan.id}`, formData);
        alert('Plan updated successfully');
      } else {
        await axios.post('/api/subscriptions/plans', formData);
        alert('Plan created successfully');
      }
      setShowForm(false);
      setEditingPlan(null);
      resetForm();
      fetchPlans();
    } catch (error) {
      console.error('Error saving plan:', error);
      alert(error.response?.data?.message || 'Failed to save plan');
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      duration: plan.duration,
      category: plan.category,
      features: plan.features || [],
      dataLimit: plan.dataLimit || { daily: 1, monthly: 30, unlimited: false },
      callFeatures: plan.callFeatures || { unlimited: true, minutes: null, smsCount: 100 },
      entertainment: plan.entertainment || { netflix: false, amazonPrime: false, disneyHotstar: false, otherServices: [] },
      isPopular: plan.isPopular || false,
      isActive: plan.isActive !== undefined ? plan.isActive : true,
      maxUsers: plan.maxUsers || 1,
      color: plan.color || '#667eea'
    });
    setShowForm(true);
  };

  const handleDelete = async (planId) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) {
      return;
    }

    try {
      await axios.delete(`/api/subscriptions/plans/${planId}`);
      alert('Plan deleted successfully');
      fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
      alert(error.response?.data?.message || 'Failed to delete plan');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: 'monthly',
      category: 'basic',
      features: [],
      dataLimit: { daily: 1, monthly: 30, unlimited: false },
      callFeatures: { unlimited: true, minutes: null, smsCount: 100 },
      entertainment: { netflix: false, amazonPrime: false, disneyHotstar: false, otherServices: [] },
      isPopular: false,
      isActive: true,
      maxUsers: 1,
      color: '#667eea'
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { name: '', value: '', description: '', included: true }]
    });
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 p-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="loading mb-4"></div>
            <p className="text-white text-lg">Loading admin panel...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 p-5">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
              <p className="text-gray-600">Manage subscription plans and system settings</p>
            </div>
            <button 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30"
              onClick={() => {
                setEditingPlan(null);
                resetForm();
                setShowForm(true);
              }}
            >
              Add New Plan
            </button>
          </div>

          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscription Plans</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Price</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Popular</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">{plan.name}</td>
                    <td className="border border-gray-200 px-4 py-3">₹{plan.price}</td>
                    <td className="border border-gray-200 px-4 py-3">{plan.duration}</td>
                    <td className="border border-gray-200 px-4 py-3">{plan.category}</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        plan.isPopular ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {plan.isPopular ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex gap-2">
                        <button 
                          className="bg-blue-500 text-white py-1 px-3 rounded text-sm font-semibold transition-all duration-300 hover:bg-blue-600"
                          onClick={() => handleEdit(plan)}
                        >
                          Edit
                        </button>
                        <button 
                          className="bg-red-500 text-white py-1 px-3 rounded text-sm font-semibold transition-all duration-300 hover:bg-red-600"
                          onClick={() => handleDelete(plan.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">Plan Name:</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">Price (₹):</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 font-semibold mb-2">Description:</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">Duration:</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="block text-gray-700 font-semibold mb-2">Category:</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                    >
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="unlimited">Unlimited</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="mr-3"
                      />
                      <span className="text-gray-700 font-semibold">Active</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                        className="mr-3"
                      />
                      <span className="text-gray-700 font-semibold">Popular</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 font-semibold mb-2">Features:</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Feature name"
                        value={feature.name}
                        onChange={(e) => updateFeature(index, 'name', e.target.value)}
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={feature.value}
                        onChange={(e) => updateFeature(index, 'value', e.target.value)}
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={feature.description}
                        onChange={(e) => updateFeature(index, 'description', e.target.value)}
                        className="px-4 py-2 border-2 border-gray-200 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10"
                      />
                      <button
                        type="button"
                        className="bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-red-600"
                        onClick={() => removeFeature(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-green-600"
                    onClick={addFeature}
                  >
                    Add Feature
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30"
                  >
                    {editingPlan ? 'Update Plan' : 'Create Plan'}
                  </button>
                  <button 
                    type="button" 
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-400"
                    onClick={() => {
                      setShowForm(false);
                      setEditingPlan(null);
                      resetForm();
                    }}
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

export default AdminPanel; 