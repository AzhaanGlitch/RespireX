import React from 'react';
import { LogOut, ArrowLeft, X, User } from 'lucide-react';

const Navbar = ({ 
  isLoggedIn, 
  user, 
  onLogout, 
  onBack, 
  onCancel, 
  onLogin, 
  userType, 
  showBackButton, 
  showCancelButton,
  onNavigate // Ensure this is passed to handle logo click
}) => {
  const DOCTOR_DEFAULT_IMG = "/doctorpfp.jpg"; 
  const PATIENT_MALE_IMG = "/male.jpg";
  const PATIENT_FEMALE_IMG = "/female.jpg";
  const PATIENT_DEFAULT_IMG = "/male.jpg";

  // Helper: Get Display Name
  const getDisplayName = () => {
    if (userType === 'doctor') return 'Doctor';
    if (!user) return 'Guest';
    if (user.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  // Helper: Get Avatar URL
  const getAvatarUrl = () => {
    if (userType === 'doctor') return DOCTOR_DEFAULT_IMG;
    if (!user) return null;
    if (userType === 'patient') {
      const gender = user.user_metadata?.gender?.toLowerCase(); 
      if (gender === 'female') return PATIENT_FEMALE_IMG;
      if (gender === 'male') return PATIENT_MALE_IMG;
      return PATIENT_DEFAULT_IMG; 
    }
    return user.user_metadata?.avatar_url || null;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Now Clickable */}
          <div 
            onClick={() => onNavigate && onNavigate('landing')} 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
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

          {/* Buttons Section */}
          <div className="flex items-center space-x-4">
            
            {/* Back Button */}
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
            )}

            {/* Cancel Button */}
            {showCancelButton && onCancel && (
              <button
                onClick={onCancel}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
                <span className="font-medium">Cancel</span>
              </button>
            )}

            {/* --- AUTH BUTTONS SWITCH --- */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                
                {/* User Profile Section */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img 
                      src={getAvatarUrl()} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'; 
                        e.target.parentElement.innerHTML = '<svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                      }}
                    />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-bold text-gray-900 leading-none">
                      {getDisplayName()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 capitalize">
                      {userType || 'Member'}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition group"
                >
                  <LogOut className="w-5 h-5 group-hover:text-red-600" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              // Sign In Button 
              <button
                onClick={onLogin}
                className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition font-medium shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;