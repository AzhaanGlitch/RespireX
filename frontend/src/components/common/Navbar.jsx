import React, { useState } from 'react';

const Navbar = ({ onNavigate, onLogin, isLoggedIn, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* ─── Logo ─── */}
        <button onClick={() => onNavigate && onNavigate('home')} className="flex items-center gap-2">
          <img src="/respirex-logo.png" alt="RespireX" className="h-9 w-9 object-contain" />
          <span className="text-xl font-bold text-gray-800">
            Respire<span className="text-blue-600">X</span>
          </span>
        </button>

        {/* ─── Desktop Nav Links ─── */}
        <div className="hidden md:flex items-center gap-6">

          {isLoggedIn && (
            <>
              <button
                onClick={() => onNavigate && onNavigate('patient-home')}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate && onNavigate('xray-upload')}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                X-Ray Upload
              </button>
              <button
                onClick={() => onNavigate && onNavigate('symptom-test')}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Symptom Test
              </button>
              <button
                onClick={() => onNavigate && onNavigate('test-history')}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                History
              </button>
            </>
          )}
        </div>

        {/* ─── Desktop Action Buttons ─── */}
        <div className="hidden md:flex items-center gap-4">

          {!isLoggedIn ? (
            <>
              {/* Auth Buttons Group */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLogin ? onLogin() : (onNavigate && onNavigate('login'))}
                  className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors px-3 py-1.5"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('signup')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-1.5 rounded-lg transition-colors shadow-sm"
                >
                  Sign Up
                </button>
              </div>
              
              {/* Divider */}
              <div className="w-px h-6 bg-gray-200"></div>
              
              {/* Doctor Access Button */}
              <button
                onClick={() => onNavigate && onNavigate('doctor')}
                className="border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-lg transition-all"
              >
                Doctor Access
              </button>
            </>
          ) : (
            <>
              {/* Doctor Access Button */}
              <button
                onClick={() => onNavigate && onNavigate('doctor')}
                className="border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-lg transition-all"
              >
                Doctor Access
              </button>
              
              {/* Divider */}
              <div className="w-px h-6 bg-gray-200"></div>
              
              {/* Logout Button */}
              <button
                onClick={() => onLogout && onLogout()}
                className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors px-3 py-1.5"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* ─── Mobile hamburger ─── */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ─── Mobile Menu ─── */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-2">
          <button onClick={() => { onNavigate && onNavigate('home'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left py-2">
            Home
          </button>

          {isLoggedIn && (
            <>
              <div className="border-t border-gray-100 my-1"></div>
              <button onClick={() => { onNavigate && onNavigate('patient-home'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left py-2">Dashboard</button>
              <button onClick={() => { onNavigate && onNavigate('xray-upload'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left py-2">X-Ray Upload</button>
              <button onClick={() => { onNavigate && onNavigate('symptom-test'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left py-2">Symptom Test</button>
              <button onClick={() => { onNavigate && onNavigate('test-history'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left py-2">History</button>
            </>
          )}

          <div className="border-t border-gray-100 my-1"></div>
          
          <button onClick={() => { onNavigate && onNavigate('doctor'); setMenuOpen(false); }} className="text-sm text-blue-600 font-semibold text-left py-2 border border-blue-600 rounded-lg px-3 hover:bg-blue-50 transition-colors">
            Doctor Access
          </button>

          {!isLoggedIn && (
            <>
              <div className="border-t border-gray-100 my-1"></div>
              <button onClick={() => { onLogin ? onLogin() : (onNavigate && onNavigate('login')); setMenuOpen(false); }} className="text-sm text-gray-700 font-semibold text-left py-2">Login</button>
              <button onClick={() => { onNavigate && onNavigate('signup'); setMenuOpen(false); }} className="text-sm bg-blue-600 text-white font-semibold text-center py-2 rounded-lg hover:bg-blue-700 transition-colors">Sign Up</button>
            </>
          )}

          {isLoggedIn && (
            <>
              <div className="border-t border-gray-100 my-1"></div>
              <button onClick={() => { onLogout && onLogout(); setMenuOpen(false); }} className="text-sm text-red-600 font-semibold text-left py-2">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
