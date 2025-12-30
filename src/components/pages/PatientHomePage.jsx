import React from 'react';
import { Activity, FileText, LogOut } from 'lucide-react';

export default PatientHomePage;

const PatientHomePage = ({ onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TB DetectCare</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Ready to start your TB screening test?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Start Test Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Quick TB Test</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Answer a few questions about your symptoms and upload your chest X-ray for AI-powered analysis.
            </p>
            <button
              onClick={() => onNavigate('symptom-test')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Start Test
            </button>
          </div>

          {/* Test History Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Test History</h2>
            </div>
            <p className="text-gray-600 mb-6">
              View your previous test results and track your health progress over time.
            </p>
            <button
              onClick={() => onNavigate('test-history')}
              className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              View History
            </button>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2">Early Detection</h3>
            <p className="text-sm text-gray-600">
              Early diagnosis of TB significantly improves treatment outcomes and reduces transmission risk.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-100">
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600">
              Our advanced machine learning model provides accurate preliminary screening results.
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">
              Your health data is encrypted and stored securely with strict privacy measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};