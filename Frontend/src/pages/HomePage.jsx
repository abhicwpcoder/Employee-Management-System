import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowRight, FiUsers, FiBarChart2, FiLock, FiClock, 
  FiCheckCircle, FiStar, FiTrendingUp, FiShield, FiAward,
  FiCode, FiZap, FiCloud, FiHeart
} from 'react-icons/fi';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: FiUsers, title: 'Employee Management', description: 'Manage employee information, departments, and roles efficiently', color: 'from-blue-500 to-cyan-500' },
    { icon: FiBarChart2, title: 'Analytics Dashboard', description: 'View detailed analytics and statistics about your workforce', color: 'from-purple-500 to-pink-500' },
    { icon: FiLock, title: 'Secure Access', description: 'Role-based access control with JWT authentication', color: 'from-green-500 to-emerald-500' },
    { icon: FiClock, title: 'Activity Tracking', description: 'Track employee activity and maintain audit logs', color: 'from-orange-500 to-red-500' },
    { icon: FiCheckCircle, title: 'Easy Onboarding', description: 'Quick and simple employee registration and setup', color: 'from-teal-500 to-cyan-500' },
    { icon: FiTrendingUp, title: 'Performance Metrics', description: 'Track and measure employee performance KPIs', color: 'from-indigo-500 to-purple-500' },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: FiUsers },
    { number: '99.9%', label: 'Uptime', icon: FiCloud },
    { number: '24/7', label: 'Support', icon: FiHeart },
    { number: '500+', label: 'Companies', icon: FiAward },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fadeInUp">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-sm mb-6">
              <FiZap className="mr-2" /> Next Generation HR Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Manage Your Workforce
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                with Excellence
              </span>
            </h1>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              A comprehensive Employee Management System designed to streamline HR operations, 
              improve productivity, and enhance team collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="group px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Started Free
                <FiArrowRight className="group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="relative bottom-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 80C384 85.3 480 74.7 576 69.3C672 64 768 64 864 69.3C960 74.7 1056 85.3 1152 80C1248 74.7 1344 53.3 1392 42.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Modern Teams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your employees efficiently and effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center text-white">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-indigo-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your HR Management?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of companies already using our system to streamline their workforce management
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            Start Your Free Trial <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;