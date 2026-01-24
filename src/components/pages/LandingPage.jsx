import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import api from '../../lib/api'; 

const LandingPage = ({ onNavigate, user, onLogout }) => {
  // 🆕 Initialize as null to distinguish between "loading" and "0"
  const [totalTests, setTotalTests] = useState(null);

  useEffect(() => {
    // 🆕 Fetch stats independently of User Auth
    const fetchStats = async () => {
      try {
        console.log("📊 Fetching public stats...");
        // Ensure your backend allows this endpoint to be public!
        const response = await api.get('/stats/'); 
        const count = response.data.total_tests || 0;
        console.log("✅ Stats received:", count);
        setTotalTests(count);
      } catch (error) {
        console.warn("⚠️ Could not fetch stats (using default 0):", error.message);
        setTotalTests(0); 
      }
    };

    fetchStats();
  }, []);
  
  const handleGetStarted = () => {
    if (user) {
      onNavigate('patient-home');
    } else {
      onNavigate('signup');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      <Navbar 
        onLogin={() => onNavigate('login')}
        onNavigate={onNavigate} 
        isLoggedIn={!!user}     
        user={user}             
        onLogout={onLogout}     
      />

      {/* Hero Section */}
      <div 
        className="relative pt-48 pb-20 px-6 lg:px-8 text-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/landing_page_bg.jpg')" 
        }}
      >
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-8 animate-fade-in">
            <span className="text-sm font-semibold text-blue-600">AI-Powered Healthcare</span>
          </div>
          
          <h1 className="font-bold text-gray-900 mb-8 leading-tight animate-fade-in stagger-1">
            <span className="text-4xl lg:text-5xl block text-gray-700 mb-2">Early Detection</span>
            <span className="block text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent my-4">
              TUBERCULOSIS
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in stagger-2">
            Advanced machine learning for quick, accurate tuberculosis screening. 
            Making healthcare accessible for everyone.
          </p>

          <div className="flex justify-center animate-fade-in stagger-3">
            <button
              onClick={handleGetStarted}
              className="group px-10 py-5 bg-gray-900 text-white text-lg rounded-full hover:bg-gray-800 transition shadow-2xl hover:shadow-3xl flex items-center space-x-3 btn-primary"
            >
              <span className="font-medium">Get Started</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1">
              <div className="mb-10 animate-fade-in">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose RespireX</h2>
                <p className="text-xl text-gray-600">Advanced technology meets healthcare accessibility</p>
              </div>

              <div className="space-y-6">
                {[
                  { 
                    icon: Zap, 
                    title: "AI-Powered Analysis", 
                    desc: "Advanced machine learning algorithms for accurate tuberculosis detection", 
                    gradient: "from-blue-500 to-blue-600" 
                  },
                  { 
                    icon: TrendingUp, 
                    title: "Quick Screening", 
                    desc: "Get preliminary results within minutes with simple symptom assessment", 
                    gradient: "from-cyan-500 to-cyan-600" 
                  },
                  { 
                    icon: Shield, 
                    title: "Secure & Private", 
                    desc: "Your health data encrypted and protected with strict privacy measures", 
                    gradient: "from-indigo-500 to-indigo-600" 
                  }
                ].map((feature, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-slate-50 p-6 rounded-2xl border border-gray-100 hover-lift animate-fade-in stagger-${idx + 1} shadow-sm hover:shadow-md transition-all duration-300 flex items-start space-x-4`}
                  >
                    <div className={`shrink-0 w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative animate-fade-in stagger-4">
              <div className="relative z-10">
                <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/landing_page_tb.png"
                    alt="TB Detection Interface" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-3xl opacity-10 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-600 rounded-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section - Updated */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            
            {/* 1. Tests Completed (Real Data) */}
            <div className="animate-fade-in stagger-1">
              {/* Display Logic: If > 0, show number. If 0 or null, show message. */}
              <div className={`font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2 ${
                totalTests > 0 ? 'text-5xl' : 'text-3xl lg:text-4xl'
              }`}>
                {totalTests > 0 ? `${totalTests}+` : "Start Screening"}
              </div>
              <div className="text-gray-600 font-medium">Tests Completed</div>
            </div>

            {/* 2. Static Stats */}
            <div className="animate-fade-in stagger-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-gray-600 font-medium">Accuracy Rate</div>
            </div>

            <div className="animate-fade-in stagger-3">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Available Support</div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in stagger-1">
            Join thousands using RespireX for TB screening
          </p>
          <button
            onClick={handleGetStarted}
            className="px-10 py-5 bg-white text-gray-900 text-lg rounded-full hover:bg-gray-100 transition shadow-2xl font-semibold btn-primary animate-fade-in stagger-2"
          >
            Start Your Test
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;