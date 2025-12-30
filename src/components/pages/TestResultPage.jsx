import React from 'react';
import { Activity, CheckCircle, AlertCircle } from 'lucide-react';

const TestResultPage = ({ onNavigate }) => {
  const result = {
    detected: false,
    confidence: 92,
    riskLevel: "Low"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">RespireX</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Test Results</h1>
          <p className="text-gray-600 mt-2">Analysis completed on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center">
            {!result.detected ? (
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            ) : (
              <AlertCircle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {result.detected ? 'TB Signs Detected' : 'No TB Signs Detected'}
            </h2>
            <p className="text-gray-600 mb-6">
              AI Confidence Level: {result.confidence}%
            </p>
            <div className="inline-block px-6 py-2 rounded-full bg-green-100 text-green-800 font-medium">
              Risk Level: {result.riskLevel}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Continue maintaining good health practices and hygiene</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Schedule regular check-ups with your healthcare provider</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">If symptoms persist, consult a medical professional immediately</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-gray-900 mb-2">Important Disclaimer</h4>
          <p className="text-sm text-gray-700">
            This is a preliminary screening tool and should not be considered as a definitive medical diagnosis.
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => onNavigate('patient-home')}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResultPage;