import React from 'react';
import { Activity, FileText, CheckCircle } from 'lucide-react';

export default TestHistoryPage;

const TestHistoryPage = ({ onNavigate }) => {
  const testHistory = [
    {
      id: 1,
      date: "Dec 28, 2024",
      result: "Negative",
      confidence: 92,
      riskLevel: "Low"
    },
    {
      id: 2,
      date: "Nov 15, 2024",
      result: "Negative",
      confidence: 89,
      riskLevel: "Low"
    }
  ];

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

        {testHistory.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Test History</h3>
            <p className="text-gray-600 mb-6">You haven't taken any tests yet</p>
            <button
              onClick={() => onNavigate('symptom-test')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Take Your First Test
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};