import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import PatientSignup from './components/pages/PatientSignup';
import DoctorSignup from './components/pages/DoctorSignup';
import PatientHomePage from './components/pages/PatientHomePage';
import DoctorHomePage from './components/pages/DoctorHomePage';
import XRayUploadPage from './components/pages/XRayUploadPage';
import SymptomTestPage from './components/pages/SymptomTestPage';
import TestResultPage from './components/pages/TestResultPage';
import TestHistoryPage from './components/pages/TestHistoryPage';

const AppRoutes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const routeMap = {
    'login': '/login',
    'signup': '/signup',
    'patient-signup': '/signup/patient',
    'doctor-signup': '/signup/doctor',
    'patient-home': '/patient',
    'doctor-home': '/doctor',
    'doctor': '/doctor',
    'xray-upload': '/patient/upload',
    'symptom-test': '/patient/symptom-test',
    'test-result': '/patient/result',
    'test-history': '/patient/history',
    'home': '/',
    'landing': '/',
  };

  const onNavigate = (pageName) => {
    const path = routeMap[pageName];
    if (path) {
      navigate(path);
    } else {
      console.warn('Unknown page:', pageName);
    }
  };

  const onLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <Routes>
      {/* PUBLIC PAGES */}
      <Route path="/" element={<LandingPage onNavigate={onNavigate} user={user} onLogout={onLogout} />} />
      <Route path="/login" element={<LoginPage onNavigate={onNavigate} setUser={setUser} />} />
      <Route path="/signup" element={<SignupPage onNavigate={onNavigate} />} />
      <Route path="/signup/patient" element={<PatientSignup onNavigate={onNavigate} />} />
      <Route path="/signup/doctor" element={<DoctorSignup onNavigate={onNavigate} onBack={() => navigate('/signup')} />} />

      {/* PATIENT PAGES (require login) */}
      <Route path="/patient" element={<PatientHomePage onNavigate={onNavigate} user={user} onLogout={onLogout} />} />
      <Route path="/patient/upload" element={<XRayUploadPage onNavigate={onNavigate} user={user} />} />
      <Route path="/patient/symptom-test" element={<SymptomTestPage onNavigate={onNavigate} user={user} />} />
      <Route path="/patient/result" element={<TestResultPage onNavigate={onNavigate} user={user} />} />
      <Route path="/patient/history" element={<TestHistoryPage onNavigate={onNavigate} />} />

      {/* DOCTOR PAGE - DIRECT ACCESS (NO LOGIN REQUIRED) */}
      <Route path="/doctor" element={<DoctorHomePage onNavigate={onNavigate} />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;