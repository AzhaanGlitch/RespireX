import React from 'react';
import { LogOut, ArrowLeft, X } from 'lucide-react';

const Navbar = ({ 
  onLogout, 
  onBack, 
  onCancel, 
  onLogin, 
  userType, 
  showBackButton, 
  showCancelButton, 
  showLoginButton 
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              RespireX
            </span>
            {userType && (
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                userType === 'doctor' 
                  ? 'bg-cyan-100 text-cyan-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {userType === 'doctor' ? 'Doctor' : 'Patient'}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
            )}

            {showCancelButton && onCancel && (
              <button
                onClick={onCancel}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
                <span className="font-medium">Cancel</span>
              </button>
            )}

            {showLoginButton && onLogin && (
              <button
                onClick={onLogin}
                className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition font-medium shadow-lg hover:shadow-xl btn-primary"
              >
                Sign In
              </button>
            )}

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;