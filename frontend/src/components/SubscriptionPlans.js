import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentModal from './PaymentModal';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribing, setSubscribing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
      setError('Failed to load subscription plans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      alert('Please select a plan first!');
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      setSubscribing(true);
      const response = await axios.post('/api/subscriptions/subscribe', {
        planId: selectedPlan.id
      });
      
      alert(`Successfully subscribed to ${selectedPlan.name}!`);
      setSelectedPlan(null);
      setShowPaymentModal(false);
      fetchPlans();
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      const message = error.response?.data?.message || 'Failed to subscribe. Please try again.';
      alert(message);
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 p-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="loading mb-4"></div>
            <p className="text-white text-lg">Loading subscription plans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 p-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-white text-lg mb-4">{error}</p>
            <button 
              onClick={fetchPlans} 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 p-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Choose Your Perfect Plan</h1>
          <p className="text-white/80 text-lg md:text-xl">Select the plan that best fits your needs and lifestyle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                selectedPlan?.id === plan.id ? 'ring-4 ring-primary-500 scale-105 bg-white' : ''
              } ${plan.isPopular ? 'border-2 border-yellow-400' : ''}`}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-600">₹{plan.price}</span>
                  <span className="text-gray-600 text-lg">/{plan.duration}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">✨</span>
                  What's included:
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-0.5 text-lg">✓</span>
                      <span className="text-gray-700">
                        {feature.name}
                        {feature.value && <span className="text-gray-500">: {feature.value}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  selectedPlan?.id === plan.id 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan);
                }}
              >
                {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-3">🎉</span>
              <h3 className="text-2xl font-bold text-gray-800">Selected Plan: {selectedPlan.name}</h3>
            </div>
            <p className="text-gray-600 mb-6 text-lg">Price: ₹{selectedPlan.price} /{selectedPlan.duration}</p>
            <button 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 px-8 rounded-xl text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mx-auto"
              onClick={handleSubscribe}
              disabled={subscribing}
            >
              {subscribing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  <span className="mr-2">💳</span>
                  Subscribe Now
                </>
              )}
            </button>
          </div>
        )}

        {showPaymentModal && (
          <PaymentModal
            plan={selectedPlan}
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlans;