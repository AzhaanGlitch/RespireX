import React, { useState, useEffect } from 'react';
import { Activity, Mail, Lock, Loader } from 'lucide-react';
import Navbar from '../common/Navbar';
import { supabase } from '../../lib/supabase';
import api from '../../lib/api';

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for OAuth callback
    const handleOAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("OAuth session detected:", session.user.email);
        // Let the auth state change handler in App.jsx handle the navigation
      }
    };
    
    handleOAuthCallback();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log("🔐 Attempting login with email:", email);
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("❌ Supabase auth error:", authError);
        throw authError;
      }
      
      if (!data.user) {
        throw new Error('No user data returned');
      }

      console.log("✅ Login successful, user:", data.user.email);
      
      // Wait a moment for the auth state change to propagate
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check role and navigate
      await checkRoleAndNavigate(data.user);

    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      console.log("🔐 Starting Google OAuth...");
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) {
        console.error("❌ Google OAuth error:", error);
        throw error;
      }
      
      console.log("✅ Google OAuth initiated");
      
    } catch (err) {
      console.error("❌ Google login error:", err);
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const checkRoleAndNavigate = async (user) => {
    let role = null;
    
    try {
      console.log("🔎 Fetching user profile...");
      const response = await api.get('/profile/');
      role = response.data.role;
      console.log("✅ Role from backend:", role);

      if (role === 'doctor') {
        onNavigate('doctor-home');
      } else {
        onNavigate('patient-home');
      }

    } catch (apiError) {
      // Logic: If profile is missing (404), force redirect to Signup Form
      if (apiError.response && apiError.response.status === 404) {
        console.log("⚠️ User logged in but has no profile. Redirecting to setup...");
        onNavigate('patient-signup'); // Force Profile Completion
        setLoading(false);
        return;
      }
      
      console.warn('⚠️ Backend profile fetch failed:', apiError.message);
      // Fallback
      role = user.user_metadata?.role || 'patient';
      
      if (role === 'doctor') {
        onNavigate('doctor-home');
      } else {
        onNavigate('patient-home');
      }
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/login-bg.jpg')" 
      }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      {/* Navbar */}
      <Navbar 
        showBackButton={true} 
        onBack={() => onNavigate('landing')} 
      />

      {/* Content Container - Added relative & z-10 to sit above the overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20 pb-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 text-sm text-center py-3 px-4 rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex justify-center items-center disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin w-5 h-5 mr-2" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-1.19-.58z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {loading ? 'Please wait...' : 'Sign in with Google'}
              </button>

              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <button 
                  onClick={() => onNavigate('signup')} 
                  disabled={loading}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline disabled:opacity-50"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;