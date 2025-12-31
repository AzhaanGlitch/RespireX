import React, { useState } from 'react';
import { Stethoscope, ArrowLeft, Shield, Key } from 'lucide-react';

const DoctorSignup = ({ onNavigate, onBack }) => {
  const [credentials, setCredentials] = useState({
    accessCode: '',
    licenseNumber: ''
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition animate-fade-in"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center mb-10 animate-fade-in stagger-1">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Stethoscope className="w-9 h-9 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Doctor Verification</h2>
          <p className="text-gray-600 text-lg">Enter your credentials to access doctor dashboard</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 animate-scale">
          {/* Warning Badge */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Verified Access Only</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Only verified healthcare professionals with valid credentials can access the doctor dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Access Code</label>
              <div className="relative">
                <Key className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
                <input
                  type="text"
                  value={credentials.accessCode}
                  onChange={(e) => setCredentials({...credentials, accessCode: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900"
                  placeholder="Enter developer-provided access code"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Medical License Number</label>
              <div className="relative">
                <Stethoscope className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
                <input
                  type="text"
                  value={credentials.licenseNumber}
                  onChange={(e) => setCredentials({...credentials, licenseNumber: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-gray-900"
                  placeholder="Enter your medical license number"
                />
              </div>
            </div>

            <button
              onClick={() => onNavigate('doctor-home')}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-xl hover:from-cyan-700 hover:to-cyan-800 transition font-semibold text-lg shadow-lg hover:shadow-xl btn-primary"
            >
              Verify & Continue
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Need help? Contact administrator for access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;