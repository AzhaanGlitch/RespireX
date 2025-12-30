import React, { useState } from 'react';
import { Activity, User, Stethoscope } from 'lucide-react';
import PatientSignup from './PatientSignup';
import DoctorSignup from './DoctorSignup';

const SignupPage = ({ onNavigate }) => {
  const [userType, setUserType] = useState(null);

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Choose your account type</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setUserType('patient')}
              className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-8 hover:border-blue-500 transition group"
            >
              <User className="w-16 h-16 text-gray-400 group-hover:text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Patient</h3>
              <p className="text-gray-600">Register for TB screening and get personalized healthcare recommendations</p>
            </button>

            <button
              onClick={() => setUserType('doctor')}
              className="bg-white rounded-xl shadow-sm border-2 border-gray-200 p-8 hover:border-blue-500 transition group"
            >
              <Stethoscope className="w-16 h-16 text-gray-400 group-hover:text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Doctor</h3>
              <p className="text-gray-600">Access verified doctor dashboard to monitor and manage patient records</p>
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('login')}
              className="text-gray-600 hover:text-gray-900"
            >
              Already have an account? <span className="text-blue-600 font-medium">Sign In</span>
            </button>
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