import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: "📱",
      title: "Smart Plans",
      description: "Choose from a variety of data, voice, and entertainment plans tailored to your needs."
    },
    {
      icon: "⚡",
      title: "Instant Activation",
      description: "Get your plan activated instantly with our seamless digital process."
    },
    {
      icon: "🛡️",
      title: "Secure Payments",
      description: "Multiple secure payment options with bank-grade security protection."
    },
    {
      icon: "📊",
      title: "Usage Analytics",
      description: "Track your data usage, calls, and plan benefits in real-time."
    },
    {
      icon: "🎯",
      title: "Personalized Offers",
      description: "Get customized offers based on your usage patterns and preferences."
    },
    {
      icon: "🔄",
      title: "Easy Management",
      description: "Upgrade, downgrade, or cancel your subscription anytime, anywhere."
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "299",
      duration: "month",
      features: ["2GB Daily Data", "Unlimited Calls", "100 SMS/day", "Connectify Xstream"]
    },
    {
      name: "Premium",
      price: "599",
      duration: "month",
      isPopular: true,
      features: ["5GB Daily Data", "Unlimited Calls", "100 SMS/day", "Connectify Xstream", "Netflix Mobile"]
    },
    {
      name: "Ultimate",
      price: "799",
      duration: "month",
      features: ["10GB Daily Data", "Unlimited Calls", "100 SMS/day", "Connectify Xstream", "Netflix Premium", "Amazon Prime"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 p-5 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 animate-slide-up">
            Prime
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            Experience the future of mobile connectivity.
            Get unlimited data, calls, and entertainment in one seamless package.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white hover:text-primary-600 hover:scale-105"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link 
                to="/dashboard" 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Prime?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the features that make us the preferred choice for millions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:bg-gray-800 border border-gray-700/50 hover:border-primary-500/50"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview Section */}
      <section className="py-20 bg-gray-900/50 bg-pattern">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Popular Plans
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Choose the perfect plan that fits your lifestyle and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 text-center transition-all duration-300 border border-gray-700/50 ${plan.isPopular ? 'scale-105 border-primary-500 shadow-2xl shadow-primary-500/20' : 'hover:scale-105 hover:bg-gray-800'}`}
              >
                 {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-4 mt-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">₹{plan.price}</span>
                  <span className="text-white/60 text-lg">/{plan.duration}</span>
                </div>
                <ul className="text-white/80 space-y-3 mb-8 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={isAuthenticated ? "/plans" : "/register"} 
                  className={`w-full inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${plan.isPopular ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'bg-white/10 text-white hover:bg-white hover:text-primary-600'}`}
                >
                  {isAuthenticated ? "View All Plans" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">50M+</div>
              <div className="text-white/70">Active Users</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">99.9%</div>
              <div className="text-white/70">Network Uptime</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">24/7</div>
              <div className="text-white/70">Customer Support</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">100+</div>
              <div className="text-white/70">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900/50 bg-pattern">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Join millions of satisfied customers and experience the best of mobile connectivity.
          </p>
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50"
              >
                Create Account
              </Link>
              <Link 
                to="/login" 
                className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white hover:text-primary-600 hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link 
              to="/dashboard" 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50 inline-block"
            >
              Go to Your Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-white/60">
            © 2025 Prime. All rights reserved. | 
            <a href="#" className="text-white/80 hover:underline ml-2">Privacy Policy</a> | 
            <a href="#" className="text-white/80 hover:underline ml-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
