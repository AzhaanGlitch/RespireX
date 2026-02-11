import React, { useState } from 'react';
import { User, Stethoscope } from 'lucide-react';
import Navbar from '../common/Navbar';
import PatientSignup from './PatientSignup';
import DoctorSignup from './DoctorSignup';

const SignupPage = ({ onNavigate }) => {
  const [userType, setUserType] = useState(null);

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar 
          showBackButton={true}
          onBack={() => onNavigate('login')}
        />

        <div className="flex items-center justify-center min-h-screen px-4 pt-20 pb-12">
          <div className="max-w-5xl w-full">
            <div className="text-center mb-12 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl overflow-hidden">
                <img 
                  src="/respirex-logo.png" 
                  alt="RespireX Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(to bottom right, #2563eb, #1e40af)';
                  }}
                />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Create Account</h2>
              <p className="text-xl text-gray-600">Choose your account type to get started</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Patient Card */}
              <button
                onClick={() => setUserType('patient')}
                className="group bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-10 hover:border-blue-500 transition-all hover-lift text-left animate-fade-in stagger-1"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <User className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Patient</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Register for TB screening and get personalized healthcare recommendations
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Get Started</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Doctor Card */}
              <button
                onClick={() => setUserType('doctor')}
                className="group bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-10 hover:border-cyan-500 transition-all hover-lift text-left animate-fade-in stagger-2"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Stethoscope className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Doctor</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Access verified doctor dashboard to monitor and manage patient records
                </p>
                <div className="flex items-center text-cyan-600 font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Get Started</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="text-center mt-10 animate-fade-in stagger-3">
              <button
                onClick={() => onNavigate('login')}
                className="text-gray-600 hover:text-gray-900 text-lg"
              >
                Already have an account? <span className="text-blue-600 font-semibold">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'doctor') {
    return <DoctorSignup onNavigate={onNavigate} onBack={() => setUserType(null)} />;
  }

  return <PatientSignup onNavigate={onNavigate} onBack={() => setUserType(null)} />;
};

export default SignupPage;