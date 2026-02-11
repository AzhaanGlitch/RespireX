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
        <div className="hidden md:flex items-center gap-3">

          {/* DIRECT DOCTOR ACCESS BUTTON */}
          <button
            onClick={() => onNavigate && onNavigate('doctor')}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Doctor Access
          </button>

          {!isLoggedIn && (
            <>
              <button
                onClick={() => onLogin ? onLogin() : (onNavigate && onNavigate('login'))}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate && onNavigate('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={() => onLogout && onLogout()}
              className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              Logout
            </button>
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
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3">
          <button onClick={() => { onNavigate && onNavigate('home'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left">
            Home
          </button>
          <button onClick={() => { onNavigate && onNavigate('doctor'); setMenuOpen(false); }} className="text-sm text-blue-600 font-semibold text-left">
            Doctor Access
          </button>

          {isLoggedIn && (
            <>
              <button onClick={() => { onNavigate && onNavigate('patient-home'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left">Dashboard</button>
              <button onClick={() => { onNavigate && onNavigate('xray-upload'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left">X-Ray Upload</button>
              <button onClick={() => { onNavigate && onNavigate('symptom-test'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left">Symptom Test</button>
              <button onClick={() => { onNavigate && onNavigate('test-history'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left">History</button>
              <button onClick={() => { onLogout && onLogout(); setMenuOpen(false); }} className="text-sm text-red-500 font-medium text-left">Logout</button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <button onClick={() => { onLogin ? onLogin() : (onNavigate && onNavigate('login')); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left">Login</button>
              <button onClick={() => { onNavigate && onNavigate('signup'); setMenuOpen(false); }} className="text-sm text-gray-700 font-medium text-left">Sign Up</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;