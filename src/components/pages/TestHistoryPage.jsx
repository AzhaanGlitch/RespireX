import React from 'react';
import { Activity, FileText, CheckCircle } from 'lucide-react';

const TestHistoryPage = ({ onNavigate }) => {
  const testHistory = [
    {
      id: 1,
      date: "Dec 28, 2024",
      result: "Negative",
      confidence: 92,
      riskLevel: "Low"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TB DetectCare</span>
            </div>
            <button
              onClick={() => onNavigate('patient-home')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test History</h1>

        <div className="space-y-4">
          {testHistory.map((test) => (
            <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{test.result}</h3>
                    <p className="text-sm text-gray-600">{test.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-2">
                    {test.riskLevel} Risk
                  </div>
                  <p className="text-sm text-gray-600">Confidence: {test.confidence}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestHistoryPage;