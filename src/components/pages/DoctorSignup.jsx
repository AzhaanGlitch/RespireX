import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';

const DoctorSignup = ({ onNavigate, onBack }) => {
  const [credentials, setCredentials] = useState({
    accessCode: '',
    licenseNumber: ''
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center"
        >
          ← Back
        </button>

        <div className="text-center mb-8">
          <Stethoscope className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Doctor Verification</h2>
          <p className="text-gray-600 mt-2">Enter your credentials to access doctor dashboard</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Only verified healthcare professionals with valid credentials can access the doctor dashboard.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Access Code</label>
              <input
                type="text"
                value={credentials.accessCode}
                onChange={(e) => setCredentials({...credentials, accessCode: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter developer-provided access code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical License Number</label>
              <input
                type="text"
                value={credentials.licenseNumber}
                onChange={(e) => setCredentials({...credentials, licenseNumber: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your medical license number"
              />
            </div>

            <button
              onClick={() => onNavigate('doctor-home')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Verify & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;