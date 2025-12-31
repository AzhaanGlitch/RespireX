import React from 'react';
import { Activity, CheckCircle, Calendar, FileText, Download, ArrowLeft } from 'lucide-react';

const TestHistoryPage = ({ onNavigate }) => {
  const testHistory = [
    {
      id: 1,
      date: "Dec 28, 2024",
      fullDate: "December 28, 2024, 2:30 PM",
      result: "Negative",
      confidence: 92,
      riskLevel: "Low"
    },
    {
      id: 2,
      date: "Nov 15, 2024",
      fullDate: "November 15, 2024, 10:15 AM",
      result: "Negative",
      confidence: 89,
      riskLevel: "Low"
    },
    {
      id: 3,
      date: "Oct 3, 2024",
      fullDate: "October 3, 2024, 4:45 PM",
      result: "Negative",
      confidence: 94,
      riskLevel: "Low"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                RespireX
              </span>
            </div>
            <button
              onClick={() => onNavigate('patient-home')}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Test History</h1>
            <p className="text-xl text-gray-600">View all your previous screening results</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Total Tests", value: testHistory.length, icon: FileText, color: "blue" },
              { label: "Negative Results", value: testHistory.filter(t => t.result === "Negative").length, icon: CheckCircle, color: "green" },
              { label: "Average Confidence", value: `${Math.round(testHistory.reduce((a, b) => a + b.confidence, 0) / testHistory.length)}%`, icon: Activity, color: "purple" }
            ].map((stat, idx) => (
              <div key={idx} className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover-lift animate-fade-in stagger-${idx + 1}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} strokeWidth={2} />
                  </div>
                  <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-sm font-semibold text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Test History List */}
          <div className="space-y-6">
            {testHistory.map((test, idx) => (
              <div 
                key={test.id} 
                className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover-lift animate-fade-in stagger-${idx + 1}`}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <CheckCircle className="w-9 h-9 text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {test.result} Result
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">{test.fullDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition font-semibold flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Confidence Level</p>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                            style={{ width: `${test.confidence}%` }}
                          />
                        </div>
                        <span className="text-lg font-bold text-gray-900">{test.confidence}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Risk Level</p>
                      <div className={`inline-block px-6 py-2 rounded-xl font-bold ${
                        test.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                        test.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {test.riskLevel}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Test Status</p>
                      <div className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-xl font-bold">
                        Completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (if no history) */}
          {testHistory.length === 0 && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Test History Yet</h3>
              <p className="text-gray-600 mb-8">Start your first TB screening test to see results here</p>
              <button
                onClick={() => onNavigate('symptom-test')}
                className="px-10 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition font-semibold text-lg shadow-lg hover:shadow-xl btn-primary"
              >
                Start Test
              </button>
            </div>
          )}

          {/* Info Card */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Keep Track of Your Health</h3>
            <p className="text-lg leading-relaxed opacity-90">
              Regular screening helps in early detection and better health outcomes. 
              We recommend taking a test every 3 months or if you experience any symptoms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestHistoryPage;