import React, { useState } from 'react';
import { Activity, Mail, Lock, ArrowLeft } from 'lucide-react';

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('landing')}
        className="fixed top-8 left-8 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition animate-fade-in"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-10 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Activity className="w-9 h-9 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h2>
          <p className="text-gray-600 text-lg">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 animate-scale">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              onClick={() => onNavigate('patient-home')}
              className="w-full py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-semibold text-lg shadow-lg hover:shadow-xl btn-primary"
            >
              Sign In
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={() => onNavigate('signup')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;