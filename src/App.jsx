import React, { useState } from 'react';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import PatientHomePage from './components/pages/PatientHomePage';
import DoctorHomePage from './components/pages/DoctorHomePage';
import SymptomTestPage from './components/pages/SymptomTestPage';
import XRayUploadPage from './components/pages/XRayUploadPage';
import TestResultPage from './components/pages/TestResultPage';
import TestHistoryPage from './components/pages/TestHistoryPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLogout = () => {
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      case 'patient-home':
        return <PatientHomePage onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'doctor-home':
        return <DoctorHomePage onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'symptom-test':
        return <SymptomTestPage onNavigate={setCurrentPage} />;
      case 'xray-upload':
        return <XRayUploadPage onNavigate={setCurrentPage} />;
      case 'test-result':
        return <TestResultPage onNavigate={setCurrentPage} />;
      case 'test-history':
        return <TestHistoryPage onNavigate={setCurrentPage} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default App;